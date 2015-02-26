import _         from 'underscore';
import React     from 'react';
import Router    from 'react-router'
var {RouteHandler} = Router

import Frame     from './ui/frame';
import Quiz      from './quiz/index';
import Header    from './home/header';
import Footer    from './home/footer';
import Style     from './style';

var Root = React.createClass({
  mixins: [Router.State, Router.Navigation],
  propTypes: {
    engine: React.PropTypes.object.isRequired,
    sandbox: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      sandbox:false
    };
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
  componentWillUnmount() {
    this.props.engine.removeChangeListener(this._onChange);
  },
  _onChange(event) {
    this.setState(this.props.engine.getState());
  },
  renderContent(){
    return <div className='ship'>
      <Style {...this.state.ship.settings} selectedResource={this.state.selectedResource}/>
      <Header       {...this.state} />
      <RouteHandler {...this.state} actions={this.props.engine.getActions()}/>
      <Footer       {...this.state} actions={this.props.engine.getActions()}/>
    </div>
  },
  render() {
    if(this.props.sandbox){
      return <Frame>{this.renderContent()}</Frame>
    } else {
      return this.renderContent()
    }
  }
});


module.exports = Root;
