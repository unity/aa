import Router from 'react-router'
var {RouteHandler, Route, Link} = Router

import ReactBootstrap from 'react-bootstrap'
var {Navbar, Nav} = ReactBootstrap;

import ReactRouterBootstrap from 'react-router-bootstrap'
var { NavItemLink, ButtonLink} = ReactRouterBootstrap;

var React = require('react');

var MainNav = React.createClass({
  render: function() {
    return (
      <Navbar staticTop={true} fluid={true} toggleNavKey={1}>
        <Nav key={1} className='collapse navbar-collapse'>
          <NavItemLink to="/">Home</NavItemLink>
          <NavItemLink to="cesar">Cesar</NavItemLink>
          <NavItemLink to="oscar">Oscar</NavItemLink>
        </Nav>
      </Navbar>
    );
  }

});

module.exports = MainNav;

