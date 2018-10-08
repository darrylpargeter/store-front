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
    const { shop } = this.props;
    const output = [];

    for (let i = 0; i < 7; i += 1) {
      const open = shop.isOpen(startDate);
      const times = shop.getTimes(startDate);
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

    return output;
  }

  render() {
    const { blur } = this.props;
    const wrapperClasses = `date-container-wrapper ${blur ? 'blur' : ''}`;
    return (
      <div className={wrapperClasses}>
        {this.dateArray.map(value => value)}
      </div>
    )
  }
}
