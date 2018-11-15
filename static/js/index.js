var followClass = ".wwxN2.GD3H5"
var unFollowClass = ".isgrP"
var unFollowButtonSelector = 'div[role="dialog"] button[tabindex="0"]'
var limit = 400;
var interval = 40000;

var block = null;
var list = null
var step = 0;

var blacklist = [
  "sexy", "blog", "shop", "photo", "fitnes", "body", "world", "ladies", "boobs", "tits", "ass", "woman"
]
var blacklistCheck = function(name) {
  return blacklist.filter(function(item) {
    if (name.indexOf(item) > -1) {
      return true
    }
  })
}



var followList = function() {
  list = block.querySelectorAll('li');
  var item = list[step]
  if (!item) {
    block.scroll(0, block.scrollHeight)
    window.setTimeout(function() {
      followList();
    }, 5000)
    return
  }
  var name = item.querySelectorAll('a')[1] ? item.querySelectorAll('a')[1].innerText : item.querySelectorAll('a')[0].innerText
  var button = item.querySelector('button')

  step += 1
  if (blacklistCheck(name).length || button.innerText !== 'Follow') {
    return followList()
  }
  if (step > limit) return alert('DONE')
  button.click();
  window.setTimeout(function() {
    followList();
  }, interval)
}

var unFollowList = function() {
  list = block.querySelectorAll('li');
  var item = list[step]
  if (!item) {
    block.scroll(0, block.scrollHeight)
    window.setTimeout(function() {
      unFollowList();
    }, 5000)
    return
  }
  var button = item.querySelector('button')
  step += 1
  if (step > limit) return alert('DONE')
  button.click();
  window.setTimeout(function() {
    document.querySelector(unFollowButtonSelector).click();
  }, 5000)
  window.setTimeout(function() {
    unFollowList();
  }, interval)
}

function ask() {
  if (confirm("Follow type?")) {
    block = document.querySelector(followClass);
    followList();
  } else {
    block = document.querySelector(unFollowClass);
    unFollowList();
  }
}
ask()
