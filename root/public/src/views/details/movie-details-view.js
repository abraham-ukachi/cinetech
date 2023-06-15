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
* @name: Movie Details View
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> import { MovieDetailsView } from 'src/views/details/movie-details-view.js';
*    -|> 
*    -|> // instantiate the `MovieDetailsView`
*    -|> let movieDetailsView = new MovieDetailsView(root, 'movie-details-view');
*    -|> 
*    -|> // Open the movie details view
*    -|> movieDetailsView.open();
*    -|> 
*    -|> }
*
*/

import { html } from '../../Engine.js';
import { View } from '../../View.js';
import { TMDB_IMAGE_BASE_URL, TMDB_FILE_DEFAULT_SIZE } from '../../helpers/request.js';

import { getTimeAgo } from '../../helpers/timeperiodwatcher.js';

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// Defining some constant variables...



// Create a `MovieDetailsView` class
export class MovieDetailsView extends View {

  /**
   * Styles
   *
   * @type { Object }
   */
  static get styles() {
    return ['movies', 'details'];
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
      comments: { type: Array },

      commentsPage: { type: Number },
      commentsTotalPages: { type: Number },
      totalComments: { type: Number },
      

      maxCast: { type: Number },
      maxSimilarMovies: { type: Number },
      maxComments: { type: Number },
      maxImages: { type: Number },
      
      commentAvatarsHidden: { type: Boolean },
      maxComments: { type: Number }
      
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
  constructor(root, name = 'movie-details-view') {
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
    this.comments = [];

    this.commentsPage = 1;
    this.commentsTotalPages = 1;
    this.totalComments = 0;
     

    // the maximum number of cast, crew, similar movies, comments and images to display
    this.maxCast = 10;
    this.maxSimilarMovies = 10;
    this.maxComments = 10;
    this.maxImages = 5;
    this.commentAvatarsHidden = false;
    this.maxComments = 10;
    
    
    // Initialize private properties
    
  }

  
  /**
   * Method used to render this movie view 
   * @override from `View`
   */
  render() {
    return html`
      <!-- Movie Details View Container -->
      <div id="movieDetailsViewContainer" class="flex-layout vertical" fit>
        <!-- Movie Details / Media Details -->
        <div class="movie-details media-details">${this._getMovieDetailsTemplate(this.data)}</div>

        <!-- Movie Actions -->
        <div class="movie-actions actions" hidden>
          <!-- Watch Trailer Button -->
          <button class="watch-trailer-btn btn" text>
            <span class="material-icons">play_arrow</span>
            <span>${muvishoApp.i18n.getString('watchTrailer')}</span>
          </button>
          <!-- Add to Favorites Button -->
          <button class="add-to-favorites-btn btn" contained>
            <span class="material-icons">star</span>
            <span>${muvishoApp.i18n.getString('addToFavorites')}</span>
          </button>

        </div>
        <!-- End of Movie Actions -->

      </div>
      <!-- End of Movie Details View Container -->
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
   * Handler that is called when the movie view is ready
   */
  onReady() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[onReady]: ${this.name} is ready`); 
  }


  /**
   * Handler that is called when the movie view is open 
   */
  onOpen() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[onOpen]: ${this.name} is open`); 
  }
  
  
  /**
   * Handler that is called when the movie view is hidden 
   */
  onClose() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[onClose]: ${this.name} is closed`); 
  }


  /**
   * Shows the comment spinner
   */
  showCommentSpinner() {
    this.commentSpinnerEl.hidden = false;
  }
  
  /**
   * Hides the comment spinner
   */
  hideCommentSpinner() {
    this.commentSpinnerEl.hidden = true;
  }


  /**
   * Adds more comments to the comments list element (i.e. `commentsListEl`).
   * NOTE: This method also updates the `comments` array property
   *
   * @param { Array[Object] } comments
   * @public
   */
  addComments(comments) {
    // get the comments html template with the given `comments`
    let commentsHtmlTemplate = this._getCommentsTemplate(comments);
    // insert this `commentsHtmlTemplate` into the `commentsListEl`
    this.commentsListEl.insertAdjacentHTML('beforeend', commentsHtmlTemplate);

    // re-install all comment event listeners
    this._reinstallCommentEventListeners();

    // update the `comments` array property
    this.comments = [...this.comments, ...comments];

  }

  /* >> Public Setters << */

  /* >> Public Getters << */

  /**
   * Returns the `<ul id="similarMovies" class="similar-movies-list">` element
   *
   * @returns { NodeList<Element> }
   * @public
   */
  get similarMoviesListEl() {
    return this.shadowRoot.querySelector('#similarMovies');
  }


  /**
   * Returns all the `<li class="movie">` elements in `similarMoviesListEl`
   *
   * @returns { Array[HTMLLIElement] }
   * @public
   */
  get similarMovieEls() {
    return this.similarMoviesListEl.querySelectorAll('li.movie');
  }



  /**
   * Returns all the `<img class="poster">` elements in `similarMoviesEl`
   *
   * @returns { Array[HTMLImageElement] }
   * @public
   */
  get posterImageEls() {
    return this.similarMoviesListEl.querySelectorAll('li.movie img.poster');
  }


  /**
   * Returns the `<div class="movie-details">` element
   *
   * @returns { HTMLDivElement }
   * @public
   */
  get movieDetailsEl() {
    return this.shadowRoot.querySelector('div.movie-details');
  }


  /**
   * Returns the `<ul id="commentsList">` element
   *
   * @return { HTMLULElement }
   */
  get commentsListEl() {
    return this.shadowRoot.querySelector('#commentsList');
  }


  /**
   * Returns all the `<li class="comment">` elements in `commentListEl`
   *
   * @returns { Array[HTMLLIElement] }
   * @public
   */
  get commentEls() {
    return this.commentsListEl.querySelectorAll('li.comment');
  }
  

  /**
   * Returns the `<span id="commentSpinner" class="spinner">` element
   *
   * @returns { HTMLSpanElement }
   * @public
   */
  get commentSpinnerEl() {
    return this.shadowRoot.getElementById('commentSpinner');
  }


  /**
   * Returns TRUE if the comments list has more comments to show
   *
   * @returns { Boolean }
   * @public
   */
  get hasMoreComments() {
    return this.totalComments > this.commentsListEl.children.length;
  }


  /* >> Private Methods << */

  /**
   * Installs all the event listeners for this view
   * @private
   */
  _installEventListeners() {
    // IDEA: loop through the movie elements

    // for each similar movie element...
    this.similarMovieEls.forEach((similarMovieEl) => {
      // ...add a `click` event listener 
      similarMovieEl.addEventListener('click', this._handleSimilarMovieClick.bind(this));
    });
  }

  /**
   * Method used to install event listeners on all comments
   */
  _installCommentEventListeners() {
    // loop through all the comment elements
    this.commentEls.forEach((commentEl) => {
      // add a `click` event listener to each comment element
      commentEl.addEventListener('click', this._handleCommentClick.bind(this));

    });

  }


  /**
   * Method used to remove event listeners from all comments
   */
  _removeCommentEventListeners() {
    // loop through all the comment elements
    this.commentEls.forEach((commentEl) => {
      // remove the `click` event listener from each comment element
      commentEl.removeEventListener('click', this._handleCommentClick.bind(this));

    });
  }

  
  /**
   * Re-installs all the event listeners of all the comments
   * @private
   */
  _reinstallCommentEventListeners() {
    // remove all event listeners
    this._removeCommentEventListeners();
    // install all event listeners
    this._installCommentEventListeners();
  }

  /**
   * Handler that is called whenever the comment is clicked
   *
   * @param { PointerEvent } event
   */
  _handleCommentClick(event) {
    // get the current target as commentEl
    let commentEl = event.currentTarget;

    // get the comment id from the target's dataset
    let commentId = commentEl.dataset.id;
    // get the author's id form the target's dataset
    let authorId = commentEl.dataset.authorId;
    // get the author's username  form the target's dataset
    let authorUsername = commentEl.dataset.authorUsername;
    
    
     
    // Check if the target element is a reply button
    let isReplyButton = event.target.classList.contains('reply-btn');
    
    // Check if the target element is a replies button
    let isRepliesButton = event.target.classList.contains('replies-btn');

    
    // If the reply button was clicked...
    if (isReplyButton) {
      // ...trigger the 'reply' event
      this.trigger('reply', {commentId, authorId, authorUsername});

      // ...get the reply id, author id and author username from the target
      // let replyId = event.target.dataset.id;
      // let replyAuthorId = event.target.dataset.authorId;
      // let replyAuthorUsername = event.target.dataset.authorUsername;
    }
     
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[33m[_handleCommentClick] (1): commentId => ${commentId} & authorId => ${authorId} & event => \x1b[0m`, event);
    console.log(`\x1b[33m[_handleCommentClick] (2): commentEl => \x1b[0m`, commentEl);
    console.log(`\x1b[33m[_handleCommentClick] (3): targetEl => \x1b[0m`, event.target);
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
    // IDEA: loop through the movie elements

    // for each movie element...
    this.movieEls.forEach((movieEl) => {
      // ...remove  any `click` event listener
      movieEl.removeEventListener('click', this._handleMovieClick.bind(this));
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
   * Handler that is called whenever a similar movie is clicked
   *
   * @param { PointerEvent } event
   * @private
   */
  _handleSimilarMovieClick(event) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[33m[_handleSimilarMovieClick]: movie clicked!!! event => %o\x1b[0m`, event.currentTarget);
  }



  /**
   * Returns the computed id of a movie
   *
   * @param { Number } id - movie id (e.g. `32533`)
   * @param { String } originalTitle - movie original title (e.g. `Avengers: Endgame`)
   * @param { String } releaseDate - movie release date (e.g. `2023-04-25`)
   *
   * @returns { String } - computed id (e.g. `32533-avengers-endgame-2023`)
   * @private
   */
  _getComputedId(id, originalTitle, releaseDate) {
    return `${id}-${originalTitle?.toLowerCase()?.replace(/[\s:,.]+/g, '-')?.replace(/['"]+/g, '')}-${this._getComputedYear(releaseDate)}`;
  }


  /**
   * Returns the computed year of a movie from its release date
   *
   * @param { String } releaseDate - movie release date (e.g. `2023-04-25`)
   *
   * @returns { String } - computed year (e.g. `2023`)
   * @private
   */
  _getComputedYear(releaseDate) {
    return releaseDate?.split('-')[0];
  }

  /**
   * Returns the computed rating status of a movie
   *
   * @param { Number } ratingAverage - the movie's rating average (e.g. `7.5`)
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
    // get the html template of the specified `data` as `movieDetailsTemplate`
    const movieDetailsTemplate = this._getMovieDetailsTemplate(data);
    
    // set the `movieDetailsTemplate` as the `innerHTML` of the `movieDetailsEl`
    this.movieDetailsEl.innerHTML = movieDetailsTemplate;

    // install event listeners
    this._installEventListeners();

    // install observers
    this._installObservers();


    // update the `totalComments` property
    this.totalComments = data?.total_comments;

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[30m[handleDataChange]: data => \x1b[0m`, data);
  }


  /**
   * Method used to return the computed given `genres`
   *
   * @returns { String } 
   */
  _getComputedGenres(genres) {
    return genres ? genres.map((genre) => genre.name).join(', ') : '';
  }

  /**
   * Method used to return the computed given `duration`
   *
   * @returns { String }
   */
  _getComputedDuration(duration) {
    return duration ? `${Math.floor(duration / 60)}h ${duration % 60}m` : '';
  }


  /**
   * Returns the html template for a movie details, using the given `data`
   *
   * @param { Object } data - movie details data
   *
   * @returns { String } - html template
   * @private
   */
  _getMovieDetailsTemplate(data = this.data, maxCast = this.maxCast) {
    // do nothing if `data` is not defined
    //if (!Object.keys(data).length) { return html`` }

    return html`

    <!-- Title -->
    <h2 class="movie-title title font zilla-slab bold">${data.title}</h2>
    <!-- Meta -->
    <h4 class="movie-meta meta">${this._getComputedDuration(data.runtime)} &bull; ${this._getComputedGenres(data.genres)} &bull; ${this._getComputedYear(data.release_date)}</h4>

    <!-- Overview -->
    <p class="movie-overview overview">
      <span>${data.overview}</span>
      <button class="show-more-btn" naked hidden>Show More</button>
    </p>

    <!-- Top Cast List Wrapper -->
    <div class="top-cast-list-wrapper wrapper">
      <!-- Top Cast List Title -->
      <h3 class="top-cast-list-title title">Top Cast</h3>

      <!-- Top Cast List -->
      <ul class="top-cast-list list horizontal flex-layout" naked>

        ${data.credits?.cast && data.credits.cast.slice(0, maxCast).map((cast) => html`

          <!-- Cast Item -->
          <li class="cast-item flex-layout vertical centered" data-id="${cast.id}">
            <img class="cast-item-img" src="${TMDB_IMAGE_BASE_URL}/${TMDB_FILE_DEFAULT_SIZE}${cast.profile_path}" alt="${cast.name}">
            <!-- Cast Item Name -->
            <span class="cast-item-name">${cast.name}</span>
            <!-- Cast Item Character -->
            <span class="cast-item-character">${cast.character}</span>
          </li>
          <!-- End of Cast Item -->
        `)}

        <!-- TODO: Add more / real cast items here -->
      </ul>
      <!-- End of Top Cast | List -->

    </div>
    <!-- End of Top Cast | List Wrapper -->


    <!-- Similar Movies List Wrapper -->
    <div class="similar-movies-list-wrapper wrapper">
      <!-- Similar Movies List Title -->
      <h3 class="similar-movies-list-title title">${muvishoApp.i18n.getString('similarMovies')}</h3>
      
      ${this._getSimilarMoviesTemplate(data.similar?.results)}

    </div>
    <!-- End of Similar Movies | List Wrapper -->


    <!-- Comments List Wrapper -->
    <div class="comments-list-wrapper wrapper">
      <!-- Comments List Title -->
      <h3 class="comments-list-title title">
        <span class="comments-count" ${!data.total_comments ? 'hidden' : ''}>${data.total_comments}</span>
        <span>${muvishoApp.i18n.getString('comments')}</span>
      </h3>
      
      <p class="placeholder" ${data.total_comments ? 'hidden' : ''}>
        ${muvishoApp.i18n.getString('noMovieCommentLeaveOne')}
      </p>
      
      <!-- Comments List -->
      <ul id="commentsList" class="comments-list list flex-layout vertical" naked ${!data.total_comments ? 'hidden' : ''}>
        ${this.comments.length ? this._getCommentsTemplate(this.comments) : ''}
      </ul>
      <!-- End of Comments List -->

    </div>
    <!-- End of Comments List Wrapper -->
    
    <!-- Comment Spinner -->
    <span id="commentSpinner" class="spinner dots-3" hidden></span>
    `;
  }


  /**
   * Returns the html template for replies
   *
   * @param { Array[Object] } replies - list of replies
   * @param { Number } maxReplies - maximum number of replies to show
   *
   * @returns { String } - html template
   *
   * @private
   */
  _getRepliesListTemplate(replies, maxReplies = this.maxReplies) {
    return html`
      ${replies?.length && replies.slice(0, maxReplies).map((reply) => html`
         <!-- Reply Item -->
         <li class="reply-item reply flex-layout horizontal" data-id="${reply.id}" data-author-id="${reply.user_id}" data-author-username="${reply.username}">
           <!-- Reply Item Avatar -->
           <img class="reply-item-avatar" src="${reply.profile_path}" alt="${reply.name}">
           <!-- Reply Item Content -->
           <div class="reply-item-content flex-layout vertical">
             <!-- Reply Item Author -->
             <p class="reply-item-author">
               <span class="author-username">${reply.username}</span>
               <span class="reply-item-date">${getTimeAgo(reply.created_at)}</span>
               <span class="modified-status" ${!reply.modified ? 'hidden' : ''}>(${muvishoApp.i18n.getString('modified')})</span>
             </p>

             <!-- Reply Item Text -->
             <p class="reply-item-text">
               <span class="reply-to" data-user-id="${reply.reply_to?.user_id}"
                ${!reply.reply_to ? 'hidden' : ''}>&nbsp;@${reply.reply_to?.username}&nbsp;</span>
               <span class="reply-body">${reply.body}</span>
             </p>

      
             <!-- Reply Buttons Wrapper -->
             <div class="reply-buttons-wrapper flex-layout horizontal">
               <!-- Reply Button -->
               <button class="reply-btn btn horizontal flex-layout center" naked outlined>
                 <span class="material-icons icon">reply</span>
                 <span>${muvishoApp.i18n.getString('reply')}</span>
               </button>
             </div>
             <!-- End of Reply Buttons Wrapper -->

           </div>
           <!-- End of Reply Item Content -->


         </li>
         <!-- End of Reply Item -->
      `)}

    `;
  }

  /**
   * Returns the html template for comments
   * 
   * @param { Array[Object] } comments - list of comments
   * 
   * @returns { String } - html template
   * @private
   */
  _getCommentsTemplate(comments = this.comments) {
    return html`
      ${comments?.map((comment) => html`
        <!-- Comment Item -->
        <li class="comment-item comment flex-layout horizontal" data-id="${comment.id}" data-author-id="${comment.user_id}" data-author-username="${comment.username}">
          <!-- Avatar Wrapper -->
          <div class="avatar-wrapper flex-layout vertical" ${this.commentAvatarsHidden ? 'hidden' : ''}>
            <!-- Avatar -->
            <img class="avatar" data-src="../assets/images/profile/${comment.profile_path}" alt="${comment.name}" ${!comment.profile_path.length ? 'hidden' : ''}>
             
            <!-- Avatar Placeholder -->
            <div class="avatar-placeholder flex-layout vertical centered" ${comment.profile_path.length ? 'hidden' : ''}>
              <span class="material-icons icon">person</span>
            </div>
            
          </div>
          <!-- End of Avatar Wrapper -->
           
          <!-- Initials Wrapper -->
          <span class="initials-wrapper" ${!this.commentAvatarsHidden ? 'hidden' : ''}>
            <span class="initials">${comment.initials}</span>
          </span>
          <!-- End of Initials Wrapper -->
          
          
          <!-- Comment Item Content -->
          <div class="comment-item-content flex-layout vertical">
            <!-- Comment Item Author -->
            <p class="comment-item-author flex-layout center">
              <span class="author-username">${comment.username}</span>
              <span class="comment-item-date">${getTimeAgo(comment.created_at)}</span>
              <span class="modified-status" ${!comment.modified ? 'hidden' : ''}>(${muvishoApp.i18n.getString('modified')})</span>
              <span class="flex"></span>

              <button class="icon-button more" naked>
                <span class="material-icons icon">more_vert</span>
              </button>
            </p>
             
            <!-- Comment Item Text -->
            <p class="comment-item-text">${comment.body}</p>


            <!-- Reply Buttons Wrapper -->
            <div class="reply-buttons-wrapper flex-layout horizontal">
              <!-- Reply Button -->
              <button class="reply-btn btn flex-layout horizontal center" naked outlined>
                <span class="material-icons icon">reply</span>
                <span>${muvishoApp.i18n.getString('reply')}</span>
              </button>

              <!-- Replies Button -->
              <button class="replies-btn btn flex-layout horizontal center" naked outlined ${!comment.total_replies ? 'hidden': ''}>
                <span class="material-icons">expand_more</span>
                <span>${this._computeTotalReplies(comment.total_replies)}</span>
              </button>
              
            </div>
            <!-- End of Reply Buttons Wrapper -->
             
            <!-- Replies List -->
            <ul class="replies-list list flex-layout vertical" naked></ul>
            
          </div>
          <!-- End of Comment Item Content -->

          
        </li>
        <!-- End of Comment Item -->

        `)}

    `;
  }
  

  /**
   * Returns the html template for similar movies
   *
   * @param { Array[Object] } similarMovies - list of similar movies
   *
   * @returns { String } - html template
   * @private
   */
  _getSimilarMoviesTemplate(similarMovies = this.data.similar?.results) {
    return html`
      <!-- Similar Movies List -->
      <ul id="similarMovies" class="similar-movies-list media-list" naked>
        
        ${similarMovies?.length && similarMovies.slice(0, this.maxSimilarMovies).map((movie) => html`
          <!-- Similar Movie Item -->
          <li class="similar-movie-item movie flex-layout vertical fade-in" data-id="${movie.id}">
           <!-- Poster Container -->
           <a href="./details/movie?vid=${this._getComputedId(movie.id, movie.original_title, movie.release_date)}" 
              class="poster-container"
              title="${movie.title} - ${movie.overview}">
             <!-- Poster -->
             <img data-src="${TMDB_IMAGE_BASE_URL}/${TMDB_FILE_DEFAULT_SIZE}${movie.poster_path}" alt="${movie.title}" class="poster vertical flex-layout centered fade-in" fit/>
             
             <!-- Meta -->
             <div class="meta flex-layout vertical center" fit>
               <!-- Rating -->
               <span class="rating is-${this._getComputedRatingStatus(movie.vote_average)}">${movie.vote_average?.toFixed(1)}</span>
               <!-- Year -->
               <span class="year">${this._getComputedYear(movie.release_date)}</span>
             </div>
           
           </a>
           <!-- End of Poster Container -->
           
           <!-- Movie Details -->
           <div class="movie-details flex-layout horizontal center flex">
             <!-- Movie Title -->
             <h3 class="movie-title">${movie.title}</h3>
             
             <!-- More - Icon Button -->
             <button class="more-button icon-button fade-in" title="More">
               <span class="material-icons icon">more_horiz</span>
             </button>
             
           </div>
           <!-- End of Movie Details -->
          </li>
          <!-- End of Similar Movie Item -->
        `)}

      </ul>
      <!-- End of Similar Movies | List -->
    `;
  }


  /* >> Private Setters << */

  /* >> Private Getters << */

  /**
   * Returns the computed total replies
   *
   * @param { Number } totalReplies - total replies
   * @returns { String } - computed total replies (eg. '1 reply', '2 replies', '3 replies', etc.)
   *
   * @private
   */
  _computeTotalReplies(totalReplies = 0) {
    // initialize the `result` variables
    let result = '';

    // check if the `totalReplies` is one
    if (totalReplies === 1) {
      // ...if so, set the `result` to '1 reply'
      result = `1 ${muvishoApp.i18n.getString('reply')}`;
    } else if (totalReplies > 1) {
      result = `${totalReplies} ${muvishoApp.i18n.getString('replies')}`;
    }
     
    // return the `result`
    return result;
     
  }


}; // <- End of `MovieDetailsView` class


// Attach a behavior to `MovieDetailsView`...
// Object.assign(MovieDetailsView.prototype, MovieDetailsViewBehavior);


