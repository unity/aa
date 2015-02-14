var React = require('react');

var Answer = React.createClass({
  handleAnswer: function(){
    this.props.onAnswer({questionRef:this.props.question_ref, answerRef:this.props._ref});
  },
  render: function() {
    return (
      <a onClick={this.handleAnswer} className="answer">
        <h4 className="m-0 answer-name">
          {this.props.name}
          <br/>
          <small>{this.props.description}</small>
        </h4></a>
    );
  }
});


module.exports = Answer;
