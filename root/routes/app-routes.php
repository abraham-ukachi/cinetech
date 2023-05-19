<?php
/**
* @license MIT
* cinetech (muvisho)
* Copyright (c) 2023 Abraham Ukachi. The Muvisho Project Contributors.
* All rights reserved.
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
* @project cinetech
* @name App - Routes
* @file app-routes.php
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @version: 0.0.1
* 
* Usage:
*   1+|> //  
*    -|> 
*/


/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* MOTTO: I'll always do more 😜!!!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/


// declare the `routes` namespace
// namespace Muvisho\Routes;

// use muvisho's `AppController` class
// use Muvisho\Controllers\AppController;



/**
 * ============================
 *  App Routes
 * ============================
 */






/**
 * Route used to display the app view
 * 
 * @method GET
 * @action /[a:page]?/[a:view]? - page and view are optional
 *
 * @return void
 */
$router->map('GET', '/[a:page]?/[a:view]?', function(?string $page = null, ?string $view = null) {
  // create an object of the `AppController` class
  // $appController = new AppController();

  // show the app
  // $appController->show();


  // include the App.php file in `Views` folder
  require __APP_VIEWS_DIR__ . '/App.php';
  
});



/**
 * Route used to redirect to Muvisho's home directory
 *
 * @method GET
 * @action /app
 *
 * @redirect / 
 */
$router->map('GET', '/app', function() {
  // redirect to the Muvisho's home directory
  header("Location: " . MUVISHO_HOME_DIR);
});





