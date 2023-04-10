## 分支切换

`document.body.innerHTML = state.flag ? state.name : state.age`

这样一段代码在vue 中执行，如果没有进行过以下优化，flag 状态更改后，state.name 和 state.age 都会重新渲染。例如 flag 初始化true 显示state.name 「渲染一次」，然后更改flag 显示state.age「渲染第二次」，但是这里state.name 也会触发一次渲染「第三次渲染」，接下来要做的就是不让多余的那一次执行，最好的办法就是每次执行effect回调之前清理一遍依赖，重新收集依赖。

``` html
<body>
  <script src="./reactivity.global.js"></script>
  <script>
    const { reactive, effect } = VueReactivity
    const state = reactive({ flag: true, name: 'aiden', age: 30 })
    effect(() => {
      console.log('render')
      document.body.innerHTML = state.flag ? state.name : state.age
    })
    setTimeout(() => {
      state.flag = false
      setTimeout(() => {
        console.log('修改name， 原则上不更新')
        // 这一步state.flag = false 要显示state.age了， state.name 不显示了，所以这里的state.name 就不用重新render了
        state.name = 'gdy'
      }, 1 * 1000);
    }, 1 * 1000);

  </script>
</body>

```

**希望每次执行effect 都时候都清理一遍依赖，重新收集**

##### cleanupEffect

``` javascript
// effect.ts
function cleanupEffect(effect: ReactiveEffect) {
  const { deps } = effect // deps是Set 存放属性对应的effect
  for(let i = 0; i < deps.length; i++) {
    deps[i].delete(effect) // 解除effect，重新收集依赖
  }
  effect.deps.length = 0
}

export class ReactiveEffect<T = any> {
  active = true
  deps: any = []
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
      // 在this.fn() 执行之前需要将当前effect 中的 deps 清理
      cleanupEffect(this)
      return this.fn()
    } finally {
      activeEffect = this.parent
    }
  }
}
```

##### 优化死循环

以上代码会有个问题：死循环

``` javascript
const set = new Set(['a'])
set.forEach(item => {
  set.delete('a')
  set.add('a')
})
// 造成死循环
```

解决方法是：不要用原来的effect 弄一个新的 effect

``` javascript
// effect.ts
export function trigger(target: Target, type: string, key: string | symbol, value: any, oldValue: any) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return // 触发的值不在模板中使用

  const effects: ReactiveEffect[] = depsMap.get(key) // 存放着好多个effect
	
  // 在执行之前 先拷贝一份来执行，不要关联引用
  if (effect) {
		effects = [...effects]
    effects.forEach(effect => {
      if (effect !== activeEffect) {
        effect.run()
      }
  	})
  }
}
```



## 调度器

``` html
<body>
  <script src="./reactivity.global.js"></script>
  <script>
    const { effect, reactive } = VueReactivity
    const obj = {
      name: 'gdy',
      age: 12
    }
    const state = reactive(obj)

    let runner = effect(() => {
      document.body.innerHTML = state.age
    })
    
    runner.effect.stop()
    setTimeout(() => {
      state.age = 100
      setTimeout(() => {
        runner()
      }, 1 * 1000);
    }, 1 * 1000);

  </script>
</body>
```



``` javascript
// effect.ts
export class ReactiveEffect<T = any> {
  active = true
  deps: any = []
  parent: ReactiveEffect | undefined = undefined
  constructor(
    public fn: () => T
  ) {}
  run() {
    ...
  }
  stop() {
    if (this.active) {
      this.active = false
    }
    cleanupEffect(this) // 停止effect收集
  }
}

export function effect<T = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
  // 需要绑定this，不绑定this 指向了window
  const runner: any = _effect.run.bind(_effect) // runner 的this 被指定为_effect 的this
  runner.effect = _effect // 将effect 挂载到runner 函数上
  return runner
}
```

##### 调度函数

适用于异步批量更新

``` html
<body>
  <script src="./reactivity.global.js"></script>
  <script>
    const { effect, reactive } = VueReactivity
    const obj = {
      name: 'gdy',
      age: 12
    }
    const state = reactive(obj)

    let runner = effect(() => {
      document.body.innerHTML = state.age
    }, {
      scheduler() { // 调度如何更新
        console.log('run')
        if (!waiting) {
          waiting = true
          setTimeout(() => {
            runner()
            waiting = false
          }, 1000);
        }
      }
    })
    
		state.age = 100
    state.age = 200
    state.age = 300
    state.age = 400
  </script>
</body>
```





``` javascript
// effect.ts
export class ReactiveEffect<T = any> {
  // ...
  constructor(
    public fn: () => T,
    public scheduler: () => any
  ) {}
  // ...
}

export function effect<T = any>(fn: () => T, option: any = {}) {
  const _effect = new ReactiveEffect(fn, option.scheduler)
  _effect.run()
  // 需要绑定this，不绑定this 指向了window
  const runner: any = _effect.run.bind(_effect) // runner 的this 被指定为_effect 的this
  runner.effect = _effect // 将effect 挂载到runner 函数上
  return runner
}

export function trigger(target: Target, type: string, key: string | symbol, value: any, oldValue: any) {
  // ...
  if (effects) {
    effects = [...effects]
    effects.forEach(effect => {
      if (effect !== activeEffect) {
        if (effect.scheduler) {
          effect.scheduler() // 如果有调度函数 执行scheduler
        } else {
          effect.run()
        }
      }
    })
  }
}
```
