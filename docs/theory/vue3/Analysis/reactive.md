# reactive

将数据变成响应式


### 1. 测试代码

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>reactive</title>
</head>
<body>
  <div id="app"></div>
  <!-- 源码 -->
  <script src="../../../node_modules/@vue/reactivity/dist/reactivity.global.js"></script>
  <!-- 自己的代码 -->
  <!-- <script src="./reactivity.global.js"></script> -->
  <script>
    // 1. 把一个对象变成响应式的
    const { effect, reactive } = VueReactivity
    const state = reactive({
      name: 'gdy',
      age: 12
    })

    effect(() => { // effect 函数默认会先执行一次，对响应式取值(取值的过程中数据会依赖当前的effect)
      document.getElementById('app').innerHTML = state.name + '今年' + state.age + ''
    })
    
    // 稍后name 和 age 变化会重新执行effect 函数
    setTimeout(() => {
      state.age++
    }, 1000)
  </script>
</body>
</html>
```



#### Vue3 中的effect 与 reactive

effect 和 reactive 是vue3 中的核心API，其他的API 都是基于这两个API 实现的

1. effect 代表副作用函数，如果此函数依赖的数据发生变化 那么就会重新执行(数据变了视图重新更新)

   1. effect 默认执行一次，数据变化后effect再次执行一次

2. reactive 代表的是响应式模块，作用是将数据变成响应式。reactive 会监测所有对象属性
   1. reactive 会监测所有对象中的属性，如果取值的时候发现是一个对象 那么reactive 也会返回这个对象的代理对象

      ``` js
      const state = reactive({name: 'gdy', age: 12, addres: {number: 123}})
      console.log(state.address) // Proxy {address: 123}
      // 其中的address 也会被proxy 代理 不管多少层
      ```



### 2. reactive 实现过程

经过reactive 包装的对象最中会输出一个proxy 对象，就像这样

` Proxy {name: 'gdy', age: 12}`

<br />


##### 第一步：把对象变成响应式的，只能做对象的代理

``` typescript
// reactive.ts
import { isObject } from '@vue/shared'
export function reactive<T extends object>(target: T) {
  // 只能做对象的代理
  if (!isObject(target)) {
    return target
  }
  
  // 把对象变成响应式
  const proxy = new Proxy(target, {
    // 当取值的时候会调用get
    get(target, key, receiver) {
      // Reflect 会把目标对象中的this换成代理对象
      return Reflect.get(target, key, receiver)
    },
    // 当赋值的时候调用set
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver)
    }
  })
  
  return proxy
}
```

> 为什么要用 Reflect ？

``` js
// 例如有这样一个对象
const obj = {
	name: 'gdy',
  get alias() {
    return this.name
  }
}
// 用proxy 代理这个对象
const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    return target[key]
  },
  set(target, key, value, receiver) {
    target[key] = value
    return
  }
})

console.log(proxy.alias) // alias
// 试想这里获取到的name 是怎样的一个属性，那么这个name 应该是什么样的属性
// proxy.alias 取的是原对象上的name，并不是经过代理的proxy上的name，这里的name 应该是经过代理的proxy 的name
// 所以要通过 Reflect 会把目标对象中的this换成代理对象  改变this 指向

/*----------------------------------------------------------------*/

const obj = {
	name: 'gdy',
  get alias() {
    return this.name
  }
}
// 用proxy 代理这个对象
const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    // Reflect 会把目标对象中的this换成代理对象
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    target[key] = value
    return
  }
})
console.log(proxy.alias) // alias name
// 使用 Reflect 后 再出输出proxy.alias
// set同理
```



##### 第二步：一个对象被代理多次，返回同一个代理

``` js
// index.html
...
const { effect, reactive } = VueReactivity
	const data = { name: 'gdy', age: 12 }
	const state1 = reactive(data)
  const state2 = reactive(data)
  console.log(state1 === state2) // false
...
```

```typescript
// reactive.ts
import { isObject } from '@vue/shared'

const reactiveMap = new WeakMap()
export function reactive<T extends object>(target: T) {
  // 只能做对象的代理
  if (!isObject(target)) {
    return target
  }
  
  // 在代理之前 判断weakMap 中是否有这个target 对象 如果没有继续代理，如果有 返回 与target 关联的代理对象
  let exisitingProxy = reactiveMap.get(target)
  if (exisitingProxy) {
    return exisitingProxy
  }
  
  // 把对象变成响应式
  const proxy = new Proxy(target, {
    // 当取值的时候会调用get
    get(target, key, receiver) {
      // Reflect 会把目标对象中的this换成代理对象
      return Reflect.get(target, key, receiver)
    },
    // 当赋值的时候调用set
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver)
    }
  })
  reactiveMap.set(target, proxy) // 原对象与代理对象关联起来
  return proxy
}
```

1. 将被代理的对象缓存
   1. 利用weakMap 将 原对象与代理对象关联起来
2. 在代理之前 判断weakMap 中是否有这个target 对象 如果没有继续代理，如果有 返回 与target 关联的代理对象



##### 第三步：代理对象再次被代理，直接返回

```js
// index.html
...
const { effect, reactive } = VueReactivity
	const data = { name: 'gdy', age: 12 }
	const state1 = reactive(data)
  const state2 = reactive(state1)
  console.log(state1 === state2) // false
...
```

``` typescript
// reactive.ts
import { isObject } from '@vue/shared'

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}
const reactiveMap = new WeakMap()
export function reactive<T extends object>(target: T) {
	...
  // 判断是否是代理过的对象  这里如果是被代理过的对象 那么 target[xxx] 会触发下面的get()
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }
  
  ...
  
  // 把对象变成响应式
  const proxy = new Proxy(target, {
    // 当取值的时候会调用get
    get(target, key, receiver) {
      if (key === ReactiveFlags.IS_REACTIVE) {
        return true
      }
      // Reflect 会把目标对象中的this换成代理对象
      return Reflect.get(target, key, receiver)
    },
    ...
  })
	...
}
```

第一次传入普通对象，通过proxy 代理一次，顺便给这个代理对象添加个属性

下一次如果传入一个被代理过的对象，那么就可以看这个代理对象中是否有初始代理是设置的那个属性



### 3. 完整代码

把Proxy 的handler 抽取到baseHandler.ts 文件下

```typescript
// reactive.ts
import { isObject } from '@vue/shared'
import { mutableHandlers, ReactiveFlags } from './baseHandler.ts'

const reactiveMap = new WeakMap()

export function reactive<T extends object>(target: T) {
  // 只能做对象的代理
  if (!isObject(target)) {
    return target
  }
  
  // 判断是否是代理过的对象  这里如果是被代理过的对象 那么 target[xxx] 会触发下面的get()
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }
  
  // 在代理之前 判断weakMap 中是否有这个target 对象 如果没有继续代理，如果有 返回 与target 关联的代理对象
  let exisitingProxy = reactiveMap.get(target)
  if (exisitingProxy) {
    return exisitingProxy
  }
  
  // 把对象变成响应式
  const proxy = new Proxy(target, mutableHandlers)
  
  reactiveMap.set(target, proxy) // 原对象与代理对象关联起来
  
  return proxy
}
```

``` typescript
// baseHandler.ts
export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}
export const mutableHandlers = {
  // 当取值的时候会调用get
  get(target, key, receiver) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    }
    // Reflect 会把目标对象中的this换成代理对象
    return Reflect.get(target, key, receiver)
  },
  // 当赋值的时候调用set
  set(target, key, value, receiver) {
    return Reflect.set(target, key, value, receiver)
  }
}
```

### 4. 总结
将对象变成响应式对象就是利用了proxy 的get set 访问器，在此过程中，有了几个限制
1. 只能代理对象
2. 一个对象被多次代理，返回同一个代理
3. 代理对象再次被代理，直接返回

reactive 还是非常简单的。刚开始比较难理解的是Reflect部分，多读几遍就明白了

### 5. 代码提交记录

### 6. 拓展

+ 通过reactive 衍生出来的一个API `shallowReactive` 用作浅代理，意思就是代理第一层，输出被代理对象的第二层会是这样

  ``` js
  const state = reactive({name: 'gdy', age: 12, addres: {number: 123}})
  console.log(state.address) // {address: 123}
  ```

+ `readonly` 仅读
+ `shallowReadonly` 浅的仅读



