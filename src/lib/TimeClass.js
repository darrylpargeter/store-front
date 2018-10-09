export default class TimeClass {
  constructor(times) {
    this.times = times;
  }

  /**
   * Querys the data object to retrive the opening and closing times for past date
   * 
   * @param {Date} date
   * @return {Object|boolean}
   */
  _getOpenCloseValues(day) {
    const timeObj = this.times[day];
    
    return Object.keys(timeObj).length === 0 && timeObj.constructor === Object ? false : timeObj;
  }

  /**
   * Converts the Object keys to a js Date
   *
   * @param {Date} date
   * @param {Object} dayValues
   */
  _convertObjectKeysToDateTime(date, dayValues) {
    return Object.keys(dayValues).map(time => {
      const tempDate = new Date(date.toMillis());
      const [hour, minute] = time.split(':');
      tempDate.setHours(hour, minute);

      return tempDate;
    });
  }

  /**
   * Returns the raw data for the stores open and close times
   * 
   * @param {Date} date
   * @return {Object}
   */
  rawValues(date) {
    return this._getOpenCloseValues(date.weekdayLong);
  }

  /**
   * returns an Array of the stores opening and closing times for pasted date
   *
   * @param {Date} date
   * @return {Array<Date>}
   */
  getDate(date) {
    const dayValues = this._getOpenCloseValues(date.weekdayLong);
    if (!dayValues) return false; 
    const dateTimeValues = this._convertObjectKeysToDateTime(date, dayValues); 

    return dateTimeValues.length ? dateTimeValues : false;
  }

  /**
   * Checks weather the paste date is before the opening time 
   *
   * @param {Date} date
   * @return {boolean}
   */
  beforeOpen(date) {
    return date.hour < 9 || date.hour >= 17 ? true : false;
  }

  /**
   * Checks weather the past date is after lunch
   *
   * @parma {Date} date
   * @return {boolean}
   */
  afterLunch(date) {
    return (date.hour >= 12 && date.minute >= 20) || date.hour > 13 ? true : false;
  }

  /**
   * Checks to see if pasted date is set to after 5 PM
   *
   * @param {Date} date
   * @return {boolean}
   */
  after5(date) {
    return date.hour >= 17 ? true : false;
  }

  /**
   * Get weather the pasted date is a weekend or not
   * 
   * @param {Date} date
   * @return {boolean}
   */
  isWeekend(date) {
    return this._getOpenCloseValues(date.weekdayLong) ? false : true;
  }

  /**
   * Get the first Monday after a weekend
   *
   * @parma {Date} date
   * @return {Date}
   */
  nextOpenDay(date) {
    let day = this._getOpenCloseValues(date.weekdayLong)

    if (day) return date ;

    return this.nextOpenDay(date.plus({ day: 1 }));
  } 
}
