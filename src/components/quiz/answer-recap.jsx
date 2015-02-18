import _                    from 'underscore';
import React                from 'react';
import Router               from 'react-router';
var {RouteHandler, Route, Link} = Router
import Answer               from './answer';

const AnswerRecap = React.createClass({
  mixins: [Router.State, Router.Navigation],
  renderQuestions(){
    var {resourceKey, step}=this.getParams();
    var {resourceKey, step}=this.getParams();
    var questions = this.props.resource.questions.map(function(question,i){
      var userAnswerRef = this.props.resource.answers[question.ref];
      var userAnswer = _.findWhere(question.answers,{ref:userAnswerRef});
      var answer;
      var params = {resourceKey,step:i}
      var question = <h4 className="question mt-0">{question.name}</h4>
      if(!userAnswer){
        answer = [
          question,
          <p>Pas encore répondu</p>,
          <Link className='btn btn-tertiary btn-pill btn-sm' to='resource-step' params={params}>Répondez</Link>
        ];
      } else {
        var linkTo = ()=>{this.transitionTo('resource-step',params)}
        answer = <Answer {...userAnswer} onAnswer={linkTo}>{question}<small>Votre réponse</small></Answer>
      }

      return <div className='col-xs-6 col-sm-4 col-md-4' key={`question-${i}`}>{answer}</div>
    },this);
    return questions
    // return _.chunkAll(questions,2).map(function(chunk){
    //   return <div className="row">{chunk}</div>
    // });
  },
  render() {
    return (
      <div className="container-fluid">
        <div className='row'>
          <div>{this.renderQuestions()}</div>
        </div>
      </div>
    );
  }

});

export default AnswerRecap;