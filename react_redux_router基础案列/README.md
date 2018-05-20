## 按需加载antd-mobile， 需要修改babel项
`
"plugins": [
      ["import", { "libraryName": "antd-mobile", "style": "css" }]
    ]
`

## redux使用
1、首先通过reducer新建store， 随时通过store.getState获取状态
2、需要状态变更， store.dispatch(action)来修改状态
3、Reducer函数接受state和action， 返回新的state， 可以用store.subscribe监听每次修改

## reduc和react搭配使用
1、把store.dispatch方法传递给组件， 内部可以调用修改状态
2、Subscribe订阅render函数， 每次修改都重新渲染
3、Redux相关内容， 移到独立文件index.redux.js单独管理

## 处理异步、调试工具、更优雅的和react结合
1、Redux处理异步， 需要redux-chunk插件
    Redux默认只处理同步， 异步任务需要react-thunk中间件
    `npm install redux-thunk --save`
    使用applyMiddleware开启chunk中间件
2、npm install redux-devtools-extension并且开启
3、使用react-redux优雅的链接react和redux

## 安装react-redux
1、`npm install react-redux --save`
2、react-redux提供provider 和 connect两个接口
3、用装饰器的方式修改connect， `npm install babel-plugin-transform-decorators-legacy --save-dev`
4、配置babel `[ "transform-decorators-legacy"]`

## React之什么数据应该放在React组件， 还是redux里面 ？？？？？？？？

## react-router4
1、 4是全新版本， 不兼容以前版本， 兼容浏览器和RN
2、核心概念： 动态路由、Route、Link、Switch
3、`npm install react-router-dom --save` 安装web端路由； BrowserRouter包裹整个应用， Router路由对应渲染的组件， 可嵌套， Link跳转专用; 路由又包含关系的，想要完全匹配需要加关键字'exact'
4、url参数， Route组件参数可用冒号标识参数
5、Redirect组件重定向，  Switch只渲染第一个命中的Route组件
6、和redux配合， 复杂redux应用， 多个reducer， 用combineReducers合并
7、exact参数表示完全匹配


## vscode关于装饰器报错
解决为： 点击左下角设置按钮 --> 打开设置面板 --> 在用户设置或者工作区设置面板下加如下代码：  `"javascript.implicitProjectConfig.experimentalDecorators": true`

## 关于typeError: Cannot read property 'state' of undefined 此报错为devtools版本不一致而报错。 注意安装版本

## Express + mongodb开发后台接口， 使用nodejs的mongoose模块链接和操作mongodb
1、安装express   `npm install express --save`
2、监听路由和响应内容， 使用nodemon自动重启 `npm install nodemon -g`
3、安装mongodb，    配置文件mongodb --config /usr/local/etc/mongod.conf
4、安装mongoose  `npm install mongoose --save` 基本操作： find, findOne, update, Remove

## 前后端联调   
安装axios   npm install axios --save

### 开发模式
1、基于cookie用户验证， express依赖cookie-parse， 需要暗转 `npm install cookie-parse --save`, 登录服务端返回， 请求头带上cookie
