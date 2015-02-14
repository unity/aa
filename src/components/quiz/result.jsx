var React = require('react');
var Form = require('./form');

var Result = React.createClass({
  handleReset: function(e){
    this.props.actions.reset();
  },
  render: function() {
    var subtitle = this.props.actions.translate('result_subtitle',{
      score: this.props.resource.badge.score||"0",
      attempts: this.props.resource.badge.stats.attempts,
      seconds: (this.props.resource.badge.data.timing/1000).toFixed()
    });
    return (
      <div className="row">
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
