// if you checked 'fancy-settings' in extensionizr.com, uncomment this lines

// var settings = new Store('settings', {
//     'sample_setting': 'This is how you use Store.js to remember values'
// });

// Saves data that artoo has scraped on the page
var linkedInContact;

// Listen to the content script
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('request', request);
    if (request.status === 'scraped') {
        // Show page action icon in address bar
        chrome.pageAction.show(sender.tab.id);
        // Save to send later if the user clicks on the page action
        linkedInContact = request.scrapedData;
        sendResponse('ok');
    } else {
        sendResponse('error');
    }
  });

// Listen to the user clicking on the page action icon in the address bar
chrome.pageAction.onClicked.addListener(function(tab) {
    console.log('CLICKED');
    // Do something

    $.ajax({
        method: 'POST',
        url: 'https://api.airtable.com/v0/appFkPIUEb8ApIYqf/Contacts',
        headers: {'Authorization': 'Bearer keyUSUFogZHq7YcwU'},
        data: {
          fields: {
            'Contact Name': linkedInContact.name,
            'Current Job': linkedInContact.title,
            'Functions': [],
//            'Locations': [linkedInContact.location],
//            'Industries': [linkedInContact.industry],
            'LinkedIn Profile': 'TODO',
            'Networking Meetings': [],
            'Picture': []
          }
        },
        dataType: 'json',
        success: function(response) {
            console.log('success', response);
        },
        error: function(response) {
            console.error('error', response);
        }
    });
});