$(document).ready(function () {
  console.log("DOM has loaded.");
  $("#tweet-text").on("input", function (event) {
    const textValue = event.target.value;
    const remainCounter = 140 - textValue.length;
    const counter = $(this).siblings(".bottom").children(".counter");
    counter.text(remainCounter);
    if (counter.val() < 130) {
      counter.css({ color: "red" });
    } else {
      counter.css({ color: "unset" });
    }
  });
  $("#all-tweet").hover(
    function () {
      $(this).css({ "box-shadow": "5px 5px #b0c4de" });
    },
    function () {
      $(this).css({ "box-shadow": "unset" });
    }
  );
  $("#flag").hover(
    function () {
      $(this).css({ color: "rgb(204, 204, 61)" });
    },
    function () {
      $(this).css({ color: "#4056a1" });
    }
  );
  $("#retweet").hover(
    function () {
      $(this).css({ color: "rgb(204, 204, 61)" });
    },
    function () {
      $(this).css({ color: "#4056a1" });
    }
  );
  $("#heart").hover(
    function () {
      $(this).css({ color: "rgb(204, 204, 61)" });
    },
    function () {
      $(this).css({ color: "#4056a1" });
    }
  );
});
