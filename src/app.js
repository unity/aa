// This is where our actual App begings.
// It's used by:
// - ship.js to boot from an Embedded HTML Import
// - app.js to boot directly for a Standalone page

import React     from 'react';

// The engine containing all the logic and state for the app
import Engine    from './lib/engine';

// All the views are described in ship-router.
import ShipRouter    from './lib/ship-router';

// Entry point for the Library
// Dont start the app from here
// Call App.start(...) from your script to boot
var App = {
  start: function(element, deployment){

    // Create the Ship Engine
    var engine = new Engine(deployment);

    // Start the router
    ShipRouter.run(function (Handler,state) {
      // On location change, Update the Engine state.
      engine.setActiveResource(state.params.resourceKey)
      engine.setQuizQuestion(state.params.resourceKey,state.params.step)
      React.render(<Handler engine={engine}/>, element);
    });
  }
}

module.exports = App
