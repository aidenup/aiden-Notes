import{_ as e,c as t,o as a,a as o}from"./app.e6109b4b.js";const u=JSON.parse('{"title":"vnode 到真实DOM 是如何转变的","description":"","frontmatter":{},"headers":[{"level":2,"title":"组件的渲染过程","slug":"组件的渲染过程","link":"#组件的渲染过程","children":[]}],"relativePath":"theory/vue3/Analysis/vnodeToDOM.md","lastUpdated":1675691656000}'),n={name:"theory/vue3/Analysis/vnodeToDOM.md"},r=o('<h1 id="vnode-到真实dom-是如何转变的" tabindex="-1">vnode 到真实DOM 是如何转变的 <a class="header-anchor" href="#vnode-到真实dom-是如何转变的" aria-hidden="true">#</a></h1><h2 id="组件的渲染过程" tabindex="-1">组件的渲染过程 <a class="header-anchor" href="#组件的渲染过程" aria-hidden="true">#</a></h2><p>本质上就是把各种类型的vnode 渲染成真实的DOM</p><p><strong>组件</strong>是由模板、组件描述对象和数据构成的，数据的变化会影响组件的变化</p><ul><li>组件的渲染过程中创建了一个<strong>带副作用的渲染函数</strong></li><li>当数据变化的时候就会执行这个渲染函数来触发组件的更新</li></ul>',5),d=[r];function s(i,_,l,c,h,p){return a(),t("div",null,d)}const m=e(n,[["render",s]]);export{u as __pageData,m as default};