import React, { Component } from 'react';
import { DateTime } from 'luxon';
import DateShow from './dateShow';
import '../styles/DateContainer.css';

export default class DateContainer extends Component {
  constructor(props) {
    super(props);

    this.dateArray = this.buildDateArray();
  }

  buildDateArray() {
    let startDate = DateTime.local();
    const output = [];

    for (let i = 0; i < 7; i += 1) {
      const open = this.props.shop.isOpen(startDate);
      const times = this.props.shop.getTimes(startDate);
      output.push(<DateShow
        day={`${startDate.day}`.padStart(2, '0')}
        openOrClosed={open ? 'Open' : 'Closed'}
        dayOfWeek={startDate.weekdayLong}
        active={i === 0 ? 'active' : ''}
        times={times ? times : 'Closed All Day'}
        key={startDate.day}
      />)
      startDate = startDate.plus({ day: 1 }).set({ hour: 9 });
    }

    console.log(output)
    return output;
  }

  render() {
    return (
      <div className='date-container-wrapper'>
        {this.dateArray.map(value => value)}
      </div>
    )
  }
}
