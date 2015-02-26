import React        from 'react';
// import logo      from '../../images/logo.png';
import ResizedImage from '../ui/resized-image';
import cx           from 'react/lib/cx';
import Router       from 'react-router';
var {RouteHandler, Route, Link} = Router

var Header = React.createClass({

  render: function() {
    var logo = this.props.settings.logo_image;
    var res = this.props.selectedResource;
    var q1 = this.props.resources.quiz_1;
    var q2 = this.props.resources.quiz_2;
    return (
      <div className="container-fluid pt-3 header hidden-print">
        <div className="row">
          <div className="col-xs-2 col-xs-offset-1 text-center">
            <Link to='resource-step' params={{resourceKey:'quiz_1',step:'leaderboard_step'}}>
              <ResizedImage width={100} className={cx({'resource-link img-responsive':true, 'active':(res==q1)})} src={q1.picture} style={{margin:"0 auto", maxHeight:70}}/>
            </Link>
          </div>
          <div className="col-xs-4 col-xs-offset-1 text-center">
            <Link to='home'>
              <ResizedImage width={400} className={cx({'resource-link img-responsive logo':true, 'active':(!res)})} src={logo} style={{margin:"0 auto", maxHeight:70}}/>
            </Link>
          </div>
          <div className="col-xs-2 col-xs-offset-1 text-center">
            <Link to='resource-step' params={{resourceKey:'quiz_2',step:'leaderboard_step'}}>
              <ResizedImage width={100} className={cx({'resource-link img-responsive':true, 'active':(res==q2)})} src={q2.picture} style={{margin:"0 auto", maxHeight:70}}/>
            </Link>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Header;
