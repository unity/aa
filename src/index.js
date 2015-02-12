import Hull from './lib/hull-init';
import Translations from '../locales/en.json';
import Engine    from './lib/engine';
import styles    from './styles/main.scss';

import React     from 'react';
import Router    from 'react-router';
import Routes    from './lib/routes';

var App = {
  start: function(element, deployment){
    var engine = new Engine(deployment);

    // Router.run(Routes, Router.HistoryLocation, function (Handler) {
    Router.run(Routes, function (Handler) {
      React.render(<Handler engine={engine} sandbox={true} styles={styles} />, element);
    });
  }
}

var appInit = function(hull, me, platform, org){
  // Clone the Ship so we're safely using it
  var platform = JSON.parse(JSON.stringify(platform));

  // Ensure we only have 1 deployment for test mode
  var deployment = platform.deployments[0];
  delete platform.deployments;

  
  // Change structure to pass the right format;
  deployment.platform = platform;

  deployment.ship.translations.en = Translations;

  // Fake the Homepage URL for the embedded ship
  // deployment.ship.index = deployment.ship.manifest.index
  // deployment.ship.index = '/'+deployment.ship.manifest.index
  deployment.ship.index = deployment.ship.manifest.index

  // Fake deployment options to insert the ship in the test page.
  deployment.settings = {
    $el:'#ship',
    $placement:'bottom',
    $multi:true,
    $fullpage: false
  };

  // For full apps, do this to embed the ship in a raw way.......
  App.start(document.getElementById('ship'),deployment);
  // Only one ship testing at a time, but Hull.embed expects an array;
  // Hull.embed([deployment]);
  
}
Hull.init(hullConfig,appInit);

