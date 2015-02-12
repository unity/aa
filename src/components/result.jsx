var React = require('react');

var Result = React.createClass({
  handleReset: function(e){
    this.props.actions.reset();
  },
  render: function() {
    return (
      <div>
        <h1 className="step-name">{this.props.actions.translate('result_title')}</h1>
          <div className="step-description">
            <p>{this.props.actions.translate('result_subtitle')}</p>
            <p><a href="#" onClick={this.handleReset} >{this.props.actions.translate('replay')}</a>{this.props.actions.translate('or_complete_your_profile')}</p>
          </div>

      </div>
    );
  }
// <form name="shipForm" sf-schema="state.form.fields_schema" sf-form="form" sf-model="formData" ng-submit="submitForm(shipForm)"></form>
});

module.exports = Result;
