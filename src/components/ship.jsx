import _         from 'underscore';
import React     from 'react';
import Router    from 'react-router'
var {RouteHandler} = Router

import Frame     from './ui/frame';
import Quiz      from './quiz/index';
import Header    from './home/header';
import Footer    from './home/footer';
import Style     from './style';

var ReactUpdates = require("react/lib/ReactUpdates");

var rafBatchingStrategy = {
  isBatchingUpdates: true,
  batchedUpdates(callback, param) {
    callback(param);
  }
};
var tick = function() {
  ReactUpdates.flushBatchedUpdates();
  requestAnimationFrame(tick);
};
requestAnimationFrame(tick);
ReactUpdates.injection.injectBatchingStrategy(rafBatchingStrategy);


var Ship = React.createClass({
  mixins: [Router.State, Router.Navigation],
  propTypes: {
    engine: React.PropTypes.object.isRequired,
    sandbox: React.PropTypes.bool,
  },

  getInitialState() {
    return this.props.engine.getState();
  },
  componentWillMount() {
    this.props.engine.addChangeListener(this._onChange);
  },
  componentWillUpdate(nextProps, nextState) {
    if(!this.state.user && !this.isActive('home')){
      this.transitionTo('home');
    }
  },
  componentDidMount() {
    // This is more robust than embedding the styles in the Iframe's Head using the head="" property
    this.props.styles.use(this.getStyleContainer());
  },
  componentWillUnmount() {
    this.props.styles.unuse();
    this.props.engine.removeChangeListener(this._onChange);
  },

  getStyleContainer(){
    if(this.refs && this.refs.frame){
      return this.refs.frame.getDOMNode().contentDocument.head
    }
    return document.getElementsByTagName('head')[0];
  },
  _onChange(event) {
    this.setState(this.props.engine.getState());
  },

  render() {
    return <div>
      <Style {...this.state.ship.settings} selectedResource={this.state.selectedResource}/>
      <Header       {...this.state} />
      <RouteHandler {...this.state} actions={this.props.engine.getActions()}/>
      <Footer       {...this.state} actions={this.props.engine.getActions()}/>
    </div>
  }
});


module.exports = Ship;
