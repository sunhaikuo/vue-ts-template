#### KanKan 星项目

> 运行

* yarn install
* npm run dev

> 技术栈

* Vue2.6 + Vuex + Vue-router + Vue-SSR + Typescript

> 项目特点：

* 目录结构简单直观
* 最新版 Vue 和 Typescript 结合，极大的提供开发的便利性
* 每个模块都使用 Vue-ssr 进行渲染，直出数据，首屏加载速度更快
* 全站使用 Typescript，包括：框架以及打包、启动服务
* 数据获取统一管理，让业务和数据分离
* image 文件和 vue 文件在同一目录，便是查找和替换
* 为 H5 项目而生，自动把 px 转 rem
* 动态加载 Vue-router，打包后体积更小，同时避免路径冲突
* 优化 ts-loader 的加载速度，性能提升 5 倍
* 最小化依赖包，每个 npm 包都必不可少
* 使用声明式 Vuex
* 使用 interface 进行数据约束，不易出错

> 结构说明

* /src/api：前后台获取数据入口
* /src/component：包含所有组件(.vue 文件)、静态资源
* /src/entry：webpack 打包前后端代码的入口
* /src/interface：包含所有接口，主要约束 Vuex 传递数据
* /src/router：包含所有 Vue-router 的配置，以及 router 包装类
* /src/store：包含所有 Vuex 的配置文件
* /tools：Webpack 打包以及 express 的 router 的执行文件

> 侃侃星一期需求

* 直播详情页: 孙海阔
* 游戏排行榜:孙海阔
* applink 跳转:孙海阔
* 用户注册登录时的服务条款静态页:孙海阔
* 用户主页:闫林华
* 老拉新流程页:闫林华
* IM—群分享页:闫林华
* 话题详情页:夏超
* 发现排行榜:郭凯铭
* 游戏记录页:郭凯铭
* 游戏规则页面:郭凯铭
* 游戏小程序:许东胜
* 新 app 下载页:夏超
* banner 顶图:夏超

> TODO

* 线上环境要增加 bundleRender
* 上线会把所有的 HTML 压缩成一行
* 线上环境要把所有 bundle 都缓存起来
