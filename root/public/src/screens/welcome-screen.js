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
* @name: Welcome Screen
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> import { WelcomeScreen } from 'src/screens/welcome-screen';
*    -|> 
*    -|> // instantiate the `WelcomeScreen`
*    -|> let welcomeScreen = new WelcomeScreen();
*    -|> 
*    -|> // show the splash screen
*    -|> welcomeScreen.show();
*    -|> 
*    -|> }
*
*/

import { html } from '../Engine.js';
import { Screen } from '../Screen.js';

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// Defining some constant variables...

// steps
const MUVISHO_STEP = 'muvisho';
const DISCOVER_STEP = 'discover';
const ACCOUNT_STEP = 'account';
const FAVORITE_STEP = 'favorite';
const CONVERSATION_STEP = 'conversation';
const LANGUAGE_STEP = 'language';
const THEME_STEP = 'theme';

// open setting duration
const OPEN_SETTINGS_DURATION = 300;

// change settings
const THEME_CHANGE_SETTING = 'theme';
const LANGUAGE_CHANGE_SETTING = 'language';



// Create a `WelcomeScreen` class
export class WelcomeScreen extends Screen {

  /**
   * Properties
   *
   * @type { Object }
   */
  static get properties() {
    return {
      theme: { type: String },
      lang: { type: String },
      updated: { type: Boolean },
      shown: { type: Boolean },
      currentStep: { type: Number },
      steps: { type: Array },
      animating: { type: Boolean },
      settingsOpened: { type: Boolean },
      changeSetting: { type: String },
      _welcomePackage: { type: Object }
    };
  }

  /**
   * Styles
   *
   * @type { Array }
   */
  static get styles() {
    return [ 'welcome-screen' ];
  }


  /**
   * Animations
   *
   * @type { Array }
   */
  static get animations() {
    return [ 'slide-from-right', 'slide-from-left', 'slide-left', 'slide-right', 'fade-in' ];
  }

  
  // Define some public properties
   
  // Define some private properties
 
  #_slideDuration = 300;
  #_slideTimer = null;
  #_settingsOpenTimer = null;


  /**
   * Constructor of the Screen
   *
   * @param { String } name
   */
  constructor(name = 'welcome-screen') {
    // call the `Screen` constructor with a `name`
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
    this.theme = muvishoApp.theme;
    this.lang = muvishoApp.lang;
    this.updated = false;
    this.shown = false;
    this.currentStep = 0;
    this.animating = false;
    this.settingsOpened = false;
    this.changeSetting = '';

    // steps
    this.steps = [
      MUVISHO_STEP,
      DISCOVER_STEP,
      ACCOUNT_STEP,
      FAVORITE_STEP,
      CONVERSATION_STEP,
      LANGUAGE_STEP,
      THEME_STEP
    ];



    // Initialize private properties

    // welcome package
    this._welcomePackage = {};


    // Load the the `welcomePackage` object
    this._loadWelcomePackage();
  }

  
  /**
   * Method used to render the screen
   * @override from `Screen`
   */
  render() {
    return html`
      <!-- Welcome Screen Container -->
      <div id="welcomeScreenContainer" class="flex-layout vertical centered" fit>
        <!-- App Layout -->
        <div id="appLayout" class="flex-layout horizontal" fit>

          <!-- MAIN - App Layout -->
          <main class="flex-layout vertical fade-in">

            <!-- App Header -->
            <div id="appHeader">

              <!-- App Bar -->
              <div id="appBar" class="app-bar">


                <!-- Back Icon Button -->
                <button id="backIconButton" title="Back" hidden class="icon-button">
                  <span class="material-icons icon">arrow_back_ios</span>
                </button>

                <!-- Title Wrapper -->
                <div class="title-wrapper"></div>
                <!-- End of Title Wrapper -->

                <!-- Theme Icon Button -->
                <a href="./?change=theme" role="icon-button" tabindex="0" id="themeIconButton" title="${muvishoApp.i18n.getString('changeTheme')}" class="icon-button">
                  <span class="material-icons icon">format_paint</span>
                </a>

                <!--  Language Icon Button -->
                <a href="./?change=language" role="icon-button" tabindex="0" id="languageIconButton" title="${muvishoApp.i18n.getString('changeLanguage')}" class="icon-button">
                  <span class="material-icons icon">language</span>
                </a>

                <!-- Skip Button -->
                <button id="skipButton" tabindex="0" title="Skip to the last step" naked>${muvishoApp.i18n.getString('skip')}</button>


              </div>
              <!-- End of App Bar -->

            </div>
            <!-- End of App Header -->

            <!-- Content - App Layout -->
            <!-- NOTE: This is arguably the most important content ever!!! -->
            <!-- TODO: (scrollableTarget) - Make it the only scrollable content -->
            <div id="content">

              ${Object.keys(this._welcomePackage).map((packageId, index) => {
                return html`
                  <!-- View / Container -->
                  <div class="view container centered vertical flex-layout" ${(index === 0) ? 'active' : ''}>
                    
                    <!-- Doodle -->
                    <span class="${packageId}-doodle doodle"></span>

                    <!-- Display-Title -->
                    <h2 class="display-title">${this._welcomePackage[packageId].title}</h2>

                    <!-- Display-Subtitle -->
                    <p class="display-subtitle">${this._welcomePackage[packageId].description}</p>

                  </div>
                  <!-- End of View / Container -->
                `;
              })}
              
            </div>
            <!-- End of Content - App Layout -->


            <!-- Dots - NAV -->
            <nav id="dots" class="horizontal flex-layout centered">

              ${Object.keys(this._welcomePackage).map((packageId, packageIndex) => {
                return html`
                  <li 
                     title="${this._welcomePackage[packageId].title}" 
                     role="dot"
                     class="dot"
                     tabindex="${packageIndex}"
                     ${(packageIndex === this.currentStep) ? 'active' : ''}>
                  </li>
                `;
              })}
              
            </nav>
            <!-- End of Dots - NAV -->

            <!-- FOOTER -->
            <footer class="vertical flex-layout centered">
              <!-- Footer Container -->
              <div class="container">
                <!-- Get Started - BUTTON -->
                <button id="getStartedButton" contained shrinks hidden>${muvishoApp.i18n.getString('getStarted')}</button>

                <!-- Next - BUTTON -->
                <button id="nextButton" contained shrinks>${muvishoApp.i18n.getString('next')}</button>

              </div>
              <!-- End of Footer Container -->
            </footer>
            <!-- End of FOOTER -->


          </main>
          <!-- End of MAIN - App Layout -->

          <!-- Settings Container -->
          <div id="settingsContainer" class="vertical flex-layout">

            <!-- App Bar -->
            <div class="app-bar flex-layout horizontal center">
              <!-- Close Settings Icon Button -->
              <a href="./" tabindex="0" role="icon-button" id="closeSettingsIconButton" title="${muvishoApp.i18n.getString('closeSettings')}" class="icon-button">
                <span class="material-icons icon">close</span>
              </a>

                <!-- Title Wrapper -->
                <h3 class="title-wrapper">${muvishoApp.i18n.getString('pickASetting')}</h3>
                <!-- End of Title Wrapper -->

            </div>
            <!-- End of App Bar -->

            <!-- Theme Menu - Change Setting -->
            <menu id="themeMenu" class="change setting" hidden>
              ${muvishoApp.getSupportedThemes().map((theme, themeIndex) => {
                return html`
                  <li ${(theme.id === muvishoApp.theme) ? 'selected' : ''}
                  tabindex="0" role="menu-item" data-id="${theme.id}" class="theme">

                    <span class="label">${theme.name}</span>
                    <span class="material-icons icon">done</span>

                  </li>`;
              })}
            </menu>
            <!-- End of Theme Menu - Change Setting -->

            <!-- Language Menu - Change Setting -->
            <menu id="languageMenu" class="change setting" hidden>
              ${muvishoApp.getSupportedLanguages().map((lang, langIndex) => {
                return html`
                  <li ${(lang.id === muvishoApp.lang) ? 'selected' : ''}
                  tabindex="0" role="menu-item" data-id="${lang.id}" class="lang">

                    <span class="label">${lang.name}</span>
                    <span class="material-icons icon">done</span>

                  </li>`;
              })}
            </menu>
            <!-- End of Language Menu - Change Setting -->

            <!-- Vertical Divider Left-->
            <span class="divider vertical left"></span>
          </div>
          <!-- End of Settings Container -->

          <!-- Details Container | ASIDE -->
          <aside id="detailsContainer" class="vertical flex-layout centered fade-in">
            <!-- Outlined App Logo -->
            <span class="app-logo" outlined hidden></span>

            <!-- Wallpaper -->
            <span class="wallpaper portrait"></span>

            <!-- Divider @ Vertical Left -->
            <span class="divider vertical left"></span>
          </aside>
          <!-- Details Container | ASIDE -->

        </div>
        <!-- End of App Layout -->

      </div>
      <!-- End of Welcome Screen Container -->
    `;
  }


  /**
   * First time this screen gets updated 
   * @override from `Screen`
   */
  firstUpdated() {

    //TODO: add mouse gestures on views (i.e. listen to 'mouse'+ events)

    // add event listeners here
    this.nextButtonEl.addEventListener('click', (event) => this.nextStep());
    this.backIconButtonEl.addEventListener('click', (event) => this.previousStep());
    this.getStartedButtonEl.addEventListener('click', (event) => this.trigger('start'));
    this.skipButtonEl.addEventListener('click', (event) => this.skipSteps());

    // looping through all the dots...
    this.dotEls.forEach((dotEl, index) => {
      // ...listen to the 'click' events on each `dotEl`
      dotEl.addEventListener('click', (event) => this.stepTo(index));
    });

    // looping through all the theme menu-item elements...
    this.themeEls.forEach((themeEl) => {
      // ...listen to the 'click' events on each `themeEl`
      themeEl.addEventListener('click', (event) => this._handleThemeClick(event));
    });

    // looping through all the language menu-item elements...
    this.langEls.forEach((langEl) => {
      // ...listen to the 'click' events on each `langEl`
      langEl.addEventListener('click', (event) => this._handleLangClick(event));
    });

    // DEBUG [4dbsmaster]: tell me about it ;)
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

      if (prop.name === 'currentStep') {
        this._handleCurrentStepChange(prop.value, prop.oldValue);
      }

      if (prop.name === 'settingsOpened') {
        this._handleSettingsOpenedChange(prop.value);
      }

      if (prop.name === 'changeSetting') {
        this._handleChangeSettingChange(prop.value);
      }

      if (prop.name === 'lang') {
        this._handleLangChange(prop.value);
      }

      if (prop.name === 'theme') {
        this._handleThemeChange(prop.value);
      }

    });
  }

  

  /* >> Public Methods << */


  /**
   * Notifies this screen of the recent lang update
   *
   * @param { String } ?lang - optional
   */
  notifyLangUpdate(lang = this.lang) {

    // do nothing if the current change setting is not language
    if (this.changeSetting !== LANGUAGE_CHANGE_SETTING) { return }

    // Updating the language menu...
    
    // get the old or previously selected language element as `oldLangEL`
    let oldLangEl = this.getSelectedLangElement();

    // get the new language element as `newLangEl`
    let newLangEl = this.getLangElementById(lang);

    if (oldLangEl !== newLangEl) {
      // remove the `selected` property from `oldLangEl`
      oldLangEl.removeAttribute('selected');

      // add the `selected` property to `newLangEl`
      newLangEl.setAttribute('selected', '');
    }

  }

  /**
   * Notifies this screen of the recent theme update
   *
   * @param { String } ?theme - optional
   */
  notifyThemeUpdate(theme = this.theme) {

    // do nothing if the current change setting is not a theme 
    if (this.changeSetting !== THEME_CHANGE_SETTING) { return }

    // Updating the theme menu...
    
    // get the old or previously selected theme element as `oldThemeEL`
    let oldThemeEl = this.getSelectedThemeElement();

    // get the new language element as `newThemeEl`
    let newThemeEl = this.getThemeElementById(theme);

    if (oldThemeEl !== newThemeEl) {
      // remove the `selected` property from `oldThemeEl`
      oldThemeEl.removeAttribute('selected');

      // add the `selected` property to `newThemeEl`
      newThemeEl.setAttribute('selected', '');
    }
  }

  /**
   * Go to the next step
   * This method increases the `currentStep` by 1.
   */
  nextStep() {
    // #4codeReadability:
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[33m[nextStep]: totalSteps: ${this.totalSteps}\x1b[0m`);

    // Do nothing if there's an animation going on
    if (this.animating) { return }

    // #4codeReadability:
    // compute the next step value as `nextStepVal`
    let nextStepVal = this.currentStep + 1;
    
    // Do nothing, if the `nextStepVal` is more than the total number of steps
    if (nextStepVal > this.totalSteps) { return }

    // otherwise, update/set the `currentStep` to the `nextStepVal`
    this.currentStep = nextStepVal;
  }


  /**
   * Go to the previous step
   * This method decrease the `currentStep` by 1.
   */
  previousStep() {
    // #4codeReadability:

    // Do nothing if there's an animation going on
    if (this.animating) { return }

    // compute the previous step value as `prevStepVal`
    let prevStepVal = this.currentStep - 1;
    
    // Do nothing, if the `prevStepVal` is less than zero(0)
    if (prevStepVal < 0) { return }

    // otherwise, update/set the `currentStep` to the `prevStepVal`
    this.currentStep = prevStepVal;
  }


  /**
   * Updates the `currentStep` to the given `value`
   *
   * @param { Number } value
   */
  stepTo(value) {
    // Do nothing if theres' an animation going on
    if (this.animating) { return }

    // update the `currentStep` with the specified `value`
    this.currentStep = value;
  }


  /**
   * Method used to skip all steps
   */
  skipSteps() {
    // get the last step as `lastStep`
    let lastStep = this.getLastStep();
    // step to the last step
    this.stepTo(lastStep);
  }

  /**
   * Handler that is called when the splash screen is ready
   */
  onReady() {
    
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
    console.info(`\x1b[37m[onShow]: ${this.name} is hidden`); 
  }


  /**
   * Updates the duration of each slide animation
   *
   * @param { Number } duration - in milliseconds
   */
  setSlideDuration(duration) {
    this.#_slideDuration = duration;
  }

  /**
   * Returns the value of the slide duration
   *
   * @returns { Number }
   */
  getSlideDuration() {
    return this.#_slideDuration;
  }


  /**
   * Returns the last step count or name
   *
   * @param { Boolean } asName - if TRUE, the name of the last step will be returned instead
   *
   * @returns { Number|String }
   */
  getLastStep(asName = false) {
    // get the last step index as `lastStepIndex`
    let lastStepIndex = this.steps.length - 1;

    // return the last step's name or index based on the given `asName` boolean variable
    return (asName) ? this.steps[lastStepIndex] : lastStepIndex; 
  }

  /**
   * Returns the view element of the given `step`
   *
   * @param { Number } step
   *
   * @returns { Element }
   */
  getViewByStep(step) {
    return this.shadowRoot.querySelectorAll('.view')[step];
  }


  /**
   * Method used to notify all the dots of the recent change in `curentStep` value
   *
   * @param { Number } currentStep
   */
  notifyDots(currentStep = this.currentStep) {
    // loop through all the dot elementsd
    this.dotEls.forEach((dotEl, dotIndex) => {
      // If the dot's index is the same current step, and it doesn't have an `active` property yet...
      if ((dotIndex === currentStep) && (dotEl.hasAttribute('active') === false)) { 
        // ...add an active property to that `dotEl`
        dotEl.setAttribute('active', '');
      } else if (dotIndex !== currentStep) { // <- `dotIndex` is not the same `currentStep`...
        // ...remove any active property
        dotEl.removeAttribute('active');
      }

    });
  }


  /**
   * Returns the currently selected language element
   *
   * @returns { Element }
   */
  getSelectedLangElement() {
    return this.shadowRoot.querySelector('.lang[selected]');
  }


  /**
   * Returns the currently selected theme element
   *
   * @returns { Element }
   */
  getSelectedThemeElement() {
    return this.shadowRoot.querySelector('.theme[selected]');
  }


  /**
   * Returns the language menu-item element with the given `langElementId`
   * (e.g. `<li class="lang" role="menu-item">`)
   *
   * @param { String } langElementId - the `[data-id]` attribute of the language menu-item
   *
   * @returns { Element }
   */
  getLangElementById(langElementId) {
    return this.shadowRoot.querySelector(`.lang[data-id="${langElementId}"]`);
  }

  /**
   * Returns the theme menu-item element with the given `themeElementId`
   * (e.g. `<li class="theme" role="menu-item">`)
   *
   * @param { String } themeElementId - the `[data-id]` attribute of the theme menu-item
   *
   * @returns { Element }
   */
  getThemeElementById(themeElementId) {
    return this.shadowRoot.querySelector(`.theme[data-id="${themeElementId}"]`);
  }


  /* >> Public Setters << */

  /* >> Public Getters << */

  /**
   * Reuturns the `<menu id="themeMenu">` element
   *
   * @returns { Element }
   */
  get themeSettingMenuEl() {
    return this.shadowRoot.getElementById('themeMenu');
  }

  /**
   * Reuturns the `<menu id="languageMenu">` element
   *
   * @returns { Element }
   */
  get languageSettingMenuEl() {
    return this.shadowRoot.getElementById('languageMenu');
  }

  /**
   * Returns the `<h3 class="title-wrapper">` element in setting's container
   *
   * @returns { Element }
   */
  get settingsTitleEl() {
    return this.settingsContainerEl.querySelector('.title-wrapper');
  }


  /**
   * Returns the `<div id="settingsContainer">` element.
   *
   * @returns { Element } 
   */
  get settingsContainerEl() {
    return this.shadowRoot.getElementById('settingsContainer');
  }


  /**
   * Returns the `<button id="backIconButton">` element
   *
   * @returns { Element }
   */
  get backIconButtonEl() {
    return this.shadowRoot.getElementById('backIconButton');
  }

  /**
   * Returns the `<button id="languageIconButton">` element
   *
   * @returns { Element }
   */
  get languageIconButtonEl() {
    return this.shadowRoot.getElementById('languageIconButton');
  }

  /**
   * Returns the `<button id="themeIconButton">` element
   *
   * @returns { Element }
   */
  get themeIconButtonEl() {
    return this.shadowRoot.getElementById('themeIconButton');
  }

  /**
   * Returns the `<button id="nextButton">` element
   *
   * @returns { Element }
   */
  get nextButtonEl() {
    return this.shadowRoot.getElementById('nextButton');
  }

  /**
   * Returns the `<button id="getStartedButton">` element
   *
   * @returns { Element }
   */
  get getStartedButtonEl() {
    return this.shadowRoot.getElementById('getStartedButton');
  }


  /**
   * Returns the `<button id="skipButton">` element
   *
   * @returns { Element }
   */
  get skipButtonEl() {
    return this.shadowRoot.getElementById('skipButton');
  }

  /**
   * Returns a list of all dot elements
   *
   * @returns { Array[Element] }
   */
  get dotEls() {
    return this.shadowRoot.querySelectorAll('.dot');
  }


  /**
   * Returns a list of all theme menu-item elements
   *
   * @returns { Array[Element] }
   */
  get themeEls() {
    return this.shadowRoot.querySelectorAll('.theme');
  }

  /**
   * Returns a list of all theme language-item elements
   *
   * @returns { Array[Element] }
   */
  get langEls() {
    return this.shadowRoot.querySelectorAll('.lang');
  }

  /**
   * Returns a list of all view elements
   *
   * @returns { Array[Element] }
   */
  get viewEls() {
    return this.shadowRoot.querySelectorAll('.view');
  }


  /**
   * Returns the total number of steps
   *
   * @returns { Number } 
   */
  get totalSteps() {
    return Object.keys(this._welcomePackage).length;
  }



  /* >> Private Methods << */

  /**
   * Method used to remove all the slide animations from all view elements
   * NOTE: This method also removes any 'animating' attribute
   */
  _clearViewAnimations() {
    // initialize the animsToRemove` variable by setting it to all the 
    // class animations that should be removed from the view
    let animsToRemove = [ 'slide-left', 'slide-right', 'slide-from-left', 'slide-from-right' ];

    // loop through all view elements
    this.viewEls.forEach((viewEl) => {
      // remove all the previously defined class animations
      viewEl.classList.remove(...animsToRemove); 
      // remove the `animating` property/attribute from the `viewEl`
      viewEl.removeAttribute('animating');
    });

  }

  /**
   * Handler that is called whenever `settingsOpened` changes
   *
   * @param { Boolean } settingsOpened
   */
  _handleSettingsOpenedChange(settingsOpened) {
    // If `settingsOpened` is TRUE...
    if (settingsOpened) {
      // add the `opened` property to `settingsContainerEl`
      this.settingsContainerEl.setAttribute('opened', '');
    }else {
      // remove the `opened` property from `settingsContainerEl`
      this.settingsContainerEl.removeAttribute('opened');
    }

    // clear any previously actived `settingsOpenTimer`
    clearTimeout(this.#_settingsOpenTimer);

    // activate the `settingsOpenTimer`
    this.#_settingsOpenTimer = setTimeout(() => {
      // trigger the `setting-container-change` event
      this.trigger('settings-container-change', settingsOpened);

    }, OPEN_SETTINGS_DURATION);

  }


  /**
   * Handler that is called whenever `changeSetting` changes
   *
   * @param { String } changeSetting
   */
  _handleChangeSettingChange(changeSetting) {
    // Initialize the `settingsTitle` variable
    let settingsTitle = '';

    // By default, deactivate all related icon buttons
    this.themeIconButtonEl.removeAttribute('active');
    this.languageIconButtonEl.removeAttribute('active');


    switch (changeSetting) {
      case THEME_CHANGE_SETTING:
        // update `settingsTitle`
        settingsTitle = muvishoApp.i18n.getString('pickATheme'); 
        // hide the language settings menu
        this.languageSettingMenuEl.hidden = true;
        // show the theme settings menu
        this.themeSettingMenuEl.hidden = false;
        // activate the themes icon button
        this.themeIconButtonEl.setAttribute('active', '');
        break;

      case LANGUAGE_CHANGE_SETTING:
        // update `settingsTitle`
        settingsTitle = muvishoApp.i18n.getString('pickALanguage');  
        // hide the theme settings menu
        this.themeSettingMenuEl.hidden = true;
        // show the language settings menu
        this.languageSettingMenuEl.hidden = false;
        // activate the languages icon button
        this.languageIconButtonEl.setAttribute('active', '');
        break;
    }
    
    // update the text content of `settingsTitleEl` 
    this.settingsTitleEl.textContent = settingsTitle; 

    // notify both theme and lang updates
    this.notifyThemeUpdate();
    this.notifyLangUpdate();

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[32m[_handleChangeSettingChange]: changeSetting => ${changeSetting}`);

  }

  /**
   * Handler that is called whenever the `currentStep` changes
   *
   * @param { Number } currentStep
   * @param { Number } oldCurrentStep
   *
   */
  _handleCurrentStepChange(currentStep, oldCurrentStep) {

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[33m[_handleCurrentStepChange](1): currentStep => ${currentStep} & oldCurrentStep => ${oldCurrentStep}\x1b[0m`);

    // do nothing if the `oldCurrentStep` is undefined
    // IDEA: make sure this is truly the first change of `currentStep`
    if (typeof oldCurrentStep === 'undefined') { return }


    // get the last step as `lastStep`
    let lastStep = this.getLastStep();

    // If the `currentStep` is the same as the `lastStep`...
    if (currentStep === lastStep) {
      // ...trigger the `last-step` event
      this.trigger('last-step');

      // disable the skip button
      this.skipButtonEl.disabled = true;
      // hide the next button
      this.nextButtonEl.hidden = true;
      // show the 'Get Started' button
      this.getStartedButtonEl.hidden = false;

    }else { // <- `currentStep` is not the last
      // enable the skip button
      this.skipButtonEl.disabled = false;
      // show the next button
      this.nextButtonEl.hidden = false;
      // hide the 'Get Started' button
      this.getStartedButtonEl.hidden = true;
      
      // If this is the first step, hide the back icon-button, else dont! duh! ;)
      this.backIconButtonEl.hidden = (currentStep === 0) ? true : false;

    }

    // Now, let's animate the corresponding views accordingly, shall we ?
    this._animateViews(currentStep, oldCurrentStep);

    // notify the dots
    this.notifyDots();

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[34m[_handleCurrentStepChange]: currentStep => ${currentStep} & oldCurrentStep => ${oldCurrentStep} \x1b[0m`);
  }


  /**
   * Method used to animated the `.views` in content,
   * based on the given `newStep` and `oldStep`
   *
   * @param { Number } newStep - the new or current step
   * @param { Number } oldStep - the old step
   * @param { Number } slideDuration - the slide duration in milliseconds
   */
  _animateViews(newStep, oldStep, slideDuration = this.#_slideDuration) {
    // do nothing if the new step is the same as the old
    if (newStep === oldStep) { return }

    // remove any class animations & `animating` properties from all views
    this._clearViewAnimations();
    // Set `animating` property to TRUE
    this.animating = true;


    // get the incoming view element as `incomingViewEl`
    let inViewEl = this.getViewByStep(newStep);
    // get the outgoing view element as `outViewEl`
    let outViewEl = this.getViewByStep(oldStep);


    // update the animation duration of both views
    inViewEl.style.animationDuration = `${slideDuration}ms`;
    outViewEl.style.animationDuration = `${slideDuration}ms`;


    // add `animating` properties to both views
    inViewEl.setAttribute('animating', '');
    outViewEl.setAttribute('animating', '');

    // add the 'slide-from-right' or 'slide-from-left' to the `inViewEl`, based on the step values
    inViewEl.classList.add((newStep > oldStep) ? 'slide-from-right' : 'slide-from-left');
    // add the 'slide-right' or 'slide-left' to the `outViewEl`, based on the step values
    outViewEl.classList.add((newStep > oldStep) ? 'slide-left' : 'slide-right');
    

    // clear any active slide timer
    clearTimeout(this.#_slideTimer);

    // after the specified `slideDuration`...
    this.#_slideTimer = setTimeout(() => {
      // ...remove any class animations & `animating` properties from all views
      this._clearViewAnimations();
      // set `animating` property to FALSE
      this.animating = false;

      // remove the `active` properties from `outViewEl`
      outViewEl.removeAttribute('active');
      // add an `active` property to `inViewEl`
      inViewEl.setAttribute('active', '');

      // trigger the `view-change` event
      this.trigger('view-change', inViewEl, outViewEl);
      // trigger the `step-change` event too ;)
      this.trigger('step-change', newStep, oldStep);

    }, slideDuration);

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[35m[_animateViews](1): newStep => ${newStep} & oldStep => ${oldStep}\x1b[0m`);
    console.log(`\x1b[35m[_animateViews](2): inViewEl => `, inViewEl, `outViewEl => \x1b[0m`, outViewEl);
    console.log(`\x1b[35m[_animateViews](3): slideDuration => ${slideDuration} \x1b[0m`);
    

  }

  /**
   * Handler that is called whenever a theme menu-item in settings container is clicked
   *
   * @param { PointerEvent } event
   */
  _handleThemeClick(event) {
    // get the theme from the menu-item or target as `theme`
    let theme = event.currentTarget.dataset.id;
    
    // if `theme` is different from the current / screen's `theme`...
    if (theme !== this.theme) {
      // trigger the 'theme-select' event
      this.trigger('theme-select', theme);
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[36m[_handleThemeClick]: theme => ${theme} & event => \x1b[0m`, event);

  }


  /**
   * Handler that is called whenever a language menu-item in settings container is clicked
   *
   * @param { PointerEvent } event
   */
  _handleLangClick(event) {
    // get the language from the menu-item or target as `lang`
    let lang = event.currentTarget.dataset.id;

    // if `lang` is different from the current / screen's `lang`...
    if (lang !== this.lang) {
      // ..trigger the 'lang-select' event
      this.trigger('lang-select', lang);
    }


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[36m[_handleLangClick]: lang => ${lang} & event => \x1b[0m`, event);
  }


  /**
   * Handler that is called whenever `lang` changes
   *
   * @param { String } newLang - the new lang
   */
  _handleLangChange(newLang) {
    // notify this screen of this recent language update
    this.notifyLangUpdate(newLang);
  }

  /**
   * Handler that is called whenever `theme` changes
   *
   * @param { String } newTheme - the new theme 
   */
  _handleThemeChange(newTheme) {
    // notify this screen of this recent theme update
    this.notifyThemeUpdate(newTheme);
  }


  /**
   * Method used to load the `welcomePackage` object
   * TODO: Get the string value of each package based on the current user language preference.
   */
  _loadWelcomePackage() {

    // muvisho - welcome package
    this._welcomePackage["muvisho"] = {
      title: muvishoApp.i18n.getString('welcomeToX').replace(/%s/, 
        "`<em>" + muvishoApp.i18n.getString('appName') + "</em>`"),
      description: muvishoApp.i18n.getString('welcomeDescription')
    };

    // account - welcome package
    this._welcomePackage["discover"] = {
      title: muvishoApp.i18n.getString('discoverMoviesAndSeries'), 
      description: muvishoApp.i18n.getString('discoverDescriptionX').replace(/%s/, 
        "`<em>" + muvishoApp.i18n.getString('appName').toLowerCase() + "</em>`")
    };


    // account - welcome package
    this._welcomePackage["account"] = {
      title: muvishoApp.i18n.getString('createFreeAccount'),
      description: muvishoApp.i18n.getString('accountDescriptionX').replace(/%s/, 
        "`<em>" + muvishoApp.i18n.getString('appName').toLowerCase() + "</em>`")
    };

    // edit - welcome package
    this._welcomePackage["favorite"] = {
      title: muvishoApp.i18n.getString('addToFavorites'),
      description: muvishoApp.i18n.getString('favoriteDescriptionX').replace(/%s/, 
        "`<em>" + muvishoApp.i18n.getString('appName').toLowerCase() + "</em>`")
    };

    // conversation - welcome package
    this._welcomePackage["conversation"] = {
      title: muvishoApp.i18n.getString('joinTheConversation'),
      description: muvishoApp.i18n.getString('conversationDescriptionX').replace(/%s/, 
        "`<em>" + muvishoApp.i18n.getString('appName').toLowerCase() + "</em>`")
    };

    // language - welcome package
    this._welcomePackage["language"] = {
      title: muvishoApp.i18n.getString('changeYourLanguage'),
      description: muvishoApp.i18n.getString('languageDescription')
    };

    // language - welcome package
    this._welcomePackage["theme"] = {
      title: muvishoApp.i18n.getString('changeYourTheme'),
      description: muvishoApp.i18n.getString('themeDescriptionXYZ').replace(/%s/, 
        "<em>" + muvishoApp.i18n.getString('classic') + "</em>").replace(/%s/, 
          "<em>" + muvishoApp.i18n.getString('dark') + "</em>").replace(/%s/, 
            "<em>" + muvishoApp.i18n.getString('light') + "</em>")
    };
    
  }

  /* >> Private Setters << */

  /* >> Private Getters << */




}; // <- End of `WelcomeScreen` class


// Attach a behavior to `WelcomeScreen`...
// Object.assign(WelcomeScreen.prototype, WelcomeScreenBehavior);


