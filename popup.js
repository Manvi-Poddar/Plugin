var _gaq = _gaq || [];

var getCurrentTab = function(callBack) {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tabs) {
        var newLink = {
            title: tabs[0].title,
            url: tabs[0].url,
            isRead: 0
        }
        callBack(newLink);
    });
};
var getLink = function(key, callBack) {
    chrome.storage.sync.get(key, function(link) {
        var linkObject = link[key];
        linkObject.key = key;
        callBack(linkObject);
    });
};

var getLinks = function(callBack) {
    chrome.storage.sync.get(function(currentLinks) {
        callBack(currentLinks);
    });
};

var addUpdateLink = function(link) {
    var dateAdded = new Date();
    link.title = link.title + ' (' + link.url + ')';
    var addLink = {
        url: link.url,
        title: link.title.replace('"', '').replace('\'', ''), //Prevent quotes from being in title
        isRead: link.isRead,
        dateAdded: dateAdded.toISOString()
    };

    var newLinkObject = {};
    var key = addLink.url;
    newLinkObject[key] = addLink;

    chrome.storage.sync.set(newLinkObject, function() {
        console.log('Saved link: ', addLink.url);
        getLinks(refreshLinkList);
    });

    _gaq.push(['_trackEvent', 'Link saved', 'clicked']);
};

googleAnalytics();
    _gaq.push(['_trackEvent', 'Extension Opened', 'clicked']);

    setTimeout(function() {
        getLinks(refreshLinkList);
    }, 100);

    $('.saveButton').click(function() {
        getCurrentTab(addUpdateLink);
    });








// document.addEventListener('DOMContentLoaded', function () {

//     const bg = chrome.extension.getBackgroundPage()
//     Object.keys(bg.bears).forEach(function (url) {
//       const div = document.createElement('div')
//       div.textContent = `${url}: ${bg.bears[url]}`
//       document.body.appendChild(div)
//     })
  
// $(function(){
//     chrome.storage.sync.get(['total'],function(budget){
//         $('#total').text(budget.total);
//     });

//     $('#spendAmount').click(function(){
//         chrome.storage.sync.get(['total'],function(budget){
//             var newTotal = 0;
//             if (budget.total){
//                 newTotal += parseInt(budget.total);
//             }

//             var amount = $('#amount').val();
//             if (amount){
//                 newTotal += parseInt(amount);//update value-use badges
//             }
//             chrome.storage.sync.set({'total': newTotal}, function(){          //notifications     
//                 if (amount && newTotal >= budget.limit){
//                     var notifOptions = {
//                         type: "basic",
//                         iconUrl: "icon48.png",
//                         title: "Limit reached!",
//                         message: "Uh oh, look's like you've reached your alloted limit."
//                 };
//                 chrome.notifications.create('limitNotif', notifOptions);

//             }
//         });
//         $('#total').text(newTotal);
//         $('#amount').val('');
//     });

//     chrome.storage.onChanged.addListener(function(changes, storageName){             //badges updation
//         chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
    
// });