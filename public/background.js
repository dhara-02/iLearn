console.log('*** running background.js***');

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
    alert(tabs[0].url);
});