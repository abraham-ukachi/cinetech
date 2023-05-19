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
* @name Main / Router - Muvisho
* @file index.php
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @version: 0.0.1
* 
* Usage:
*   1+|> // how-to route with AltoRouter ;)
*    -|>
*
*/


/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* MOTTO: I'll always do more 😜 !!!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

// ---===--- enabling error reporting ---====---
error_reporting(E_ALL);
ini_set("display_errors", 1);
// ---===---===---===---===---===---===---===---


// require the autoloader
require __DIR__ . '/../vendor/autoload.php';

// start the session
session_start();

// defining some constants...

const APP_NAME = 'cinetech';
// home or base directory of Muvisho
const MUVISHO_HOME_DIR = '/' . APP_NAME;


// define other directory constants

// muvisho
const __MUVISHO_ROUTES_DIR__ = __DIR__ . '/../routes';
const __MUVISHO_DATABASE_DIR__ = __DIR__ . '/../database';
const __MUVISHO_CONFIG_DIR__ = __DIR__ . '/../config';
const __MUVISHO_TESTS_DIR__ = __DIR__ . '/../tests';
// app
const __APP_MODELS_DIR__ = __DIR__ . '/../../app/Models';
const __APP_VIEWS_DIR__ = __DIR__ . '/../../app/Views';
const __APP_CONTROLLERS_DIR__ = __DIR__ . '/../../app/Controllers';








// Create an altorouter instance named `$router`
$router = new AltoRouter();

// Set the base path of the router
$router->setBasePath(MUVISHO_HOME_DIR);




// Now, let's add some routes to our router ;)


// Include the App and API routes
include __DIR__ . '/../routes/app-routes.php'; // <- app routes
include __DIR__ . '/../routes/api-routes.php'; // <- api routes



// match the current request url
$match = $router->match();


// call closure or throw 404 status

if(is_array($match) && is_callable($match['target'])) {
  call_user_func_array($match['target'], $match['params']);
} else {
  // TODO: Create a 404 view / page to handle this
   
	// no route was matched
	header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}
