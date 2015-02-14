import _                    from 'underscore';
import assign               from 'object-assign';
import React                from 'react';
import Router               from 'react-router';
var {RouteHandler, Route, Link} = Router;

var Resources = React.createClass({
  mixins: [Router.State],
  componentDidMount: function() {
    this.props.actions.selectResource(this.getParams().resourceKey)
  },
  componentWillUnmount: function() {
    this.props.actions.selectResource(undefined)
  },
  render: function() {
    var props = assign({},{
      resource: this.props.selectedResource,
      user: this.props.user,
      settings: this.props.settings,
      providers: this.props.providers,
      error: this.props.error,
      ship: this.props.ship,
      actions: this.props.actions
    });
    return <RouteHandler {...props}/>;
  }

});

module.exports = Resources;
