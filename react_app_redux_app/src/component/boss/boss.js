import React from 'react';
import { connect } from 'react-redux';

import { getUserList } from '../../redux/chatuser.redux';
import UserCard from '../usercard/usercard';

@connect(
    state => state.chatuser,
    { getUserList }
)
class Boss extends React.Component {
    componentDidMount () {
        this.props.getUserList('genius');
        console.log(this.props)
    }
    render () {
        return (
            <div>
                <UserCard userList={this.props.userList}></UserCard>
            </div>
        )
    }
}

export default Boss;