import _                    from 'underscore';
import React                from 'react';
import Router               from 'react-router';
var {RouteHandler, Route, Link} = Router

var Resource = React.createClass({
  getDefaultProps: function() {
    return {
      resource:{}
    };
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <h1 className='text-center'>{this.props.resource.name}</h1>
          </div>
        </div>
        <div className="row">
          <RouteHandler {...this.props}/>
        </div>
      </div>
    );
  }

});

module.exports = Resource;
