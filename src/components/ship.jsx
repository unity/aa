import _         from 'underscore';
import React     from 'react';
import Router    from 'react-router'
var {RouteHandler} = Router

import Frame     from './ui/frame';
import Quiz      from './quiz/index';
import MainNav   from './ui/nav';
import Header    from './home/header';
import Footer    from './home/footer';
import Style     from './style';


var Ship = React.createClass({

  propTypes: {
    engine: React.PropTypes.object.isRequired,
    sandbox: React.PropTypes.bool,
  },

  getInitialState: function() {
    return this.props.engine.getState();
  },

  componentWillMount: function() {
    this.props.engine.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    // This is more robust than embedding the styles in the Iframe's Head using the head="" property
    this.props.styles.use(this.getStyleContainer());
  },
  componentWillUnmount: function() {
    this.props.styles.unuse();
    this.props.engine.removeChangeListener(this._onChange);
  },

  getStyleContainer: function(){
    if(this.refs && this.refs.frame){
      return this.refs.frame.getDOMNode().contentDocument.head
    }
    return document.getElementsByTagName('head')[0];
  },
  _onChange: function() {
    this.setState(this.props.engine.getState());
  },

  render: function() {
    return <div>
      <Style {...this.state.ship.settings}/>
      <MainNav      {...this.state} actions={this.props.engine.getActions()}/>
      <Header       {...this.state} />
      <RouteHandler {...this.state} actions={this.props.engine.getActions()}/>
      <Footer       {...this.state} actions={this.props.engine.getActions()}/>
    </div>
  }
});


module.exports = Ship;
