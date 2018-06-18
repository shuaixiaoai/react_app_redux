import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// 非依赖引入项
import { WhiteSpace, WingBlank, NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { update } from '../../redux/user.redux';

@connect(
    state => state.user,
    { update }
)
class GeniusInfo extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            position: '',
            desc: ''
        }
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    render () {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                { redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar mode="dark">大佬完善信息页</NavBar>
                <AvatarSelector 
                    selectAvatar={(imgname) => {
                        this.setState({
                            avatar: imgname
                        })
                    }}
                ></AvatarSelector>
                <div>
                    <InputItem onChange={(v) => this.handleChange('position', v)}>求职岗位：</InputItem>
                    <TextareaItem 
                        rows={3}
                        autoHeight
                        title="个人简介："
                        onChange={(v) => this.handleChange('desc', v)}>
                    </TextareaItem>
                    <WhiteSpace />
                    <WingBlank>
                        <Button 
                        onClick={() => this.props.update(this.state)}
                        type="primary">保存</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}

export default GeniusInfo;