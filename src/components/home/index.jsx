import _                    from 'underscore';
import React               from 'react';

import LoginButtons from '../quiz/login-buttons';
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
      return <NavItemLink ref={'nav-link-'+quiz.key} to='quiz' params={{resourceKey:quiz.key}}>{quiz.name}</NavItemLink>
    });

    return <Nav bsClass='pills'>{navItems}</Nav>
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
            <p>Vous connaissez tellement bien l’Academy Of Motion Picture Arts and Science que vous savez déjà qui gagnera un Oscar cette année&nbsp;?<br/>Vous êtes le Brian De Palmarès des pronostics ?</p><h4>Prouvez-le&nbsp;!</h4>
            <p>Pronostiquez les résultats des César et des Oscars et montez sur le podium de l’Awards Academy.</p>
            <p>Vous pourrez même imprimer vos pronostics pour votre soirée César/Oscars entre amis.</p><h4>À vos marques… Prêts&nbsp;?... PRONOSTIQUEZ&nbsp;!</h4>
            <div className="pt-3">{actions}</div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Home;

