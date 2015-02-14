import React from 'react';
import LoginButtons from './login-buttons';

var Introduction = React.createClass({
  getDefaultProps: function() {
    return {
      strings:{}
    };
  },
    handlePlay: function(service){
    this.props.actions.play(this.props.resource.id, service);
  },
  renderPlay: function(){
    if (!this.props.user) return;
    var style = {
      backgroundColor:this.props.settings.button_background_color,
      color: this.props.settings.button_text_color
    }
    return <button onClick={this.handlePlay} style={style} className="btn btn-primary btn-rounded btn-xl">{this.props.actions.translate('play_button')}</button>
  },
  render: function() {
    return (
      <div>
        <h1 className="step-name">{this.props.actions.translate('introduction_title')}</h1>
        <p className="step-description">{this.props.actions.translate('introduction_subtitle')}</p>
        {this.renderPlay()}
        <LoginButtons isLoggingIn={this.props.isLoggingIn} user={this.props.user} actions={this.props.actions} providers={this.props.provider} onLogin={this.handlePlay}/>
      </div>
    );
  }

});

module.exports = Introduction;
