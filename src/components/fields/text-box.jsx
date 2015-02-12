var cx = require('react/lib/cx');
var React = require('react');
var Pikaday = require('../ui/pikaday');

module.exports = function (locals){
  debugger
  var formGroupClasses = {
    'form-group': true,
    'has-feedback': true, // required for the icon
    'has-error': locals.hasError
  }

  return (
    <div className={cx(formGroupClasses)}>
      {locals.label ? <label className="control-label">{locals.label}</label> : null}
      <Pikaday
        disabled={locals.disabled}
        className="form-control"
        name={locals.name}
        placeholder={locals.placeholder}
        onChange={function (evt) {locals.onChange(evt.target.value);}}
        type={locals.type}
        value={locals.value} />

      <span className="glyphicon glyphicon-search form-control-feedback"></span>
      {locals.error ? <span className="help-block error-block">{locals.error}</span> : null}
      {locals.help ? <span className="help-block">{locals.help}</span> : null}
    </div>
  );
};
