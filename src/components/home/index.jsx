import _                    from 'underscore';
import React                from 'react';

import ResizedImage         from '../ui/resized-image';
import LoginButtons         from '../quiz/login-buttons';
import Router               from 'react-router';
var {RouteHandler, Route, Link} = Router;

import Engine               from '../../lib/engine';

var Home = React.createClass({
  getDefaultProps: function() {
    return {
      resources: {}
    };
  },
  handlePlay: function(service){
   this.props.actions.login(service.name);
  },
  renderPlayButtons: function(){
    var quizzes = _.where(this.props.resources,{type:'quiz'});
    var navItems = _.map(quizzes,function(quiz){
      var image = <ResizedImage src={quiz.picture} className="logo img-responsive" style={{margin:'0 auto'}} width={600}/>
      // if(!quiz.isFinished){
      var link = <Link style={{marginRight: 5}} key={'nav-link-'+quiz.key} to='resource-step' params={{resourceKey:quiz.key,step:0}}>{image}</Link>
      // } else {
      // var link = <Link style={{marginRight: 5}} key={'nav-link-'+quiz.key} to='resource-results'params={{resourceKey:quiz.key,step:Engine.Constants.RESULT_STEP}} >{image}</Link>
      // }
      return <div className='col-xs-6'>{link}</div>
    });

    return <div className='row'>{navItems}</div>
  },
  render: function() {
    var actions;
    actions = (this.props.user)?this.renderPlayButtons():<LoginButtons
                isLoggingIn={this.props.isLoggingIn}
                user={this.props.user}
                actions={this.props.actions}
                providers={this.props.providers}
                onPlay={this.handlePlay}/>

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 pt-1">
            <h4 className='light'>Personne mieux que vous ne saurait pronostiquer les résultats des César&nbsp;?</h4>
            <h2 className='mb-2 mt-0'>Prouvez-le !</h2>
            <p>Pronostiquez les résultats des César et des Oscars et montez sur le podium de l’Awards Academy.</p>
            <p>Vous pourrez même imprimer vos pronostics pour votre soirée César/Oscars entre amis.</p>
            <div className="pt-2">{actions}</div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Home;

