import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AidenDocs',
  description: 'notion',
  base: '/aiden-Notes/',
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
      { text: '📖 开发文档', link: '/project/guide' },
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
      { text: '🔧 编程工具', link: '/tools/guide' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aidenup' },
      { icon: 'twitter', link: 'https://twitter.com/aiden98289211' },
    ],
    sidebar: {
      '/theory/vue3': [
        {
          text: 'Guide',
          items: [
            { text: 'index', link: 'theory/vue3/guide'},
            { text: 'test', link: 'theory/vue3/test'},
          ],  
        },
      ],
      '/theory/ts': [
        {
          text: 'Guide',
          items: [
            { text: 'index', link: 'theory/ts/guide'},
          ],
        }
      ],
      '/tools/': [
        {
          items: [
            { text: 'algolia', link: 'tools/algolia'}
          ]
        }
      ],
      '/studyDoc/algorithm': [
        {
          items: [
            { text: '导读', link: '/studyDoc/algorithm/guide'},
            { text: '二分查找', link: '/studyDoc/algorithm/array/Binary'}
          ]
        }
      ]
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
