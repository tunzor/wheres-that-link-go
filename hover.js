//TODO: expand bit.ly and other shortened links
//TODO: changing background colour based on internal/external link

var enabled = false;
var currentHoverLink = null;
var currentMousePos = { x: -1, y: -1 };

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
		+ "border: 2px solid green; left: 0px; top: 0px; font-size: 16pt;"
		+ "'</div>";
}

function updatePopup(url, left, top) {
	$("#wtlg_popup").css("left",left);
	$("#wtlg_popup").css("top",top);
	$("#wtlg_popup").html(url);
}