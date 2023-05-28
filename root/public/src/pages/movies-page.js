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
* @name: Movies Page
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> import { MoviesPage } from 'src/pages/movies-page.js';
*    -|> 
*    -|> // get the root of all 'pages' from `muvishoApp`
*    -|> const root = muvishoApp.getRootOf(APP_PAGES);
*    -|> const controller = MoviesPage;
*    -|> 
*    -|> // instantiate the `MoviesPage`
*    -|> let type = 'main'; // or aside
*    -|> let moviesPage = new MoviesPage(type, 'movies-page');
*    -|> 
*    -|> // Open the movies page
*    -|> moviesPage.open();
*    -|> 
*    -|> }
*
*/

import { html } from '../Engine.js';
import { Page } from '../Page.js';

// TODO: Create a `Request` class that will handle all requests to the API
// import { Request } from '../Request.js';
// request.getMoviesByGenre('action', 1).then((data) => {});

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// Defining some constant variables...



// Create a `MoviesPage` class
export class MoviesPage extends Page {

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
      genre: { type: String },
      genreId: { type: Number },
      busy: { type: Boolean },
      totalResults: { type: Number },
      totalPages: { type: Number },
      currentPage: { type: Number },
      loading: { type: Boolean },
    };
  }

  /**
   * Styles
   *
   * @type { Array }
   */
  static get styles() {
    return ['movies'];
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
    // { name: 'movies', views: ['default', 'login', 'register'] }
    
    return [
      { name: 'movies', views: ['default'] }
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
  constructor(type = 'main', name = 'movies-page') {
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

    this.genre = 'all'; // <- eg. 'action', 'adventure', 'comedy', 'science-fiction', 'thriller', 'western'
    this.genreId = 0; 
    this.busy = false;

    this.totalResults = 0; 
    this.totalPages = 0; 
    this.currentPage = 1;

    this.loading = false;

    // Initialize private properties

  }

  
  /**
   * Method used to render this movies page 
   * @override from `Page`
   */
  render() {
    return html`
      <!-- Movies Page Container -->
      <div id="moviesPageContainer" class="app-layout" fit>
        <!-- Header -->
        <header id="header" class="app-header slide-from-up">
          <!-- App Bar -->
          <div id="appBar" class="app-bar">
            <!-- Title Wrapper -->
            <div class="title-wrapper">
              <!-- Title -->
              <h2 class="app-title">Movies</h2>
              <!-- Subtitle -->
              <h3 class="app-subtitle">Hello from <span>${this.name}</span></h3>
            </div>
            <!-- End of Title Wrapper -->

            <!-- Search - Icon Button -->
            <a href="./search?media_type=movies" role="icon-button" tabindex="0" class="icon-button" narrow-only>
              <span class="material-icons icon">search</span>
            </a>

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


          <!-- Genre Chips | [sticky] App Bar | Chips Container -->
          <div id="genreChips" class="app-bar chips-container" sticky scrollpos="start">
            <!-- Left Chip - Icon Button -->
            <button id="leftChipIconBtn" class="icon-button left">
              <span class="material-icons icon">keyboard_arrow_left</span>
            </button>

            <!-- Chips -->
            <ul class="chips horizontal flex-layout center flex" role="tabs" noscrollbars>
              <li data-genre-id="-1" data-genre-name="all" class="chip" role="tab" tabindex="0" aria-selected="true" selected><span>All</span></li>
              <li data-genre-id="20" data-genre-name="action"class="chip" role="tab" tabindex="0" aria-selected="false"><span>Action</span></li>
              <li data-genre-id="30" data-genre-name="adventure"class="chip" role="tab" tabindex="0" aria-selected="false"><span>Adventure</span></li>
              <li data-genre-id="40" data-genre-name="animation"class="chip" role="tab" tabindex="0" aria-selected="false"><span>Animation</span></li>
              <li data-genre-id="50" data-genre-name="comedy"class="chip" role="tab" tabindex="0" aria-selected="false"><span>Comedy</span></li>
              <li data-genre-id="60" data-genre-name="crime"class="chip" role="tab" tabindex="0" aria-selected="false"><span>Crime</span></li>
              <li data-genre-id="70" data-genre-name="drama"class="chip" role="tab" tabindex="0" aria-selected="false"><span>Drama</span></li>
              <li data-genre-id="80" data-genre-name="family"class="chip" role="tab" tabindex="0" aria-selected="false"><span>Family</span></li>
              <li data-genre-id="90" data-genre-name="fantasy"class="chip" role="tab" tabindex="0" aria-selected="false"><span>Fantasy</span></li>
            </ul>
            <!-- End of Chips -->

            <!-- Right Chip - Icon Button -->
            <button id="rightChipIconBtn" class="icon-button right">
              <span class="material-icons icon">keyboard_arrow_right</span>
            </button>

            <span class="divider horizontal bottom" hidden></span>
          </div>
          <!-- End of Genre Chips | [sticky] App Bar | Chips Container -->

          <span class="divider horizontal bottom"></span>
        </header>
        <!-- End of Header -->
        
        <!-- Content -->
        <div content class="fade-in fade-anim-delay-3s">

          <!-- Views - Container -->
          <div id="views" class="container vertical flex-layout centered"></div>
          <!-- End of Views - Container -->
          
          <!-- Loading Spinner - Spinner Wrapper -->
          <!--
          <div id="loadingSpinner" class="spinner-wrapper vertical flex-layout center" hidden>
            <span class="spinner dots-3"></span>
          </div>
          -->

          <!-- Busy Container -->
          <div id="busyContainer" class="container vertical flex-layout centered" busy fit hidden>
            <span class="spinner dots-12"></span>
            <h3 class="title" hidden>${muvishoApp.i18n.getString('loading')}...</h3>
          </div>

        </div>
        <!-- End of Content -->


      </div>
      <!-- End of Movies Page Container -->
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
    console.log(`\x1b[33m[firstUpdated] (2): genre => ${this.genre} & genreId => ${this.genreId} ;)\x1b[0m`);
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

      if (prop.name === 'genre') {
        this._handleGenreChange(prop.value);
      }

      if (prop.name === 'genreId') {
        this._handleGenreIdChange(prop.value);
      }

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
   * Handler that is called when the movies page is ready
   */
  onReady() {
    // HACK: call the `_handleGenreChange()` method, to force the load
    this._handleGenreChange();

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
   * Handler that is called when the movies page is open 
   */
  onOpen() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[onOpen]: ${this.name} is open`); 
  }
  

  /**
   * Handler that is called when the movies page is hidden 
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

    // Do nothing if there's no more movies to load,
    // or if the difference is less than or equal to 0,
    // or if some movies are loading
    // if (!this.totalResults || diff <= 0 || this.loading) return;

    // Set the `loading` property to TRUE
    this.loading = true;

    // TEST: load fake movies as next movies
    muvishoApp.request.getFakeMovies().then((nextMovies) => {
      // Set the `loading` property to FALSE
      this.loading = false;

      // update the `data` of `defaultMoviesView`
      this.defaultMoviesView.updateData(nextMovies);
      
      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[33m[onBottomReached]: nextMovies => %o \x1b[0m`, nextMovies);
      
    });

    // load the next movies 
    // muvishoApp.request.getMoviesByGenreId(this.genreId, this.nextPageCount).then((nextMovies) => {});


    // DEBUG [4dbsmaster]: tell me about it ;)
    //console.log(`\x1b[33m[onBottomReached]: totalResults => %d & totalPages => %d \x1b[0m`,
    // this.totalResults, this.totalPages);
  }


  /**
   * Method used to select a genre chip element, using the specified `genreId`
   *
   * @param { Number } genreId
   */
  selectGenreById(genreId) {
    // TODO: Create a private `_selectGenre({type: 'id', value: genreValue})` method,
    //       that will be used to select a genre chip element` using the specified `genreId` or `genreName`

    // loop through all genre chips
    this.allGenreChips.forEach((genreChipEl) => {
      // get the genre id of the current genre chip
      const genreChipId = genreChipEl.dataset.genreId;

      // if the current genre chip id is equal to the given `genreId`...
      if (genreChipId === genreId) {
        // ...select the current genre chip
        genreChipEl.setAttribute('aria-selected', 'true');
        // create a `selected` property on the current genre chip
        genreChipEl.setAttribute('selected', '');
        // focus the current genre chip
        genreChipEl.focus();
      } else {
        // deselect the current genre chip
        genreChipEl.setAttribute('aria-selected', 'false');
        // remove the `selected` property from the current genre chip
        genreChipEl.removeAttribute('selected');
      }
    });

  }


  /**
   * Method used to select a genre chip element, using the specified `genreName`
   *
   * @param { String } genreName
   */
  selectGenreByName(genreName) {
    // loop through all genre chips
    this.allGenreChips.forEach((genreChipEl) => {
      // get the genre name of the current genre chip
      const genreChipName = genreChipEl.dataset.genreName;

      // if the current genre chip name is equal to the given `genreName`...
      if (genreChipName === genreName) {
        // ...select the current genre chip
        genreChipEl.setAttribute('aria-selected', 'true');
        // create a `selected` property on the current genre chip
        genreChipEl.setAttribute('selected', '');
        // focus the current genre chip
        genreChipEl.focus();
      } else {
        // deselect the current genre chip
        genreChipEl.setAttribute('aria-selected', 'false');
        // remove the `selected` property from the current genre chip
        genreChipEl.removeAttribute('selected');
      }
    });

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


  /* >> Public Setters << */

  /* >> Public Getters << */

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
   * Returns the `<div class="app-layout">` element of the movies page
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
   * Returns the `<button id="leftChipIconBtn" class="icon-button">` element
   *
   * @returns { HTMLButtonElement }
   * @readonly
   */
  get leftChipIconBtn() {
    return this.shadowRoot.getElementById('leftChipIconBtn');
  }


  /**
   * Returns the `<button id="rightChipIconBtn" class="icon-button">` element
   *
   * @returns { HTMLButtonElement }
   * @readonly
   */
  get rightChipIconBtn() {
    return this.shadowRoot.getElementById('rightChipIconBtn');
  }


  /**
   * Returns the `<div id="genreChips" class="app-bar chips-container" ...>` element
   *
   * @returns { HTMLDivElement }
   * @readonly
   */
  get genreChipsEl() {
    return this.shadowRoot.getElementById('genreChips');
  }


  /**
   * Returns the `<ul class="chips ...">` element inside the `genreChipsEl`
   *
   * @returns { HTMLUListElement }
   * @readonly
   */
  get genreChipsScrollTargetEl() {
    return this.genreChipsEl.querySelector('ul.chips');
  }


  /**
   * Returns all the `<li class="chip ...">` elements inside the `genreChipsScrollTargetEl`
   *
   * @returns { Array[HTMLLIElement] }
   * @readonly
   */
  get allGenreChips() {
    return this.genreChipsScrollTargetEl.querySelectorAll('li.chip');
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
    // Get the current press event as `press`
    const press = muvishoApp.isTouchDevice ? 'touchstart' : 'mousedown';
    // Get the current release event as `release`
    const release = muvishoApp.isTouchDevice ? 'touchend' : 'mouseup';

    // Listen for `press` events on the `leftChipIconBtn`
    this.leftChipIconBtn.addEventListener(press, this._onLeftChipIconBtnPress.bind(this));
    // Listen for `release` events on the `leftChipIconBtn`
    this.leftChipIconBtn.addEventListener(release, this._onLeftChipIconBtnRelease.bind(this));
    // Listen for `click` events on the `leftChipIconBtn`
    this.leftChipIconBtn.addEventListener('click', this._onLeftChipIconBtnClick.bind(this));


    // Listen for `press` events on the `rightChipIconBtn`
    this.rightChipIconBtn.addEventListener(press, this._onRightChipIconBtnPress.bind(this));
    // Listen for `release` events on the `rightChipIconBtn`
    this.rightChipIconBtn.addEventListener(release, this._onRightChipIconBtnRelease.bind(this));
    // Listen for `click` events on the `rightChipIconBtn`
    this.rightChipIconBtn.addEventListener('click', this._onRightChipIconBtnClick.bind(this));


    // Listen for `scroll` events on the `genreChipsScrollTargetEl`
    this.genreChipsScrollTargetEl.addEventListener('scroll', this._onGenreChipsScroll.bind(this));


    // For each genre chip...
    this.allGenreChips.forEach((genreChipEl) => {
      // ...listen for `click` events
      genreChipEl.addEventListener('click', this._onGenreChipClick.bind(this));
    });

    // listen for the `scroll` event on the `appLayoutEl`
    this.appLayoutEl.addEventListener('scroll', this._onAppLayoutScroll.bind(this));

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
   * Handler that is called whenever a genre chip is clicked
   *
   * @param { PointerEvent } event - the event that triggered this handler
   */
  _onGenreChipClick(event) {
    // get the genre name of the clicked genre chip as `genreName`
    const genreName = event.currentTarget.dataset.genreName;
    // get the genre id of the clicked genre chip as `genreId`
    const genreId = event.currentTarget.dataset.genreId;

    // set the `genre` property to the clicked genre name
    this.genre = genreName;
    // set the `genreId` property to the clicked genre id
    this.genreId = genreId;

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[_onGenreChipClick]: genreName => ${genreName} & genreId => ${genreId} & event => \x1b[0m`, event);
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

    // disable or enable the genre chips element accordingly
    this.genreChipsEl.setAttribute('aria-disabled', busy ? 'true' : 'false');
    busy ? this.genreChipsEl.setAttribute('disabled', '') : this.genreChipsEl.removeAttribute('disabled');

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[_handleBusyChange]: busy => ${busy} \x1b[0m`);
  }


  

  /**
   * Handler that is called whenever the `genre` property changes
   *
   * @param { String } ?genre - the new value of the `genre` property (e.g. 'science-fiction')
   */
  _handleGenreChange(genre = this.genre) {

    // Select the genre chip by the given `genre`
    this.selectGenreByName(genre);

    // IDEA: Load the movies for the given `genre`


    // Set the `busy` property to TRUE
    this.busy = true;

    if (this.busy) { 
      this._handleBusyChange(); // <- HACK: this is a hack to force the busy container to show up
    }

    //muvishoApp.moviesPage.busy = true;

    
    // request the movies for the given `genre`
    muvishoApp.request.getFakeMovies().then((moviesData) => {
      // TODO: Update the `totalResults`, `totalPages` and `currentPage` properties accordingly

      // Set the `data` of `defaultMoviesView` to the received movies data
      this.defaultMoviesView.data = moviesData;
      // Set the `busy` property to FALSE
      this.busy = false;
    });
    

    /* FOR DEBUGGING PURPOSES ONLY */
    /*
    clearTimeout(this._busyTimer);
    this._busyTimer = setTimeout(() => {
      this.busy = false;

      // DEBUG [4dbsmaster]: tell me about it ;)
      console.info(`\x1b[36m[_handleGenreChange] (2): busy ? ${this.busy} & genre => ${genre} \x1b[0m`);

    }, 3000);
    */
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[_handleGenreChange] (1): busy ? ${this.busy} & genre => ${genre} \x1b[0m`);
  }


  /**
   * Handler that is called whenever the `genreId` property changes
   *
   * @param { Number } ?genreId - the new value of the `genreId` property (e.g. 878)
   */
  _handleGenreIdChange(genreId = this.genreId) {
    // Select the genre chip by the given `genreId`
    this.selectGenreById(genreId);
      
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[_handleGenreIdChange]: genreId => ${genreId} \x1b[0m`);
  }


  /**
   * Handler that is called whenever the `genreChipsScrollTargetEl` is scrolled
   *
   * @param { ScrollEvent } event - the event that triggered this handler
   * @private
   */
  _onGenreChipsScroll(event) {
    // get the left scroll value of the target as `scrollLeft`
    const scrollLeft = event.target.scrollLeft;
    // Get the maximum scroll left value
    let maxScrollLeft = event.target.scrollWidth - event.target.clientWidth;

    // If the `scrollLeft` of the genre scroll target is `0`...
    if (scrollLeft === 0) {
      // ... set the `scrollpos` attribute of the `genreChipsEl` to `start`
      this.genreChipsEl.setAttribute('scrollpos', 'start');

    } else if (scrollLeft >= maxScrollLeft) {
      // ... set the `scrollpos` attribute of the `genreChipsEl` to `end`
      this.genreChipsEl.setAttribute('scrollpos', 'end');
    } else {
      // ... set the `scrollpos` attribute of the `genreChipsEl` to `middle`
      this.genreChipsEl.setAttribute('scrollpos', 'middle');
    }
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    // console.info(`\x1b[37m[_onGenreChipsScroll]: scrollLeft => ${scrollLeft} & maxScrollLeft => ${maxScrollLeft} & event => \x1b[0m`, event);
  }



  /**
   * Handler that is called whenever the `leftChipIconBtn` is pressed
   *
   * @param { MouseEvent|TouchEvent } event - the event that triggered this handler
   * @private
   */
  _onLeftChipIconBtnPress(event) {
    // TODO: do something awesome here ;)

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[_onLeftChipIconBtnPress]: event => \x1b[0m`, event);
  }


  /**
   * Handler that is called whenever the `leftChipIconBtn` is released 
   *
   * @param { MouseEvent|TouchEvent } event - the event that triggered this handler
   * @private
   */
  _onLeftChipIconBtnRelease(event) {
    // TODO: do something awesome here ;)

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[_onLeftChipIconBtnRelease]: event => \x1b[0m`, event);
  }



  /**
   * Handler that is called whenever the `rightChipIconBtn` is pressed
   *
   * @param { MouseEvent|TouchEvent } event - the event that triggered this handler
   * @private
   */
  _onRightChipIconBtnPress(event) {
    // TODO: do something awesome here ;)

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[_onRightChipIconBtnPress]: event => \x1b[0m`, event);
  }


  /**
   * Handler that is called whenever the `rightChipIconBtn` is released 
   *
   * @param { MouseEvent|TouchEvent } event - the event that triggered this handler
   * @private
   */
  _onRightChipIconBtnRelease(event) {
    // TODO: do something awesome here ;)

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[_onRightChipIconBtnRelease]: event => \x1b[0m`, event);
  }



  /**
   * Handler that is called whenever the `leftChipIconBtn` is clicked 
   *
   * @param { PointerEvent } event - the event that triggered this handler
   * @private
   */
  _onLeftChipIconBtnClick(event) {
    // get 50 percent of the current target's width as `scrollDistance`
    let scrollDistance = this.genreChipsScrollTargetEl.clientWidth * 0.5;

    // scroll the genre chips to the left by `scrollDistance`
    this.genreChipsScrollTargetEl.scrollLeft -= scrollDistance;

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[40;36m[_onLeftChipIconBtnClick]: event => \x1b[0m`, event);
  }


  /**
   * Handler that is called whenever the `rightChipIconBtn` is clicked 
   *
   * @param { PointerEvent } event - the event that triggered this handler
   * @private
   */
  _onRightChipIconBtnClick(event) {
    // get the 50 percent of the current target's width as `scrollDistance`
    let scrollDistance = this.genreChipsScrollTargetEl.clientWidth * 0.5;

    // scroll the genre chips to the right by `scrollDistance`
    this.genreChipsScrollTargetEl.scrollLeft += scrollDistance;

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[40;37m[_onRightChipIconBtnClick]: event => \x1b[0m`, event);
  }


  /* >> Private Setters << */

  /* >> Private Getters << */



}; // <- End of `MoviesPage` class


// Attach a behavior to `MoviesPage`...
// Object.assign(MoviesPage.prototype, MoviesPageBehavior);


