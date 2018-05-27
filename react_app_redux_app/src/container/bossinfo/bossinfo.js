import React from 'react';
import { NavBar, InputItem, TextareaItem } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';

class BossInfo extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            position: '',
            company: '',
            money: '',
            desc: ''
        }
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    render () {
        return (
            <div>
                <NavBar mode="dark">BOSS完善信息页</NavBar>
                <AvatarSelector></AvatarSelector>
                <InputItem onChange={(v) => this.handleChange('position', v)}>招聘职位：</InputItem>
                <InputItem onChange={(v) => this.handleChange('company', v)}>公司名称：</InputItem>
                <InputItem onChange={(v) => this.handleChange('money', v)}>职位薪资：</InputItem>
                <TextareaItem 
                    rows={3}
                    autoHeight
                    title="职位要求："
                    onChange={(v) => this.handleChange('desc', v)}></TextareaItem>
            </div>
        )
    }
}

export default BossInfo;