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
* @name: App
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1+|> var muvishoApp = new App(DEFAULT_LANGUAGE, LIGHT_THEME);
*    -|>
*    -|> muvishoApp.setTitle('Movies & TV Shows Online Free - Muvisho');
*    -|>
*    -|> muvishoApp.run();
*
*
*   2+|> // Open a dialog in the main part in 0.5 seconds
*    -|> 
*    -|> muvishoApp.openDialog({
*    -|>  id: 'deleteAccount',
*    -|>  title: 'Delete Account',
*    -|>  message: 'Are you sure?',
*    -|>  confirmBtnText: 'Yes',
*    -|>  cancelBtnText: 'No',
*    -|>  onConfirm: () => console.log(`confirm button clicked`),
*    -|>  onCancel: () => console.log(`cancel button clicked`),
*    -|>  noDivider: false,
*    -|>  isCancelable: true
*    -|>  }, 0.5, MAIN_PART);
*    -|> 
*
*   2+|> // Close a dialog from the main part
*    -|> 
*    -|> muvishoApp.closeDialog('deleteAccount', 0.5, MAIN_PART);
*    -|>
*
*
*   3+|> // Open a menu in the aside part in 0.3 seconds
*    -|> 
*    -|> muvishoApp.openMenu(this, {
*    -|>  id: 'default',
*    -|>  title: '',
*    -|>  items: [
*    -|>    {
*    -|>      id: 'favInfo',
*    -|>      icon: 'about_outline',
*    -|>      text: 'Details',
*    -|>      link: '/',
*    -|>      onClick: () => console.log(`favInfo item clicked...`)
*    -|>    },
*    -|>    {
*    -|>      id: 'removeFav',
*    -|>      icon: 'delete_outline',
*    -|>      text: 'Remove from favorites',
*    -|>      link: '/delete/favorite/[:id]',
*    -|>      onClick: () => console.log(`removeFav item clicked...`)
*    -|>    }
*    -|>  ],
*    -|>  noDivider: false,
*    -|>  isCancelable: true
*    -|>  }, 0.5, ASIDE_PART);
*    -|> 
* 
*
*   2+|> // Close a menu from the main part
*    -|> 
*    -|> muvishoApp.closeMenu('default', 0.5, MAIN_PART);
*    -|>
*/

import { html, Engine } from './Engine.js'; // <- we just need stuff from our custom engine to get started #LOL !!! :)
import { eventMixin } from './helpers/mixins/event-mixin.js';
import { installStorageWatcher } from './helpers/LiveStorage.js';
import { installRouter, getPageRoute, getViewRoute, getSearchParams } from './helpers/router.js';
import { installMediaQueryWatcher } from './helpers/mediawatcher.js';
import I18n from './helpers/i18n.js'; // <- i18n helper
import Request from './helpers/request.js'; // <- request helper

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// Defining some constant variables...

// app name
export const APP_NAME = "muvisho";
// app version
export const APP_VERSION = "0.0.1";
// author
export const AUTHOR = "Abraham Ukachi";

// base directory
export const BASE_DIR = "/cinetech/" // "muvisho-js/"; (for production)

// assets directory
export const ASSETS_DIR = `${BASE_DIR}root/public/assets`;
// theme directory
export const THEME_DIR = `${ASSETS_DIR}/theme`;
// styles directory
export const STYLES_DIR = `${ASSETS_DIR}/stylesheets`;
// animations directory
export const ANIM_DIR = `${ASSETS_DIR}/animations`;

// source directory
export const SOURCE_DIR = `${BASE_DIR}root/public/src`;
// screens directory
export const SCREENS_DIR = `${SOURCE_DIR}/screens`;
// pages directory
export const PAGES_DIR = `${SOURCE_DIR}/pages`;
// views directory
export const VIEWS_DIR = `${SOURCE_DIR}/views`;

// screens
export const SPLASH_SCREEN = 'splash';
export const WELCOME_SCREEN = 'welcome';

// pages
export const HOME_PAGE = 'home';
export const SEARCH_PAGE = 'search'; // <- or explore 🤔
export const EXPLORE_PAGE = 'explore'; // <- or search 😜
export const MOVIES_PAGE = 'movies';
export const SERIES_PAGE = 'series';
export const FAVORITES_PAGE = 'favorites';
export const DETAILS_PAGE = 'details';
export const ACCOUNT_PAGE = 'account';
export const PROFILE_PAGE = 'profile';
export const SETTINGS_PAGE = 'settings';
export const HELP_PAGE = 'help';

// export const ARTICLES_PAGE = 'articles';
// export const SAVES_PAGE = 'saves';
// export const PROFILE_PAGE = 'profile';
// export const ADMIN_PAGE = 'admin';
// export const SETTINGS_PAGE = 'settings';

// views
export const VIEW_DEFAULT = 'default';
export const VIEW_LOGIN = 'login';
export const VIEW_REGISTER = 'register';
export const VIEW_INFO = 'info';
export const VIEW_IDENTITY = 'identity';
export const VIEW_EMAIL = 'email';
export const VIEW_PASSWORD = 'password';
export const VIEW_LANGUAGE = 'language';
export const VIEW_THEME = 'theme';
export const VIEW_CONTACT = 'contact';
export const VIEW_ABOUT = 'about';

export const VIEW_MOVIE = 'movie';
export const VIEW_SHOW = 'show';


// a list of all assets that have been loaded
export const loadedAssetsList = [];


// app children levels
export const APP_SCREENS = 1;
export const APP_PAGES = 2;
export const APP_DIALOGS = 3;
export const APP_MENUS = 4;
export const APP_TOASTS = 5;

// page types
export const MAIN_PAGE_TYPE = 'main';
export const ASIDE_PAGE_TYPE = 'aside';


// themes
export const CLASSIC_THEME = 'classic';
export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

// toast types
export const DEFAULT_TOAST_TYPE = 'default';
export const SUCCESS_TOAST_TYPE = 'success';
export const ERROR_TOAST_TYPE = 'error';
// default toast timeout
export const DEFAULT_TOAST_TIMEOUT = 5000; // <- 5 seconds

// ++++++ Constants 4rm Maxaboom +++++++

// toast types
export const ERROR_TOAST = 'et';
export const SUCCESS_TOAST = 'st';
export const GOOD_TOAST = '1t';
export const BAD_TOAST = '2t';
export const NORMAL_TOAST = '0t';
export const DEFAULT_TOAST = NORMAL_TOAST; // <- default toast type is normal
// default toast timeout
// export const DEFAULT_TOAST_TIMEOUT = 5; // <- default toast timeout is 5 seconds
export const DEFAULT_MENU_TIMEOUT = 0.5;
export const DEFAULT_BACKDROP_TIMEOUT = 0.5;

// parts
export const MAIN_PART = '0p';
export const ASIDE_PART = '1p';
export const FULL_PART = '2p';
export const DEFAULT_PART = FULL_PART; // <- default part is full


// +++++ End of Constants 4rm Maxaboom +++++++



// TODO: Turn the App into a custom element by extending `HTMLElement`


// Create a `App` class
export class App extends Engine {
  // some app specific constants
  // static get CLASSIC_THEME() { return 'classic' }
  // static get LIGHT_THEME() { return 'light' }
  // static get DARK_THEME() { return 'dark' }

  /**
   * Properties
   *
   * @type { Object }
   */
  static get properties() {
    return {
      id: { type: String },
      name: { type: String },
      title: { type: String },
      lang: { type: String },
      theme: { type: String },
      updated: { type: Boolean },
      labelsHidden: { type: Boolean },

      _navbarOrientation: { type: String },
      _pageLoading: { type: Boolean }
    };
  }

  /**
   * Theme
   *
   * @type { Array }
   */
  static get theme() {
    return [ 'typography', 'color', 'styles' ];
  }

  /**
   * Styles
   *
   * @type { Array }
   */
  static get styles() {
    return [ 
      // 'splash-screen' 
    ];
  }

  /**
   * Animations
   *
   * @type { Array }
   */
  static get animations() {
    return [ 
      'fade-in', 'fade-out',
      'pop-in',
      'slide-from-left', 'slide-from-down', 'slide-down',
      'slide-from-up', 'slide-up'
    ];
  }

  /**
   * Screens
   *
   * @type { Object }
   */
  static get screens() {
    return {
      // splash: { name: 'splash-screen' }
      // welcome: { name: 'welcome-screen' }
    };
  }

  /**
   * Pages
   *
   * @type { Array[Object] }
   */
  static get pages() {
    return [
      { name: HOME_PAGE , views: [VIEW_DEFAULT, VIEW_LOGIN, VIEW_REGISTER] },

      { name: SEARCH_PAGE, views: [VIEW_DEFAULT] },

      { name: MOVIES_PAGE, views: [VIEW_DEFAULT] },

      { name: SERIES_PAGE, views: [VIEW_DEFAULT] },

      { name: FAVORITES_PAGE, views: [VIEW_DEFAULT] },

      { name: DETAILS_PAGE, views: [VIEW_DEFAULT, VIEW_MOVIE, VIEW_SHOW] },

      { name: ACCOUNT_PAGE, views: [VIEW_DEFAULT] },

      { name: SETTINGS_PAGE, views: [VIEW_DEFAULT, VIEW_LANGUAGE, VIEW_THEME] },

      { name: PROFILE_PAGE, views: [VIEW_DEFAULT, VIEW_IDENTITY, VIEW_EMAIL, VIEW_PASSWORD] },

      { name: HELP_PAGE, views: [VIEW_DEFAULT, VIEW_CONTACT, VIEW_ABOUT] }
    ];
  }


  /**
   * Supported Themes
   *
   * @type { Array[Object] }
   */
  static get supportedThemes() {
    return [
      { id: 'classic', name: 'Classic' },
      { id: 'light', name: 'Light' },
      { id: 'dark', name: 'Dark' }
    ];
  }

  /**
   * Supported Languages
   *
   * @type { Array[Object] }
   */
  static get supportedLanguages() {
    return [
      { id: 'en', name: 'English' },
      { id: 'fr', name: 'French' },
      { id: 'ru', name: 'Russian' },
      { id: 'es', name: 'Spanish' }
    ];
  }

  /**
   * Supported Pages
   *
   * @type { Array[Object] }
   */
  static get supportedPages() {
    return [
      {id: 'home', type: MAIN_PAGE_TYPE, name: 'Home'},
      {id: 'search', type: ASIDE_PAGE_TYPE, name: 'Search'},
      {id: 'movies', type: MAIN_PAGE_TYPE, name: 'Movies'},
      {id: 'series', type: MAIN_PAGE_TYPE, name: 'Series'},
      {id: 'favorites', type: MAIN_PAGE_TYPE, name: 'Favorites'},
      {id: 'details', type: ASIDE_PAGE_TYPE, name: 'Details'},
      {id: 'account', type: MAIN_PAGE_TYPE, name: 'Account'},
      {id: 'profile', type: ASIDE_PAGE_TYPE, name: 'Profile'},
      {id: 'settings', type: MAIN_PAGE_TYPE, name: 'Settings'},
      {id: 'help', type: ASIDE_PAGE_TYPE, name: 'Help'}
    ];
  }


  /**
   * Config of the app
   */
  static get config() {
    return {
      baseUrl: '/cinetech/' 
    };
  }




  // Define some public properties
   
  // Define some private properties  
  
  #toasting = false;
  #_currentLayout = null;



  /**
   * Constructor of the App
   * NOTE: This constructor will be executed automatically when a new object (eg. muvishoApp) is created.
   *
   * @param { String } lang - The default language of the App
   * @param { String } theme - The default theme of the App
   */
  constructor(lang = 'en', theme = 'dark') {
    // call the `Engine` constructor with `App` as it's controller
    super(App);
    
    // set default attributes
    this.lang = lang;
    this.theme = theme;

    // set both current screen and page to null
    // (WE ARE IN "BOOTING MODE"... So, no screens; no pages)
    this.currentScreen = null;
    this.currentPage = null;
    this.currentView = null;
    this.currentParams = null;

    // create a new `I18n` instance with `lang` as the default language
    this.i18n = new I18n(lang);
    // create an object of the `Request` class
    this.request = new Request(lang);


    // when the data is loaded,
    // call the `onReady` method with the loaded data as parameter
    this.i18n.dataLoaded = (data) => this._onI18nDataLoaded(data);

    // list of primary pages
    this.primaryPages = [ HOME_PAGE, SEARCH_PAGE, MOVIES_PAGE, SERIES_PAGE, FAVORITES_PAGE, ACCOUNT_PAGE, PROFILE_PAGE ];

    // show / log a welcome message
    this.#showWelcomeMessage();

    // create the app
    this.#create();

    // DEBUG [4dbsmaster]: tell me about it ;)
    // console.log(`[constructor]: #_props.init =>`, this.#_props.init);
  }


  /**
   * Method that is called from the Engine's constructor
   * @override from `Engine`
   */
  init() {
    // Initialize public properties
    this.id = 'app';
    this.name = APP_NAME;
    this.title = 'Muvisho';
    this.updated = false;
    this.labelsHidden = false; // <- by default both side and nav labels should be visible or shown ;)

    // Initialize private properties
    this._navbarOrientation = 'horizontal';
    this._pageLoading = false;

    // ====== TESTING PROPERTIES ==========
    
    /*
    setTimeout(() => {
      this.loading = false;
      this.title = 'Articles';
    }, 2000);
    */

    // ====================================


  }



  /**
   * Renders the app's template
   * IMPORTANT: This is where the html content of the app is defined.
   * 
   * TODO: Return a `HTMLTemplate` instead
   *
   * @returns { String }
   */
  render() {
    return html`
      
      <!-- App Container --> 
      <div id="appContainer" class="theme ${this.theme}" lang="${this.lang}" fit>
        
        <!-- Screens -->
        <div id="screens" fit hidden></div>
        <!-- End of Screens -->
        
        <!-- Pages -->
        <div id="pages" class="flex-layout horizontal" fit hidden></div>
        <!-- End of Pages -->

        <!-- Backdrop -->
        <div id="backdrop" fit hidden></div>

        <!-- Dialogs -->
        <div id="dialogs" fit hidden></div>

        <!-- Menus -->
        <div id="menus" fit hidden></div>

        <!-- Toasts -->
        <div id="toasts" class="fade-in" fit hidden></div>

        <!-- Progress Bar -->
        <div id="progressBar" class="progress-bar" hidden>
          <span class="progress-bar-value"></span>
        </div>

      </div>
      <!-- End of App Container --> 


      <!-- NOTE: Style Links will be injected here -->
    `;
  }
  

  /**
   * First time this app gets updated 
   * @override from `Engine`
   */
  firstUpdated() {

    // install a router
    installRouter(this, (location, event) => this._handleNavigation(location, event));

    // install a storage watcher from 'LiveStorage'
    installStorageWatcher(this, ['lang', 'theme'], (changedStorageItems) => this._handleChangedStorageItems(changedStorageItems));

    // install a media-query watcher with a `460px` breakpoint
    installMediaQueryWatcher(this, 460, 
      (firstNarrowQuery) => this._handleNarrowLayout(firstNarrowQuery), 
      (firstWideQuery) => this._handleWideLayout(firstWideQuery)
    );

  
    // if the current values of `lang` and `theme` in our live storage
    if (this.liveStorage.isNullItems('lang', 'theme')) {
      this.liveStorage.setItems({lang: this.lang, theme: this.theme});
    }

    // add event listeners here 

    // this.host.addEventListener('click', (ev) => console.log(`clicking host ev.currentTarget =>`, ev.currentTarget));

    // TODO: Install the starter helper & media-query watcher
     
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40m\x1b[33m[firstUpdated](1): App have been updated for the first time\x1b[0m`);
    console.log(`\x1b[40m\x1b[33m[firstUpdated](2): this.containerEl => ${eval(this.containerEl)}\x1b[0m`);

  }

  /**
   * Handler that is called whenever a property changes
   *
   * @param { Array[Object] } changedProperties
   * @override
   */
  propertiesUpdated(changedProperties) {
    changedProperties.forEach((prop) => {


      if (prop.name === 'updated' && prop.value === true) {
        // call the first updated method
        this.firstUpdated();
      }

      if (prop.name === 'title') {
        this.setTitle(prop.value);
      }

      // if the `labelsHidden` property has changed...
      if (prop.name === 'labelsHidden') {
        // ...handle it ;)
        this._handleLabelsHiddenChange(prop.value, prop.oldValue);
      }

      if (prop.name === '_pageLoading') {
        this._handlePageLoadingChange(prop.value, prop.oldValue);
      }

      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[33m[changedProperties]: 
        1. prop.name => ${prop.name}
        2. prop.value => ${prop.value} 
        3. prop.oldValue => ${prop.oldValue}
      \x1b[0m`);

    });
  }

  /**
   * Handler that is called whenever a property gets reset to its initial value
   *
   * @param { String } prop - The property's name
   * @param { String|Number|Boolean|Array } value - The value of the property after reset
   * @param { String|Number|Boolean|Array } oldValue - The value of the property before reset
   *
   * @override from `Engine`
   */
  propertyResetHandler(prop, value, oldValue) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[37m[propertyResetHandler] prop => ${prop} & value => ${value} & oldValue => ${oldValue}\x1b[0m`);
  }


  /* >> PUBLIC METHODS << */


  /**
   * Method used to open a menu using the given `params`
   *
   * @param { Object } params - The params object
   *
   * @param { String } params.id - The id of the menu
   * @param { String } params.title - The title of the menu
   * @param { Array } params.items - The items of the menu (e.g [{icon: '', text: 'delete', link: '/delete', onClick: () => console.log()}, {...}, ...]
   * @param { Boolean } params.noDivider - Whether to hide the divider between the buttons
   * 
   * @param { Number } timeout - How long it will take to open the menu
   * @param { String } part - Which part of the app the menu should be display.
   * @param { Object } controller - a class object (e.g. `this` or `muvishoApp.detailsPage`)
   *
   * @returns { Promise } - A promise that will be resolved when the menu is opened
   */
  openMenu(params, timeout = 0.5, part = DEFAULT_PART, controller) {
    return new Promise ((resolve, reject) => {
      // get the menus element of the given `part` as `dialogsEl`
      let menusEl = this.getCurrentMenusElement(part);

      // initialize the `menuId` variable
      let menuId = params.id || 'menu';
      
      // reject the promise, if there's already a menu with this `menuId`
      // in the specified `part`
      if (this.getMenuById(menuId, part)) {
        return reject(`The menu with id "${menuId}" is already open, close it and try again!`);
      }


     
      // Now, rendering the menu...
      // get the menu's html template with the given `params` as `menuHTMLTemplate`
      let menuHTMLTemplate = this._getMenuHTMLTemplate(params);
      
      // insert 'beforend' the `menuHTMLTemplate` to `menusEl`
      menusEl.insertAdjacentHTML('beforeend', menuHTMLTemplate);

      // get the menu element using `menuId`
      let menuEl = this.getMenuById(menuId, part);
      
      // install menu event listeners on this `menuEl`
      this.#installMenuEventListeners(menuEl, params, controller);

      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[35m[openMenu]: menuId => ${menuId} & menusEl => \x1b[0m`, menusEl);
      
      // show the backdrop of the given `part` 
      this.showBackdropOf(part, params.isCancelable ?? false);

      // show or unhide the `menusEl`
      menusEl.hidden = false;
      // show or unhide the `menuEl`
      menuEl.hidden = false;

      // remove the `fade-out` class from `menusEl`
      menusEl.classList.remove('fade-out');
      // add the `fade-in` class to `menusEl`
      menusEl.classList.add('fade-in');

      // remove the `slide-down` class from `menuEl`
      menuEl.classList.remove('slide-down');
      // add the `slide-from-down` class to `menuEl`
      menuEl.classList.add('slide-from-down');

      
      // cancel any active timers
      clearTimeout(this._closeMenuTimer);
      clearTimeout(this._openMenuTimer);
      
      // resolve the promise after `duration` seconds
      this._openMenuTimer = setTimeout(() => {
        // TODO ? Do something before resolving the promise

        // add a `opened` property to `menuEl`
        menuEl.setAttribute('opened', '');
         
        // resolve the promise
        resolve(menuEl);
        
      }, timeout * 1000);

    });
  }


  /**
   * Method used to close the menu with the given `menuId`
   *
   * @param { String } menuId - The id of the menu to close
   * @param { Number } duration - The duration of the animation (in seconds)
   * @param { String } part - The part of the app where the menu will be hidden (eg. MAIN_PART, ASIDE_PART, FULL_PART)
   * 
   * @returns { Promise } - A promise that will be resolved when the menu is closed
   */
  closeMenu(menuId = 'menu', duration = 0.5, part = DEFAULT_PART) {
    return new Promise((resolve, reject) => {
      // get the menus element of the given `part` as `menusEl`
      let menusEl = this.getCurrentMenusElement(part);

      // get the menu element with the given `menuId` as `menuEl`
      let menuEl = this.getMenuById(menuId, part); 

      // if the menu element doesn't exist, reject the promise
      if (!menuEl) { return reject(`Menu with id "${menuId}" doesn't exist`) }

      
      // hide the backdrop of the given `part` 
      this.hideBackdropOf(part);
      

      // remove the `fade-in` class from `menusEl`
      menusEl.classList.remove('fade-in');
      // add the `fade-out` class to `menusEl`
      menusEl.classList.add('fade-out');

      // remove slide-from-down class from `menuEl`
      menuEl.classList.remove('slide-from-down');
      // add the `slide-down` class to `menuEl`
      menuEl.classList.add('slide-down');


      // cancel any active timers
      clearTimeout(this._closeMenuTimer);
      clearTimeout(this._openMenuTimer);
      
      // resolve the promise after `duration` seconds
      this._closeMenuTimer = setTimeout(() => {
        // TODO ? Do something before resolving the promise
        
        // remove the `opened` property from `menuEl`
        menuEl.removeAttribute('opened');

        // hide the `menuEl`
        menuEl.hidden = true;

        // hide the `menusEl`
        menusEl.hidden = true;

        // remove the `menuEl` from `menusEl`
        menuEl.remove();

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[34m[closeMenu](_closeMenuTimer): menuEl ==> \x1b[0m`, menuEl);

        // resolve the promise
        resolve();

      }, duration * 1000);

    });

  }

  /**
   * Method used to open a dialog using the given `params`
   *
   * @param { Object } params - The params object
   *
   * @param { String } params.id - The id of the dialog
   * @param { String } params.title - The title of the dialog
   * @param { String } params.message - The message of the dialog
   * @param { String } params.confirmBtnText - The text of the confirm button
   * @param { String } params.cancelBtnText - The text of the cancel button
   * @param { Boolean } params.noDivider - Whether to hide the divider between the buttons
   * @param { Function } params.onConfirm - The function to call when the confirm button is clicked
   * @param { Function } params.onCancel - The function to call when the cancel button is clicked
   * 
   * @returns { Promise } - A promise that will be resolved when the dialog is opened
   */
  openDialog(params, timeout = 0.5, part = DEFAULT_PART) {
    return new Promise ((resolve, reject) => {
      // get the dialogs element of the given `part` as `dialogsEl`
      let dialogsEl = this.getCurrentDialogsElement(part);

      // initialize the `dialogId` variable
      let dialogId = params.id || 'dialog';
       
      // reject the promise, if there's already a dialog with this `dialogId`
      // in the specified `part`
      if (this.getDialogById(dialogId, part)) {
        return reject(`The dialog with id "${dialogId}" is already open, close it and try again!`);
      }

      
      // Now, rendering the dialog...
      // get the dialog html template with the given `params` as `dialogHTMLTemplate`
      let dialogHTMLTemplate = this._getDialogHTMLTemplate(params);
      
      // insert 'beforend' the `dialogHTMLTemplate` to `dialogsEl`
      dialogsEl.insertAdjacentHTML('beforeend', dialogHTMLTemplate);
      
      // get the dialog element using `dialogId`
      let dialogEl = this.getDialogById(dialogId, part);

      // get the confirm button element as `confirmBtnEl`
      let confirmBtnEl = dialogEl.querySelector('.confirm-btn');
      // get the cancel button element as `cancelBtnEl`
      let cancelBtnEl = dialogEl.querySelector('.cancel-btn');

      // attach the `onConfirm` and `onCancel` functions to the buttons
      confirmBtnEl.onclick = params.onConfirm ?? (() => this.closeDialog(dialogId, timeout, part));
      cancelBtnEl.onclick = params.onCancel ?? (() => this.closeDialog(dialogId, timeout, part));


      // if the dialog element doesn't exist, reject the promise
      // if (!dialogEl) { reject(`Dialog with id "${dialogId}" doesn't exist`); }

      // show the backdrop of the given `part` 
      this.showBackdropOf(part, params.isCancelable ?? false);

      // show or unhide the `dialogsEl`
      dialogsEl.hidden = false;
      // show or unhide the `dialogEl`
      dialogEl.hidden = false;

      // remove the `fade-out` class from `dialogsEl`
      dialogsEl.classList.remove('fade-out');
      // add the `fade-in` class to `dialogsEl`
      dialogsEl.classList.add('fade-in');

      // remove the `slide-up` class from `dialogEl`
      dialogEl.classList.remove('slide-up');
      // add the `slide-from-up` class to `dialogEl`
      dialogEl.classList.add('slide-from-up');

      
      // cancel any active timers
      clearTimeout(this._closeDialogTimer);
      clearTimeout(this._openDialogTimer);

      // resolve the promise after `duration` seconds
      this._openDialogTmer = setTimeout(() => {
        // TODO ? Do something before resolving the promise

        // add a `opened` property to `dialogEl`
        dialogEl.setAttribute('opened', '');

        // resolve the promise
        resolve(dialogEl);

      }, timeout * 1000);

    });
  }


  /**
   * Method used to close the dialog with the given `dialogId`
   *
   * @param { String } dialogId - The id of the dialog to close
   * @param { Number } duration - The duration of the animation (in seconds)
   * @param { String } part - The part of the app where the menu will be hidden (eg. MAIN_PART, ASIDE_PART, FULL_PART)
   * 
   * @returns { Promise } - A promise that will be resolved when the dialog is closed
   */
  closeDialog(dialogId = 'dialog', duration = 0.5, part = DEFAULT_PART) {
    return new Promise((resolve, reject) => {
      // get the dialogs element of the given `part` as `menusEl`
      let dialogsEl = this.getCurrentDialogsElement(part);

      // get the dialog element with the given `dialogId` as `dialogEl`
      let dialogEl = this.getDialogById(dialogId, part); 

      // if the dialog element doesn't exist, reject the promise
      if (!dialogEl) { return reject(`Dialog with id "${dialogId}" doesn't exist`) }

      
      // hide the backdrop of the given `part` 
      this.hideBackdropOf(part);
      

      // remove the `fade-in` class from `dialogsEl`
      dialogsEl.classList.remove('fade-in');
      // add the `fade-out` class to `dialogsEl`
      dialogsEl.classList.add('fade-out');

      // remove slide-from-up class from `dialogEl`
      dialogEl.classList.remove('slide-from-up');
      // add the `slide-up` class to `dialogEl`
      dialogEl.classList.add('slide-up');

      // cancel any active timers
      clearTimeout(this._closeDialogTimer);
      clearTimeout(this._openDialogTimer);

      // resolve the promise after `duration` seconds
      this._closeDialogTimer = setTimeout(() => {
        // TODO ? Do something before resolving the promise
        
        // remove the `opened` property from `dialogEl`
        dialogEl.removeAttribute('opened');

        // deactivate the dialog element`
        dialogEl.removeAttribute('active');

        // hide the `dialogEl`
        dialogEl.hidden = true;

        // hide the `dialogsEl`
        dialogsEl.hidden = true;

        // remove the `fade-out` class from `dialogsEl`
        dialogsEl.classList.remove('fade-out');
        // remove the `dialogEl` from `dialogsEl`
        dialogEl.remove();

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[34m[closeDialog](_closeDialogTimer): dialogEl ==> \x1b[0m`, dialogEl);

        // resolve the promise
        resolve();

      }, duration * 1000);

    });

  }

  /**
   * Shows or unhides the backdrop of the app (or a specific part of the app)
   *
   * @param { String } part - The part of the app to show the backdrop of
   * @param { Boolean } isCancelable - If TRUE, the backdrop will be cancelable
   */
  showBackdropOf(part = DEFAULT_PART, isCancelable = false) {
    // get the correct backdrop element
    let backdropEl = part === MAIN_PART ? this.mainBackdropEl : (part === ASIDE_PART ? this.asideBackdropEl : this.backdropEl);
    // set the cancelable attribute of the backdrop element
    backdropEl.setAttribute('cancelable', isCancelable);

    // set the `hidden` attribute to false 
    backdropEl.hidden = false;
  }


  /**
   * Hides the backdrop of the app (or a specific part of the app)
   *
   * @param { String } part - The part of the app to show the backdrop of
   * @param { Number } duration - The duration (in milliseconds) of the hiding animation
   */
  hideBackdropOf(part = DEFAULT_PART, duration = 300) {
    // get the correct backdrop element
    let backdropEl = part === MAIN_PART ? this.mainBackdropEl : (part === ASIDE_PART ? this.asideBackdropEl : this.backdropEl);

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[34m[hideBackdropOf]: backdropEl => \x1b[0m`, backdropEl);

    // add the `fade-out` class to the backdrop element
    backdropEl.classList.add('fade-out');

    // hide the backdrop element after 300 milliseconds
    this.hideBackdropTimer = setTimeout(() => {
      // set the `hidden` attribute to true 
      backdropEl.hidden = true;
      // remove the `fade-out` class from the backdrop element
      backdropEl.classList.remove('fade-out');
    }, duration);

  }


  /**
   * Toggles the default backdrop of the app
   */
  toggleBackdrop() {
    // if the backdrop is hidden, then show it
    if (this.backdropEl.hidden) this.showBackdropOf(DEFAULT_PART);
    // if the backdrop is not hidden, then hide it
    else this.hideBackdropOf(DEFAULT_PART);
  }

  /**
   * Shows all the labels in both side and nav labels
   * NOTE: This method sets the `labelsHidden` property to FALSE
   */
  showLabels() {
    this.labelsHidden = false;
  }

  /**
   * Hides all the labels in both side and nav labels
   * NOTE: This method sets the `labelsHidden` property to TRUE
   */
  hideLabels() {
    this.labelsHidden = true;
  }

  /**
   * Toggles all the labels in both side and nav lables
   */
  toggleLabels() {
    this.labelsHidden = !this.labelsHidden;
  }


  /**
   * Shows the app's progress bar.
   *
   * @param { Boolean } intermediate - Whether the progress should be intermediate or not
   */
  showProgressBar(intermediate = false) {
    // If intermediate is TRUE
    if (intermediate) {
      // add an `intermediate` key to the class list
      this.progressBarEl.classList.add('intermediate');
    }
    
    // Set the `hidden` property of `progressBarEl` to FALSE
    this.progressBarEl.hidden = false;
  }


  /**
   * Hides the app's progress bar.
   */
  hideProgressBar() {
    // Remove any `intermediate` key from the class list of `progressBarEl`
    this.progressBarEl.classList.remove('intermediate');

    // Set the `hidden` property of `progressBarEl` to TRUE
    this.progressBarEl.hidden = true;
  }

  

  /**
   * Method used to run the app
   * @override
   */
  async run() {

    // add the app's document fragment to `shadowRoot`
    this.shadowRoot.appendChild(this.documentFragment);
    // set `updated` property to TRUE
    this.updated = true;

    // run the engine first and wait for a response
    let engineResponse = await super.run();



    // Looping through all the assets in `engineResponse`
    // IDEA: Inject the line of style in the app's shadow DOM directly
    Object.entries(engineResponse).map(([assetsId, assetsData]) => {
      // TODO: handle `engineResponse` appropriately 

      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[40m\x1b[36m[run]: assetsId => ${assetsId} & assetsData => \x1b[0m`, assetsData);

    });


    // HACK / IDEA: allocating enough time before executing the `onReady()` method,
    //              this is to prepare for any unforseen issues
    // after 0.1 seconds or 100 milliseconds...
    setTimeout(() => {
      // ...call the onReady() method
      this.onReady();
    }, 100);


    
  }

  /**
   * Handler that is called when the app is ready
   */
  onReady() {

    // Load the splash screen
    this._loadScreens([SPLASH_SCREEN]).then((loadedScreens) => this._onScreensLoaded(loadedScreens));
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40m\x1b[31m[onReady]: (1) ${this.name} is ready`); 
  }


  /**
   * Handler that is called whene the `theme` has been updated
   *
   * @param { String } updatedTheme
   */
  onThemeUpdated(updatedTheme) {
    // if we are currently on the welcome screen...
    if (this.currentScreen === WELCOME_SCREEN) {
      // ...update the `theme` property of welcome screen 
      this.welcomeScreen.theme = updatedTheme;
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[45m\x1b[30m[onThemeUpdated]: updatedTheme => ${updatedTheme}\x1b[0m`);
  }

  /**
   * Handler that is called whene the `lang` has been updated
   *
   * @param { String } updatedLang
   */
  onLangUpdated(updatedLang) {
    // if we are currently on the welcome screen...
    if (this.currentScreen === WELCOME_SCREEN) {
      // ...update the `lang` property of welcome screen 
      this.welcomeScreen.lang = updatedLang;
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[45m\x1b[2m[onLangUpdated]: updatedLang => ${updatedLang}\x1b[0m`);
  }


  /**
   * Sets the app's title with the given `value`
   *
   * @param { String } value - The new title 
   * @param { Boolean } hasAuthor - If TRUE, the name of the author will be shown
   */
  setTitle(value, hasAuthor) {
    // Do nothing if there's no value 
    if (typeof value === 'undefined') { return }
   
    // Define the `newTitle` variable with the given `value`
    let newTitle = hasAuthor ? `${value} | by ${AUTHOR}` : value;

    // DEBUG [4dbsmaster]: tell me about it ;)
    // console.log(`[setTitle]: newTitle => ${newTitle} & this.root.title => ${this.root.title}`);

    // If the current title is not the same as newTitle...
    if (this.root.title !== newTitle) {
      // ...update the browser's title with `newTitle`
      this.root.title = newTitle;
    }

  }

  /**
   * Returns a list of themes currently supported by this App.
   *
   * @param { Boolean } idsOnly
   *
   * @returns { Array[Object] }
   */
  getSupportedThemes(idsOnly = false) {
    // get the list of supported themes from the constructor as `supportedThemes`
    let supportedThemes = this.constructor.supportedThemes;
    // return the `supportedThemes` based on the specified `idsOnly` boolean variable
    return (idsOnly) ? supportedThemes.map((language) => language.id) : supportedThemes;
  }


  /**
   * Returns a list of languages currently supported by this App.
   *
   * @param { Boolean } idsOnly
   *
   * @returns { Array[Object] }
   */
  getSupportedLanguages(idsOnly = false) {
    // get the list of supported languages from the constructor as `supportedLanguages`
    let supportedLanguages = this.constructor.supportedLanguages;
    // return the `supportedLanguages` based on the specified `idsOnly` boolean variable
    return (idsOnly) ? supportedLanguages.map((language) => language.id) : supportedLanguages;
  }

  /**
   * Returns a list of all pages currently supported by this App.
   *
   * @param { Boolean } idsOnly
   *
   * @returns { Array[Object]|Array[String] }
   */
  getSupportedPages(idsOnly = false) {
    // get the list of supported pages from the constructor as `supportedPages`
    //let supportedPages = this.constructor.supportedPages;

    // return the `supportedPages` based on the specified `idsOnly` boolean variable
    return (idsOnly) ? App.supportedPages.map((page) => page.id) : App.supportedPages;
  }

  /**
   * Returns the app's title
   *  
   * @param { Boolean } hasAuthor
   *
   * @returns { String } title
   *
   */
  getTitle(hasAuthor = false) {
    // TODO: ? Use this one-liner instead
    // return hasAuthor ? this.root.title : this.root.title.split('|').shift().trim();

    // Initialize the `title` variable with the current browser's title.
    let title = this.root.title;

    // If `hasAuthor` is NOT TRUE
    if (!hasAuthor) {
      title = title
        .split('|') // <- split the title into an array using `|` as a separator
        .shift() // <- take out the first item from the array
        .trim(); // <- remove or trim trailing / outer spaces.
    }
     
    // TODO: do something awesome with the title

    // return the `title`
    return title;
  }

  
  /**
   * Returns the root of the given `appChild`
   *
   * Example usage:
   *  let screensRoot = getRootOf(APP_SCREENS);
   *
   *
   * @param { Number } appChild - Indirect children of app's container or `this.containerEl`
   * @returns { Elememnt } root - eg. '<div id="screens">' if `appChild` is "screens"
   */
  getRootOf(appChild) {
    // Declare the `root` variable
    let root;

    switch(appChild) {
      case APP_SCREENS:
        root = this.screensEl;
        break;
      case APP_PAGES:
        root = this.pagesEl;
        break;
      case APP_DIALOGS:
        root = this.dialogsEl;
        break;
      case APP_MENUS:
        root = this.menusEl;
        break;
      case APP_TOASTS:
        root = this.toastsEl;
        break;
    }

    // return `root`
    return root;
  }

  /**
   * Method used to update the theme 
   *
   * @param { String } newTheme - """c'mon, this is pretty self-explanatory, isn't it? ;)"""
   * @param { Boolean } notify - if TRUE, a toast will be shown to notify the user of this recent theme update 
   */
  updateTheme(newTheme, notify = false) {
    // do nothing if there's no theme
    // TODO: Make sure the given `newTheme` is supported before proceeding
    if (typeof newTheme === 'undefined' || newTheme === null) { return }

    // set the app's theme to the `newTheme`
    this.theme = newTheme;

    // update the theme
    this.liveStorage.setItem('theme', newTheme, true);

    // remove all themes in `containerEl`
    this.containerEl.classList.remove(CLASSIC_THEME, LIGHT_THEME, DARK_THEME);
    // update the theme
    this.containerEl.classList.add(newTheme);


    // If notify is TRUE...
    if (notify) {
      // ...show toast
      this.showToast({
        message: `Theme updated to <b>${newTheme}</b>`,
        type: SUCCESS_TOAST_TYPE,
        timeout: DEFAULT_TOAST_TIMEOUT 
      }, true);
    }


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[2m[updateTheme]: newTheme => ${newTheme}\x1b[0m`);

  }


  /**
   * Method used to update the app's language with the given `newLang`
   *
   * Example usage:
   *   updateLang('fr'); // <- to change the app's language to French
   *
   * @param { String } newLang - """c'mon, this is also pretty self-explanatory, isn't it? ;)"""
   * @param { Boolean } notify - if TRUE, a toast will be shown to notify the user of this recent lang update 
   */
  updateLang(newLang, notify = false) {
    // do nothing if there's no new language id (i.e. newLang)
    // TODO: Make sure the given `newLang` is supported before proceeding
    if (typeof newLang === 'undefined') { return }
    
    // set the app's lang to the `newLang`
    this.lang = newLang ?? this.lang;

    // update the lang in our live storage
    this.liveStorage.setItem('lang', newLang, true);

    // update the root's document element
    this.root.documentElement.lang = newLang;

    // update the `lang` attribute in `containerEl`
    this.containerEl.lang = newLang;

    // If notify is TRUE...
    if (notify) {
      // show toast
      this.showToast({
        message: `Language updated to <b>${newLang}</b>`,
        type: SUCCESS_TOAST_TYPE,
        timeout: DEFAULT_TOAST_TIMEOUT 
      }, true);
    }

  }

  /**
   * Notifies the app that a page has been updated recently
   * NOTE: This method makes hides all pages except the current, based on the current page's type. 
   *
   * @param { String } currentPage - the current page of the app (e.g. 'home', 'search', 'movies', etc)
   */
  notifyPageUpdate(currentPage = this.currentPage) {
    // get the type of this page as `pageType`
    let pageType = this.getPageTypeOf(currentPage);

    // get all pages of the given `pageType` as `pageList`
    let pageList = this.getAllPagesOf(pageType); 

    // loop through the `pageList`,
    // for each page element as `pageEl`
    for (let pageEl of pageList) {
      // If the id of this page element is the same as the current page's...
      if (pageEl.id === `${currentPage}Page`) {
        // ...create an [opened] property on the page
        pageEl.setAttribute('opened', '');
        

      } else { // <- not the same page
        // So, remove any current [opened] property
        pageEl.removeAttribute('opened');
      }

      // if the 
      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[46;30m[notifyPageUpdate] (2):  pageEl => \x1b[0m`, pageEl);
    }

    // Set or remove the `opened` property the page's `<aside>` element relative to the current `pageType` ;)
    (pageType === 'aside') ? this.asidePagesEl.setAttribute('opened', '') : this.asidePagesEl.removeAttribute('opened');


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[46;30m[notifyPageUpdate] (1): currentPage => ${currentPage} \x1b[0m`);

   }


  /**
   * Update the app's nav links using the `currentPage` and `currentView`
   *
   * @param { String } currentPage
   * @param { String } currentView
   */
  notifyNavLinks(currentPage = this.currentPage, currentView = this.currentView) {
    // get all the nav links as `navLinks`
    let navLinks = this.getAllNavLinks();

    // loop through each nav link as `navLinkEl`
    navLinks.forEach((navLinkEl) => {
      // If the class list of this `navLinkEl` includes the current page..
      if (navLinkEl.classList.value.indexOf(currentPage) !== -1) {
        // ..activate this nav link element
        navLinkEl.setAttribute('active', '');

      }else {
        // remove any current `active` property
        navLinkEl.removeAttribute('active');
      }
    });


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40m\x1b[32m[notifyNavLinks](1): currentPage => ${currentPage} & currentView => ${currentView}\x1b[0m`);
    console.log(`\x1b[40m\x1b[32m[notifyNavLinks](2): navLinks => \x1b[0m`, navLinks);
  }

  /** 
   * A SIMPLE method that is used to navigate or change the app's route to the given `url` 
   *
   * @param { String } url - The url to navigate to (eg. 'movies', 'favorites/series')
   */
  navigate(url) {
    location.href = this.constructor.config.baseUrl + url;
  }


  /**
   * Method used to display a toast with the given `params`
   * NOTE: The `params` must have at least a `message
   * TODO: Rename `params` to `bread` for fun #lol ;)
   *
   * @param { Object } params - supported keys are `message`, `type` and `timeout`
   * @param { Boolean } force - if TRUE, the new toast will override any active toast.
   */
  showToast(params, force = false) {
    // do nothing if the app is toasting and `force` is FALSE ;)
    if (this.#toasting && !force) { return }

    // Clearing / reseting up our toast...
    this._clearToast();

    // set toasting to TRUE
    this.#toasting = true;


    // get the toast `message` from `params`
    let message = params.message; 
    // get the toast `type` from `params`
    let type = (typeof params.timeout !== 'undefined') ? params.type : DEFAULT_TOAST_TYPE; 

    // get the toast `timeout` from `params`,
    let timeout = (typeof params.timeout !== 'undefined') ? params.timeout : DEFAULT_TOAST_TIMEOUT;

    // get a toast html template with these params as `toastHtmlTemplate`
    let toastHtmlTemplate = this._getToastHtmlTemplate(type, message);

    // insert `toastHtmlTemplate` to `toastsEl`
    this.toastsEl.insertAdjacentHTML('beforeend', toastHtmlTemplate);

    // get the added toast element as `toastEl`
    let toastEl = this.toastsEl.querySelector('.toast');

    // unhide the `toastEl`
    this.toastsEl.hidden = false;


    // set / create a new `_toastTimer`
    this._toastTimer = setTimeout(() => {
      // Clearing / reseting up our toast...
      this._clearToast();

      // set toasting to FALSE
      this.#toasting = false;

      // remove the toast element
      toastEl.remove();

      // hide the `toastsEl`
      this.toastsEl.hidden = true;

      // remove the 'fade-
    }, timeout);

  }

  /**
   * Method used to get all the app's current nav link elements
   *
   * @param { Boolean } includeLogo - If TRUE, the logo will be included to the list
   *
   * @returns { Array[Element] } navLinks
   */
  getAllNavLinks(includeLogo = false) {
    // Initialize the `navLinks` variable
    let navLinks = [];

    // if the app's pages element exists...
    if (this.pagesEl) {
      // ...select all the elements in main pages with `nav-link` in their class list as `links`
      let links = this.pagesEl.querySelectorAll((!includeLogo) ? '.nav-link:not(.logo)' : '.nav-link');

      // update the `navLinks`
      navLinks = [...links];
    }

    // return the `navLinks`
    return navLinks;
  }


  /**
   * Checks if the given `page` is valid or supported by this App
   *
   * @param { String } page
   *
   * @returns { Boolean } Returns TRUE, if the page is supported
   */
  isValidPage(page) {
    // HACK: if the page is empty...make it 'home'
    // page = (!page.length) ? 'home' : page;

    return (this.getSupportedPages(true).indexOf(page) !== -1) ? true : false;
  }

  /**
   * Checks if the given `page` has been loaded already
   *
   * @param { String } page
   *
   * @returns { Boolean } Returns TRUE, if the `page` has been loaded already
   */
  isLoadedPage(page) {
    // HACK: if the page is empty...make it 'home'
    // page = (!page.length) ? 'home' : page;

    // HACK: Just check if this has this page as a property 
    return this.hasOwnProperty(`${page}Page`);
  }


  /**
   * Returns the type of the given `page`
   *
   * @param { String } pageId - id of the page
   * 
   * @returns { String } 
   */
  getPageTypeOf(pageId) {
    return this.getSupportedPages().filter((page) => page.id === pageId)[0].type;
  }



  

  /* >> PUBLIC SETTERS << */
  
  /**
   * Updates the current screen of the app with the given `screen`
   *
   * @param { String } screen - name of the page
   */
  set currentScreen(screen) {
    this._currentScreen = screen;
    // update the live storage accordingly
    this.liveStorage?.setItem('screen', screen, true);
  }

  /**
   * Updates the current page of the app with the given `page`
   *
   * @param { String } page - name of the page
   */
  set currentPage(page) {
    this._currentPage = page;
    // update the live storage accordingly
    this.liveStorage?.setItem('page', page, true);
  }


  /**
   * Updates the current view of the app with the given `view`
   *
   * @param { String } view - name of the view
   */
  set currentView(view) {
    this._currentView = view;
    // update the live storage accordingly
    this.liveStorage?.setItem('view', view, true);
  }


  /**
   * Updates the current params of the app with the given `params`
   *
   * @param { URLSearchParams } params
   */
  set currentParams(params) {
    this._currentParams = params;
    // update the live storage accordingly
    this.liveStorage?.setItem('params', params.toString(), true);
  }


  /* >> PUBLIC GETTERS << */

  
  /**
   * Returns the current menus element of the given `part`
   *
   * @param { String } part - The part of the app where the menu will be shown (eg. MAIN_PART, ASIDE_PART, FULL_PART)
   *
   * @returns { Element } - The current menus element of the given `part`
   */
  getCurrentMenusElement(part = DEFAULT_PART) {
    return (part === MAIN_PART) ? this.mainMenusEl : (part === ASIDE_PART ? this.asideMenusEl : this.menusEl);
  }


  /**
   * Returns the current menu element of the given `id` and `part`
   *
   * @param { String } menuId - The id of the menu to get
   * @param { String } part - The part of the app where the menu will be shown (eg. MAIN_PART, ASIDE_PART, FULL_PART)
   *
   * @returns { Element } - The current menu element of the given `id` and `part`
   */
  getMenuById(menuId, part = DEFAULT_PART) {
    return this.getCurrentMenusElement(part).querySelector(`menu[data-id="${menuId}"]`);
  }

  /**
   * Returns all menu item buttons of the given `menuElement`
   *
   * @returns { NodeList[Element] } 
   */
  getMenuItemButtonsOf(menuElement) {
    return menuElement.querySelectorAll(`li.menu-item > button, li.menu-item > a[role="button"]`);
  }


  /**
   * Returns the current dialog element of the given `id` and `part`
   *
   * @param { String } dialogId - The id of the dialog to get
   * @param { String } part - The part of the app where the dialogwill be shown (eg. MAIN_PART, ASIDE_PART, FULL_PART)
   *
   * @returns { Element } - The current dialogelement of the given `id` and `part`
   */
  getDialogById(dialogId, part = DEFAULT_PART) {
    return this.getCurrentDialogsElement(part).querySelector(`.dialog[data-id="${dialogId}"]`);
  }


  /**
   * Returns the current dialogs element of the given `part`
   *
   * @param { String } part - The part of the app where the dialog will be shown (eg. MAIN_PART, ASIDE_PART, FULL_PART)
   *
   * @returns { Element } - The current dialogs element of the given `part`
   */
  getCurrentDialogsElement(part = DEFAULT_PART) {
    return (part === MAIN_PART) ? this.mainDialogsEl : (part === ASIDE_PART ? this.asideDialogsEl : this.dialogsEl);
  }


  /**
   * Returns the id of the current menu
   * NOTE: This is the menu that has an `opened` attribute,
   * and is shown in the default or full part of the app.
   * 
   * @returns { String } - The id of the opened main menu
   */
  get currentMenuId() {
    return this.menusEl.querySelector('menu[opened]')?.dataset?.id;
  }
  

  /**
   * Returns the id of the currently opened menu in the main part of the app
   *
   * @returns { String }
   */
  get currentMainMenuId() {
    return this.mainMenusEl.querySelector('menu[opened]')?.dataset?.id;
  }


  /**
   * Returns the id of the currently opened menu in the aside part of the app
   *
   * @returns { String } - The id of the opened aside menu
   */
  get currentAsideMenuId() {
    return this.asideMenusEl.querySelector('menu[opened]')?.dataset?.id;
  }
  

  
  /**
   * Returns TRUE if the current device is mobile, FALSE if desktop
   *
   * @returns { Boolean }
   */
  get isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
  }

  
  /**
   * Returns the main backdrop element.
   * NOTE: This is the `<div class="backdrop">` element inside the `<main>` element.
   *
   * @returns { Element } - The main backdrop element
   */
  get mainBackdropEl() {
    return this.mainPagesEl.querySelector('.backdrop');
  }

  /**
   * Returns the aside backdrop element.
   * NOTE: This is the `<div class="backdrop">` element inside the `<aside>` element.
   *
   * @returns { Element } - The main backdrop element
   */
  get asideBackdropEl() {
    return this.asidePagesEl.querySelector('.backdrop');
  }
  

  /**
   * Returns the default backdrop element.
   * NOTE: This is the `<div id="backdrop">` element inside the `<body>` element.
   *
   * @returns { Element } - The main backdrop element
   */
  get backdropEl() {
    return this.shadowRoot.getElementById('backdrop');
  }



  /**
   * Returns the `<div id="progressBar">` element
   *
   * @returns { Element } 
   */
  get progressBarEl() {
    return this.shadowRoot.getElementById('progressBar');
  }


  /**
   * Returns the current screen of the app
   *
   * @returns { String }
   */
  get currentScreen() {
    return this._currentScreen;
  }

  /**
   * Returns the current page of the app 
   *
   * @returns { String } 
   */
  get currentPage() {
    return this._currentPage;
  }


  /**
   * Returns the current view of the app 
   *
   * @returns { String } 
   */
  get currentView() {
    return this._currentView;
  }


  /**
   * Returns the current params of the app
   *
   * @returns { URLSearchParams }
   */
  get currentParams() {
    return this._currentParams;
  }

  /**
   * Returns the app's `<div id="container">` element in the shadow root
   *  
   * @returns { Element } containerEl
   */
  get containerEl() {
    return this.shadowRoot.getElementById('appContainer');
  }

  /**
   * Returns the top-level or root element of this app.
   *
   * @returns { HTMLDocument } 
   */
  get root() {
    return document;
  }

  /**
   * Returns the host element of the app.
   * NOTE: This elment holds the shadowRoot
   *
   * @returns { HTMLElement } 
   */
  get host() {
    return this.root.getElementById(this.id);
  }


  /**
   * Returns the shadow root of the app.
   *
   * @returns { ShadowRoot }
   */
  get shadowRoot() {
    return this.host.shadowRoot;
  }
  

  /**
   * Returns the `<head>` element in the app's root or document.
   *
   * @returns { Element } 
  */
  get rootHead() {
    return this.root.getElementsByTagName('head')[0];
  }

  /**
   * Returns the `<template>` element inside the `host`
   *
   * @returns { HTMLTemplateElement } 
   */
  get template() {
    return this.host.querySelector('template');
  }


  /**
   * Returns the app's template contents or 'document-fragment'
   * 
   * @returns { DocumentFragment }
   */
  get documentFragment() {
    return this.template.content.cloneNode(true);
  }


  /**
   * Returns the `<div id="screens">` element from the app's shadow root
   *
   * @returns { Element } 
   */
  get screensEl() {
    return this.shadowRoot.getElementById('screens');
  }


  /**
   * Returns the `<div id="pages">` element from the app's shadow root
   *
   * @returns { Element } 
   */
  get pagesEl() {
    return this.shadowRoot.getElementById('pages');
  }


  /**
   * Returns the `<div id="dialogs">` element from the app's shadow root
   *
   * @returns { Element } 
   */
  get dialogsEl() {
    return this.shadowRoot.getElementById('dialogs');
  }


  /**
   * Returns the main dialogs element.
   *
   * @returns { Element } - The main dialogs element
   */
  get mainDialogsEl() {
    return this.mainPagesEl.querySelector('.dialogs');
  }


  /**
   * Returns the aside dialogs element.
   *
   * @returns { Element } - The aside dialogs element
   */
  get asideDialogsEl() {
    return this.asidePagesEl.querySelector('.dialogs');
  }


  /**
   * Returns the `<div id="menus">` element from the app's shadow root
   *
   * @returns { Element } 
   */
  get menusEl() {
    return this.shadowRoot.getElementById('menus');
  }


  /**
   * Returns a list of all the main close menu icon buttons.
   * NOTE: This is the `<button class="icon-button">` element inside the `<li role="close-menu">` of all main menus.
   *
   * @returns { NodeList } - A list of all the main close-menu icon-buttons
   */
  get mainCloseMenuIconButtons() {
    return this.mainMenusEl.querySelectorAll('li[role="close-menu"] > .icon-button');
  }

  /**
   * Returns a list of all the aside close menu icon buttons.
   * NOTE: This is the `<button class="icon-button">` element inside the `<li role="close-menu">` of all aside menus.
   *
   * @returns { NodeList } - A list of all the aside close-menu icon-buttons
   */
  get asideCloseMenuIconButtons() {
    return this.asideMenusEl.querySelectorAll('li[role="close-menu"] > .icon-button');
  }


  /**
   * Returns a list of all the close menu icon buttons.
   * NOTE: This is the `<button class="icon-button">` element inside the `<li role="close-menu">` of all menus.
   *
   * @returns { NodeList } - A list of all the close-menu icon-buttons
   */
  get closeMenuIconButtons() {
    return this.menusEl.querySelectorAll('li[role="close-menu"] > .icon-button');
  }

  /**
   * Returns the main menus element.
   * NOTE: This is the `<div class="menus">` element inside the `<main>` element.
   *
   * @returns { Element } - The main menus element
   * @private
   */
  get mainMenusEl() {
    return this.mainPagesEl.querySelector('.menus');
  }

  /**
   * Returns the aside menus element.
   * NOTE: This is the `<div class="menus">` element inside the `<aside>` element.
   *
   * @returns { Element } - The aside menus element
   * @private
   */
  get asideMenusEl() {
    return this.asidePagesEl.querySelector('.menus');
  }

  /**
   * Returns the `<div id="toasts">` element from the app's shadow root
   *
   * @returns { Element }
   */
  get toastsEl() {
    return this.shadowRoot.getElementById('toasts');
  }


  /**
   * Returns the `<main>` element in `pagesEl`
   *
   * @returns { Element }
   */
  get mainPagesEl() {
    return this.pagesEl.querySelector('main');
  }

  /**
   * Returns the `<aside>` element in `pagesEl`
   *
   * @returns { Element }
   */
  get asidePagesEl() {
    return this.pagesEl.querySelector('aside');
  }


  
  /**
   * Returns the navBar element in `pagesEl`
   *
   * @return { Element }
   */
  get navBarEl() {
    return this.pagesEl.querySelector('.nav-bar');
  }

  /**
   * Returns the side bar element in `pagesEl`
   *
   * @return { Element }
   */
  get sideBarEl() {
    return this.pagesEl.querySelector('#sideBar');
  }





  /**
   * Returns TRUE if the main pages element (i.e. `mainPagesEl`) 
   * of the app has been created.
   *
   * @returns { Boolean }
   */
  get hasMainPages() {
    return (!!this.mainPagesEl) ? true : false;
  }


  /**
   * Returns TRUE if the current layout of the app is `narrow`
   *
   * @returns { Boolean }
   */
  get isNarrowLayout() {
    return (this.#_currentLayout === 'narrow') ? true : false; // <- #NN ik ;)
  }

  /**
   * Returns TRUE if the current layout of the app is `wide`
   *
   * @returns { Boolean }
   */
  get isWideLayout() {
    return (this.#_currentLayout === 'wide') ? true : false; // <- #NN ik ;)
  }


  /**
   * Method used to get a list of all pages of the specified `pageType`
   * 
   * @param { String } pageType - the type of the page ('main' or 'aside')
   *
   * @returns { NodeList }
   */
  getAllPagesOf(pageType = 'main') {
    return (pageType === 'aside') ? this.asidePagesEl.querySelectorAll('.page') : this.mainPagesEl.querySelectorAll('.page') 
  }

  /* >> Private Methods << */
  
  /**
   * Clears our toast.
   * This method will remove any `<div class="toast">` element from `toastsEl`
   */
  _clearToast() {
    // clear any active `toastTimer` and `toastOutTimer`
    clearTimeout(this._toastTimer);
    clearTimeout(this._toastOutTimer);

    // empty `toastsEl`
    this.toastsEl.innerHTML = '';

    // hide `toastsEl`
    this.toastsEl.hidden = true;
  }


  // =========== Dynamic HTML Templates =============== //

  
  /**
   * Returns the html template of the app's menu 
   *
   * @param { Object } data - The data to use for the menu
   *
   * @param { String } data.title - The title of the menu
   * @param { String } data.items - The items of the dialog
   * @param { Boolean } data.noDivider - Whether to hide the divider between the buttons
   * 
   * @returns { HTMLTemplate }
   */
  _getMenuHTMLTemplate(data) {
    const jump = (event) => alert(event);

    return html`
      <!-- Menu -->
      <menu data-id="${data.id ?? 'menu'}" class="menu vertical flex-layout slide-from-down" hidden>
        <!-- Close Menu + Icon Button -->
        <li role="close-menu">
          <button class="icon-button close-btn">
            <span class="material-icons icon">arrow_back_ios</span>
          </button>
        </li>
        
        ${data.items.map((item, index) => html`

          <li title="${item.text}" class="menu-item">
            <a role="button" tabindex="${index}" href="${item.link}">
              <span class="material-icons icon">${item.icon}</span>
              <span>${item.text}</span>
            </a>
          </li>
        `)}

      </menu>
      <!-- End of Menu -->
    `;
  }


  /**
   * Returns the html template of the app's dialog
   *
   * @param { Object } data - The data to use for the dialog
   *
   * @param { String } data.title - The title of the dialog
   * @param { String } data.message - The message of the dialog
   * @param { String } data.confirmBtnText - The text of the confirm button
   * @param { String } data.cancelBtnText - The text of the cancel button
   * @param { Boolean } data.noDivider - Whether to hide the divider between the buttons
   * @param { Function } data.onConfirm - The function to call when the confirm button is clicked
   * @param { Function } data.onCancel - The function to call when the cancel button is clicked
   * 
   * @returns { HTMLTemplate }
   */
  _getDialogHTMLTemplate(data) {
    return html`
      <!-- Dialog -->
      <div data-id="${data.id ?? 'dialog'}" class="dialog slide-from-up" hidden>
        <!-- Dialog Title -->
        <h2 class="dialog-title">${data.title}</h2>
        <!-- Dialog Message -->
        <p class="dialog-msg">${data.message}</p>

        <!-- Dialog Buttons -->
        <div class="dialog-buttons">
          <!-- Confirm Button -->
          <a role="button" 
             tabindex="0" 
             class="dialog-button confirm-btn" 
             default 
             autofocus>
            ${data.confirmBtnText ?? 'Confirm'}
          </a>

          <!-- Divider -->
          <span class="divider horizontal left" ${data.noDivider ? 'hidden' : ''}></span>

          <!-- Cancel Button -->
          <a role="button" 
             tabindex="0" 
             class="dialog-button cancel-btn" 
             confirm>
            ${data.cancelBtnText ?? 'Cancel'}
          </a>

        </div>
        <!-- End of Dialog Buttons -->

      </div>
      <!-- End of Dialog -->
    `;
  }


  /**
   * Returns the html template of a toast based on the specified `type` and `message`
   *
   * @param { String } type
   * @param { String } message
   *
   * @returns { HTMLTemplate }
   */
  _getToastHtmlTemplate(type, message) {
    return html`
      <!-- Toast -->
      <div class="toast pop-in fade-in flex-layout horizontal centered">
        <!-- Emoji -->
        <span class="toast-emoji ${type}" ${(type === DEFAULT_TOAST_TYPE) ? 'hidden' : ''}></span>
        <!-- Message -->
        <span class="toast-msg">${message}</span>
      </div>
      <!-- End of Toast -->
    `;
  }


  /**
   * Returns the html template of the app's pages
   *
   * @returns { HTMLTemplate }
   */
  _getPagesHtmlTemplate() {
    return html`
      <!-- NOTE: SideBar will be injected here -->

      <!-- Main Pages -->
      <main class="flex-layout vertical">

        <!-- Pages-Wrapper -->
        <div class="pages-wrapper"></div>
        <!-- End of Pages-Wrapper -->
  
        <!-- NOTE: NavBar will be injected here -->

        <!-- Backdrop of MAIN -->
        <div class="backdrop" fit hidden></div>

        <!-- Menus of MAIN -->
        <div class="menus" fit hidden></div>

        <!-- Dialogs of MAIN -->
        <div class="dialogs" fit hidden></div>

        <!-- Toasts of MAIN -->
        <div class="toasts" fit hidden></div>

  
      </main>
      <!-- End of Main Pages -->


      <!-- Aside Pages -->
      <aside class="flex-layout vertical centered">
        <!-- Pages-Wrapper -->
        <div class="pages-wrapper" fit></div>
        <!-- End of Pages-Wrapper -->


        <!-- Outlined App Logo -->
        <span class="app-logo" outlined></span>


        <!-- Backdrop of ASIDE -->
        <div class="backdrop" fit hidden></div>

        <!-- Menus of ASIDE -->
        <div class="menus" fit hidden></div>

        <!-- Dialogs of ASIDE -->
        <div class="dialogs" fit hidden></div>

        <!-- Toasts of ASIDE -->
        <div class="toasts" fit hidden></div>

        <!-- Left - Vertical Divider -->
        <span class="divider vertical left"></span>

      </aside>
      <!-- End of Aside Pages -->
  `;

  }

  

  /**
   * Returns the navBar's html template based on the given `orientation`
   *
   * @param { String } orientation - supported orientations are 'vertical' and 'horizontal'
   * @returns { HTMLTemplate }
   */
  _getNavbarHtmlTemplate(orientation = this._navbarOrientation) {
    // TODO: Create a navbar data object named `navBarData` 
    // (eg. [{id: 'home', title: 'Home', link: './', icon: 'house'}]),
    // and use it for multiple anchor/nav-link propagation below


    // Create a horizontal navBar html template as `horizNavbarHtmlTemplate`
    let horizNavbarHtmlTemplate = html`
      <nav class="nav-bar slide-from-down horizontal flex-layout center">
        <!-- Top - Horizontal Divider -->
        <span class="divider horizontal top"></span>

        <!-- TODO: Loop through the [primaryPages] array to display each nav link ;) -->

        <!-- Home - NavLink -->
        <a title="${this.i18n.getString('homeHint')}" href="./" class="${HOME_PAGE} nav-link">
          <span class="material-icons icon">home</span>
          <span class="label nav-label">${this.i18n.getString('home')}</span>
        </a>

        <!-- Movies - NavLink -->
        <a title="${this.i18n.getString('moviesHint')}" href="./movies" class="${MOVIES_PAGE} nav-link">
          <span class="material-icons icon">movie</span>
          <span class="label nav-label">${this.i18n.getString('movies')}</span>
        </a>
        
        <!-- Series - NavLink -->
        <a title="${this.i18n.getString('seriesHint')}" href="./series" class="${SERIES_PAGE} nav-link">
          <span class="material-icons icon">theaters</span>
          <span class="label nav-label">${this.i18n.getString('tvShows')}</span>
        </a>
        
        <!-- Favorites - NavLink -->
        <a title="${this.i18n.getString('favoritesHint')}" href="./favorites" class="${FAVORITES_PAGE} nav-link">
          <span class="material-icons icon">star_border</span>
          <span class="label nav-label">${this.i18n.getString('favorites')}</span>
        </a>
        
        <!-- Profile / Account Info - NavLink -->
        <a title="${this.i18n.getString('profileHint')}" href="./profile" class="${PROFILE_PAGE} nav-link">
          <span class="material-icons icon">person</span>
          <span class="label nav-label">${this.i18n.getString('profile')}</span>
        </a>

      </nav>
    `;


    // Create a veritcal navBar html template as `vertNavbarHtmlTemplate`
    // NOTE: This template has a `sideBar` id
    let vertNavbarHtmlTemplate = html`
      <nav id="sideBar" class="nav-bar slide-from-left vertical flex-layout center">
        <!-- Logo | Icon-Wrapper -->
        <a title="${this.name}" class="nav-link logo icon-wrapper" active>
          <!-- App Logo -->
          <span class="app-logo"></span>
        </a>

        <span flex hidden></span>

        <!-- Side Bar Content -->
        <div class="vertical flex-layout flex centered" content noscrollbars>

          <!-- TODO: Loop through the [primaryPages] array to display each nav link ;) -->

          <!-- Home - NavLink -->
          <a title="${this.i18n.getString('homeHint')}" href="./" class="${HOME_PAGE} nav-link">
            <span class="material-icons icon">home</span>
            <span class="label nav-label">${this.i18n.getString('home')}</span>
          </a>

          <!-- Search / Explore - NavLink -->
          <a title="${this.i18n.getString('searchHint')}" href="./search" class="${SEARCH_PAGE}  nav-link">
            <span class="material-icons icon">search</span>
            <span class="label nav-label">${this.i18n.getString('search')}</span>
          </a>

          <!-- Movies - NavLink -->
          <a title="${this.i18n.getString('moviesHint')}" href="./movies" class="${MOVIES_PAGE} nav-link">
            <span class="material-icons icon">movie</span>
            <span class="label nav-label">${this.i18n.getString('movies')}</span>
          </a>
         
          <!-- Series - NavLink -->
          <a title="${this.i18n.getString('seriesHint')}" href="./series" class="${SERIES_PAGE} nav-link">
            <span class="material-icons icon">theaters</span>
            <span class="label nav-label">${this.i18n.getString('tvShows')}</span>
          </a>

          <!-- Favorites - NavLink -->
          <a title="${this.i18n.getString('favoritesHint')}" href="./favorites" class="${FAVORITES_PAGE} nav-link">
            <span class="material-icons icon">star_border</span>
            <span class="label nav-label">${this.i18n.getString('favorites')}</span>
          </a>

          <span class="divider horizontal"></span>

          <!-- Account - NavLink -->
          <a title="${this.i18n.getString('accountHint')}" href="./account" class="${ACCOUNT_PAGE} nav-link">
            <span class="material-icons icon">settings</span>
            <span class="label nav-label">${this.i18n.getString('account')}</span>
          </a>

        </div>
        <!-- End of Side Bar Content -->

        <span flex hidden></span>

        <!-- Profile / Account Info - NavLink -->
        <a title="${this.i18n.getString('profileHint')}" href="./profile" class="${PROFILE_PAGE} nav-link">
          <span class="material-icons icon">person</span>
          <span class="label nav-label">${this.i18n.getString('profile')}</span>
        </a>

        <!-- Log Out - NavLink -->
        <a title="Log out" class="nav-link" role="icon-button" hidden>
          <span class="material-icons icon">power_settings_new</span>
        </a>

        <!-- Right - Vertical Divider -->
        <span class="divider vertical right"></span>

      </nav>
    `;


    // return the correct html template
    return (orientation === 'horizontal') ? horizNavbarHtmlTemplate : vertNavbarHtmlTemplate;

  }


  // ======== END of Dynamic HTML Templates =========  //

  /**
   * Handler that is called whenever the `labelsHidden` property changes
   *
   * @param { Boolean } labelsHidden
   * @param { Boolean } oldValue
   */
  _handleLabelsHiddenChange(labelsHidden, oldValue) {
    // Add or remove `no-labels` property / attribute on or from the pages element accordingly; )
    labelsHidden ? this.pagesEl.setAttribute('nolabels', '') : this.pagesEl.removeAttribute('nolabels');

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[32m[_handleLabelsHiddenChange]: labelsHidden => ${labelsHidden} & oldValue => ${oldValue}\x1b[0m`);
  }

  /**
   * Handler that is called whenever the `_pageLoading` property changes
   *
   * @param { Boolean } pageLoading
   */
  _handlePageLoadingChange(pageLoading) {
    // If the a page is loading...
    if (pageLoading) {
      // show the progress bar
      this.showProgressBar(true); // <- true = intermediate

      // TODO: disabled all nav links and/or pointer events on current page
      
    }else { // <- no page is loading
      // hide the progress bar
      this.hideProgressBar();
    }


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[33m[_handlePageLoadingChange]: pageLoading => ${pageLoading}\x1b[0m`);
  }
  
  /**
   * Handler that is called whenever the browser's URL or location changes
   *
   * @param { String } location
   * @param { Event } event
   */
  _handleNavigation(location, event) {

    // get the page route as `page`
    let page = getPageRoute(location, BASE_DIR);

    // get the view route as `view`
    let view = getViewRoute(location, BASE_DIR);

    // get the search params as `params`
    let params = getSearchParams(location, BASE_DIR);

    // create a url with the `location`
    let url = new URL(location);

    // check for screens
    let isScreens = (!page.length && !view.length) ? true : false; 

    // check for pages
    let isPages = (this.mainPagesEl) ? true : false;

    // update the current page, view and params
    this.currentPage = (!this.currentScreen && page.trim().length === 0) ? 'home' : page;
    this.currentView = (!this.currentScreen && view.trim().length === 0) ? 'default' : view;
    this.currentParams = params;
    
    // if we are most likely on a splash or welcome screen...
    if (isScreens && [SPLASH_SCREEN, WELCOME_SCREEN].indexOf(this.currentScreen) !== -1) {
      // ...navigate the screens using the params
      this._navigateScreens(params);

    } else if (isPages) { // <- we are most likely on the main pages view
      // ...notify the nav links
      this.notifyNavLinks();

      // navigate the pages using the page, view and params
      this._navigatePages(this.currentPage, this.currentView, params);
    }


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[35m[_handleNavigation](1): location => ${location} & event => \x1b[0m`, event);
    console.log(`\x1b[35m[_handleNavigation](2): page => ${page} (length: ${page.length}) & view => ${view} & params => \x1b[0m`, params.toString());
    console.log(`\x1b[35m\n[_handleNavigation](3): 
      + currentScreen => ${this.currentScreen} & 
      + currentPage => ${this.currentPage} & 
      + currentView => ${this.currentView} & 
      + params => \x1b[0m`, params);

  }

  /**
   * Method used to navigate through screens,
   * using the specified `params`
   *
   * @param { Object } params
   */
  _navigateScreens(params) {
    // NOTE: Using switch for scalability reasons ;)
    switch (this.currentScreen) {
      case SPLASH_SCREEN:
        break;
      case WELCOME_SCREEN:
        // get the change setting param as `changeSetting`
        let changeSetting = params.get('change');
        // update the welcomeScreen `changeSetting` property
        this.welcomeScreen.changeSetting = (changeSetting?.length) ? changeSetting : '';
        // open the setting container if there's a change setting 
        this.welcomeScreen.settingsOpened = (changeSetting?.length) ? true : false;
        break;
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[42m\x1b[30m[_navigateScreens]: currentScreen => ${this.currentScreen} & params => \x1b[0m`, params);

  }


  
  /**
   * Method used to navigate through pages,
   * using the specified `page`, `view` and `params`
   *
   * @param { String } page
   * @param { String } view
   * @param { Object } params
   */
  _navigatePages(page, view, params) {
    // do nothing (for now), if the page is not found or not valid
    if (!this.isValidPage(page)) { return }

    // Initialize the `pageObject` variable
    let pageObject = null;


    // Checking page availability...
    
    // if the page has *NOT* been loaded...
    if (this.isLoadedPage(page) === false) {
      // start loading the page
      this._pageLoading = true;
      
      //let loadedPages = await this._loadPages([page], PAGES_DIR); 
      this._loadPages([page], PAGES_DIR).then((loadedPages) => {
        // ...stop loading the page
        this._pageLoading = false;

        // Initialize and open the page
        pageObject = this._initPage(loadedPages[0], view, true);

        // update the page's view
        pageObject.view = view;

        // update the page's params
        pageObject.params = params;


        // notify page update
        this.notifyPageUpdate();

        // notify the view update
        pageObject.notifyViewUpdate();

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[3m[_navigatePages] (1): page loaded!!! view => ${view} & pageObject => \x1b[0m`, pageObject);
      });
       
    }else { // <- page has already been loaded
      // get the page object
      pageObject = this[`${page.toCamelCase()}Page`];

      // update the page's view
      pageObject.view = view;




      // update the page's params
      pageObject.params = params;
      
      // If the `pageObject` is not attached to this App...
      if (!pageObject.isAttached) {
        // ...open the page
        pageObject.open();
      }else {
        // just show the page 
        pageObject.show();
      }

      // notify page update
      this.notifyPageUpdate();

      // notify the view update
      pageObject.notifyViewUpdate();

     
    }


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[47m\x1b[30m[_navigatePages] (2): view => ${view} & pageObject => \x1b[0m`, pageObject);
    console.log(`\x1b[47m\x1b[30m[_navigatePages] (3): params.get('vid') => ${params.get('vid')}\x1b[0m`);

  }

  /**
   * Handler that is called whenever an item changes in `liveStorage`
   * 
   * @param { Array[Object] } changedStorageItems
   */
  _handleChangedStorageItems(changedStorageItems) {

    // DEBUG [4dbsmaster]: tell me about these changed storage items ;)
    console.log(`\x1b[33m[_handleChangedStorageItems](1): this.theme => ${this.theme} & this.lang => ${this.lang}\x1b[0m`);

    // loop through the changed storage items
    changedStorageItems.forEach((storageItem) => {

      if (storageItem.key === 'theme') {
        // get the new theme from the storage as `newTheme`
        let newTheme = storageItem.value;

        // update the app's theme
        this.updateTheme(newTheme);

        // call the `onThemeUpdated()` method
        this.onThemeUpdated(newTheme);
      }


      if (storageItem.key === 'lang') {
        // get the new lang from the storage as `newLang`
        let newLang = storageItem.value;
        
        // update the app's lang
        this.updateLang(newLang);

        // call the `onLangUpdated()` method
        this.onLangUpdated(newLang);
      }

    });


    // DEBUG [4dbsmaster]: tell me about these changed storage items ;)
    console.log(`\x1b[33m[_handleChangedStorageItems](2): changedStorageItems => \x1b[0m`, changedStorageItems);
  }

  /**
   * Handler that is called whenever the app's screen changes to a narrow layout.
   *
   * @param { Boolean } firstQuery
   */
  _handleNarrowLayout(firstQuery) {
    // update the private `#_currentLayout` variable to `narrow`
    this.#_currentLayout = 'narrow';

    // IDEA: Replace the app's vertical navBar with a horizontal navBar

    // if the main pages elements are displayed...
    if (this.mainPagesEl) {
      // ...replace the 'horizontal' class of the main element w/ 'vertical'
      // this.mainPagesEl.classList.replace('horizontal', 'vertical');

      // remove the current navBar element
      this.navBarEl.remove();

      // get the navbar's *horizontal* html template as `navbarHtml`
      let navbarHtml = this._getNavbarHtmlTemplate('horizontal');

      // append / insert the `navbarHtml` into `mainPagesEl` (beforeend)
      this.mainPagesEl.insertAdjacentHTML('beforeend', navbarHtml);

      // notify the nav links
      this.notifyNavLinks();
    }
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[2;35m[_handleNarrowLayout]: firstQuery ? ${firstQuery}\x1b[0m`);
  }


  /**
   * Handler that is called whenever the app's screen changes to a wide layout.
   *
   * @param { Boolean } firstQuery
   */
  _handleWideLayout(firstQuery) {
    // update the private `#_currentLayout` variable to `wide`
    this.#_currentLayout = 'wide';

    // IDEA: Replace the app's horizontal navBar with a vertical navBar

    // if the main pages elements are displayed...
    if (this.mainPagesEl) {
      // ...replace the 'vertical' class of the main element w/ 'horizontal'
      // this.mainPagesEl.classList.replace('vertical', 'horizontal');

      // remove the current navBar element
      this.navBarEl.remove();

      // get the navbar's *vertical* html template as `sidebarHtml`
      let sidebarHtml = this._getNavbarHtmlTemplate('vertical');

      // append / insert the `sidebarHtml` into `pagesEl` (afterbegin)
      this.pagesEl.insertAdjacentHTML('afterbegin', sidebarHtml);

      // notify the nav links
      this.notifyNavLinks();
    }

    // TODO: Re-install necessary event listeners here (NOT THE BEST WAY IK)


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[2;35m[_handleWideLayout]: firstQuery ? ${firstQuery}\x1b[0m`);
  }

  /**
   * Creates the app
   * NOTE: This method will create a template element with the formatted html from `render()`, 
   *       and add it to the corresponding host in DOM.
   *
   * @private
   */
  #create() {
    // get the formatted html template string from `render()` as `formattedHTML`
    let formattedHTML = this.render();

    // Check if the browser supports the HTML template 
    if ('content' in this.root.createElement('template')) {

      // create a `template` element
      let templateEl = this.root.createElement('template');

      // insert the `formattedHTML` into the `templateEl`
      templateEl.innerHTML = formattedHTML;

      // append this template element to the host
      this.host.append(templateEl);

      // Now, attach a shadow to the app's host element
      this.host.attachShadow({mode: 'open'}); // <- an `open` mode allows JS to modify/update the contents of shadow-root
      
       
      // append this template element inside the body
      // this.root.body.append(templateEl);

    } else { // <- Browser doesn't support HTML template element :(
      // TODO: Find another way to add the app's template content to `host` :/
      
      // DEBUG [4dbsmaster]: tell me about it ;)
      console.warn(`\x1b[34m[#create]: browser doesn't support HTML template\x1b[0m`);
    } 
      

  }

  /**
   * Shows or outpus a welcome message to browser's console
   *
   * @param { String } title
   * @param { String } message
   */
  #showWelcomeMessage(title = APP_NAME, message = "welcome to our muvisho app") {
    // display something like this first: -------------------------------
    console.log(`\x1b[2m${'-'.padEnd(50, ' -')}\x1b[0m`);

    // log the title
    console.log(`%c\`${title}\``, 'color:brown; font-size:40px');
    // log the message
    console.log(`\x1b[1m${message}\x1b[0m`);

    // display something like this last: -------------------------------
    console.log(`\x1b[2;37m${'-'.padEnd(50, ' -')}\n\x1b[0m`);
  }



  /**
   * Method used to render the pages template
   * @private
   */
  #renderPages() {
    // get the pages html template as `pagesHtml`
    let pagesHtml = this._getPagesHtmlTemplate();

    // insert this `pagesHtml` into the pages element
    this.pagesEl.innerHTML = pagesHtml;

    // get the navbar's html template as `navbarHtml`
    let navbarHtml = this._getNavbarHtmlTemplate(this.isNarrowLayout ? 'horizontal' : 'vertical');

    // If the layout is `narrow` ...
    if (this.isNarrowLayout) {
      // ...insert the `navbarHtml` into the `mainPagesEl` before end
      this.mainPagesEl.insertAdjacentHTML('beforeend', navbarHtml);

    } else { // <- layout is `wide`
      // ...insert the `navbarHtml` (or sideBar) into the `pagesEl` after begin
      this.pagesEl.insertAdjacentHTML('afterbegin', navbarHtml);
    }

 

  }

  /**
   * Installs all the event listeners for pages
   * NOTE: This method is called after `#renderPages()` 
   */
  #installPagesEventListeners() {
    // installing event listeners for all `backdrop` elements...
    
    // ...for the `mainBackdropEl`
    this.mainBackdropEl.addEventListener('click', (event) => {
      // get the backdrop element as  backdropEl
      let backdropEl = event.currentTarget;
      
      // If the backdrop is cancelable...
      if (backdropEl.getAttribute('cancelable') === 'true') {
        // ...close any opened main dialog
        
        // close any opened main menu
        this.closeMenu(this.currentMainMenuId, DEFAULT_BACKDROP_TIMEOUT, MAIN_PART);

        // TODO: Close any opened main drawer
        
      }

      // this.toggleMenuById(this.openMainMenuId, DEFAULT_BACKDROP_TIMEOUT, MAIN_PART);
      
      // TODO: Cancel the backdrop element if it has a `cancelable` attribute
      
      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[35m[installPagesEventListeners] (mainBackdropEl): backdropEl => \x1b[0m`, backdropEl, ` & event => `, event);

    });


    // ...for the `asideBackdropEl`
    this.asideBackdropEl.addEventListener('click', (event) => {

      // If the backdrop is cancelable...
      if (event.currentTarget.getAttribute('cancelable') === 'true') {
        // close the currently opened aside menu
        // TODO: Create a `closeMenu()` method & call it here instead
        this.closeMenu(this.currentAsideMenuId, DEFAULT_BACKDROP_TIMEOUT, ASIDE_PART);
      }
    });
     
    // ...for the default `backdropEl`
    this.backdropEl.addEventListener('click', (event) => {

      // If the backdrop is cancelable...
      if (event.currentTarget.getAttribute('cancelable') === 'true') {
        // close the current (default) menu
        // TODO: Create a `closeMenu()` method & call it here instead
        this.closeMenu(this.currentMenuId, DEFAULT_BACKDROP_TIMEOUT, DEFAULT_PART);
      }

    });  
   

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[30m[installPagesEventListeners]: INSTALLING EVENT LISTENERS FOR PAGES !!!!!\x1b[0m`);
  }


  /**
   * Method used to install event listeners on the given `menuElement`
   *
   * @param { Element } menuElement
   * @param { Object } params
   */
  #installMenuEventListeners(menuElement, params, controller) {
    // installing event listeners for all `closeMenu` Icon-Buttons...
    
    // get all the menu-item buttons of the specified
    let menuItemButtons = this.getMenuItemButtonsOf(menuElement);

    // loop through each `menuItemButtons`
    menuItemButtons.forEach((menuItemButton, index) => {
      // get the current item
      const currentItem = params.items[index];
      // if the current item has the `onClick` property..
      if (currentItem.hasOwnProperty('onClick')) {
        // ...listen to the `click` event
        menuItemButton.addEventListener('click', currentItem.onClick.bind(controller)); 
      }

    });


    // ...for the `mainCloseMenuIconButtons`
    this.mainCloseMenuIconButtons.forEach(iconButton => {
      iconButton.addEventListener('click', () => {
        // close the currently opened main menu
        // TODO: Create a `closeMenu()` & call it here instead
        this.closeMenu(this.currentMainMenuId, DEFAULT_MENU_TIMEOUT, MAIN_PART);
      });
    });

    // ...for the `asideCloseMenuIconButtons`
    this.asideCloseMenuIconButtons.forEach(iconButton => {
      iconButton.addEventListener('click', () => {
        // close the currently opened aside menu
        // TODO: Create a `closeMenu()` & call it here instead
        this.closeMenu(this.currentAsideMenuId, DEFAULT_MENU_TIMEOUT, ASIDE_PART);
      });
    });
    
    // ...for the default `closeMenuIconButtons`
    this.closeMenuIconButtons.forEach(iconButton => {
      iconButton.addEventListener('click', () => {
        // close the currently opened (default) menu
        // TODO: Create a `closeMenu()` & call it here instead
        this.closeMenu(this.currentMenuId, DEFAULT_MENU_TIMEOUT, DEFAULT_PART);
      });
    });
     
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[33m[installMenuEventListeners]: INSTALLING EVENT LISTENERS FOR MENUS !!!!!\x1b[0m`);
  }


  
  /**
   * Method used to install event listeners for dialogs
   */
  #installDialogsEventListeners() {}


  /**
   * Shows the app's pages
   * @private
   */
  #showPages() {
    // TODO: Make sure the corresponding page has been loaded before proceeding

    // clear or empty the splash & welcome screen's shadow root
    this.splashScreen.shadowRoot.innerHTML = '';
    this.welcomeScreen.shadowRoot.innerHTML = '';

    // hide the screens root
    this.screensEl.hidden = true;

    // show the pages root
    this.pagesEl.hidden = false;


  }

  /**
   * Handler that is called whenever the i18n data is loaded
   *
   * @param { Object } loadedData
   */
  _onI18nDataLoaded(loadedData) {
    // get the hello lang value
    let hello = this.i18n.getString('hello');

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[33m[_onI18nDataLoaded]: hello => ${hello} & loadedData => \x1b[0m\x1b[35m%o\x1b[0m \x1b[0m`, loadedData);
  }

  /**
   * Handler that is called when one or more screens have been loaded
   *
   * @param { Array[Object] } loadedScreen
   */
  _onScreensLoaded(loadedScreens) {
    // unhide the `screens` element
    this.screensEl.hidden = false;

    loadedScreens.forEach((screen) => {

      // If the Splash Screen has been loaded...
      if (screen.name === SPLASH_SCREEN) {
        // ...handle the splash screen load
        this._splashScreenLoadHandler(screen.object);

      }

      // If the Welcome Screen has been loaded...
      if (screen.name === WELCOME_SCREEN) {
        // ...handle the welcome screen load
        this._welcomeScreenLoadHandler(screen.object);
      }

      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[33m[_onScreensLoaded](1): screen.name => ${screen.name} & screen.object => \x1b[0m`, screen.object);
    });
  }

  /**
   * Handler that is called whenever the welcome screen loads
   *
   * @param { Class } WelcomeScreen
   */
  _welcomeScreenLoadHandler(WelcomeScreen) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[34m[_welcomeScreenLoadHandler](1): this.screensEl => `, this.screensEl);
    console.log(`\x1b[34m[_welcomeScreenLoadHandler](2): WelcomeScreen => `, WelcomeScreen);

    // get the root of all screen as `screensRoot`
    const screensRoot = this.getRootOf('screens');

    // assign the welcome screen object to a app's `welcomeScreen` variable
    this.welcomeScreen = new WelcomeScreen('welcome-screen');

    // set the animation duration to 500
    this.welcomeScreen.setSlideDuration(500);

    // listen to the `last-step` event
    this.welcomeScreen.on('last-step', () => { 
      /* TODO: start loading the home page */

      // Getting ready for our main pages...

      // if there's no main in pages...
      if (this.hasMainPages === false) {
        // ...render / create pages template
        this.#renderPages();

        // install pages event listeners
        this.#installPagesEventListeners();
      }

      // IDEA: Programatically load the current page

      // get the current page route as `pageRoute`
      let pageRoute = getPageRoute(window.location, BASE_DIR);

      // get the current page as 'page' (or home as default)
      let page = (!pageRoute.length) ? 'home' : pageRoute;

      // if the current page is valid but has not been loaded
      if (this.isValidPage(page) && !this.isLoadedPage(page)) {
        // ..load this page right now (in anticipation)
        this._loadPages([page]).then((loadedPages) => {
          // Initialize the page
          this._initPage(loadedPages[0]);
          
        });
      }


    });

    // listen to the `start` event
    this.welcomeScreen.on('start', () => {
      /* TODO: load again & show the home page */

      // start loading the page
      this._pageLoading = true;


      // get the current page route as `pageRoute`
      let pageRoute = getPageRoute(window.location, BASE_DIR);
      let viewRoute = getViewRoute(window.location, BASE_DIR);

      // set the current screen to an empty string
      this.currentScreen = '';
      this.currentPage = (!pageRoute.length) ? 'home' : pageRoute;
      this.currentView = viewRoute;

      // show pages
      this.#showPages();

      // notify the nav links
      this.notifyNavLinks();

      // get the pending page object as `pendingPage`
      let pendingPage = this._getPendingPageObject();
      // set the pendingPage's view to `currentView`
      pendingPage.view = this.currentView.length ? this.currentView : 'default';
      // open the `pendingPage`
      pendingPage.open();
      // remove the pending page from 


      // When the page is ready...
      pendingPage.on('ready', (page) => {
        // ...stop page loading
        this._pageLoading = false;

        // notify page update
        this.notifyPageUpdate();

        // notify the view update
        page.notifyViewUpdate();

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[40;3;34m[pendingPage] (1|ON-READY): pendingPage => \x1b[0m`, pendingPage);
        console.log(`\x1b[40;3;34m[pendingPage] (2|ON-READY): page => \x1b[0m`, page);
      });

      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[40m\x1b[37m[welcomeScreen] (START) & currentView => ${this.currentView} & pendingPage => \x1b[0m`, pendingPage);

    });

    // listen to the `theme-select` event
    this.welcomeScreen.on('theme-select', (selectedTheme) => {
      // update the app's theme
      this.updateTheme(selectedTheme, true);

      // call the `onThemeUpdated()` method
      this.onThemeUpdated(selectedTheme);
    });

    // listen to the `lang-select` event
    this.welcomeScreen.on('lang-select', (selectedLang) => {
      // update the app's lang
      this.updateLang(selectedLang, true);

      // call the `onLangUpdated()` method
      this.onLangUpdated(selectedLang);
    });

  }

  /**
   * Method used to initialize the recently `loadedPage`.
   * This method instantiates the page's class into the App
   *
   * Example:
   *   _initPage(loadedPages[0], true); // <- instantiates the first page and opens it right after
   *
   * @param { Object } loadedPage
   * @param { String } currentView
   * @param { Boolean } autoOpen - If TRUE, the page will be opened after instantiation
   *
   * @returns { Object } - an instance of the page
   */
  _initPage(loadedPage, currentView, autoOpen) {
    // TODO: do nothing if the `loadedPage` has already been instantiated
    
    // get the page name as `pageName`
    let pageName = `${loadedPage.name}-page`;
    // get the page object as `PageClass`
    let PageClass = loadedPage.object;
    // get the type of this page
    let pageType = this.getPageTypeOf(loadedPage.name);

    // get the page id
    let pageId = pageName.toCamelCase(); // <- e.g. returns; homePage (if pageName is 'home-page')

    let view = typeof currentView !== 'undefined' ? currentView : this.currentView; // 'default'; // <- HACK

    // instantiate the page in this app
    this[pageId] = new PageClass(pageType, pageName);

    // update the current view
    this[pageId].view = view;

    // update the params
    this[pageId].params = this.currentParams;


    // if `autoOpen` is TRUE
    if (autoOpen) {
      this[pageId].open();
    } else {
      // set this page object to pending
      this._setPendingPageObject(this[pageId]);
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40m\x1b[34m[_initPage] (1|in anticipation): pageType => ${pageType} & pageName => ${pageName} & pageId => ${pageId}`);
  
    console.log(`\x1b[40m\x1b[34m[_initPage] (2|in anticipation): view => [[ ${view} ]] currentParams => [[ ${this.currentParams.toString()} ]] & loadedPage => \x1b[0m`, loadedPage);

    // return an instance of the page
    return this[pageId];
  }


  /**
   * Sets or Updates the pending page object with the given `pageObject`
   *
   * @param { Object } pageObject
   */
  _setPendingPageObject(pageObject) {
    this.__pendingPageObj = pageObject;
  }


  /**
   * Returns the pending page
   *
   * @returns { Object }
   */
  _getPendingPageObject() {
    return this.__pendingPageObj;
  }


  /**
   * Removes the pending page.
   * This method sets the private `__pendingPageObj` variable to null
   */
  _removePendingPageObject() {
    this.__pendingPageObj = null;
  }

  /**
   * Handler that is called whenever the splash screen loads 
   *
   * @param { Class } SplashScreen
   */
  _splashScreenLoadHandler(SplashScreen) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[34m[_splashScreenLoadHandler](1): this.screensEl => `, this.screensEl);
    console.log(`\x1b[34m[_splashScreenLoadHandler](2): SplashScreen => `, SplashScreen);

    // get the root of all screens as `screensRoot`
    const screensRoot = this.getRootOf('screens');
    
    // assign the splash screen object to a app's `splashScreen` variable
    this.splashScreen = new SplashScreen('splash-screen');

    // listen to the `almost-complete` event
    this.splashScreen.on('almost-complete', (target) => { 
      // stop/pause the progress 
      target.stopProgress();

      // load the welcome screen 
      this._loadScreens([WELCOME_SCREEN]).then((loadedScreens) => {
        this._onScreensLoaded(loadedScreens);

        // continue the progress
        target.startProgress();

        // complete the progress
        // this.splashScreen.completeProgress();
        
      }); 
       
      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[44m[_splashScreenLoadHandler](almost-complete|event)\x1b[0m`);
    });


    // listen to the 'progress-complete' event
    this.splashScreen.on('progress-complete', (target) => {
      // TODO: Check the last time the welcome screen was shown and navigate to it accordingly

      // hide the splash screen
      target.hide();

      // show the welcome screen
      this.welcomeScreen.show();

      // set the current screen to welcome screen
      this.currentScreen = WELCOME_SCREEN;
      this.currentPage = ''; // <- reset the current page

      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[44m[_splashScreenLoadHandler](progress-complete|event) target => \x1b[0m`, target);
    });

    // remove the app's spinner 
    this._removeSpinner();

    // TODO: show the splash screen
    this.splashScreen.show();
    //this.splashScreen.run();
    
    // set the current screen to splash screen obv. ;)
    this.currentScreen = SPLASH_SCREEN;
    
    
    // install a storage watcher from 'LiveStorage'
    // installStorageWatcher(this, ['lang', 'theme'], (changedStorageItems) => this._handleChangedStorageItems(changedStorageItems));

  }


  /**
   * Removes the app's spinner
   */
  _removeSpinner() {
    // Do nothing if there's no spinner
    if (!this._spinnerEl) { return }

    // remove the spinner element
    this._spinnerEl.remove();
  }



  /* >> PRIVATE SETTERS << */

  /* >> PRIVATE GETTERS << */


  /**
   * Returns the `<img id="spinner">` element
   *
   * @returns { Element } 
   */
  get _spinnerEl() {
    return this.root.getElementById('spinner');
  }




}; // <- End of `App` class



// Attach some mixins to `App`...
Object.assign(App.prototype, eventMixin);

// Attach some behaviors to `App`...
// Object.assign(App.prototype, AppBehavior);
//


// TODO: Make this a custom element
// customElements.define('muvisho-app', MuvishoApp);
