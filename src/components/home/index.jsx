import _                    from 'underscore';
import React                from 'react';

import LoginButtons         from '../quiz/login-buttons';
import Router               from 'react-router';
var {RouteHandler, Route, Link} = Router

import ReactBootstrap       from 'react-bootstrap';
var {Navbar, Nav} = ReactBootstrap;

import ReactRouterBootstrap from 'react-router-bootstrap';
var { NavItemLink, ButtonLink} = ReactRouterBootstrap;

var Home = React.createClass({
  getDefaultProps: function() {
    return {
      resources: {}
    };
  },
  handleLogin: function(service){
    this.props.actions.play(this.props.resource.id, service);
  },
  renderPlayButtons: function(){
    var quizzes = _.where(this.props.resources,{type:'quiz'});
    var navItems = _.map(quizzes,function(quiz){
      return <Link className='btn btn-tertiary btn-pill' ref={'nav-link-'+quiz.key} to='resource-step' params={{resourceKey:quiz.key,step:0}}>{quiz.name}</Link>
    });

    return <div>{navItems}</div>
  },
  render: function() {
    var actions;
    actions = (this.props.user)?this.renderPlayButtons():<LoginButtons
                isLoggingIn={this.props.isLoggingIn}
                user={this.props.user}
                actions={this.props.actions}
                providers={this.props.providers}
                onLogin={this.handleLogin}/>

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 pt-1">
            <h4 className='light'>Personne mieux que vous ne saurait pronostiquer les résultats des César&nbsp;?</h4>
            <p>Vous connaissez tellement bien l’Academy Of Motion Picture Arts and Science que vous savez déjà qui gagnera un Oscar cette année&nbsp;?<br/>Vous êtes le Brian De Palmarès des pronostics ?</p>
            <strong>Prouvez-le&nbsp;!</strong>
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

