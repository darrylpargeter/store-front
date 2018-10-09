import React from 'react';
import { DateTime } from 'luxon';
import '../styles/QueryDateResults.css';

function dateFormat(date) {
  let converted = date;
  if (!date.hour) {
    converted = DateTime.fromJSDate(date);
  }
  return converted.toFormat('dd/MM/yyyy H:mm');
}

const QueryDateResults = ({ back, toQuery, queryDate }) => (
  <div className='query-results-wrapper'>
    <div className='queryButtons'>
      <h2 className='search-button' onClick={toQuery}>Search</h2>
      <h1 className='back-button' onClick={back}>X</h1>
    </div>
    <div className='store-info'>
      <h1 className='currently'>Store is Currently</h1>
      {queryDate.isOpen ?
          <h1 className='open'>Open</h1> : ''
      }
      {queryDate.isClosed ? 
          <h1 className='closed'>Closed</h1> : ''
      }
      <div>
        <h2>next open on the {dateFormat(queryDate.nextOpen)}</h2>
        <h2>next closed on the {dateFormat(queryDate.nextClosed)}</h2>
      </div>
    </div>

  </div>
);

export default QueryDateResults;
