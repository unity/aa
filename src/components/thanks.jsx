var React = require('react');
var translate = require('../lib/translate');

var Thanks = React.createClass({
  render: function() {
    return (
      <div>
        <h1 className="step-name">{translate('thanks_title')}</h1>
        <p className="step-description">{translate('thanks_subtitle')}</p>
      </div>
    );
  }
});

module.exports = Thanks;
