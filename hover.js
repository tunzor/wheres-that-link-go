var currentHoverLink = null;

$(document).ready(function(){
  $("a").hover(function(){
  		// Show tooltip popup
	    currentHoverLink = $(this).attr('href');
	    console.log(currentHoverLink);
    }, function(){
   		// Hide tooltip popup 
  });
});