import React from 'react';
import {Map, Marker} from 'react-amap';
import { Button } from 'antd';
require('./MyMap.css');

export default class MyMap extends React.Component {
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
            longitude: 130,
            latitude: 30
        }
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
                        console.log(ins);
                    },
                },
            }
        ];
        return (
            <div style={{width: '100%', height: '800px'}}>
                <Map plugins={plugins}>
                    <Marker position={this.position} />
                    <div className="customLayer custom-layer-button-lt">
                        <h4>A Custom Layer</h4>
                        <p>Current Center Is: {this.state.center}</p>
                    </div>
                    <div className="customLayer custom-layer-button-rb">
                        <p> Another Custom Layer</p>
                        <Button onClick={()=>{alert('You Clicked!')}}>An Ant Design Button</Button>
                    </div>
                </Map>
            </div>
        );
    }
}