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
    return word.replace(/[^A-Za-z0-9\n\s]/g,"").replace(/\s{2,}/g, " ")

  });

  // Using 'stopword' library to filter out stopwords
  let filteredWords = stopword.removeStopwords(words);

  // create object with key/value of word/count from all strings
  let obj = filteredWords.reduce(function(number, word) {
    number[word] = number.hasOwnProperty(word) ? number[word] + 1 : 1;
    return number;
  }, {});

  let sortable = Object.entries(obj).map(([k, v]) => {
    return { x: k, y: v }
  });

  // Remove space, RT, and IoT values from filtered array
  for (let i = sortable.length - 1; i >= 0; --i) {
    // Not proud of this hack
    if (
      sortable[i].x === '' ||
      sortable[i].x === ' ' ||
      sortable[i].x === 'RT' ||
      sortable[i].x === 'IoT' ||
      sortable[i].x === 'iot'
    ) {
      sortable.splice(i, 1);
    }
  }

  // Sort the array and reverse to orient data correctly
  sortable.sort(function(a, b) {
    return a.y - b.y;
  }).reverse();

  // Return first 20 results
  return sortable.slice(0, 20);
}
