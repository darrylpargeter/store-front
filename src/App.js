import React, { Component } from 'react';
import ShopClass from './lib/shop';
import times from './config/times.config';
import hoildays from './config/holidays.config';
import './App.css';

const Shop = new ShopClass(times, hoildays); 

class App extends Component {
  render() {
    /*
    console.log(`Store is open 25/12/2017 17:00: ${Shop.nextClosed('25/12/2017 17:00')}`);
    console.log(`Store is open 8/10/2018 17:00: ${Shop.nextClosed('8/10/2018 17:00')}`);
    console.log(`Store is open 8/10/2018 10:00: ${Shop.nextClosed('8/10/2018 10:00')}`);
    console.log(`Store is open 8/10/2018 18:00: ${Shop.nextClosed('8/10/2018 18:00')}`);
    console.log(`Store is open 7/10/2018 10:00: ${Shop.nextClosed('7/10/2018 10:00')}`);
    console.log(`Store is open 6/10/2018 10:00: ${Shop.nextClosed('7/10/2018 10:00')}`);
    console.log(`Store is open 5/10/2018 14:00: ${Shop.nextClosed('5/10/2018 14:00')}`);
    console.log(`Store is open 5/10/2018 10:00: ${Shop.nextClosed('5/10/2018 10:00')}`);
    console.log(`Store is open 5/10/2018 08:00: ${Shop.nextClosed('8/10/2018 08:00')}`);
    console.log(`Store is open 9/10/2018 8:00: ${Shop.nextClosed('9/10/2018 08:00')}`);
    console.log(`Store is open 9/10/2018 18:00: ${Shop.nextClosed('9/10/2018 18:00')}`);
    console.log(`Store is open 9/10/2018 14:00: ${Shop.nextClosed('9/10/2018 14:00')}`);
    console.log(`Store is open 9/10/2018 13:00: ${Shop.nextClosed('9/10/2018 13:00')}`);
    console.log(`Store is open 6/10/2018 13:00: ${Shop.nextClosed('6/10/2018 13:00')}`);
    console.log(`Store is open 7/10/2018 13:00: ${Shop.nextClosed('7/10/2018 13:00')}`);
    console.log(`Store is open 5/10/2018 18:00: ${Shop.nextClosed('5/10/2018 18:00')}`);
    */
    console.log(`Store is open 19/12/2017 18:00: ${Shop.nextClosed('19/12/2017 18:00')}`);
    console.log(`Store is open 22/12/2017 08:00: ${Shop.nextClosed('22/12/2017 08:00')}`);


    return (
      <p>Hello world</p>
    );
  }
}

export default App;
