document.addEventListener("DOMContentLoaded", function() {

  var scrollingPosition = 0,
  previousDuration = 0,
  currentKeyframe = 0;

  var keyframes = [
    {
      duration: "100%",
      animations: [
        {
          "id": "title",
          "translateY": [0, -150],
          "opacity": [1, 0]
        },
        {
          "id": "subtitle",
          "translateY": [0, -50],
          "opacity": [1, 0]
        }
      ]
    },
    {
      duration: "300%",
      animations: []
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
      currentKeyframe += 1;
      previousDuration += keyframes[currentKeyframe].duration
    } else if (document.body.scrollTop < previousDuration && currentKeyframe > 0) {
      previousDuration -= keyframes[currentKeyframe].duration;
      console.log(previousDuration);
      currentKeyframe -= 1;
    }

    scrollingPosition = window.scrollY;
    window.requestAnimationFrame(animationFunction);
  }

  window.requestAnimationFrame = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.setTimeout(animationFunction, 1000 / 60);

  function animationFunction() {
    var animation, translateX, translateY, scale, opacity, element;

    for (var i = 0; i < keyframes[currentKeyframe].animations.length; i++) {
      animation = keyframes[currentKeyframe].animations[i];
      translateX = setupAnimation(animation, "translateX");
      translateY = setupAnimation(animation, "translateY");
      scale = setupAnimation(animation, "scale");
      opacity = setupAnimation(animation, "opacity");

      element = document.getElementById(animation.id);
      element.style.transform = "translate(" + translateX + "px, " + translateY + "px) scale(" + scale + ")";
      element.style.opacity = opacity;
    }
  }

  function setupAnimation(animation, property) {
    var values = animation[property];

    if (typeof(values) === "undefined") { return defaultValues(property); }

    return ((values[1] - values[0]) * (window.scrollY - previousDuration) / keyframes[currentKeyframe].duration) + values[0];
  }

  function defaultValues(property) {
    if (property === "scale" || property === "opacity") {
      return 1;
    } else {
      return 0;
    }
  }

  setupPixels();
});

/* COMMENTS */

// Perfectly valid code for a parallax without duration.

// var slowScroll = scrollingPosition / 20;
// var slowestScroll = scrollingPosition / 25;
//
// title.style.transform = "translateY(-" + slowScroll + "px)";
// subtitle.style.transform = "translateY(-" + slowestScroll + "px)";
// title.style.opacity = (document.body.scrollHeight - scrollingPosition - 700) / document.body.scrollHeight;
// subtitle.style.opacity = title.style.opacity;
