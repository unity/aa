var React = require('react');
// import logo from '../../images/logo.png';

var Header = React.createClass({

  render: function() {
    var logo = this.props.settings.logo_image;
    return (
      <div className="container-fluid pt-2 header">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4 text-center">
            <img src={logo} style={{margin:"0 auto"}} className='logo img-responsive'/>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Header;
