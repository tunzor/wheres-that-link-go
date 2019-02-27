var enabled = false;
chrome.storage.local.set({ext_enabled: true}, function() {
	console.log('Enabled extension');
	enabled = true;
});

chrome.browserAction.onClicked.addListener(toggleExtension);

function toggleExtension() {
	console.log("Toggling...")
	if(enabled) {
		chrome.storage.local.set({ext_enabled: false}, function() {
			console.log('Disabled extension');
			enabled = false;
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
}
