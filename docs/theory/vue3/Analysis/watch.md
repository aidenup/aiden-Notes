## watch



#### 1. 监听响应式对象

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="../../../node_modules/vue/dist/vue.global.js"></script>
  <!-- <script src="./reactivity.global.js"></script> -->
  <script>
    const { watch, reactive } = Vue
    // const { reactive, effect } = VueReactivity
    const state = reactive({
      name: 'aaa',
      age: 12
    })
    watch(state, (oldVal, newVal) => {
      console.log(oldVal, newVal)
      // 打印输出后可以看到oldVal，newVal 没有新旧之分。这是因为监听的是对象，改变的是引用值，所以对象区分不出来
    })

    setTimeout(() => {
      state.name = 'bbb'
    }, 1000);
  </script>
</body>
</html>
```

> 监控对象是无法区分前后的新值和老值



#### 2. 深层监听

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="../../../node_modules/vue/dist/vue.global.js"></script>
  <!-- <script src="./reactivity.global.js"></script> -->
  <script>
    const { watch, reactive } = Vue
    // const { reactive, effect } = VueReactivity
    const state = reactive({
      name: 'aaa',
      age: 12,
      address: { num: 123 }
    })
    watch(state, (oldVal, newVal) => {
      console.log(oldVal, newVal)
    })

    setTimeout(() => {
      state.address.num = 456
    }, 1000);
  </script>
</body>
</html>
```

> 这里仍然可以监听到变化，但依然是没有新老对象之分，所以只要是对象类型就无法区分new和old



watch 第一个参数也可以放入一个函数或者一个数组，这里就是对参数的一个判断做相应的处理

``` javascript
const { watch, reactive } = Vue
// const { reactive, effect } = VueReactivity
const state = reactive({
  name: 'aaa',
  age: 12,
  address: { num: 123 }
})

// 1. 这里监控一个函数，函数的返回值就是老值，更新后获取新值
watch(() => state.address.num, (oldVal, newVal) => {
  console.log(oldVal, newVal)
})

setTimeout(() => {
  state.address.num = 456
}, 1000)
// watch 的本质就是effect，内部对用户填写的数据进行依赖收集
```



### 实现

1. watch 函数
   1. 判断是否是响应式数据
      1. 如果是 包装
   2. 判断是否是方法
      1. 如果是 getter 就是 source
   3. 包装effect 的第二个参数 也就是包装cb
      1. 这个回调带回去新老值
      2. 新值就是job 中 effec.run() 之后返回的值
      3. 老值就是watch 中effect.run() 之后返回的值
   4. 依赖收集 new ReactiveEffect(getter, job)
   5. 获取老值



#### 1. 判断是否是响应式

```typescript
// reactive.ts
// 判断是否是响应式
export function isReactive(value: any) {
  return !!(value && value[ReactiveFlags.IS_REACTIVE])
}
```

#### 2. watch方法

##### 传入对象

``` html
···
<script>
  // const { watch, reactive } = Vue
  const { reactive, watch } = VueReactivity
  const state = reactive({
    name: 'aaa',
    age: 12,
    address: { num: 123 }
  })

  // 1. 这里监控一个函数，函数的返回值就是老值，更新后获取新值
  watch(state, (oldVal, newVal) => {
    console.log(oldVal, newVal)
  })

  setTimeout(() => {
    state.address.num = 456
  }, 1000)
  // watch 的本质就是effect，内部对用户填写的数据进行依赖收集
</script>
···
```



``` typescript
// watch.ts
import { isObject } from "@vue/shared"
import { ReactiveEffect } from "./effect"
import { isReactive } from "./reactive"

function traversal(value: any, set = new Set()) { // 如果对象中有循环引用的问题
  // 终结条件 不是对象就不递归了
  if (!isObject(value)) return value
  if (set.has(value)) return value
  set.add(value)
  for (const key in value) {
    traversal(value[key], set)
  }
  return value
}

/**
 * watch
 * @param source 传入的对象
 * @param cb 对应的回调
 */
export function watch(source: any, cb: any) {
  let getter
  if (isReactive(source)) {
    // 对用户传入的数据 进行递归循环（只要循环就会访问对象上的每一个属性，访问属性的时候会收集effect）
    getter = () => traversal(source)
  } else {
    return 
  }
  let oldValue: any
  const job = () => {
    const newValue = effect.run()
    cb(newValue, oldValue)
    oldValue = newValue
  }
  const effect = new ReactiveEffect(getter, job) // 监控自己构造的函数，变化后重新执行job

  oldValue = effect.run()
}
```

##### 传入方法

``` html
<script>
  // const { watch, reactive } = Vue
  const { reactive, watch } = VueReactivity
  const state = reactive({
    name: 'aaa',
    age: 12,
    address: { num: 123 }
  })

  // 1. 这里监控一个函数，函数的返回值就是老值，更新后获取新值
  watch(() => state.address.num, (oldVal, newVal) => {
    console.log(oldVal, newVal)
  })

  setTimeout(() => {
    state.address.num = 456
  }, 1000)
  // watch 的本质就是effect，内部对用户填写的数据进行依赖收集
</script>
```

``` typescript
// watch.ts
import { isFunction, isObject } from "@vue/shared"
import { ReactiveEffect } from "./effect"
import { isReactive } from "./reactive"

function traversal(value: any, set = new Set()) { // 如果对象中有循环引用的问题
  // 终结条件 不是对象就不递归了
  if (!isObject(value)) return value
  if (set.has(value)) return value
  set.add(value)
  for (const key in value) {
    traversal(value[key], set)
  }
  return value
}

/**
 * watch
 * @param source 传入的对象
 * @param cb 对应的回调
 */
export function watch(source: any, cb: any) {
  let getter
  if (isReactive(source)) {
    // 对用户传入的数据 进行递归循环（只要循环就会访问对象上的每一个属性，访问属性的时候会收集effect）
    getter = () => traversal(source)
  } else if (isFunction(source)) {
    getter = source
  } else {
    return
  }
  let oldValue: any
  const job = () => {
    const newValue = effect.run()
    cb(newValue, oldValue)
    oldValue = newValue
  }
  // 在effect 中访问属性就会依赖收集
  const effect = new ReactiveEffect(getter, job) // 监控自己构造的函数，变化后重新执行job

  oldValue = effect.run()
}
```



> watch 等价于 effect  内部会保存老值和新值调用方法



### watch 的另一个特性：解除上一次的watch

``` html
<script src="../../../node_modules/vue/dist/vue.global.js"></script>
<!-- <script src="./reactivity.global.js"></script> -->
<script>
  const { watch, reactive } = Vue
  // const { reactive, watch } = VueReactivity
  const state = reactive({
    name: 'aaa',
    age: 12,
    address: { num: 123 }
  })
  let i = 2000
  function getData(timer) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(timer)
        resolve(timer)
      }, timer)
    })
  }

  watch(() => state.age, async (newVal, oldVal) => {
    i-=1000
    let r = await getData(i)
    document.body.innerHTML = r
  })

  state.age = 31
  state.age = 32
</script>
```

> 以上代码最终会渲染出1000，理想情况是要渲染出0 的，因为i减到0 相当于是最后请求。但是被延时到1000 顶掉了



vue 提供的一个方法onCleanup 

``` html
<script src="../../../node_modules/vue/dist/vue.global.js"></script>
<!-- <script src="./reactivity.global.js"></script> -->
<script>
  const { watch, reactive } = Vue
  // const { reactive, watch } = VueReactivity
  const state = reactive({
    name: 'aaa',
    age: 12,
    address: { num: 123 }
  })
  let i = 2000
  function getData(timer) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(timer)
        resolve(timer)
      }, timer)
    })
  }
  // 第一次调用watch的时候注入一个取消的回调
  // 第二次调用watch时候会执行第一次用户注入的回调(也就是把第一次的clear赋值为true)，并注入一个取消的回调
  // 第三次调用watch的时候会执行第二次注入的回调
  watch(() => state.age, async (newVal, oldVal, onCleanup) => {
    let clear = false
    onCleanup(() => {
      clear = true
    })
    i-=500
    let r = await getData(i)
    if (!clear) {
      document.body.innerHTML = r
    }
    }, {flush: 'sync'})

  state.age = 31
  state.age = 32
  state.age = 33
  state.age = 34
</script>
```



``` typescript
// watch.js
...
/**
 * watch
 * @param source 传入的对象
 * @param cb 对应的回调
 */
export function watch(source: any, cb: any) {
  let getter
  if (isReactive(source)) {
    // 对用户传入的数据 进行递归循环（只要循环就会访问对象上的每一个属性，访问属性的时候会收集effect）
    getter = () => traversal(source)
  } else if (isFunction(source)) {
    getter = source
  } else {
    return
  }
  let cleanup: any
  const onCleanup = (fn: any) => {
    cleanup = fn // 保存用户传入的函数
  }
  let oldValue: any
  const job = () => {
    // 除第一次执行watch 其余watch执行的时候调用用户上一次保存的cleanup
    if (cleanup) {
      cleanup()
    }
    const newValue = effect.run()
    cb(newValue, oldValue, onCleanup)
    oldValue = newValue
  }
  // 在effect 中访问属性就会依赖收集
  const effect = new ReactiveEffect(getter, job) // 监控自己构造的函数，变化后重新执行job

  oldValue = effect.run()
}
```
