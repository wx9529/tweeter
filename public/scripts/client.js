/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  // JQuery animation
  setInterval(() => {
    $("#arrow").animate({ top: "+=7px" }, "slow");
    $("#arrow").animate({ top: "-=7px" }, "slow");
  }, 20);

  $("#arrow").on("click", function () {
    $("#target").slideToggle();
    console.log($("#target").is(":visible"));
    if ($("#target").is(":hidden")) {
      $("#tweet-text").blur();
    } else {
      $("#tweet-text").focus();
    }
  });

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //fetching tweets and render html
  const loadTweets = function () {
    $.ajax({ url: "/tweets", method: "GET" }).then(function (data) {
      renderTweets(data);
    });
  };

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  function renderTweets(tweets) {
    const $tweetsContainer = $("#tweets-container");
    for (const tweet of tweets) {
      const $newtweet = createTweetElement(tweet);
      $tweetsContainer.prepend($newtweet);
    }
    return $tweetsContainer;
  }

  //return a tweet element
  function createTweetElement(tweetData) {
    const $tweet = $(`<article id="tweet">
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
            <div id = "logo">
             <i id = "flag" class="fa-solid fa-flag"></i>
             <i id = "retweet" class="fa-solid fa-arrow-up-right-from-square"></i>
             <i id = "heart" class="fa-solid fa-heart"></i>
            </div>
          </footer>
     </article>`);
    return $tweet;
  }

  // Submit a form use ajax
  function sendTweet() {
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
        loadTweets();
      });
      $tweetValue.val(null);
    });
  }
  sendTweet();
});
