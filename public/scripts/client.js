/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  //fetching tweets 
  const loadTweets = function () {
    
  }

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const renderTweets = function (tweets) {
    const $tweetsContainer = $("#tweets-container");
    for (const tweet of tweets) {
      const $newtweet = createTweetElement(tweet);
      $tweetsContainer.append($newtweet);
    }
    return $tweetsContainer;
  };

  //return a tweet element
  function createTweetElement(tweetData) {
    const $tweet = $(`<article id="tweet">
  <header class = "all-tweet-header">
           <div class = "all-tweet-header-left">
            <img src=${tweetData.user.avatars}> 
            <a rel="author">${tweetData.user.name}</a>
           </div>
           <a rel="author">${tweetData.user.handle}</a>
          </header>
          <div class = "all-tweet-content">
           <p>${tweetData.content.text}</p>
          </div>
          <footer class = "all-tweet-footer">
            <time>${tweetData.created_at}</time>
            <div id = "logo">
             <i id = "flag" class="fa-solid fa-flag"></i>
             <i id = "retweet" class="fa-solid fa-arrow-up-right-from-square"></i>
             <i id = "heart" class="fa-solid fa-heart"></i>
            </div>
          </footer>
  </article>`);
    return $tweet;
  }
  renderTweets(data);

  $("#target").submit(function (event) {
    console.log($(this));
    event.preventDefault();
    $.ajax({ url: "/tweets", method: "POST", data: $(this).serialize() });
  });
});
