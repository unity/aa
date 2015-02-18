import React        from 'react';
import ResizedImage from '../ui/resized-image';

var Answer = React.createClass({
  handleAnswer: function(){
    this.props.onAnswer({questionRef:this.props.question_ref, answerRef:this.props._ref, });
  },
  render: function() {
    return (
      <a onClick={this.handleAnswer} className="answer">
        {this.props.children}
        <ResizedImage height={300} src={this.props.picture} alt="" className="img-responsive" style={{margin:'0 auto'}}/>
        <h5 className="mt-1 mb-0 answer-name">
          {this.props.name}
          <br/>
          <small>{this.props.description}&nbsp;</small>
        </h5>
      </a>
    );
  }
});


module.exports = Answer;
