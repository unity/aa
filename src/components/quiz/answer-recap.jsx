import _                    from 'underscore-contrib';
import React                from 'react';
import Router               from 'react-router';
var {RouteHandler, Route, Link} = Router
import Answer               from './answer';

var PackeryMixin = require('react-packery-mixin');
 
var packeryOptions = {
    transitionDuration: 200,
    gutter: 30
};
 
const AnswerRecap = React.createClass({
  mixins: [Router.State, Router.Navigation, PackeryMixin('packeryContainer', packeryOptions)],
  handleAnswer(){
  },
  componentDidUpdate(prevProps, prevState) {
    setTimeout(()=>{
      this.initializePackery(true);
    },100)
  },
  renderQuestions(){
    var {resourceKey, step}=this.getParams();
    var questions = this.props.resource.questions.map(function(question,i){
      var userAnswerRef = this.props.resource.answers[question.ref];
      var userAnswer = _.findWhere(question.answers,{ref:userAnswerRef});
      var answer;
      if(!userAnswer){
        answer = [
          <p>Pas encore répondu</p>,
          <Link className='btn btn-tertiary btn-pill btn-sm' to='resource-step' params={{resourceKey,step:i}}>Répondez</Link>
        ];
      } else {
        answer = <Answer {...userAnswer} onAnswer={this.handleAnswer}><small>Votre réponse</small></Answer>
      }
      return <div style={{width:250}} key={`question-${i}`}>
        <h4 className="question">{question.name}</h4>
        {answer}
      </div>
    },this);
    return questions
    // return _.chunkAll(questions,2).map(function(chunk){
    //   return <div className="row">{chunk}</div>
    // });
  },
  render() {
    return (
      <div ref="packeryContainer">{this.renderQuestions()}</div>
    );
  }

});

export default AnswerRecap;
