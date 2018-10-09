import React from 'react';
import '../styles/PublicHolidays.css'

const PublicHoliday = ({ holidays, y }) => {
  const left = document.querySelector('.public-holiday').offsetWidth + 5;
  return (
    <div className='hover' style={{ top: y, left }}>
      {holidays.map(day => (
        <div key={day.start}>
          <h2>{day.description}</h2>
          <h5>{day.start} - {day.end}</h5>
        </div>
      ))}
    </div>
  );
};

export default PublicHoliday;
