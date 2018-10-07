import React, { Component } from 'react';
import ShopClass from './lib/shop';
import times from './config/times.config';
import hoildays from './config/holidays.config';
import Nav from './component/Nav';
import DateContainer from './component/DateContainer';
import './App.css';

const Shop = new ShopClass(times, hoildays); 

class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <Nav />
        <DateContainer shop={Shop}/>
      </div>
    );
  }
}

export default App;
