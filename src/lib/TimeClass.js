import { DateTime } from 'luxon';

export default class TimeClass {
  constructor(times) {
    this.times = times;
  }

  _getOpenCloseValues(day) {
    const timeObj = this.times[day];
    
    return Object.keys(timeObj).length === 0 && timeObj.constructor === Object ? false : timeObj;
  }

  _toMilliseconds(date, dayValues) {
    return Object.keys(dayValues).map(time => {
      const tempDate = new Date(date.toMillis());
      const [hour, minute] = time.split(':');
      tempDate.setHours(hour, minute);

      return tempDate;
    });
  }

  rawValues(date) {
    return this._getOpenCloseValues(date.weekdayLong);
  }

  getDate(date) {
    const dayValues = this._getOpenCloseValues(date.weekdayLong);
    if (!dayValues) return false; 
    const openCloseMilis = this._toMilliseconds(date, dayValues); 

    return openCloseMilis.length ? openCloseMilis : false;
  }

  beforeOpen(date) {
    if (date.hour <= 9 || date.hour >= 17) {
      return true;
    }

    return false;
  }

  afterLunch(date) {
    if (date.hour >= 12 && date.minute < 20) {
      return true;
    }

    return false;
  }

  after5(date) {
    if (date.hour >= 17) {
      return true;
    }

    return false;
  }

  isWeekend(date) {
    return this._getOpenCloseValues(date.weekdayLong) ? false : true;
  }

  nextOpenDay(date) {
    let day = this._getOpenCloseValues(date.weekdayLong)

    if (day) {
      return date 
    }

    return this.nextOpenDay(date.plus({ day: 1 }));
  } 
}
