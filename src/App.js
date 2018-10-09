import React, { Component } from 'react';
import { DateTime } from 'luxon';
import ShopClass from './lib/shop';
import times from './config/times.config';
import hoildays from './config/holidays.config';
import Nav from './component/Nav';
import DateContainer from './component/DateContainer';
import PublicHoliday from './component/PublicHolidays';
import PopUp from './component/PopUp';
import './App.css';

const Shop = new ShopClass(times, hoildays); 

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      search: false,
      blur: false,
    };
    this.toggleHover = this.toggleHover.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }
  toggleHover(event) {
    this.setState({
      hover: !this.state.hover,
      y: event.target.offsetTop,
      blur: !this.state.blur,
    });
  }

  onSearchClick(event) {
    this.setState({
      search: !this.state.search,
      blur: !this.state.blur,
    });
  }

  render() {
    return (
    <div className='wrapper'>
      {this.state.hover ? <PublicHoliday
          y={this.state.y}
          holidays={Shop.getPublicHolidays()} />
        : ''}

        {this.state.search ? <PopUp
          shop={Shop}
          back={this.onSearchClick}
          showSeach={this.state.search}
        /> : ''}

        <Nav toggleHover={this.toggleHover} search={this.onSearchClick}/>
        <DateContainer shop={Shop} blur={this.state.blur} />
      </div>
    );
  }
}

export default App;
