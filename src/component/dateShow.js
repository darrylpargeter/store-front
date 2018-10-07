import React from 'react';
import OpeningTimes from './OpeningTimes';
import '../styles/dateshow.css';

const DateShow = ({ day, openOrClosed, dayOfWeek, active, times }) => (
  <div className='dateShow'>
    <h1 className='open'>{openOrClosed}</h1>
    <h1 className={`day ${active}`}>{day}</h1>
    <OpeningTimes times={times} active={active} />
    <h1 className='dayOfWeek'>{dayOfWeek}</h1>
  </div>
);

export default DateShow;
