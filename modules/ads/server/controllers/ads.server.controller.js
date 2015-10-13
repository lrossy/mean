'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Ad = mongoose.model('Ad'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a ad
 */

exports.create = function (req, res) {
  var ad = new Ad(req.body);
  ad.user = req.user;

  ad.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ad);
    }
  });
};

/**
 * Show the current ad
 */
exports.read = function (req, res) {
  res.json(req.ad);
};

/**
 * Update a ad
 */
exports.update = function (req, res) {
  var ad = req.ad;

  ad.title = req.body.title;
  ad.content = req.body.content;

  ad.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ad);
    }
  });
};

/**
 * Delete an ad
 */
exports.delete = function (req, res) {
  var ad = req.ad;

  ad.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ad);
    }
  });
};

/**
 * List of Ads
 */
exports.list = function (req, res) {
  Ad.find().sort('-created').populate('user', 'displayName').exec(function (err, ads) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(ads);
    }
  });
};

/**
 * Ad middleware
 */
exports.adByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Ad is invalid'
    });
  }

  Ad.findById(id).populate('user', 'displayName').exec(function (err, ad) {
    if (err) {
      return next(err);
    } else if (!ad) {
      return res.status(404).send({
        message: 'No ad with that identifier has been found'
      });
    }
    req.ad = ad;
    next();
  });
};
