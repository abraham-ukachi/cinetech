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
* @name: Live Storage
* @type: helper
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> import { LiveStorage } from './src/helpers/LiveStorage.js';
*    -|>
*    -|> const liveStorage = new LiveStorage('preferences', 10); // <- 10 seconds interval
*    -|>
*    -|> // set multiple items in your browser's local storage
*    -|> liveStorage.setItems({ lang: 'en', theme: 'dark', shape: 'circle' });
*
*
*   2-|> // Retrieve multiple items from your browser's local storage
*    -|>
*    -|> let storageItems = liveStorage.getItems('lang', 'theme', 'shape');
*    -|>   
*
*
*   3-|> // Actively watch a set of keys with a callback
*    -|>
*    -|> this.liveStorage.watch(['lang', 'theme'], callback);
*    -|>
*     |
*   --OR--
*     |
*    -|> // Watch an item or multiple items for their live updates / changes
*    -|> import { installStorageWatcher } from './src/helpers/LiveStorage.js';
*    -|> 
*    -|> class App extends Engine {
*    -|>   ...
*    -|>   firstUpdated() {
*    -|>     installStorageWatcher(this, ['lang', 'theme'], (changedStorageItems) => this._handleChangedStorageItems(changedStorageItems));
*    -|>   }
*    -|> }
*/


// Import a service mixin
import { serviceMixin } from './mixins/service-mixin.js';


"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// Defining some constant variables...

const DEFAULT_LIVESTORAGE_DELAY = 10; // <- 10 second
const DEFAULT_LIVESTORAGE_NAME = 'live-storage';


// Creating a `LiveStorage` class...


/**
 * Class representing a live storage (aka. "A Better Local Storage")
 * NOTE: This is just an improvement to the browser's built-in `localStorage()` function
 *
 * @class
 */
export class LiveStorage {

  // Define some public attributes

  // watch list
  #watchlist = [];
  // snapshot of the current storage
  #snapshot = {};
 
  // Define some private attributes

  /**
   * Constructor of this `LiveStorage` class
   * NOTE: This constructor will be executed automatically whenever an object of this `LiveStorage` is created.
   *
   * @param { String } name - liveStorage name, used as service name
   * @param { Number } delay 
   */
  constructor(name = DEFAULT_LIVESTORAGE_NAME, delay = DEFAULT_LIVESTORAGE_DELAY) {
    this.delay = delay; 

    // TODO: auto-increment the name if it already exists (e.g. 'live-storage1', 'live-storage2', etc)

    // start a service named 'live-storage'
    this.startService(name, (storageService) => this._storageServiceHandler(storageService), delay);
    // TEST: this.startService('bobo', (storageService) => console.log(`[bobo]: storageService ==> `, storageService), 10);

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40m\x1b[32m[constructor](LiveStorage): delay => ${delay} & this.startService\x1b[0m`, this.startService);
  }


  /* >> public methods << */

  /**
   * Watches the given `keys` for any changes.
   * NOTE: This method adds the `keys` to a watchlist, however the process is aborted if one key already exists
   *
   * @param { Array } keys
   * @param { Function } handler - A callback function
   *
   * @returns { Boolean } result - Returns TRUE, if all keys were successfully added to a watch list
   */
  watch(keys, handler) {
    // Initialize a `result` boolean variable
    let result = false;

    // If no given key in `keys` is currently in the watchlist...
    if (!this.checkWatchlist(...keys)) {

      // ...create a watchlist object as `watchlistObj`
      let watchlistObj = {handler, keys};

      // add `watchlistObj` to `#watchlist`
      this.#watchlist.push(watchlistObj);

      // update result to TRUE
      result = true;
    }


    // return the `result`
    return result;
  }

  /**
   * Method used to set one or more `items` in the browser's local storage
   *
   * @param { Object } items - to be stored in the live storage (e.g. { lang: 'en', theme: 'dark' })
   * @param { Boolean } replaceValues - If TRUE an item was already set, its value will be replaced or overriden.
   */
  setItems(items, replaceValues = false) {
    // loop through the given `items`
    Object.entries(items).map(([key, value]) => {
      // store the key/value item in localStorage
      this.setItem(key, value, replaceValues);
    });
  }


  /**
   * Method used to retrieve one or more `items from the browser's local storage.
   * 
   * @param { Array[String] } keys - individual keys to get from the live storage (e.g. 'lang', 'theme'...)
   * @returns { Object } items
   */
  getItems(...keys) {
    // Initialize the `items` object variable
    let items = {};

    // for each key in `keys`...
    for (let key of [...keys]) {
      // ...get the corresponding value
      items[key] = this.getItem(key);
    }

    // return the `items`
    return items;
  }


  /**
   * Returns TRUE, if the all given `keys` exist in the local storage.
   *
   * Exmaple usage:
   *   hasItems('lang', 'theme');
   *
   * @param { Array[String] } keys - individual elements of an array as argument
   *
   * @returns { Boolean }
   */
  hasItems(...keys) {
    // Initialize the `result` variable by checking every key
    let result = false;

    // If the browser supports `Storage`...
    if (this.isStorageSupported) {
      // ...check if every key exist in `localStorage` and assign the value to `result`
      result = [...keys].every((key) => localStorage.hasOwnProperty(key));
    }

    // return `result`
    return result;
  }


  /** 
   * Sets / stores the given `key` and `value` to local storage
   * NOTE: This functionality is similar to `localStorage.setItem()` (for now)
   * TODO: Store a corresponding item type to allow item retrieval in its original data type 
   *       (mostly useful for arrays and objects)
   *
   * @param { String } key
   * @param { String|Number|Boolean } value
   * @param { Boolean } replaceValue - If TRUE and `key` was already set, it's value will be replaced or overriden.
   *
   * @returns { Boolean } result - Returns TRUE if the item was set or saved in localStorage successfully
   */
  setItem(key, value, replaceValue = false) {
    // Initialize the `result` variable
    let result = false;

    // TODO: Make sure browser supports Storage before proceeding

    // If there's no item with this key in storage or `replace` is TRUE...
    if (!this.hasItems(key) || replaceValue === true) {
      // ...define a property setter & getter of this item
      Object.defineProperty(this, key, {

        get() {
          return localStorage.getItem(key);
        },

        set(newValue) {
          localStorage.setItem(key, newValue);
        },

        enumerable: true,
        configurable: true
      });


      // assign the given `value` to the specified `key`.
      this[key] = value;

      // set `result` to TRUE
      result = true;
    }

    // return result
    return result;

  }


  /**
   * Returns the value of the given `key` from storage
   *
   * @param { String } key
   *
   * @returns { String|Number|Boolean } value
   */
  getItem(key) {
    // Initialize the `value` variable
    let value = null;

    // If the storage is supported by the browser...
    if (this.isStorageSupported) value = this[key] || localStorage.getItem(key);

    // get the value 
    return value;
  }


  /**
   * Checks if the given `keys` already exist in the `liveStorage`'s watchlist.
   * 
   * Example usage:
   *    let inWatchlist = this.checkWatchlist('lang', 'theme'); // true
   *
   * @param { Array } keys
   *
   * @returns { Boolean } result - Returns TRUE, if all keys were found in `#watchlist`
   */
  checkWatchlist(...keys) {
    // IDEA: find the watch list in which all the `keys` exists, and return TRUE or FALSE respectively
    return [...keys].every((key) => this.#watchlist.find((list) => list.keys.includes(key)));
  }


  /**
   * Returns the current snapshot of the live storage
   *
   * @returns { Object }
   */
  getCurrentSnapshot() {
    return this.#snapshot;
  }

  /**
   * Checks if all values of the given `keys` are null
   *
   * @param { Array } keys
   *
   * @returns { Boolean } if TRUE, all the values are null
   */
  isNullItems(...keys) {
    // get all the items
    let items = this.getItems(...keys);
    // map only the values in `items`
    let mappedValues = Object.entries(items).map(([key, value]) => value);

    // checking if all values are null, and asign to `result` variable
    let result = mappedValues.every((value) => value === null);

    // return `result`
    return result;
  }




  /* >> public getters << */

  /**
   * Returns a list of keys in the watchlist
   *
   * @returns { Array } 
   */
  get watchlistKeys() {
    // Initialize the `result` variable by setting it to an empty array
    let result = [];

    // Map all the keys in `#watchlist`
    this.#watchlist.map((list) => {
      // add the keys from this `list` to `result`
      result.push(...list.keys);
    });

    // return `result`
    return result;
  }

  
  /**
   * Returns TRUE, if the current browser supports `Storage`
   *
   * @returns { Boolean } 
   */
  get isStorageSupported() {
    // IDEA: Check for browser support of `Storage`
    return typeof(Storage) !== 'undefined' ? true : false; // <- #NN ik ;)
  }


  /* >> public setters << */


  /* >> private methods << */

  /**
   * Method used to take a snapshot of the current storage,
   * and updates the `#snapshot` object accordingly
   */
  _takeStorageSnapshot() {
    // loop through all the current keys from watchlist
    this.watchlistKeys.forEach((watchlistKey) => {
      // ...update the snapshot
      this.#snapshot[watchlistKey] = this.getItem(watchlistKey);
    });

    // DEBUG [4dbsmaster]: tell me about this snapshot
    // console.log(`\x1b[46m\x1b[2;30m[_takeStorageSnapshot](1): watchlistKeys => \x1b[0m`, this.watchlistKeys);
    // console.log(`\x1b[46m\x1b[2;30m[_takeStorageSnapshot](2): snapshot => \x1b[0m`, this.#snapshot);
  }

  /**
   * A service handler that is called whenever every `delay` milliseconds
   *
   * @param { Object } service
   */
  _storageServiceHandler(service) {
    // If the number of keys in watchlist is not the same as the keys in snapshot...
    if (this.watchlistKeys.length !== Object.keys(this.#snapshot).length) {
      // ...take a snapshot of the storage
      this._takeStorageSnapshot();
    }


    // Loop through the `#watchlist` extracting its keys and corresponiding handler
    this.#watchlist.forEach((list) => {

      // create a `changedItems` object variable
      let changedItems = [];

      list.keys.forEach((key) => {
        // get the value of this key as `value`
        let value = this.getItem(key);

        // if the `value` of the key in watchlist is not the same as that in the snapshot...
        if (value !== this.#snapshot[key]) {
          // ...create and 'key/value' item and add it to the `changedItems` list
          changedItems.push({key, value});
        }
      });

      // If the `changedItems` list is not empty, 
      // call the `handler` with the changed items
      if (changedItems.length) list.handler(changedItems);

    });

    // update the storage snapshot
    this._takeStorageSnapshot();

    
    // DEBUG [4dbsmaster]: tell me about this awesome service handler ;)
    // console.log(`\x1b[46m\x1b[2;30m[_storageServiceHandler](1): service => \x1b[0m`, service);
    // console.log(`\x1b[46m\x1b[2;30m[_storageServiceHandler](2): #watchlist => \x1b[0m`, this.#watchlist);
    // console.log(`\x1b[46m\x1b[2;30m[_storageServiceHandler](3): #snapshot => \x1b[0m`, this.#snapshot);
  }


  /* >> private getters << */
  /* >> private setters << */

}; // <- End of LiveStorage

// Attach the `serviceMixin` to this `LiveStorage`
Object.assign(LiveStorage.prototype, serviceMixin);




/**
 * A utility method to install a storage watcher on a specified `controller`
 * This watches all the given `keys` for any changes and executes the corresponding `callback` function 
 * whenever a related key changes.
 *
 * @param { Object } controller
 * @param { Array } keys
 * @param { Function } callback
 */
export const installStorageWatcher = (controller, keys, callback) => {

  // Instantiate the `LiveStorage` class as `liveStorage`
  controller.liveStorage = new LiveStorage();

  // watch the keys and attach the specified `callback`
  controller.liveStorage.watch(keys, callback);

};

