import React from 'react';

import Introduction from './introduction';
import Play from './play';
import Quiz from './quiz';
import Result from './result';
import Thanks from './thanks';


var Steps = {
  "introduction_step" :Introduction,
  "play_step"         :Play,
  "quiz_step"         :Quiz,
  "result_step"       :Result,
  "thanks_step"       :Thanks
};

var Quiz = React.createClass({
  getDefaultProps: function() {
    return {
      ship: {},
      providers:{}
    };
  },
  renderLoader: function(){
    if(!this.props.isLoading){
      return <div className="loader">
        <p className="loader-message">LoaderMessage</p>
      </div>
    }
  },
  renderHeader: function(){
    if(this.props.settings.logo_image){
      return <header className="header">
        <img src={this.props.settings.logo_image} className="logo"/>
      </header>
    }
  },
  renderStep: function(){
    var Step=Steps[this.props.currentStep];
    return <Step {...this.props}/>;
  },
  render: function() {
    return (
      <div className="ship">
        {this.renderHeader()}
        {this.renderStep()}
        <footer className="footer">
          <p>{this.props.actions.translate('footer_message')}</p>
        </footer>
      </div>
    )
  }
});

module.exports = Quiz;
