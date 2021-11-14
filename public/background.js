/*global chrome*/

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log('tab', tab);
  return tab;
}


chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.method == "getMetas") {
    console.log(request.metas);
    //Try adding indexed DB here;
  }
  if (request.method == "onTabChange") {
    chrome.tabs.onActivated.addListener(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, (data) => {
        console.log('tab', data);
        chrome.tabs.executeScript(null, {
          code: `var metas = document.getElementsByTagName('meta'); 
          var metaArr = [];
          for (var i=0; i<metas.length; i++) { 
            var name = metas[i].getAttribute("name");
            var property = metas[i].getAttribute("property");
            var httpequiv = metas[i].getAttribute("http-equiv");
            var content = metas[i].getAttribute("content");
            var charset = metas[i].getAttribute("charset");
            
            metaArr.push([name, property, httpequiv, content, charset]);
          } 
          
          chrome.runtime.sendMessage({
            method:"getMetas",
            metas:metaArr
          });`
        }, function() {
          // If you try it into an extensions page or the webstore/NTP you'll get an error
          if (chrome.runtime.lastError) {
            // let message = {};
            // message.innerText = 'There was an error : \n' + chrome.runtime.lastError.message;
          }
        });
      });
    }) 
    chrome.tabs.onUpdated.addListener((data, info, tab) => {
      console.log('data', data);
      console.log('info', info);
      console.log('tab', tab)
      if (info.status === 'complete') {
        // let queryOptions = { active: true, currentWindow: true };
        // let [tab] = chrome.tabs.query(queryOptions);
        // console.log('tab', tab);
        chrome.tabs.executeScript(null, {
          code: `var metas = document.getElementsByTagName('meta'); 
          var metaArr = [];
          for (var i=0; i<metas.length; i++) { 
            var name = metas[i].getAttribute("name");
            var property = metas[i].getAttribute("property");
            var httpequiv = metas[i].getAttribute("http-equiv");
            var content = metas[i].getAttribute("content");
            var charset = metas[i].getAttribute("charset");
            
            metaArr.push([name, property, httpequiv, content, charset]);
          } 
          
          chrome.runtime.sendMessage({
            method:"getMetas",
            metas:metaArr
          });`
        }, function() {
          // If you try it into an extensions page or the webstore/NTP you'll get an error
          if (chrome.runtime.lastError) {
            // let message = {};
            // message.innerText = 'There was an error : \n' + chrome.runtime.lastError.message;
          }
        });
      }
    }) 
    //Try adding indexed DB here;
  }
});