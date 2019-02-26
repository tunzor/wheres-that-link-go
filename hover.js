//TODO: toggling of extension
//TODO: changing background colour based on internal/external link
//TODO: dynamic popup size
//TODO: extend popup to left if on right side

var enabled = false;
var currentHoverLink = null;
var currentMousePos = { x: -1, y: -1 };

// Enabling extension
// chrome.storage.local.set({ext_enabled: true}, function() {
// 	enabled = true;
// 	console.log('Hover: Extension enabled');
// });

// Listening to extension button
//chrome.browserAction.onClicked.addListener(toggleExtension());

// Gets current cursor position for drawing popup
$(document).mousemove(function(event) {
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
});

chrome.storage.local.get(['ext_enabled'], function(result) {
	enabled = result.ext_enabled;
	console.log('Hover: Extension enabled: ' + result.ext_enabled);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "hello")
      console.log('Message received');
  });

$(document).ready(function(){
	chrome.storage.local.get(['ext_enabled'], function(result) {
		enabled = result.ext_enabled;
	});

	if(enabled) {
		// Initially add popup to body
		$("body").append(getPopup());

		$("a").hover(function(){
			if(isEnabled){
				currentHoverLink = $(this).attr('href');

				console.log(currentMousePos.x + ", " + currentMousePos.y);
			    console.log(currentHoverLink);

			    updatePopup(currentHoverLink, currentMousePos.x, currentMousePos.y);
			    $("#wtlg_popup").stop(true, true).fadeIn();
			}
	    }, function(){
	    	if(isEnabled){
		   		$("#wtlg_popup").stop(true, true).fadeOut(); 
		   	}
	 	});
	}
});

function getPopup() {
	return "<div id='wtlg_popup' style='display: none; z-index: 1000; "
		+ "background-color: #e3e3e3; position: absolute; height: 30px; "
		+ "border: 2px solid green; width: 400px; left: 0px; top: 0px;'</div>";
}

function updatePopup(url, left, top) {
	$("#wtlg_popup").css("left",left);
	$("#wtlg_popup").css("top",top);
	$("#wtlg_popup").html(url);
}

function isEnabled() {
	chrome.storage.local.get(['ext_enabled'], function(result) {
		return result.ext_enabled;
	});
}
// function toggleExtension() {
// 	if(enabled) {
// 		chrome.storage.local.set({ext_enabled: false}, function() {
// 			enabled = false;
// 			console.log('Hover: Extension disabled');
// 		});
// 	} else {
// 		chrome.storage.local.set({ext_enabled: true}, function() {
// 			enabled = true;
// 			console.log('Hover: Extension enabled');
// 		});
// 	}
// }