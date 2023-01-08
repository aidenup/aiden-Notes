import{_ as s,c as a,o as n,d as l}from"./app.5085d4ea.js";const o="/aiden-Notes/assets/logined.7afff209.png",p="/aiden-Notes/assets/applications.76acbc1a.png",e="/aiden-Notes/assets/dashboard.f6d9d39e.png",t="/aiden-Notes/assets/apikey.13e4e8fb.png",c="/aiden-Notes/assets/actions.6e7badc6.png",q=JSON.parse('{"title":"algolia","description":"","frontmatter":{},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"在vitepress 中使用","slug":"在vitepress-中使用","link":"#在vitepress-中使用","children":[{"level":3,"title":"账号与创建应用","slug":"账号与创建应用","link":"#账号与创建应用","children":[]},{"level":3,"title":"配置","slug":"配置","link":"#配置","children":[]},{"level":3,"title":"在文档中填写 key","slug":"在文档中填写-key","link":"#在文档中填写-key","children":[]},{"level":3,"title":"私钥放在 Github Secrets 中","slug":"私钥放在-github-secrets-中","link":"#私钥放在-github-secrets-中","children":[]},{"level":3,"title":"创建 crawlerConfig.json","slug":"创建-crawlerconfig-json","link":"#创建-crawlerconfig-json","children":[]},{"level":3,"title":"编写 CI 脚本","slug":"编写-ci-脚本","link":"#编写-ci-脚本","children":[]},{"level":3,"title":"结尾","slug":"结尾","link":"#结尾","children":[]}]}],"relativePath":"tools/algolia.md","lastUpdated":1673185915000}'),r={name:"tools/algolia.md"},D=l('<h1 id="algolia" tabindex="-1">algolia <a class="header-anchor" href="#algolia" aria-hidden="true">#</a></h1><h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-hidden="true">#</a></h2><h4 id="书海里的定位神器-algolia" tabindex="-1">书海里的定位神器：Algolia <a class="header-anchor" href="#书海里的定位神器-algolia" aria-hidden="true">#</a></h4><p>algolia本质上是个搜索引擎服务接口，把索引提前建好，索引就像目录，提前建好搜索时就能秒出。我们作为用户，在搜索关键词时向algolia提出请求，由它计算并传送结果，送交我们的图书馆显示。 完成配置后一切都是自动的。</p><p>algolia提供给个人用户上限1万条索引记录和每月1万次的搜索次数，对于个人用户来说几乎是无限供应，等到若干年后触碰到上限，再向algolia付费不迟。</p><p>algolia是一个商业搜索网站，盈利模式是向商家收费，而我们的私人图书馆蹭了它一点搜索资源，这点资源对于algolia来说，连九百牛一毛都算不上，所以请放心使用。</p><p><a href="https://www.algolia.com/" target="_blank" rel="noreferrer">https://www.algolia.com/</a></p><h2 id="在vitepress-中使用" tabindex="-1">在vitepress 中使用 <a class="header-anchor" href="#在vitepress-中使用" aria-hidden="true">#</a></h2><h3 id="账号与创建应用" tabindex="-1">账号与创建应用 <a class="header-anchor" href="#账号与创建应用" aria-hidden="true">#</a></h3><p>需要在algolia官网注册一个账号，或者直接选择Github 身份登陆。 <img src="'+o+'" alt="render pipeline"></p><p>登录之后会进入控制台页面，点击右上角头像，会有一个设置选项，之后来到 Applications 这里，去创建一个应用，以我自己的为例，下图已经创建好了「chodocs」 <img src="'+p+'" alt="render pipeline"></p><h3 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-hidden="true">#</a></h3><p>获取 key 如图下所示，进入 API Keys 页面。 <img src="'+e+'" alt="render pipeline"> 会看到如下界面，一个是可公开的，Search-Only API Key 是待会我们在 VitePress 项目中会使用的，而 Admin API Key 是用于一会爬虫的 key，因为是私有的，所以一会放在 Github Secrets 中。 <img src="'+t+`" alt="render pipeline"></p><h3 id="在文档中填写-key" tabindex="-1">在文档中填写 key <a class="header-anchor" href="#在文档中填写-key" aria-hidden="true">#</a></h3><p>在上一步我们获取了公开的 key，在这里我们就来配置一下，将上述的 Search-Only API Key 填到 apiKey 字段中，私有的 key 不要填！</p><p>修改文件在 docs/.vitepress/config 文件中</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">algolia</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">appId</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">RDDxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 需要替换</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">apiKey</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">9302dbxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 需要替换</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">indexName</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">chodocs</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 需要替换</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">placeholder</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">请输入关键词</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">buttonText</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">搜索</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="私钥放在-github-secrets-中" tabindex="-1">私钥放在 Github Secrets 中 <a class="header-anchor" href="#私钥放在-github-secrets-中" aria-hidden="true">#</a></h3><p>将上述获取的 Admin API Key 添加到 Github Secrets 中，如下图所示，创建 API_KEY 和 APPLICATION_ID 两个字段，一会在 ci 中会使用到。 <img src="`+c+`" alt="render pipeline"></p><h3 id="创建-crawlerconfig-json" tabindex="-1">创建 crawlerConfig.json <a class="header-anchor" href="#创建-crawlerconfig-json" aria-hidden="true">#</a></h3><p>在项目的根目录下创建 crawlerConfig.json 文件，内容如下，注意前两个字段需要进行替换。这是告诉 algolia 需要爬取的配置。</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">index_name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">chodocs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 填写自己的索引名称</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">start_urls</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://chodocs.cn/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">],</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 填写自己的网站地址</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">rateLimit</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">8</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">maxDepth</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">selectors</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">lvl0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">selector</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">defaultValue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Documentation</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">lvl1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.content h1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">lvl2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.content h2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">lvl3</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.content h3</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">lvl4</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.content h4</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">lvl5</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.content h5</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">content</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.content p, .content li</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">selectors_exclude</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">aside</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.page-footer</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.next-and-prev-link</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.table-of-contents</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">js_render</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="编写-ci-脚本" tabindex="-1">编写 CI 脚本 <a class="header-anchor" href="#编写-ci-脚本" aria-hidden="true">#</a></h3><p>在项目根目录.github/workflows 文件夹下，创建 algolia.yml 文件（名称可更改，自定义），粘贴如下内容：</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">algolia</span></span>
<span class="line"><span style="color:#FF9CAC;">on</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">push</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">branches</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">main</span></span>
<span class="line"><span style="color:#F07178;">jobs</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">algolia</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">runs-on</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ubuntu-latest</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">steps</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">actions/checkout@v3</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Get the content of algolia.json as config</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">algolia_config</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">echo &quot;config=$(cat crawlerConfig.json | jq -r tostring)&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Push indices to Algolia</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">signcl/docsearch-scraper-action@master</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">env</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">APPLICATION_ID</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{ secrets.APPLICATION_ID }}</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">API_KEY</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{ secrets.API_KEY }}</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">CONFIG</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{ steps.algolia_config.outputs.config }}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><blockquote><p>解释一下：这里 yml 就是使用 Github Actions 在 Docker 中执行的 AlgoliaDocSearch scraper action，当我们推送到 main 分支时就会立即执行这个任务，当然如果你是 master 分支只需要修改 branches 那里的值即可。</p></blockquote><h3 id="结尾" tabindex="-1">结尾 <a class="header-anchor" href="#结尾" aria-hidden="true">#</a></h3><p>其他相关配置请参考下方链接 <a href="https://zhuanlan.zhihu.com/p/568538285" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/568538285</a></p>`,28),F=[D];function y(i,C,A,h,u,d){return n(),a("div",null,F)}const _=s(r,[["render",y]]);export{q as __pageData,_ as default};
