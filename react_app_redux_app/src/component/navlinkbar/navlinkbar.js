import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { TabBar } from 'antd-mobile';

@withRouter                                                             // 非路由组件获取路由相关信息
class NavLinkBar extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render () {
        const navList = this.props.data.filter(v => !v.hide);
        const { pathname } = this.props.location;
        return (
            <div>
                <TabBar>
                    {navList.map(v => (
                        <TabBar.Item
                            key={v.path}
                            title={v.text}
                            icon={{uri: require(`./img/${v.icon}.png`)}}
                            selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                            selected={pathname === v.path}
                            onPress={() => {
                                this.props.history.push(v.path)
                            }}
                        >

                        </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        );
    }
}

export default NavLinkBar;