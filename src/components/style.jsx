import React      from 'react';
import Color      from 'color';
import MainStyles from '../styles/main.scss';

var Style = React.createClass({
  getDefaultProps() {
    return {
      selectedResource:{} 
    };
  },
  componentDidMount() {
    // This is more robust than embedding the styles in the Iframe's Head using the head="" property
    MainStyles.use(this.getDOMNode());
  },
  componentWillUnmount() {
    MainStyles.unuse();
  },
  getStyle: function(){
    var key = (this.props.selectedResource.key)?this.props.selectedResource.key:'quiz_1'
    var background_image = this.props[`${key}_background_image`];
    var style = `
      body {
        color: ${this.props.text_color};
        color: ${Color(this.props.text_color).clearer(.4).hslString()};
        background-color: ${this.props.background_color};
      }
      h1, h2, h3, h4, h5, h6 {
        color: ${Color(this.props.text_color).clearer(.4).hslString()};
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
        background:${Color(this.props.navbar_background_color).clearer(1-this.props.navbar_opacity).hslString()};
        color: ${this.props.navbar_text_color};
      }

      .navbar-default .navbar-nav>li>a{
        color: ${Color(this.props.navbar_text_color).clearer(.5).hslString()};
      }

      #ship {
        background: linear-gradient(to bottom, ${Color(this.props.background_color).clearer(.4).hslString()} 60%, ${this.props.background_color} 100%);
      }

      #ship::after {
        background-image: url(${background_image});
        opacity: ${this.props.background_image_opacity};
        filter: blur(${this.props.background_image_blur}px);
        -webkit-filter: blur(${this.props.background_image_blur}px);
      }

      .answer {
        border-radius: 3px;
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
      .btn.btn-brand {
        color: ${this.props.button_text_color};
        background-color: ${this.props.button_background_color}
      }

      .btn.btn-brand:hover, .btn.btn-brand:focus {
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
      .pager li>a{
        color: ${Color(this.props.text_color).clearer(.7).hslString()};
      }
    `
    // Can't find a way to unescape the quotes with template literals;
    return style
  },
  render: function() {
    return (
      <div>
        <link rel="stylesheet" href="https://neuestrap.s3.amazonaws.com/releases/neue/b18eaf457f93592526b33ca0f966668a91628036/stylesheets/neue.css"/>
        <style  media="screen" type="text/css">{this.getStyle()}</style>
      </div>
    );
  }

});

module.exports = Style;

