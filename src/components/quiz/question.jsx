import React from 'react';
import Answers from './answers';
import ResizedImage from '../ui/resized-image';

var Question = React.createClass({
  // <div className="col-sm-6">{this.renderQuestionPicture()}</div>
  renderAnswers(){
    return <Answers answers={this.props.answers} onAnswer={this.props.onAnswer}/>
  },

  renderQuestionDescription(){
    if(!this.props.description) return;
    return <p className="mb-2 mt-0">{this.props.description}</p>
  },
  renderQuestionPicture(){
    if(!this.props.picture) return;
    return <ResizedImage className='img-responsive' src={this.props.picture} />
  },
  renderQuestionCountdown(){
    if(!this.props.countdown) return;
    return <Countdown max={this.props.settings.question_countdown} value={this.props.countdown}/>
  },
  render() {
    return (
      <div>
        <h1 className="mb-0">{this.props.name}</h1>
        {this.renderQuestionDescription()}
        {this.renderQuestionCountdown()}
        {this.renderAnswers()}
      </div>
    );
  }

});

export default Question;
