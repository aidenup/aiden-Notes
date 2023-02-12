reactivity 其中有两个核心api
1. effect 代表副作用函数，如果此函数依赖的数据发生变化 那么就会重新执行（ 数据变了 视图重新更新）
2. reactive 代表的是响应式模块，作用是将数据变成响应式。reactive 会监测所有对象属性， 如果取值的是否发现是一个对象 那么reactive 也会返回这个对象的代理对象
> 其他的api 都是基于这两个衍生出来的

### reactive
1. 将数据转换成代理数据
``` ts
export function reactive(target: object) {
  if(!isObject(target)) {
    return target
  }
  
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      // Reflect 会把目标对象中的this换成代理对象
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver)
    }
  })

  return proxy
}
```
如果有这样的一个对象：
```js
const target = {
  name: 'gdy',
  age: 23,
  get alias() {
    return this.name
  }
}
```
如果使用 proxy.alias, 在proxy的get 中打印key 可以看到 只有一个alise
这样是错误的，因为target的alise 读取了name， name 也要被代理或者说收集
这两个在reactive中都要监测到

所以就要用到Reflect 来将目标对象中的this 改成代理对象
这样一来 alise 中的retrun this 是代理对象了，.name 后也就执行了 proxy 中的get 
然后在控制台中打印 key 就可以看到 一个alise 和一个 name

2. 对象被代理过不再进行代理
同一个对象进行多次代理，返回同一个对象
``` ts
const reactiveMap = new WeakMap() // 代理过的对象被WeakMap收集

export function reactive(target: object) {
  // target 可能是被代理过的对象
  if(!isObject(target)) {
    return target
  }
  const exisitingProxy = reactiveMap.get(target)
  if (exisitingProxy) {
    return exisitingProxy
  }
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      // Reflect 会把目标对象中的this换成代理对象
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver)
    }
  })
  exisitingProxy.set(target, proxy)
  return proxy
}
```

3. 代理过的对象不可再进行代理
代理对象被再次代理，可直接返回
做标记 '__v_isReactive'
``` ts
import { isObject } from '@vue/shared'
// 1. 将数据转换成响应式数据
// 2.代理过的对象将不进行代理
const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}
interface Target {
  [ReactiveFlags.IS_REACTIVE]?: boolean
}

const reactiveMap = new WeakMap<Target, any>()

export function reactive<T extends object>(target: T): any
export function reactive(target: Target) {
  if (!isObject(target)) {
    return target
  }
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }
  let exisitingProxy = reactiveMap.get(target)
  if (exisitingProxy) {
    return exisitingProxy
  }
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      // Reflect 会把目标对象中的this换成代理对象
      if (key === ReactiveFlags.IS_REACTIVE) {
        return true
      }
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) { 
      return Reflect.set(target, key, value, receiver)
    }
  })
  reactiveMap.set(target, proxy)
  return proxy
}
```


