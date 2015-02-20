import React        from 'react';
import ResizedImage from '../ui/resized-image';

var Answer = React.createClass({
  handleAnswer: function(){
    if(!this.props.showResults){
      this.props.onAnswer({questionRef:this.props.question_ref, answerRef:this.props._ref, });
    }
  },
  getDefaultProps: function() {
    return {
      printStyle:{}
    };
  },
  renderTitle: function(title, subtitle){
    return <h5 style={this.props.printStyle} className="m-0 answer-name">
      {title} <br/> <small>{subtitle}&nbsp;</small>
    </h5>
  },
  renderBreakdown: function(){
    if(!this.props.question){return ;}
    var votes = _.reduce(this.props.answers,function(memo,v,i){
      memo += v.stats.users
    },0);
    return this.props.question.answers.map((a)=>{
      var v = parseInt((a.stats.users/votes)*100);
      return <div className="col-flex">
        <ResizedImage height={100} src={a.picture} alt="" className="img-responsive" style={{margin:'0 auto'}}/>
        {votes}
      </div>
    });
  },
  render: function() {
    var useranswer = <div>
      {this.props.children}
      <ResizedImage height={this.props.showResults?150:200} src={this.props.picture} alt="" className="img-responsive" style={{margin:'0 auto'}}/>
      {this.renderTitle(this.props.name, this.props.description)}
    </div>

    if(this.props.showResults && this.props.question && this.props.question.picture){
      var winner = <div>
        <small><small>Gagnant</small></small>
        <ResizedImage height={this.props.showResults?150:200} src={this.props.question.picture} alt="" className="img-responsive" style={{margin:'0 auto'}}/>
        {this.renderTitle(this.props.question.description)}
      </div>
      var content = <div className="row">
        <div className="col-xs-6">{useranswer}</div>
        <div className="col-xs-6">{winner}</div>
      </div>
    } else {
      var content = useranswer; 
    }

    return (
      <div>
        {this.props.title}
        <a onClick={this.handleAnswer} className="answer mb-1">{content}</a>
      </div>
    );
  }
});


module.exports = Answer;
