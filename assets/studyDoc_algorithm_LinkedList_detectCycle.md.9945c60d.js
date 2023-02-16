import{_ as s,c as n,o as a,a as e}from"./app.36cb0a87.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"环形链表 II","slug":"环形链表-ii","link":"#环形链表-ii","children":[]}],"relativePath":"studyDoc/algorithm/LinkedList/detectCycle.md","lastUpdated":1676556537000}'),l={name:"studyDoc/algorithm/LinkedList/detectCycle.md"},p=e(`<h2 id="环形链表-ii" tabindex="-1">环形链表 II <a class="header-anchor" href="#环形链表-ii" aria-hidden="true">#</a></h2><p>给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。</p><p>如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。<strong>注意：pos 不作为参数进行传递</strong>，仅仅是为了标识链表的实际情况。</p><p><strong>不允许修改 链表。</strong></p><p><strong>示例1：</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">不允许修改 链表。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>示例 2：</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">输入：head = [1,2], pos = 0</span></span>
<span class="line"><span style="color:#A6ACCD;">输出：返回索引为 0 的链表节点</span></span>
<span class="line"><span style="color:#A6ACCD;">解释：链表中有一个环，其尾部连接到第一个节点。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>示例 3：</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">输入：head = [1], pos = -1</span></span>
<span class="line"><span style="color:#A6ACCD;">输出：返回 null</span></span>
<span class="line"><span style="color:#A6ACCD;">解释：链表中没有环。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,10),t=[p];function r(i,o,c,d,u,C){return a(),n("div",null,t)}const A=s(l,[["render",r]]);export{m as __pageData,A as default};
