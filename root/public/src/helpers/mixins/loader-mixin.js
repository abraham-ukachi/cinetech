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
* @name: Loader
* @type: mixin
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> import { loaderMixin } from './src/helpers/mixins/loader-mixin.js';
*    -|>
*    -|> Object.assign(App.prototype, loaderMixin);
*    -|>
*
*
*   2-|> // Load some screens from the `run()` method of `App` class
*    -|>
*    -|> class App extends Engine {
*    -|>  ...
*    -|>  run() {
*    -|>    ...
*    -|>
*    -|>    // loading splash and welcome screens...
*    -|>
*    -|>    this._loadScreens(['splash', 'welcome'], SCREENS_DIR).then((loadedScreens) => {
*    -|>
*    -|>      // do something awesome here with the `loadedScreens`
*    -|>
*    -|>    });
*    -|>  }
*    -|>   
*    -|> }
*
*
*   3-|> // Load some pages from the `run()` method of `App` class
*    -|>
*    -|> class App extends Engine {
*    -|>  ...
*    -|>  run() {
*    -|>    ...
*    -|>
*    -|>    // Loading home, search and articles pages...
*    -|>
*    -|>    this._loadPages(['home', 'search', 'articles'], PAGES_DIR).then((loadedPages) => {
*    -|>
*    -|>      // do something awesome here with the `loadedPages`
*    -|>
*    -|>    });
*    -|>  }
*    -|>   
*    -|> }
*/


// Import the default screens, pages, views, ... directories from app
import { 
  SCREENS_DIR, 
  PAGES_DIR, 
  VIEWS_DIR,
  THEME_DIR,
  STYLES_DIR,
  ANIM_DIR
} from '../../App.js';

// Import the list of loaded assets
// TODO: Remove the below `loadedAssetsList` import and related mentions in this code asap
import { loadedAssetsList } from '../../App.js';


"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅




// TODO (1): ? Make mixin functions public instead 
// TODO (2): Create a `_load()` function to clean up the mess below (i.e. repeated codes)


/**
 * loaderMixin
 * This is a mixin that is used to dynamically load assets, screens, pages and views.
 *
 * Example usage:
 *  (See above examples)
 */
export const loaderMixin = {

  /**
   * Method used to load one or more screens
   *
   * @param { Array } screens - list of screens to be loaded
   * @param { String } screensDir - directory of the screens
   *
   * @returns { Promise } promise
   * @private
   */
  _loadScreens(screens, screensDir = SCREENS_DIR) {

    // Create a promise
    let promise = new Promise((resolve, reject) => {

      // initialize the `loadedScreens` variable by setting it to an empty array
      let loadedScreens = Array();

      // For each screen name...
      for (let screenName of screens) {
        // get the url of this screen as `screenUrl`
        let screenUrl = `${screensDir}/${screenName}-screen.js`; 

        // dynamically import the `screenUrl`
        import(screenUrl).then((module) => {

          // get the screen id
          let screenId = `${screenName}Screen`; // <- returns eg: 'splashScreen'

          // get the name of the screen class
          let screenClassName = screenId.capitalize(); // <- returns eg.: 'SplashScreen'

          //console.warn(`module of screen => `, module);

          // get the screen class from `module` as `screenObject`
          let screenObject = module[screenClassName]; // eval(`new module.${screenClassName}(screenId)`);

          // Add this screen to the `loadedScreens` list
          loadedScreens.push({ name: screenName, object: screenObject });

          // If the number of loaded screens is equal to the total screens to be loaded
          if (loadedScreens.length === screens.length) {
            // ...resolve this promise w/ the `loadedScreens`
            resolve(loadedScreens);

            // TODO: Call the `onScreensLoaded()` method
            // this.onScreensLoaded(loadedScreens);
          }

          // DEBUG [4dbsmaster]: tell me about it ;)
          console.log(`\x1b[32m[_loadScreens](2): screenUrl => ${screenUrl} LOADED !!! module => \x1b[0m`, module);
          console.log(`\x1b[32m[_loadScreens](3): screenClassName => \x1b[0m`, screenClassName);
        });

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[32m[_loadScreens](1): screenName to be loaded => ${screenName}\x1b[0m`);
      }

    });

    // return the promise
    return promise;

  },


  /**
   * Method used to load one or more pages
   *
   * @param { Array } pages - list of pages to be loaded
   * @param { String } pagesDir - directory of the pages
   *
   * @returns { Promise } promise
   * @private
   */
  _loadPages(pages, pagesDir = PAGES_DIR) {

    // Create a promise
    let promise = new Promise((resolve, reject) => {

      // initialize the `loadedPages` variable by setting it to an empty array
      let loadedPages = Array();

      // For each page name...
      for (let pageName of pages) {
        // get the url of this page as `pageUrl`
        let pageUrl = `${pagesDir}/${pageName}-page.js`; 

        // dynamically import the `pageUrl`
        import(pageUrl).then((module) => {

          // get the page id
          let pageId = `${pageName}Page`; // <- returns eg: 'homePage'

          // get the name of the page class
          let pageClassName = pageId.capitalize(); // <- returns eg.: 'HomePage'

          // get the page object from `module`
          let pageObject = module[pageClassName]; //eval(`new module.${pageClassName}(pageId)`);

          // Add this page to the `loadedPages` list
          loadedPages.push({ name: pageName, object: pageObject });

          // If the number of loaded pages is equal to the total pages to be loaded
          if (loadedPages.length === pages.length) {
            // ...resolve this promise w/ the `loadedPages`
            resolve(loadedPages);

            // TODO: Call the `onPagesLoaded()` method
            // this.onPagesLoaded(loadedPages);
          }

          // DEBUG [4dbsmaster]: tell me about it ;)
          console.log(`\x1b[32m[_loadPages](2): pageUrl => ${pageUrl} LOADED !!! module => \x1b[0m`, module);
          console.log(`\x1b[32m[_loadPages](3): pageClassName => \x1b[0m`, pageClassName);
        });

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[32m[_loadPages](1): pageName to be loaded => ${pageName}\x1b[0m`);
      }

    });

    // return the promise
    return promise;

  },


  /**
   * Method used to load one or more `views` of the given `page`
   *
   * @param { Array } views - list of views to be loaded
   * @param { Array } page - name of the page where the views are located
   * @param { String } viewsDir - directory of the views
   *
   * Example usage:
   *
   *    this._loadViews(['default', 'reader', 'creator'], ARTICLES_PAGE, VIEWS_DIR).then((loadedViews) => {
   *
   *      // do something awesome here with the loaded views (i.e. `loadedViews`)
   *
   *    });
   *
   * @returns { Promise } promise
   * @private
   */
  _loadViews(views, page, viewsDir = VIEWS_DIR) {

    // Create a promise
    let promise = new Promise((resolve, reject) => {

      // initialize the `loadedViews` variable by setting it to an empty array
      let loadedViews = Array();

      // For each view name...
      for (let viewName of views) {
        // get the url of this view as `viewUrl`
        let viewUrl = `${viewsDir}/${page}/${viewName}-${page}-view.js`; 

        // dynamically import the `viewUrl`
        import(viewUrl).then((module) => {

          // get the view id
          let viewId = `${viewName}${page.capitalize()}View`; // <- returns eg: 'defaultHomeView'

          // get the name of the view class
          let viewClassName = viewId.capitalize(); // <- returns eg.: 'DefaultHomeView'

          // get the view object from `module`
          let viewObject = module[viewClassName];// eval(`new module.${viewClassName}(viewId)`);

          // Add this view to the `loadedViews` list
          loadedViews.push({ id: viewId, name: viewName, object: viewObject });

          // If the number of loaded views is equal to the total views to be loaded
          if (loadedViews.length === views.length) {
            // ...resolve this promise w/ the `loadedViews`
              
            resolve(loadedViews);

            // TODO: Call the `onViewsLoaded()` method
            // this.onViewsLoaded(loadedViews);
          }

          // DEBUG [4dbsmaster]: tell me about it ;)
          console.log(`\x1b[32m[_loadViews](2): viewUrl => ${viewUrl} LOADED !!! module => \x1b[0m`, module);
          console.log(`\x1b[32m[_loadViews](3): viewClassName => \x1b[0m`, viewClassName);
        }, (error) => {
            console.error('[importError]: error => ', error);
        });

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[32m[_loadViews](1): viewName => ${viewName} & viewUrl => ${viewUrl}\x1b[0m`);
      }

    });

    // return the promise
    return promise;

  },


  



  // # +++++++++++++++++++++[ ASSETS ]+++++++++++++++++++++++++ #
  // # ======================================================== #
  // # ============ THEME, STYLESHEETS & ANIMATIONS =========== #
  // # ======================================================== #
  // # ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #

  // TODO: Use [Constructable StyleSheets](https://web.dev/constructable-stylesheets/)


  /**
   * Method used to load one or more themes.
   *
   * Example usage:
   *
   *    this._loadThemes(shadowRoot, ['color', 'typography', 'styles'], THEME_DIR).then((loadedThemes) => {
   *
   *      // do something awesome here after the themes have been loaded
   *
   *    });
   *
   *
   * @param { ShadowRoot } shadowRoot - the Shadow DOM where shared or specific themes will be injected. 
   * @param { Array } themes - list of themes to be loaded
   * @param { String } themesDir - directory of the themes 
   *
   * @returns { Promise } promise
   * @private
   */
  _loadThemes(shadowRoot, themes, themesDir = THEME_DIR) {

    // Create a promise
    let promise = new Promise((resolve, reject) => {

      // initialize the `loadedThemes` variable by setting it to an empty array
      let loadedThemes = Array();

      // For each theme name...
      for (let themeName of themes) {
        // ...get the url of this theme as `themeUrl`
        let themeUrl = `${themesDir}/${themeName}.css`; 
        // get the theme id
        let themeId = `${themeName.toCamelCase()}Theme`; // <- returns eg: 'colorTheme'

        // create a `<link>` element as `linkEl`
        let linkEl = document.createElement('link');
        linkEl.id = themeId;
        linkEl.href = themeUrl;
        linkEl.rel = 'stylesheet';

        // listen to the `onload` event
        linkEl.onload = (ev) => {
          // Add this `themeId` to the list of added assets
          loadedAssetsList.push(themeId);

          // Create a theme data object as `themeData`
          let themeData = {id: themeId, name: themeName, url: themeUrl, ev};

          // Add this `themeData` to the `loadedThemes` list
          loadedThemes.push(themeData);


          // If the number of loaded themes is equal to the total themes to be loaded
          if (loadedThemes.length === themes.length) {
            // ...resolve this promise w/ the `loadedThemes`
            resolve(loadedThemes);

            // TODO: Call the `onThemesLoaded()` method
            // this.onThemesLoaded(loadedThemes);
          }

          // DEBUG [4dbsmaster]: tell me about it ;)
          console.log(`\x1b[32m[_loadThemes](3): themeUrl => ${themeUrl} LOADED !!! themeData => \x1b[0m`, themeData);
          
        }; 

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[32m[_loadThemes](1): themeName to be loaded => ${themeName}\x1b[0m`);
        console.log(`\x1b[32m[_loadThemes](2): themeName.toCamelCase() => ${themeName.toCamelCase()}\x1b[0m`);


        // add `linkEl` to the given shadowRoot
        shadowRoot.appendChild(linkEl);
      }

    });

    // return the promise
    return promise;

  },


  /**
   * Method used to load one or more stylesheets from the given `stylesDir`.
   *
   * Example usage:
   *
   *    this._loadStyles(shadowRoot, [...SplashScreen.styles], STYLES_DIR).then((loadedStyles) => {
   *
   *      // do something awesome here after the styles have been loaded
   *
   *    });
   *
   * @param { ShadowRoot } shadowRoot - the Shadow DOM where shared or specific themes will be injected. 
   * @param { Array } styles - list of styles to be loaded
   * @param { String } stylesDir - directory of the styles 
   *
   * @returns { Promise } promise
   * @private
   */
  _loadStyles(shadowRoot, styles, stylesDir = STYLES_DIR) {
    
    // Create a promise
    let promise = new Promise((resolve, reject) => {

      // initialize the `loadedStyles` variable by setting it to an empty array
      let loadedStyles = Array();

      // For each style name...
      for (let styleName of styles) {
        // ...get the url of this style as `styleUrl`
        let styleUrl = `${stylesDir}/${styleName}-styles.css`; 
        // get the style id
        let styleId = `${styleName.toCamelCase()}Style`; // <- returns eg: 'colorStyle'

        // create a `<link>` element as `linkEl`
        let linkEl = document.createElement('link');
        linkEl.id = styleId;
        linkEl.href = styleUrl;
        linkEl.rel = 'stylesheet';

        // listen to the `onload` event
        linkEl.onload = (ev) => {
          // Add this `styleId` to the list of added assets
          loadedAssetsList.push(styleId);

          // Create a style data object as `styleData`
          let styleData = {id: styleId, name: styleName, url: styleUrl, ev};

          // Add this `styleData` to the `loadedStyles` list
          loadedStyles.push(styleData);


          // If the number of loaded styles is equal to the total styles to be loaded
          if (loadedStyles.length === styles.length) {
            // ...resolve this promise w/ the `loadedStyles`
            resolve(loadedStyles);

            // TODO: Call the `onStylesLoaded()` method
            // this.onStylesLoaded(loadedStyles);
          }

          // DEBUG [4dbsmaster]: tell me about it ;)
          console.log(`\x1b[32m[_loadStyles](3): styleUrl => ${styleUrl} LOADED !!! styleData => \x1b[0m`, styleData);
          
        }; 

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[32m[_loadStyles](1): styleName to be loaded => ${styleName}\x1b[0m`);
        console.log(`\x1b[32m[_loadStyles](2): styleName.toCamelCase() => ${styleName.toCamelCase()}\x1b[0m`);


        // add `linkEl` to the given shadowRoot
        shadowRoot.appendChild(linkEl);
      }

    });

    // return the promise
    return promise;

  },


  /**
   * Method used to load one or more animations from the given `animationsDir`.
   *
   * Example usage:
   *
   *    this._loadAnimations(['fade-in', 'pop-in', 'slide-from-down'], ANIM_DIR).then((loadedAnimations) => {
   *
   *      // do something awesome here after the animations have been loaded
   *
   *    });
   *
   * @param { ShadowRoot } shadowRoot - the Shadow DOM where shared or specific themes will be injected. 
   * @param { Array } animations - list of animations to be loaded
   * @param { String } animDir - directory of the animations
   *
   * @returns { Promise } promise
   * @private
   */
  _loadAnimations(shadowRoot, animations, animDir = ANIM_DIR) {
    
    // Create a promise
    let promise = new Promise((resolve, reject) => {

      // initialize the `loadedAnimations` variable by setting it to an empty array
      let loadedAnimations = Array();

      // For each animation name...
      for (let animationName of animations) {
        // ...get the url of this animation as `animationUrl`
        let animationUrl = `${animDir}/${animationName}-animation.css`; 
        // get the animation id
        let animationId = `${animationName.toCamelCase()}Animation`; // <- returns eg: 'colorStyle'

        // create a `<link>` element as `linkEl`
        let linkEl = document.createElement('link');
        linkEl.id = animationId;
        linkEl.href = animationUrl;
        linkEl.rel = 'stylesheet';

        // listen to the `onload` event
        linkEl.onload = (ev) => {
          // Add this `animationId` to the list of added assets
          loadedAssetsList.push(animationId);

          // Create a animation data object as `animationData`
          let animationData = {id: animationId, name: animationName, url: animationUrl, ev};

          // Add this `animationData` to the `loadedStyles` list
          loadedAnimations.push(animationData);


          // If the number of loaded animations is equal to the total animations to be loaded
          if (loadedAnimations.length === animations.length) {
            // ...resolve this promise w/ the `loadedAnimations`
            resolve(loadedAnimations);

            // TODO: Call the `onAnimationsLoaded()` method
            // this.onAnimationsLoaded(loadedAnimations);
          }

          // DEBUG [4dbsmaster]: tell me about it ;)
          console.log(`\x1b[32m[_loadAnimations](3): animationUrl => ${animationUrl} LOADED !!! animationData => \x1b[0m`, animationData);
          
        }; 

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[32m[_loadStyles](1): animationName to be loaded => ${animationName}\x1b[0m`);
        console.log(`\x1b[32m[_loadStyles](2): animationName.toCamelCase() => ${animationName.toCamelCase()}\x1b[0m`);


        // add `linkEl` to the given shadowRoot
        shadowRoot.appendChild(linkEl);
      }

    });

    // return the promise
    return promise;

  }

}; // <- End of `loaderMixin`

