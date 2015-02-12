import _         from 'underscore';
import React     from 'react';

import Engine    from '../lib/engine';
import styles    from '../styles/main.scss';
import pikadaystyle from 'pikaday/css/pikaday.css';

import Frame     from './frame';
import Quiz    from './quiz';

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
    pikadaystyle.use(this.getStyleContainer());
  },
  componentWillUnmount: function() {
    this.props.styles.unuse();
    pikadaystyle.unuse();
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

  renderContent: function() {
    return <Quiz  {...this.state} isLoading={this.state.isLoading} settings={this.state.ship.settings} actions={this.props.engine.getActions()}/>
  },

  render: function() {
    // if (this.props.sandbox) {
    //   return <Frame ref='frame'>{this.renderContent()}</Frame>;
    // }

    return this.renderContent();
  },

  statics:{
    // Expose a static entry point to boot the ship
    start : function(element, deployment){
      var engine = new Engine(deployment);
      React.render(<Ship engine={engine} sandbox={true} styles={styles} />, element);
    }
  }
});


module.exports = Ship;
