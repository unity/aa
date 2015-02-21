import _                    from 'underscore';
import React                from 'react';
import Router               from 'react-router';
var {RouteHandler, Route, Link} = Router

var MainNav = React.createClass({
  getDefaultProps: function() {
    return {
      resources: {}
    };
  },
  render: function() {
    var quizzes = _.where(this.props.resources,{type:'quiz'});
    var navItems = _.map(quizzes,function(quiz){
      var step = (quiz.key==='quiz_1')?'leaderboard_step':0
      return <li><Link to='resource-step' key={'nav-link-'+quiz.key} params={{resourceKey:quiz.key,step:step}}>{quiz.name}</Link></li>
    });
    return (
      <div className="nav navbar-main navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="nav">
              <li><Link to="home">home</Link></li>
              {navItems}
              <li><Link to="rules">Regles du jeu</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <Navbar className='navbar-main navbar-inverse' fixedTop={true} fluid={true} toggleNavKey={1}>
        <Nav key={1} className='collapse navbar-collapse'>
        </Nav>
      </Navbar>
    );
  }

});

module.exports = MainNav;

