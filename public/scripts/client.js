/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// loops through tweets, calls createTweetElement for each tweet, takes return value and appends it to the tweets container
const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $('#tweetContainer').append(createTweetElement(tweet));
  }
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweet) {
  let $tweet = $(`
  <article class="tweet">
    <header>
      <div class="user">
      <img
        src="${escape(tweet.user.avatars)}"
        alt="">
        <p>${escape(tweet.user.name)}</p>
      </div>
      <h4>${escape(tweet.user.handle)}</h4>
    </header>
    <p>${escape(tweet.content.text)}</p>
    <footer>
    <span>${escape(tweet.created_at, timeago.format(new Date()))}</span>
      <div>
        <span> <i class="fa-solid fa-flag hover"></i> </span>
        <span> <i class="fa-solid fa-retweet hover"></i> </span>
        <span> <i class="fa-solid fa-heart hover"></i> </span>
      </div>
    </footer>
  </article>
  `);
  return $tweet;
};


$(document).ready(function () {

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then((tweets) => {
        renderTweets(tweets.reverse());
      })
      .catch((err) => {
        console.log("error", err)
      });
  };

  $("#newTweetForm").on("submit", function (event) {
    event.preventDefault();

    if ($('#tweet-text').val().length === 0) {
      return alert('Your tweet is empty')
    }
    if ($('#tweet-text').val().length > 140) {
      return alert('Your tweet is longer than 140 characters')
    }

    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    })
      .then((tweets) => {
        loadTweets();
      })
      .catch((err) => {
        console.log("error", err)
      });
  });

  loadTweets();

});