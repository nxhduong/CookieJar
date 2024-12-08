const extendExpiryDatesOfAllCookies = function () {
    chrome.cookies.getAll().then(
        (cookies) => cookies.forEach(cookie => {
            cookie.expirationDate = 34_560_000 + Date.now() / 1000
        }), 
        (reason) => console.error(reason)
    )
    chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
            document.cookies
        },
        //...options
    })
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

chrome.action.onClicked.addListener(async (tab) => {
    // Set the action badge to the next state
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: await chrome.action.getBadgeText({ tabId: tab.id }) === 'ON' ? 'OFF' : 'ON',
    });
});

chrome.tabs.onActivated.addListener(extendExpiryDatesOfAllCookies)
chrome.tabs.onActiveChanged.addListener(extendExpiryDatesOfAllCookies)
chrome.tabs.onUpdated.addListener(extendExpiryDatesOfAllCookies)
chrome.webNavigation.onCompleted.addListener(extendExpiryDatesOfAllCookies)
chrome.cookies.onChanged.addListener(extendExpiryDatesOfAllCookies)