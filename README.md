# Twitter API Code Example


## Quick API Note
Due to limitations of existing NodeJS Twitter API implementations (such as not being able to use premium search features like non-truncated text and 100+ results) some of the tweets may look incorrect due to truncated text.

## Before you begin
You will need Twitter application credentials, as I did not upload my application credentials to github. You can plug these credentials into `/server/config.js` to run this project locally or you can visit http://tmac.io/twitter-search to see the project in action.

## Setup
To set up this project, you need to have NodeJS >= 10.0 and [Yarn](https://yarnpkg.com/en/) installed (although NPM may be used in place of Yarn, and run the simple command of `yarn` or `yarn install`.


## Running the project

The project is divided into two sections: `server` and `client`. The client is the base-level project, with a server directory
used to connect to the twitter API via OAuth2 and do server side object creation for the word count statistics.


1. To run the server, create a new terminal instance inside the root directory, and run the following command. Due to the recommended Twitter library used, we have to declare all keys as ENV variables. This will spawn a file watcher and http server in case you would like to live-edit server code.
- 	`$ twitterConsumerKey=YOUR_CONSUMER_KEY twitterConsumerSecret=YOUR_CONSUMER_SECRET twitterAccessToken=YOUR_ACCESS_TOKEN twitterAccessTokenSecret=YOUR_ACCESS_SECRET npx nodemon server`
1. In a new terminal tab, pane, or instance, run the `yarn start` command to start the client in a similar live-reload server situation. This will open a new tab in your primary browser with the project.

## Usage
You can toggle between the list of most used words and tweets by pressing the button in the upper right of the screen. You can also update the hashtag searched via the input at the top, this functionality is to make up for the not-so-hot design I've implemented, hopefully.

## Running tests
To run basic tests in Jest with a spawned watcher, run `yarn test`. To generate a coverage report, run `yarn test --coverage`.
