import React from 'react';

var Spinner = React.createClass({

  render() {
    return (
      <div className='spinner'>
        <div className="circle"><div className="inner"></div></div>
        <div className="circle"><div className="inner"></div></div>
        <div className="circle"><div className="inner"></div></div>
        <div className="circle"><div className="inner"></div></div>
        <div className="circle"><div className="inner"></div></div>
      </div>
    );
  }

});

export default Spinner;
