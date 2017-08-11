import React, {Component} from 'react';
import './App.css';
import MyMap from "./amap/demo/MyMap";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="amap-container-div">
                    <MyMap />
                </div>
            </div>
        );
    }
}

export default App;
