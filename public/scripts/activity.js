'use strict';

class Activity {
    addTab(tab) {
        console.log('adding tab: ',tab);
    }

    isValidPage(tab) {
        if (!tab || !tab.url || (tab.url.indexOf('http:') == -1 && tab.url.indexOf('https:') == -1)
            || tab.url.indexOf('chrome://') !== -1
            || tab.url.indexOf('chrome-extension://') !== -1)
            return false;
        return true;
    }

    getTab(domain) {
        if (tabs !== undefined)
            return tabs.find(o => o.url.isMatch(domain));
    }
};