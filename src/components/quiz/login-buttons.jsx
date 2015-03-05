var React = require('react');
var cx    = require('react/lib/cx');

var LoginButton = React.createClass({
  onPlay: function(e){
    debugger
    this.props.onPlay(this.props.service)
  },
  render: function() {
    var t = this.props.actions.translate, service=this.props.service;
    var styles = {"btn btn-rounded btn-lg pb-1 pt-1":true}
    styles['btn-'+service.name]=true;
    console.log(this._lifeCycleState,this._rootNodeID,this,this.onPlay)
    return (
      <button
        className={cx(styles)}
        onClick={this.onPlay}
        key={'service-'+service.name}>
          <i className={"icon icon-"+service.name}></i> {t('play_with_service_button',{service:service.name})}
          <br/>
          <small className='text-muted'>{t("see_who_played")}</small>
        </button>
    );
  }
});


var LoginButtons = React.createClass({
  render: function() {
    if (this.props.user) return <div></div>;
    var content, service;
    if(this.props.isLoggingIn){
      content = this.props.actions.translate('logging_in_message');
    } else {
      content = this.props.providers.map(function(service){
        return <LoginButton key={`login-${service.name}`} actions={this.props.actions} service={service} onPlay={this.props.onPlay}/>
      },this);
    }
    return <div>{content}</div>;
  }
});

module.exports = LoginButtons
