document.addEventListener('DOMContentLoaded', function () {

    const bg = chrome.extension.getBackgroundPage()
    Object.keys(bg.bears).forEach(function (url) {
      const div = document.createElement('div')
      div.textContent = `${url}: ${bg.bears[url]}`
      document.body.appendChild(div)
    })
  
$(function(){
    chrome.storage.sync.get(['total'],function(budget){
        $('#total').text(budget.total);
    });

    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total'],function(budget){
            var newTotal = 0;
            if (budget.total){
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amount').val();
            if (amount){
                newTotal += parseInt(amount);//update value-use badges
            }
            chrome.storage.sync.set({'total': newTotal}, function(){          //notifications     
                if (amount && newTotal >= budget.limit){
                    var notifOptions = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Limit reached!",
                        message: "Uh oh, look's like you've reached your alloted limit."
                };
                chrome.notifications.create('limitNotif', notifOptions);

            }
        });
        $('#total').text(newTotal);
        $('#amount').val('');
    });

    chrome.storage.onChanged.addListener(function(changes, storageName){             //badges updation
        chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
    
});