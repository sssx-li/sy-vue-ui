# Sy-Vue-UI

一个基于 Vite/Vue3/TypeScript 等前沿技术的现代组件库，支持按需引入和全部导入。

### 安装

```
npm i sy-element-ui
或
pnpm add sy-element (推荐)
```

### 用法

```js
// main.ts
import { createApp } from 'vue';

// 全部导入
import SyUI from 'sy-vue-ui';
import 'sy-vue-ui/theme-chalk/index.css';

// 按需导入
// import { SyButton } from 'sy-vue-ui'
// import 'sy-vue-ui/theme-chalk/sy-button.css'

import App from './App.vue';

const app = createApp(App);

app.use(SyUI); // 全部注册
// app.use(SyButton) // 按需注册
app.mount('#app');
```

#### 项目参考

- [element-plus](https://github.com/element-plus/element-plus)
- [Jeffrey Dean(从 0 开始搭建 Vue3 组件库)](https://blog.csdn.net/weixin_45821809/article/details/130215212)
