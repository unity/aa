import _                    from 'underscore';
import React                from 'react';
import Router               from 'react-router';
var {RouteHandler, Route, Link} = Router

import cx                   from 'react/lib/cx';
import Engine               from '../../lib/engine';

import Leaderboard          from './leaderboard';
import AnswerRecap          from './answer-recap';
import Progress             from './progress';

const FinishQuizButton = React.createClass({

  componentWillReceiveProps(nextProps) {
    if(this.props.resource.isSaving && nextProps.badge){
      this.setState({status:'finish_quiz_button_success'});
      setTimeout(()=>{
        this.setState({status:null});
      },3000);
    } else if(!nextProps.isSaving && !nextProps.badge){
      this.setState({status:'finish_quiz_button_error'});
    }
  },
  getInitialState() {
    return {
      status:null 
    };
  },
  render() {
    var isSaving = this.props.resource.isSaving;
    var label;
    if(isSaving){
      label = 'finish_quiz_button_progress';
    } else if (!!this.state.status){
      label = this.state.status;
    } else if (!!this.props.badge){
      label = 'update_quiz_button';
    } else {
      label = 'finish_quiz_button';
    }
    var classes = cx({
       "btn btn-block btn-rounded":true,
       "btn-pill btn-tertiary":!isSaving,
       "btn-warning":!!isSaving,
       "btn-success":!!this.state.status,
       "btn-danger":(!this.props.badge && !isSaving && !this.state.status)
    })
    return (
      <div className={classes} onClick={this.props.onClick}>{this.props.actions.translate(label)}</div>
    );
  }

});

var Results = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getDefaultProps() {
    return {
      leaderboards:{}
    };
  },
  handleReset: function(e){
    this.props.actions.reset();
  },
  handleFinishQuiz(){
    var {resourceKey, step}=this.getParams();
    this.props.actions.finishQuiz(resourceKey);
  },
  renderProgress(){
    return <Progress {...this.props.resource} current={Engine.Constants.INTRODUCTION_STEP} total={this.props.resource.questions.length} actions={this.props.actions}/>
  },
  renderFinishQuizButton(){
    if(_.size(this.props.resource.answers) >= this.props.resource.questions.length){
      return <FinishQuizButton {...this.props} onClick={this.handleFinishQuiz}/>
    }
    return ;
  },
  renderPrintButton(){
    if(_.size(this.props.resource.answers) >= this.props.resource.questions.length){
      return <a href="#" className="btn btn-block btn-pill btn-rounded btn-tertiary" onClick={window.print}>Imprimer</a>
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
  renderActionButtons(){
    return <div className="row pt-1 pb-2 hidden-print">
      <div className="col-sm-4 col-sm-offset-1">{this.renderFinishQuizButton()}</div>
      <div className="col-sm-4 col-sm-offset-2">{this.renderPrintButton()}</div>
    </div>
  },
  render() {
    var badge = this.props.badge
    if(badge){
      var subtitle = this.props.actions.translate('result_subtitle',{
        score: this.props.badge.score||"0",
        attempts: this.props.badge.stats.attempts,
        seconds: (this.props.badge.data.timing/1000).toFixed()
      });
    }
    return (
      <div className="container-fluid">
        {this.renderProgress()}
        {this.renderActionButtons()}
        <AnswerRecap {...this.props}/>
        {this.renderActionButtons()}
      </div>
    );
  }

});

module.exports = Results;
