import React from 'react';
import Router    from 'react-router'
var {RouteHandler} = Router

var Quiz = React.createClass({
  getDefaultProps: function() {
    return {
      resource:{},
      ship: {},
      providers:{}
    };
  },
  render: function() {
    return <RouteHandler {...this.props}/>;
  }
});

module.exports = Quiz;
