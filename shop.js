class Shop {



    /**
     * Is the shop open on the provided date/time
     * If provided a DateTime object, check relative to that, otherwise use now
     *
     * @param {Date} date
     * @return {boolean}
     */

    isOpen(date) {

    };


    /**
     * Is the shop closed on the provided date/time
     * If provided a DateTime object, check relative to that, otherwise use now
     *
     * @param {Date} date
     * @return {boolean}
     */

    isClosed(date) {

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

    };


}
