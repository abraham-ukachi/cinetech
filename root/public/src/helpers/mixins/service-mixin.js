/* 
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
* @name: Service
* @type: mixin
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @contributor: Hajar Aslan <hajar.aslan@laplateforme.io>
*
* Example usage:
*   1-|> import { serviceMixin } from './src/helpers/mixins/service-mixin.js';
*    -|>
*    -|> Assign.object(App.prototype, serviceMixin);
*    -|>
*
*
*   2-|> // Start or launch a service (inside a Class)
*    -|>
*    -|> const delay = 60; // <- every 60 second
*    -|>
*    -|> const storageServiceId = this.startService('Storage', (storageService) => { 
*    -|>  this._storageServiceHandler(storageService)
*    -|> }, delay);
*    -|>   
*
*
*   3-|> // Stop or kill a running service (inside a Class)
*    -|> 
*    -|> const storageServiceId = 300;
*    -|> this.stopService(storageServiceId); 
*    -|> 
*
*   4-|> // Restart service (inside a Class)
*    -|> 
*    -|> const storageServiceId = 300;
*    -|> this.restartService(storageServiceId, (storageService) => { this._storageServiceHandler(storageService) }); 
*    -|> 
*/


// Import a service helper
// import { Service } from './helpers/service-mixin.js';


"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// defining some constant variables...

const PREFIX_SERVICE_TIMER = 'serviceTimer';

/**
 * List of currently running serivces
 *
 * @type { Array[Object] }
 * @private
 */
const runningServices = [];

/**
 * `serviceMixin`
 * This is a mixin that is used to start, stop, restart and verify a service.
 * NOTE: A recursive method is used in this mixin for better performance.
 *
 * Example usage:
 *  (See above examples)
 */
export const serviceMixin = {


  /* >>> public methods <<< */

  /**
   * Method used to start a new service
   *
   * @param { String } name - the service name
   * @param { Function } func - a callback function to be executed every `delay` seconds.
   * @param { Number } delay - the time, in seconds the timer should delay in between executions of the specific function
   *
   * @returns { Number } sid - a unique service ID for the newly activated service.
   */
  startService(name, func, delay) {
    // Initialize the `sid` variable with a randomly generated service ID
    let sid = this._getRandomServiceId();

    // get the current timestamp as `timestamp`
    let timestamp = this._getCurrentTimestamp();

    // create a service object as `service` with the specified `name`, `sid`, `timestamp` and `delay`
    let service = {name, sid, timestamp, delay};

    // launch the service timer
    this._launchServiceTimer(service, func);

    // add this service to the `runningServices` list
    runningServices.push(service);

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[44m\x1b[2m[startService]: name => ${name} & sid => ${sid} & timestamp => ${timestamp}\x1b[0m`);

    // return the `sid`
    return sid;
  },


  /**
   * Method used to stop a service with the given `serviceId`
   *
   * @param { Number } serviceId
   *
   * @returns { Boolean } Returns TRUE, if the the specified service was stopped successfully ;)
   */
  stopService(serviceId) {
    // Initialize the `result` variable by setting it to FALSE.
    let result = false;

    // do nothing if there's no `serviceId`
    if (typeof serviceId === 'undefined') { return }

    // IDEA: Check if the given `serviceId` exists

    // If a service with this `serviceId` exists...
    if (this.verifyServiceId(serviceId)) {
      // ...get the corresponding service timer as `serviceTimer`
      let serviceTimer = this._getServiceTimerById(serviceId);
      // stop / cancel the  `serviceTimer`
      clearTimeout(serviceTimer);
      // remove this service from the list
      this._removeServiceById(serviceId);
      // set `result` to TRUE
      result = true;
    }

    // return `result`
    return result;
  },

  /**
   * Restarts the an already running service
   *
   * @param { Number } serviceId
   * @param { Function } func
   * @param { Number } delay
   *
   * @returns { Number } sid - a new service ID for the restarted service.
   */
  restartService(serviceId, func, delay = null) {
    // get the actual service  as `service`
    let service = this.getServiceById(serviceId);
    // get the service name from `service` as `serviceName`
    let serviceName = service.name;
    // If no delay was given, use the current service delay
    delay = delay ?? service.delay;

    // stop the service
    this.stopService(serviceId);

    // restart the service
    let sid = this.startService(serviceName, func, delay);

    // return the sid;
    return sid;
  },


  /**
   * Verifies if the given `serviceId` exists in the list of running services.
   *
   * @param { Number } serviceId
   *
   * @returns { Boolean } - returns TRUE, if the specified service ID was found.
  */
  verifyServiceId(serviceId) {
    // look/find for exact index of the given `serviceId` in the list of `runningServices` as `serviceIndex`
    let serviceIndex = runningServices.findIndex((service) => service.sid === serviceId);

    // if the `serviceIndex` is not -1, that means it was found in the list 
    let foundService = (serviceIndex !== -1) ? true : false; // <- NN ik ;)

    return foundService;
  },


  /**
   * Returns a list of all currently running services
   *
   * @param { Boolean } onlyIds - If TRUE, only the service ids will be returned
   *
   * @returns { Array[Object] } allServices
  */
  getAllServices(onlyIds = false) {
    // Initialize the `allServices` variable
    let allServices = runningServices;

    if (onlyIds) {
      allServices = allServices.map((service) => service.sid);
    }

    // return `allServices`
    return allServices;
  },

  /**
   * Returns the service of the given `serviceId`
   *
   * @param { Number } serviceId
   *
   * @returns { Object }
   */
  getServiceById(serviceId) {
    return runningServices.find((service) => service.sid === serviceId);
  },


  /* >>> public getters <<< */

  /* >>> public setters <<< */




  /* >>> private methods <<< */

  /**
   * Launches a service timer
   * NOTE: This is a recursive function
   *
   * @param { Object } service - the service object containing the name, service id, timestamp and delay of the service to run
   * @param { Function } func - A callback function
   */
  _launchServiceTimer(service, func) {
    // setup a service timer using the service id (e.g. 'serviceTimer324'
    this[PREFIX_SERVICE_TIMER + service.sid] = setTimeout((timer) => {
      // add a runtime to the service
      service.runtime = this._getCurrentTimestamp() - service.timestamp;

      // call back the `func`
      func(service, timer);

      // re-run the service launcher
      this._launchServiceTimer(service, func);

    }, service.delay * 1000);
  },


  /**
   * Returns a random service ID.
   * NOTE: This is a unique ID that hasn't been used by another service
   *
   * @return { Number } randomServiceId
   */
  _getRandomServiceId() {
    // Initialize the `randomServiceId` variable,
    // by setting it to a random number between 1 and 1000
    let randomServiceId = Math.floor(Math.random(1) * 1000);

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[4;1;34m[_getRandomServiceId](1): randomServiceId => ${randomServiceId}\x1b[0m`);
    console.log(`\x1b[4;1;34m[_getRandomServiceId](2): this.verifyServiceId => ${this.verifyServiceId(randomServiceId)}\x1b[0m`);
    console.log(`\x1b[4;1;34m[_getRandomServiceId](3): runningServices => \x1b[0m`, runningServices);

    // Making sure our service Id is actually random and unique...
    // If `randomServiceID` already exists...
    
    while (this.verifyServiceId(randomServiceId) == true) {
      // ...generate a new service otherwise
      randomServiceId = Math.floor(Math.random(1) * 1000);
    }

    // Return the `randomServiceId`
    return randomServiceId;
  },

  /**
   * Returns the current timestamp
   *
   * @returns { Number } - e.g. 1679161593103 
   */
  _getCurrentTimestamp() {
    return (new Date()).getTime();
  },

  /**
   * Returns the service timer of the given `serviceId`
   * 
   * @param { Number } serviceId
   * @returns { setTimeout } serviceTimer
   */
  _getServiceTimerById(serviceId) {
    return this[PREFIX_SERVICE_TIMER + serviceId];
  },


  /**
   * Method used to remove a service from the `runningServices` list, 
   * using the specified `serviceId`
   *
   * @param { Number } serviceId
   */
  _removeServiceById(serviceId) {
    // get the index of this service as `serviceIndex`
    let serviceIndex = runningServices.findIndex((service) => service.sid === serviceId);

    // remove the service from `_runningServices`, using the given `serviceId`
    runningServices.splice(serviceIndex, 1);
  }

  /* >>> private getters <<< */


  /* >>> private setters <<< */

}; // <- End of `serviceMixin`

