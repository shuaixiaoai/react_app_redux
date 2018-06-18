import React from 'react';
import ReactDom from 'react-dom';
import { createStore, 
         applyMiddleware, 
         compose 
        } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, 
         Route, 
         Redirect, 
         Switch 
        } from 'react-router-dom';

import './index.css';
import 'antd-mobile/dist/antd-mobile.css';
// import { counter } from './index.redux'              // 使用reducer合并之后删除
import reducers from './reducer.js'; 
import './config';
import './index.css';

// 引入组件
import Login from './container/login/login'
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/genius/genius';
import Dashboard from './container/dsahboard/dashboard';

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
));

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    {/* Switch只渲染命中的第一个Route路由组件 */}
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route component={Dashboard}></Route>   
                </Switch>   
            </div>
            {/* 如果没有命中， 使用Redirect默认跳转， 一般是404页面 */}
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)