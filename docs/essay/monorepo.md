# monorepo

### 什么是monorepo 
答：Monorepo可以理解为一种基于仓库的代码管理策略，它提出将多个代码工程“独立”的放在一个仓库里的管理模式。每个代码工程在逻辑上是可以独立运行开发以及维护管理的。Monorepo 在实际场景中的运用可以非常宽泛，甚至有企业将它所有业务和不同方向语言的代码放在同一个仓库中管理。

### 为什么使用monorepo
Monorepo：只有一个仓库，并且把项目拆分多个独立的代码工程进行管理，而代码工程之间可以通过相应的工具简单的进行代码共享。而传统仓库管理模式则是通过建立多个仓库，每个仓库包含拆分好的代码工程，而仓库间的调用共享则是通过 NPM 或者其他代码引用的方式进行。

#### 例子
##### 传统项目结构 MultiRepo 
比如说我们有两个项目，其中有很多公共用到的东西，会通过npm 发包更新，两个项目再安装更新，实现公用，这样发包很麻烦

```
// Repository - project1

├── node_modules/
├── package.json
├── src/
│   ├── views/
│   ├── router/
|   ├── ...
├── README.md



// Repository - project2

├── node_modules/
├── package.json
├── src/
│   ├── views/
│   ├── router/
|   ├── ...
├── README.md
```
如果两个项目像实现公用方法 可以像下面这样 
```
├── package.json
├── src/
│   ├── views/
|   |   ├── project1/
|   |   ├── project2/
│   ├── router/
|   |   ├── project1/
|   |   ├── project2/
|   ├── ...
│   └── lib/
└── README.md
```
但是这样做容易造成混乱，并且项目要一同部署，没有做到解耦

##### monorepo 的结构如下 
```
// Repository - monorepo

├── node_modules/
├── package.json
├── packages/
│   ├── pacakge1/
|   |   ├── src/
|   |   ├── README.md
|   |   ├── node_modules/
|   |   ├── pacakge.json
│   ├── package2/
|   |   ├── src/
|   |   ├── README.md
|   |   ├── node_modules/
|   |   ├── pacakge.json
│   └── lib/
|   |   ├── src/
|   |   ├── README.md
|   |   ├── node_modules/
|   |   ├── pacakge.json
├── README.md
├── pnpm-workspace.yaml
```

代码共享只需要在package.json 添加包名，然后在各自的项目中引用即可，无需再发npm 包

### monorepo 和 pnpm 结合使用
pnpm 由于 symlink 和 hard link 机制，既极大的缩小了安装包的体积，同时也解决了幽灵依赖的问题。

### 如何落地
如果只是将所有代码放到一个仓库下，那么还不如用MultiRepo

monorepo 的落地需要有一套完整的工程体系来进行支撑，需要考虑项目间依赖分析、依赖安装、构建流程、测试流程、CI 及发布流程等诸多工程环节，同时还要考虑项目规模到达一定程度后的性能问题，比如项目构建/测试时间过长需要进行增量构建/测试、按需执行 CI等等，在实现全面工程化能力的同时，也需要兼顾到性能问题。

所以从零开始构建一套monorepo 工程化工具，是一件难度很高的事情。
比较成熟的方案有 [lerna](https://lerna.js.org/)、[nx](https://nx.dev/getting-started/intro)、[rushstark](https://rushstack.io/)

### monorepo 与 github CI
普通的单体项目可以很方便地使用 CI 工具来自动做一些发布

但是monorepo 的目录结构与依赖机制导致与普通的单体项目使用CI 有一些区别
> 参考 [为Monorepo 项目配置 gitlab ci](https://www.bilibili.com/video/BV1rP411u7Zn/?spm_id_from=333.788&vd_source=0b68e30460b8d7ae7d0b8e11a9a81476)



<hr>

参考
> [ Monorepo 是什么，为什么大家都在用？](https://zhuanlan.zhihu.com/p/77577415)
> 
> [为什么现代前端工程越来越离不开 Monorepo?](https://zhuanlan.zhihu.com/p/362228487)
>
> [pnpm: Workspace](https://pnpm.io/zh/workspaces)

