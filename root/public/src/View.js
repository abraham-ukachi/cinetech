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
* @name: View
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> // Create a view with `View` class 
*    -|>
*    -|> import { View } from './src/View.js'; 
*    -|>
*    -|> class DefaultHomeView extends View {
*    -|>  ...
*    -|> }
*    -|> 
*
*/

import { html, Engine } from './Engine.js'; // <- we just need stuff from our custom engine to get started #LOL !!! :)
import { eventMixin } from './helpers/mixins/event-mixin.js';

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// Defining some constant variables...




// TODO: Turn the View into a custom element by extending `HTMLElement`


// Create a `View` class with our `Engine`
export class View extends Engine {

  /**
   * Properties
   *
   * @type { Object }
   */
  static get properties() {
    return {
      updated: { type: Boolean },
      opened: { type: Boolean }

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


  
  // Define some public properties
   
  // Define some private properties  


  /**
   * Constructor of the View
   * NOTE: This constructor will be executed automatically when a new view object gets created.
   *
   * @param { Element } root
   * @param { String } name - the name of the view (e.g. 'home-view')
   */
  constructor(root, name = 'home-view') {
    super();
    
    // set default attributes
    this.root = root;
    this.name = name;

    console.log(`[[[ 1 ]]] name => ${name} && this.root ===> `, this.root);

    // create the view 
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

    // Initialize private properties
  }



  /**
   * Renders the view's template
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
   * Method used to run the view
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


    // HACK / IDEA: allocating enough time before executing the `onReady()` method,
    //              this is to prepare for any unforseen issues
    // after 0.1 seconds or 100 milliseconds...
    setTimeout(() => {
      // ...call the onReady() method
      this.onReady();
    }, 100);


    
  }


  // Opens the view
  async open() {
    // TODO: Make sure the view has not been opened already
    await this.run();
    // await super.run();
    this.opened = true;
  }

  // Closes the view
  close() {
    // HACK: remove the view's shadow root
    this.shadowRoot.innerHTML = '';

    this.opened = false;
  }



  /**
   * Handler that is called when the view is ready
   * NOTE: User *can* overrride the method
   */
  onReady() {

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40m\x1b[31m[onReady]: ${this.name} is ready`); 
  }

  
  /* >> Public Setters << */

  /* >> Public Getters << */

  /**
   * Returns the id of the screeen.
   * 
   * @returns { String } - the camel cased copy of the current view's name (e.g. 'splash-view' => 'splashView')
   */
  get viewId() {
    return this.name.toCamelCase();
  }

  /**
   * Returns the views's `<div id="splashViewContainer">` element in the shadow root
   * 
   * @returns { Element } containerEl (e.g. )
   */
  get containerEl() {
    return this.shadowRoot.getElementById(`${this.viewId}Container`); // <- e.g. 'viewContainer'
  }


  /**
   * Returns the host element of the app.
   * NOTE: This element holds the shadowRoot of this view
   *
   * @returns { HTMLElement } 
   */
  get host() {
    return this.root.querySelector(`#${this.viewId}`); // <- HACK: Cannot select and element's id from `<div id="views">` of parent page
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
   * Returns TRUE if the view is opened, otherwise FALSE
   *
   * @returns { Boolean }
   */
  get isOpened() {
    return this.opened;
  }


  /* >> Private Methods << */

  /**
   * Creates the view
   * NOTE: This method will create a template element with the formatted html from `render()`, 
   *       and add it to the corresponding host in DOM.
   *
   * @private
   */
  #create() {

    // creating the host element in root as `hostEl`, with the `viewId`...

    let hostEl = document.createElement('div');
    hostEl.id = this.viewId;
    hostEl.classList.add('view');
    hostEl.setAttribute('fit', '');
    // append this `hostEl` to the root
    this.root.appendChild(hostEl);
     
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

    } else {
      // TODO: stop the engine and hide or remove the view's host from root
        
      // remove the view's host content
      this.host.innerHTML = '';

      // call the `onClose()` method
      this.onClose();
    }


  }

  /* >> Private Setters << */

  /* >> Private Getters << */




}; // <- End of `View` class


// Attach some mixins to `View`...
Object.assign(View.prototype, eventMixin);

// Attach some behaviors to `View`...
// Object.assign(View.prototype, ViewBehavior);



// TODO: Make this a custom element
// customElements.define('ms-view', View);
