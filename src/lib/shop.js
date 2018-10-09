import TimeClass from './TimeClass';
import HolidayClass from './HolidayClass';
import { DateTime } from 'luxon';

export default class Shop {
  constructor(times, holidays) {
    this.times = new TimeClass(times);
    this.holidays = new HolidayClass(holidays);
  }

  /**
   * Loop though the array of times, checking to see if passed date between the open times
   *
   * @params {Array<int>} testValues
   * @params {Date} date
   * @return {boolean}
   */
  _testTimeValues(testValues, date) {
    let boolReturn = false;

    for (let i = 0; i <= testValues.length; i += 2) {
      if (date >= testValues[i] && date < testValues[i + 1]) {
        boolReturn = true;
      }
    }

    return boolReturn;
  }

  /**
   * Get the times that the store is open/closed from the Times Class
   *
   * @param {Date} date
   * @return {Array<int>}
   */
  _checkTimes(date) {
    const queryDate = date ? date : DateTime.local();
    const isPublicHoliday = this.holidays.isPublicHoliday(queryDate);
    const testValues = this.times.getDate(queryDate);

    if (!testValues || isPublicHoliday) return false;

    return this._testTimeValues(testValues, queryDate);
  }

  /**
   * Get the an Object that has the display values for a date queryed
   *
   * @param {Date} date
   * @return {Object}
   */
  queryDate(date) {
    return {
      isOpen: this.isOpen(date),
      isClosed: this.isClosed(date),
      nextOpen: this.nextOpen(date),
      nextClosed: this.nextClosed(date),
      date,
    };
  }

  /**
   * Get a list of the pasted date open and closed times
   * 
   * @param {Date} date
   * @return {Object}
   */
  getTimes(date) {
    return this.times.rawValues(date); 
  }

  /**
   * get a List of the public holidays defined
   *
   * @return {Array<Object>}
   */
  getPublicHolidays() {
    return this.holidays.getRawPublicHolidays();
  }

  /**
   * Is the shop open on the provided date/time
   * If provided a DateTime object, check relative to that, otherwise use now
   *
   * @param {Date} date
   * @return {boolean}
   */

  isOpen(date) {
    return this._checkTimes(date);
  };


  /**
   * Is the shop closed on the provided date/time
   * If provided a DateTime object, check relative to that, otherwise use now
   *
   * @param {Date} date
   * @return {boolean}
   */

  isClosed(date) {
    return !this._checkTimes(date);
  };

  nextDayAfterPublicHoliday(date) {
    let nextOpenDate = this.holidays.getNextNonPublicHoliday(date);
    nextOpenDate = nextOpenDate.plus({ day: 1 });

    return this.times.getDate(nextOpenDate);
  }

  nextDayAfterWeekEnd(date) {
    const nextOpenDay = this.times.nextOpenDay(date); 

    return this.times.getDate(nextOpenDay);
  }

  /**
   * Checks to see if the date falls between a weekend or public holiday
   * 
   * @param {Date} date
   * @return {Arary<Date>|boolean}
   */
  updateAfterGap(date) {
    const isPublicHoliday = this.holidays.isPublicHoliday(date);
    const isWeekend = this.times.isWeekend(date);
    if (isPublicHoliday) {
      return this.nextDayAfterPublicHoliday(date);
    }

    if (isWeekend) {
      return this.nextDayAfterWeekEnd(date);
    }

    return false;
  }

  /**
   * At what date/time will the shop next be open
   * If provided a DateTime object, check relative to that, otherwise use now
   * If the shop is already open, return the provided datetime/now
   *
   * @param {Date} date
   * @return {Date} date
   */

  nextOpen(date) {
    let queryDate = date ? date : DateTime.local();
    if (this.isOpen(queryDate)) return queryDate;
    
    const gapInOpeningTimes = this.updateAfterGap(queryDate);

    if (!gapInOpeningTimes) {
      const isAfterLunch = this.times.afterLunch(queryDate);

      if (isAfterLunch) {
        const isAfter5 = this.times.after5(queryDate);
        if (isAfter5) {
          const updatedDate = queryDate.plus({ day: 1 }).startOf('day');
          const open = this.times.getDate(updatedDate);

          const gapInOpeningTimes = this.updateAfterGap(updatedDate);

          return gapInOpeningTimes ? gapInOpeningTimes[0] : open[0];
        }
        const open = this.times.getDate(queryDate);

        return open[2];
      }

      const isBeforeOpen = this.times.beforeOpen(queryDate);
      const open = this.times.getDate(queryDate)

      return isBeforeOpen ? open[0] : open[2];
    }

    return gapInOpeningTimes[0];
  };


  /**
   * At what date/time will the shop next be closed
   * If provided a DateTime object, check relative to that, otherwise use now
   * If the shop is already closed, return the provided datetime/now
   *
   * @param {Date} date
   * @return {Date} date
   */
  nextClosed(date) {
    let queryDate = date ? date : DateTime.local();

    if (this.isOpen(queryDate)) {
      const isAfterLunch = this.times.afterLunch(queryDate);
      const closed = this.times.getDate(queryDate);

      return isAfterLunch ? closed[3] : closed[1];
    } 

    return queryDate;
  };
}
