import React from 'react';
import { connect } from 'react-redux';
import browserCookie from 'browser-cookies';
import { Redirect } from 'react-router-dom';

import { Result, List, WhiteSpace, Button, WingBlank, Modal } from 'antd-mobile';
import { logoutSubmit } from '../../redux/user.redux';

@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends React.Component {
    constructor (props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout () {
        const alert = Modal.alert;
        alert('注销', '确认退出登录吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                console.log(this.props)
                browserCookie.erase('userid');
                // window.location.href = window.location.href;                        // 刷新页面，不友好
                this.props.logoutSubmit()
            }},
        ])
    }
    render () {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        return props.user ? (
            <div>
                <Result
                    img={<img src={require(`../../img/${props.avatar}.png`)} style={{width: 50}} alt="" />}
                    title={this.props.user}
                    message={props.type === 'boss' ? props.company : null}
                ></Result>
                <List renderHeader={() => '简介'}>
                    <Item
                    multipleLine>
                        {props.position ? <Brief>招聘职位： {props.position}</Brief> : null}
                        {this.props.desc.split('\n').map(v => (
                            <Brief key={v}>{v}</Brief>
                        ))}
                        {props.money ? <Brief>薪资： {props.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <WingBlank>
                        <Button type="primary" onClick={this.logout}>退出登录</Button>
                    </WingBlank>
                </List>
            </div>
        ) : <Redirect to={props.redirectTo}></Redirect>
    }
}

export default User;