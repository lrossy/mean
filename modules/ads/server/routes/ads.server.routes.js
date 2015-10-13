'use strict';

/**
 * Module dependencies.
 */
var adsPolicy = require('../policies/ads.server.policy'),
  ads = require('../controllers/ads.server.controller');

module.exports = function (app) {
  // Ads collection routes
  app.route('/api/ads').all(adsPolicy.isAllowed)
    .get(ads.list)
    .post(ads.create);

  // Single ad routes
  app.route('/api/ads/:adId').all(adsPolicy.isAllowed)
    .get(ads.read)
    .put(ads.update)
    .delete(ads.delete);

  // Finish by binding the ad middleware
  app.param('adId', ads.adByID);
};
