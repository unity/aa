import React     from 'react';
import Router    from 'react-router';
var {Route, Routes, NotFoundRoute, DefaultRoute, Redirect} = Router;

import Home         from '../components/home';
import Ship         from '../components/ship';
import Resource     from '../components/ui/resource';
import Rules        from '../components/rules';

import Quiz         from '../components/quiz';
import Introduction from '../components/quiz/introduction';
import Play from '../components/quiz/play';
import Results      from '../components/quiz/results';

import Engine       from '../lib/engine';


var routes=  (
    <Route path='/'                                           handler={Ship}>
    <DefaultRoute name='home'                                 handler={Home} />
    <Route name='rules' path='/rules'                         handler={Rules} />
    <Route name='resource' path=':resourceKey'                handler={Resource}>
      <DefaultRoute                                           handler={Introduction} />
      <Route name='resource-results' path={`/:resourceKey/${Engine.Constants.RESULT_STEP}`}              handler={Results} />
      <Route name='resource-step'   path='/:resourceKey/:step'  handler={Play} />
    </Route>
  </Route>
);

var AppRouter;
var isRunning = false;

function onError(error) {
  console.error("---------------------- Router Error ---------------------- ");
  console.trace(error);
}


module.exports = {
  run: function(handler) {
    AppRouter = Router.create({
      routes: routes,
      location: Router.HashLocation,
      onError: onError
    });
    return AppRouter.run(function(Handler, state) {
      isRunning = true;
      handler(Handler, state)
    });
  },

  transitionTo: function(path, params={}, query={}) {
    if (isRunning) {
      params.org = params.org || (AppContextStore.getCurrentOrg() || {}).namespace;
      return AppRouter.transitionTo(path, params, query);
    } else {
      console.warn("Router not started yet... cannot transition...");
    }
  }
};
