## task-lists 支持
+ 有时候会有以下场景，需要使用任务列表，当前并不支持任务列表。
``` md
- [ ] aaa
- [ ] bbb
- [x] ccc
```
+ 可以使用 markdown-it-task-lists 插件，用以支持任务列表，使之正常显示。
``` js
// // 首先需要安装 markdown-it-task-lists ,在项目根目录下执行： yarn add markdown-it-task-lists
// 然后配置 markdown-it 插件
markdown: {
  lineNumbers: true,
  config: (md) => {
    // use more markdown-it plugins!
    md.use(require('markdown-it-task-lists'))
  }
},
```