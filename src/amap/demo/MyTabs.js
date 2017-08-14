import { Tabs } from 'antd';
import * as React from "react";
import 'antd/dist/antd.css';
const TabPane = Tabs.TabPane;

export default class MyTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            curActiveKey: null,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.setState({
            curActiveKey: this.props.defaultActiveKey
        });
    }

    handleClick(key) {
        this.setState({
            curActiveKey: key
        });
        this.props.onSelect(key);
    }

    render() {
        return (
            <Tabs activeKey={this.state.curActiveKey} onChange={this.handleClick}>
                <TabPane tab="Marker 1" key="first"></TabPane>
                <TabPane tab="Marker 2" key="second"></TabPane>
                <TabPane tab="Marker 3" key="third"></TabPane>
            </Tabs>
        );
    }
}