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
* @name: Details Page
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> import { DetailsPage } from 'src/pages/details-page.js';
*    -|> 
*    -|> // get the root of all 'pages' from `muvishoApp`
*    -|> const root = muvishoApp.getRootOf(APP_PAGES);
*    -|> const controller = DetailsPage;
*    -|> 
*    -|> // instantiate the `DetailsPage`
*    -|> let type = 'main'; // or aside
*    -|> let detailsPage = new DetailsPage(type, 'details-page');
*    -|> 
*    -|> // Open the details page
*    -|> detailsPage.open();
*    -|> 
*    -|> }
*
*/

import { html } from '../Engine.js';
import { Page } from '../Page.js';
import { TMDB_IMAGE_BASE_URL, TMDB_FILE_BACKDROP_SIZE, TMDB_FILE_DEFAULT_SIZE } from '../helpers/request.js';

import { MAIN_PART, ASIDE_PART } from '../App.js';

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// Defining some constant variables...



// Create a `DetailsPage` class
export class DetailsPage extends Page {

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
      loading: { type: Boolean },
      mediaId: { type: Number },
      params: { type: Object },
      data: { type: Object },
      commentsLoading: { type: Boolean },
      backdropImage: { type: String },
      posterImage: { type: String },
      title: { type: String },
      voteAverage: { type: Number },
      voteCount: { type: Number },
      commentBarHidden: { type: Boolean },
      user: { type: Object },

      _commentMenuId: { type: String },
      _commentMenuDuration: { type: Number }
    };
  }

  /**
   * Styles
   *
   * @type { Array }
   */
  static get styles() {
    return ['details'];
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
    return [
      { name: 'details', views: ['default', 'movie', 'show'] }
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
  constructor(type = 'aside', name = 'details-page') {
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

    this.busy = true;
    this.loading = false;
    this.mediaId = 0;
    this.params = new URLSearchParams();
    this.data = {};
    this.commentsLoading = false;

    this.backdropImage = '';
    this.posterImage = '';
    this.title = '';
    this.voteAverage = 0;
    this.voteCount = 0;
    this.commentBarHidden = true;
    this.user = {};
    
    // Initialize private properties

    this._commentMenuId = 'commentMenu';
    this._commentMenuDuration = 0.5;

  }


  /**
   * Method used to render this details page 
   * @override from `Page`
   */
  render() {
    return html`
      <!-- Details Page Container -->
      <div id="detailsPageContainer" class="app-layout" fit>
        <!-- Header -->
        <header id="header" class="app-header" with-overlay smooth>

          <!-- Backdrop Image -->
          <img id="backdropImage" class="backdrop-image" src="${this._computeBackdropImage(this.backdropImage)}" alt="Backdrop Image" fit />
          <!-- Top App Bar -->
          <div class="app-bar">

            <!-- Close - Icon Button -->
            <a href="${this._computeCloseUrl(this.view)}" id="closeIconButton" class="icon-button" tabindex="0" role="icon-button"  narrow-and-tablet-only>
              <span class="material-icons icon">close</span>
            </a>
          </div>

          <span flex></span>
           
          <!-- Bottom App Bar -->
          <div class="app-bar bottom">

            <!-- Title Wrapper -->
            <div class="title-wrapper">
              <!-- Title -->
              <h2 class="app-title horizontal flex-layout center">
                <span class="tmdb-logo short"></span>
                <span id="voteAverage" class="vote-average">${this.voteAverage}</span>
                <span class="vote-separator">/&nbsp;</span>
                <span id="voteCount" class="vote-count">${this.voteCount}</span>
              </h2>
              <!-- Subtitle -->
              <h3 class="app-subtitle" hidden>Hello from <span>${this.name}</span></h3>
            </div>
            <!-- End of Title Wrapper -->

            <!-- Star - Icon Button -->
            <button id="starIconBtn" class="icon-button">
              <span class="material-icons icon">star_border</span>
            </button>

            <!-- Comment - Icon Button -->
            <button id="commentIconBtn" class="icon-button">
              <span class="material-icons icon">comment</span>
            </button>

            <!-- Share - Icon Button -->
            <button id="shareIconBtn" class="icon-button">
              <span class="material-icons icon">share</span>
            </button>

            <!-- Menu - Icon Button -->
            <button id="menuIconBtn" class="icon-button">
              <span class="material-icons icon">more_vert</span>
            </button>

            <span class="divider horizontal bottom" hidden></span>
          </div>
          <!-- End of App Bar -->

        </header>
        <!-- End of Header -->

        <!-- Content -->
        <div content class="fade-in">
          <!-- Views - Container -->
          <div id="views" class="container vertical flex-layout centered"></div>
          <!-- End of Views - Container -->


        </div>
        <!-- End of Content -->

      </div>
      <!-- End of Details Page Container -->

      <!-- Footer -->
      <footer>
        <!-- Comment Bar -->
        <div id="commentBar" class="bar flex-layout horizontal slide-from-down" hidden>

          <button class="icon-button close-btn">
            <span class="material-icons icon">close</span>
          </button>

          <!-- Avatar Wrapper -->
          <div class="avatar-wrapper flex-layout vertical">
            <!-- Avatar -->
            <img class="avatar" data-src="../assets/images/profile/${this.user.profilePath}" alt="${this.user.fullname}" ${!this.user.profilePath?.length ? 'hidden' : ''} />
             
            <!-- Avatar Placeholder -->
            <div class="avatar-placeholder flex-layout vertical centered" ${this.user.profilePath?.length ? 'hidden' : ''}>
              <span class="material-icons icon">person</span>
            </div>
            
          </div>

          <!-- Initials Wrapper -->
          <span class="initials-wrapper" hidden>
            <span class="initials">${this.user.initials}</span>
          </span>
          
          <!-- Input Wrapper -->
          <div class="input-wrapper flex-layout vertical flex">
            <!-- Label -->
            <label for="commentInput" raised hidden>${muvishoApp.i18n.getString('replyingToX').replace(/%s/, '<span>' + 'jamie_lanister382' + '</span>')}</label>
            
            <!-- Comment Input | Text Area -->
            <textarea id="commentInput" rows="1" required name="comment" class="" 
              placeholder="${muvishoApp.i18n.getString('addACommentPlaceholder')}"></textarea>
            
            <!-- Inidicator -->
            <span class="input-indicator"><span bar></span><span val></span></span>
            
            <p class="input-message fade-in error" hidden>Incorrect password</p>
          </div>
          <!-- End of Input Wrapper -->
           
          <!-- Comment - Button -->
          <button id="commentButton" contained class="icon-button flex-layout centered">
            <span class="material-icons icon">send</span>
          </button>

        </div>


        <!-- Action Buttons -->
        <div id="actionButtons" class="flex-layout horizontal slide-from-down">
          <!-- Comment - Action Button -->
          <button id="commentBtn" class="action-button horizontal flex-layout centered" outlined>
            <span class="material-icons icon">comment</span>
            <span class="label txt upper">${muvishoApp.i18n.getString('comment')}</span>
          </button>
           
          <!-- Watch Trailer - Action Button -->
          <button id="watchTrailerBtn" class="action-button horizontal flex-layout centered" contained>
            <span class="material-icons icon">play_arrow</span>
            <span class="label txt upper">${muvishoApp.i18n.getString('watchTrailer')}</span>
          </button>
        </div>

      </footer>


      <!-- Busy Container -->
      <div id="busyContainer" class="container vertical flex-layout centered" busy fit>
        <span class="spinner dots-12"></span>
        <h3 class="title" hidden>${muvishoApp.i18n.getString('loading')}...</h3>
      </div>
    `;
  }


  /**
   * First time this page gets updated 
   * @override from `Page`
   */
  firstUpdated() {

    // Install some event listeners
    this._installEventListeners();

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

    // do nothing if the page is not opened
    if (!this.opened) return;


    changedProperties.forEach((prop) => {

      if (prop.name === 'busy') {
        this._handleBusyChange(prop.value);
      }

      if (prop.name === 'loading') {
        this._handleLoadingChange(prop.value);
      }

      if (prop.name === 'params') {
        this._handleParamsChange(prop.value);
      }

      if (prop.name === 'mediaId') {
        this._handleMediaIdChange(prop.value);
      }

      if (prop.name === 'data') {
        this._handleDataChange(prop.value);
      }

      if (prop.name === 'backdropImage' || prop.name === 'posterImage') {
        this._handleImageChange(prop.name, prop.value);
      }

      if (prop.name === 'title') {
        this._handleTitleChange(prop.value);
      }

      if (prop.name === 'voteAverage') {
        this._handleVoteAverageChange(prop.value);
      }

      if (prop.name === 'voteCount') {
        this._handleVoteCountChange(prop.value);
      }
      
      if (prop.name === 'commentBarHidden') {
        this._handleCommentBarHiddenChange(prop.value);
      }
    });
    

  }

  

  /* >> Public Methods << */


  /**
   * Handler that is called when the details page is ready
   */
  onReady() {
    // HACK: Call the `onViewReady()` method, to force the initial data load
    this.onViewReady(this.view, this.currentView.getRealName(), this.currentView);
    
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
    // update `href` of the close icon button
    this.closeIconButtonEl.href = this._computeCloseUrl(view);

    // install view event listeners
    this.#installViewEventListeners();

    // request the movie or show details as 
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[onViewReady] (1): view => ${view} & viewId => ${this.viewId} viewObject => \x1b[0m`, viewObject);
    console.info(`\x1b[36m[onViewReady] (2): viewsEl => \x1b[0m`, this.viewsEl);
    console.info(`\x1b[36m[onViewReady] (3): viewEls => \x1b[0m`, this.viewEls);
  }


  /**
   * Handler that is called when the details page is open 
   */
  onOpen() {
    // get the number of current media id as a `currentMediaId`
    const currentMediaId = this.getCurrentMediaId(true); // <- returns eg. `123456` 

    // If there's a `currentMediaId` and it's different from the current one (i.e. `this.media`)...
    if (currentMediaId && currentMediaId !== this.media) {
      // ...load the movie or show's data 
      this._loadData(this.mediaId);
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[onOpen]: ${this.name} is open`); 
  }
  

  /**
   * Handler that is called when the details page is hidden 
   */
  onClose() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[onClose]: ${this.name} is closed`); 
  }


  /**
   * Handler that is called whenever the bottom of the app layout is reached
   */
  onBottomReached() {
    // If the current view (movie or show) has more comments to load,
    // and there're no comments loadint at the moment...
    if (this.currentView.hasMoreComments && !this.commentsLoading) {
      // ...show the comment spinner of this view
      this.currentView.showCommentSpinner();

      // set `commentsLoading` to TRUE
      this.commentsLoading = true;

      // If this is a movie..
      if (this.isMovie) {
        // ...load or fetch the comments of this movie
        muvishoApp.request.getFakeComments().then((comments) => {
          // set the `commentsLoading` property to FALSE
          this.commentsLoading = false;
          
          // hide the comment spinner of this view
          this.currentView.hideCommentSpinner();
          
          // add the comments to this view
          this.currentView.addComments(comments.results);

          // update the `commentsPage` and `commentsTotalPages` properties of the `currentView`
          this.currentView.commentsPage = comments.page;
          this.currentView.commentsTotalPages = comments.total_pages;
          
        });
      }else { // <- this is a tv show
        // ...load or fetch the comments of this tv show
        // TODO: Use the `getCommentsByShowId()` instead when out of the development phase
        muvishoApp.request.getFakeComments().then((comments) => {
          // set the `commentsLoading` property to FALSE
          this.commentsLoading = false;
          
          // hide the comment spinner of this view
          this.currentView.hideCommentSpinner();
          
          // add the comments to this view
          this.currentView.addComments(comments.results);

          // update the `commentsPage` and `commentsTotalPages` properties of the `currentView`
          this.currentView.commentsPage = comments.page;
          this.currentView.commentsTotalPages = comments.total_pages;
          
        });

      }
      
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[44;30m[onBottomReached]: this => %o \x1b[0m`, this);
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
   * Shows the comment bar
   */
  showCommentBar() {
    this.commentBarHidden = false;
  }


  /**
   * Hides the comment bar
   */
  hideCommentBar() {
    this.commentBarHidden = true;
  }

  /**
   * Toggles the comment bar
   */
  toggleCommentBar() {
    this.commentBarHidden = !this.commentBarHidden;
  }

  /**
   * Opens the comment menu
   *
   * @param { Number } commentId - The id of the comment
   * @param { Number } authorId - The id of the comment's author
   * @param { String } authorUsername - The username of the comment's author
   */
  openCommentMenu(commentId, authorId, authorUsername) {
    muvishoApp.openMenu({
      id: this._commentMenuId,
      title: muvishoApp.i18n.getString('commentMenuTitle'),
      items: [
        {
          icon: 'reply',
          text: muvishoApp.i18n.getString('reply'),
          onClick: (event) => {
            console.log(`commentId ===>>> ${commentId} + event => `, event);
          } 
        },

        {
          icon: 'flag',
          text: muvishoApp.i18n.getString('report'),
          onClick: () => {
            console.log(`TODO: report this comment !!!`);
            this.closeCommentMenu();
          }
        }
      ],
      noDivider: true,
      isCancelable: true
    }, this._commentMenuDuration, ASIDE_PART, this);
  }


  /**
   * Closes the comment menu
   *
   * @param { Number } duration - The duration of the closing animation
   * @public
   */
  closeCommentMenu(duration = this._commentMenuDuration) {
    muvishoApp.closeMenu(this._commentMenuId, duration, ASIDE_PART);
  }

  /**
   * Returns the current media id
   *
   * @param { Boolean } asNumber - If `true` returns the media id as a number, otherwise as a string
   * @param { URLSearchParams } params - The URLSearchParams object to use
   *
   * @returns { Number | String }
   * @public
   */
  getCurrentMediaId(asNumber = false, params = this.params) {
    // get the `vid` query param
    let vid = params.get('vid');
    // get the media id from the `vid` query param
    let mediaId = vid?.split('-')[0] ?? '0';
    
    // If `asNumber` is `true`...
    if (asNumber) {
      // ...convert the media id to a number
      mediaId = parseInt(mediaId);
    }

    // return the media id
    return mediaId;
  }


  /* >> Public Setters << */

  /* >> Public Getters << */

  
  /**
   * Returns the `<button id="commentBtn">` element
   *
   * @returns { Element }
   */
  get commentButtonEl() {
    return this.shadowRoot.getElementById('commentBtn');
  }


  /**
   * Returns the span element in comment bar's label
   *
   * @returns { HTMLSpanElement }
   */
  get commentLabelSpanEl() {
    return this.commentBarEl.querySelector('label span');
  }


  /**
   * Returns the comment bar's label element
   *
   * @returns { Element }
   */
  get commentLabelEl() {
    return this.commentBarEl.querySelector('label');
  }

  /**
   * Returns the `<textarea id="commentInput">` element
   *
   * @returns { Element }
   */
  get commentInputEl() {
    return this.commentBarEl.querySelector('textarea');
  }


  /**
   * Returns the close comment Icon-Buttton element
   *
   * @returns { Element }
   */
  get closeCommentBarBtnEl() {
    return this.commentBarEl.querySelector('.close-btn');
  }

  /**
   * Returns the `<div id="actionButtons">` element
   *
   * @returns { Element }
   */
  get actionButtonsEl() {
    return this.shadowRoot.getElementById('actionButtons');
  }

  /**
   * Returns the current View class instance of the Details page
   *
   * @returns { View } - `defaultDetailsView` or `movieDetailsView` or `showDetailsView`
   */
  get currentView() {
    return this.view === 'default' ? this.defaultDetailsView : this[this.view + 'DetailsView'];
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
   * Returns the `<button id="closeIconButton">` element
   *
   * @returns { HTMLButtonElement }
   * @public
   */
  get closeIconButtonEl() {
    return this.shadowRoot.getElementById('closeIconButton');
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
   * Returns the `<div id="busyContainer" class="container" busy>` element
   *
   * @returns { HTMLDivElement }
   */
  get busyContainerEl() {
    return this.shadowRoot.getElementById('busyContainer');
  }


  /**
   * Returns TRUE if the current view is `movie`, otherwise FALSE
   *
   * @returns { Boolean }
   */
  get isMovie() {
    return this.view === 'movie';
  }


  /**
   * Returns TRUE if the current view is `show`, otherwise FALSE
   *
   * @returns { Boolean }
   * @public
   */
  get isShow() {
    return this.view === 'show';
  }


  /**
   * Returns the `<img id="backdropImage">` element
   *
   * @returns { HTMLImageElement }
   */
  get backdropImageEl() {
    return this.shadowRoot.getElementById('backdropImage');
  }


  /**
   * Returns the `<img id="posterImage">` element
   *
   * @returns { HTMLImageElement }
   */
  get posterImageEl() {
    return this.shadowRoot.getElementById('posterImage');
  }

  /**
   * Returns the `<span id="voteAverage">` element
   *
   * @returns { HTMLSpanElement }
   */
  get voteAverageEl() {
    return this.shadowRoot.getElementById('voteAverage');
  }

  /**
   * Returns the `<span id="voteCount">` element
   *
   * @returns { HTMLSpanElement }
   */
  get voteCountEl() {
    return this.shadowRoot.getElementById('voteCount');
  }

  /**
   * Returns the `<div id="commentBar">` element
   *
   * @returns { Element }
   */
  get commentBarEl() {
    return this.shadowRoot.getElementById('commentBar');
  }

  /* >> Private Methods << */

  /**
   * Handler that is called whenever the `commentBarHidden` property changes
   *
   * @param { Boolean } commentBarHidden
   */
  _handleCommentBarHiddenChange(commentBarHidden = this.commentBarHidden) {
    // if the `commentBarHidden` is TRUE
    if (commentBarHidden) {
      // hide the comment bar obv. #lol ;)
      this.commentBarEl.hidden = true;
      // show the action buttons
      this.actionButtonsEl.hidden = false;
    }else {
      // show the comment bar 
      this.commentBarEl.hidden = false;
      // hide the action buttons
      this.actionButtonsEl.hidden = true;
    }
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[35m[_handleCommentBarHiddenChange]: commentBarHidden ? `, commentBarHidden);
  }


  /**
   * Method used to compute the close url
   *
   * @param { String } view - The current view
   * @returns { String }
   */
  _computeCloseUrl(view = this.view) {
    return (view === 'show') ? `./series` : `${view}s`;
  }



  /**
   * Method used to install event listeners
   * @private
   */
  _installEventListeners() {

    // listen for the `click` event on the `commentButtonEl`
    this.commentButtonEl.addEventListener('click', this._onCommentButtonClick.bind(this));
    
    // listen for the `click` event on the `closeCommentBarBtnEl`
    this.closeCommentBarBtnEl.addEventListener('click', this._onCloseCommentBarBtnClick.bind(this));

    // listen for the `click` event on `closeIconButtonEl`
    // this.closeIconButtonEl.addEventListener('click', this._onCloseIconButtonClick.bind(this));

    // listen for the `scroll` event on the `appLayoutEl`
    this.appLayoutEl.addEventListener('scroll', this._onAppLayoutScroll.bind(this));

  }

  /**
   * Handler that is called whenever the `commentButtonEl` is clicked
   *
   * @param { Event } event - The event that triggered the handler
   *
   * @private
   */
  _onCommentButtonClick(event) {
    // toggle the comment bar
    this.toggleCommentBar();

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[_onCommentButtonClick]: event => `, event);
  }
  

  /**
   * Handler that is called whenever the `closeCommentBarBtnEl` is clicked
   *
   * @param { Event } event - The event that triggered the handler
   *
   * @private
   */
  _onCloseCommentBarBtnClick(event) {
    // toggle the comment bar
    this.toggleCommentBar();

    // hide the comment label
    this.commentLabelEl.hidden = true;

    // TODO: Clear the comment input element
    this.commentInputEl.value = '';

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[35m[_onCloseCommentBarBtnClick]: event => `, event);
  }


  /**
   * Handler that is called whenever the `closeIconButtonEl` is clicked
   * 
   * @param { Event } event - The event that triggered the handler
   * @private
   */
  _onCloseIconButtonClick(event) {
    // navigate to the movies or shows page
    (this.isMovie) ? muvishoApp.navigate('movies') : muvishoApp.navigate('shows');
     
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[_onCloseIconButtonClick]: event => `, event);
     
    // trigger the `close` event
    this.trigger('close', this);
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
    console.log(`\x1b[40;35m[_onAppLayoutScroll](1): scrollTop => %d & scrollHeight => %d & offsetHeight => %d\x1b[0m`, scrollTop, scrollHeight, offsetHeight);
    console.log(`\x1b[40;35m[_onAppLayoutScroll](2): bottomReached ? %s\x1b[0m`, bottomReached);

  }


  /**
   * Handler that is called whenever the `busy` property changes
   *
   * @param { Boolean } ?busy - If TRUE, the page is busy loading data
   */
  _handleBusyChange(busy = this.busy) {
    console.log(`isAttached ==> ${this.isAttached} & opened ? ${this.opened} & busy ? ${busy}`);

    // do nothing if this page is not opened
    if (!this.opened) return;

    // If the page is busy loading data...
    if (busy) {
      // ...show the busy container element
      this.busyContainerEl.hidden = false;
      // disable the views element
      this.viewsEl.setAttribute('aria-disabled', 'true');
      this.viewsEl.setAttribute('disabled', '');
      // and lock the page
      this.lock();

    } else { // <- otherwise...
      // ...hide the busy container element
      this.busyContainerEl.hidden = true;
      // enable the views element
      this.viewsEl.setAttribute('aria-disabled', 'false');
      this.viewsEl.removeAttribute('disabled');
      // unlock the page
      this.unlock();
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[_handleBusyChange]: busy => ${busy} \x1b[0m`);
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
   * Handler that is called whenever the `params` object property changes
   *
   * @param { URLSearchParams } ?params - The new params object
   * @private
   */
  _handleParamsChange(params = this.params) {
    // get the current media id from `params` as `mediaId`
    const mediaId = this.getCurrentMediaId(true, params);

    // update the `mediaId` property, after 50 milliseconds
    // HACK: This forces the `mediaId` property to be updated after the `params` property
    setTimeout(() => { this.mediaId = mediaId; }, 50);

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40;36m[_handleParamsChange]: mediaId => ${this.mediaId} & params => \x1b[0m`, params);
  }



  /**
   * Handler that is called whenever the `mediaId` property changes
   *
   * @param { Number } ?mediaId - The new media id
   * @private
   */
  _handleMediaIdChange(mediaId = this.mediaId) {
    // load the data for the new media id
    this._loadData(mediaId);


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40;36m[_handleMediaIdChange]: mediaId => %d\x1b[0m`, mediaId);
  }


  /**
   * Loads the data for the given media id
   *
   * @param { Number } ?mediaId - The media id to load the data for
   * @private
   */
  _loadData(mediaId = this.mediaId) {

    // Do nothing if the view is not `movie` or `show`
    if (!['movie', 'show'].includes(this.view)) { return }


    // Set the `busy` property to TRUE
    this.busy = true;
    this._handleBusyChange(); // <- HACK: this is a hack to force the busy container to show up

    // clear any active load timer
    clearTimeout(this._loadDataTimer);

    // create a new load timer
    this._loadDataTimer = setTimeout(() => { 
      
      // If the view is `movie`...
      if (this.view === 'movie') {
        // ...request the movie details with the `mediaId`
        muvishoApp.request.getFakeMovieDetails(mediaId).then((movieData) => {
           
          // update the `data` property of `movieDetailsView` with the `movieData`
          this.movieDetailsView.data = movieData;

          // update this page's `data` property with the `movieData`
          this.data = movieData;

          // set the `busy` property to FALSE
          this.busy = false;
           
          // DEBUG [4dbsmaster]: tell me about it ;)
          console.info(`\x1b[36m[_loadData] (getMovieDetails): movieData => `, movieData);
        });

      } else { // <- The view must be a `show`...
        // ...so, request the show details with the `mediaId`
        muvishoApp.request.getFakeShowDetails(mediaId).then((showData) => {
          // set the `busy` property to FALSE
          this.busy = false;
          
          // update the `data` property of `showDetailsView` with the `showData`
          this.showDetailsView.data = showData;

          // update this page's `data` property with the `movieData`
          this.data = showData;

          // DEBUG [4dbsmaster]: tell me about it ;)
          console.info(`\x1b[36m[_loadData] (getShowDetails): showData => `, showData);
        });
      }


    }, 100); // <- wait for 100 milliseconds before loading the data


  }




  /**
   * Handler that is called whenever the `voteAverage` property changes
   *
   * @param { Number } ?voteAverage - The new vote average
   * @private
   */
  _handleVoteAverageChange(voteAverage = this.voteAverage) {
    // set the value of the `voteAverageEl` element to the new vote average
    this.voteAverageEl.textContent = voteAverage ? voteAverage.toFixed(1) : 0;

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40;36m[_handleVoteAverageChange]: voteAverage => %d\x1b[0m`, voteAverage);
  }


  /**
   * Handler that is called whenever the `voteCount` property changes
   *
   * @param { Number } ?voteCount - The new vote count
   * @private
   */
  _handleVoteCountChange(voteCount = this.voteCount) {
    // set the value of the `voteCountEl` element to the new vote count
    this.voteCountEl.textContent = voteCount;
     
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40;36m[_handleVoteCountChange]: voteCount => %d\x1b[0m`, voteCount);
  }

  
  
  /**
   * Computes the given `backdropImage` and returns the full URL
   *
   * @param { String } ?backdropImage - The backdrop image
   *
   * @return { String } The full URL of the backdrop image
   * @private
   */
  _computeBackdropImage(backdropImage = this.backdropImage) {
    return backdropImage ? `${TMDB_IMAGE_BASE_URL}/${TMDB_FILE_BACKDROP_SIZE}${backdropImage}` : '';
  }
   

  
  /**
   * Computes the given `posterImage` and returns the full URL
   *
   * @param { String } ?posterImage - The poster image
   *
   * @return { String } The full URL of the poster image
   * @private
   */
  _computePosterImage(posterImage = this.posterImage) {
    return posterImage ? `${TMDB_IMAGE_BASE_URL}/${TMDB_FILE_DEFAULT_SIZE}${posterImage}` : '';
  }
   


  /**
   * Handler that is called whenever the `title` property changes
   *
   * @param { String } ?title - The new title
   * @private
   */
  _handleTitleChange(title = this.title) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40;36m[_handleTitleChange]: title => %s\x1b[0m`, title);
  }


  /**
   * Handler that is called whenever the `backdropImage` or `posterImage` property changes
   *
   * @param { String } name - The name of the property that changed
   * @param { String } value - The new value of the property
   * @private
   */
  _handleImageChange(name, value) {
    // If the backdrop image has changed...
    if (name === 'backdropImage') {
      // set the `backdropImageEl` `src` attribute to the new value
      this.backdropImageEl.src = this._computeBackdropImage(value);

    }else if (name === 'posterImage' && this.posterImageEl) {
      // set the `posterImageEl` `src` attribute to the new value
      this.posterImageEl.src = this._computePosterImage(value);
    }


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40;36m[_handleImageChange]: name => %s & value => %s\x1b[0m`, name, value);
  }


  /**
   * Handler that is called whenever the `data` object property changes
   *
   * @param { Object } ?data - The new data object
   * @private
   */
  _handleDataChange(data = this.data) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40;36m[_handleDataChange] (BEFORE): data => \x1b[0m`, data);

    // do nothing if there's no data
    if (!Object.keys(data).length) { return }

    // IDEA: set the `backdropImage`, `posterImage`, `title`, `voteAverage` 
    // `voteCount`, etc properties to their corresponding `data`

    // HACK: after 60ms, set the aforementioned properties to their corresponding `data`
    setTimeout(() => {
      this.backdropImage = data.backdrop_path;
      this.posterImage = data.poster_path;
      this.title = data.title;
      this.voteAverage = data.vote_average;
      this.voteCount = data.vote_count;
    }, 60);


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40;36m[_handleDataChange] (AFTER): data => \x1b[0m`, data);

  }

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
   * Method used to install event listeners on the current view
   * @private
   */
  #installViewEventListeners() {

    // listening to the 'more-comment' event...

    this.currentView.on('more-comment', (params) => {
      // open the comment menu with the given `params`
      this.openCommentMenu(params.commentId, params.authorId, params.authorUsername);
    });


    // listening to the 'reply' event...

    this.currentView.on('reply', (params) => {
      // handle the reply event
      this._onReplyHandler(params.commentId, params.authorId, params.authorUsername);
    });

  }




  /**
   * Handler that is called whenever the `reply` event is triggered from a view
   *
   * @param { Number } commentId
   * @param { Number } authorId
   * @param { String } authorUsername
   *
   * @private
   */
  _onReplyHandler(commentId, authorId, authorUsername) {
    // set the `commentLabelSpan` value or text content to the retrieved username
    this.commentLabelSpanEl.textContent = authorUsername;
    // show the comment label
    this.commentLabelEl.hidden = false;
    
    // show the comment bar
    this.showCommentBar();

    // focus on the comment's input element
    this.commentInputEl.focus();

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[_onReplyHandler]: commentId => ${commentId} & authorId => ${authorId} & authorUsername => ${authorUsername} \x1b[0m`);
      

  }


  /* >> Private Setters << */

  /* >> Private Getters << */



}; // <- End of `DetailsPage` class


// Attach a behavior to `DetailsPage`...
// Object.assign(DetailsPage.prototype, DetailsPageBehavior);


