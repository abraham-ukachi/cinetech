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
* @name: Page
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> // Create a splash page with `Page` class 
*    -|>
*    -|> import { Page } from './src/Page.js'; 
*    -|>
*    -|> class HomePage extends Page {
*    -|>  ...
*    -|> }
*    -|> 
*
*/

import { html, Engine } from './Engine.js'; // <- we just need stuff from our custom engine to get started #LOL !!! :)
import { eventMixin } from './helpers/mixins/event-mixin.js';
import { VIEWS_DIR } from './App.js';

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// Defining some constant variables...




// TODO: Turn the Page into a custom element by extending `HTMLElement`


// Create a `Page` class with our `Engine`
export class Page extends Engine {

  /**
   * Properties
   *
   * @type { Object }
   */
  static get properties() {
    return {
      updated: { type: Boolean },
      opened: { type: Boolean },
      hidden: { type: Boolean },
      view: { type: String }

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
    return [];
  }

  /**
   * Animations
   *
   * @type { Array }
   */
  static get animations() {
    return [];
  }


  /**
   * Pages
   *
   * Example:
   *   [
   *     { name: HOME_PAGE, views: [DEFAULT_VIEW] }
   *   ]
   *
   * @type { Array[Object] }
   */
  static get pages() {
    return [];
  }

  
  // Define some public properties
   
  // Define some private properties  


  /**
   * Constructor of the Page
   * NOTE: This constructor will be executed automatically when a new page object gets created.
   *
   * @param { String } type - the type of the page. supported types are `main` and `aside`
   * @param { String } name - the name of the page (e.g. 'home-page')
   */
  constructor(type, name = 'home-page') {
    super();
    
    // set default attributes
    this.type = type;
    this.name = name;

    console.log(`[[[ 1 ]]] type => ${type} & name => ${name} && this.root ===> `, this.root);

    console.log(`[[[ 2 ]]] muvishoApp ===> `, muvishoApp.pagesEl);
    // create the page 
    // MOI: """well...we're in a constructor aren't we?  #lol ;)"""
    this.#create();
  }


  /**
   * Method that is called from the Engine's constructor
   * @override from `Engine`
   */
  init() {
    // Initialize public properties

    this.updated = false;
    this.opened = null;
    this.hidden = false;
    this.view = 'default';

    // Initialize private properties
  }



  /**
   * Renders the page's template
   * NOTE: User *can* overrride the method
   *
   * @returns { String }
   */
  render() {
    return html`<div id="${this.name.toCamelCase()}" name="${this.name}"></div>`;
  }
  

  /**
   * First time this app gets updated
   * NOTE: User *can* overrride the method
   *
   * @override from `Engine`
   */
  firstUpdated() {}


  /**
   * Handler that is called whenever a property changes
   * NOTE: User *can* overrride the method
   *
   * Example usage:
   *   propertiesUpdated(changedProperties) {
   *     super.propertiesUpdated(changedProperties);
   *
   *     // write your code here ;)
   *   }
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

      if (prop.name === 'opened') {
        this.#_openedHandler(prop.value);
      }

      if (prop.name === 'hidden') {
        this.#_hiddenHandler(prop.value);
      }

      if (prop.name === 'view') {
        this.#_handleViewChange(prop.value);
      }
    });
  }


  /**
   * Handler that is called whenever a property gets reset to its initial value
   * NOTE: User *can* overrride the method
   *
   * @param { String } prop - The property's name
   * @param { String|Number|Boolean|Array } value - The value of the property after reset
   * @param { String|Number|Boolean|Array } oldValue - The value of the property before reset
   *
   * @override from `Engine`
   */
  propertyResetHandler(prop, value, oldValue) {}


  

  /* >> Public Methods << */

  /**
   * Method used to run the page
   * @override from `Engine` 
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




    
  }


  // Opens the page
  async open() {
    // TODO: Make sure the page has not been opened already
    // do nothing if the page is already opened
    if (this.opened) return;


    await this.run();

    // load all the views
    let loadedViews = await this._loadViews(this.getViews(), this.getRealName(), VIEWS_DIR);

    // Initialize the views and get the current view object
    let currentViewObject = await this.#_initViews(loadedViews);
    

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log('\x1b[43;4;30m[open] (1|loadedViews): loadedViews ===>>>>>> \x1b[0m', loadedViews);
    console.log('\x1b[43;4;30m[open] (2|currentViewObject): CURRENT VIEW OBJECT ===>>>>>> \x1b[0m', currentViewObject);


    // show the page
    this.show();

    console.log(`\x1b[43;4;30m[open] (3|currentViewObject): currentViewId => ${this.getCurrentViewId()} & isCurrentViewOpened ? \x1b[0m`, this.isCurrentViewOpened);

    // If the current view is not opened
    if (!this.isCurrentViewOpened) {
      // ...open the current view, using the current view's id
      this.openCurrentView();
    }
    

    // Wait for this `currentViewObject` to be ready, 
    // by listening to its `ready` event ;)
    // NOTE: params => { id, name, realName, view }
    currentViewObject.on('ready', (params) => {

      // set the `opened` property to TRUE
      this.opened = true;

      // call the `onReady()` method of the page
      this.onReady();

      // TODO: trigger the `ready` event of the page
      this.trigger('ready', this);

    });

  }

  // Closes the page
  close() {
    // HACK: remove the page's shadow root
    this.shadowRoot.innerHTML = '';

    this.opened = false;
  }


  // Show the page
  show() {
    this.hidden = false;
  }

  // Hide the page
  hide() {
    this.hidden = true;
  }


  /**
   * Opens the specified view
   *
   * @param { String } viewId - The id of the view to open 
   */
  openViewById(viewId = 'default') {
    // get the view object as `viewObj`
    let viewObj = this.getViewObject(viewId);

    // open the view
    viewObj.open();

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40m\x1b[36m[openViewById]: viewId => ${viewId} & viewObj => \x1b[0m`, viewObj);
  }


  /**
   * Method used to open the current view
   */
  openCurrentView() {
    // get the current view's id
    this.openViewById(this.view);
  }


  /**
   * Notifies all views about the recent view change.
   *
   * @param { String } ?view - the new or recently updated view (optional - defaults to `this.view`)
   * @public
   */
  notifyViewUpdate(view = this.view) {
    // loop through all the views in `viewsEl`
    this.viewEls.forEach((viewEl) => {

      // IDEA: if the view's id is the same as the current view id,
      //       set the `active` attribute to this view element
      //       otherwise, remove the `active` attribute from this view element

      viewEl.dataset.realName === view ? viewEl.setAttribute('active', '') : viewEl.removeAttribute('active');
      
    });

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[42;34m[notifyViewUpdate]: view => ${view} & viewEls => %o\x1b[0m`);
  }


  /**
   * Handler that is called when the page is ready
   * NOTE: User *can* overrride the method
   */
  onReady() {

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40m\x1b[31m[onReady]: ${this.name} is ready`); 
  }


  /**
   * Returns all the views supported by this page.
   *
   * @returns { Array }
   */
  getViews() {
    return this.constructor.pages[0].views;
  }


  /**
   * Returns the real page name.
   * This method removes any trailing '-page'.
   *
   * Example: 
   *   'home-page' becomes 'home' ;)
   *
   * @returns { String } 
   */
  getRealName() {
    return this.name.split('-page')[0];
  }


  /**
   * Returns the current view id of the page
   *
   * @returns { String } (e.g. 'defaultHomeView')
   */
  getCurrentViewId() {
    let view = this.view?.length ? this.view : 'default';
    return view + this.getRealName().capitalize() + 'View';
  }

  /* >> Public Setters << */

  /* >> Public Getters << */

  /**
   * Returns the object view with the specified id
   *
   * @param { String } viewId - The id of the view to get
   *
   * @returns { Object<View> }
   */
  getViewObject(viewId = 'default') {
    return this[viewId + this.getRealName().capitalize() + 'View'];
  }

  /**
   * Checks whether the current view is opened or not
   *
   * @returns { Boolean } - TRUE if the current view is opened, FALSE otherwise
   */
  get isCurrentViewOpened() {
    return this[this.getCurrentViewId()].opened;
  }

  /**
   * Returns the id of the screeen.
   * 
   * @returns { String } - the camel cased copy of the current page's name (e.g. 'splash-page' => 'splashPage')
   */
  get pageId() {
    return this.name.toCamelCase();
  }

  /**
   * Returns the pages's `<div id="splashPageContainer">` element in the shadow root
   * 
   * @returns { Element } containerEl (e.g.)
   */
  get containerEl() {
    return this.shadowRoot.getElementById(`${this.pageId}Container`); // <- e.g. 'pageContainer'
  }

  /**
   * Returns the root of the screeen (i.e. `<div class="pages-wrapper">` )
   *
   * @returns { Element }
   */
  get root() {
    return muvishoApp.pagesEl.querySelector(`${this.type} .pages-wrapper`);
  }

  /**
   * Returns the host element of the app.
   * NOTE: This element holds the shadowRoot of this page
   *
   * @returns { HTMLElement } 
   */
  get host() {
    return muvishoApp.shadowRoot.getElementById(this.pageId);
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
   * REturn TRUE if the page has been attached to the app,
   * or if the shadoRoot has been attached to the `host`
   *
   * @returns { Boolean }
   */
  get isAttached() {
    return this.host.shadowRoot !== null;
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
   * Returns the `<div id="views">` element.
   *
   * @returns { Element }
   */
  get viewsEl() {
    return this.shadowRoot.getElementById('views');
  }

  /**
   * Returns a list of all `<div class="view">` elements in `viewsEl`
   *
   * @returns { NodeList<Element> }
   */
  get viewEls() {
    return this.viewsEl.querySelectorAll('.view');
  }


  /* >> Private Methods << */

  /**
   * Creates the page
   * NOTE: This method will create a template element with the formatted html from `render()`, 
   *       and add it to the corresponding host in DOM.
   *
   * @private
   */
  #create() {

    // creating the host element in root as `hostEl`, with the `pageId`...

    let hostEl = document.createElement('div');
    hostEl.id = this.pageId;
    hostEl.classList.add('page');
    hostEl.setAttribute('fit', '');
    // append this `hostEl` to the root
    //this.root.appendChild(hostEl);
    this.root.insertAdjacentElement('afterbegin', hostEl);
    // muvishoApp.pagesEl.appendChild(hostEl);
     
    // get the formatted html template string from `render()` as `formattedHTML`
    let formattedHTML = this.render();
    
    
    // Check if the browser supports the HTML template 
    if ('content' in document.createElement('template')) {

      // create a `template` element
      let templateEl = document.createElement('template');

      // insert the `formattedHTML` into the `templateEl`
      templateEl.innerHTML = formattedHTML;
      
      // append this template element to the host
      this.host.append(templateEl);

      // Now, attach a shadow to the app's host element
      this.host.attachShadow({mode: 'open'}); // <- an `open` mode allows JS to modify/update the contents of shadow-root
      
       
      // append this template element inside the  
      // this.root.body.append(templateEl);

    } else { // <- Browser doesn't support HTML template element :(
      // TODO: Find another way to add the app's template content to `host` :/
      
      // DEBUG [4dbsmaster]: tell me about it ;)
      console.warn(`\x1b[34m[#create]: browser doesn't support HTML template\x1b[0m`);
    }
       

  }


  /**
   * Handler that is called whenever the `opened` property changes
   *
   * @param { Boolean } opened
   */
  #_openedHandler(opened) {

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40;1;37m[#_openedHandler]: opened ==> ${opened}\x1b[0m`);

    if (opened) {
      // run the engine
      //await this.run();
      
      // call the `onOpen()` method
      this.onOpen();


      // muvishoApp.notifyPageUpdate(); 

    } else {
      // TODO: stop the engine and hide or remove the page's host from root
        
      // remove the page's host content
      this.host.innerHTML = '';

      // call the `onClose()` method
      this.onClose();
    }


  }

  /**
   * Method used to initialize all the `loadedViews` of this page
   *
   * @param { Array } loadedViews
   *
   * @returns { Promise } - resolves to `true` if all views are initialized successfully
   */
  #_initViews(loadedViews) {
    return new Promise((resolve, reject) => {
      
      // Initialize the `currentViewObject` to `null`
      let currentViewObject = null;

      // looping through each view
      loadedViews.forEach((view) => {
        // get the view's id, name and class as `viewId`, `viewName` and `viewClass` respectively
        let viewId = view.id;
        let viewName = view.name;
        let viewClass = view.object;

        // get the current view id as `currentViewId`
        let currentViewId = this.getCurrentViewId();

        // instantiate the view class and assign it's object to this page
        this[viewId] = new viewClass(this.viewsEl, this.viewName);

        // If the view's id is the same as the current view id...
        if (viewId === currentViewId) {
          // ...then set the `currentViewObject` to the view's object
          currentViewObject = this[viewId];
        }

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[35m[_initViews](loadedViews): viewId => ${viewId} & currentViewId => ${currentViewId} & currentViewObject => \x1b[0m`, currentViewObject);

      });

      // after a simulated delay of 1 second...
      setTimeout(() => {
        // ...resolve the promise with the `currentViewObject`
        resolve(currentViewObject);
      }, 1000);
      
    });

  }


  /**
   * Handler that is called whenever `hidden` property changes
   *
   * @param { Boolean } hidden
   */
  #_hiddenHandler(hidden) {
    // do nothing if the page is not attached
    if (!this.isAttached) { return }

    // hide or unhide the `host` element accordingly ;)
    this.host.hidden = hidden;

  }


  /**
   * Handler that is called whenever `view` changes.
   *
   * @param { String } view - the new or recently updated view
   */
  #_handleViewChange(view) {
    // TODO: Do nothing if there's no view; if it is not valid or not supported
    // TODO: Use the given `view` to generate or get the current view id ?

    // Get the current view id as the page's `viewId`
    this.viewId = this.getCurrentViewId();
    
    // get the current view Object
    this.viewObject = this[this.viewId];

    // HACK: do nothing if there's no view object 
    if (!this.viewObject) { return }


    // However, if this view object has not been opened yet...
    if (!this.viewObject.opened) {
      // ...then open it ;)
      this.viewObject.open();
      
      // call the `onViewReady()` method
      this.onViewReady(view, this.viewId, this.viewObject);
    }

    // notify the views of the recent change
    this.notifyViewUpdate(view, this.viewId, this.viewObject);


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[34m[_handleViewChange]: view => ${view} & viewId => ${this.viewId} & viewObject => ${this.viewObject}\x1b[0m`);

  }



  /* >> Private Setters << */

  /* >> Private Getters << */




}; // <- End of `Page` class


// Attach some mixins to `Page`...
Object.assign(Page.prototype, eventMixin);

// Attach some behaviors to `Page`...
// Object.assign(Page.prototype, PageBehavior);



// TODO: Make this a custom element
// customElements.define('ms-page', Page);
