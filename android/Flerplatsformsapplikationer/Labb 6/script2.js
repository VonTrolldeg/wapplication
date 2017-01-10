$("#tal1, #tal2").on("keyup", function(){
	console.log("Du skrev nått!");
	if ($("#tal1").val() == "" || $("#tal2").val() == "") {
		console.log("tom");
		$("#sum").val("Fyll i fält 1 och 2");
	}
	
	else {
		var tal1 = $("#tal1").val();
		var tal2 = $("#tal2").val();
		var sum = tal1*tal2
		$("#sum").val(sum);
	}
});