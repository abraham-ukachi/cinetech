/**
* @license MIT
* cinetech (muvisho)
* Copyright (c) 2023 Abraham Ukachi. The Muvisho Project Contributors. All rights reserved.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
* @name: Time Period Watcher 
* @file: timeperiodwatcher.js
* @type: helper
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
*
* Example usage:
*
*   1-|> //
*
*/

// Constants
const TIME_PERIOD_TIMEOUT = 1000; /* 1s(one second) */

/**
 * Utility method that calls a callback whenever the period of time within a day changes.
 * The callback should take a string parameter (with `morning` meaning the daytime is currently between 00:00AM - 12:00PM;
 * and `afternoon` meaning the daytime is currently between 12:00PM - 06:00PM; and `night` meaning the daytime is currently between 06:00PM - 00:00AM).
 *
 * Example:
 *
 *    installTimePeriodWatcher((timePeriod) => this._timePeriodUpdateHandler(timePeriod));
 *
 * @param {Function} timePeriodUpdatedCallback
 */
export const installTimePeriodWatcher = (timePeriodUpdatedCallback) => {
  let timePeriod = getTimePeriod();
  timePeriodUpdatedCallback(timePeriod);

  // set up the `timePeriodTimer` recursive interval
  timePeriodTimer(timePeriod, timePeriodUpdatedCallback);
}

/**
 * This is a recursive interval using `setTimeout` instead of `setInterval`,
 * for a better performance as advised/written by [Develoger](https://develoger.com/settimeout-vs-setinterval-cff85142555b).
 *
 * @param { String } timePeriod
 * @param { Function } timePeriodUpdatedCallback
 * @param { Boolean } continueInterval
 */
const timePeriodTimer = (timePeriod, timePeriodUpdatedCallback, continueInterval = true) => {
  // console.log('timePeriodTimer called!!!');
  // get the latest time period
  let latestTimePeriod = getTimePeriod();
  // if the latest time period is not the same as the old one...
  if (latestTimePeriod !== timePeriod) {
    // ...update the `timePeriod`
    timePeriod = latestTimePeriod;
    // then, let the `timePeriodUpdateCallback` know too )
    timePeriodUpdatedCallback(timePeriod);
  }

  if (continueInterval) {
    setTimeout(() => timePeriodTimer(timePeriod, timePeriodUpdatedCallback), TIME_PERIOD_TIMEOUT);
  }
};

/**
 * Returns the current time period (ie. morning, afternoon, evening, night)
 *
 * @returns { String } timePeriod
 */
export const getTimePeriod = () => {
  const date = new Date();
  const hours = date.getHours();

  let timePeriod;

  if (hours >= 0 && hours < 6) { /* night: 00:00 - 06:00 */
    timePeriod = 'night';
  }

  if (hours >= 6 && hours < 12) { /* morning: 06:00 - 12:00 */
    timePeriod = 'morning';
  }

  if (hours >= 12 && hours < 18) { /* afternoon: 12:00 - 18:00 */
    timePeriod = 'afternoon';
  }

  if (hours >= 18 && hours <= 23) { /* evening: 18:00 - 00:00 */
    timePeriod = 'evening';
  }

  return timePeriod;
}

/**
 * Returns the time ago of a given `dateString`
 * 
 * @param { String } dateString - eg. 2019-01-01T00:00:00.000Z
 * @returns { String } timeAgo - eg. 2 days ago
 */
export const getTimeAgo = (dateString) => {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  let interval = Math.floor(seconds / 31536000); /* 1 year */

  if (interval === 1) {
    return muvishoApp.i18n.getString("oneYearAgo");
  }

  if (interval > 1) {
    return muvishoApp.i18n.getString("yearsAgo").replace(/d/, interval);
  }
  
  interval = Math.floor(seconds / 2592000); /* 1 month */
  if (interval === 1) {
    return muvishoApp.i18n.getString("oneMonthAgo");
  }

  if (interval > 1) {
    return muvishoApp.i18n.getString("monthsAgo").replace(/d/, interval);
  }


  interval = Math.floor(seconds / 86400); /* 1 day */

  if (interval === 1) {
    return muvishoApp.i18n.getString("oneDayAgo");
  }
  
  if (interval > 1) {
    return muvishoApp.i18n.getString("daysAgo").replace(/d/, interval);
  }



  interval = Math.floor(seconds / 3600); /* 1 hour */
  if (interval === 1) {
    return muvishoApp.i18n.getString("oneHourAgo");
  }
  
  if (interval > 1) {
    return muvishoApp.i18n.getString("hoursAgo").replace(/d/, interval);
  }


  interval = Math.floor(seconds / 60); /* 1 minute */
  if (interval === 1) {
    return muvishoApp.i18n.getString("oneMinuteAgo");
  }
  
  if (interval > 1) {
    return muvishoApp.i18n.getString("minutesAgo").replace(/d/, interval);
  }

  interval = Math.floor(seconds); /* 1 second */
  if (interval === 1) {
    return muvishoApp.i18n.getString("oneSecondAgo");
  }

  if (interval > 1) { 
    return muvishoApp.i18n.getString("secondsAgo").replace(/d/, interval);
  }

};
