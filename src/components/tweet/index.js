import React from 'react';
import './tweet.scss';

function Tweet(props) {
  let { tweet } = props;
  let { user } = tweet;
  return (
    <div className="tweet-container">
      <aside>
        <img src={`${user.profile_image_url_https}`} alt="Avatar"/>
      </aside>
      <section>
        <header>
          <h3>{user.name} </h3>
          <h5>@{user.screen_name}</h5>
        </header>
        <main>
          <p>{tweet.text}</p>
        </main>
      </section>
    </div>
  )
}

export default Tweet;
