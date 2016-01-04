document.addEventListener("DOMContentLoaded", function() {

  var keyframes = [
    {
      "wrapper" : "#introduction .animation",
      "duration" : "100%",
      "animations" :  [
        {
          "selector"    : "#title",
          "translateY"  : -140,
          "opacity"     : 0
        },
        {
          "selector"    : "#subtitle",
          "translateY"  : -110,
          "opacity"     : 0
        }
      ]
    }
  ];

  var settings, lastPosition = null, newPosition, timer, delta, delay = 50;

  function scrollingSpeed(settings) {
    newPosition = window.scrollY;

    if (lastPosition != null) { delta = newPosition - lastPosition; }

    lastPosition = newPosition
    window.clearTimeout(timer);

    timer = window.setTimeout(function() {
      lastPosition = null;
      delta = 0;
    }, delay);

    return delta;
  }

  window.onscroll = function() {
    var speed = scrollingSpeed();
  }
});
