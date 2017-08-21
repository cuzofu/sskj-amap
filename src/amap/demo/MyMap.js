import React from 'react';
import {Map, Marker, InfoWindow} from 'react-amap';
import {notification} from 'antd';

import MyTabs from './CustomLayers';
import Counter from './const/Counter';
import icon1 from './icon/1.png';
import icon2 from './icon/2.png';
import icon3 from './icon/3.png';

require('./MyMap.css');

const defaultCenter = {
    longitude: 111.286445,
    latitude: 30.691865
};

const openNotification = (props) => {
    notification.open(props);
};

class MyMap extends React.Component {
    constructor(){
        super();
        this.state = {
            map: null,
            center: defaultCenter,
            zoom: 10,
            markers: [],
            curMarkers: [],
            curMarker: {},
            defaultActiveKey: 'YJ',
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
            },
            timeout: true
        };
        this.markerEvents = {
            click: (e, marker) => {this.markerClick(marker)}
        };
        this.windowEvents = {
            close: () => {this.closeInfoWindow()},
        };
        this.mapPlugins = ['ToolBar'];
        this.onSelect = this.onSelect.bind(this);
        this.autoClickMarker = this.autoClickMarker.bind(this);
        this.time = this.time.bind(this);
        this.setTimeout = this.setTimeout.bind(this);
        this.setCity = this.setCity.bind(this);
    }

    componentWillMount() {
        let markersYj = this.randomMarker(10, 'YJ');
        let markersZj = this.randomMarker(5, 'ZJ');
        let markersJg = this.randomMarker(6, 'JG');
        let markers = [];
        markers.push(...markersYj);
        markers.push(...markersZj);
        markers.push(...markersJg);
        let marker = markers ? markers[0] : {};
        this.setState({
            markers: markers,
            curMarkers: markersYj,
            curMarker: marker,
            infoWindow: {
                visible: false,
                position: marker.position,
                size: {
                    width: 200,
                    height: 100
                },
                offset: [0, -24]
            },
            center: marker ? marker.position : defaultCenter
        });
    }

    componentDidMount() {
        this.time();
    }

    markerClick(marker) {
        let extData = marker.getExtData();
        let _curMarkers = this.state.curMarkers;
        let _curMarker = this.state.curMarker;
        let _clickMarker = _curMarkers.find((marker) => marker.myKey === extData.markerId);
        let _visible = this.state.infoWindow.visible;
        let _infoWindow = this.state.infoWindow;

        if (_curMarker.myKey === _clickMarker.myKey) {
            _infoWindow.visible = !_visible;
        } else {
            _infoWindow.visible = true;
            _infoWindow.position = _clickMarker.position;
            _curMarker = _clickMarker;
        }

        const args = {
            message: 'Notification Title ' + _curMarker.myKey,
            description: 'I will never close automatically. I will be close automatically. I will never close automatically.',
            duration: 3,
        };

        openNotification(args);

        this.setState({
            curMarker: _curMarker,
            zoom: 10,
            timeout: true,
            infoWindow: _infoWindow,
            center: _curMarker ? _curMarker.position : defaultCenter
        });
    }

    onSelect(props) {
        let _markers = this.state.markers.filter((marker) => marker.myType === props);
        let _marker = _markers ? _markers[0] : null;

        let _infoWindow = this.state.infoWindow;

        _infoWindow.visible = props === 'YJ';
        _infoWindow.position = _marker ? _marker.position : defaultCenter;

        this.setState({
            zoom: 10,
            curMarkers: _markers,
            curMarker: _marker,
            timeout: true,
            infoWindow: _infoWindow,
            defaultActiveKey: props,
            center: _marker ? _marker.position : defaultCenter
        });
    }

    randomMarker(len, type){
        let icon = null;
        if (type === 'YJ') {
            icon = icon1;
        } else if (type === 'ZJ') {
            icon = icon2;
        } else if (type === 'JG') {
            icon = icon3;
        } else {
            icon = icon3;
        }
        return new Array(len).fill(true).map(() => {
            const id = Counter.increment();
            return {
                position: {
                    longitude: 111 + Math.random(),
                    latitude: 30 + Math.random(),
                },
                myType: type,
                myKey: id,
                draggable: false,
                icon: icon,
                title: id,
                topWhenClick: true,
                extData: {
                    myType: type,
                    markerId: id,
                    showInfo: false,
                    popInfo: null
                }
            }
        })
    }

    closeInfoWindow() {
        let _infoWindow = this.state.infoWindow;
        _infoWindow.visible = false;
        this.setState({
            infoWindow: _infoWindow
        });
    }

    time() {
        if (this.state.timeout) {
            return;
        }
        this.autoClickMarker();
        setTimeout(this.time, 3000)
    }

    setTimeout() {

        console.log(this.state);
        let _infoWindow = this.state.infoWindow;
        _infoWindow.visible = false;
        this.setState(
            {
                timeout: !this.state.timeout,
                infoWindow: _infoWindow
            },
            () => {
                this.time();
            }
        );
    }

    setCity(map) {

        console.log(map);

        map.setCity('宜都市');
        // console.log(map.setCenter(new window.AMap.LngLat(111.286445,30.691865)));
        console.log(map.getCenter());
        console.log(map.getCity(()=>{console.log(111)}));

    }

    autoClickMarker() {
        let _curMarkers = this.state.curMarkers;
        if (!_curMarkers || _curMarkers.length === 0) {
            return ;
        }
        let _key = this.state.curMarker.myKey;
        let _index = _curMarkers.findIndex((marker) => marker.myKey === _key);

        if (_index < 0 || _index >= _curMarkers.length - 1) {
            _index = 0;
        } else {
            _index = _index + 1;
        }
        let _curMarker = this.state.curMarker;
        let _clickMarker = _curMarkers[_index];
        let _visible = this.state.infoWindow.visible;
        let _infoWindow = this.state.infoWindow;

        if (_curMarker.myKey === _clickMarker.myKey) {
            _infoWindow.visible = !_visible;
        } else {
            _infoWindow.visible = true;
            _infoWindow.position = _curMarkers ? _clickMarker.position : defaultCenter;
            _curMarker = _clickMarker;
        }

        const args = {
            message: 'Notification Title ' + _curMarker.myKey,
            description: 'I will never close automatically. I will be close automatically. I will never close automatically.',
            duration: 3,
        };

        openNotification(args);

        this.setState({
            zoom: 10,
            curMarker: _curMarker,
            infoWindow: _infoWindow,
            center: _curMarker ? _curMarker.position : defaultCenter
        });

    }

    render() {

        const infoWindow = (props) => {
            return (
                <div>
                    <h3>{props.title}</h3>
                    <p>{props.message}</p>
                    <p>longitude: {props.position.longitude} / latitude: {props.position.latitude}</p>
                </div>
            );
        };

        return (
            <Map
                plugins={this.mapPlugins}
                amapkey="1dd08ec0fffc99b1d5cd5cfa0224a924"
                zoom={this.state.zoom}
                center={this.state.center}
            >
                <InfoWindow
                    isCustom={false}
                    events={this.windowEvents}
                    {...this.state.infoWindow}
                >
                    {
                        this.state.curMarker ? infoWindow({
                            pic: '',
                            title: 'Title ' + this.state.curMarker.myKey,
                            message: 'message',
                            position: this.state.curMarker.position
                        }) : null
                    }
                </InfoWindow>
                {
                    this.state.curMarkers.map((marker) => {
                        return (
                            <Marker
                                events={this.markerEvents}
                                key={marker.myKey}
                                markerId={marker.myKey}
                                {...marker}>
                            </Marker>
                        );
                    })
                }

                <MyTabs
                    onSelect={this.onSelect}
                    defaultActiveKey={this.state.defaultActiveKey}
                    setCity={this.setCity}
                    timeout={this.state.timeout}
                />

            </Map>
        );
    }
}

export default MyMap;