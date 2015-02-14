import React     from 'react';
import Color     from 'color';

var Style = React.createClass({
  getStyle: function(){
    var style = `
      body {
        color: ${this.props.text_color};
        color: ${Color(this.props.text_color).clearer(.4).hslString()};
        background-color: ${this.props.background_color};
      }
      h1, h2, h3, h4, h5, h6 {
        color: ${this.props.text_color};
      }

      a{
        color: ${this.props.text_color};
        color: ${Color(this.props.text_color).clearer(.4).hslString()};
      }

      a:hover, a:active {
        color: ${this.props.text_color};
      }

      .navbar-main{
        background-color: ${Color(this.props.navbar_color).clearer(1-this.props.navbar_opacity).hslString()};
      }
      .navbar-main .navbar-nav>li>a{
        color: ${this.props.navbar_text_color};
      }

      .ship {
        background: linear-gradient(to bottom, ${Color(this.props.background_color).clearer(.4).hslString()} 60%, ${this.props.background_color} 100%);
      }

      .ship::after {
        background: url(${this.props.background_image});
        opacity: ${this.props.background_image_opacity};
        filter: blur(${this.props.background_image_blur}px);
        -webkit-filter: blur(${this.props.background_image_blur}px);
      }

      .answer {
        background-color: ${Color(this.props.text_color).clearer(.95).hslString()};
        border: 1px solid ${Color(this.props.text_color).clearer(.9).hslString()};
      }

      .answer:hover, .answer:focus {
        background-color: ${Color(this.props.text_color).clearer(.9).hslString()};
        border-color ${Color(this.props.text_color).clearer(.8).hslString()};
        box-shadow: 0 0 10px ${Color(this.props.text_color).clearer(.8).hslString()};
      }

      .progress .meter {
        background-color: ${this.props.button_background_color}
      }

      .btn {
        color: ${this.props.button_text_color};
        background-color: ${this.props.button_background_color}
      }

      .btn:hover, .btn:focus {
        background-color: ${Color(this.props.button_background_color).clearer(.9).hslString()}
      }

      .footer {
        border-top: 1px solid ${Color(this.props.text_color).clearer(.9).hslString()};
      }

      .loader {
        background-color: ${Color(this.props.background_color).clearer(.4).hslString()};
      }
      .result-form.form-light input.form-control{
        border:none;
        color: ${this.props.text_color};
        box-shadow:none;
        background-color: ${Color(this.props.background_color).clearer(.4).hslString()};
      }
    `
    // Can't find a way to unescape the quotes with template literals;
    return style
  },
  render: function() {
    return (
      <style>{this.getStyle()}</style>
    );
  }

});

module.exports = Style;

