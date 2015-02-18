import _ from 'underscore';
import React from 'react';
import ImageLoader from 'react-imageloader';
import Spinner from './spinner';


var Loading = React.createClass({
  render() {
    return (
      <div className='timer'>Loading...</div>
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
    // return `http://proxy.boxresizer.com/convert?resize=${this.props.width}x${this.props.height}&source=${encodeURIComponent(this.props.src)}`
    return `https://i.embed.ly/1/display/resize?key=31087f34cc164ef7b88edc41bc1ecd0f&url=${encodeURIComponent(this.props.src)}&width=${this.props.width}&height=${this.props.height}&grow=true`
  },
  render() {
    var props = _.omit(this.props,'width','height')
    return (
      <ImageLoader preloader={Loading} {...props} src={this.getResizedUrl(this.props.src)}> Failed.</ImageLoader>
      // <img  {...props} preloader={Loading} src={this.getResizedUrl(this.props.src)}/>
    );
  }

});

module.exports = ResizedImage;
