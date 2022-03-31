$(() => {
  console.log("DOM has loaded.");
  $("#tweet-text").on("input", function (event) {
    const textValue = event.target.value;
    const remainCounter = 140 - textValue.length;
    const counter = $(this).siblings(".bottom").children(".counter");
    counter.text(remainCounter);
    if (counter.val() < 0) {
      counter.css({ color: "red" });
    } else {
      counter.css({ color: "unset" });
    }
  });
 
  //display ScrollToTop button when scrolling down
  $(window).scroll(function (event) {
    event.preventDefault();
    const scroll = $(window).scrollTop();
    if (scroll === 0) {
      $("#btnScrollToTop").hide();
      $(".nav-header").show();
      $(".header").css({ "margin-top": "120px" });
    } else {
      $("#btnScrollToTop").show();
      $(".nav-header").hide();
      $(".header").css({ "margin-top": "0" });
    }
  });

  //Scroll to top and enable textare When clicking the button
  $("#btnScrollToTop").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("#target").slideDown();
  });
});
