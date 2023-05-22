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
*   1-|> var muvishoApp = new App(DEFAULT_LANGUAGE, LIGHT_THEME);
*    -|>
*    -|> muvishoApp.setTitle('Peace & Love - Blog');
*    -|>
*    -|> muvishoApp.run();
*
*/

import { html, Engine } from './Engine.js'; // <- we just need stuff from our custom engine to get started #LOL !!! :)
import { eventMixin } from './helpers/mixins/event-mixin.js';
import { installStorageWatcher } from './helpers/LiveStorage.js';
import { installRouter, getPageRoute, getViewRoute, getSearchParams } from './helpers/router.js';
import { installMediaQueryWatcher } from './helpers/mediawatcher.js';


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
export const ASSETS_DIR = `${BASE_DIR}root/public/assets/`;
// theme directory
export const THEME_DIR = `${ASSETS_DIR}theme/`;
// styles directory
export const STYLES_DIR = `${ASSETS_DIR}stylesheets/`;
// animations directory
export const ANIM_DIR = `${ASSETS_DIR}animations/`;

// source directory
export const SOURCE_DIR = `${BASE_DIR}root/public/src/`;
// screens directory
export const SCREENS_DIR = `${SOURCE_DIR}screens/`;
// pages directory
export const PAGES_DIR = `${SOURCE_DIR}pages/`;
// views directory
export const VIEWS_DIR = `${SOURCE_DIR}views/`;

// screens
export const SPLASH_SCREEN = 'splash';
export const WELCOME_SCREEN = 'welcome';

// pages
export const HOME_PAGE = 'home';
export const SEARCH_PAGE = 'search';
export const ARTICLES_PAGE = 'articles';
export const SAVES_PAGE = 'saves';
export const PROFILE_PAGE = 'profile';
export const ADMIN_PAGE = 'admin';
export const SETTINGS_PAGE = 'settings';

// default view
export const DEFAULT_VIEW = 'default';


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

console.log(Engine);


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

      _navbarOrientation: { type: String }
    };
  }

  /**
   * Theme
   *
   * @type { Array }
   */
  static get theme() {
    return [ 'color', 'typography', 'styles' ];
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
      'fade-in',
      'pop-in'
      // 'slide-from-down'
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
      { name: HOME_PAGE , views: [DEFAULT_VIEW, 'login', 'register'] },
      { name: SEARCH_PAGE, views: [DEFAULT_VIEW] },
      { name: ARTICLES_PAGE, views: [DEFAULT_VIEW] },
      { name: PROFILE_PAGE, views: [DEFAULT_VIEW, 'edit'] },
      { name: ADMIN_PAGE, views: ['dashboard', 'users', 'articles', 'comments', 'categories', 'rights'] },
      { name: SETTINGS_PAGE, views: [DEFAULT_VIEW, 'about', 'languages', 'theme'] },
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
      {id: 'home', type: 'main', name: 'Home'},
      {id: 'articles', type: 'main', name: 'Articles'},
      {id: 'search', type: 'main', name: 'Search'},
      {id: 'saves', type: 'main', name: 'Saves'},
      {id: 'profile', type: 'main', name: 'Profile'},
      {id: 'settings', type: 'main', name: 'Settings'},
      {id: 'admin', type: 'main', name: 'Admin'},
      {id: 'article', type: 'aside', name: 'Article'},
      {id: 'editor', type: 'aside', name: 'Editor'}
    ];
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
    // (WE ARE IN BOOTING... So, no screens; no pages)
    this.currentScreen = null;
    this.currentPage = null;
    this.currentView = null;

    // list of primary pages
    this.primaryPages = [ HOME_PAGE, ARTICLES_PAGE, SEARCH_PAGE, SAVES_PAGE, PROFILE_PAGE ];

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
    this.title = 'Peace & Love';
    this.updated = false;
    
    // Initialize private properties
    this._navbarOrientation = 'horizontal';

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

        <!-- Dialogs -->
        <div id="dialogs" fit hidden></div>
        <!-- End of Dialogs -->

        <!-- Menus -->
        <div id="menus" fit hidden></div>
        <!-- End of Menus -->

        <!-- Toasts -->
        <div id="toasts" class="fade-in" fit hidden></div>
        <!-- End of Toasts -->

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


  /* >> Public Methods << */

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
    console.log(`\x1b[40m\x1b[31m[onReady]: ${this.name} is ready`); 
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
    let supportedPages = this.constructor.supportedPages;

    // return the `supportedPages` based on the specified `idsOnly` boolean variable
    return (idsOnly) ? supportedPages.map((page) => page.id) : supportedPages;
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

    // if the app's main pages element exists...
    if (this.mainPagesEl) {
      // ...select all the elements in main pages with `nav-link` in their class list as `links`
      let links = this.mainPagesEl.querySelectorAll((!includeLogo) ? '.nav-link:not(.logo)' : '.nav-link');

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


  /* >> Public Setters << */
  
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


  /* >> Public Getters << */

  /**
   * Returns the current screen of the app
   * @param { String }
   */
  get currentScreen() {
    return this._currentScreen;
  }

  /**
   * Returns the current page of the app 
   * @param { String } 
   */
  get currentPage() {
    return this._currentPage;
  }


  /**
   * Returns the current view of the app 
   * @param { String } 
   */
  get currentView() {
    return this._currentView;
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
   * Returns the `<div id="menus">` element from the app's shadow root
   *
   * @returns { Element } 
   */
  get menusEl() {
    return this.shadowRoot.getElementById('menus');
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
   * Returns the navBar element in `mainPagesEl`
   *
   * @return { Element }
   */
  get navBarEl() {
    return this.mainPagesEl.querySelector('.nav-bar');
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
      <!-- Main Pages -->
      <main class="flex-layout vertical">

        <!-- Pages-Wrapper -->
        <div class="pages-wrapper">
  
          <!-- Backdrop -->
          <div class="backdrop fade-in" fit hidden></div>
  
          <!-- Dialogs-Container -->
          <div class="dialogs-container vertical flex-layout" fit hidden></div>
          <!-- End of Dialogs-Container -->
  
          <!-- Menus-Container -->
          <div class="menus-container vertical flex-layout" fit hidden></div>
          <!-- End of Menus-Container -->
  
        </div>
        <!-- End of Pages-Wrapper -->
  
        <!-- NOTE: NavBar will be injected here -->
  
      </main>
      <!-- End of Main Pages -->


      <!-- Aside Pages -->
      <aside class="flex-layout vertical centered">
        <!-- Pages-Wrapper -->
        <div class="pages-wrapper" fit>

          <!-- Backdrop -->
          <div class="backdrop fade-in" fit hidden></div>

          <!-- Dialogs-Container -->
          <div class="dialogs-container vertical flex-layout" fit hidden></div>
          <!-- End of Dialogs-Container -->

          <!-- Menus-Container -->
          <div class="menus-container vertical flex-layout" fit hidden></div>
          <!-- End of Menus-Container -->
  
        </div>
        <!-- End of Pages-Wrapper -->


        <!-- Outlined App Logo -->
        <span class="app-logo" outlined></span>

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
      <nav class="nav-bar horizontal flex-layout center">
        <!-- Top - Horizontal Divider -->
        <span class="divider horizontal top"></span>

        <!-- Home - NavLink -->
        <a title="Home" href="./" class="home nav-link">
          <span class="material-icons icon">home</span>
          <span class="label">Home</span>
        </a>

        <!-- Articles - NavLink -->
        <a title="Articles" href="./articles" class="articles nav-link">
          <span class="material-icons icon">feed</span>
          <span class="label">Articles</span>
        </a>

        <!-- Search - NavLink -->
        <a title="Search" href="./search" class="search nav-link">
          <span class="material-icons icon">search</span>
          <span class="label">Search</span>
        </a>
        
        <!-- Saves - NavLink -->
        <a title="Saves" href="./saves" class="saves nav-link">
          <span class="material-icons icon">bookmark_outline</span>
          <span class="label">Saves</span>
        </a>

        <!-- Profile - NavLink -->
        <a title="Profile" href="./profile" class="profile nav-link">
          <span class="material-icons icon">person</span>
          <span class="label">Profile</span>
        </a>

      </nav>
    `;


    // Create a veritcal navBar html template as `vertNavbarHtmlTemplate`
    let vertNavbarHtmlTemplate = html`
      <nav class="nav-bar vertical flex-layout center">
        <!-- Logo | Icon-Wrapper -->
        <a title="${this.name}" class="nav-link logo icon-wrapper" active>
          <!-- App Logo -->
          <span class="app-logo"></span>
        </a>

        <span flex></span>

        <!-- Home - NavLink -->
        <a title="Home" href="./" class="home nav-link">
          <span class="material-icons icon">home</span>
          <span class="label">Home</span>
        </a>

        <!-- Articles - NavLink -->
        <a title="Articles" href="./articles" class="articles nav-link">
          <span class="material-icons icon">feed</span>
          <span class="label">Articles</span>
        </a>

        <!-- Search - NavLink -->
        <a title="Search" href="./search" class="search nav-link">
          <span class="material-icons icon">search</span>
          <span class="label">Search</span>
        </a>
        
        <!-- Saves - NavLink -->
        <a title="Saves" href="./saves" class="saves nav-link">
          <span class="material-icons icon">bookmark_outline</span>
          <span class="label">Saves</span>
        </a>

        <!-- Profile - NavLink -->
        <a title="Profile" href="./profile" class="profile nav-link">
          <span class="material-icons icon">person</span>
          <span class="label">Profile</span>
        </a>

        <span class="divider horizontal"></span>
        <!-- Settings - NavLink -->
        <a title="Settings" href="./settings" class="settings nav-link">
          <span class="material-icons icon">settings</span>
        </a>

        <span flex></span>

        <!-- Log Out - NavLink -->
        <a title="Log out" class="nav-link" role="icon-button">
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

    // update the current page and view
    this.currentPage = (!this.currentScreen && page.trim().length === 0) ? 'home' : page;
    this.currentView = (!this.currentScreen && view.trim().length === 0) ? 'default' : view;
    
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
    console.log(`\x1b[42m\x1b[30m[_navigateScreens]: params => \x1b[0m`, params);

  }


  
  /**
   * Method used to navigate through pages,
   * useing the specified `page`, `view` and `params`
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

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[3m[_navigatePages] (1): page loaded!!! view => ${view} & pageObject => \x1b[0m`, pageObject);
      });
       
    }else { // <- page has already been loaded
      // get the page object
      pageObject = this[`${page.toCamelCase()}Page`];

      // update the page's view
      pageObject.view = view;

      // If the `pageObject` is not attached to this App...
      if (!pageObject.isAttached) {
        // ...open the page
        pageObject.open();
      }else {
        // just show the page 
        pageObject.show();
      }
     
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[47m\x1b[30m[_navigatePages] (2): view => ${view} & pageObject => \x1b[0m`, pageObject);

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
      this.mainPagesEl.classList.replace('horizontal', 'vertical');

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
      this.mainPagesEl.classList.replace('vertical', 'horizontal');

      // remove the current navBar element
      this.navBarEl.remove();

      // get the navbar's *vertical* html template as `navbarHtml`
      let navbarHtml = this._getNavbarHtmlTemplate('vertical');

      // append / insert the `navbarHtml` into `mainPagesEl` (afterbegin)
      this.mainPagesEl.insertAdjacentHTML('afterbegin', navbarHtml);

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

    // append the `navbarHtml` into `mainPagesEl`
    this.mainPagesEl.insertAdjacentHTML('beforeend', navbarHtml);
  }


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
      // open the `pendingPage`
      pendingPage.open();
      // remove the pending page from 


      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[40m\x1b[37m[welcomeScreen] (START) & pendingPage => \x1b[0m`, pendingPage);

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
  _initPage(loadedPage, currentView,  autoOpen) {
    // TODO: do nothing if the `loadedPage` has already been instantiated
    
    // get the page name as `pageName`
    let pageName = `${loadedPage.name}-page`;
    // get the page object as `PageClass`
    let PageClass = loadedPage.object;
    // get the type of this page
    let pageType = this.getPageTypeOf(loadedPage.name);

    // get the page id
    let pageId = pageName.toCamelCase(); // <- e.g. returns; homePage (if pageName is 'home-page')

    // instantiate the page in this app
    this[pageId] = new PageClass(pageType, pageName);

    // update the current view
    this[pageId].view = currentView;

    // if `autoOpen` is TRUE
    if (autoOpen) {
      this[pageId].open();
    } else {
      // set this page object to pending
      this._setPendingPageObject(this[pageId]);
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40m\x1b[34m[_initPage] (1|in anticipation): pageType => ${pageType} & pageName => ${pageName} & pageId => ${pageId}`); 
    console.log(`\x1b[40m\x1b[34m[_initPage] (2|in anticipation): currentView => ${currentView} & loadedPage => \x1b[0m`, loadedPage);

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



  /* >> Private Setters << */

  /* >> Private Getters << */


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
