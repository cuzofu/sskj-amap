import React from 'react';
import {Map, Marker, InfoWindow} from 'react-amap';


import MyTabs from './MyTabs';
import Counter from './const/Counter';
import icon1 from './icon/1.png';
import icon2 from './icon/2.png';

require('./MyMap.css');

class MyMap extends React.Component {
    constructor(){
        super();
        this.state = {
            center: null,
            markers: [],
            curMarkers: [],
            defaultActiveKey: 'YJ',
            markerEvents: {},
            renderLayout: null,
            infoWindow: {
                visible: false,
                position: {
                    longitude: 0,
                    latitude: 0
                },
                size: {
                    width: 200,
                    height: 140
                },
                offset: [0, 0]
            }

        };
        this.mapEvents = {
            created: (map) => {
                this.mapInstance = map;
                this.showCenter();
            },
            moveend: () => { this.showCenter() }
        };
        this.markerEvents = {
            click: (e, marker) => {this.markerClick(marker.getExtData())}
        };
        this.windowEvents = {
            created: (iw) => {console.log(iw)},
            open: () => {console.log('InfoWindow opened')},
            close: () => {console.log('InfoWindow closed')},
            change: () => {console.log('InfoWindow prop changed')},
        };
        this.mapPlugins = ['ToolBar'];
        this.onSelect = this.onSelect.bind(this);
    }

    componentWillMount() {
        let markersYj = this.randomMarker(2, 'YJ');
        let markersZj = this.randomMarker(3, 'ZJ');
        let markersJg = this.randomMarker(4, 'JG');
        let markers = [];
        markers.push(...markersYj);
        markers.push(...markersZj);
        markers.push(...markersJg);
        let position = markers[0].position;
        this.setState({
            markers: markers,
            curMarkers: markersYj,
            infoWindow: {
                visible: false,
                position: position,
                size: {
                    width: 200,
                    height: 140
                },
                offset: [0, 0]
            }
        });
    }

    showCenter(){
        this.setState({
            center: `${this.mapInstance.getCenter()}`
        });
    }

    markerClick(extData) {
        let curMarkers = this.state.curMarkers;
        let marker = curMarkers.find((marker) => marker.myKey === extData.markerId);
        const draggable = marker.draggable;
        marker.draggable = !draggable;

        const showInfo = extData.showInfo;
        marker.extData.showInfo = !showInfo;
        if (showInfo) {
            marker.extData.popInfo = null;
        } else {
            marker.extData.popInfo = <div>哈哈</div>;
        }

        this.setState({
            curMarkers: curMarkers,
            infoWindow: {
                visible: !this.state.infoWindow.visible,
                position: marker.position,
                size: {
                    width: 200,
                    height: 140
                },
                offset: [0, -24]
            }
        });
    }

    onSelect(props) {
        let markers = [];
        let markerEvents = {};
        // let renderLayout = {};
        let _markers = this.state.markers;
        markers = _markers.filter((marker) => marker.myType === props);

        this.setState({
            curMarkers: markers,
            defaultActiveKey: props,
            markerEvents: markerEvents
        });
    }

    randomMarker(len, type){
        let icon = null;
        if (type === 'YJ') {
            icon = icon1;
        } else if (type === 'ZJ') {
            icon = icon2;
        } else if (type === 'JG') {
            icon = icon1;
        } else {
            icon = icon2;
        }
        return Array(len).fill(true).map((e, idx) => {
            let id = Counter.increment();
            return {
                position: {
                    longitude: 111 + Math.random() * 10,
                    latitude: 30 + Math.random() * 10,
                },
                myType: type,
                myKey: id,
                icon: icon,
                draggable: true,
                title: id,
                topWhenClick: true,
                extData: {
                    markerId: id,
                    showInfo: false,
                    popInfo: null
                }
            }
        })
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
                <InfoWindow
                    isCustom={false}
                    content='<div><h3>Window 2</h3><p>This is a window</p></div>'
                    events={this.windowEvents}
                    visible={this.state.infoWindow.visible}
                    position={this.state.infoWindow.position}
                    size={this.state.infoWindow.size}
                    offset={this.state.infoWindow.offset}
                />
                {
                    this.state.curMarkers.map((marker) => {
                        return (
                            <Marker
                                events={this.markerEvents}
                                key={marker.myKey}
                                markerId={marker.myKey}
                                {...marker} />
                        );
                    })
                }

                <MyTabs
                    onSelect={this.onSelect}
                    defaultActiveKey={this.state.defaultActiveKey}
                />
            </Map>
        );
    }
}

export default MyMap;