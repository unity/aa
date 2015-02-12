var React = require('react');

var Countdown = React.createClass({

  getDefaultProps: function() {
    return {
      width: '100%'
    };
  },
  render: function() {
    return (
      <div className="progress round">
        <span className="meter" style={{width:this.props.width}}></span>
      </div>
    );
  }

});

module.exports = Countdown;
