var React = require('react');
import Leaderboard from './leaderboard';

var Results = React.createClass({
  getDefaultProps: function() {
    return {
      leaderboards:{}
    };
  },
  render: function() {
    var subtitle = this.props.actions.translate('result_subtitle',{
      score: this.props.badge.score||"0",
      attempts: this.props.badge.stats.attempts,
      seconds: (this.props.badge.data.timing/1000).toFixed()
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h3 className="condensed">{this.props.actions.translate('result_title')}</h3>
            <div className="step-description">
              <p>{subtitle}</p>
              <a href="#" onClick={this.handleReset} className='btn btn-primary'>{this.props.actions.translate('replay')}</a>
              <p>{this.props.actions.translate('or_complete_your_profile')}</p>
            </div>
          </div>
          <div className="col-sm-6">
            <Leaderboard leaderboard={this.props.leaderboards[this.props.quiz.id]}/>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Results;
