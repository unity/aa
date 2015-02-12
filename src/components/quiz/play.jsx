import assign from 'object-assign';
import React from 'react';
import Countdown from './countdown';

var Answer = React.createClass({
  handleAnswer: function(){
    this.props.onAnswer({questionRef:this.props.question_ref, answerRef:this.props.ref});
  },
  render: function() {
    return (
      <a onClick={this.handleAnswer} className="answer">
        <h2 className="answer-name">{this.props.name}</h2>{this.props.description}</a>
    );
  }
});



var Question = React.createClass({
  handleAnswer: function(answer){
    this.props.onAnswer(answer)
  },
  render: function() {
    var answers = this.props.answers.map(function(answer){
      var description;
      if(answer.description) description=<p className="answer-description">{answer.description}</p>;
      return <Answer {...answer} onAnswer={this.handleAnswer}/>
    },this);
    return <div className="answers">{answers}</div>
  }
});

var Play = React.createClass({

  handleAnswer: function(answer){
    this.props.actions.selectAnswer(answer);
  },
  renderCountdown: function(){
    if(!this.props.countdown) return;
    return <Countdown max={this.props.settings.quiz_countdown} value={this.props.countdown}/>
  },
  renderQuestionDescription: function(){
    if(!this.props.currentQuestion.description) return;
    return <p className="step-description">{this.props.currentQuestion.description}</p>
  },
  renderQuestionCountdown: function(){
    if(!this.props.currentQuestion.countdown) return;
    return <Countdown max={this.props.settings.question_countdown} value={this.props.currentQuestion.countdown}/>
  },
  renderQuestionPicture: function(){
    if(!this.props.currentQuestion.picture) return;
    return <img src={this.props.currentQuestion.picture} />
  },
  renderQuestion: function(){
    return <Question {...this.props.currentQuestion} onAnswer={this.handleAnswer}/>
  },
  render: function() {
    return (
      <div>
        <h1 className="step-name">{this.props.currentQuestion.name}</h1>
        {this.renderCountdown()}
        {this.renderQuestionDescription()}
        {this.renderQuestionCountdown()}
        {this.renderQuestionPicture()}
        {this.renderQuestion()}
      </div>
    );
  }

});

module.exports = Play;
