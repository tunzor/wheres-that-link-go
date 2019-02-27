var enabled = false;
// Set ext_enabled variable in storage to be used in hover.js
chrome.storage.local.set({ext_enabled: true}, function() {
	console.log('Enabled extension');
	enabled = true;
});

// Runs toggleExtension function when extension button in toolbar is clicked
chrome.browserAction.onClicked.addListener(toggleExtension);

function toggleExtension() {
	console.log("Toggling...")
	if(enabled) {
		chrome.storage.local.set({ext_enabled: false}, function() {
			console.log('Disabled extension');
			enabled = false;
			// Changes extension icon in toolbar
			chrome.browserAction.setIcon({
				path: {
					"32":"images/hand_faded-32.png"
				}
			});
		});
	} else {
		chrome.storage.local.set({ext_enabled: true}, function() {
			console.log('Enabled extension');
			enabled = true;
			chrome.browserAction.setIcon({
				path: {
					"32":"images/hand-32.png"
				}
			});
		});
	}
	// Refresh required to apply changes
	chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
	    chrome.tabs.reload(arrayOfTabs[0].id);
	});
}
