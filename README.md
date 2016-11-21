# express-ejs-boots-demo

## Synopsis

Quick look at using [Express.js](http://expressjs.com/) with the [EJS templating engine](http://www.embeddedjs.com/), [Bootstrap](http://getbootstrap.com/), and a [Bootswatch theme](https://bootswatch.com/). Should play nice with the [Node.js](https://nodejs.org/en/) LTS release.

![Screenshot](/README.md-img/index.png?raw=true)

---

## Getting started

After cloning this repository, change working directory:

```shell
cd express-ejs-boots-demo
```

## Prepare your environment

```shell
cp ./site-config/http-server.json.EXAMPLE ./site-config/http-server.json
vi ./site-config/http-server.json
```

(TLS is optional.)

```shell
cp ./site-data/directory-structure.json.EXAMPLE ./site-data/directory-structure.json
```

## Install dependencies

First, install Node.js and add npm(1) / node(1) to your path. Next:

```shell
npm install
./node_modules/bower/bin/bower install
```

## Start HTTP server

```shell
node app.js
```
