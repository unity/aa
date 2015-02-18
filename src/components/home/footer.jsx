var React = require('react');

var Footer = React.createClass({

  render: function() {
    return (
      <div className="container-fluid pt-2 pb-2 mt-1">
        <div className="row footer">
          <div className="col-sm-10 col-sm-offset-1 text-center pt-1"><small>{this.props.actions.translate('footer_message')}</small></div>
        </div>
      </div>
    );
  }

});

module.exports = Footer;
