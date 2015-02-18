import Hull from './lib/hull-init';
import Translations from '../locales/en.json';
import Manifest from '../manifest.json';
import Engine    from './lib/engine';
import styles    from './styles/main.scss';

import React     from 'react';
import AppRouter    from './lib/app-router';

var App = {
  start: function(element, deployment){
    var engine = new Engine(deployment);
    AppRouter.run(function (Handler,state) {
      engine.setActiveResource(state.params.resourceKey)
      engine.setQuizQuestion(state.params.resourceKey,state.params.step)
      React.render(<Handler engine={engine} sandbox={true} styles={styles} />, element);
    });
  }
}




var appInit = function(hull, me, platform, org){
  // Clone the Ship so we're safely using it
  var platform = JSON.parse(JSON.stringify(platform));

  // Ensure we only have 1 deployment for test mode
  if(platform.type==='ship'){
    var deployment={
      ship:platform,
      platform:{}
    }
  } else {
    var deployment = platform.deployments[0];
    delete platform.deployments;
    // Change structure to pass the right format;
    deployment.platform = platform;
  }

  deployment.ship.translations.en = Translations;

  // Fake the Homepage URL, and the manifest for the embedded ship
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
  App.start(document.getElementsByClassName('ship')[0],deployment);
  // Only one ship testing at a time, but Hull.embed expects an array;
  // Hull.embed([deployment]);
  
}
Hull.init(hullConfig,appInit);

