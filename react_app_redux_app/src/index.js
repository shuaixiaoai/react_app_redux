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


// import App from './App';
import Auth from './Auth.js';
import Dashboard from './Dashboard.js';

import './index.css';
// import { counter } from './index.redux'              // 使用reducer合并之后删除
import reducers from './reducer.js'; 

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
));
// console.log(store.getState())

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <Switch>
                {/* Switch只渲染命中的第一个Route路由组件 */}
                <Route path="/login" exact component={Auth}></Route>
                <Route path="/dashboard" component={Dashboard}></Route>
                <Redirect to="/Dashboard"></Redirect>
                {/* 如果没有命中， 使用Redirect默认跳转， 一般是404页面 */}
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)