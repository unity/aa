// TEMPORARY
import Translations from '../locales/en.json';
import Manifest from '../manifest.json';
// TEMPORARY

import App from './app';
var appInit = function(hull, me, platform, org){
  // // Since we're booting the ship fullpage,
  // // we're reworking the deployments object.
  // if(platform.type==='ship'){
  //   var deployment={
  //     ship:platform,
  //     platform:{}
  //   }
  // } else {
  //   var deployment = platform.deployments[0];
  //   delete platform.deployments;
  //   // Change structure to pass the right format;
  //   deployment.platform = platform;
  // }
  var ds = platform.deployments[0].deploy_options
  platform.deployments[0].settings = {}
  platform.deployments[0].settings.$selector = ds.el
  platform.deployments[0].settings.$multi = true
  platform.deployments[0].settings.$placement = ds.placement
  platform.deployments[0].settings.$sandbox = false
  platform.deployments[0].settings.$width = '100%'
  platform.deployments[0].settings.$height = '400'

  // TEMPORARY
  platform.deployments[0].ship.translations.en = Translations;

  // Fake the Homepage URL, and the manifest for the embedded ship
  // deployment.ship.index = deployment.ship.manifest.index
  // deployment.ship.index = '/'+deployment.ship.manifest.index
  platform.deployments[0].ship.index = 'http://2a3adf09.ngrok.com/index.html';

  // For full apps, do this to embed the ship without going through HTML imports.
  // App.start(document.getElementById('ship'),platform.deployments[0]);

  // When embedded by Hull. this is how the app will be booted:
  // 
  // Only one ship testing at a time, but Hull.embed expects an array;
  hull.embed(platform.deployments);
  // This will call the `Hull.onEmbed()` that's inside the app
}

console.log('Parent', window.foo)

Hull.init(hullConfig);
Hull.ready(appInit)

