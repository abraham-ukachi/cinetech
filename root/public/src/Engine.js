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
* @name: Engine
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*
*   1-|> import './Engine';
*    -|> 
*    -|> class App extends Engine {
*    -|> 
*    -|>  constructor() { super() }
*    -|> 
*    -|> }
*
*
*   2-|> // Create a `sleeping` boolean property in App class
*    -|>
*    -|> class App extends Engine {
*    -|>   ...
*    -|>   static get properties() {
*    -|>
*    -|>    return {
*    -|>      sleeping: { type: Boolean }
*    -|>    };
*    -|>  }
*    -|>  ...
*    -|>
*
*   3-|> // Initialize the `sleeping` boolean property in `init()` method
*    -|>
*    -|> class App extends Engine {
*    -|>   ...
*    -|>   init() {
*    -|>     this.sleeping = false;
*    -|>  }
*    -|>  ...
*    -|>
*
*   4-|> // Get the value of `sleeping` property with the App object
*    -|>
*    -|> let app = new App();
*    -|> let sleeping = app.getProperty('sleeping');
*    -|> console.log(sleeping);
*    -|>
*    =|o> true
*/


import { loaderMixin } from './helpers/mixins/loader-mixin.js';

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅





// Defining some constant variables...

// property update delay
const PROPERTY_UPDATE_DELAY = 30; 
// default run timeout
const DEFAULT_RUN_TIMEOUT = 60000; // <- 60 seconds = 1 minute






/**
 * `html`
 * Creating our very own `html` tag function for all template literals
 * for more info, [read this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).
 *
 * @type { TagFunction } 
 */
export const html = (strings, ...values) => {

  // Treating/parsing the values...

  values = values.map((value) => {
    // Initialize a `result` variable
    let result = value;

    // If the value is an array...
    if (Array.isArray(value)) {
      // ...HACK: remove any trailing comma 
      // by join their items with a space
      result = value.join(' ');
    }

    // return `result`
    return result;
  });

  // TEST: Log all the values
  // DEBUG [4dbsmaster]: tell me about all the values
  //values.forEach((value, index) => console.log(`\x1b[42m\x1b[30m[html]: value at ${index} => \x1b[0m`, value));


  // return the raw strings including their values
  return String.raw({ raw: strings }, ...values);
};






// Creating a `Engine` class...

// TODO: Use `getController()` instead of `#_controller` to 

/**
 * Class representing an app engine.
 *
 * @class
 */
export class Engine {

  // public properties

  // private properties  

  /**
   * The Property Object
   * This contains the initial, old and new/value properties
   *
   * @type { Object }
   * @private
   **/
  #_props = {init: {}, old: {}, value: {}};

  /**
   * Controller
   *
   * @type { Class }
   */
  #_controller = null; // <- the controller

  /**
   * Changed properties
   * This is just a 'temporary' list of properties that have changed
   *
   * @type { Array }
   * @private
   */
  #_changedProps = [];


  /**
   * Properties Update Timer
   *
   * @type { setTimeout } 
   */
  #_propsUpdateTimer = null;


  /**
   * Run Timer
   */
  #_runTimer = null;


  /**
   * Stylesheets of the controller
   *
   * @type { Array }
   * @private
   */
  #_stylesheets = [];


  /**
   * Constructor of the engine
   *
   * @param { Class } controller - The child class that inherits this `Engine` class
   */
  constructor(controller = this.constructor) {
    // Initialize the private `_controller` variable
    this.#_controller = controller;
    
    // If this `_controller` has some properties...
    if (this.#_controller.hasOwnProperty('properties')) {
      // ...call the properties initializer of the engine's controller
      this.#_propertiesInitializer(this.#_controller.properties);
    }


    // initialize the prototypes
    this.#_prototypesInitializer();

    // Load all assets with a 5 minutes timeout
    // this.#_loadAssets(1);

    // call the `init()` public method
    this.init();
    
  }



  /* >> Public Methods << */

  /**
   * The first method that is called when this engine is instantiated or inherited.  
   * NOTE: Any user can override this method
   */
  init() {}


  /**
   * Method used to define the controller's default template string
   * NOTE: Any user can override this method
   *
   * Example usage:
   *
   *  render() {
   *    return html`<span>Hello, World!</span>`;
   *  }
   *
   * @returns { HTMLTemplate }
   */
  render() {
    return html`<span>hello from ${this.name}</span>`;
  }

 
  /**
   * Method used to run this engine
   * NOTE: Any user can override this method
   *
   * TODO: Stop running the engine after the given `timeout`
   *
   * @param { ShadowRoot }
   * @param { Number } timeout - in milliseconds
   *
   * @returns { Promise } promise - resolve(loadedThemes, loadedStyles, loadedAnimations)
   */
  run(shadowRoot = this.shadowRoot, timeout = DEFAULT_RUN_TIMEOUT) {
    // declare some undefined variables
    let loadedThemes, loadedStyles, loadedAnimations;

    // IDEA: dynamically load all the available `theme`, `styles` and `animations` assets of the controller 

    // cancel any active `runTimer`
    // clearTimeout(this.#_runTimer);

    // get the controller
    let controller = this.getController();


    // return a promise while attempting to load all assets
     return new Promise(async (resolve, reject) => {

       // TODO|IDEA: Stop running the engine after the given `timeout`
       // this.#_runTimer = setTimeout(() => reject('timeout'), timeout);

       try { // <- trying to load some assets safely ;)

         // initalize an empty resolve object as `resObj` 
         let resObj = {};
        
         // if the controller has themes...
         if (controller.theme?.length) {
           // ...load the themes
           loadedThemes = await this._loadThemes(shadowRoot, [...this.#_controller.theme]);

           // add this `loadedThemes` to the response object
           resObj.loadedThemes = loadedThemes;
         }

         if (controller.styles?.length) { // <- controller has styles...
           // ...load the styles
           loadedStyles = await this._loadStyles(shadowRoot, [...this.#_controller.styles]);

           // add this `loadedStyles` to the response object
           resObj.loadedStyles = loadedStyles;
         }

         if (controller.animations?.length) { // <- controller has animations...
           // ...load the animations
           loadedAnimations = await this._loadAnimations(shadowRoot, [...this.#_controller.animations]);
           
           // add this `loadedAnimations` to the response object
           resObj.loadedAnimations = loadedAnimations;
         } 

         // cancel the `runTimer`
         // clearTimeout(this.#_runTimer);

         // resolve this promise
         resolve(resObj);

       } catch (error) {
         // return the error message
         reject(error);

       }

     });
  }

  /**
   * Handler that is called whenever a property gets reset
   * NOTE: The user can override this method
   *
   * @param { String } prop - The name of the property that was reset
   * @param { String|Number|Boolean|Array } value - The value the property after reset
   * @param { String|Number|Boolean|Array } oldValue - The value of the property before reset
   *
   */
  propertyResetHandler(prop, value, oldValue) {}


  /**
   * Method used to set and initialize or create a new property 
   * with the given `propName`, `propType` and `propValue`
   *
   * @param { String } propName
   * @param { String } propType
   * @param { String|Number|Boolean|Array } propValue
   *
   * @returns { Boolean } result - Returns TRUE, if the property was set successfully ;)
   */
  setProperty(propName, propType, propValue) {
    // Initialize the `result` variable
    let result = false;

    // do nothing if controller has no properties
    if (!this.#_controller.properties) { return result }
    
    // Checking if a property with this name already exists, using our beloved ternary statement...
    let propFound = Object.keys(this.#_controller.properties).includes(propName) ? true : false; // <- NN; i know ;)

    if (!propFound) {
      // add the property to the controller's properties list
      this.#_controller.properties[propName] = { type: propType };

      this.#_props.init[propName] = undefined;
      this.#_props.value[propName] = propValue;
      this.#_props.old[propName] = undefined;

      // Define this property
      Object.defineProperty(this, propName, {

        get() {
          return this.#_propertyGetter(propName); 
        },

        set(newPropValue) {
          this.#_propertySetter(propName, newPropValue);
        },

        enumerable: true,
        configurable: true
      });

      // Set the result to TRUE
      result = true;
    }


    // return `result`
    return result;
    
  }

  /**
   * Returns the property value of the given `propName`
   *
   * @returns { String|Number|Boolean|Array }
   */
  getProperty(propName) {
    return this.#_props.value[propName];
  }

  /**
   * Returns the controller of this engine (a.k.a the constructor)
   *
   * @returns { Class }
   */
  getController() {
    return this.#_controller;
    //return this.constructor;
  }


  /**
   * Adds the given constructable `stylesheet` to the specified `controller`
   *
   * @param { CSSStyleSheet } stylesheet
   * @param { HTMLDocument|ShadowRoot } controllerDocument
   *
   * @returns { Boolean } Returns TRUE if the stylesheet was added successfully ;)
   */
  addStylesheet(stylesheet, controllerDocument = document) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[42m\x1b[1m\x1b[30m[addStylesheet] (BEFORE): stylesheet => ${eval(stylesheet)} & controllerDocument => ${eval(controllerDocument)}\x1b[0m`);

    // Do nothing if this `stylesheet` has already been added
    if (this.verifyStylesheet(stylesheet) === true) { return false }
    
    // IF NOT, add (technically, append) the given `stylesheet` to the private `#_stylesheets` list
    this.#_stylesheets.push(...stylesheet);



    // Update the `controllerDocument`'s stylesheets
    controllerDocument.adoptedStylesheets = [this.#_stylesheets]; // <- WARNING: not supported by all browsers yet ;)

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[42m\x1b[1m\x1b[30m[addStylesheet] (AFTER): stylesheet => ${eval(stylesheet)} & controllerDocument => ${eval(controllerDocument)}\x1b[0m`);

    return true; // <- everything went well; stylesheet was added & update!
  }

  
  /**
   * Method used to verify or check if a stylesheet has been added
   * 
   * @param { CSSStyleSheet } stylesheet
   *
   * @returns { Boolean } - Returns TRUE if the given `stylesheet` was found in the private `#_stylesheets` list
   */
  verifyStylesheet(stylesheet) {
    return this.#_stylesheets.includes(stylesheet);
  }

  /**
   * Returns all stylesheets of the given `controller`
   *
   * @param { HTMLDocument } controller
   *
   * @returns { Array[CSSStyleSheet] } stylesheets
   */
  getStylesheets(controller = this.getController()) {
    return this.#_stylesheets;
  }

  /* >> Public Setters << */

  /* >> Public Getters << */





  /* >> Private Methods << */

  /**
   * Resets the property with the given `propName` to it's initial state / value
   *
   * @param { String } propName - The name of an existing property to be reset
   * @param { Boolean } notifyController - If TRUE, this engine or controller will be notified of this recent change
   */
  _resetProperty(propName, notifyController = false) {
    // Get the initial prop value from the private `#_props` as `value`
    let value = this.#_props.init[propName];
    // Get the old prop value as `oldValue`
    let oldValue = this[propName];

    // Assign this `value` to the corresponding `propName`
    this[propName] = value;

    // If the controller should be notified (i.e. `notifyController` is TRUE)...
    if (notifyController) {
      // Call the `propertyResetHandler()` to notify this engine or controller that a property has been reset
      this.propertyResetHandler(propName, value, oldValue);
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[35m[resetProperty]: propName => ${propName} & notifyController ? ${notifyController}\x1b[0m`);
    
  }


  /**
   * Method used to initialize all the neccessary prototypes 
   * @private
   */
  #_prototypesInitializer() {
    
    // String Prototypes 
    
    /**
     * capitalize - string - prototype
     */
    String.prototype.capitalize = function() { 
      return String(this.charAt(0)).toUpperCase() + this.substr(1, this.length);
    };

    /**
     * lowers the first letter of a string
     */
    String.prototype.lowerFirstLetter = function() {
      return String(this.charAt(0)).toLowerCase() + this.substr(1, this.length);
    }

    /**
     * to camel case
     * NOTE: This prototype changes a hyphenated string, 
     *       say 'abraham-ukachi' into 'abrahamUkachi' (camel case)
     */
    String.prototype.toCamelCase = function() {
      // Initialize a `result` variable
      let result = '';

      // split the string using `-` as a separator into a `splitValues` list
      let splitValues = this.split('-');
      // capitalize the items of a mapped `splitValues` list ignoring the first item,
      // while making sure the first letter is a lower-cased
      let mappedValues = splitValues.map((item, index) => {
        return (index > 0) ? item.capitalize() : item.lowerFirstLetter();
      });

      // join the mappedValues as result
      result = mappedValues.join('');
      
      // DEBUG [4dbsmaster]: tell me about it ;)
      // console.log(`[toCamelCase - prototype](1): result => ${result}`);
      // console.log(`[toCamelCase - prototype](2): splitValues => `, splitValues);
      // console.log(`[toCamelCase - prototype](3): mappedValues => `, mappedValues);
      // console.log(`[toCamelCase - prototype](4): result => `, result);

      // return the `result`
      return result;
    };

    // Array Prototypes


    // - - -
    
    
    /**
     * CSSStyleSheet Prototypes
     */
    CSSStyleSheet.prototype.getAllCSSText = function() {
      // Initialize the `allCSSText` variable
      let allCSSText = '';

      // Loop through `cssRules` of this stylesheet
      for (const rule of this.cssRules) {
        // append the current cssText of `rule` to `allCSSText`
        allCSSText += rule.cssText;
      }

      // Return `allCSSText`
      return allCSSText;
    };
    
    

  }


  /**
   * Method used to initialize all the given properties
   *
   * @param { Object } properties
   * @private
   */
  #_propertiesInitializer(properties) {
    // Loop through all [name, data] of the properties
    Object.entries(properties).map(([propName, propData]) => { 
      // Initialize the `propValue` variable by setting it to 'undefined'
      let propValue = undefined; //propData.type();

      // assign this undefined `propValue` to the current property's value
      this.#_props.value[propName] = propValue;

      // Define this property
      Object.defineProperty(this, propName, {

        get() {
          return this.#_propertyGetter(propName); 
        },

        set(newPropValue) {
          this.#_propertySetter(propName, newPropValue); 
        },

        enumerable: true,
        configurable: true
      });

    });

  }

    /**
     * Setter for the given `propName` property
     *
     * @param { String } propName - The name of the property
     * @param { String|Number|Boolean|Array } propValue - The new value of the property
     * @private
     */
  #_propertySetter(propName, propValue) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    // console.log(`\x1b[45m\x1b[2;30m[propertySetter] (1): propName => ${propName} & propValue => ${propValue} \x1b[0m`, this.#_props);
    // console.log(`\x1b[45m\x1b[2;30m[propertySetter] (2): typeof #_controller.properties?.[propName].type => \x1b[0m`, typeof this.#_controller.properties?.[propName].type());

      // Do nothing if the given `propValue` type is not the same as
      // the specified type of the corresponding controller property, using an optional operator ('?.').
      if (typeof propValue !== typeof this.#_controller.properties?.[propName].type()) { return }
       
      // Get the old value of this property as `oldPropValue`
      // let oldPropValue = this.#_props.old[propName];

      // Get the current value of this property as `currentPropValue`
      let currentPropValue = this.#_props.value[propName];

      // DEBUG [4dbsmaster]: tell me about it ;)
      // console.log(`\x1b[45m\x1b[2;30m[propertySetter]: propName => ${propName} & propValue => ${propValue}`, this.#_props);
      
      // If the current value is not the same as the given `propValue`... 
      if (currentPropValue !== propValue) {
        // ...Check if the initial value of this property has been set...
        if (typeof this.#_props.init[propName] === 'undefined') { // <- ...if it hasn't or undefined...
          // ...set it !
          this.#_props.init[propName] = propValue;
          // Also, set the current value to `propValue`
          this.#_props.value[propName] = propValue;

          // 
        } else { // <- the initial value has already been set, therefore this is a #propertyUpdate
          // So, let's update the current value with the given `propValue`
          this.#_props.value[propName] = propValue;
          
          // Add this property's name to the list of changed properties (i.e. `#_changedProps`)
          this.#_changedProps.push(propName);

          // Update the old property value w/ the current (not new)
          this.#_props.old[propName] = currentPropValue;


          // Clear any active timer for property update`propsUpdateTimer`
          clearTimeout(this.#_propsUpdateTimer);

          // Setup a private timer for property update named `#_propsUpdateTimer`
          this.#_propsUpdateTimer = setTimeout(() => {
            
            // Map the `#_changedProperties` and asign the returned list to `changedProperties` variable
            let changedProperties = this.#_changedProps.map((propName) => {
              return {
                name: propName, 
                value: this.#_props.value[propName],
                oldValue: this.#_props.old[propName]
              };
            });

            // call the `propertiesUpdated()` handler with one argument: `changedProperties`
            this.propertiesUpdated(changedProperties);

            // BUG FIXED: reset or empty the list of changed properties `#_changedProps`
            //            by assigning it to an new empty array
            this.#_changedProps = [];

          }, PROPERTY_UPDATE_DELAY);

        } // <- End of else

      }


      // DEBUG [4dbsmaster]: tell me about it ;)
      // console.log(`[_propertySetter](1): propName => ${propName} & propValue => ${propValue}`); 
      // console.log(`[_propertySetter](2): currentPropValue => ${currentPropValue}`); 


    }


    /**
     * Getter for the given `propName` property
     * 
     * @param { String|Number|Boolean|Array } propValue
     */
    #_propertyGetter(propName) {
      return this.#_props.value[propName];
      // return this[`__${propName}`];
    }


  /* >> Private Setters << */

  /* >> Private Getters << */

}; // <- End of `Engine` class


// Attach the loader mixin to the engine
Object.assign(Engine.prototype, loaderMixin);
