import React from 'react';
import Logo from '../../component/logo/logo';
import { Redirect } from 'react-router-dom';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { login } from '../../redux/user.redux';
import { connect } from 'react-redux';

@connect(
    state => state.user,
    { login }
)

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            user: '',
            pwd: ''
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.register = this.register.bind(this);
    }
    register () {
        console.log(this.props);
        this.props.history.push('/register');
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    handleLogin () {
        console.log(this.props)
        this.props.login(this.state);
    }
    render () {
        return (
            <div>
                <Logo></Logo>
                {/* <h2>登录页</h2> */}
                <WingBlank>
                    <List>
                        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={(v) => this.handleChange('user', v)}
                        >用户名：</InputItem>
                        <WhiteSpace />
                        <InputItem
                            onChange={(v) => this.handleChange('pwd', v)}
                            type='password'
                        >密码：</InputItem>
                    </List>
                    <Button 
                        type="primary"
                        onClick={this.handleLogin}
                    >登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;