import React from 'react';

import Introduction from './introduction';
import Play from './play';
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
      resource:{},
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
    if(this.props.resource.picture){
      return <header className="header">
        <img src={this.props.resource.picture} className="logo"/>
      </header>
    }
  },
  renderStep: function(){
    if(this.props.resource.currentStep){
      var Step=Steps[this.props.resource.currentStep];
      return <Step {...this.props}/>;
    }
  },
  render: function() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderStep()}
      </div>
    )
  }
});

module.exports = Quiz;
