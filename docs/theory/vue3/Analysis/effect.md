# effect

#### 1. 测试代码

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
    const { effect, reactive } = VueReactivity
    const state = reactive({
      name: 'gdy',
      age: 12
    })

    effect(() => { 
      // effect 函数默认会先执行一次，对响应式取值(取值的过程中数据会依赖当前的effect)
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



### 什么是依赖收集

我们希望effect 中的回调进行一个依赖收集，数据变化重新执行这个回调，我们需要将这个属性和这个函数关联在一起 （ state.name 和 effect 中的 fn 关联） 这就叫依赖收集

### 实现方法

##### 1. ReactiveEffect类

此类对fn 进行一系列操作，需要暴露出run来执行fn（run 默认先执行一次），run 方法中将当前实例暴露给全局的activeEffect，暴露出去的activeEffect 可以与属性绑定

``` typescript
// effect.ts

// 这里的fn可以根据状态变化 重新执行，effect 可以嵌套（组件就是嵌套的）
export function effect(fn) {
  // 创建响应式的effect
  const _effect = new ReactiveEffect(fn)
  
  // 默认先执行一次
  _effect.run()
}

// 全局 当前正在运行的effect
export let activeEffect = undefined

class ReactiveEffect {
  active = true // 这个effect 默认是激活状态
  constructor(public fn) {}
  
  // 执行effect
  run() {
    // 只有在激活状态下才做依赖收集 非激活状态只需要执行函数；激活的状态进行依赖收集 
    if (!this.active) {
      this.fn()
    }
    
    // 依赖收集 将当前的effect和稍后渲染的属性关联在一起
    try {
      // 当前的这个effect 变成全局变量，取值的时候就把全局变量(effect)和属性关联起来
      activeEffect = this
      // this.fn() 就是执行上边html 中的effect 中的内容，包括 state.name、state.age 这两个取值操作，这个两个取值操作在执行的时候就可以获取到这个全局的activeEffect （用来干什么）
      return this.fn()
    } finally {
      activeEffect = undefined
    }
  }
}
```

##### 2. 开始依赖收集

在effect 中访问属性是 属性对当前的effect 进行收集

``` typescript
// baseHandler.ts
import { Target } from "./reactive"
import { track } from "./effect"

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}

export const mutableHandlers = {
  get(target: Target, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    }
    // activeEffect 和 key 关联在一起
    track(target, 'get', key)

    return Reflect.get(target, key, receiver)
  },
  set(target: Target, key: string | symbol, value: unknown, receiver: object) {
    
    return Reflect.set(target, key, value, receiver)
  }
}

```

> 重新梳理一下流程：当`effect(() =>  state.name)` 执行后，会默认先执行一次fn，在fn执行的过程中执行了`state.name	`响应式对象的取值操作，那么 这个取值操作会被proxy 的get 捕获到，所以在这个get 中，就可以拿到当前全局正在运行的这个activeEffect，那么 **这个effect 就可以和这个state 的key 关联起来。在稍后更改state[key] 的时候 就可以让state[key] 对应的effect 重新执行**，这也就是开头说的数据一遍 重新执行effect

##### 补充

如果有这样的一个特殊情况：

```js
effect(() => { // e1
	state.name
  effect(() => { // e2
    state.age
  })
  state.address // 这一步以上是没有问题的，但是到了这一步 全局effect被清空了（activeEffect = undefined），所以state.address 就收集不到依赖了， 所以程序运行到这一步 需要把activeEffect 变回为e1 
})

// effect.ts
...
run() {
  if (!this.active) {
    this.fn()
  }
  try {
    this.parent = activeEffect
    activeEffect = this
    return this.fn()
  } finally {
    activeEffect = this.parent
  }
}
...
⬇️⬇️⬇️
effect(() => {   // parent = null activeEffect = e1
  state.name     // name -> e1
  effect(() => { // parent = e1   activeEffect = e2
    state.age    // age -> e2
  })
  							 // e2结束
  state.address  // activeEffect = this.parent => e1 ---- address -> e1
})

```

##### 3. 属性收集effect

下一步就是如何将effect 和 key 关联在一起

``` javascript
// baseHandlers.ts
...
import { track } from "./effect"
...
export const mutableHandlers = {
  get(target: Target, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    }
    // activeEffect 和 key 关联在一起
    track(target, 'get', key) // 哪个对象上的哪个属性对应的effect 是谁

    return Reflect.get(target, key, receiver)
  },
  set(target: Target, key: string | symbol, value: unknown, receiver: object) {
    
    return Reflect.set(target, key, value, receiver)
  }
}
```

```javascript
// effect.ts
...
// 一个对象中的某个属性，对应的多个effect
// WeakMap { 对象: Map { key: Set[多个effect] } }
const targetMap = new WeakMap()
export function treck(target: Target, type: string, key: string : symbol) {
	if (!activeEffect) return
  
  let depsMap = targetMap.get(target) // depsMap 是 ·Map { key: Set[多个effect] }· 这部分
  if (!depsMap) {
    // depsMap = new Map()
    targetMap.set(target, (depsMap = new Map()))
  }
  
  let dep = depsMap.get(key) // dep 是 ·Set[多个effect]· 这部分
  if (!dep) {
    // dep = new Set()
		depsMap.set(key, (dep = new Set()))
  }
  
  let shouldTrack = !dep.has(activeEffect)
  if (shouldTrack) { // Set 中没有activeEffect 的话 加入
    dep.add(activeEffect)
  }
  // 这只是单向记录，稍后会把这个effect删掉，删掉后要把属性里对应的effect 也删掉
  // 所以还需要一个反向记录，应该让effect 也记录他被哪些属性依赖过， 这是为了可以清理，啥情况会删除effect：分支控制
  // => effect(() => { flag ? state.name : state.age })
}
```



##### 4. effect 收集属性（反向记录 ）

+ 属性记录依赖了哪些 effect ， effect 记录依赖了哪些属性
  + 多对多：一个属性要对应多个effect ，一个effec 对应多个属性

```javascript
// effect.ts
class ReactiveEffect<T = any> {
  active = true
 	deps: [] // 用作反向记录，记录被哪些属性依赖
  parent: ReactiveEffect | undefined = undefined
  constructor(
    public fn: () => T
  ) {}

  run() {
    if (!this.active) {
      this.fn()
    }
    try {
      this.parent = activeEffect
      activeEffect = this
      return this.fn()
    } finally {
      activeEffect = this.parent
    }
  }
}

const targetMap = new WeakMap()
export function treck(target: Target, type: string, key: string : symbol) {
	if (!activeEffect) return
  
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  
  let dep = depsMap.get(key)
  if (!dep) {
		depsMap.set(key, (dep = new Set()))
  }
  
  let shouldTrack = !dep.has(activeEffect)
  if (shouldTrack) {
    dep.add(activeEffect)
    // 存放属性对应的set
    activeEffect.deps.push(dep) // 反向记录 让effect 记录对应的dep， 稍后清理的时候会用到
  }
}
```

> 此时 依赖收集完成，下一步就是触发更新

##### 5.触发更新

在更改值的时候触发更新

``` javascript
// baseHandlers.ts
export const mutableHandlers = {
  get(target: Target, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    }
    track(target, 'get', key)

    return Reflect.get(target, key, receiver)
  },
  set(target: Target, key: string | symbol, value: unknown, receiver: object) {
    // 更改值后触发更新
    // 找到要改的哪个属性，找到属性对应的那个set 让他去执行
    let oldValue = (target as any)[key]
    let result = Reflect.set(target, key, value, receiver)
    if (oldValue !== value) {
      // 值不一样 需要更新
      trigger(target, 'set', key, value, oldValue)
    }
    return result
  }
}

// effect.ts
export function track() {...}

export function trigger(target: Target, type: string, key: string | symbol, value: any, oldValue: any) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return // 触发的值不在模板中使用

  const effects: ReactiveEffect[] = depsMap.get(key) // 存放着好多个effect

  effects && effects.forEach(effect => {
    effect.run()
  })
}
```

1. 更改值后触发更新（前提是新值和老值对比一下，如果不一样才触发更新）
2. 找到要更改的属性，找到属性对应的set 让它执行

##### 补充

如果在effect 中修改值 那么就会无限循环

``` javascript
...
effect(() => {
	state.age = Math.random()
	document.getElementById('app').innerHTML = state.name + '今年' + state.age + ''
})
...
```

所在执行effect 的时候， 又要执行fn 的时候需要屏蔽一下

```javascript
export function trigger(target: Target, type: string, key: string | symbol, value: any, oldValue: any) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return // 触发的值不在模板中使用

  const effects: ReactiveEffect[] = depsMap.get(key) // 存放着好多个effect

  effects && effects.forEach(effect => {
    if (effect !== activeEffect) { // 只有当要执行的effect 不等于当前的全局effect 的时候再执行
    	effect.run() 
    }
  })
}
```
