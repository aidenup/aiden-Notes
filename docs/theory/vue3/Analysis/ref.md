## ref



``` html
<!-- <script src="../../../node_modules/@vue/reactivity/dist/reactivity.global.js"></script> -->
<script src="../../../node_modules/vue/dist/vue.global.js"></script>
<!-- <script src="./reactivity.global.js"></script> -->
<script>
  const { ref, effect } = Vue

  const flag = ref(false) // 会把flag包装成对象

  effect(() => {
    document.body.innerHTML = flag.value ? '你好' : '不好'
  })

  setTimeout(() => {
    flag.value = !flag.value
  }, 1000)

</script>
```



基本

``` typescript
// ref.ts
import { isObject } from '@vue/shared'
import { reactive } from './reactive'

// 将对象变成proxy
function toReactive(value: any) {
  return isObject(value) ? reactive(value) : value
}

class RefImp {
  public _value: any
  constructor(public rewValue: any) {
    this._value = toReactive(rewValue)
  }

  get value() {
    return this._value
  }
  set value(newValue: any) {
    // debugger
    if (newValue !== this.rewValue) {
      this._value = toReactive(newValue)
      this.rewValue = newValue
    }
  }
}

export function ref(value: any) {
  return new RefImp(value)
}

```



依赖收集

``` typescript
// ref.ts
...
class RefImp {
  public _value: any
  public dep: any = new Set()
  public __v_isRef = true
  constructor(public rewValue: any) {
    this._value = toReactive(rewValue)
  }

  get value() {
    // 获取值的时候 effect 与 key 关联
    trackEffects(this.dep)
    return this._value
  }
  set value(newValue: any) {
    if (newValue !== this.rewValue) {
      this._value = toReactive(newValue)
      this.rewValue = newValue
      // 值变化 触发更新
      triggerEffects(this.dep)
    }
  }
}
...
```



#### toRefs

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
  <!-- <script src="../../../node_modules/@vue/reactivity/dist/reactivity.global.js"></script> -->
  <!-- <script src="../../../node_modules/vue/dist/vue.global.js"></script> -->
  <script src="./reactivity.global.js"></script>
  <script>
    const { ref, effect, reactive, toRefs } = VueReactivity
    const student = reactive({ name: 'aaa', age: 12 })
    const { name, age } = toRefs(student)
    
    // const name = toRef(student, 'name')
    // const age = toRef(student, 'age')

    effect(() => {
      document.body.innerHTML = name.value + age.value
    })

    setTimeout(() => {
      // student.age = 20
      age.value = 20
    }, 1000)
    
  </script>
</body>
</html>
```



``` typescript
// ref.ts
...
class ObjectRefImpl {
  constructor(public object: any, public key: any) {}

  get value() {
    return this.object[this.key]
  }
  set value(newValue) {
    this.object[this.key] = newValue
  }
}

export function toRef(object: any, key: any) {
  return new ObjectRefImpl(object, key)
}

export function toRefs(object: any) {
  // 对象 or 数组
  const result: any = isArray(object) ? new Array(object.length) : {}
  
  for (const key in object) {
    result[key] = toRef(object, key)
  }

  return result
}
```





#### 取ref

``` html
<script>
	const { ref, effect, reactive, toRefs， proxyRefs } = VueReactivity
  let name = ref('aaa')
  let age = ref(12)
 
  let student = proxyRefs({ name, age })
  // 取值都是在模板中取值的，在模板里取值的时候都会自动的去掉ref
  effect(() => {
    document.body.innerHTML = student.name + student.age
    // 源码里会包装成_ctx.name _ctx.age
  })
</script>
```

proxyRefs

``` typescript
// ref.ts
export function proxyRefs(object: any) {
  return new Proxy(object, {
    get(target, key, recevier) {
      let r = Reflect.get(target, key, recevier)
      // 判断r 是否是ref
      return r.__v_isRef ? r.value : r
    },
    set(target, key, value, recevier) {
      let oldValue = target[key]
      if (oldValue.__v_isRef) {
        oldValue.value = value
        return true
      } else {
        return Reflect.set(target, key, value, recevier)
      }
    }
  })
}
```
