import React from 'react';
import _ from 'underscore';
import t from 'tcomb-form';
import TextBox from './fields/text-box';

var Form = t.form.Form;

// Example Subtype: Postive Num subtype
// var Positive = t.subtype(t.Num, function (n) {return n >= 0;});

// Our own email subtype
var Email = t.subtype(t.Str, function (e) {return /.+@.+\...+/.test(e);});

var TypeMapper = {
  // Types
  string:t.Str,
  number:t.Num,
  boolean:t.Bool,

  // Subtypes
  text:t.Str,
  date:t.Num,
  email:Email,
}

var RegisterForm = React.createClass({

  onClick: function(){
    var value = this.refs.form.getValue();
    // getValue returns null if validation failed
    if (value) {console.log(value);}
  },
  render: function() {
    var form = {}, fields = {};

    this.props.form.fields_list.map(function(field){

      // Field Labels
      fields[field.name] = {placeholder:field.title, type:field.field_type}

      // Optional/Required fields
      var type = TypeMapper[field.type];
      var minLength    = (field.minLength) ? t.subtype(type,function(v){return v.length>field.minLength}):type;
      var maxLength    = (field.maxLength) ? t.subtype(minLength,function(v){return v.length>field.maxLength}):minLength;
      var required     = (field.required)? type : t.maybe(type);
      form[field.name] = required;
    },this);

    var Profile = t.struct(form); 

    var options = {
      auto:'placeholders',
      fields:fields,
      templates:{
        textbox: TextBox
      }
    }

    return <div className='form-pane'>
      <Form ref='form' options={options} type={Profile} />
      <button className='button' onClick={this.onClick}>{this.props.actions.translate('save_profile_button')}</button>
    </div>;
  }

});

module.exports = RegisterForm;
