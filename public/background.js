/*global chrome*/

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.method == "getMetas") {
    console.log(request.metas);
    //Try adding indexed DB here;
  }
});