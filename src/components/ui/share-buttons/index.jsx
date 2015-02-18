import React from 'react';
import SocialIcons from '../social-icons/index';
import style from './style.scss';

const ShareButtons = React.createClass({
  componentWillMount() {
    style.use();
  },
  componentWillUnmount() {
    style.unuse();
  },
  handleTwitterShare(e){
    Hull.track('hull.share',{network:'twitter'});
  },
  handleGoogleShare(e){
    Hull.track('hull.share',{network:'google'});
  },
  handleFacebookShare(e){
    Hull.track('hull.share',{network:'facebook'});
  },
  render() {
    return (
      <ul className="post-share-menu">  
        <li className="post-share-menu-title">Share</li>
        <li className="post-share-menu-item">
          <a
            onClick={this.handleTwitterShare}
            href={`https://twitter.com/intent/tweet?text=${this.props.text}&amp;url=${this.props.url}&amp;via=${this.props.twitterAccount}`}
            className="post-share-menu-link post-share-menu-link--twitter js-social-twitter-share"
            name='twitter'
            title="Share on Twitter"
            target="_blank">
            <SocialIcons.Twitter/>
          </a>
        </li>
        <li className="post-share-menu-item">
          <a
            onClick={this.handleFacebookShare}
            href={`https://www.facebook.com/sharer/sharer.php?u=${this.props.url}`}
            name='facebook'
            className="post-share-menu-link post-share-menu-link--facebook js-social-facebook-share"
            title="Share on Facebook"
            target="_blank">
            <SocialIcons.Facebook/>
          </a>
        </li>
        <li className="post-share-menu-item">
          <a
            onClick={this.handleGoogleShare}
            href={`https://plus.google.com/share?url=${this.props.url}`}
            className="post-share-menu-link post-share-menu-link--google js-social-google-share"
            name='google'
            title="Share on Google+"
            target="_blank">
            <SocialIcons.Google/>
          </a>
        </li>
      </ul>
    );
  }

});

export default ShareButtons;
