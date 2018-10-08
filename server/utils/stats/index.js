const stopword = require('stopword');

module.exports = {
  getCommonWords,
};

// takes an array of strings, converts to array of words
function getCommonWords(list) {

  // create array of arrays of words by splitting tweet strings
  let tweets = list.map(tweet => {
    return tweet.split(' ');
  });

  // Flatten array via apply, one array of words remains
  let words = [].concat.apply([], tweets);

  // Removing wily characters
  words = words.map(word => {
    return word.replace(/[^A-Za-z0-9\s]/g,"").replace(/\s{2,}/g, " ")

  });

  // Using 'stopword' library to filter out stopwords
  let filteredWords = stopword.removeStopwords(words);

  // create object with key/value of word/count from all strings
  let obj = filteredWords.reduce(function(number, word) {
    number[word] = number.hasOwnProperty(word) ? number[word] + 1 : 1;
    return number;
  }, {});

  // turn object into array for sorting purposes;
  let sortable = [];
  for (let word in obj) {
    sortable.push([word, obj[word]]);
  }

  // Remove space and RT values from filtered array
  for (let i = sortable.length - 1; i >= 0; --i) {
    if (sortable[i][0] === "" || sortable[i][0] === 'RT') {
      sortable.splice(i, 1);
    }
  }

  // Sort the array, reverse to get higher values first, only return top 20 results
  sortable.sort(function(a, b) {
    return a[1] - b[1];
  }).reverse().slice(0, 20);


  return sortable;
}
