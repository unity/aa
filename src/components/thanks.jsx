var React = require('react');
var translate = require('../lib/translate');

var Thanks = React.createClass({
  render: function() {
    return (
      <div>
        <h1 className="step-name">{this.props.actions.translate('thanks_title')}</h1>
        <p className="step-description">{this.props.actions.translate('thanks_subtitle')}</p>
      </div>
    );
  }
});

module.exports = Thanks;
