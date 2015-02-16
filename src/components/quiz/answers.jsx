import React from 'react';
import Answer from './answer';

var Answers = React.createClass({
  getDefaultProps() {
    return {
      answers:[] 
    };
  },
  render: function() {
    var answers = this.props.answers.map(function(answer,i){
      var description;
      if(answer.description) description=<p className="answer-description">{answer.description}</p>;
      return <div key={`answer-${i}`} className='col-xs-6 col-sm-3 ps-0'><div className='panel-body'><Answer {...answer} _ref={answer.ref} onAnswer={this.props.onAnswer}/></div></div>
    },this);
    return <div className="container">
      <div className="answers row">{answers}</div>
    </div>
  }
});

module.exports = Answers;
