// Imports
const express = require('express');
const cors = require('cors');
const Twitter = require('twitter-node-client').Twitter;
const { getCommonWords } = require('./utils/stats');

// Local constants
const app = express();
const PORT = 3001;
const twitter = new Twitter();

app.use(cors());

app.get('/search', (req, res) => {
  let hashtag = req.query.hashtag ? req.query.hashtag : 'IoT';

  function error(err, response, body) {
    res.send(err.message);
  }

  function success(data) {
    let response = JSON.parse(data);
    let { statuses } = response;
    let textFromTweets = statuses.map( status => status.text);
    response.stats = getCommonWords(textFromTweets);
    res.send(response)
  }

  twitter.getSearch({'q':`${hashtag}`,'count': 100}, error, success);
});

app.listen(PORT, () => `App is listening on port ${PORT}`);
