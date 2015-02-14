import React from 'react';
import Rank from './leaderboard-rank';

var Leaderboard = React.createClass({
  getDefaultProps: function() {
    return {
      leaderboard:[]
    };
  },
  renderRanks: function(){
    return this.props.leaderboard.map(function(l){
      return <Rank key={'rank-'+l.member.id} {...l.member} rank={l.rank} score={l.score}/>
    })
  },
  render: function() {
    return (
      <div>
        <h3>Classement</h3>
        <div className="list-group">
          {this.renderRanks()}
        </div>
      </div>      
    );
  }

});

module.exports = Leaderboard;
