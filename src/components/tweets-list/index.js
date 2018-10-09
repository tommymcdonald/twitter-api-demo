import React from 'react';
import Tweet from '../tweet';
import './tweets-list.scss';

function TweetsList(props) {
  let { tweets } = props;

  if(!tweets.length) {
    return <p>Loading...</p>
  }
  return (
    <div className="tweets-list-container container">
      {tweets.map((tweet, idx) => {
        return <Tweet key={idx} tweet={tweet} />
      })}
    </div>
  )
}

export default TweetsList;
