import React from 'react';
import translate from '../lib/translate';


var Introduction = React.createClass({

  getDefaultProps: function() {
    return {
      strings:{}
    };
  },

  handlePlay: function(e){
    this.props.actions.play();
  },
  renderPlay: function(){
    if (!this.props.user) return;
    return <button onClick={this.handlePlay} className="button">{this.props.actions.translate('play_button')}</button>
  },
  renderLogin: function(){
    if (this.props.user) return;
    var content, service;
    if(this.props.isLoggingIn){
      content = this.props.actions.translate('logging_in_message');
    } else {
      content = this.props.providers.map(function(service){
        return <button key={'service-'+service.name} onClick={this.handlePlay(service)} className="button">{this.props.actions.translate('play_with_service_button',{service:service.name})}</button>
      },this);
    }
    return content
  },
  render: function() {
    return (
      <div>
        <h1 className="step-name">{this.props.actions.translate('introduction_title')}</h1>
        <p className="step-description">{this.props.actions.translate('introduction_subtitle')}</p>
        {this.renderPlay()}
        {this.renderLogin()}
      </div>
    );
  }

});

module.exports = Introduction;
