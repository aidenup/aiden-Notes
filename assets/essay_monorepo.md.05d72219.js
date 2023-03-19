import{_ as s,c as n,o as a,a as e}from"./app.e27f67d8.js";const u=JSON.parse('{"title":"monorepo","description":"","frontmatter":{},"headers":[{"level":3,"title":"什么是monorepo","slug":"什么是monorepo","link":"#什么是monorepo","children":[]},{"level":3,"title":"为什么使用monorepo","slug":"为什么使用monorepo","link":"#为什么使用monorepo","children":[]},{"level":3,"title":"monorepo 和 pnpm 结合使用","slug":"monorepo-和-pnpm-结合使用","link":"#monorepo-和-pnpm-结合使用","children":[]},{"level":3,"title":"如何落地","slug":"如何落地","link":"#如何落地","children":[]},{"level":3,"title":"monorepo 与 github CI","slug":"monorepo-与-github-ci","link":"#monorepo-与-github-ci","children":[]}],"relativePath":"essay/monorepo.md","lastUpdated":1679222700000}'),p={name:"essay/monorepo.md"},l=e(`<h1 id="monorepo" tabindex="-1">monorepo <a class="header-anchor" href="#monorepo" aria-hidden="true">#</a></h1><h3 id="什么是monorepo" tabindex="-1">什么是monorepo <a class="header-anchor" href="#什么是monorepo" aria-hidden="true">#</a></h3><p>答：Monorepo可以理解为一种基于仓库的代码管理策略，它提出将多个代码工程“独立”的放在一个仓库里的管理模式。每个代码工程在逻辑上是可以独立运行开发以及维护管理的。Monorepo 在实际场景中的运用可以非常宽泛，甚至有企业将它所有业务和不同方向语言的代码放在同一个仓库中管理。</p><h3 id="为什么使用monorepo" tabindex="-1">为什么使用monorepo <a class="header-anchor" href="#为什么使用monorepo" aria-hidden="true">#</a></h3><p>Monorepo：只有一个仓库，并且把项目拆分多个独立的代码工程进行管理，而代码工程之间可以通过相应的工具简单的进行代码共享。而传统仓库管理模式则是通过建立多个仓库，每个仓库包含拆分好的代码工程，而仓库间的调用共享则是通过 NPM 或者其他代码引用的方式进行。</p><h4 id="例子" tabindex="-1">例子 <a class="header-anchor" href="#例子" aria-hidden="true">#</a></h4><h5 id="传统项目结构-multirepo" tabindex="-1">传统项目结构 MultiRepo <a class="header-anchor" href="#传统项目结构-multirepo" aria-hidden="true">#</a></h5><p>比如说我们有两个项目，其中有很多公共用到的东西，会通过npm 发包更新，两个项目再安装更新，实现公用，这样发包很麻烦</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">// Repository - project1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">├── node_modules/</span></span>
<span class="line"><span style="color:#A6ACCD;">├── package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">├── src/</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── views/</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── router/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├── ...</span></span>
<span class="line"><span style="color:#A6ACCD;">├── README.md</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// Repository - project2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">├── node_modules/</span></span>
<span class="line"><span style="color:#A6ACCD;">├── package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">├── src/</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── views/</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── router/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├── ...</span></span>
<span class="line"><span style="color:#A6ACCD;">├── README.md</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>如果两个项目像实现公用方法 可以像下面这样</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">├── package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">├── src/</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── views/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── project1/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── project2/</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── router/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── project1/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── project2/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├── ...</span></span>
<span class="line"><span style="color:#A6ACCD;">│   └── lib/</span></span>
<span class="line"><span style="color:#A6ACCD;">└── README.md</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>但是这样做容易造成混乱，并且项目要一同部署，没有做到解耦</p><h5 id="monorepo-的结构如下" tabindex="-1">monorepo 的结构如下 <a class="header-anchor" href="#monorepo-的结构如下" aria-hidden="true">#</a></h5><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">// Repository - monorepo</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">├── node_modules/</span></span>
<span class="line"><span style="color:#A6ACCD;">├── package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">├── packages/</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── pacakge1/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── src/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── README.md</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── node_modules/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── pacakge.json</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── package2/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── src/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── README.md</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── node_modules/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── pacakge.json</span></span>
<span class="line"><span style="color:#A6ACCD;">│   └── lib/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── src/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── README.md</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── node_modules/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   ├── pacakge.json</span></span>
<span class="line"><span style="color:#A6ACCD;">├── README.md</span></span>
<span class="line"><span style="color:#A6ACCD;">├── pnpm-workspace.yaml</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>代码共享只需要在package.json 添加包名，然后在各自的项目中引用即可，无需再发npm 包</p><h3 id="monorepo-和-pnpm-结合使用" tabindex="-1">monorepo 和 pnpm 结合使用 <a class="header-anchor" href="#monorepo-和-pnpm-结合使用" aria-hidden="true">#</a></h3><p>pnpm 由于 symlink 和 hard link 机制，既极大的缩小了安装包的体积，同时也解决了幽灵依赖的问题。</p><h3 id="如何落地" tabindex="-1">如何落地 <a class="header-anchor" href="#如何落地" aria-hidden="true">#</a></h3><p>如果只是将所有代码放到一个仓库下，那么还不如用MultiRepo</p><p>monorepo 的落地需要有一套完整的工程体系来进行支撑，需要考虑项目间依赖分析、依赖安装、构建流程、测试流程、CI 及发布流程等诸多工程环节，同时还要考虑项目规模到达一定程度后的性能问题，比如项目构建/测试时间过长需要进行增量构建/测试、按需执行 CI等等，在实现全面工程化能力的同时，也需要兼顾到性能问题。</p><p>所以从零开始构建一套monorepo 工程化工具，是一件难度很高的事情。 比较成熟的方案有 <a href="https://lerna.js.org/" target="_blank" rel="noreferrer">lerna</a>、<a href="https://nx.dev/getting-started/intro" target="_blank" rel="noreferrer">nx</a>、<a href="https://rushstack.io/" target="_blank" rel="noreferrer">rushstark</a></p><h3 id="monorepo-与-github-ci" tabindex="-1">monorepo 与 github CI <a class="header-anchor" href="#monorepo-与-github-ci" aria-hidden="true">#</a></h3><p>普通的单体项目可以很方便地使用 CI 工具来自动做一些发布</p><p>但是monorepo 的目录结构与依赖机制导致与普通的单体项目使用CI 有一些区别</p><blockquote><p>参考 <a href="https://www.bilibili.com/video/BV1rP411u7Zn/?spm_id_from=333.788&amp;vd_source=0b68e30460b8d7ae7d0b8e11a9a81476" target="_blank" rel="noreferrer">为Monorepo 项目配置 gitlab ci</a></p></blockquote><hr><p>参考</p><blockquote><p><a href="https://zhuanlan.zhihu.com/p/77577415" target="_blank" rel="noreferrer"> Monorepo 是什么，为什么大家都在用？</a></p><p><a href="https://zhuanlan.zhihu.com/p/362228487" target="_blank" rel="noreferrer">为什么现代前端工程越来越离不开 Monorepo?</a></p><p><a href="https://pnpm.io/zh/workspaces" target="_blank" rel="noreferrer">pnpm: Workspace</a></p></blockquote>`,28),r=[l];function o(c,i,t,b,m,C){return a(),n("div",null,r)}const d=s(p,[["render",o]]);export{u as __pageData,d as default};
