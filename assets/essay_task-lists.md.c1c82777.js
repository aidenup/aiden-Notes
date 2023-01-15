import{_ as s,c as a,o as n,a as l}from"./app.655a0043.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"task-lists 支持","slug":"task-lists-支持","link":"#task-lists-支持","children":[]}],"relativePath":"essay/task-lists.md","lastUpdated":1673798354000}'),p={name:"essay/task-lists.md"},e=l(`<h2 id="task-lists-支持" tabindex="-1">task-lists 支持 <a class="header-anchor" href="#task-lists-支持" aria-hidden="true">#</a></h2><ul><li>有时候会有以下场景，需要使用任务列表，当前并不支持任务列表。</li></ul><div class="language-md line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> [ ] aaa</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> [ ] bbb</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#C3E88D;">x</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> ccc</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul><li>可以使用 markdown-it-task-lists 插件，用以支持任务列表，使之正常显示。</li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// // 首先需要安装 markdown-it-task-lists ,在项目根目录下执行： yarn add markdown-it-task-lists</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 然后配置 markdown-it 插件</span></span>
<span class="line"><span style="color:#FFCB6B;">markdown</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">lineNumbers</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">config</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">md</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// use more markdown-it plugins!</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">md</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#F07178;">(</span><span style="color:#82AAFF;">require</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">markdown-it-task-lists</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">},</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,5),o=[e];function t(r,c,i,F,y,d){return n(),a("div",null,o)}const u=s(p,[["render",t]]);export{m as __pageData,u as default};
