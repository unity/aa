import _                    from 'underscore';
import React                from 'react';
import Router               from 'react-router';
var {RouteHandler, Route, Link} = Router

import ResizedImage from '../ui/resized-image';

var Resource = React.createClass({
  mixins: [Router.State, Router.Navigation],
  renderHeader(){
    if(this.props.selectedResource){
      // <h4 className='text-center mt-0'>{this.state.resource.name}</h4>
      return <header className="header text-center mt-2">
        <ResizedImage src={this.props.selectedResource.picture} className="logo img-responsive" style={{margin:'0 auto'}}/>
      </header>
    }
  },
  getInitialState() {
    return {
      resource: {},
      question: {}
    };
  },
  render() {
    var props = {
      user      : this.props.user,
      settings  : this.props.settings,
      providers : this.props.providers,
      error     : this.props.error,
      ship      : this.props.ship,
      actions   : this.props.actions,
      resource  : this.props.selectedResource,
      badge     : this.props.selectedResource && this.props.selectedResource.badge,
      leaderboards : this.props.selectedResource && this.props.selectedResource.leaderboard
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">{this.renderHeader()}</div>
        </div>
        <div className="row">
          <RouteHandler {...props}/>
        </div>
      </div>
    );
  }

});

module.exports = Resource;
