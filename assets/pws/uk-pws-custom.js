/* -----------------------------------------
   Keyboard Shortcut Keys
----------------------------------------- */
var current_location_key = '';

var keys = {};
$(document).keydown(function(e) {
  keys[e.which] = true;
  printKeys();
});
$(document).keyup(function(e) {
  delete keys[e.which];
  printKeys();
});

function printKeys() {
  var html = '';
  for (var i in keys) {
    if (!keys.hasOwnProperty(i)) continue;
  }
  if (keys[83] == true && keys[66] == true) {
    windowOpen("#");
    delete keys[83];
    delete keys[66];
  }
  if (keys[65] == true && keys[85] == true) {
    windowOpen("about-us/index.html");
    delete keys[65];
    delete keys[85];
  }
  if (keys[38] == true && keys[83] == true) {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    delete keys[38];
    delete keys[83];
  }
}

//fix for window open in new window instead of tab for FF.
function windowOpen(a) {
  var b = function() {
    window.open(a)
  };
  /Firefox/.test(navigator.userAgent) ? setTimeout(b, 0) : b()
}