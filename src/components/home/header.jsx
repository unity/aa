var React = require('react');
import logo from '../../images/logo.png';

var Header = React.createClass({

  render: function() {
    return (
      <div className="container-fluid pt-1">
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <img src={logo} className='img-responsive'/>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Header;
