//TODO: toggling of extension
//TODO: changing background colour based on internal/external link
//TODO: dynamic popup size
//TODO: extend popup to left if on right side

var currentHoverLink = null;

var currentMousePos = { x: -1, y: -1 };
// Gets current cursor position for drawing popup
$(document).mousemove(function(event) {
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
});

$(document).ready(function(){
	// Initially add popup to body
	$("body").append(getPopup());

	$("a").hover(function(){
		currentHoverLink = $(this).attr('href');

		console.log(currentMousePos.x + ", " + currentMousePos.y);
	    console.log(currentHoverLink);

	    updatePopup(currentHoverLink, currentMousePos.x, currentMousePos.y);
	    $("#wtlg_popup").show();
    }, function(){
   		$("#wtlg_popup").hide(); 
 	});
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
