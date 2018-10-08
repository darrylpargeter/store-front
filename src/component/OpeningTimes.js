import React, { Component } from 'react';
import { DateTime } from 'luxon';
import Dates from './dates';
import '../styles/OpeningTimes.css';

export default class OpeningTimes extends Component {
  getTimeOfDayRemaining() {
    const end = DateTime.local().set({ hour: 17, minute: 0 });
    const start = DateTime.local().set({ hour: 9, minute: 0 });
    const current = DateTime.local();
    const total = end - start;
    const elapsed = current - start;
    const precent = ((elapsed / total) * 100).toFixed(0);

    return precent >= 100 ? 100 : precent;
  }
  render() {
    const { times, active } = this.props;
    const isClosedAllDay = typeof times === 'string';
    const timeLeft = this.getTimeOfDayRemaining();
    const activeStyle = active ? { flex: `${timeLeft}% 0 0`} : {};
    let toDisplay;
    if (isClosedAllDay) {
      toDisplay = <h2>{times}</h2>;
    } else {
      toDisplay = Object.keys(times).map(keyValue => <Dates time={keyValue} comment={times[keyValue]} key={keyValue} />);
    }
    return (
      <div className='openTimes'>
        {isClosedAllDay ? '' : 
        <div className='barWrapper'>
          <div className='bar' style={activeStyle}></div>
        </div>}
        <div className={`times ${isClosedAllDay ? 'span-all' : ''}`} >
          {toDisplay}
        </div>
      </div>
    );
  }
}
