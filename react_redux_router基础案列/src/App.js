import React from 'react';
import { connect } from 'react-redux';
import { addGun, removeGun, addGunAsync } from './index.redux';

// 装饰器的方式connect
@connect(
    // 你要的属性
    state => ({
        num: state.counter
    }),
    // 你想要的方法，
    { addGun, removeGun, addGunAsync }
)
class App extends React.Component{
    render () {
        return (
            <div>
                <h1>现在有机关枪 {this.props.num}把</h1>
                <button className="btn" onClick={this.props.addGun}>申请武器</button>
                <button className="btn" onClick={this.props.removeGun}>上交武器</button>
                <button className="btn" onClick={this.props.addGunAsync}>拖两天再给</button>
            </div>
        )
    }
}
export default App;