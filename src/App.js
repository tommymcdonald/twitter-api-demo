import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

function Stats(props) {
  const { stats } = props;
  if(stats) {
    return (
      <div className="stats">
        {stats.map(stat => {
          return <p>{`${stat[0]} : ${stat[1]}`}</p>
        })}
      </div>
    )
  }

  return <p>No stats...</p>
}

function Tweet(props) {
  let { tweet } = props;
  return (
    <div className="tweet-container">
      <div>
        <img src={`${tweet.user.profile_image_url_https}`} alt="Avatar"/>
      </div>
      <div>
        <p>{tweet.text}</p>
      </div>
    </div>
  )
}

function TweetsList(props) {
  return (
    <div className="tweets-list-container">
      {props.tweets.map((tweet, idx) => {
        return <Tweet key={idx} tweet={tweet} />
      })}
    </div>
  )
}

function getStats(tweets) {
  console.log('tweets', tweets);
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      stats: [],
    };
  }

  async componentDidMount() {
    try {
      let response = await axios.get('http://localhost:3001/search?hashtag=IoT');
      let { data } = response;
      this.setState({ tweets: data.statuses, stats: data.stats });
      getStats(data.statuses)
    } catch (error) {
      console.log('error', error);
    }
  }



  render() {
    let { tweets, stats } = this.state;

    if(tweets) {
      return (
        <div className="App">
          <Stats stats={stats}/>
          <TweetsList tweets={tweets} />
        </div>
      );
    }

    return <p>Loading...</p>
  }
}

export default App;
