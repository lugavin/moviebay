# MovieBay

近几年兴起的React、Vue、Angular等MVVM框架能帮我们快速实现界面渲染、事件绑定、路由分发等复杂功能，但在一些只需完成数据和模板简单渲染的场合，它们就显得笨重而且学习成本较高了。

在开发实践中，前端经常需要请求后端接口获取数据并将这些数据在同一个样式模板上展现出来，而为了避免做重复的渲染工作，通常会引入第三方模板引擎来完成渲染操作，其中 doT.js 就是一个非常优秀的模板引擎。

``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>doT</title>
</head>
<body>

<div id="app"></div>

<template id="tmpl">
  <h1>{{=it.title}}</h1>
</template>

<script src="https://cdn.jsdelivr.net/npm/dot/doT.js"></script>
<script>
  var tmpl = document.querySelector('#tmpl').innerHTML;
  var tmplFn = doT.template(tmpl);
  document.querySelector('#app').innerHTML = tmplFn({title: 'doT'});
</script>
</body>
</html>
```

``` vue
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Vue</title>
</head>
<body>

<div id="app">
  {{ message }}
</div>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      message: 'Vue'
    }
  });
</script>
</body>
</html>
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## 数据绑定

### 单向绑定

- Mustache 语法：双大括号语法用于普通文本值绑定
- v-once 指令：用于执行一次性地插值，当数据改变时，插值处的内容不会更新
- v-bind 指令：用于 HTML 属性绑定
- v-html 指令：用于输出真正的 HTML

### 双向绑定

- v-model 指令：用于在表单元素上创建双向数据绑定


## 条件渲染

v-if 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。

v-show 指令只是简单地切换元素的 CSS display 属性，元素始终会被渲染并保留在 DOM 中。

> 在 JavaScript 中，truthy（真值）指的是在布尔值上下文中，转换后的值为真的值。所有值都是真值，除非它们被定义为 假值（即除 false、0、""、null、undefined 和 NaN 以外皆为真值）。


## 组件

组件是可复用的 Vue 实例且带有一个名字，我们可以在一个通过 new Vue 创建的 Vue 根实例中，把这个组件作为自定义元素来使用（组件是自定义元素）。

因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，仅有例外的是像 el 这样根实例特有的选项；
此外，一个组件的 data 选项必须是一个函数，以保证每个实例可以维护一份被返回对象的独立的拷贝。

### 组件注册

1. 全局注册

使用 Vue.component 来创建组件，这些组件是全局注册的，也就是说它们在注册之后可以用在任何新创建的 Vue 根实例的模板中。

``` vue
<div id="app">
  <my-component></my-component>
</div>

Vue.component('my-component', { /* ... */ })

new Vue({ el: '#app' })
```

2. 局部注册

全局注册所有的组件意味着即便你已经不再使用某一个组件了，它仍然会被包含在你最终的构建结果中，这造成了用户下载的 JavaScript 的无谓的增加。

在这些情况下，你可以通过一个普通的 JavaScript 对象来定义组件，然后在 components 选项中定义你想要使用的组件，对于 components 对象中的每个属性来说，其属性名就是自定义元素的名字，其属性值就是这个组件的选项对象：

``` vue
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }

new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```

注意局部注册的组件在其子组件中不可用。例如，如果你希望 ComponentA 在 ComponentB 中可用，则你需要这样写：

``` vue
var ComponentA = { /* ... */ }

var ComponentB = {
  components: {
    'component-a': ComponentA
  }
}
```

或者如果你通过 Babel 和 webpack 使用 ES2015 模块，那么代码看起来更像：

``` vue
import ComponentA from '@/components/ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
```

注意，在 ES2015+ 中，在对象中放一个类似 ComponentA 的变量名其实是 ComponentA: ComponentA 的缩写，即这个变量名同时是：
- 用在模板中的自定义元素的名称
- 包含了这个组件选项的变量名


## 插槽

插槽，也就是slot，用在组件中，向组件分发内容，是组件的一块HTML模板，这块模板显示不显示以及怎样显示由父组件来决定。实际上，一个slot最核心的两个问题在这里就点出来了，是显示不显示和怎样显示。

由于插槽是一块模板，所以，对于任何一个组件，从模板种类的角度来分，其实都可以分为非插槽模板和插槽模板两大类。
非插槽模板指的是html模板，比如 div、span、ul、table 这些，非插槽模板的显示与隐藏以及怎样显示由组件自身控制；插槽模板是slot，它是一个空壳子，因为它的显示与隐藏以及最后用什么样的html模板显示由父组件控制，但是插槽显示的位置却由子组件自身决定，slot写在组件template的什么位置，父组件传过来的模板将来就显示在什么位置。

> 在 2.6.0 中，Vue为具名插槽和作用域插槽引入了一个新的统一的语法 (即 v-slot 指令)，它取代了 slot 和 slot-scope 这两个目前已被废弃但未被移除且仍在文档中的特性。需要注意的是，v-slot 指令只能用在自定义组件 component 或 template 标签上。

Vue的插槽分为三种：匿名插槽、具名插槽和作用域插槽。

``` vue
<!-- MyList.vue -->
<template>
    <div class="my-list">
        <h3 class="title">{{ title }}</h3>
        <ul class="list">
            <li v-for="(item, i) in items" :key="i">
                <slot v-bind="item"/>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'MyList',
    props: ['title', 'items'],
}
</script>
```

``` vue
<!-- App.vue -->

<!-- V2.6版本前 -->

<my-list title="Colors" :items="colors">
    <!-- 通过 slot-scope 指定的临时变量来接收子组件传上来的数据 -->
    <template slot="default" slot-scope="color">
        <span :style="{ color: color.hex }">{{ color.name }}</span>
    </template>
</my-list>

<!-- V2.6版本后 -->

<!-- 写法一 -->
<my-list title="Colors" :items="colors">
    <template v-slot="color">
        <span :style="{ color: color.hex }">{{ color.name }}</span>
    </template>
</my-list>

<!-- 写法二 -->
<my-list title="Colors" :items="colors" v-slot="color">
    <span :style="{ color: color.hex }">{{ color.name }}</span>
</my-list>

<!-- 写法三 -->
<my-list title="Colors" :items="colors" v-slot="{ name, hex }">
    <span :style="{ color: hex }">{{ name }}</span>
</my-list>

<script>
import MyList from '@/components/MyList';

export default {
    name: 'App',
    data: () => ({
        colors: [
            {name: 'Green', hex: '#229954'},
            {name: 'Yellow', hex: '#f4d03f'},
            {name: 'Purple', hex: '#9b59b6'}
        ]
    }),
    components: {MyList}
};
</script>
```


## Vuex


## HTML文件和静态资源

### HTML文件

public/index.html 文件是一个会被 html-webpack-plugin 处理的模板。在构建过程中，资源链接会被自动注入。

另外，Vue CLI 也会自动注入 resource hint (preload/prefetch、manifest 和图标链接 (当用到 PWA 插件时) 以及构建过程中处理的 JavaScript 和 CSS 文件的资源链接。

因为 index 文件被用作模板，所以你可以使用 [lodash template](https://lodash.com/docs/4.17.15#template) 语法插入内容：

- <%= VALUE %> 用来做不转义插值；
- <%- VALUE %> 用来做 HTML 转义插值；
- <% expression %> 用来描述 JavaScript 流程控制。

除了被 html-webpack-plugin 暴露的默认值之外，所有客户端环境变量也可以直接使用。例如，BASE_URL 的用法：<base href="<%= BASE_URL %>">

### 静态资源

静态资源可以通过两种方式进行处理：

- 在 JavaScript 被导入或在 template/CSS 中通过相对路径被引用。这类引用会被 webpack 处理。
- 放置在 public 目录下或通过绝对路径被引用。这类资源将会直接被拷贝，而不会经过 webpack 的处理。

> 注意：任何放置在 public 文件夹的静态资源都会被简单的复制，而不经过 webpack 处理，你需要通过绝对路径来引用它们；public 目录提供的是一个应急手段，我们推荐将资源作为你的模块依赖图的一部分导入。

当你在 JavaScript、CSS 或 *.vue 文件中使用相对路径 (必须以 . 开头) 引用一个静态资源时，该资源将会被包含进入 webpack 的依赖图中。在其编译过程中，所有诸如 <img src="...">、background: url(...) 和 CSS @import 的资源 URL 都会被解析为一个模块依赖。例如，url(./image.png) 会被翻译为 require('./image.png')；静态资源 URL 转换规则如下：
- 如果 URL 是一个绝对路径 (例如 /images/foo.png)，它将会被保留不变。
- 如果 URL 以 . 开头，它会作为一个相对模块请求被解释且基于你的文件系统中的目录结构进行解析。
- 如果 URL 以 ~ 开头，其后的任何内容都会作为一个模块请求被解析。这意味着你甚至可以引用 Node 模块中的资源：
- 如果 URL 以 @ 开头，它也会作为一个模块请求被解析。它的用处在于 Vue CLI 默认会设置一个指向 <projectRoot>/src 的别名 @。(仅作用于模版中)


## 服务端渲染

服务端渲染并不是一个新的概念，在单页应用还没有流行起来的时候，页面就是通过服务端渲染好，并传递给浏览器的。当用户需要访问新的页面时，需要再次请求服务器，返回新的页面。

为了优化体验，开发者们开始选择采用JS在前端完成渲染过程，用前后端分离的手段，使后端更专注于数据，而前端注重于处理展示，通过设计良好的 API 以及 Ajax 技术完成前后端的交互，Angular、React、Vue等框架应运而生。

这些框架给开发者带来了巨大的便利，但是对于一些论坛、资讯网站或是企业官网来说，由于对搜索引擎优化（SEO）有强烈的要求，而前端渲染技术无法满足其需求，如果无法通过搜索引擎的搜索输出自身的内容，那么网站的价值就会大大受影响，要解决这类问题，还是要靠服务端渲染。

Vue 官方提供的 vue-server-renderer 可以用来进行服务端渲染的工作，但是需要增加额外的工作量，开发体验仍有待提高，而 Nuxt 推出后，这个问题被很好的解决了。

## 参考链接

- [Vue官方教程](https://cn.vuejs.org/v2/guide/)
- [Vue Router](https://router.vuejs.org/zh/)
- [Vue对比其他框架](https://cn.vuejs.org/v2/guide/comparison.html)
- [Learn ES2015](https://babeljs.io/docs/en/learn)
- [Working with Webpack](https://cli.vuejs.org/config/)
