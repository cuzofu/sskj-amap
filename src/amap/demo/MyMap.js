import React from 'react';
import {Map, Markers} from 'react-amap';

import MyTabs from './MyTabs';

require('./MyMap.css');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

class MyMap extends React.Component {
    constructor(){
        super();
        this.state = {
            center: null,
            markers: null,
            defaultActiveKey: 'first',
            markerEvents: {},
            renderLayout: null,
            infoWindowVisible: false
        };
        this.mapEvents = {
            created: (map) => {
                this.mapInstance = map;
                this.showCenter();
            },
            moveend: () => { this.showCenter() }
        };
        this.mapPlugins = ['ToolBar'];
        this.onSelect = this.onSelect.bind(this);
    }

    componentWillMount() {
        this.onSelect(this.state.defaultActiveKey);
    }

    showCenter(){
        this.setState({
            center: `${this.mapInstance.getCenter()}`
        });
    }

    onSelect(props) {
        let markers = {};
        let markerEvents = {};
        let renderLayout = {};
        if (props === 'first') {
            markers = this.randomMarker(10);
        } else if (props === 'second') {
            markers = this.randomMarker(20);
            markerEvents = {
                mouseover:(e, marker) => {
                    // marker.render(this.secondMarkerMouseOverLayout);
                },
                mouseout: (e, marker) => {
                    // marker.render(this.secondMarkerLayout);
                },
                click: (e, marker) => {
                    console.log(e);
                }
            };
            renderLayout = this.secondMarkerLayout;
        } else if (props === 'third') {
            markers = this.randomMarker(30);
        } else {
            markers = this.randomMarker(10);
        }
        this.setState({
            markers: markers,
            markerEvents: markerEvents,
            renderLayout: renderLayout
        });
    }

    randomMarker(len){
        return Array(len).fill(true).map((e, idx) => ({
            position: {
                longitude: 111 + Math.random() * 10,
                latitude: 30 + Math.random() * 10,
            },
            myLabel: alphabet[idx],
            myIndex: idx + 1,
            myContent: '我是'+idx,
            label: {
                content: '我是'+alphabet[idx],
                offset: {
                    x:-9,
                    y:-31
                }
            }
        }))
    }

    secondMarkerMouseOverLayout(extData){
        return <div className="my-second-marker-mouse-over">{extData.myLabel}</div>
    }

    secondMarkerLayout(extData){
        return(
            <div className="green-marker-out">
                <div className="green-marker-in">
                    {extData.myLabel}
                </div>
            </div>
        );
    }

    toggleVisible() {
        this.setState({
            infoWindowVisible: !this.state.infoWindowVisible
        })
    }

    render() {

        return (
            <Map
                plugins={this.mapPlugins}
                events={this.mapEvents}
                amapkey="1dd08ec0fffc99b1d5cd5cfa0224a924"
                zoom={5}
            >
                <Markers
                    markers={this.state.markers}
                    render={this.state.renderLayout}
                    events={this.state.markerEvents}
                />

                <div className="custom-layer-button-lt">
                    <MyTabs onSelect={this.onSelect} defaultActiveKey={this.state.defaultActiveKey} />
                </div>
                <div className="custom-layer-button-lb">
                    <h4>A Custom Layer</h4>
                    <p>Current Center Is: {this.state.center}</p>
                </div>
            </Map>
        );
    }
}

export default MyMap;