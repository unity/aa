import _ from 'underscore-contrib';
import React from 'react';
import Form from './form';
import Engine from '../../lib/engine';

var Result = React.createClass({
  handleReset: function(e){
    this.props.actions.reset();
  },
  renderProgress(){
    return <Progress {...this.props.resource} current={Engine.Constants.INTRODUCTION_STEP} total={this.props.resource.questions.length} actions={this.props.actions}/>
  },
  render: function() {
    var badge = _.getPath(this.props,'resource.badge');
    if(!badge){
      return <div></div>
    }

    var subtitle = this.props.actions.translate('result_subtitle',{
      score: this.props.resource.badge.score||"0",
      attempts: this.props.resource.badge.stats.attempts,
      seconds: (this.props.resource.badge.data.timing/1000).toFixed()
    });
    return (
      <div className="row">
        {this.renderProgress()}
        <div className="col-sm-6">
          <h1>{this.props.actions.translate('result_title')}</h1>
          <p className='pb-4 pt-4 mt-2 mb-1'>{subtitle}</p>
          <a onClick={this.handleReset} className='mt-1 btn btn-success btn-pill'>{this.props.actions.translate('replay')}</a>
        </div>
        <div className="col-sm-6">
          <h1>{this.props.actions.translate('complete_your_profile')}</h1>
          <Form form={this.props.ship.resources['profile-form']} actions={this.props.actions}/>
        </div>
      </div>
    );
  }
// <form name="shipForm" sf-schema="state.form.fields_schema" sf-form="form" sf-model="formData" ng-submit="submitForm(shipForm)"></form>
});

module.exports = Result;
