import React     from 'react';
import Router    from 'react-router';
var {Route, Routes, NotFoundRoute, DefaultRoute, Redirect} = Router;

import Home      from '../components/home';
import Ship      from '../components/ship';
import Resource  from '../components/ui/resource';
import Resources from '../components/ui/resources';
import Rules     from '../components/rules';

import Quiz      from '../components/quiz';
import Results   from '../components/quiz/results';

var AppRouter;
module.exports = (
  <Route path='/'                            handler={Ship}>
    <DefaultRoute name='home'                handler={Home} />
    <Route name='rules'                      handler={Rules} />
    <Route name='quizzes'                    handler={Resources}>

      <Route name='quiz' path=':resourceKey' handler={Resource}>
        <DefaultRoute                        handler={Quiz} />
        <Route name='results'                handler={Results} />
      </Route>

    </Route>
  </Route>
);
