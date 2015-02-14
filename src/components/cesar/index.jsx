var React = require('react');
import Router from 'react-router'
var {RouteHandler, Route} = Router

import Quiz      from '../quiz/index';

var Cesar = React.createClass({

  render: function() {
    return (
      <RouteHandler {...this.props}/>
    );
  }

});

module.exports = Cesar;
