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
* @name: Default Series View
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> import { DefaultSeriesView } from 'src/views/series/default-series-view.js';
*    -|> 
*    -|> // instantiate the `DefaultSeriesView`
*    -|> let defaultSeriesView = new DefaultSeriesView(root, 'default-series-view');
*    -|> 
*    -|> // Open the default series view
*    -|> defaultSeriesView.open();
*    -|> 
*    -|> }
*
*/

import { html } from '../../Engine.js';
import { View } from '../../View.js';

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// Defining some constant variables...



// Create a `DefaultSeriesView` class
export class DefaultSeriesView extends View {

  /**
   * Properties
   *
   * @type { Object }
   */
  static get properties() {
    return {
      updated: { type: Boolean },
      opened: { type: Boolean }
    };
  }

  
  // Define some public properties
   
  // Define some private properties
  
   

  /**
   * Constructor of the View
   *
   * @param { String } root
   * @param { String } name
   */
  constructor(root, name = 'default-series-view') {
    // call the `View` constructor with `View` as it's controller
    super(root, name);

    // set default attributes


    // DEBUG [4dbsmaster]: tell me about it ;)
    // console.log(`[constructor]: #_props.init => `, this.#_props.init);
  }


  /**
   * Method that is called from the View's constructor
   * @override from `View`
   */
  init() {
    // Initialize public properties
    this.updated = false;
    this.opened = false;
    
    // Initialize private properties
    
  }

  
  /**
   * Method used to render this series view 
   * @override from `View`
   */
  render() {
    return html`
      <!-- Default Series View Container -->
      <div id="defaultSeriesViewContainer" class="flex-layout vertical centered" fit>
        <p class="txt upper">hello from <strong>${this.name}</strong></p>
      </div>
      <!-- End of Default Series View Container -->
    `;
  }


  /**
   * First time this view gets updated 
   * @override from `View`
   */
  firstUpdated() {

    // add event listeners here

    console.log(`\x1b[33m[firstUpdated]: ${this.name} has been updated #firstTime ;)\x1b[0m`);
  }

  /**
   * Handler that is called whenever a property changes
   *
   * @param { Array[Object] } changedProperties
   * @override from `View`
   */
  propertiesUpdated(changedProperties) {
    super.propertiesUpdated(changedProperties);
    
    // changedProperties.forEach((prop) => {});
  }

  

  /* >> Public Methods << */


  /**
   * Handler that is called when the series view is ready
   */
  onReady() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[onReady]: ${this.name} is ready`); 
  }


  /**
   * Handler that is called when the series view is open 
   */
  onOpen() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[onOpen]: ${this.name} is open`); 
  }
  

  /**
   * Handler that is called when the series view is hidden 
   */
  onClose() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[onClose]: ${this.name} is closed`); 
  }


  /* >> Public Setters << */

  /* >> Public Getters << */



  /* >> Private Methods << */

  /* >> Private Setters << */

  /* >> Private Getters << */



}; // <- End of `DefaultSeriesView` class


// Attach a behavior to `DefaultSeriesView`...
// Object.assign(DefaultSeriesView.prototype, DefaultSeriesViewBehavior);


