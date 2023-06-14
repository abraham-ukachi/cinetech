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
* @name: Screen
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> // Create a splash screen with `Screen` class 
*    -|>
*    -|> import { Screen } from 'screen/'; 
*    -|>
*    -|> class SplashScreen extends Screen {
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




// TODO: Turn the Screen into a custom element by extending `HTMLElement`


// Create a `Screen` class with our `Engine`
export class Screen extends Engine {

  /**
   * Properties
   *
   * @type { Object }
   */
  static get properties() {
    return {
      updated: { type: Boolean },
      shown: { type: Boolean }

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
   * Screens 
   *
   * @type { Object }
   */
  static get screens() {
    return {};
  }

  
  // Define some public properties
   
  // Define some private properties  


  /**
   * Constructor of the Screen
   * NOTE: This constructor will be executed automatically when a new screen object gets created.
   *
   * @param { Class } controller - the screen controller (e.g. 'Screen')
   * @param { ShadowRoot } root - the top-level shadow DOM of the screen (e.g.:`<div id="screens"></div>` element of the Screen)
   * @param { String } name - the name of the sceen (e.g. 'splash-screen')
   */
  constructor(name = 'screen') {
    // call the `Engine` constructor with `Screen` as it's controller
    //super(Screen);

    super();
    
    // set default attributes
    // this.root = root;
    this.name = name;

    console.log(`[[[ 2 ]]] name => ${name} && this.root ===> `, this.root);

    console.log(`[[[ 3 ]]] muvishoApp ===> `, muvishoApp.screensEl);
    // create the screen 
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
    this.shown = null;

    // Initialize private properties
  }



  /**
   * Renders the screen's template
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

      if (prop.name === 'shown') {
        this.#_shownHandler(prop.value);
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
   * Method used to run the screen
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


  // Shows the screen
  show() {
    // TODO: Make sure the screen has not been shown already
    this.run();
    // await super.run();
    this.shown = true;
  }

  // Hides the screen
  hide() {
    // HACK: remove the screen's shadow root
    this.shadowRoot.innerHTML = '';

    this.shown = false;
  }



  /**
   * Handler that is called when the screen is ready
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
   * @returns { String } - the camel cased copy of the current screen's name (e.g. 'splash-screen' => 'splashScreen')
   */
  get screenId() {
    return this.name.toCamelCase();
  }

  /**
   * Returns the screens's `<div id="splashScreenContainer">` element in the shadow root
   * 
   * @returns { Element } containerEl (e.g. )
   */
  get containerEl() {
    return this.shadowRoot.getElementById(`${this.screenId}Container`); // <- e.g. 'screenContainer'
  }

  /**
   * Returns the root of the screeen (i.e. `<div id="screens">` )
   *
   * @returns { Element }
   */
  get root() {
    return muvishoApp.screensEl;
  }

  /**
   * Returns the host element of the app.
   * NOTE: This element holds the shadowRoot of this screen
   *
   * @returns { HTMLElement } 
   */
  get host() {
    return muvishoApp.shadowRoot.getElementById(this.screenId);
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



  /* >> Private Methods << */

  /**
   * Creates the screen
   * NOTE: This method will create a template element with the formatted html from `render()`, 
   *       and add it to the corresponding host in DOM.
   *
   * @private
   */
  #create() {

    // creating the host element in root as `hostEl`, with the `screenId`...

    let hostEl = document.createElement('div');
    hostEl.id = this.screenId;
    hostEl.classList.add('screen');
    hostEl.setAttribute('fit', '');
    // append this `hostEl` to the root
    this.root.appendChild(hostEl);
    // muvishoApp.screensEl.appendChild(hostEl);
     
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
   * Handler that is called whenever the `shown` property changes
   *
   * @param { Boolean } shown
   */
  #_shownHandler(shown) {

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40;1;37m[#_shownHandler]: shown ==> ${shown}\x1b[0m`);

    if (shown) {
      // run the engine
      //await this.run();
      
      // call the `onShow()` method
      this.onShow();

    } else {
      // TODO: stop the engine and hide or remove the screen's host from root
        
      // remove the screen's host content
      this.host.innerHTML = '';

      // call the `onHide()` method
      this.onHide();
    }


  }

  /* >> Private Setters << */

  /* >> Private Getters << */




}; // <- End of `Screen` class


// Attach some mixins to `Screen`...
Object.assign(Screen.prototype, eventMixin);

// Attach some behaviors to `Screen`...
// Object.assign(Screen.prototype, ScreenBehavior);



// TODO: Make this a custom element
// customElements.define('ms-screen', Screen);
