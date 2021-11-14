var activity = new Activity();
var storage = new LocalStorage();

console.log('*** running background.js***');

function addListener() {
    chrome.tabs.onActivated.addListener(function(info) {
        chrome.tabs.get(info.tabId, function(tab) {
            activity.addTab(tab);
        });
    });

    chrome.storage.onChanged.addListener(function(changes, namespace) {
        console.log("changes: ", changes);
        for (var key in changes) {
            console.log("key: ", key);
        }
    });
}
