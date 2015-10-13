'use strict';

// Configuring the Ads module
angular.module('ads').run(['Menus',
  function (Menus) {
    // Add the ads dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Ads',
      state: 'ads',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'ads', {
      title: 'List Ads',
      state: 'ads.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'ads', {
      title: 'Create Ads',
      state: 'ads.create',
      roles: ['user']
    });
  }
]);
