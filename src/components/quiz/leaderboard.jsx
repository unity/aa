import React       from 'react';
import Rank        from './leaderboard-rank';
import AnswerRecap from './answer-recap';

var Leaderboard = React.createClass({
  getDefaultProps: function() {
    return {
      leaderboard:[]
    };
  },
  renderRanks: function(leaderboard, title){
    if(leaderboard){
      var ld = leaderboard.map(function(l){
        return <Rank key={'rank-'+l.member.id} {...l.member} rank={l.rank} score={l.score}/>
      })
      return [<h5 className='mt-0 mb-1'>{title}</h5>, ld ]
    }
  },
  render: function() {
    var ld, lda, ldf;
    if(this.props.resource && this.props.resource.leaderboard){
      ld = this.renderRanks(this.props.resource.leaderboard, 'Classement Global');
    }
    if(this.props.resource && this.props.resource.leaderboard_around_me){
      lda = this.renderRanks(this.props.resource.leaderboard_around_me, 'Classement autour de moi');
    }
    return (
      <div className='row mt-2'>
        <div className="col-sm-5">
          <h3 className='mt-0'>Les Prix</h3>
          <AnswerRecap {...this.props} showResults={true}/>
        </div>
        <div className="col-sm-4">
          <div className="list-group">{ld}</div>
        </div>
        <div className="col-sm-3">
          <div className="list-group">{lda}</div>
        </div>
      </div>      
    );
  }

});

module.exports = Leaderboard;
