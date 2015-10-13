'use strict';

// Setting up route
angular.module('ads').config(['$stateProvider',
  function ($stateProvider) {
    // Ads state routing
    $stateProvider
      .state('ads', {
        abstract: true,
        url: '/ads',
        template: '<ui-view/>'
      })
      .state('ads.list', {
        url: '',
        templateUrl: 'modules/ads/client/views/list-ads.client.view.html'
      })
      .state('ads.create', {
        url: '/create',
        templateUrl: 'modules/ads/client/views/create-ad.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('ads.view', {
        url: '/:adId',
        templateUrl: 'modules/ads/client/views/view-ad.client.view.html'
      })
      .state('ads.edit', {
        url: '/:adId/edit',
        templateUrl: 'modules/ads/client/views/edit-ad.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
