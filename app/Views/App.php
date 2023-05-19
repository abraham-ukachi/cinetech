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
* @name App View - Muvisho
* @file App.php
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @version: 0.0.1
* 
* Usage:
*   
*   1-|> // Open project in your default browser via terminal
*    -|> open http://localhost/cinetech/
* 
*
* ============================
*     >>> DESCRIPTION <<<
* ~~~~~~~~ (French) ~~~~~~~~~
* 
* - Aucun
*
* ~~~~~~~~ (English) ~~~~~~~~~
* 
* - None
* 
* ============================
* IMPORTANT: PWA is coming 😱
* ============================
*/


/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* MOTTO: I'll always do more 😜!!!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/


?><!DOCTYPE html>
    
<!-- HTML -->
<html lang="<?//= $this->lang ?>">

<!-- HEAD -->
<head>
  <!-- Our 4 VIP metas -->
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=no">
  <meta name="description" content="<?//= $this->i18n->getString('muvishoDescription') ?>">
  
  <!-- Title -->
  <title> <?//= $this->i18n->getString('muvisho') ?> | <?//= $this->i18n->getString('muvishoDescriptionShort') ?></title>

   
  <!-- Base -->
  <base href="/cinetech/">

  <!-- Logo - Icon -->
  <link rel="icon" href="assets/images/favicon.ico">

  <!-- See https://goo.gl/OOhYW5 -->
  <link rel="manifest" href="manifest.json">

  <!-- See https://goo.gl/qRE0vM -->
  <meta name="theme-color" content="#A67C52">

  <!-- Add to homescreen for Chrome on Android. Fallback for manifest.json -->
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="application-name" content="Muvisho">

  <!-- Add to homescreen for Safari on iOS -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="Muvisho">

  <!-- Homescreen icons -->
  <link rel="apple-touch-icon" href="assets/images/manifest/icon-48x48.png">
  <link rel="apple-touch-icon" sizes="72x72" href="assets/images/manifest/icon-72x72.png">
  <link rel="apple-touch-icon" sizes="96x96" href="assets/images/manifest/icon-96x96.png">
  <link rel="apple-touch-icon" sizes="144x144" href="assets/images/manifest/icon-144x144.png">
  <link rel="apple-touch-icon" sizes="192x192" href="assets/images/manifest/icon-192x192.png">

  <!-- HACK: (hard-codded typography) Fonts and Material Icons not dynamically imported in App -->
  <link rel="stylesheet" href="assets/theme/typography.css">

  <!-- Top-level styles -->
  <style>
    body, html, #app { 
      position: absolute; 
      inset: 0; 
      padding: 0;
      margin: 0;
    }
  </style>


</head>
<!-- End of HEAD -->
  
  
<body class="theme <?//= $this->theme ?>" fullbleed>

  <!-- Spinner -->
  <!-- NOTE: This will be removed when the App is ready -->
  <img id="spinner" 
    src="assets/images/gifs/spinner_loading.gif" 
    width="256" 
    height="256" 
    style="
      display: flex; 
      position: absolute; 
      inset: 0;
      margin: 100px auto;
      pointer-events: none;
    "
  /> <!-- End of Spinner -->
  

  <!-- App -->
  <!-- TODO: Replace this with a `<muvisho-app>` custom element -->
  <div id="app"></div>


  <script type="module">
    import { App } from './src/App.js';

    /**
     * Listen to the 'load' event from window in the browser.
     * NOTE: This event is fired when the whole page has loaded.
     */
    window.addEventListener('load', (event) => {
      // Create an object of App as `muvishoApp`
      window.muvishoApp = new App('en', 'light');
      
      // Set the title of `muvisoApp`
      muvishoApp.setTitle("Movies & Shows - Muvisho", true);
      
      // Run the `muvishoApp`
      muvishoApp.run();
      
    });


  </script>
  

</body>

</html>
<!-- End of HTML -->
