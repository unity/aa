import _ from 'underscore';
import React from 'react';
import ImageLoader from 'react-imageloader';
import Spinner from './spinner';


var Loading = React.createClass({

  render() {
    return (
      <span>Loading image</span>
    );
  }

});

var ResizedImage = React.createClass({
  getDefaultProps() {
    return {
      width:300,
      height:200
    };
  },
  getResizedUrl(){
    if(!this.props.src){return;}
    return `http://proxy.boxresizer.com/convert?resize=${this.props.width}x${this.props.height}&source=${encodeURIComponent(this.props.src)}`
  },
  render() {
    var props = _.omit(this.props,'width','height')
    return (
      <img  {...props} preloader={Loading} src={this.getResizedUrl(this.props.src)}/>
    );
  }

});
      // <ImageLoader  {...this.props} preloader={Loading} src={this.getResizedUrl(this.props.src)}> Failed.</ImageLoader>

module.exports = ResizedImage;
