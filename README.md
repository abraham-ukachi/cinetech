# `cinetech`
> IMPORTANT: This is a working progress and subject to major changes until the specified deadline below.

A school project to create an online movies 🎬  &amp; Series / TV Shows 📺  collection web app using **version 3** of [The Movie Database (TMDB) API](https://https://developer.themoviedb.org/docs).

This project was started on **Mon. 15 May, 2023** by a group of 1 (a.k.a. [moi 😜](https://github.com/abraham-ukachi)).

> TO MY TEACHERS (i.e. [Ruben](?), [Nicolas](?), [Aurélie](?) and co.): thanks for these amazingly intuitive projects; they light up a fire in me 🔥🔥, and make me excited `&&` happy to get outta bed every morning - **You Guys Rock !!!** 🙏❤️ 😘.


So, I decided to name this web app **`Muvisho`** - a unique name which combines elements of "movie" and "show" (i.e. tv or series) - and created a MySQL Database named **muvisho** saved as [cinetech.sql](./cinetech.sql) as per the [project requirements](#requirements). It is worth mentioning that Directory [Structure](#structure) and object-relational mapping (ORM) of **`Muvisho`** were heavily inspired by [Lavarel](https://laravel.com/)'s and its [**Eloquent Models**](https://laravel.com/docs/10.x/eloquent) 😜 respcetively.

> NOTE: [Guzzle Http Client](https://docs.guzzlephp.org/en/stable/) will be used to send HTTP requests to [TMDB API](https://https://developer.themoviedb.org/docs).

The following tables (including a couple of TRIGGERS) were created in the **`muvisho`** database:

1. [*`users`*](#users---MySQL-Table): All currently registered users. 
2. [*`favorites`*](#favorites---MySQL-Table): All favorite movies and series or tv-shows of registered *`users`*.
3. [*`comments`*](#comments---MySQL-Table): All the comments written by registered *`users`*.
4. [*`replies`*](#replies---MySQL-Table): All the replies to previously written *`comments`*.
5. [*`users_archive`*](#user_archive---MySQL-Table): List of all archived *`users`*.
6. [*`archive_users_before_delete`*](#archive_before_delete---MySQL-Table): Automatically archives deleted *`users`* (*#trigger*).
7. [*`logs`*](#logs---MySQL-Table): Enhance database by logging some important changes in any table.
8. [*`online_users`*](#online_users---MySQL-Table): All users that have logged in and not yet logged out (assumed to be online).
9. [*`log_online_users`*](#log_online_users---MySQL-Table): Automatically logs online users (*#trigger*).
10. [*`log_offline_users`*](#log_offline_users--MySQL-Table): Automatically logs offline users (*#trigger*).


> NOTE: For more info, [read the Database section](#Database) of this *README*. 


## Description
> Original text in French: Le but de ce projet est de réaliser une bibliothèque de films et de séries, à votre image, grâce à une API publique disponible en ligne. L’API en question est “The Movie Database API”. Elle regroupe un grand nombre de films et de séries, avec beaucoup d’informations sur chacun des éléments. Il faudra, dans un premier temps, récupérer les informations de cette API, puis ranger ces informations à votre image en respectant quelques consignes de base. 

The goal of this project is to create a library of films and series, in your image, thanks to a public API available online.

The API in question is [**The Movie Database API**](https://themoviedb.org/docs). It brings together a large number of films and series, with a lot of information on each of the elements. You will first need to retrieve the information from this API, then store this information in your image, following a few basic instructions.


## Requirements

These are a couple of the main requirements for this school project:

1. A **`home` page**, on which certain films and series will be presented.
2. A **`movies` page** and **`series` page**.
3. A **`detail` page** for each of the elements, in which will be found related information (i.e. *director*, *types*, *country of origin*, *summary*, *actors*, etc...). On this page, similar movies and series will have to be offered.
4. A user must be able to **add an item to their** **`favorites`** **list** when viewing it. A page should be dedicated to the management of said list.
5. A user must be able to **leave comments** on elements of the site (there are already comments on certain elements in the [**API**](https://themoviedb.org/docs)) and **reply to comments** left previously.
6. The user must be able to search for any element(i.e. movie and series/tv-show) using **a search bar** integrated in the header. 


> NOTE: As you may have noticed on the [TMDB API](https://themoviedb.org/docs), *some actions requested* in this project *will not be possible using only the endpoints offered by the API*. You will therefore have to **create a database** in order to store several elements of your application and serve them in the form of JSON as the API does. 

> REMEMBER: Submit your database, including the *`CREATE`* query in a file named **"cinetech.sql”**

## Personal Challenge

I'm challenging myself - an "aller plus loin", if you will 😌 - to combine two of my previous "big" projects namely [Blog JS / blog-js](https://github.com/abraham-ukachi/blog-js) (a Single Page Application | SPA)  & [Maxaboom / boutique-en-ligne](https://github.com/abraham-ukachi/boutique-en-ligne) (an MVC structured website using [AltoRouter](https://altorouter.com)) as well as the skills I learned during their development in order to create or takle this **`Muvisho`** project.

## Jobs 
> MOTTO: I'll always do [**more**](#More) 😜

The official deadline of the jobs below - according to [intra](https://intra.laplateforme.io) - is **29-05-2023 à 2:52 PM**. Here is a list of all the specific files to be submitted as well as their corresponding / current **status** for this project:


| No. | Name | File | Status |
|:----|:-----|:-----|:-------|
| 1 | *`User - Model`* | **app/Models/User.php** | Pending |
| 2 | *`Favorite - Model`* | **app/Models/Favorite.php** | Pending |
| 3 | *`Comment - Model`* | **app/Models/Comment.php** | Pending |
| 4 | *`Reply - Model`* | **app/Models/Reply.php** | Pending |
| 5 | *`Log - Model`* | **app/Models/Log.php** | Pending |
| 6 | *`OnlineUser - Model`* | **app/Models/OnlineUser.php** | Pending |
| 7 | *`UserArchive - Model`* | **app/Models/UserArchive.php** | Pending |
| 8 | *`Model - Abstract`* | **app/Models/Model.php** | Pending |
| 9 | *`App - View`* | **app/Views/App.php** | Pending |
| 10 | *`Authentication - Controller`* | **app/Controllers/AuthController.php** | Pending |
| 11 | *`Favorite - Controller`* | **app/Controllers/FavoriteController.php** | Pending |
| 12 | *`Comment - Controller`* | **app/Controllers/CommentController.php** | Pending |
| 13 | *`Reply - Controller`* | **app/Controllers/ReplyController.php** | Pending |
| 14 | *`Index - PHP`* | **root/public/index.php** | Pending |




## Database
> HEADS-UP: I do love me some TRIGGERS, so do not be shocked to see a couple in this database #LOL

The following tables were created in a MySQL database named **`cinetech.sql`** via [PDO](https://www.php.net/manual/en/class.pdo.php) on [phpmyadmin](http://localhost/phpmyadmin):


> NOTE: **`🔑`** = _PRIMARY_KEY_ &amp; **`⨁`** = _FOREIGN_KEY_

### `users` - MySQL Table

A table containing all currently registered users. his table has a [**one-to-many**](https://www.metabase.com/learn/databases/table-relationships#one-to-many-relationship) relationship with [*`favorites`*](#`favorites`---MySQL-Table).

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑 | **BINARY**_<sup>1</sup>_ | 16 | No | None | - | 
| 2 | *`login`* | **VARCHAR** | 40 | No | None | **UNIQUE KEY** | 
| 3 | *`first_name`* | **VARCHAR** | 30 | No | None | - | 
| 4 | *`last_name`* | **VARCHAR** | 30 | No | None | - | 
| 5 | *`email`* | **VARCHAR** | 50_<sup>2</sup>_ | No | None | **UNIQUE KEY** |
| 6 | *`password`* | **VARCHAR** | 255 | No | None | - |
| 7 | *`birth_date`* | **DATE** | - | Yes | *NULL* | - | 
| 8 | *`role`* | **VARCHAR** | 13 | No | *member* | - | 
| 9 | *`token`* | **VARCHAR** | 255 | Yes | *NULL* | - | 
| 10 | *`updated_at`* | **DATETIME** | - | Yes | *NULL* | - |  
| 11 | *`created_at`* | **DATETIME** | - | No | None | - |  

> NOTE: (1) The **`UUID()`** and **`UUID_TO_BIN()`** functions are used to convert a [UUID](https://www.mysqltutorial.org/mysql-uuid/) from a human-readable format (VARCHAR) into a compact format (BINARY) for storing in the *`id`* column.

> NOTE: (2) Limited *`email`* to **50** because statistics show that no-one actually enters more than about 40 chars for email address, see e.g.: **ZZ Coder**'s answer [https://stackoverflow.com/a/1297352/87861](https://stackoverflow.com/a/1297352/87861).


### `favorites` - MySQL Table 

A table containing all favorite movies and series or tv-shows of registered *`users`*. This table has a [**many-to-one**](https://www.metabase.com/learn/databases/table-relationships#many-to-one-relationship) relationship with [*`users`*](#`users`---MySQL-Table) table.

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **INT** | 11 | No | None | **AUTO_INCREMENT** |
| 2 | *`user_id`* ⨁ | **BINARY** | 16 | No | None | - |
| 3 | *`movie_tv_id`* | **INT** | 11 | No | None | - |
| 4 | *`kind`* | **VARCHAR** | 6 | No | "*movie*" | - |
| 5 | *`created_at`* | **DATETIME** | - | Yes | *NULL* | - |

> NOTE:  


### `comments` - MySQL Table 

A table containing all the comments written by registered *`users`*. This table has a [**many-to-one**](https://www.metabase.com/learn/databases/table-relationships#many-to-one-relationship) relationship with [*`users`*](#`users`---MySQL-Table) table.

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **INT** | 11 | No | None | **AUTO_INCREMENT** |
| 2 | *`user_id`* ⨁ | **BINARY** | 16 | No | None | - |
| 3 | *`movie_tv_id`* | **INT** | 11 | No | None | - |
| 4 | *`kind`* | **VARCHAR** | 6 | No | "*movie*" | - |
| 5 | *`body`* | **TEXT** | - | No | None | - |
| 6 | *`updated_at`* | **DATETIME** | - | Yes | *NULL* | - |  
| 7 | *`created_at`* | **DATETIME** | - | No | None | - |  

> NOTE:


### `replies` - MySQL Table

A table containing all the replies to previously written *`comments`*. This table has a [**many-to-one**](https://www.metabase.com/learn/databases/table-relationships#many-to-one-relationship) relationship with [*`comments`*](#`users`---MySQL-Table) table.

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **INT** | 11 | No | None | **AUTO_INCREMENT** |
| 2 | *`user_id`* ⨁ | **BINARY** | 16 | No | None | - |
| 3 | *`comment_id`* ⨁ | **INT** | 11 | No | None | - |
| 4 | *`body`* | **TEXT** | - | No | None | - |
| 5 | *`updated_at`* | **DATETIME** | - | Yes | *NULL* | - |  
| 6 | *`created_at`* | **DATETIME** | - | No | None | - |  

> NOTE: 

### `users_archive` - MySQL Table

A table containing a list of all archived *`users`*. This table has a [**many-to-one**](https://www.metabase.com/learn/databases/table-relationships#many-to-one-relationship) relationship with [*`comments`*](#`users`---MySQL-Table) table.

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **INT** | 11 | No | None | **AUTO_INCREMENT** |
| 2 | *`user_id`* | **BINARY** | 16 | No | None | - |
| 3 | *`user_login`* | **VARCHAR** | 40 | No | None | - |
| 4 | *`user_first_name`* | **VARCHAR** | 30 | No | None | - |
| 5 | *`user_last_name`* | **VARCHAR** | 30 | No | None | - |
| 6 | *`user_email`* | **VARCHAR** | 50_<sup>2</sup>_ | No | None | - |
| 7 | *`timestamp`* | **TIMESTAMP** | - | No | None | - |

> NOTE:

### `archive_users_before_delete` - MySQL Trigger
📣 - A simple MySQL TRIGGER that automatically archives deleted *`users`*.


### `logs` - MySQL Table

A table that enhances our database by logging some important changes in any table. 

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **INT** | 11 | No | None | **AUTO_INCREMENT** |
| 2 | *`type`* | **VARCHAR** | 30 | No | *"info"* | - |
| 3 | *`message`* | **VARCHAR** | 255 | No | None | - |
| 4 | *`severity`* | **TINYINT** | 4 | No | *0* | - |
| 5 | *`timestamp`* | **TIMESTAMP** | - | No | None | - |

> NOTE: 

### `online_users` - MySQL Table

All users that have logged in and not yet logged out (assumed to be online).

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`user_id`* | **BINARY** | 16 | No | None | - |
| 2 | *`user_login`* | **VARCHAR** | 40 | No | None | **UNIQUE KEY** |
| 3 | *`ipv4`* | **INT** | - | No | None | - |
| 4 | *`timestamp`* | **TIMESTAMP** | - | No | None | - |

> NOTE: 

### `log_online_users` - MySQL Trigger

📣 - A simple MySQL TRIGGER to automatically log online users - that have logged in and not yet logged out - into the *`logs`* table ;)

### `log_offline_users` - MySQL Trigger
📣 - A simple MySQL TRIGGER to automatically log offline users - that have logged out - into the *`logs`* table ;)


---

## Installation
> IMPORTANT: Make sure you have [`XAMPP`](https://www.apachefriends.org/) already installed on your computer before proceeding.

1. Clone this project's repository
```sh
git clone https://github.com/abraham-ukachi/cinetech.git
```

> NOTE: There's no need to change the current working directory to **cinetech**


2. Now, create a symbolic link of **cinetech** in the `XAMPP`'s **htdocs** folder:

-   **On Mac**

```sh
ln -s "$(pwd)/cinetech" /Applications/XAMPP/htdocs/cinetech
```
-   **On Linux**

```sh
ln -s "$(pwd)/cinetech" /opt/lampp/htdocs/cinetech
```

3. Open the **cinetech** folder in your default browser:

```sh
open http://localhost/cinetech
```



---

## Testing

| Browser | Version | Status | Date | Time
|:--------|:--------|:-------|:-----|:-----
| *`Arc`* | **0.98.2** | *Pending* | - | -  
| *`Brave`* | **-** | *Pending* | - | -
| *`Chrome`* | **-** | *Pending* | - | -
| *`Firefox`* | **-** | *Pending* | - | -
| *`Safari`* | **-** | *Pending* | - | -
| *`Opera`* | **-** | *Pending* | - | -
| *`Edge`* | **-** | *Pending* | - | -
| *`IE`* | **-** | *Pending* | - | -

> NOTE: *`IE`* = Internet Explorer = 👎🏽


## TODOs

- [ ] Create a *`users_pref`* MySQL Table to store users' preference like **theme**, **language**, etc...
- [ ] Use [HTTP Client](https://laravel.com/docs/10.x/http-client#request-data) from [Laravel](https://laravel.com/docs/10.x) for quick outgoing Https requests, instead of [Guzzle HTTP Client](http://docs.guzzlephp.org/en/stable/).
- [ ] Use [UUID](https://www.mysqltutorial.org/mysql-uuid/) as `users` primary key.
- [ ] Create an admin page.
- [ ] Create a project-specific (i.e. Muvisho) logo
- [ ] Add localization / internationalization (at least: **en**, **fr**, **ru** and **es**)
- [ ] Add mobile compatibility to all pages (i.e. make it responsive)
- [ ] Optimize `.svg` doodles
- [ ] Optimize all `.php` & `.html` files
- [ ] Optimize all `.css` files
- [ ] Optimize all `.js` files
- [ ] Remove unnecessary comments
- [ ] Add screenshots

---


## Some Random Screenshots

### On Mobile

| No. |Light Mode | Dark Mode | Note |
|:----|:-----------|:----------|:-----|
| 1. | N/A | N/A | - |


### On Laptop

| No. |Light Mode | Dark Mode | Note |
|:----|:----------|:----------|:-----|
| 1. | N/A | N/A | - |

