import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';
import TweetsList from './components/tweets-list';



function Words(props) {
  let { words } = props;

  return (
    <div className="words-container">
      <div>
        {words.map(word => {
          return (
            <div className="single-word">
              <p>{word.x}</p>
              <p>{word.y}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: 'IoT',
      tweets: [],
      stats: [],
      visibleSection: 'tweets'
    };

    this.loadQueryResults = this.loadQueryResults.bind(this);
    this.toggleVisibleSection = this.toggleVisibleSection.bind(this);
    this.updateSearchQuery = this.updateSearchQuery.bind(this);
  }

  componentDidMount() {
    this.loadQueryResults(this.state.searchQuery);
  }

  loadQueryResults(query) {
    // should have some debouncing in place, foregoing it for now
    axios.get(`http://localhost:3001/search?hashtag=${query}`)
      .then(response => {
        let { data } = response;
        this.setState({ tweets: data.statuses, stats: data.stats });
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  toggleVisibleSection() {
    let { visibleSection } = this.state;
    visibleSection = visibleSection === 'tweets' ? 'wordCount' : 'tweets';
    this.setState({ visibleSection });
  }

  updateSearchQuery(event) {
    let searchQuery = event.target.value;
    if (searchQuery === "") {
      searchQuery = "IoT";
    }
    this.setState({ searchQuery });
    this.loadQueryResults(searchQuery);
  }

  render() {
    let { tweets, searchQuery, stats, visibleSection } = this.state;
    if (tweets) {
      return (
        <div className="App">
          <nav>
            <div className="container">
              <span>Tweet Visualizer Demo™</span>
              <input type="text" placeholder={`#${searchQuery}`} onChange={this.updateSearchQuery}/>
              <button onClick={() => this.toggleVisibleSection()}>
                Show {visibleSection === 'tweets' ? 'Word Counts' : 'Tweets'}
              </button>
            </div>
          </nav>
          <main>
            {visibleSection === 'tweets' ? <TweetsList tweets={tweets}/> : <Words words={stats}/>}
          </main>
        </div>
      );
    }
    return <p>Loading...</p>
  }
}

export default App;
