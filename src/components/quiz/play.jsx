import _                    from 'underscore';
import React                from 'react';
import Router               from 'react-router';
var {RouteHandler, Route, Link} = Router

import Countdown            from './countdown';
import Progress             from './progress';
import Question             from './question';

var Play = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getInitialState() {
    return {
      question:{} 
    };
  },
  handleAnswer(answer){
    this.props.actions.selectQuizAnswer(this.props.resource.id, answer);
    var {resourceKey, step}=this.getParams();
    var step = this.props.actions.getNextStep(resourceKey,step);
    this.transitionTo('resource-step',{step, resourceKey});
  },
  renderCountdown(){
    if(!this.props.countdown) return;
    return <Countdown max={this.props.settings.quiz_countdown} value={this.props.countdown}/>
  },
  renderProgress(){
    if(!this.props.resource || !this.props.resource.currentQuestionIndex ||!this.props.resource.questions || !this.props.resource.questions.length) return;
    return <Progress {...this.props.resource} current={this.props.resource.currentQuestionIndex+1} total={this.props.resource.questions.length} actions={this.props.actions}/>
  },
  renderQuestion(){
    if(!this.props.resource || !this.props.resource.currentQuestion) return;
    return <Question {...this.props.resource.currentQuestion} onAnswer={this.handleAnswer} settings={this.props.settings} actions={this.props.actions}/>
  },
  render() {
    return (
      <div>
        {this.renderCountdown()}
        {this.renderProgress()}
        {this.renderQuestion()}
        {this.renderProgress()}
      </div>
    );
  }

});

module.exports = Play;
