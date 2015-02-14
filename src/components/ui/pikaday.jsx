/** @jsx React.DOM */

var React = require('react');
var Pikaday = require('pikaday');
var style = require('pikaday/css/pikaday.css');

var ReactPikaday = React.createClass({

  propTypes: {
    value: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func,

    valueLink: React.PropTypes.shape({
      value: React.PropTypes.instanceOf(Date),
      requestChange: React.PropTypes.func.isRequired
    })
  },

  componentWillUnmount: function() {
    style.unuse();
  },

  getValueLink: function(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange
    };
  },

  setDateIfChanged: function(newDate, prevDate) {
    var newTime = newDate ? newDate.getTime() : null;
    var prevTime = prevDate ? prevDate.getTime() : null;

    if ( newTime !== prevTime ) {
      if ( newDate === null ) {
        // Workaround for pikaday not clearing value when date set to falsey
        this.refs.pikaday.getDOMNode().value = '';
      }
      this._picker.setDate(newDate, true);  // 2nd param = don't call onSelect
    }
  },

  componentDidMount: function() {
    var el = this.refs.pikaday.getDOMNode();
    style.use(el.parentNode);
    this._picker = new Pikaday({
      field: el,
      onSelect: this.getValueLink(this.props).requestChange
    });

    this.setDateIfChanged(this.getValueLink(this.props).value);
  },

  componentWillReceiveProps: function(nextProps) {
    var newDate = this.getValueLink(nextProps).value;
    var lastDate = this.getValueLink(this.props).value;
    this.setDateIfChanged(newDate, lastDate);
  },

  render: function() {
    return (
      <input type={this.props.type} ref="pikaday" className={this.props.className} placeholder={this.props.placeholder} />
    );
  }
});

module.exports = ReactPikaday;
