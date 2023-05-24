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
* @name: Favorites Page
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> import { FavoritesPage } from 'src/pages/favorites-page.js';
*    -|> 
*    -|> // get the root of all 'pages' from `muvishoApp`
*    -|> const root = muvishoApp.getRootOf(APP_PAGES);
*    -|> const controller = FavoritesPage;
*    -|> 
*    -|> // instantiate the `FavoritesPage`
*    -|> let type = 'main'; // or aside
*    -|> let favoritesPage = new FavoritesPage(type, 'favorites-page');
*    -|> 
*    -|> // Open the favorites page
*    -|> favoritesPage.open();
*    -|> 
*    -|> }
*
*/

import { html } from '../Engine.js';
import { Page } from '../Page.js';

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// Defining some constant variables...



// Create a `FavoritesPage` class
export class FavoritesPage extends Page {

  /**
   * Properties
   *
   * @type { Object }
   */
  static get properties() {
    // TODO: Join default Page properties (e.g.: return Object.assign(super.properties, {});)
    return {
      updated: { type: Boolean },
      opened: { type: Boolean },
      hidden: { type: Boolean },
      view: { type: String }
    };
  }

  /**
   * Styles
   *
   * @type { Array }
   */
  static get styles() {
    return ['favorites'];
  }


  /**
   * Animations
   *
   * @type { Array }
   */
  static get animations() {
    return [ 'fade-in', 'slide-from-down' ];
  }


  /**
   * Pages
   *
   * @type { Array[Object] }
   */
  static get pages() {
    // { name: 'favorites', views: ['default', 'login', 'register'] }
    
    return [
      { name: 'favorites', views: ['default'] }
    ];
  }

  
  // Define some public properties
   
  // Define some private properties
  
   

  /**
   * Constructor of the Page
   *
   * @param { String } type
   * @param { String } name
   */
  constructor(type = 'main', name = 'favorites-page') {
    // call the `Page` constructor with `Page` as it's controller
    super(type, name);

    // set default attributes


    // DEBUG [4dbsmaster]: tell me about it ;)
    // console.log(`[constructor]: #_props.init => `, this.#_props.init);
  }


  /**
   * Method that is called from the Page's constructor
   * @override from `Page`
   */
  init() {
    // Initialize public properties
    this.updated = false;
    this.opened = false;
    this.hidden = false;
    this.view = 'default';
    
    // Initialize private properties
    
  }

  
  /**
   * Method used to render this favorites page 
   * @override from `Page`
   */
  render() {
    return html`
      <!-- Favorites Page Container -->
      <div id="favoritesPageContainer" class="app-layout" fit>
        <!-- Header -->
        <header id="header" class="app-header">
          <!-- App Bar -->
          <div id="appBar" class="app-bar">
            <!-- Title Wrapper -->
            <div class="title-wrapper">
              <!-- Title -->
              <h2 class="app-title">Favorites</h2>
              <!-- Subtitle -->
              <h3 class="app-subtitle">Hello from <span>${this.name}</span></h3>
            </div>
            <!-- End of Title Wrapper -->

            <!-- Search - Icon Button -->
            <button id="searchIconBtn" class="icon-button" hidden>
              <span class="material-icons icon">search</span>
            </button>

            <!-- Settings - Icon Button -->
            <button id="settingsIconBtn" class="icon-button" hidden>
              <span class="material-icons icon">settings</span>
            </button>

            <!-- Menu - Icon Button -->
            <button id="menuIconBtn" class="icon-button">
              <span class="material-icons icon">more_vert</span>
            </button>

            <span class="divider horizontal bottom"></span>
          </div>
          <!-- End of App Bar -->

        </header>
        <!-- End of Header -->

        <!-- Content -->
        <div content>
          <!-- Views - Container -->
          <div id="views" class="container vertical flex-layout centered">

          </div>
          <!-- End of Views - Container -->

        </div>
        <!-- End of Content -->

      </div>
      <!-- End of Favorites Page Container -->
    `;
  }


  /**
   * First time this page gets updated 
   * @override from `Page`
   */
  firstUpdated() {

    // add event listeners here
    // this.containerEl.addEventListener('click', (event) => console.log(event.composedPath()));

    console.log(`\x1b[33m[firstUpdated]: ${this.name} has been updated #firstTime ;)\x1b[0m`);
  }

  /**
   * Handler that is called whenever a property changes
   *
   * @param { Array[Object] } changedProperties
   * @override from `Page`
   */
  propertiesUpdated(changedProperties) {
    super.propertiesUpdated(changedProperties);
    
    // changedProperties.forEach((prop) => {});
  }

  

  /* >> Public Methods << */


  /**
   * Handler that is called when the favorites page is ready
   */
  onReady() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[onReady]: ${this.name} is ready`); 
  }

  /**
   * Handler that is called when a new view is ready
   *
   * @param { String } view
   * @param { String } viewId
   * @param { Object } viewObject
   */
  onViewReady(view, viewId, viewObject) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[onViewReady]: view => ${view} & viewId => ${this.viewId} viewObject => ${eval(viewObject)}`); 
  }


  /**
   * Handler that is called when the favorites page is open 
   */
  onOpen() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[onOpen]: ${this.name} is open`); 
  }
  

  /**
   * Handler that is called when the favorites page is hidden 
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



}; // <- End of `FavoritesPage` class


// Attach a behavior to `FavoritesPage`...
// Object.assign(FavoritesPage.prototype, FavoritesPageBehavior);


