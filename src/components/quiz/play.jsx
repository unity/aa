import assign from 'object-assign';
import React from 'react';
import Countdown from './countdown';
import Answers from './question';

var Play = React.createClass({

  handleAnswer: function(answer){
    this.props.actions.selectQuizAnswer(this.props.resource.id, answer);
  },
  renderCountdown: function(){
    if(!this.props.countdown) return;
    return <Countdown max={this.props.settings.quiz_countdown} value={this.props.countdown}/>
  },
  renderQuestionDescription: function(){
    if(!this.props.resource.currentQuestion.description) return;
    return <p className="mb-2 mt-0">{this.props.resource.currentQuestion.description}</p>
  },
  renderQuestionCountdown: function(){
    if(!this.props.resource.currentQuestion.countdown) return;
    return <Countdown max={this.props.settings.question_countdown} value={this.props.resource.currentQuestion.countdown}/>
  },
  renderAnswers: function(){
    return <Answers {...this.props.resource.currentQuestion} onAnswer={this.handleAnswer}/>
  },
  renderQuestionPicture: function(){
    if(!this.props.resource.currentQuestion.picture) return;
    return <img className='img-responsive' src={this.props.resource.currentQuestion.picture} />
  },
  render: function() {
    return (
      <div>
        <h1 className="mb-0">{this.props.resource.currentQuestion.name}</h1>
        {this.renderCountdown()}
        {this.renderQuestionDescription()}
        {this.renderQuestionCountdown()}
        <div className="row">
          <div className="col-sm-6">{this.renderQuestionPicture()}</div>
          <div className="col-sm-6">{this.renderAnswers()}</div>
        </div>
      </div>
    );
  }

});

module.exports = Play;
