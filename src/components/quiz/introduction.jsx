import React from 'react';
import LoginButtons from './login-buttons';
import Router               from 'react-router';
var {RouteHandler, Route, Link} = Router

var Introduction = React.createClass({
  mixins: [Router.State, Router.Navigation],
  getDefaultProps: function() {
    return {
      resource:{}
    };
  },
  handlePlay: function(service){
    this.props.actions.play(this.props.resource.id, service);
  },
  renderPlay: function(){
    if (!this.props.user) return;
    var {resourceKey,step}=this.getParams()
    var step = this.props.actions.getNextStep(resourceKey,step);
    return <Link
      to='resource-step'
      params={{resourceKey, step}}
      className="btn btn-pill btn-tertiary">{this.props.actions.translate('play_button')}</Link>
  },
  render: function() {
    return (
      <div>
        <h1 className="step-name">{this.props.actions.translate('introduction_title',{quiz:this.props.resource.name})}</h1>
        <p className="step-description">{this.props.actions.translate('introduction_subtitle')}</p>
        {this.renderPlay()}
        <LoginButtons isLoggingIn={this.props.isLoggingIn} user={this.props.user} actions={this.props.actions} providers={this.props.provider} onLogin={this.handlePlay}/>
      </div>
    );
  }

});

module.exports = Introduction;
