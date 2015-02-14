import React from 'react';
import Answer from './answer';

var Question = React.createClass({
  handleAnswer: function(answer){
    this.props.onAnswer(answer)
  },
  render: function() {
    var answers = this.props.answers.map(function(answer){
      var description;
      if(answer.description) description=<p className="answer-description">{answer.description}</p>;
      return <Answer {...answer} _ref={answer.ref} onAnswer={this.handleAnswer}/>
    },this);
    return <div className="answers">{answers}</div>
  }
});

module.exports = Question;
