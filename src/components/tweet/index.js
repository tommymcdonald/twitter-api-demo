import React from 'react';

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
          <p>{user.name} </p>
          <span>@{user.screen_name}</span>
        </header>
        <main>
          <p>{tweet.text}</p>
        </main>
      </section>
    </div>
  )
}

export default Tweet;
