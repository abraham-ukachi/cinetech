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
import { TMDB_IMAGE_BASE_URL, TMDB_FILE_DEFAULT_SIZE } from '../../helpers/request.js';

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// Defining some constant variables...



// Create a `DefaultSeriesView` class
export class DefaultSeriesView extends View {

  /**
   * Styles
   *
   * @type { Object }
   */
  static get styles() {
    return ['series'];
  }


  /**
   * Properties
   *
   * @type { Object }
   */
  static get properties() {
    return {
      updated: { type: Boolean },
      opened: { type: Boolean },
      data: { type: Object },
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
    this.data = {results: []};


    // Initialize private properties
    
  }

  
  /**
   * Method used to render this series view 
   * @override from `View`
   */
  render() {
    return html`
      <!-- Default Series View Container -->
      <div id="defaultSeriesViewContainer" class="flex-layout vertical" fit>
        <p class="txt upper" hidden>hello from <strong>${this.name}</strong></p>

        <!-- Series - Media List | Grid Layout -->
        <ul id="series" class="media-list grid-layout" naked>${this._getSeriesTemplate(this.data.results)}</ul>
        <!-- End of Series - Media List | Grid Layout -->

      </div>
      <!-- End of Default Series View Container -->
    `;
  }


  /**
   * First time this view gets updated 
   * @override from `View`
   */
  firstUpdated() {

    // installing some event listeners 
    this._installEventListeners();

    // Install some observers
    this._installObservers();

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
    
    changedProperties.forEach((prop) => {

      if (prop.name === 'data') {
        this._handleDataChange(prop.value, prop.oldValue);
      }

    });
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
  
  
  /**
   * Updates the current view's `data` object with the given `newData`
   * NOTE: This method pushes the new data results to the end of the `currentData.results` array
   *
   * @param { Object } newData
   *
   * @returns { Object } the updated data object
   */
  updateData(newData) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[updateData]: ${this.name} is updating data... newData => %o\x1b[0m`, newData); 
    
    // get the series html template from the new data results
    let seriesTemplate = this._getSeriesTemplate(newData.results);
    
    // append the series template to the `<ul id="series">` element
    this.seriesEl.innerHTML += seriesTemplate;

    // update the current data results with the new data results
    this.data.results = [...this.data.results, ...newData.results];

    // update the number of pages in data
    this.data.page = newData.page;
    // update the total number of pages in data
    this.data.total_pages = newData.total_pages;
    // update the total number of results in data
    this.data.total_results = newData.total_results;
  
    // reinstall the event listeners
    this._reinstallEventListeners();

    // reinstall the observers
    this._reinstallObservers();

    // return `this.data` (i.e. the updated data object)
    return this.data;
  }
   

  /* >> Public Setters << */

  /* >> Public Getters << */

  /**
   * Returns the `<ul id="series">` element
   *
   * @returns { HTMLUListElement }
   * @public
   */
  get seriesEl() {
    return this.shadowRoot.querySelector('#series');
  }


  /**
   * Returns all the `<li class="serie">` elements in `seriesEl`
   *
   * @returns { Array[HTMLLIElement] }
   * @public
   */
  get serieEls() {
    return this.seriesEl.querySelectorAll('li.serie');
  }

  /**
   * Returns all the `<img class="poster">` elements in `seriesEl`
   *
   * @returns { Array[HTMLImageElement] }
   * @public
   */
  get posterImageEls() {
    return this.seriesEl.querySelectorAll('li.serie img.poster');
  }


  /* >> Private Methods << */

  /**
   * Installs all the event listeners for this view
   * @private
   */
  _installEventListeners() {
    // IDEA: loop through the series elements

    // for each serie element...
    this.serieEls.forEach((serieEl) => {
      // ...add a `click` event listener
      serieEl.addEventListener('click', this._handleSerieClick.bind(this));
    });
  }

  /**
   * Installs all the observers for this view
   * @private
   */
  _installObservers() {
    // let's create a new instance of the `IntersectionObserver` class
    this.posterObserver = new IntersectionObserver(this._handlePosterIntersection.bind(this));
    
    // Now, let's observe all the poster image elements
    this.posterImageEls.forEach((posterImageEl) => this.posterObserver.observe(posterImageEl));

  }

  /**
   * Removes all the observers for this view
   * @private
   */
  _removeObservers() {
    // Let's loop through all the poster image elements,
    // and unobserve each one of them
    this.posterImageEls.forEach((posterImageEl) => this.posterObserver.unobserve(posterImageEl));
  }


  /**
   * Reinistalls all the observers for this view
   * @private
   */
  _reinstallObservers() {
    // First, let's remove all the observers
    this._removeObservers();

    // Now, let's reinstall them
    this._installObservers();
  }


  /**
   * Handler that is called whenever a poster is intersected
   *
   * @param { Array[IntersectionObserverEntry] } posterImages
   * @param { IntersectionObserver } observer
   *
   * @private
   */
  _handlePosterIntersection(posterImages, observer) {
    // loop through the poster images
    posterImages.forEach((posterImage) => {
      // If the poster image is currently intersecting the viewport...
      if (posterImage.isIntersecting) {
        // ...load the poster image
        this._loadPosterImage(posterImage.target);

        // Now, stop observing the poster image ;)
        observer.unobserve(posterImage.target);
      }
    });
  }


  /**
   * Loads a poster image
   * NOTE: This method replaces the `src` attribute of the given `postImageEl` with the `data-src` attribute
   *
   * @param { HTMLImageElement } postImageEl
   * @private
   */
  _loadPosterImage(postImageEl) {
    // get the poster image source
    let posterImageSrc = postImageEl.dataset.src;

    // replace the `src` attribute of the poster image with the poster image source, an 'basta!' ;)
    postImageEl.src = posterImageSrc;
  }



  /**
   * Removes all the event listeners of this view
   * @private
   */
  _removeEventListeners() {
    // IDEA: loop through the series elements

    // for each serie element...
    this.serieEls.forEach((serieEl) => {
      // ...remove  any `click` event listener
      serieEl.removeEventListener('click', this._handleSerieClick.bind(this));
    });
  }


  /**
   * Re-installs all the event listeners of this view
   * @private
   */
  _reinstallEventListeners() {
    // remove all event listeners
    this._removeEventListeners();
    // install all event listeners
    this._installEventListeners();
  }


  /**
   * Handler that is called whenever a serie is clicked
   *
   * @param { PointerEvent } event
   * @private
   */
  _handleSerieClick(event) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[33m[_handleSerieClick]: serie clicked!!! event => %o\x1b[0m`, event.currentTarget);
  }



  /**
   * Returns the computed id of a serie
   *
   * @param { Number } id - serie id (e.g. `1412`)
   * @param { String } originalTitle - serie original title (e.g. `Arrow`) 
   * @param { String } firstAirDate - serie first air date (e.g. `2023-04-25`) 
   *
   * @returns { String } - computed id (e.g. `32533-avengers-endgame-2023`)
   * @private
   */
  _getComputedId(id, originalTitle, firstAirDate) {
    return `${id}-${originalTitle.toLowerCase().replace(/[\s:,.]+/g, '-')}-${this._getComputedYear(firstAirDate)}`;
  }


  /**
   * Returns the computed year of a serie from its first air date
   *
   * @param { String } firstAirDate - serie first air date (e.g. `2023-04-25`)
   *
   * @returns { String } - computed year (e.g. `2023`)
   * @private
   */
  _getComputedYear(firstAirDate) {
    return firstAirDate.split('-')[0];
  }

  /**
   * Returns the computed rating status of a serie
   *
   * @param { Number } ratingAverage - the serie's rating average (e.g. `7.5`)
   *
   * @returns { String } - computed rating status (e.g. `good`)
   * @private
   */
  _getComputedRatingStatus(ratingAverage) {
    return ratingAverage >= 7 ? 'good' : (ratingAverage >= 5 ? 'ok' : 'bad');
  }


  /**
   * Returns the html template for the series
   *
   * @param { Array[Object] } series - list of series
   * @returns { String } - html template
   * @private
   */
  _getSeriesTemplate(series = this.data.results) {
    return html`
      ${series.map((serie) => html`
         <!-- Serie -->
         <li class="serie flex-layout vertical fade-in" data-id="${serie.id}">
           
           <!-- Poster Container -->
           <a href="./details/serie?vid=${this._getComputedId(serie.id, serie.original_name, serie.first_air_date)}" 
              class="poster-container"
              title="${serie.name} - ${serie.overview}">
             <!-- Poster -->
             <img data-src="${TMDB_IMAGE_BASE_URL}/${TMDB_FILE_DEFAULT_SIZE}${serie.poster_path}" alt="${serie.name}" class="poster vertical flex-layout centered fade-in" fit/>

             <!-- Meta -->
             <div class="meta flex-layout vertical center" fit>
               <!-- Rating -->
               <span class="rating is-${this._getComputedRatingStatus(serie.vote_average)}">${serie.vote_average}</span>
               <!-- Year -->
               <span class="year">${this._getComputedYear(serie.first_air_date)}</span>
             </div>

           </a>
           <!-- End of Poster Container -->

           <!-- Serie Details -->
           <div class="serie-details flex-layout horizontal center flex">
             <!-- Serie Name -->
             <h3 class="serie-name">${serie.name}</h3>
             
             <!-- More - Icon Button -->
             <button class="more-button icon-button fade-in" title="More">
               <span class="material-icons icon">more_horiz</span>
             </button>

           </div>
           <!-- End of Serie Details -->
         </li>
         <!-- End of Serie -->

       `)}

    `;

  }


  /**
   * Handler that is called whenever the data changes
   *
   * @param { Object } data
   * @param { Object } oldData
   * @private
   */
  _handleDataChange(data, oldData) {
    // get the series html template of the specified `data` as `seriesHtmlTemplate`
    const seriesHtmlTemplate = this._getSeriesTemplate(data.results);
    // set the `seriesHtmlTemplate` as the `innerHTML` of the `seriesEl`
    this.seriesEl.innerHTML = seriesHtmlTemplate;

    // install event listeners
    this._installEventListeners();

    // install observers
    this._installObservers();

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[30m[handleDataChange]: #data => %o\x1b[0m`, data);
  }



  /* >> Private Setters << */

  /* >> Private Getters << */


}; // <- End of `DefaultSeriesView` class


// Attach a behavior to `DefaultSeriesView`...
// Object.assign(DefaultSeriesView.prototype, DefaultSeriesViewBehavior);


