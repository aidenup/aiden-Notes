import { defineConfig } from 'vitepress'
import { vue3, ts } from './sidebar/theory'
import { chat } from './sidebar/project'
import { tools } from './sidebar/tools'
import { algorithm } from './sidebar/study'
import { essay } from './sidebar/essay'

export default defineConfig({
  title: 'AidenDocs',
  description: 'notion',
  base: '/aiden-Notes/',
  markdown: {
    lineNumbers: true,
    config: (md) => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-task-lists'))
    }
  },
  themeConfig: {
    outline: 'deep',
    nav: [
      {
        text: '📒 学习笔记',
        items: [
          {
            text: '算法',
            link: '/studyDoc/algorithm/guide'
          }
        ]
      },
      {
        text: '📖 开发文档',
        items: [
          {
            text: 'chat',
            link: '/project/chat/guide.md'
          }
        ]
      },
      {
        text: '👓 深度学习',
        items: [
          {
            text: 'vue3 源码',
            items: [
              {
                text: 'mini vue3',
                link: '/theory/vue3/guide'
              }
            ]
          },
          {
            text: 'TS',
            items: [
              {
                text: 'ts类型体操',
                link: '/theory/ts/guide'
              }
            ]
          }
        ]
      },
      { text: '📝 备忘录', link: '/memo/guide' },
      { text: '✍️ 随笔', link: '/essay/guide' },
      { text: '🔧 编程工具', link: '/tools/guide' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aidenup' },
      { icon: 'twitter', link: 'https://twitter.com/aiden98289211' },
    ],
    sidebar: {
      '/theory/vue3': [...vue3],
      '/theory/ts': [...ts],
      '/project/chat/': [...chat],
      '/tools/': [...tools],
      '/studyDoc/algorithm': [...algorithm],
      '/essay': [...essay]
    },
    algolia: {
      appId: 'D0OLMUXOC6',
      apiKey: '79e87f1058bc12da45395eacce5d28c0',
      indexName: 'aidenDocs',
      placeholder: '请输入关键词',
      buttonText: '搜索',
    },
    footer: {
      message: 'test',
      copyright: 'test'
    }
  },
  lastUpdated: true,
})
