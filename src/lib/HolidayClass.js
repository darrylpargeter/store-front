import { DateTime } from 'luxon';

export default class HolidayClass {
  constructor(holiday) {
    this.holidays = holiday;
  }

  get publicHoliday() {
    return this.publicHolidayEnd;
  }

  set publicHoliday(value) {
    this.publicHolidayEnd = value;
  }

  /**
   * Returns the Raw public holidays values
   *
   * @return {Array<Object>}
   */
  getRawPublicHolidays() {
    return this.holidays;
  }

  /**
   * Checks to see if the past dates is a public holiday
   *
   * @param {Date} date
   * @return {boolean}
   */
  isPublicHoliday(date) {
    let isPublicHoliday = false;

    this.holidays.forEach(publicHoliday => {
      const start = DateTime.fromFormat(publicHoliday.start, 'd-M-y');
      const end = DateTime.fromFormat(publicHoliday.end, 'd-M-y').plus({ hours: 23, minutes: 59 });

      if (date >= start && date <= end) {
        this.publicHolidayEnd = end;
        isPublicHoliday = true;
      }
    });

    return isPublicHoliday;
  }

  /**
   * Loops until it hits the first non public holiday 
   * 
   * @param {Date} date
   * @return {Date}
   */
  getNextNonPublicHoliday(date) {
    let isPublicHoliday = true;

    while(isPublicHoliday) {
      const nextDate = this.publicHoliday.plus({ day: 1 });
      isPublicHoliday = this.isPublicHoliday(nextDate);
    }

    return this.publicHoliday;
  }
}
