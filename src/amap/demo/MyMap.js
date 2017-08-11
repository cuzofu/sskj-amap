import React from 'react';
import {Map, Marker} from 'react-amap';
import { Button } from 'antd';
require('./MyMap.css');

class MyMap extends React.Component {
    constructor(){
        super();
        this.state = {
            center: null
        };
        this.mapEvents = {
            created: (map) => {
                this.mapInstance = map;
                this.showCenter();
            },
            moveend: () => { this.showCenter() }
        };
        this.position = {
            longitude: 111.302857,
            latitude: 30.69899
        };
    }

    showCenter(){
        this.setState({
            center: `${this.mapInstance.getCenter()}`
        });
    }

    render() {

        const plugins = [
            'MapType',
            'Scale',
            'OverView',
            {
                name: 'ToolBar',
                options: {
                    visible: true,  // 不设置该属性默认就是 true
                    onCreated(ins){
                    },
                },
            }
        ];

        return (
            <Map plugins={plugins} events={this.mapEvents} amapkey="1dd08ec0fffc99b1d5cd5cfa0224a924" center={this.position}>
                <Marker position={this.position} />
                <div className="custom-layer-button-lt">
                    <h4>A Custom Layer</h4>
                    <p>Current Center Is: {this.state.center}</p>
                </div>
                <div className="custom-layer-button-rb">
                    <p> Another Custom Layer</p>
                    <Button onClick={()=>{alert('You Clicked!')}}>An Ant Design Button</Button>
                </div>
            </Map>
        );
    }
}

export default MyMap;