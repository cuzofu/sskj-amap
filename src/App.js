import React, {Component} from 'react';
import './App.css';
import MyMap from "./amap/demo/MyMap";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Welcome to SSKJ-AMAP</h2>
                </div>
                <div className="amap">
                    <MyMap />
                </div>
            </div>
        );
    }
}

export default App;
