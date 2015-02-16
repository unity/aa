import _                    from 'underscore-contrib';
import React                from 'react';
import Router               from 'react-router';
var {RouteHandler, Route, Link} = Router

import Engine               from '../../lib/engine';

import Leaderboard          from './leaderboard';
import AnswerRecap          from './answer-recap';
import Progress             from './progress';

const FinishQuizButton = React.createClass({

  render() {
    return (
      <div className="btn btn-block btn-rounded btn-brand btn-xl">{this.props.actions.translate('finish_quiz_button')}</div>
    );
  }

});

var Results = React.createClass({
  getDefaultProps() {
    return {
      leaderboards:{}
    };
  },
  handleFinishQuiz(){
    this.props.actions.finishQuiz();
  },
  renderProgress(){
    return <Progress {...this.props.resource} current={Engine.Constants.INTRODUCTION_STEP} total={this.props.resource.questions.length} actions={this.props.actions}/>
  },
  renderFinishQuizButton(){
    if(_.size(this.props.resource.answers) >= this.props.resource.questions.length){
      return <div className="row"><div className="col-sm-8 col-sm-offset-2"><FinishQuizButton {...this.props} onClick={this.handleFinishQuiz}/></div></div>
    }
    return ;
  },
  renderResults(){
    return <div className="row">
      <div className="col-sm-6">
        <h3 className="condensed">{this.props.actions.translate('result_title')}</h3>
        <div className="step-description">
          <p>{subtitle}</p>
          <a href="#" onClick={this.handleReset} className='btn btn-primary'>{this.props.actions.translate('replay')}</a>
          <p>{this.props.actions.translate('or_complete_your_profile')}</p>
        </div>
      </div>
      <div className="col-sm-6">
        <Leaderboard leaderboard={this.props.leaderboards[0]}/>
      </div>
    </div>
  },
  render() {
    var badge = _.getPath(this.props,'badge');
    if(badge){
      var subtitle = this.props.actions.translate('result_subtitle',{
        score: this.props.badge.score||"0",
        attempts: this.props.badge.stats.attempts,
        seconds: (this.props.badge.data.timing/1000).toFixed()
      });
    }
    return (
      <div className="container">
        {this.renderProgress()}
        {this.renderFinishQuizButton()}
        <AnswerRecap {...this.props}/>
        {this.renderFinishQuizButton()}
      </div>
    );
  }

});

module.exports = Results;
