/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// loops through tweets, calls createTweetElement for each tweet, takes return value and appends it to the tweets container
const renderTweets = function(tweets) {
  $('#tweetContainer').empty();
  for (let tweet of tweets) {
    $('#tweetContainer').append(createTweetElement(tweet));
  }
};
//escape function declaration
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//Create tweet function
const createTweetElement = function(tweet) {
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
    <span>${escape(timeago.format(tweet.created_at))}</span>
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

//jQuery's document ready function
$(document).ready(function() {

  const loadTweets = function() {        //get latest tweets on top
    $.ajax('/tweets', { method: 'GET' })
      .then((tweets) => {
        renderTweets(tweets.reverse());
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  $("#newTweetForm").on("submit", function(event) {
    event.preventDefault();

    if ($('#tweet-text').val().length === 0) {
      $('#errorText').text('Your tweet is empty!');
      return $('#errorMessage').show("slow");
    }
    if ($('#tweet-text').val().length > 140) {
      $('#errorText').text('Your tweet is longer than 140 characters!');
      return $('#errorMessage').show("slow");
    }

    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    })
      .then((tweets) => {
        $('#tweet-text').val("");
        $('#errorMessage').hide("slow");
        $('#countNumber').val("140");
        loadTweets();
      })
      .catch((err) => {
        console.log("error", err);
      });
  });

  loadTweets();

});