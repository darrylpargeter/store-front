import React, { Component } from 'react';
import '../styles/Search.css'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { input: '' };
  }

  onChange({ target }) {
    const input = target.value;
    this.setState({ input, error: false });
  }

  onSubmit() {
    const isValid = this.validate(this.state.input);
    if (isValid) {
      const addedPadding = this.addedPadding(this.state.input);
      this.props.submit(addedPadding);
    }
  }

  addedPadding(str) {
    const [date, time] = str.split(' ');
    const padYear = this.pad(date, '/');
    const padTime = this.pad(time, ':');

    return [padYear, padTime].join(' ');
  }
  
  pad(value, delimter) {
    const list = value.split(delimter);
    const padded = list.map(value => value.padStart(2, '0')); 

    return padded.join(delimter);
  }

  setErrorMessage(error) {
    this.setState({ error });
  }

  validate(input) {
    const [date, time] = input.split(' ');
    const isYearValided = this.validateDate(date);
    const isTimeValided = this.validateTime(time);

    return (isYearValided && isTimeValided);
  }

  validateDate(date) {
    const [day, month, year] = date.split('/');
    const isDayValid = this.validateDay(day);
    const isMonthValid = this.validateMonth(month);
    const isYearValid = this.validateYear(year);

    return (isDayValid && isMonthValid && isYearValid);
  }

  validateTime(time) {
    const [hour, minute] = time.split(':');
    const isHourValid = this.validateHour(hour);
    const isMinuteValid = this.validateMinute(minute);

    return (isHourValid && isMinuteValid);
  }

  validateHour(hour) {
    let hourValueToTest = hour;
    if (hourValueToTest.length === 2 && hourValueToTest[0] === '0') {
      const splitHour = hour.split('');
      hourValueToTest = splitHour.length > 1 ? splitHour[1] : splitHour[0];
    }

    if (hourValueToTest > 0 && hourValueToTest <= 23) {
      return true;
    }

    this.setErrorMessage('Hour value has to between 0 and 23');
    return false;
  }

  validateMinute(minute) {
    let minuteValueToTest = minute;

    if (minuteValueToTest.length === 2 && minuteValueToTest[0] === '0') {
      const splitMinute = minute.split('');
      minuteValueToTest = splitMinute.length > 1 ? splitMinute[1] : splitMinute[0];
    }

    if (minuteValueToTest >= 0 && minuteValueToTest <= 59) {
      return true;
    }

    this.setErrorMessage('Minute value has to between 0 and 59');

    return false;
  }

  validateDay(day) {
    let dayValueToTest = day;
    if (dayValueToTest.length === 2 && dayValueToTest[0] === '0') {
      const splitDay = day.split('');
      dayValueToTest = splitDay.length > 1 ? splitDay[1] : splitDay[0];
    }

    if (dayValueToTest > 0 && dayValueToTest <= 31) {
      return true;
    }

    this.setErrorMessage('Day has to be between the value of 1 and 31');
    return false;
  }

  validateMonth(month) {
    let monthValueToTest = month;
    if (monthValueToTest.length === 2 && monthValueToTest[0] === '0') {
      const splitMonth = month.split('');
      monthValueToTest = splitMonth.length > 1 ? splitMonth[1] : splitMonth[0];
    }

    if (monthValueToTest > 0 && monthValueToTest <= 12) {
      return true;
    }

    this.setErrorMessage('Month has to be between the value of 1 and 12');

    return false;
  }

  validateYear(year) {
    if (year.length === 4) {

      return true;
    }
    
    this.setErrorMessage('Year needs to be a valid 4 diget date');
    
    return false;
  }

  render() {
    const { back, submit } = this.props;
    return(
      <div className='searchWrapper'>
        <div className='search'>
          <h1>Query Shop Opening Times</h1>
          {this.state.error ? <h4 className="error">{this.state.error}</h4> : ''}
          <input
            onChange={this.onChange}
            type='text'
            placeholder='dd/mm/yyyy hh:mm'
            value={this.state.input}
          />
          <input onClick={this.onSubmit} type='button' value='Query' />
        </div>
        <div>
          <h1 className='back' onClick={back}>X</h1>
        </div>
      </div>
    );
  }
}
