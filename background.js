var saveLink = function(info) {
    var urlToSave = info.linkUrl ? info.linkUrl : info.pageUrl;
    $.ajax({
        url: urlToSave,
        success: function(data) {
            var title = data.match(/<title>(.*)<\/title>/);
            if (title !== null) {
                var siteTitle = title[0].replace('<title>', '').replace('</title>', '');
            } else {
                var siteTitle = urlToSave;
            }
            var siteTitle = $("<div/>").html(siteTitle).text();
            console.log(siteTitle);

            var link = {
                url: urlToSave,
                title: siteTitle,
                isRead: 0
            };

            addUpdateLink(link);
        }
    });
};

chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
        window.open('http://weeklydose.com');
    } else if (details.reason == "update") {

    }
});

chrome.contextMenus.create({
    title: "Save Link",
    type: "normal",
    contexts: ["link", "page"],
    onclick: saveLink
});

chrome.commands.onCommand.addListener(function(command) {
    if (command === 'save-tab') {
        chrome.tabs.query({
            active: true,
            windowType: "normal",
            currentWindow: true
        }, function(tabs) {
            var info = {
                linkUrl: tabs[0].url
            }

            saveLink(info);
        })
    }
});