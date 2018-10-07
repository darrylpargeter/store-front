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
    const queryDate = date ? DateTime.fromFormat(date, 'd/M/y h:m') : DateTime.local();
    const isPublicHoliday = this.holidays.isPublicHoliday(queryDate);
    const testValues = this.times.getDate(queryDate);

    if (!testValues || isPublicHoliday) return false;

    return this._testTimeValues(testValues, queryDate);
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


    /**
     * At what date/time will the shop next be open
     * If provided a DateTime object, check relative to that, otherwise use now
     * If the shop is already open, return the provided datetime/now
     *
     * @param {Date} date
     * @return {Date} date
     */

    nextOpen(date) {
      // TODO: factor in during lunch
      let queryDate = date ? DateTime.fromFormat(date, 'd/M/y h:m') : DateTime.local();
      const isBeforeOpen = this.times.beforeOpen(queryDate);
      const isAfterLunch = this.times.afterLunch(queryDate);

      if (isAfterLunch) queryDate = queryDate.plus({ day: 1 }).startOf('day');

      const isPublicHoliday = this.holidays.isPublicHoliday(queryDate);
      const isWeekend = this.times.isWeekend(queryDate);

      console.log({
        isBeforeOpen,
        isAfterLunch,
        isPublicHoliday,
        isWeekend,
      })

      if (isPublicHoliday) {
        let nextOpenDate = this.holidays.getNextNonPublicHoliday(nextOpenDate);
        nextOpenDate = nextOpenDate.plus({ day: 1 });
        const open = this.times.getDate(nextOpenDate);

        return open[0];
      }

      if (isWeekend) {
        const nextOpenDay = this.times.nextOpenDay(queryDate); 
        const open = this.times.getDate(nextOpenDay);

        return open[0];
      }

      if (isBeforeOpen) {
        const open = this.times.getDate(queryDate);

        return open[0];
      }

      if (!isBeforeOpen && !isAfterLunch) {
        const open = this.times.getDate(queryDate); 

        return open[2];
      }

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
      let queryDate = date ? DateTime.fromFormat(date, 'd/M/y h:m') : DateTime.local();

      const isBeforeOpen = this.times.beforeOpen(queryDate);
      const isAfter5 = this.times.after5(queryDate);

      if (isAfter5) queryDate = queryDate.plus({ day: 1 });

      const isAfterLunch = this.times.afterLunch(queryDate);
      const isWeekend = this.times.isWeekend(queryDate);
      const isPublicHoliday = this.holidays.isPublicHoliday(queryDate);
      console.log(isPublicHoliday);

      if (isPublicHoliday) {
        console.log('public')
        const nextDate = queryDate.plus({ day: 1 });
        if (this.holidays.isPublicHoliday(queryDate)) return nextDate;

        const open = this.times.getDate(nextDate);
        return open[1];
      }

      if (isWeekend) {
        let nextDate = queryDate;
        if (!isAfter5) nextDate = queryDate.plus({ day: 1 });
        if (this.holidays.isPublicHoliday(queryDate)) return nextDate;

        if (this.times.isWeekend(nextDate)) {
          return nextDate;
        }

        const open = this.times.getDate(nextDate);

        return open[1];
      }

      if (isBeforeOpen) {
        if (isAfter5) queryDate = queryDate.plus({ day: 1 });
        if (this.holidays.isPublicHoliday(queryDate)) return queryDate;
        const open = this.times.getDate(queryDate);

        return open[1];
      }

      if (isAfterLunch) {
        const open = this.times.getDate(queryDate);

        return open[3];
      }
    };
}
