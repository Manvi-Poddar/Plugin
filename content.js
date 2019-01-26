//alert('Do you wanna save the URL to Weekly Dose?')
chrome.runtime.onMessage.addListener(function (request) {
    alert(request)
})