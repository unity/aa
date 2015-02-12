var React = require('react');
var Form = require('./form');

var Result = React.createClass({
  handleReset: function(e){
    this.props.actions.reset();
  },
  render: function() {
    var subtitle = this.props.actions.translate('result_subtitle',{
      score: this.props.badge.score||"0",
      attempts: this.props.badge.stats.attempts,
      seconds: (this.props.badge.data.timing/1000).toFixed()
    });
    return (
      <div>
        <h1 className="step-name">{this.props.actions.translate('result_title')}</h1>
        <div className="step-description">
          <p>{subtitle}</p>
          <a href="#" onClick={this.handleReset} className='button'>{this.props.actions.translate('replay')}</a>
          <p>{this.props.actions.translate('or_complete_your_profile')}</p>
        </div>
        <Form {...this.props} />
      </div>
    );
  }
// <form name="shipForm" sf-schema="state.form.fields_schema" sf-form="form" sf-model="formData" ng-submit="submitForm(shipForm)"></form>
});

module.exports = Result;
