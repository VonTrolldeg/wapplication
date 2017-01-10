
$(document).ready(function() {
	$("#name").on("input", function() {
		var name = $(this);
		var is_name = name.val();
		if (is_name){
			name.removeClass("invalid").addClass("valid");}
		else {
			name.removeClass("valid").addClass("invalid");}
	});

	$("#age").on("input", function() {
		var age = $(this);
		var is_age = age.val();
		if (is_age){
			age.removeClass("invalid").addClass("valid");}
		else{
			age.removeClass("valid").addClass("invalid");}
	});

	$("#mail").on("input", function() {
		var mail = $(this);
		var is_mail = mail.val();
		if (is_mail){
			mail.removeClass("invalid").addClass("valid");}
		else {
			mail.removeClass("valid").addClass("invalid");}

	});
});