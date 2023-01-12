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
      { text: '📖 开发文档',
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
      '/project/chat/': [
        {
          items: [
            { text: '简介', link: '/project/chat/guide'},
            { text: '更新器', link: '/project/chat/uploder'}
          ]
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
      ],
      '/essay': [
        {
          items: [
            { text: '导读', link: '/essay/guide'},
            { text: '2022年终总结', link: '/essay/2022'},
            { text: 'vue3 hook useList', link: '/essay/useList'}
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
