chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({
        url: chrome.extension.getURL('popup.html'),
        active: false
    }, function (tab) {
        chrome.windows.create({
            tabId: tab.id,
            type: 'popup',
            focused: true,
            width: 350,
            height: 350,
            top: 100,
            left: 1500
        });
    });
});