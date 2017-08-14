import { Menu, Icon } from 'antd';
import * as React from "react";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class MyMenu extends React.Component{
    render() {
        return (
            <Menu>
                <Menu.Item key="first">
                    <Icon type="mail" />First
                </Menu.Item>
                <Menu.Item key="second">
                    <Icon type="appstore" />Second
                </Menu.Item>
                <Menu.Item key="third">
                    <Icon type="setting" />Third
                </Menu.Item>
            </Menu>
        );
    }
}