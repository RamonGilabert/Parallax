document.addEventListener("DOMContentLoaded", function() {

  var scrollingPosition = 0,
  previousDuration = 0,
  currentKeyframe = 0;

  var keyframes = [
    {
      duration: "100%",
      animation: [
        {
          "selector": "#title",
          "translateY": -250,
          "opacity": 0
        },
        {
          "selector": "#subtitle",
          "translateY": -150,
          "opacity": 0
        }
      ]
    },
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

  function setupPixels() {
    for (var i = 0; i < keyframes.length; i++) {
      keyframes[i].duration = convertToPixels(keyframes[i].duration);
    }
  }

  function convertToPixels(value) {
    if (typeof value === "string" && value.match(/%/g)) {
      value = (parseFloat(value) / 100) * window.innerHeight;
    }

    return value;
  }

  window.onscroll = function() {
    if (document.body.scrollTop > keyframes[currentKeyframe].duration + previousDuration && keyframes.length - 1 != currentKeyframe) {
      previousDuration += keyframes[currentKeyframe].duration
      currentKeyframe += 1;
    } else if (document.body.scrollTop < previousDuration && currentKeyframe > 0) {
      previousDuration -= keyframes[currentKeyframe].duration;
      currentKeyframe -= 1;
    }

    console.log(currentKeyframe);

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

  setupPixels();
});
