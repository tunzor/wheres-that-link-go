var enabled = false;
var currentHoverLink = null;
var currentMousePos = { x: -1, y: -1 };

var pagePath = window.location.pathname;
var fullUrl = window.location.href;
var domain = window.location.origin;

// Gets current cursor position for drawing popup
$(document).mousemove(function(event) {
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
});

chrome.storage.local.get(['ext_enabled'], function(result) {
	console.log('Extension toggled: ' + result.ext_enabled);
	enabled = result.ext_enabled;
});

$(document).ready(function(){
	$("body").append(getPopup());

	$("a").hover(function(){
		chrome.storage.local.get(['ext_enabled'], function(result) {
			enabled = result.ext_enabled;
		});
		if(enabled){
			currentHoverLink = $(this).attr('href');

			console.log(currentMousePos.x + ", " + currentMousePos.y);
		    console.log(currentHoverLink);

		    updatePopup(currentHoverLink, currentMousePos.x, currentMousePos.y);
		    $("#wtlg_popup").stop(true, true).fadeIn();
		}
    }, function(){
    	if(enabled){
	   		$("#wtlg_popup").stop(true, true).fadeOut(); 
	   	}
 	});
});

function getPopup() {
	return "<div id='wtlg_popup' style='display: none; z-index: 1000; "
		+ "background-color: #e3e3e3; position: absolute;"
		+ "border: 2px solid black; left: 0px; top: 0px; font-size: 16pt;"
		+ "'</div>";
}

function updatePopup(url, left, top) {
	// Check if URL is on same domain
	if(url.includes(domain) || url.charAt(0) == "/" ) {
		$("#wtlg_popup").css("background-color", "#4fe27b");
	// Check if URL is shortened using bit.ly, goo.gl, or t.co
	} else if(url.includes("http://bit.ly") || url.includes("https://bit.ly")
			|| url.includes("http://goo.gl") || url.includes("https://goo.gl")
			|| url.includes("http://t.co") || url.includes("https://t.co")) {
		$("#wtlg_popup").css("background-color", "#f7f742");
	} else {
		$("#wtlg_popup").css("background-color", "#d8d8d8");
	}
	$("#wtlg_popup").css("left",left);
	$("#wtlg_popup").css("top",top);
	$("#wtlg_popup").html(url);
}