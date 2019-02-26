chrome.browserAction.onClicked.addListener(toggleExtension);

var enabled = false;
chrome.storage.local.get(['ext_enabled'], function(result) {
	enabled = result.ext_enabled;
});

function toggleExtension() {
	console.log("Toggling...")
	if(enabled) {
		chrome.storage.local.set({ext_enabled: false}, function() {
			console.log('Disabled extension');
			chrome.browserAction.setIcon({path: 'images/hand_128_faded.png'});
			enabled = false;
		});
	} else {
		chrome.storage.local.set({ext_enabled: true}, function() {
			console.log('Enabled extension');
			chrome.browserAction.setIcon({path: 'images/hand_128.png'});
			enabled = true;
		});
	}
}