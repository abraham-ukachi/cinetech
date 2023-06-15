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
* @name: Splash Screen
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> import { SplashScreen } from 'src/screens/splash-screen';
*    -|> 
*    -|> // get the root of all 'screens' from `muvishoApp`
*    -|> const root = muvishoApp.getRootOf(APP_SCREENS);
*    -|> const controller = SplashScreen;
*    -|> 
*    -|> // instantiate the `SplashScreen`
*    -|> let splashScreen = new SplashScreen('splash-screen');
*    -|> 
*    -|> // show the splash screen
*    -|> splashScreen.show();
*    -|> 
*    -|> }
*
*/

import { html } from '../Engine.js';
import { Screen } from '../Screen.js';

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// Defining some constant variables...

const TIMEOUT_PROGRESS = 60; // <- in milliseconds (i.e. 1000ms = 1 second)
const INCREMENT_PROGRESS = 1;


// Create a `ScreenScreen` class
export class SplashScreen extends Screen {

  /**
   * Properties
   *
   * @type { Object }
   */
  static get properties() {
    return {
      updated: { type: Boolean },
      shown: { type: Boolean },
      progressCount: { type: Number },
      progressBarHidden: { type: Boolean }
    };
  }

  /**
   * Styles
   *
   * @type { Array }
   */
  static get styles() {
    return ['splash-screen'];
  }


  /**
   * Animations
   *
   * @type { Array }
   */
  static get animations() {
    return [ 'fade-in', 'pop-in' ];
  }

  
  // Define some public properties
   
  // Define some private properties

  /**
   * Progress Timer
   *
   * @type { setInterval }
   * @private
   */
  #progressTimer = null;
  
  
  /**
   * Constructor of the Screen
   */
  constructor(name = 'splash-screen') {
    // call the `Screen` constructor with `Screen` as it's controller
    super(name);

    // set default attributes
    // this.screenId = name.toCamelCase();


    // DEBUG [4dbsmaster]: tell me about it ;)
    // console.log(`[constructor]: #_props.init => `, this.#_props.init);
  }


  /**
   * Method that is called from the Screen's constructor
   * @override from `Screen`
   */
  init() {
    // Initialize public properties
    this.updated = false;
    this.shown = false;
    this.progressCount = 0;
    this.progressBarHidden = false;
    
    // Initialize private properties
    
  }

  
  /**
   * Method used to render the screen
   * @override from `Screen`
   */
  render() {
    return html`
      <!-- Splash Screen Container -->
      <div id="splashScreenContainer" class="flex-layout vertical centered" fit>
        <!-- <p class="txt upper">hellooo from <a href="./login"><strong>${this.name}</strong></a></p> -->

        <!-- App Logo -->
        <svg id="appLogo" class="pop-in" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M18.66,16.32a4.62,4.62,0,0,0-.95-.47,4.36,4.36,0,0,0-1.37-.23l-.5,0,.14-.18A5.61,5.61,0,0,0,17,13.24a5.51,5.51,0,0,0-4.65-6.71,7.49,7.49,0,0,0-1.42,0,5.51,5.51,0,0,0-4.7,4.68,6.53,6.53,0,0,0,0,1.53,5.5,5.5,0,0,0,7.8,4.19,5,5,0,0,1,2.31-.5,3.57,3.57,0,0,1,1.6.43c.34.17.41.19.58.1A.4.4,0,0,0,18.66,16.32ZM11.3,7.91a1.18,1.18,0,0,1,.72,0,1.23,1.23,0,0,1,.86,1,1.19,1.19,0,0,1-2.35.34A1.22,1.22,0,0,1,11.3,7.91ZM7.79,10.86a1.21,1.21,0,0,1,1.47-1,1.2,1.2,0,0,1,.23,2.22A1.19,1.19,0,0,1,7.79,10.86Zm3.23,4a1.18,1.18,0,0,1-1.82.24,1.19,1.19,0,0,1,.61-2,1.33,1.33,0,0,1,.59,0,1.22,1.22,0,0,1,.69.63.82.82,0,0,1,.1.42A1,1,0,0,1,11,14.87Zm1-2.54a.48.48,0,0,1-.78-.23.47.47,0,0,1,.45-.59.84.84,0,0,1,.19,0,.47.47,0,0,1,.14.79Zm2.19,2.78a1.17,1.17,0,0,1-1.63,0,1.19,1.19,0,0,1,1-2,1.21,1.21,0,0,1,1,1.17A1.14,1.14,0,0,1,14.21,15.11Zm1.29-3.54a1.68,1.68,0,0,1-.44.48,1.19,1.19,0,0,1-1.68-.49,1.17,1.17,0,0,1,.22-1.37,1.13,1.13,0,0,1,1.15-.31A1.19,1.19,0,0,1,15.5,11.57Z"/>
            <rect width="1.81" height="1.59" x="3.09" y="4.27" rx=".42"/>
            <rect width="1.81" height="1.59" x="3.09" y="18.11" rx=".42"/>
            <rect width="1.81" height="1.59" x="3.09" y="13.57" rx=".42"/>
            <rect width="1.81" height="1.59" x="3.09" y="9.04" rx=".42"/>
            <rect width="1.81" height="1.59" x="19.1" y="18.11" rx=".42"/>
            <rect width="1.81" height="1.59" x="19.1" y="4.27" rx=".42"/>
            <rect width="1.81" height="1.59" x="19.1" y="13.57" rx=".42"/>
            <rect width="1.81" height="1.59" x="19.1" y="9.04" rx=".42"/>
        </svg>
        <!-- End of App Logo -->

        <!-- AB Logo -->
        <svg id="abLogo" class="fade-in" xmlns="https://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 24 24">
          <path d="m1.8 20.5 9.3-17v17zM22.2 7.7l-9.3-4.2v17l9.3-4.2-4.7-4.3z" />
          <path d="m12.9 20.5 9.3-4.2-9.3-8.6z" opacity=".15" overlay/>
        </svg>
        <!-- End of AB Logo -->

        <!-- Progress -->
        <progress id="progressBar" class="bottom" value="10" max="100"></progress>
      </div>
      <!-- End of Splash Screen Container -->
    `;
  }


  /**
   * First time this screen gets updated 
   * @override from `Screen`
   */
  firstUpdated() {

    this._clicks = 0;

    // add event listeners here
    this.shadowRoot.addEventListener('click', () => console.log(`clicked the splash screen ${this._clicks++} times`))

    console.log(`\x1b[33m[firstUpdated]: ${this.name} has been updated #firstTime ;)\x1b[0m`);
  }

  /**
   * Handler that is called whenever a property changes
   *
   * @param { Array[Object] } changedProperties
   * @override from `Screen`
   */
  propertiesUpdated(changedProperties) {
    super.propertiesUpdated(changedProperties);
    
    changedProperties.forEach((prop) => {

      if (prop.name === 'progressCount') {
        this._handleProgressCount(prop.value);
      }

      if (prop.name === 'progressBarHidden') {
        this._handleProgressBarHidden(prop.value);
      }

    });
  }

  

  /* >> Public Methods << */


  /**
   * Handler that is called when the splash screen is ready
   */
  onReady() {
    // start the progress
    this.startProgress(TIMEOUT_PROGRESS, 10);

    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[36m[onReady]: ${this.name} is ready`);
  }


  /**
   * Handler that is called when the splash screen is shown 
   */
  onShow() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[onShow]: ${this.name} is shown`); 
  }
  

  /**
   * Handler that is called when the splash screen is hidden 
   */
  onHide() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.info(`\x1b[37m[onHide]: ${this.name} is hidden`); 
  }

  /**
   * Starts the progress with the given `timeout`
   *
   * @param { Number } timeout
   * @param { Number } start 
   * @param { Number } increment
   */
  startProgress(timeout = TIMEOUT_PROGRESS, start = 0, increment = INCREMENT_PROGRESS) {
    // Let's set an interval named `progressTimer` to run our
    // `#progressHandler` say, every 60 millisecond ?
    // TODO: ? Use a recursive method instead
    this.#progressTimer = setInterval(() => {
      // increment the progress count with the sum of `start` and `increment` values when `progressCount` is 0
      this.progressCount += (!this.progressCount) ? start + increment : increment;

      if (this.progressCount >= 100) this.stopProgress();

      console.log(`progressCount ==> \x1b[2m${this.progressCount}\x1b[0m`);

    }, timeout);
  }



  /**
   * Stops the progress
   *
   * @param { Boolean } resetCount - if TRUE the `progressCount` will be reset to 0.
  */
  stopProgress(resetCount = false) {
    // clear / cancel any active progress timer
    clearInterval(this.#progressTimer);

    // If `resetCount` is TRUE, Set the `progressCount` to 0
    if (resetCount) this.progressCount = 0;

    // hide the progress bar
    // this.hideProgressBar();
  }


  /**
   * Completes the progress
   * This method sets the `progressCount` to 100
   */
  completeProgress() {
    // stop the progress
    this.stopProgress();
    // set the progress bar's and count value to 100
    this.progressBarEl.value = 100;
    this.progressCount = 100;

    // hide the progress bar after 0.1 seconds
    setTimeout(() => this.hideProgressBar(), 100);

  }

  /**
   * Hides the progress bar element
   */
  hideProgressBar() {
    // set `progressBarHidden` property to TRUE
    this.progressBarHidden = true;
  }

  /**
   * Shows the progress bar element
   */
  showProgressBar() {
    // set `progressBarHidden` property to FALSE
    this.progressBarHidden = false;
  }

  /* >> Public Setters << */

  /* >> Public Getters << */

  /**
   * Returns the app logo `<svg id="appLogo">` element
   *
   * @returns { SVGElement }
   */
  get appLogoEl() {
    return this.shadowRoot.getElementById('appLogo');
  }

  /**
   * Returns the `<progress id="progressBar">` element
   *
   * @returns { Element }
   */
  get progressBarEl() {
    return this.shadowRoot.getElementById('progressBar');
  }

  /* >> Private Methods << */

  /**
   * Handler that is called whenever `progressCount` changes.
   *
   * @param { Number } progressCount
   */
  _handleProgressCount(progressCount) {

    // update the progress bar's value accordingly
    this.progressBarEl.value = progressCount;
    
    switch(progressCount) {
      case 5: // <- Do something at 5%
        break;
      case 25: // <- Do something at 25%
        // Activate the app logo by adding or setting the attribute `active` to ''.
        this.appLogoEl.setAttribute('active', '');
        break;
      case 60: // <- AT 60%...
        
        // First check for browser support of `Storage`
        // if the browser supports it...
        if (typeof(Storage) !== 'undefined') {
          // ...get the theme from local storage as `theme`
          let theme = localStorage.getItem('theme');
          // DEBUG [4dbsmaster]: tell me about it :)
          console.log(`\x1b[48;2;30m[_handleProgressCount](1 @ 60%): theme => ${theme}\x1b[0m`);

          // if a theme was found in storage...
          if (typeof(theme) == 'string') {
            // Update the app's theme
            muvishoApp.updateTheme(theme);

            //console.log(`loooo===>> CLASSIC_THEME => ${CLASSIC_THEME}`);

            // ...remove all the themes in body
            //document.body.classList.remove('classic', 'light', 'dark');
            // update the theme
            //document.body.classList.add(theme);
          }
        
        }
        break;
      case 75: // <- Do something at 75%
        // trigger and `almost-complete`  event.
        this.trigger('almost-complete', this);
        break;
      case 100: // <- AT 100%...
        // stop the progress
        this.stopProgress();
        // trigger the 'progress-complete` event.
        this.trigger('progress-complete', this);

        // TODO: trigger a 'splash-progress-complete' event
        // muvishoApp.trigger('splash-progress-complete');
        
        // TODO: Do something else when the `progressCount` is at 100%

        // DEBUG [4dbsmaster]: tell me about it :)
        console.log(`\x1b[48;2;30m[_handleProgressCount](2 @ 100%): progress completed! triggering 'progress-complete' event...\x1b[0m`);
        break;
      default:
        // Maybe do something otherwise

    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    // console.log(`\x1b[42;2;30m[_handleProgressCount](3): progressCount => ${progressCount}\x1b[0m`);
  }


  /**
   * Handler that is called whenever `progressBarHidden` property changes
   *
   * @param { Boolean } progressBarHidden
   */
  _handleProgressBarHidden(progressBarHidden) {
    this.progressBarEl.hidden = progressBarHidden;
  }

  /* >> Private Setters << */

  /* >> Private Getters << */




}; // <- End of `SplashScreen` class


// Attach a behavior to `SplashScreen`...
// Object.assign(SplashScreen.prototype, SplashScreenBehavior);


