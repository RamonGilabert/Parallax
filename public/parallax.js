document.addEventListener("DOMContentLoaded", function() {

  var scrollingPosition;
  var keyframes = [
    {
      duration: "100%",
      animation: [
        {
          "selector": "#title",
          "translateY": -250
        },
        {
          "selector": "#subtitle",
          "translateY": -150
        }
      ]
    }
  ];

  var title = document.getElementById("title");
  var subtitle = document.getElementById("subtitle");

  window.onscroll = function() {
    scrollingPosition = window.scrollY;
    window.requestAnimationFrame(animationFunction);
  }

  window.requestAnimationFrame = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.setTimeout(animationFunction, 1000 / 60);

  function animationFunction() {
    var slowScroll = scrollingPosition / 20;
    var slowestScroll = scrollingPosition / 25;

    title.style.transform = "translateY(-" + slowScroll + "px)";
    subtitle.style.transform = "translateY(-" + slowestScroll + "px)";
    title.style.opacity = (document.body.scrollHeight - scrollingPosition - 700) / document.body.scrollHeight;
    subtitle.style.opacity = title.style.opacity;
  }
});
