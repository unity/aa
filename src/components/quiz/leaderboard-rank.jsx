import React from 'react';

var Rank = React.createClass({

  render: function() {
    return (
      <div className="list-group-item">
        <div className="media">
          <div className="media-left">
            <a href="#">
              <img className="media-object" src={this.props.picture}/>
            </a>
          </div>
          <div className="media-body">
            <span className="badge badge-success pull-right">Score: {this.props.score}</span>
            <h4 className="media-heading">{this.props.name}</h4>
            classement: {this.props.rank} 
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Rank;
