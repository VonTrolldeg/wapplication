$(document).ready(function() {
  $('#myForm').on("submit", function(e){
    e.preventDefault();
    $('#myForm').ajaxSubmit(function(data) {
    console.log(data); // se exempelsvar nedan
    });
  });
});

$(document).ready(function() {
	$.ajax({
		url:"server.php?action=getMedia&type=photo"
	}).done(function(data){
		for (var i = 0; i < data; i++) {
			console.log([i]);
		};
	});


});