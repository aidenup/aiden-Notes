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
        text: 'ð å­¦ä¹ ç¬è®°',
        items: [
          {
            text: 'ç®æ³',
            link: '/studyDoc/algorithm/guide'
          }
        ]
      },
      {
        text: 'ð å¼åææ¡£',
        items: [
          {
            text: 'chat',
            link: '/project/chat/guide.md'
          }
        ]
      },
      {
        text: 'ð æ·±åº¦å­¦ä¹ ',
        items: [
          {
            text: 'vue3 æºç ',
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
                text: 'tsç±»åä½æ',
                link: '/theory/ts/guide'
              }
            ]
          }
        ]
      },
      { text: 'ð å¤å¿å½', link: '/memo/guide' },
      { text: 'âï¸ éç¬', link: '/essay/guide' },
      { text: 'ð§ ç¼ç¨å·¥å·', link: '/tools/guide' },
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
      placeholder: 'è¯·è¾å¥å³é®è¯',
      buttonText: 'æç´¢',
    },
    footer: {
      message: 'test',
      copyright: 'test'
    }
  },
  lastUpdated: true,
})
