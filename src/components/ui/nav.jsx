import _                    from 'underscore';
import React                from 'react';
import Router               from 'react-router';
var {RouteHandler, Route, Link} = Router

import ReactBootstrap       from 'react-bootstrap';
var {Navbar, Nav} = ReactBootstrap;

import ReactRouterBootstrap from 'react-router-bootstrap';
var { NavItemLink, ButtonLink} = ReactRouterBootstrap;

var MainNav = React.createClass({
  getDefaultProps: function() {
    return {
      resources: {}
    };
  },
  render: function() {
    var quizzes = _.where(this.props.resources,{type:'quiz'});
    var navItems = _.map(quizzes,function(quiz){
      return <NavItemLink to='resource-step' ref={'nav-link-'+quiz.key} params={{resourceKey:quiz.key,step:0}}>{quiz.name}</NavItemLink>
    });
    return (
      <Navbar className='navbar-main navbar-inverse' staticTop={true} fluid={true} toggleNavKey={1}>
        <Nav key={1} className='collapse navbar-collapse'>
          <NavItemLink to="/">Home</NavItemLink>
          {navItems}
          <NavItemLink to="rules">Regles du jeu</NavItemLink>
        </Nav>
      </Navbar>
    );
  }

});

module.exports = MainNav;

