/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  // JQuery animation
  //compose button on Nav bar
  setInterval(() => {
    $("#arrow").animate({ top: "+=7px" }, "slow");
    $("#arrow").animate({ top: "-=7px" }, "slow");
  }, 20);
  // toggle textarea
  $("#arrow").on("click", function () {
    $("#target").slideToggle();
    $("#tweet-text").focus();
  });

  //utility function for preventing cross-site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //fetching tweets and render the html
  const loadTweets = function (event) {
    $.ajax({ url: "/tweets", method: "GET" }).then(function (data) {
      renderTweets(data);
    });
  };
  loadTweets();

  // loops through tweets
  // empty current html
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  function renderTweets(tweets) {
    const $tweetsContainer = $("#tweets-container");
    $tweetsContainer.empty();
    for (const tweet of tweets) {
      const $newtweet = createTweetElement(tweet);
      $tweetsContainer.prepend($newtweet);
    }
    return $tweetsContainer;
  }

  //return a tweet element
  function createTweetElement(tweetData) {
    const $tweet = $(`<article class="tweet">
    <header class = "all-tweet-header">
           <div class = "all-tweet-header-left">
            <img src=${escape(tweetData.user.avatars)}> 
            <a rel="author">${escape(tweetData.user.name)}</a>
           </div>
           <a rel="author">${escape(tweetData.user.handle)}</a>
          </header>
          <div class = "all-tweet-content">
           <p>${escape(tweetData.content.text)}</p>
          </div>
          <footer class = "all-tweet-footer">
            <time>${escape(timeago.format(tweetData.created_at))}</time>
            <div class = "logo">
             <i class="fa-solid fa-flag"></i>
             <i class="fa-solid fa-arrow-up-right-from-square"></i>
             <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
     </article>`);
    return $tweet;
  }

  // form submission use ajax with error handling
  $("#target").submit(function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    const $tweetValue = $($(this).children()[1]);
    if ($tweetValue.val().length > 140) {
      $(".error").text("Too long.Please limit your text of 140 chars.");
      $(".error").slideDown("slow");
      return;
    }
    if ($tweetValue.val().length === 0) {
      $(".error").text("Text can't be empty");
      $(".error").slideDown("slow");
      return;
    }
    $(".counter").text(140);
    $(".error").slideUp("slow");
    $.ajax({ url: "/tweets", method: "POST", data: data }).then(() => {
      const $tweetsContainer = $("#tweets-container");
      loadTweets();
    });
    $tweetValue.val(null);
  });
});
