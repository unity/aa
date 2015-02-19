// TEMPORARY
import Hull from './lib/hull-init';
import Translations from '../locales/en.json';
import Manifest from '../manifest.json';
// TEMPORARY

import App from './app';
var appInit = function(hull, me, platform, org){
  // Clone the Ship so we're safely using it
  var platform = JSON.parse(JSON.stringify(platform));

  // Since we're booting the ship fullpage,
  // we're reworking the deployments object.
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

  // TEMPORARY
  deployment.ship.translations.en = Translations;

  // Fake the Homepage URL, and the manifest for the embedded ship
  // deployment.ship.index = deployment.ship.manifest.index
  // deployment.ship.index = '/'+deployment.ship.manifest.index
  deployment.ship.index = Manifest.index.replace(/dist\//,'');

  // Fake deployment options to insert the ship in the test page.
  deployment.settings = {
    $el:'#ship',
    $placement:'bottom',
    $multi:true,
    $fullpage: false
  };
  // For full apps, do this to embed the ship without going through HTML imports.
  App.start(document.getElementById('ship'),deployment);

  // When embedded by Hull. this is how the app will be booted:
  // 
  // Only one ship testing at a time, but Hull.embed expects an array;
  // Hull.embed([deployment]);
  // This will call the `Hull.onEmbed()` that's inside the app
}

Hull.init(hullConfig);
Hull.ready(appInit);

