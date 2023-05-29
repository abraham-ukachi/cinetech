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



/**
 * A class that represents Muvisho's `favorites` page, 
 * and inherits from the `Page` class
 */
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
      view: { type: String },
      busy: { type: Boolean },

      totalResults: { type: Number },
      moviesTotalResults: { type: Number },
      seriesTotalResults: { type: Number },

      totalPages: { type: Number },
      moviesTotalPages: { type: Number },
      seriesTotalPages: { type: Number },

      currentPage: { type: Number },
      moviesCurrentPage: { type: Number },
      seriesCurrentPage: { type: Number },

      loading: { type: Boolean },
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
    return [ 'fade-in', 'slide-from-down', 'slide-from-up' ];
  }


  /**
   * Pages
   *
   * @type { Array[Object] }
   */
  static get pages() {
    // { name: 'favorites', views: ['default', 'login', 'register'] }
    
    return [
      { name: 'favorites', views: ['default', 'movies', 'series'] }
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
    this.view = 'default'; // or 'movies', 'series'
    
    this.busy = false;
     
    this.totalResults = 0; 
    this.moviesTotalResults = 0;
    this.seriesTotalResults = 0;

    this.totalPages = 0; 
    this.moviesTotalPages = 0;
    this.seriesTotalPages = 0;

    this.currentPage = 1;
    this.moviesCurrentPage = 1;
    this.seriesCurrentPage = 1;

    this.loading = false;

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
        <header id="header" class="app-header slide-from-up">
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

            <!--  - Icon Button -->
            <button id="searchFavsIconButton" title="${muvishoApp.i18n.getString('findInFavorties')}" class="icon-button">
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

            <span class="divider horizontal bottom" hidden></span>
          </div>
          <!-- End of App Bar -->

          <!-- Tabs Container | [sticky} App Bar  -->
          <div class="tabs-container app-bar" sticky>
            <!-- Tabs -->
            <nav class="tabs horizontal flex-layout center flex" role="tabs">
              <a href="favorites" data-view="default" class="tab" role="tab" tabindex="0" aria-selected="true" selected><span>All</span></a>
              <a href="favorites/movies" data-view="movies" class="tab" role="tab" tabindex="0" aria-selected="false"><span>Movies</span></a>
              <a href="favorites/series" data-view="series" class="tab" role="tab" tabindex="0" aria-selected="false"><span>Series</span></a>

              <!-- Tabs Indicator -->
              <span class="tabs-indicator horizontal bottom"></span>

            </nav>


            <span class="divider horizontal bottom"></span>
          </div>
          
          <span class="divider horizontal bottom" hidden></span>
        </header>
        <!-- End of Header -->
        
        <!-- Content -->
        <div content class="fade-in">

          <!-- Views - Container -->
          <div id="views" class="container vertical flex-layout"></div>
          <!-- End of Views - Container -->
          
          <!-- Busy Container -->
          <div id="busyContainer" class="container vertical flex-layout centered" busy fit hidden>
            <span class="spinner dots-12"></span>
            <h3 class="title" hidden>${muvishoApp.i18n.getString('loading')}...</h3>
          </div>

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

    // Install some event listeners
    this._installEventListeners();

    // this.containerEl.addEventListener('click', (event) => console.log(event.composedPath()));
    console.log(`\x1b[33m[firstUpdated] (1): ${this.name} has been updated #firstTime ;)\x1b[0m`);
  }

  /**
   * Handler that is called whenever a property changes
   *
   * @param { Array[Object] } changedProperties
   * @override from `Page`
   */
  propertiesUpdated(changedProperties) {
    super.propertiesUpdated(changedProperties);
    
    changedProperties.forEach((prop) => {

      if (prop.name === 'busy') {
        this._handleBusyChange(prop.value);
      }

      if (prop.name === 'loading') {
        this._handleLoadingChange(prop.value);
      }

    });
  }

  

  /* >> Public Methods << */


  /**
   * Handler that is called when the favorites page is ready
   */
  onReady() {
    // HACK: Call the `onViewReady()` method, to force the initial data load
    this.onViewReady(this.view, this.currentView.getRealName(), this.currentView);

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[onReady]: ${this.name} is ready & view => ${this.view}`); 
  }

  

  /**
   * Handler that is called when a new view is ready
   *
   * @param { String } view
   * @param { String } viewId
   * @param { Object } viewObject
   */
  onViewReady(view, viewId, viewObject) {

    // Select the tab element by the given `view`
    this.selectTabByView(view);

    // Hide other views
    // this._hideOtherViews(viewId);

    // IDEA: Load the favorites for the given `genre`
    
    // Set the `busy` property to TRUE
    this.busy = true;

    if (this.busy) { 
      this._handleBusyChange(); // <- HACK: this is a hack to force the busy container to show up
    }
    
    // request the favorites for the given `genre`
    muvishoApp.request.getFakeFavorites(view).then((favoritesData) => { 
      // Set the `data` of the current view to the received `favoritesData`
      this.currentView.data = favoritesData;

      // update the current page meta with the received favorites data
      this._updateCurrentPageMeta(favoritesData.page, favoritesData.total_pages, favoritesData.total_results);

      // Set the `busy` property to FALSE
      this.busy = false;
    });

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[onViewReady] (1): view => ${view} & viewId => ${this.viewId} viewObject => %o\x1b[0m`, viewObject);
    console.info(`\x1b[36m[onViewReady] (2): viewsEl => %o & viewEls => %o\x1b[0m`, this.viewsEl, this.viewEls);
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

  
  /**
   * Handler that is called whenever the bottom of the app layout is reached
   * 
   */
  onBottomReached() {
    // compute the difference between the total results and total number of pages
    // const diff = this.totalResults - this.totalPages;

    // console.log('diff', diff);

    // Do nothing if there's no more favorites to load,
    // or if the difference is less than or equal to 0,
    // or if some favorites are loading
    // if (!this.totalResults || diff <= 0 || this.loading) return;

    // Set the `loading` property to TRUE
    this.loading = true;

    // TEST: load fake favorites as next favorites based on the `view` and `currentNextPageCount`
    muvishoApp.request.getFakeFavorites(this.view, this.currentNextPageCount).then((nextFavorites) => {
      // Set the `loading` property to FALSE
      this.loading = false;

      // update the `data` of `currentView`
      this.currentView.updateData(nextFavorites);

      // update the current page meta with the received `nextFavorites` data
      this._updateCurrentPageMeta(nextFavorites.page, nextFavorites.total_pages, nextFavorites.total_results);
      
      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[33m[onBottomReached]: nextFavorites => %o \x1b[0m`, nextFavorites);
      
    });


    // DEBUG [4dbsmaster]: tell me about it ;)
    //console.log(`\x1b[33m[onBottomReached]: totalResults => %d & totalPages => %d \x1b[0m`,
    // this.totalResults, this.totalPages);
  }

  /**
   * Returns the currently selected tab element
   *
   * @returns { Element } 
   * @public
   */
  getSelectedTab() {
    return [...this.allTabs].find((tabEl) => tabEl.hasAttribute('selected'));
  }

  /**
   * Returns the tab element by the given `view`
   *
   * @param { String } view - The view to select (e.g. `default`, `movies`, `series`)
   *
   * @returns { Element }
   * @public
   */
  getTabByView(view) {
    return [...this.allTabs].find((tabEl) => tabEl.dataset.view === view);
  }

  /**
   * Method used to select a tab element, using the specified `view`
   *
   * @param { String } view - The view to select (e.g. `default`, `movies`, `series`)
   *
   * @returns { Element } selectedTabEl - The selected tab element
   * @public
   */
  selectTabByView(view) {
    // Initialize the `selectedTabEl` variable
    let selectedTabEl = null;

    // loop through all the tabs
    this.allTabs.forEach((tabEl) => {
      // get the view of the current tab
      const tabView = tabEl.dataset.view;

      // if the current tab view is equal to the given `view`...
      if (tabView === view) {
        // ...select the current tab
        tabEl.setAttribute('aria-selected', 'true');
        // create a `selected` property on the current tab
        tabEl.setAttribute('selected', '');
        // focus the current tab
        tabEl.focus();

        // update the `selectedTabEl` variable
        selectedTabEl = tabEl;
      } else {
        // deselect the current tab
        tabEl.setAttribute('aria-selected', 'false');
        // remove the `selected` property from the current tab
        tabEl.removeAttribute('selected');
      }

    });

    // notify the tabs to update, based on the current `view`
    this.notifyTabsUpdate(view);

    // return the selected tab element
    return selectedTabEl;
  }


  /**
   * Locks the app layout scroll
   * @public
   */
  lock() {
    this.appLayoutEl.setAttribute('scroll-lock', '');
  }

  /**
   * Unlocks the app layout scroll
   * @public
   */
  unlock() {
    this.appLayoutEl.removeAttribute('scroll-lock');
  }


  /**
   * Notifies the tabs to update, based on the current `view`
   *
   * @public
   */
  notifyTabsUpdate(view = this.view) {
    // get the selected tab element by the given `view`
    let selectedTabEl = this.getTabByView(view);

    // get the width and height of the selected tab element
    const selectedTabElWidth = selectedTabEl.offsetWidth;
    const selectedTabElHeight = selectedTabEl.offsetHeight;

    // update the `tabsIndicatorEl` width and left position according to the selected tab element
    this.tabsIndicatorEl.style.width = `${selectedTabElWidth}px`;
    this.tabsIndicatorEl.style.left = `${selectedTabEl.offsetLeft}px`;
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[33m[notifyTabsUpdate]: view => ${view} & selectedTabElWidth => %d & selectedTabElHeight => %d \x1b[0m`, selectedTabElWidth, selectedTabElHeight);
  }


  /* >> Public Setters << */

  /* >> Public Getters << */

  /**
   * Returns the computed favorites id based on the current `view`
   *
   * @returns { String } - `all` or `movies` or `series`
   * @readonly
   */
  get computedFavId() {
    return this.view === 'default' ? 'all' : this.view;
  }

  /**
   * Returns the current View class instance of the favorites page
   *
   * @returns { View } - `defaultFavoritesView` or `moviesFavoritesView` or `seriesFavoritesView`
   */
  get currentView() {
    return this.view === 'default' ? this.defaultFavoritesView : this[this.view + 'FavoritesView'];
  } 


  /**
   * Returns the next page number to load
   *
   * @returns { Number }
   * @readonly
   */
  get nextPageCount() {
    return this.currentPage + 1;
  }

  /**
   * Returns the next movie page number to load
   *
   * @returns { Number }
   * @readonly
   */
  get nextMoviePageCount() {
    return this.moviesCurrentPage + 1;
  }


  /**
   * Returns the next series page number to load
   *
   * @returns { Number }
   * @readonly
   */
  get nextSeriesPageCount() {
    return this.seriesCurrentPage + 1;
  }


  /**
   * Returns the current next page number to load
   * NOTE: This uses the `view` property to determine the current next page number
   *
   * @returns { Number } - `nextPageCount` or `nextMoviePageCount` or `nextSeriesPageCount`
   * @readonly
   */
  get currentNextPageCount() {
    return this.view === 'default' ? this.nextPageCount : this[this.view + 'NextPageCount'];
  }

  /**
   * Returns the `<div class="app-layout">` element of the favorites page
   *
   * @returns { HTMLDivElement }
   */
  get appLayoutEl() {
    return this.shadowRoot.querySelector('.app-layout');
  }
  

  /**
   * Returns the `<div id="loadingSpinner" class="spinner-wrapper">` element
   *
   * @returns { HTMLDivElement }
   */
  get loadingSpinnerEl() {
    return this.shadowRoot.querySelector('#loadingSpinner');
  }


  /**
   * Returns the `<div class="tabs-container">` element
   *
   * @returns { HTMLDivElement }
   * @readonly
   */
  get tabsContainerEl() {
    return this.shadowRoot.querySelector('.tabs-container');
  }


  /**
   * Returns the `<nav class="tabs">` element inside the `tabsContainerEl`
   *
   * @returns { Element }
   * @readonly
   */
  get tabsEl() {
    return this.tabsContainerEl.querySelector('nav.tabs');
  }


  /**
   * Returns the `<span class="tabs-indicator">` element inside the `tabsContainerEl`
   *
   * @returns { HTMLSpanElement }
   * @readonly
   */
  get tabsIndicatorEl() {
    return this.tabsContainerEl.querySelector('.tabs-indicator');
  }
  

  /**
   * Returns all the `<a class="tab">` elements inside the `tabsEl`
   *
   * @returns { NodeList<HTMLAnchorElement> }
   * @readonly
   */
  get allTabs() {
    return this.tabsEl.querySelectorAll('a.tab');
  }


  /**
   * Returns the `<div id="busyContainer" class="container" busy>` element
   *
   * @returns { HTMLDivElement }
   */
  get busyContainerEl() {
    return this.shadowRoot.getElementById('busyContainer');
  }


  /* >> Private Methods << */
  

  /**
   * Shows the loading spinner element
   * NOTE: This method appends the loading spinner element to the `viewsEl`
   * @private
   */
  _showLoadingSpinner() {
    // this.loadingSpinnerEl.hidden = false;

    // get the loading spinner html template 
    let loadingSpinnerTemplate = this._getLoadingSpinnerTemplate();
    // add the `loadingSpinnerTemplate` to the `viewsEl`
    this.viewsEl.insertAdjacentHTML('beforeend', loadingSpinnerTemplate);
  }



  /**
   * Hides the loading spinner element
   * NOTE: This method removes the loading spinner element from the `viewsEl`
   * @private
   */
  _hideLoadingSpinner() {
    // this.loadingSpinnerEl.hidden = true;
    // remove the loading spinner element from the `viewsEl`
    this.loadingSpinnerEl.remove();
  }

  /**
   * Returns the html template for the loading spinner
   *
   * @returns { String } html template
   * @private
   */
  _getLoadingSpinnerTemplate() {
    return html`
      <!-- Loading Spinner - Spinner Wrapper -->
      <div id="loadingSpinner" class="spinner-wrapper vertical flex-layout center">
        <span class="spinner dots-3"></span>
      </div>
    `;
  }


  /**
   * Method used to install event listeners
   * @private
   */
  _installEventListeners() {

    // For each tab...
    this.allTabs.forEach((tabEl) => {
      // ...listen for `click` events
      tabEl.addEventListener('click', this._onTabClick.bind(this));
    });

    // listen for the `scroll` event on the `appLayoutEl`
    this.appLayoutEl.addEventListener('scroll', this._onAppLayoutScroll.bind(this));

    // Listen for the `resize` event on the `window` object
    window.addEventListener('resize', this._onWindowResize.bind(this));

  }

  /**
   * Handler that is called whenever the window is resized
   *
   * @param { Event } event - The event that triggered the handler
   * @private
   */
  _onWindowResize(event) {

    // clear the resize timer
    clearTimeout(this.resizeTimer);

    // Set a new resize timer for 250ms
    this.resizeTimer = setTimeout(() => {

      // notify the tabs that the window has been resized
      this.notifyTabsUpdate();

    }, 250);

  }


  /**
   * Handler that is called whenever the app layout gets scrolled
   *
   * @param { Event } event - The event that triggered the handler
   */
  _onAppLayoutScroll(event) {
    // Get the scroll element as `scrollEl`
    const scrollEl = event.currentTarget;

    // Get the `scrollTop` value of `scrollEl`
    const scrollTop = scrollEl.scrollTop;
    // Get the scroll height of `scrollEl` as `scrollHeight`
    const scrollHeight = scrollEl.scrollHeight;
    // Get the offset height of `scrollEl` as `offsetHeight`
    const offsetHeight = scrollEl.offsetHeight;


    // Check if the user has scrolled to the bottom of the page
    let bottomReached = (scrollTop + offsetHeight) >= scrollHeight;
    
    // If the user has scrolled to the bottom of the page...
    if (bottomReached) {
      // TODO: do something awesome here ;)
      // call the `onBottomReached` method
      this.onBottomReached();
    }


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[35m[_onAppLayoutScroll](1): scrollTop => %d & scrollHeight => %d & offsetHeight => %d\x1b[0m`, scrollTop, scrollHeight, offsetHeight);
    console.log(`\x1b[35m[_onAppLayoutScroll](2): bottomReached ? %s\x1b[0m`, bottomReached);

  }


  /**
   * Handler that is called whenever a tab is clicked
   *
   * @param { PointerEvent } event - the event that triggered this handler
   */
  _onTabClick(event) {
    // get the view of the clicked tab as `tabView`
    const tabView = event.currentTarget.dataset.view;

    // select the tab with the `tabView`
    this.selectTabByView(tabView);

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[_onTabClick]: tabView => ${tabView} & event => \x1b[0m`, event);
  }


  /**
   * Handler that is called whenever the `loading` property changes
   *
   * @param { Boolean } ?loading - If TRUE, the page is loading data
   * @private
   */
  _handleLoadingChange(loading = this.loading) {
    // IDEA: show or hide the loading spinner element accordingly
    loading ? this._showLoadingSpinner() : this._hideLoadingSpinner();
    // lock or unlock the app layout element accordingly
    loading ? this.lock() : this.unlock();

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[35m[_handleLoadingChange]: loading => %s\x1b[0m`, loading);
  }


  /**
   * Handler that is called whenever the `busy` property changes
   *
   *
   * @param { Boolean } ?busy - If TRUE, the page is busy loading data
   */
  _handleBusyChange(busy = this.busy) {
    // get the busy container element as `busyContainerEl`
    // show the busy container element if the page is busy, otherwise hide it
    this.busyContainerEl.hidden = !busy;

    // disable or enable the views element accordingly
    this.viewsEl.setAttribute('aria-disabled', busy ? 'true' : 'false');
    busy ? this.viewsEl.setAttribute('disabled', '') : this.viewsEl.removeAttribute('disabled');

    // disable or enable the tabs element accordingly
    // this.tabsEl.setAttribute('aria-disabled', busy ? 'true' : 'false');
    // busy ? this.tabsEl.setAttribute('disabled', '') : this.tabsEl.removeAttribute('disabled');

    // notify the tabs of this update
    this.notifyTabsUpdate();

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[_handleBusyChange]: busy => ${busy} \x1b[0m`);
  }


  /**
   * Method used to update the current page meta data with the given `currentPage`, `totalPages` and `totalResults`
   *
   * @param { Number } ?currentPage - the current page number
   * @param { Number } ?totalPages - the total number of pages
   * @param { Number } ?totalResults - the total number of results
   * @private
   */
  _updateCurrentPageMeta(currentPage = this.currentPage, totalPages = this.totalPages, totalResults = this.totalResults) {
    switch (this.view) {
      case 'movies':
        this.moviesCurrentPage = currentPage;
        this.moviesTotalPages = totalPages;
        this.moviesTotalResults = totalResults;
        break;
      case 'series':
        this.seriesCurrentPage = currentPage;
        this.seriesTotalPages = totalPages;
        this.seriesTotalResults = totalResults;
        break;
      default:
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalResults = totalResults;
        break;
    }

  }


  /* >> Private Setters << */

  /* >> Private Getters << */



}; // <- End of `FavoritesPage` class


// Attach a behavior to `FavoritesPage`...
// Object.assign(FavoritesPage.prototype, FavoritesPageBehavior);


