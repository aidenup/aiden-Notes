## computed

计算属性

原理就是 借助之前effect Api 中的 track tigger 来实现属性收集effect 和 effect 收集 属性。

然后通过计算属性 类属性访问器来 监听是否访问值

``` html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>computed</title>
</head>
<body>
  <script src="./reactivity.global.js"></script>
  <!-- <script src="../../../node_modules/@vue/reactivity/dist/reactivity.global.js"></script> -->
  <script>
    const { effect, reactive, computed } = VueReactivity

    const state = reactive({
      firstName: 'danyang',
      lastName: 'aiden'
    })

    // const fullName1 = computed({
    //   get() { // defineProperty中的getter
    //     console.log('runner')
    //     return state.firstName + state.lastName
    //   },
    //   set(newVal) {
    //     console.log(newVal)
    //   }
    // })
    // 1. computed 返回的值需要用.value 访问
    // 2. 只有取值的的时候computed中的get才会执行
    // 3. 如果所依赖的值没有发生变化，那么多次取值不会重新计算(计算属性的缓存)
    // console.log(fullName1.value)
    // fullName1.value
    // fullName1.value
    // fullName1.value
    // fullName.value = 'aaaa'
    
    
    const fullName = computed(() => {
      console.log('computed')
      return state.firstName + '-'+ state.lastName
    })
    
    effect(() => {
      console.log('effect')
      document.body.innerHTML = fullName.value
    })
    

    setTimeout(() => {
      state.lastName = 'zhang'
      console.log(fullName.value)
    
    }, 1 * 1000)
    
    /*
      1. 计算属性本身就是一个effect
      2. firstname 要依赖于计算属性的effect
      3. 计算属性收集了外层的effect
      4. 依赖的值变化了，会触发计算属性effect重新执行，计算属性重新执行的时候会触发外层effect来执行
    */
  </script>
</body>
</html>
```



``` typescript
import { isFunction } from "@vue/shared"
import { ReactiveEffect, trackEffects, triggerEffects } from "./effect"

class ComputedRefImpl {
  public effect
  public _dirty = true // 默认应该取值的时候进行计算
  public __v_isReadonly = true
  public __v_isRef = true
  public _value: any
  public dep: any = new Set()
  constructor(getter: any, public setter: any) {
    // getter 就是 effect 中的fn，也就是要执行的代码，需要放到effect
    // 在这里，fn 中的属性会被这个effect 收集起来
    this.effect = new ReactiveEffect(getter, () => {
      // 稍后这个依赖的属性变化会执行此调度函数 ??? 这里通知包裹computed 的effect 更新

      // 只有依赖的值变化了 才需要把_dirty 变为脏的
      if (!this._dirty) {
        this._dirty = true
        // 实现触发更新
        triggerEffects(this.dep)
      }
    })
  }

  // 类中的属性访问器，底层就是Object.defineProperty
  get value() {
    // 做依赖收集 需要让computed 收集外层effect
    trackEffects(this.dep) // 把当前的 effect 放进来

    if (this._dirty) { // 这个值是脏的，需要effect运行fn
      this._dirty = false // 这就是缓存的标识 多次访问同样的值 不进行run
      this._value = this.effect.run()
    }
    return this._value
  }
  set value(newValue) {
    console.log(newValue)
    
    this.setter(newValue)
  }
}

export function computed(getterOrOptions: any) {
  let onlyGetter = isFunction(getterOrOptions)
  let getter
  let setter

  if (onlyGetter) {
    getter = getterOrOptions
    setter = () => {console.warn('no set')}
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  
  return new ComputedRefImpl(getter, setter)
}
```



``` typescript
import { Target } from "./reactive"
// 全局effect
export let activeEffect: ReactiveEffect | undefined = undefined

function cleanupEffect(effect: ReactiveEffect) {
  const { deps } = effect // deps是Set 存放属性对应的effect
  if (deps.length) {
    for(let i = 0; i < deps.length; i++) {
      deps[i].delete(effect) // 解除effect，重新收集依赖
    }
    effect.deps.length = 0
  } 
}

export class ReactiveEffect<T = any> {
  active = true
  deps: any = []
  parent: ReactiveEffect | undefined = undefined
  constructor(
    public fn: () => T,
    public scheduler: () => any
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

  stop() {
    if (this.active) {
      this.active = false
    }
    cleanupEffect(this) // 停止effect收集
  }
}

export function effect<T = any>(fn: () => T, option: any = {}) {
  const _effect = new ReactiveEffect(fn, option.scheduler)
  _effect.run()
  // 需要绑定this，不绑定this 指向了window
  const runner: any = _effect.run.bind(_effect) // runner 的this 被指定为_effect 的this
  runner.effect = _effect // 将effect 挂载到runner 函数上
  return runner
}

/**
 * 一个对象 中的某个属性 对应的多个effect
 * WeakMap{对象: Map{key: Set[多个effect]}}
 */
const targetMap = new WeakMap() // targetMap 是个WeakMap
export function track(target: Target, type: string, key: string | symbol) {
  if (!activeEffect) return
  
  let depsMap = targetMap.get(target) // depsMap 是个Map
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)  // dep 是个set
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  trackEffects(dep)
}

export function trackEffects(dep: any) {
  if (!activeEffect) return
  const shouldTrack = !dep.has(activeEffect)
  if (shouldTrack) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

export function trigger(target: Target, type: string, key: string | symbol, value: any, oldValue: any) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return // 触发的值不在模板中使用

  let effects: ReactiveEffect[] = depsMap.get(key) // 存放着好多个effect

  if (effects) {
    triggerEffects(effects)
  }
}

export function triggerEffects(effects: ReactiveEffect[]) {
  effects = [...effects]
  effects.forEach(effect => {
    if (effect !== activeEffect) {
      // console.log(effect.fn)
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        effect.run()
      }
    }
  })
}
```

