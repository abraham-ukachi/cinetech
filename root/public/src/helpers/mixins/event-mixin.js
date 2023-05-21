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
* @name: Event
* @type: mixin
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @crdits: https://javascript.info/mixins
*
* Example usage:
*   1-|> import { eventMixin } from './src/helpers/mixins/event-mixin.js';
*    -|>
*    -|> Assign.object(App.prototype, eventMixin);
*    -|>
*
*
*   2-|> // Trigger events
*    -|>
*    -|> muvishoApp.trigger('show-screen', {screen: SPLASH_SCREEN}); // <- or WELCOME_SCREEN
*    -|>
*    -|> muvishoApp.trigger('open-page', {page: HOME_PAGE, inAnim: 'slide-from-down', outAnim: 'fade-out'}); 
*    -|>
*    -|> muvishoApp.trigger('swap-view', {view: DEFAULT_LOGIN_VIEW});
*    -|>
*    -|> muvishoApp.trigger('open-dialog', {title: 'Delete comment', message: 'Are you sure?', onConfirm: () => {}, ...}); 
*    -|>
*    -|> muvishoApp.trigger('open-menu', [
*    -|>  {icon: 'delete', label: 'Remove item'},
*    -|>  {icon: 'clear', label: 'Cancel'}
*    -|> ], onSelect: () => {}); 
*    -|>
*    -|> muvishoApp.trigger('show-toast', {message: 'comment added!', duration: 5000}); 
*    -|>
*    -|>   
*
*/

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// defining some constant variables...



/**
 * `eventMixin`
 * This is a mixin that is used to **generate events**.
 * NOTE: This is a great way to broadcast information to anyone who wants it.
 *
 * Example usage:
 *  (See above examples)
 */
export const eventMixin = {


  /* >>> public methods <<< */

  /**
   * Method used to generate an event with the given `eventName` and data or `args`.
   *
   * Example usage:
   *   this.trigger('busy', data1, data2);
   *
   * @param { String } eventName
   * @param { Object, Array, ... } args
   */
  trigger(eventName, ...args) {
    // Do nothing if there are no handlers for the specified `eventName`
    if (!this._eventHandlers?.[eventName]) { return }

    // call the handlers
    this._eventHandlers[eventName].forEach((handler) => handler.apply(this, args));
  },


  /**
   * Subscribe to an event.
   *
   * Example usage:
   *  dialog.on('confirm', (response) => { ... });
   *
   * @param { String } eventName
   * @param { Function } handler
   */
  on(eventName, handler) {
    // If there's no event handler object... 
    if (!this._eventHandlers) { 
      // ...create & initialize it
      this._eventHandlers = {};
    }

    // if the specified `eventName` doesn't exists in `_eventHandlers` (i.e. first event with such name)...
    if (!this._eventHandlers[eventName]) {
      // ...initialize it by setting it to an empty array
      this._eventHandlers[eventName] = [];
    }

    // add `handler` to the list 
    this._eventHandlers[eventName].push(handler);

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[45m[on](1): eventName => ${eventName} & handler => \x1b[0m`, handler);
    console.log(`\x1b[45m[on](2): _eventHandlers => \x1b[0m`, this._eventHandlers);

  },


  /**
   * Unsubscribe from an event or cancel any active subscription.
   *
   * Example usage:
   *  dialog.off('confirm', handler)
   *
   * @param { String } eventName
   * @param { Function } handler
   */
  off(eventName, handler) {
    // get all the handlers with this `eventName`
    let handlers = this._eventHandlers?.[eventName];

    // do nothing more if there are no handlers
    if (!handlers) { return }

    // loop through the `handlers` list
    for (let handlerIndex in handlers) {
      // if the handler in `handlers` matches that given as argument...
      if (handlers[handlerIndex] === handler) {
        // ...remove it!
        handlers.splice(handlerIndex--, 1);
      }

    }
  }

  /* >>> private getters <<< */

  /* >>> private getters <<< */



  /* >>> private methods <<< */

  /* >>> private getters <<< */

  /* >>> private setters <<< */


}; // <- End of `eventMixin`

