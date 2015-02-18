import React from 'react';
import cx from 'react/lib/cx';
import style from './style.scss';
import SocialIcons from '../social-icons/index';

var noop = function(){}

const SharePopover = React.createClass({
  componentWillMount() {
    style.use();
    document.addEventListener('click', this.handleWindowClick);
  },
  componentWillUnmount() {
    style.unuse();
    document.removeEventListener('click', this.handleWindowClick);
  },
  handleWindowClick(e){
    if(e.target!=this.refs.shareButton.getDOMNode()){
      this.setState({open:false});
    }
  },
  handleTwitterShare(e){
    Hull.track('hull.share',{network:'twitter'});
  },
  handleGoogleShare(e){
    Hull.track('hull.share',{network:'google'});
  },
  handleFacebookShare(e){
    if(Hull.share){
      e.preventDefault();
      Hull.share({
        provider:'facebook',
        params:{
          href:e.target.href
        }
      }).then(function(res){
        Hull.track('hull.share.complete',{network:'facebook'});
      })
    }
    Hull.track('hull.share',{network:'facebook'});
  },
  getInitialState() {
    return {
      open:false
    };
  },
  togglePopover(e){
    e.preventDefault();
    this.setState({open:!this.state.open});
  },
  render() {
    var text = this.props.text || this.props.actions.translate('share_text');
    return (
      <div className='share-popover'>  
        <input type="checkbox" className="checkbox" id="share" onChange={noop} checked={this.state.open} value={this.state.open}/>
        <a href="#"
          ref='shareButton'
          onClick={this.togglePopover}
          className={cx({'btn btn-sm share-popover-label':true, 'btn-brand':!this.state.open, 'btn-secondary':this.state.open })}>{this.props.children}</a>
        <ul className="share-popover-buttons">
          <li className="share-popover-button twitter">
            <a
              target="_blank"
              href={`https://twitter.com/intent/tweet?text=${text}&amp;url=${this.props.url}&amp;via=${this.props.twitterAccount}`}
              onClick={this.handleTwitterShare}><SocialIcons.Twitter/></a>
          </li>
          <li className="share-popover-button facebook">
            <a
              target="_blank"
              href={`https://www.facebook.com/sharer/sharer.php?u=${this.props.url}`}
              onClick={this.handleFacebookShare}><SocialIcons.Facebook/></a>
          </li>
          <li className="share-popover-button google">
            <a
              target="_blank"
              href={`https://plus.google.com/share?url=${this.props.url}`}
              onClick={this.handleGoogleShare}><SocialIcons.Google/></a>
          </li>
        </ul>
      </div>
    );
  }

});

export default SharePopover;
