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
* @name: router
* @type: helper
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @credits: pwa-helpers/router.js
*
* A basic router that calls a callback whenever the location is updated.
*
* Example usage:
*
*   1-|> import { installRouter } from './src/helpers/router.js';
*    -|>
*    -|> class App extends Engine {
*    -|>   ...
*    -|>   firstUpdated() {
*    -|>     instalRouter((this, location) => this._handleNavigation(location));
*    -|>   }
*    -|> }
*    -|>
*
*
*   2-|> // To force a navigation to a new location programmatically
*    -|>
*    -|>
*    -|> window.history.pushState({}, '', '/new-route'); 
*    -|> this._handleNavigation(window.location);
*    -|> 
*    -|>
*
*
*   3-|> // Read the event that caused the navigation, in the second argument.
*    -|>
*    -|>
*    -|> installRouter(this, (location, event) => { 
*    -|>   // only scroll to top on link clicks, not popstate events.
*    -|>   if (event && event.type === 'click') { window.scrollTo(0, 0) }
*    -|>   this._handleNavigation(location);
*    -|> }
*/

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// defining some constant variables...


/**
 * `installRouter`
 *
 * Example usage:
 *  (See above examples)
 *
 * @param { Object } controller
 * @param { Function } locationUpdatedCallback
 */
export const installRouter = (controller, locationUpdatedCallback) => {
  // Get the container element of the controller as `container`
  let container = controller.containerEl;

  // add a `click` event listener to `container`
  container.addEventListener('click', event => {
    // do nothing if the click's default action was prevented, it's a button, 
    // contains a `metaKey`, `ctrlKey` or `shiftKey`
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrKey || event.shiftKey) { return }

    // search for an anchor
    let anchor = event.composedPath().filter(n => n.tagName === 'A')[0];
    
    // if there's no anchor, anchor has a target, a `download` attribute,
    // or the value of its `rel` attribute is 'external', do nothing again #lol ;)
    if (!anchor || anchor.target || anchor.hasAttribute('download') || anchor.getAttribute('rel') === 'external') { return }

    // get the anchor's `href`
    let href = anchor.href;

    // define some keywords
    let keywords = ['mailto:', 'tel:'];
    let keywordsInAnchor = (keywords.filter((keyword) => href.indexOf(keyword) !== -1).length) ? true : false;
    // AGAIN, do nothing if there's no `href` or if it contains these pre-defined keywords
    if (!href || keywordsInAnchor) { return }

    // get the current location
    let location = window.location;
    // get the origin
    let origin = location.origin || location.protocol + '//' + location.host;

    // Last time, I promise ;) Do nothing if the `origin` is *NOT* part of the `href`
    if (href.indexOf(origin) !== 0) { return } 

    // Now, let'sprevent the event's default behavior
    event.preventDefault();

    // if the `href` is not the same as the href in `location`...
    if (href !== location.href) {
      // ...push a new state using the history API
      window.history.pushState({}, '', href);
      // execute the callback function including the `event` as a second argument
      locationUpdatedCallback(location, event);
    }
    
  });


  // listen to a `popstate` event on window
  window.addEventListener('popstate', (event) => locationUpdatedCallback(window.location, event));

  // initial callback execution
  locationUpdatedCallback(window.location, null /* event */);


}; // <- End of `installRouter`




/**
 * Utility fuction to get name of the origin route from the given `location`
 *
 * @param { String } location
 * @param { String } baseDir
 *
 * @returns { String } originRoute
 */
export const getOriginRoute = (location = window.location, baseDir = '/blog-js/') => {
  // create a url with the `location`
  let url = new URL(location);

  // get the origin route
  let originRoute = url.origin + baseDir;

  // return `originRoute`
  return originRoute;
};



/**
 * Utility fuction to get name of the page route from the given `location`
 *
 * @param { String } location
 * @param { String } baseDir
 *
 * @returns { String } pageRoute
 */
export const getPageRoute = (location = window.location, baseDir = '/blog-js/') => {
  // create a url with the `location`
  let url = new URL(location);

  // get the page from the `url`
  let page = url.pathname.replace(baseDir, '/').split('/')[1];

  // make sure the page route is a string (empty or not) as `pageRoute`
  let pageRoute = (page?.length) ? page : '';

  // return `pageRoute`
  return pageRoute;
};


/**
 * Utility fuction to get name of the view route from the given `location`
 *
 * @param { String } location
 * @param { String } baseDir
 *
 * @returns { String } viewRoute
 */
export const getViewRoute = (location, baseDir = '/blog-js/') => {
  // get the page route
  let pageRoute = getPageRoute(location, baseDir);

  // create a url with the `location`
  let url = new URL(location);

  // split the pathname as `splitPathname` with '/' as separator
  let splitPathname = url.pathname.split('/');

  // get the last name of a splitted pathname as lastName
  let lastName = splitPathname[splitPathname.length - 1];

  // If there are more than 3 items in `splitPathname`, 
  // and the `lastName` is not the same as the `page`,
  // use it as the view route
  let viewRoute = ((splitPathname.length) > 3 && (lastName !== pageRoute)) ? lastName : '';

  // return `viewRoute`
  return viewRoute;
};




/**
 * Utility fuction to get the search params from the given `location`
 *
 * @param { String } location
 *
 * @returns { Object } searchParams
 */
export const getSearchParams = (location) => {
  // create a url with the `location`
  let url = new URL(location);

  // get the search parameters as `searchParams`
  let searchParams = new URLSearchParams(url.search);

  // return `searchParams`
  return searchParams;
};
