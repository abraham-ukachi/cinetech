/**
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
* @project cinetech (muvisho) 
* @name Request (API Class) - Helper
* @file src/helpers/request.js
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @version: 0.0.1
* 
* Usage:
*   1+|> // import the Request class
*    -|>
*    -|> import Request from './helpers/request.js';
*  
*
*
*   2+|> // create an instance of the Request class
*    -|>
*    -|> let request = new Request('en'); // <- 'en' is the language to use
*
*
*   3+|> // get a list of movies by genre (e.g. action)
*    -|>
*    -|> request.getMoviesByGenre('action', 1).then((data) => console.log(data));
*    -|> // ^^^^^ returns eg.:  { page: 1, total_results: 10000, total_pages: 500, results: [...] }
*    -|> 
*
*
*/

// Import our modules
import { ASSETS_DIR } from '../App.js';

"use strict"; // <- use strict mode



export const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const TMDB_FILE_DEFAULT_SIZE = 'w500';
export const TMDB_FILE_BACKDROP_SIZE = 'w1280';
export const TMDB_FILE_ORIGINAL_SIZE = 'original';


// Define some constant defaults for the request class

export const REQUEST_DEFAULT_BASE_URL = 'api'; // 'https://api.themoviedb.org/3/';
export const REQUEST_DEFAULT_LANGUAGE = 'en-US'; // <- supported values: en-US, fr-FR, ru-RU, es-ES
export const REQUEST_DEFAULT_REGION = 'US'; // <- supported values: US, FR, RU, ES
export const REQUEST_DEFAULT_ADULT = false; // <- supported values: true, false
export const REQUEST_DEFAULT_INCLUDE_ADULT = false; // <- supported values: true, false
export const REQUEST_DEFAULT_YEAR = null; // <- supported values: 1874 - 2023
export const REQUEST_DEFAULT_PRIMARY_RELEASE_YEAR = null; // <- supported values: 1874 - 2023
export const REQUEST_DEFAULT_SORT_BY = 'popularity.desc'; // <- supported values: popularity.desc, popularity.asc, release_date.desc, release_date.asc, revenue.desc, revenue.asc, primary_release_date.desc, primary_release_date.asc, original_title.desc, original_title.asc, vote_average.desc, vote_average.asc, vote_count.desc, vote_count.asc
export const REQUEST_DEFAULT_VOTE_COUNT_GTE = 0; // <- supported values: 0 - 10000
export const REQUEST_DEFAULT_VOTE_COUNT_LTE = 10; // <- supported values: 0 - 10000
export const REQUEST_DEFAULT_VOTE_AVERAGE_GTE = 0; // <- supported values: 0 - 10
export const REQUEST_DEFAULT_VOTE_AVERAGE_LTE = 10; // <- supported values: 0 - 10
export const REQUEST_DEFAULT_WITH_GENRES = null; // <- supported values: 28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37
export const REQUEST_DEFAULT_WITH_KEYWORDS = null; // <- supported values: 28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37
export const REQUEST_DEFAULT_WITH_COMPANIES = null; // <- supported values: 28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37
export const REQUEST_DEFAULT_WITH_PEOPLE = null; // <- supported values: 28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37
export const REQUEST_DEFAULT_WITH_NETWORKS = null; // <- supported values: 28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37
export const REQUEST_DEFAULT_WITH_WATCH_PROVIDERS = null; // <- supported values: 28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37
export const REQUEST_DEFAULT_WITHOUT_GENRES = null; // <- supported values: 28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37











/*
 * Define the Request class that will be used to make requests to our Muvisho API
 *
 * Example usage:
 *   const request = new Request('fr');
 *   request.getGenresByMo
 */
class Request {

  // protected properties

  // public properties
  dataDir = `${ASSETS_DIR}/data`;

  // private properties



  /*
   * Constructor of the Request class
   * This method will be called automatically when an instace of the class is created
   *
   * @param { String } lang - the language to use
   * @param { String } baseUrl - the base url to use
   */
  constructor(lang = REQUEST_DEFAULT_LANGUAGE, baseUrl = REQUEST_DEFAULT_BASE_URL) {
    // initialize the `lang` property
    this.lang = lang;
    this.baseUrl = baseUrl;

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[37m[__constructor] (1): Hey !! I'm in the constructor of the class Request\x1b[0m`);
    console.log(`\x1b[37m[__constructor] (2): lang => ${lang} & baseUrl => ${baseUrl}\x1b[0m`);

  }


  // PUBLIC SETTERS


  // PUBLIC GETTERS


  /**
   * Returns a list of fake comments
   * NOTE: this is just for testing purposes, to tv show how to use the `getCommentsByMovieId()` method
   * 
   * @returns { Promise<Array> }
   */
  getFakeComments(delay = 2000) {
    return new Promise(async (resolve, reject) => {
      // fetch the fake movies from the `fake_comments.json` file
      let requestPromise = await fetch(`${this.dataDir}/fake_comments.json`);

      // get the fake comments JSON data
      let fakeComments = await requestPromise.json();
      
      // after a simulated 2 seconds delay, resolve the promise with the fake comments
      setTimeout(() => resolve(fakeComments), delay);

    });

  }

  /**
   * Returns a list of fake replies
   * NOTE: this is just for testing purposes, to show how to use the `getRepliesByCommentId()` method
   * 
   * @returns { Promise<Array> }
   */
  getFakeReplies(delay = 2000) {
    return new Promise(async (resolve, reject) => {
      // fetch the fake movies from the `fake_replies.json` file
      let requestPromise = await fetch(`${this.dataDir}/fake_replies.json`);

      // get the fake replies JSON data
      let fakeReplies = await requestPromise.json();
      
      // after a simulated 2 seconds delay, resolve the promise with the fake replies
      setTimeout(() => resolve(fakeReplies), delay);

    });

  }


  /**
   * Returns a list of fake movies
   * NOTE: this is just for testing purposes, to show how to use the `getMoviesByGenreId()` method
   *
   * @returns { Promise<Array> }
   */
  getFakeMovies() {
    return new Promise(async (resolve, reject) => {
      // fetch the fake movies from the `fake_movies.json` file
      let requestPromise = await fetch(`${this.dataDir}/fake_movies.json`);

      // get the fake movies JSON data
      let fakeMovies = await requestPromise.json();

      // after a simulated 2 seconds delay, resolve the promise with the fake movies
      setTimeout(() => resolve(fakeMovies), 2000);

    });

  }


  /**
   * Returns a list of fake series 
   * NOTE: this is just for testing purposes, to show how to use the `getSeriesByGenreId()` method
   *
   * @returns { Promise<Array> }
   */
  getFakeSeries() {
    return new Promise(async (resolve, reject) => {
      // fetch the fake series from the `fake_series.json` file
      let requestPromise = await fetch(`${this.dataDir}/fake_series.json`);

      // get the fake series JSON data
      let fakeSeries = await requestPromise.json();

      // after a simulated 2 seconds delay, resolve the promise with the fake series 
      setTimeout(() => resolve(fakeSeries), 2000);

    });

  }



  /**
   * Returns a list of fake favorites
   * NOTE: this is just for testing purposes, to show how to use the `getFavoritesByType()` method
   *
   * @param { String } type (eg. 'default', 'movie', 'series') 
   * @param { Number } page
   *
   * @returns { Promise<Array> }
   */
  getFakeFavorites(type, page = 1) {
    return new Promise(async (resolve, reject) => {
      // fetch the fake favorites from the `fake_favorites.json` file
      let requestPromise = await fetch(`${this.dataDir}/fake_favorites_${type ?? 'default'}.json`);

      // get the fake favorites JSON data
      let fakeFavorites = await requestPromise.json();

      // after a simulated 2 seconds delay, resolve the promise with the fake favorites
      setTimeout(() => resolve(fakeFavorites), 2000);

    });

  }


  /**
   * Returns the fake details of a movie 
   * NOTE: this is just for testing purposes, to show how to use the `getMovieDetails()` method
   *
   * @param { Number } movieId - the id of the movie to get the details for (eg. '399566')
   *
   * @returns { Promise<Array> }
   */
  getFakeMovieDetails(movieId) {
    return new Promise(async (resolve, reject) => {
      // fetch the fake movie details from the `fake_details_movie.json` file
      let requestPromise = await fetch(`${this.dataDir}/fake_details_movie.json`);

      // get the fake movie details JSON data
      let fakeMovieDetails = await requestPromise.json();

      // after a simulated 2 seconds delay, resolve the promise with the fake movie details
      setTimeout(() => resolve(fakeMovieDetails), 2000);

    });

  }


  /**
   * Returns the fake details of a series or tv show 
   * NOTE: this is just for testing purposes, to show how to use the `getShowDetails()` method
   *
   * @param { Number } showId - the id of the show to get the details for (eg. '399566')
   *
   * @returns { Promise<Array> }
   */
  getFakeShowDetails(showId) {
    return new Promise(async (resolve, reject) => {
      // fetch the fake movie details from the `fake_details_show.json` file
      let requestPromise = await fetch(`${this.dataDir}/fake_details_show.json`);

      // get the fake show details JSON data
      let fakeShowDetails = await requestPromise.json();
      
      // after a simulated 2 seconds delay, resolve the promise with the fake show details
      setTimeout(() => resolve(fakeShowDetails), 2000);

    });

  }


  /**
   * Method used to get the details of a series or tv show with the given `showId`
   * NOTE: This method will append the `credits` (i.e casts and crew) and `similar` series / tv shows to the response
   *
   * @example { PostmanUrl } {{baseUrl}}/tv/62286?language=fr&append_to_response=credits,similar
   * 
   * @param { Number } showId - the id of the show to get the details for (eg. '62286')
   *
   * @returns { Promise } - the promise that will be resolved with the show details
   * @see https://developers.themoviedb.org/3/tv/get-tv-details
   */
  getShowDetails(showId) {
    return this._makeRequest(`show/${showId}?language=${this.lang}&append_to_response=credits,similar`);
  }


  /**
   * Method used to get the details of a movie with the given `movieId`
   * NOTE: This method will append the `credits` (i.e casts and crew) and `similar` movies to the response
   *
   * @example { PostmanUrl } {{baseUrl}}/movie/447365?language=fr&append_to_response=credits,similar
   *
   * @param { Number } movieId - the id of the movie to get the details for (eg. '447365')
   *
   * @returns { Promise } - the promise that will be resolved with the movie details
   * @see https://developers.themoviedb.org/3/movies/get-movie-details
   */
  getMovieDetails(movieId) {
    return this._makeRequest(`movie/${movieId}?language=${this.lang}&append_to_response=credits,similar`);
  }


  /**
   * Method used to get all the movies with the given `genreId` and `page`
   *
   * @example { PostmanUrl } {{baseUrl}}/discover/movie?page=1&with_original_language=en&language=fr&with_genres=878
   *
   * @param { String } genreId - the id of the genre to get the movies for (see the `getGenres` method for the list of supported genres)
   * @param { Number } page - the page to get the movies for (optional, defaults to 1)
   *
   * @returns { Promise } - the promise that will be resolved with the movies data
   * @see https://developers.themoviedb.org/3/discover/movie-discover
   *
   */
  getMoviesByGenreId(genreId, page = 1) {
    return this._makeRequest(`discover/movie?with_genres=${genreId}&page=${page}&language=${this.lang}`);
  }
  
  /**
   * Method used to get all the movie comments of the given `movieId`, `page` and `pageSize`
   *
   * @param { Number } movieId - the id of the movie to get the comments for (eg. '399566')
   * @param { Number } page - the page to get the comments for (optional, defaults to 1)
   * @param { Number } pageSize - the page size to get the comments for (optional, defaults to 10)
   *
   * @returns { Promise } - the promise that will be resolved with the comments data
   */
  getCommentsByMovieId(movieId, page = 1, pageSize = 10) {
    return this._makeRequest(`comments/movie/${movieId}?page=${page}&per_page=${pageSize}&language=${this.lang}`);
  }
  
  
  /**
   * Method used to get all the tv show comments of the given `showId`, `page` and `pageSize`
   *
   * @param { Number } showId - the id of the show to get the comments for (eg. '399566')
   * @param { Number } page - the page to get the comments for (optional, defaults to 1)
   * @param { Number } pageSize - the page size to get the comments for (optional, defaults to 10)
   *
   * @returns { Promise } - the promise that will be resolved with the comments data
   */
  getCommentsByShowId(showId, page = 1, pageSize = 10) {
    return this._makeRequest(`comments/show/${showId}?page=${page}&per_page=${pageSize}&language=${this.lang}`);
  }

  
  /**
   * Method used to get all the series with the given `genreId` and `page`
   *
   * @example { PostmanUrl } {{baseUrl}}/discover/tv?page=1&with_original_language=en&language=en&with_genres=10759
   *
   * @param { String } genreId - the id of genre to get the series for (see the `getGenres` method for the list of supported genres)
   * @param { Number } page - the page to get the series for (optional, defaults to 1)
   *  
   * @returns { Promise } - the promise that will be resolved with the series data
   * @see https://developers.themoviedb.org/3/discover/tv-discover
   */
  getSeriesByGenreId(genreId, page = 1) {
    return this._makeRequest(`discover/show?with_genres=${genreId}&page=${page}&language=${this.lang}`);
  }

  /**
   * Method used to get all the favorites of the given `type` and `page`
   *
   * @example { MuvishoUrl } {{baseUrl}}/favorites/movie?page=1&language=en
   * @example { MuvishoUrl } {{baseUrl}}/favorites/tv?page=1&language=en
   * @example { MuvishoUrl } {{baseUrl}}/favorites?page=1&language=en
   *
   * @param { String } type - the type of favorites to get (optional, defaults to 'all')
   * @param { Number } page - the page to get the favorites for (optional, defaults to 1)
   *
   * @returns { Promise } - the promise that will be resolved with the favorites data
   */
  getFavoritesByType(type, page = 1) {
    return this._makeRequest(`favorites/${type}?page=${page}&language=${this.lang}`);
  }



  /**
   * Method used to retrieve all the genres of the given `mediaType`
   *
   * @param { String } mediaType - the media type to get the genres for (optional, defaults to 'movie')
   *
   * @returns { Promise } - the promise that will be resolved with the genres data
   * @see https://developers.themoviedb.org/3/genres/get-movie-list
   */
  getGenres(mediaType = 'movie') {
    return this._makeRequest(`genre/${mediaType}/list?language=${this.lang}`);
  }
 

  // PUBLIC METHODS

  


  // PRIVATE SETTERS
  // PRIVATE GETTERS
  // PRIVATE METHODS
  

  /**
   * Method used to make a request to the Muvisho API
   *
   * @param { String } endpoint - the endpoint to make the request to
   * @param { Object } params - the parameters to use for the request
   *
   * @returns { Promise } - the promise that will be resolved with the response data
   */
  _makeRequest(endpoint, params = {}) {
    return new Promise(async (resolve, reject) => {
      // create the url
      let url = `${this.baseUrl}/${endpoint}`;

      // create the request
      let request = new Request(url, params);
      
      
      try { // <- try to get a response

        // fetch the request promise as `requestPromise`
        let requestPromise = await fetch(request);

        // get the response as `response`
        let response = await requestPromise.json();

        // resolve the promise with the response
        resolve(response);

      } catch (error) {
        // reject the promise with the error
        reject(error);
      }
    });

  }


 
};


// export the Request class as default
export default Request;
