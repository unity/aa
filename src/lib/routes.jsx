import React     from 'react';
import Router from 'react-router';
var {Route, Routes, NotFoundRoute, DefaultRoute, Redirect} = Router;

import Home from  '../components/home';
import Ship from  '../components/ship';
import Cesar from '../components/cesar';
import Oscar from '../components/oscar';

var AppRouter;
module.exports = (
  <Route path='/'       handler={Ship}>
    <Route name='cesar' handler={Cesar} />
    <Route name='oscar' handler={Oscar} />
    <DefaultRoute       handler={Home} />
  </Route>
);
