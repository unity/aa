var cx = require('react/lib/cx');
var React = require('react');
var Pikaday = require('../pikaday');

module.exports = function (locals){
  var formGroupClasses = {
    'form-group': true,
    'has-feedback': true, // required for the icon
    'has-error': locals.hasError
  }
  var input;  
  if(locals.type==='date'){
    input = 
      <Pikaday
        disabled={locals.disabled}
        className="form-control"
        name={locals.name}
        placeholder={locals.placeholder}
        onChange={function (evt) {locals.onChange(evt.target.value);}}
        type={locals.type}
        value={locals.value} />
  }  else {
    input = <input
      className="form-control"
      name={locals.name}
      placeholder={locals.placeholder}
      onChange={function (evt) {locals.onChange(evt.target.value);}}
      type={locals.type}
      value={locals.value} />
  }
  return (
    <div className={cx(formGroupClasses)}>
      {input}
      {locals.label ? <label className="control-label">{locals.label}</label> : null}
      {locals.error ? <span className="help-block error-block">{locals.error}</span> : null}
      {locals.help ? <span className="help-block">{locals.help}</span> : null}
    </div>
  );
};
