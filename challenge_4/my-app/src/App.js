import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Map } from './features/map/Map';

import './App.css';

function App() {
  return (
    <div className="App">
        {/* <Counter /> */}
        <Map />
    </div>
  );
}

export default App;
