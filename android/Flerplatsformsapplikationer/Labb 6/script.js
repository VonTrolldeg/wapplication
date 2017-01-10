// När användaren klickar på elementet med klassen "make-green" ska vi göra det elementets text grön
$("p").on("click", function(){
	// Se hur vi enl. jQuery-syntax använder "this" för att göra det elementet vi klickade på grönt
	$(this).css("color", "red")});

// När användaren klickar på en paragraf ska vi köra en anonym funktion
$("h1").hover(function(){
     $(this).css("text-decoration", "underline");
     }, function(){
     $(this).css("text-decoration", "none");
});

$("p").on("dblclick", function(){
    var currentSize = $(this).css("font-size");
    currentSize.substring(0, currentSize.length -2);
    currentSize = parseInt(currentSize);
    currentSize = currentSize + 2;
    currentSize = currentSize + "px";
    $(this).css("font-size", currentSize);
});
