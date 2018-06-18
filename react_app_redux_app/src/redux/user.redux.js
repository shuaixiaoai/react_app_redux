import axios from 'axios';
import { getRedirectPath } from '../util';

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';                                            // 登录注册成功
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

const initState = {
    redirectTo: '',
    isAuth: false,
    msg: '',
    user: '',
    // pwd: '',
    type: ''
}

// REDUCER
export function user(state=initState, action) {
    switch(action.type) {
        case AUTH_SUCCESS:
            return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }; 
        case ERROR_MSG:
            return { ...state, msg: action.msg, isAuth: false };
        // case LOGIN_SUCCESS:
        //     return { ...state, mag: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload };
        case LOAD_DATA:
            return { ...state, ...action.payload };
        case LOGOUT:
            return { ...initState, redirectTo: '/login' };
        default: 
            return state;
    }
}
function errorMsg(msg) {
    return { msg, type: ERROR_MSG };
}
// function loginSuccess(data) {
//     return { type: AUTH_SUCCESS, payload: data };
// }
// function registerSuccess(data) {
//     return { type: AUTH_SUCCESS, payload: data };
// }
function authSuccess(obj) {
    const { pwd, ...data} = obj;
    return { type: AUTH_SUCCESS, payload: data };
}
// function loadData(data) {
//     return { type: LOAD_DATA, payload: data };
// }

// 登录
export function login({user, pwd}) {
    if (!user|| !pwd) {
        return errorMsg('用户名密码必须输入！');
    }
    return dispatch => {
        axios.post('/user/login', { user, pwd }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}
// 注册
export function register({ user, pwd, repeatPwd, type }) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入！');
    }
    if (pwd !== repeatPwd) {
        return errorMsg('密码和确认密码不一致！')
    }
    return dispatch => {
        axios.post('/user/register', { user, pwd, type })
        .then( res => {
            if (res.status === 200 && res.data.code === 0) {
                // 注册成功
                dispatch(authSuccess({user, pwd, type}));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}
// 更新数据
export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
             .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
             })
    }
}
export function loadData(userinfo) {
    console.log(userinfo, '加载的信息');
    return { type: LOAD_DATA, payload: userinfo };
}
export function logoutSubmit() {
    return { type: LOGOUT };
}
