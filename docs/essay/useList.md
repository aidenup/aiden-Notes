## 封装
``` ts
// hooks/useList/useList.vue
import { Ref, onMounted, ref, watch } from "vue";
import { OptionsType, MessageType } from './types'
import { errorMessage } from '../message/index'

const DEFAUTLT_MESSAGE: MessageType = {
  GET_DATA_IF_FAILED: "获取列表数据失败",
  EXPORT_DATA_IF_FAILED: "导出数据失败",
}

const DEFAULT_OPTIONS: OptionsType = {
  message: DEFAUTLT_MESSAGE,
}

export default function useList<
  ItemType extends Object,
  FilterOption extends Object
>(
  listRequestFn: Function,
  filterOption: Ref<Object>,
  exportFileFn?: Function,
  options = DEFAULT_OPTIONS
) {
  const curPage = ref(1) // 当前页
  const pageSize = ref(10) // 分页大小
  const loading = ref(false) // 加载态
  const total = ref(0) // 总
  const list = ref<ItemType[]>() // 数据

  const loadData = async(page = curPage.value) => {
    loading.value = true
    try {
      const {
        msg,
        code,
        data: {list: reqList, total: count}
      } = await listRequestFn({...filterOption, pageInfo: {currentPage: page, pageSizeL: pageSize.value}})
      list.value = reqList
      total.value = count
      options?.requestSuccess?.()
    } catch (error) {
      options.message.GET_DATA_IF_FAILED
      options?.requestError?.() && errorMessage(options.message.GET_DATA_IF_FAILED!, { duration: 2000 })
    } finally {
      loading.value = false
    }
  }

  // 重新加载
  const reload = () => {
    loadData()
  }
  // 重置
  const reset = () => {
    if(!filterOption.value) return
    const keys = Reflect.ownKeys(filterOption.value)
    filterOption.value = {} as FilterOption
    keys.forEach((key) => {
      Reflect.set(filterOption.value!, key, undefined)
    })
    loadData()
  }
  // 过滤
  const filter = () => {
    loadData()
  }
  // 导出
  const exportFile = async() => {
    if(!exportFileFn && typeof exportFileFn !== "function") {
      throw new Error("当前没有提供exportFileFn函数")
    }
    try {
      const {
        data: { link }
      } = await exportFileFn(filterOption.value)
      window.open(link)
      options.exportSuccess?.() 
    } catch (error) {
      options.message?.EXPORT_DATA_IF_FAILED
      options?.exportError?.() && errorMessage(options.message.EXPORT_DATA_IF_FAILED!, { offset: 30 })
    }
  }

  watch([curPage, pageSize], () => {
    loadData(curPage.value) 
  })
  onMounted(() => {
    loadData()
  })

  return {
    curPage,
    pageSize,
    total,
    list,
    loadData,
    reload,
    reset,
    filter,
    exportFile
  }
}
```

``` ts
// hooks/useList/types.ts
export interface MessageType {
  GET_DATA_IF_FAILED?: string;
  GET_DATA_IF_SUCCEED?: string;
  EXPORT_DATA_IF_FAILED?: string;
  EXPORT_DATA_IF_SUCCEED?: string;
}

export interface OptionsType {
  message: MessageType;
  requestError?: () => void;
  requestSuccess?: () => void;
  exportError?: () => void;
  exportSuccess?: () => void;
}
```

## 使用 
