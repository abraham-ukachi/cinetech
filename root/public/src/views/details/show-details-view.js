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
* @name: Show Details View
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> import { ShowDetailsView } from 'src/views/details/show-details-view.js';
*    -|> 
*    -|> // instantiate the `ShowDetailsView`
*    -|> let showDetailsView = new ShowDetailsView(root, 'show-details-view');
*    -|> 
*    -|> // Open the show details view
*    -|> showDetailsView.open();
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



// Create a `ShowDetailsView` class
export class ShowDetailsView extends View {

  /**
   * Styles
   *
   * @type { Object }
   */
  static get styles() {
    return ['series', 'details'];
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
  constructor(root, name = 'show-details-view') {
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
    this.data = {};


    // Initialize private properties
    
  }

  
  /**
   * Method used to render this show view 
   * @override from `View`
   */
  render() {
    return html`
      <!-- Show Details View Container -->
      <div id="showDetailsViewContainer" class="flex-layout vertical" fit>
        <!-- Show Details / Media Details -->
        <div class="show-details media-details">${this._getShowDetailsTemplate(this.data)}</div>

        <!-- Show Actions -->
        <div class="show-actions actions" hidden>
          <!-- Watch Trailer Button -->
          <button class="watch-trailer-btn btn" text>
            <span class="material-icons">play_arrow</span>
            <span>Watch Trailer</span>
          </button>
          <!-- Add to Favorites Button -->
          <button class="add-to-favorites-btn btn" contained>
            <span class="material-icons">star</span>
            <span>Add to Favorites</span>
          </button>

        </div>
        <!-- End of Show Actions -->

      </div>
      <!-- End of Show Details View Container -->
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
   * Handler that is called when the show view is ready
   */
  onReady() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[onReady]: ${this.name} is ready`); 
  }


  /**
   * Handler that is called when the show view is open 
   */
  onOpen() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[onOpen]: ${this.name} is open`); 
  }
  
  
  /**
   * Handler that is called when the show view is hidden 
   */
  onClose() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[onClose]: ${this.name} is closed`); 
  }
   

  /* >> Public Setters << */

  /* >> Public Getters << */

  /**
   * Returns the `<ul class="similar-shows-list">` element
   *
   * @returns { NodeList<Element> }
   * @public
   */
  get similarShowsListEl() {
    return this.shadowRoot.querySelector('ul.similar-shows-list');
  }


  /**
   * Returns all the `<li class="show">` elements in `similarShowsListEl`
   *
   * @returns { Array[HTMLLIElement] }
   * @public
   */
  get similarShowEls() {
    return this.similarShowsListEl.querySelectorAll('li.show');
  }


  /**
   * Returns all the `<img class="poster">` elements in `similarShowsEl`
   *
   * @returns { Array[HTMLImageElement] }
   * @public
   */
  get posterImageEls() {
    return this.similarShowsListEl.querySelectorAll('li.show img.poster');
  }

  
  /**
   * Returns the `<div class="show-details">` element
   *
   * @returns { HTMLDivElement }
   * @public
   */
  get showDetailsEl() {
    return this.shadowRoot.querySelector('div.show-details');
  }

  /* >> Private Methods << */

  /**
   * Installs all the event listeners for this view
   * @private
   */
  _installEventListeners() {
  // IDEA: loop through the show elements

    // for each similar show element...
    this.similarShowEls.forEach((similarShowEl) => {
      // ...add a `click` event listener
      similarShowEl.addEventListener('click', this._handleSimilarShowClick.bind(this));
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
    // IDEA: loop through the show elements

    // for each show element...
    this.showEls.forEach((showEl) => {
      // ...remove  any `click` event listener
      showEl.removeEventListener('click', this._handleShowClick.bind(this));
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
   * Handler that is called whenever a similar show is clicked
   *
   * @param { PointerEvent } event
   * @private
   */
  _handleSimilarShowClick(event) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[33m[_handleSimilarShowClick]: show clicked!!! event => %o\x1b[0m`, event.currentTarget);
  }



  /**
   * Returns the computed id of a show
   *
   * @param { Number } id - show id (e.g. `32533`)
   * @param { String } originalName - show original title (e.g. `Avengers: Endgame`)
   * @param { String } firstAirDate - show release date (e.g. `2023-04-25`)
   *
   * @returns { String } - computed id (e.g. `32533-avengers-endgame-2023`)
   * @private
   */
  _getComputedId(id, originalName, firstAirDate) {
    return `${id}-${originalName?.toLowerCase()?.replace(/[\s:,.]+/g, '-')?.replace(/['"]+/g, '')}-${this._getComputedYear(firstAirDate)}`;
  }


  /**
   * Returns the computed year of a show from its release date
   *
   * @param { String } firstAirDate - show release date (e.g. `2023-04-25`)
   *
   * @returns { String } - computed year (e.g. `2023`)
   * @private
   */
  _getComputedYear(firstAirDate) {
    return firstAirDate?.split('-')[0];
  }

  /**
   * Returns the computed rating status of a show
   *
   * @param { Number } ratingAverage - the show's rating average (e.g. `7.5`)
   *
   * @returns { String } - computed rating status (e.g. `good`)
   * @private
   */
  _getComputedRatingStatus(ratingAverage) {
    return ratingAverage >= 7 ? 'good' : (ratingAverage >= 5 ? 'ok' : 'bad');
  }


  /**
   * Handler that is called whenever the data changes
   *
   * @param { Object } data
   * @param { Object } oldData
   * @private
   */
  _handleDataChange(data, oldData) {
    // get the html template of the specified `data` as `showDetailsTemplate`
    const showDetailsTemplate = this._getShowDetailsTemplate(data);

    // set the `showDetailsTemplate` as the `innerHTML` of the `showDetailsEl`
    this.showDetailsEl.innerHTML = showDetailsTemplate;

    // install event listeners
    this._installEventListeners();

    // install observers
    this._installObservers();

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[30m[handleDataChange]: #data => %o\x1b[0m`, data);
  }



  /**
   * Returns the html template for a show details, using the given `data`
   *
   * @param { Object } data - show details data
   *
   * @returns { String } - html template
   * @private
   */
  _getShowDetailsTemplate(data = this.data) {
    return html`

    <!-- Title -->
    <h2 class="show-title title">Dune</h2>
    <!-- Meta -->
    <h4 class="show-meta meta">2h 35min &bull; Action, Adventure, Drama, Sci-Fi &bull; 2021</h4>

    <!-- Overview -->
    <p class="show-overview overview">
      <span>lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      <button class="show-more-btn" naked>Show More</button>
    </p>

    <!-- Top Cast List Wrapper -->
    <div class="top-cast-list-wrapper wrapper">
      <!-- Top Cast List Title -->
      <h3 class="top-cast-list-title title">Top Cast</h3>

      <!-- Top Cast List -->
      <ul class="top-cast-list list">
        <!-- Cast Item -->
        <li class="cast-item">
          <img class="cast-item-img" src="https://image.tmdb.org/t/p/w500/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg" alt="Timothée Chalamet">
          <!-- Cast Item Name -->
          <p class="cast-item-name">Timothée Chalamet</p>
          <!-- Cast Item Character -->
          <p class="cast-item-character">Paul Atreides</p>
        </li>

        <!-- TODO: Add more / real cast items here -->
      </ul>
      <!-- End of Top Cast | List -->

    </div>
    <!-- End of Top Cast | List Wrapper -->


    <!-- Similar Shows List Wrapper -->
    <div class="similar-shows-list-wrapper wrapper">
      <!-- Similar Shows List Title -->
      <h3 class="similar-shows-list-title title">Similar Shows</h3>

      <!-- Similar Shows List -->
      <ul class="similar-shows-list list">
        <!-- Similar Show Item -->
        <li class="similar-show-item show"></li>
      </ul>
      <!-- End of Similar Shows | List -->

    </div>
    <!-- End of Similar Shows | List Wrapper -->


    <!-- Comments List Wrapper -->
    <div class="comments-list-wrapper wrapper">
      <!-- Comments List Title -->
      <h3 class="comments-list-title title">
        <span>Comments</span>
        <span class="comments-count">0</span>
      </h3>

      <!-- Comments List -->
      <ul class="comments-list list flex-layout vertical">
        <!-- Comment Item -->
        <li class="comment-item comment flex-layout horizontal">
          <!-- Comment Item Avatar -->
          <img class="comment-item-avatar" src="https://image.tmdb.org/t/p/w500/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg" alt="Timothée Chalamet">
          <!-- Comment Item Content -->
          <div class="comment-item-content flex-layout vertical">
            <!-- Comment Item Author -->
            <p class="comment-item-author">
              <span>Timothée Chalamet</span>
              <span class="comment-item-date">2 days ago</span>
            </p>

            <!-- Comment Item Text -->
            <p class="comment-item-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
          </div>
          <!-- End of Comment Item Content -->

          <!-- Reply Buttons Wrapper -->
          <div class="reply-buttons-wrapper flex-layout horizontal">
            <!-- Reply Button -->
            <button class="reply-btn btn" text>
              <span class="material-icons">reply</span>
              <span>Reply</span>
            </button>

            <!-- Replies Button -->
            <button class="replies-btn btn" text>
              <span class="material-icons">expand_more</span>
              <span>3 Replies</span>
            </button>
          </div>
          <!-- End of Reply Buttons Wrapper -->
          
          ${this._getRepliesListTemplate(data.replies)}


        </li>
        <!-- End of Comment Item -->

      </ul>
      <!-- End of Comments List -->

    </div>
    <!-- End of Comments List Wrapper -->

    `;
  }


  /**
   * Returns the html template for replies
   *
   * @param { Array[Object] } replies - list of replies
   *
   * @returns { String } - html template
   * @private
   */
  _getRepliesListTemplate(replies = this.data.replies) {
    return html`
     <!-- Replies List -->
     <ul class="replies-list list flex-layout vertical">
       <!-- Reply Item -->
       <li class="reply-item reply flex-layout horizontal">
         <!-- Reply Item Avatar -->
         <img class="reply-item-avatar" src="https://image.tmdb.org/t/p/w500/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg" alt="Timothée Chalamet">
         <!-- Reply Item Content -->
         <div class="reply-item-content flex-layout vertical">
           <!-- Reply Item Author -->
           <p class="reply-item-author">
             <span>Timothée Chalamet</span>
             <span class="reply-item-date">2 days ago</span>
           </p>

           <!-- Reply Item Text -->
           <p class="reply-item-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
         </div>
         <!-- End of Reply Item Content -->

         <!-- Reply Buttons Wrapper -->
         <div class="reply-buttons-wrapper flex-layout horizontal">
           <!-- Reply Button -->
           <button class="reply-btn btn" text>
             <span class="material-icons">reply</span>
             <span>Reply</span>
           </button>
         </div>
         <!-- End of Reply Buttons Wrapper -->

       </li>
       <!-- End of Reply Item -->

     </ul>
     <!-- End of Replies List -->
    `;
  }

  /* >> Private Setters << */

  /* >> Private Getters << */


}; // <- End of `ShowDetailsView` class


// Attach a behavior to `ShowDetailsView`...
// Object.assign(ShowDetailsView.prototype, ShowDetailsViewBehavior);


