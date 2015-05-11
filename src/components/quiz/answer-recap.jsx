import cx                   from 'react/lib/cx';
import React                from 'react';
import Router               from 'react-router';
var {RouteHandler, Route, Link} = Router
import Answer               from './answer';
import _                    from 'underscore-contrib';

const AnswerRecap = React.createClass({
  mixins: [Router.State, Router.Navigation],
  renderQuestions(print){
    var style = {}
    if(print){style.fontSize = 8;}
    var {resourceKey, step}=this.getParams();
    var {resourceKey, step}=this.getParams();
    if(this.props.resource && this.props.resource.questions){
      var questions = this.props.resource.questions.map(function(question,i){
        var userAnswerRef = this.props.resource.answers[question.ref];
        var userAnswer = _.findWhere(question.answers,{ref:userAnswerRef});
        var answer;
        var params = {resourceKey,step:i}
        var title = <h6 style={style} className="question mt-0 mb-0"><strong>{question.name}</strong></h6>
        if(!userAnswer){
          answer = [
            title,
            <p>Pas encore répondu</p>,
            <Link className='btn btn-tertiary btn-pill btn-sm' to='resource-step' params={params}>Répondez</Link>
          ];
        } else {
          var linkTo = ()=>{this.transitionTo('resource-step',params)}
          answer = <Answer
            question   = {question}
            title = {title}
            showResults={this.props.showResults}
            printStyle ={style}
            {...userAnswer}
            onAnswer={linkTo}><small className='hidden-print'><small>Votre réponse</small></small></Answer>
        }
        return <div className={cx({
          'mb-1':true,
          [`col-xs-${(this.props.showResults)?12:4}`]: !print,
          'col-xs-2': !!print
        })} key={`question-${i}`}>{answer}</div>
      },this);
    } else {
      questions = []
    }
    return questions.map(function(chunk){
      return <div className="row">{chunk}</div>
    });
    // return _.chunkAll(questions,(print)?6:3).map(function(chunk){
    //   return <div className="row">{chunk}</div>
    // });
  },
  render() {
    return (
      <div className="container-fluid">
        <div className='row'>
          <div className='visible-print-block'>{this.renderQuestions(true)}</div>
          <div className='hidden-print'>{this.renderQuestions()}</div>
        </div>
      </div>
    );
  }

});

export default AnswerRecap;
