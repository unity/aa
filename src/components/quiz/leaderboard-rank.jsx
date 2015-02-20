import React from 'react';

var Rank = React.createClass({

  render: function() {
    return (
      <div className="mb-1 text-left">
        <div className="media">
          <div className="media-left">
            <a href="#">
              <img className="media-object img-circle" src={this.props.picture}/>
            </a>
          </div>
          <div className="media-body">
            <h6 className="media-heading mt-0 pt-05 mb-05 bold">{this.props.name}</h6>
            <small className='mt-025'>
              <span className="mt-05 label label-default" style={{marginRight:5}}>#{this.props.rank}</span>
              <span className="mt-05 label label-success">{this.props.score} points</span>
            </small>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Rank;
