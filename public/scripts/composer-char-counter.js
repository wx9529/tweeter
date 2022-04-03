$(() => {
  console.log("DOM has loaded.");
  // JQuery animation

  // form input validation
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
    if (scroll < 150) {
      $("#btnScrollToTop").hide();
      $(".nav-header .nav-right").show();
    } else {
      $("#btnScrollToTop").show();
      $(".nav-header .nav-right").hide();
    }
  });

  //ScrollToTop button which scroll to top and slide down form textarea
  $("#btnScrollToTop").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("#target").slideDown();
  });
});
