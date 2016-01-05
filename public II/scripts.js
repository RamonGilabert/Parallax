document.addEventListener("DOMContentLoaded", function() {

  var firstTitle = document.getElementById("title");
  var secondTitle = document.getElementById("subtitle");
  var backgroundImage = document.getElementById("background-image");

  window.requestAnimationFrame = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(callback) { window.setTimeout(callback, 1000 / 60) };

  window.onscroll = function() {
    updateText();

    if (window.scrollY >= convertPercentage("30%") && window.scrollY <= convertPercentage("165%")) {
      window.requestAnimationFrame(updatePicture)
    } else {
      backgroundImage.style.backgroundPosition = "0% 10%";
    }
  }

  function updateText() {
    var slowScroll = -window.scrollY / 3.5;
    var slowestScroll = -window.scrollY / 5;

    firstTitle.style.transform = "translateY(" + slowScroll + "px)";
    firstTitle.style.opacity = 1 - (convertPixels(window.scrollY) / 30);
    secondTitle.style.transform = "translateY(" + slowestScroll + "px)";
    secondTitle.style.opacity = 1 - (convertPixels(window.scrollY) / 30);
  }

  function updatePicture() {
    var percentage = convertPixels(window.scrollY / 1) - 20;

    if (percentage <= 100) {
      backgroundImage.style.backgroundPosition = "0% " + percentage + "%";
    }
  }

  function convertPercentage(percentage) {
    if (typeof(percentage) === "string") {
      percentage = parseFloat(percentage.replace("%", ""));
      percentage = percentage * window.innerHeight / 100;
    }

    return percentage;
  }

  function convertPixels(pixels) {
    pixels = pixels * 100 / window.innerHeight;
    return pixels;
  }
});
