'use strict';

const express = require('express');

const constants = require('./constants'),
      imageMap = require('./imageMap'),
      indexPage = require('./page/index'),
      intermediatePage = require('./page/intermediate') ;

const { IMAGE_MAP_PATH, INDEX_PAGE_PATH, INTERMEDIATE_PAGE_PATH } = constants;

class routes {
  static router() {
    const router = express.Router();

    router.get(IMAGE_MAP_PATH, function(request, response, next) {
      response.writeHead(200, {'Content-Type': 'image/png; charset=utf-8'});

      imageMap.respond(response);
    });

    router.get(INDEX_PAGE_PATH, function(request, response, next) {
      const html = indexPage.html();

      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

      response.end(html);
    });

    router.get(INTERMEDIATE_PAGE_PATH, function(request, response, next) {
      const html = intermediatePage.html();

      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

      response.end(html);
    });

    return router;
  }
}

module.exports = routes;