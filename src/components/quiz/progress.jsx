import _ from 'underscore';
import React from 'react';
var cx = require('react/lib/cx');

import Engine from '../../lib/engine';

import Router from 'react-router';
var {RouteHandler, Route, Link} = Router

const Progress = React.createClass({
  mixins: [Router.State, Router.Navigation],
  renderPageLinks(){
    var {resourceKey, step} = this.getParams();
    return _.times(this.props.total,(i)=>{
      var active = (this.props.current===(i+1))
      return <li key={`quiz-${resourceKey}-step-${i}`} className={cx({'active':active})}>
        <Link to='resource-step' params={{ resourceKey, step:i}}><small>{i+1}</small></Link>
      </li>  
    });
  },
  renderPager(){
    var {resourceKey, step} = this.getParams();
    var next = this.props.actions.getNextStep(resourceKey,step);
    var prev = this.props.actions.getPrevStep(resourceKey,step);

    return <ul className="pager hidden-print">
      <li className='previous'><Link to='resource-step' params={{ resourceKey, step:Engine.Constants.INTRODUCTION_STEP }}>{this.props.actions.translate('intro_step')}</Link></li>
      <li className='next'><Link to='resource-step' params={{ resourceKey, step:Engine.Constants.RESULT_STEP }}>{this.props.actions.translate('result_step')}</Link></li>
      {this.renderPageLinks()}
    </ul>
  },
  render() {
    return this.renderPager();
  }

});

export default Progress;
