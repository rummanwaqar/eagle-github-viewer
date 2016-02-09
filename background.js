// Add listener so background knows when a tab has changed.
chrome.tabs.onUpdated.addListener(doSomething);

function doSomething(tabId, changedInfo, tab) {
  if(tab.url.indexOf('github.com') > -1 && fileExtension(tab.url) == 'sch') {
    if(changedInfo.status == "complete") chrome.pageAction.show(tabId);
  } else {
    chrome.pageAction.hide(tabId);
  }
}

var fileExtension = function( url ) {
    return url.split('.').pop().split(/\#|\?/)[0];
}
