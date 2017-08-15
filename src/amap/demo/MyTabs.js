import { Tabs } from 'antd';
import * as React from "react";

import 'antd/dist/antd.css';
const TabPane = Tabs.TabPane;

export default class MyTabs extends React.Component {

    constructor(props) {
        super(props);
        this.map = props.__map__;
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
        this.map.clearMap();
        this.props.onSelect(key);
    }

    render() {
        return (

            <div className="custom-layer-button-lt">
                <Tabs
                    activeKey={this.props.defaultActiveKey}
                    onChange={this.handleClick}
                >
                    <TabPane tab="预警项目" key="YJ"></TabPane>
                    <TabPane tab="在建项目" key="ZJ"></TabPane>
                    <TabPane tab="竣工项目" key="JG"></TabPane>
                </Tabs>
            </div>

        );
    }
}