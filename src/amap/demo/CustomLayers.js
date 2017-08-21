import { Tabs,Button } from 'antd';
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
        this.setCity = this.setCity.bind(this);
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

    setCity() {

        console.log(this.map);
        this.map.setCity('北京市',()=>{console.log(this.map)});
        // console.log(this.map.setCenter(new window.AMap.LngLat(111.286445,30.691865)));
        console.log(this.map.getCenter());
        // this.map.getCity((result) => {console.log(result)});

    }

    render() {
        return (
            <div>

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

                <div className="custom-layer-button-lb">
                    <Button type="primary" onClick={this.setCity}>{this.props.timeout ? "开始" : "结束"}</Button>
                </div>

            </div>

        );
    }
}