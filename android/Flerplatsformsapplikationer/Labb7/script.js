$("#newsletter").on("submit", function(e){
	e.preventDefault();
	var name = $("#name").val()
	var grade = $("#grade").val()
	var deleteItem = "<img class='delete' src='x.png' alt='star' height='20' width='20'>"

	validate = true;

	if (name.length == 0){
		$("#name").css("background-color", "red");
		validate = false;
	}
	else {
		$("#name").css("background-color", "white")
	}

	if (grade == "choose"){
		$("#grade").css("background-color", "red");
		validate = false;
	}
	else {
		$("#grade").css("background-color", "white")
	}

	if(validate == true){
		var stars = getStars(grade);
		$("#movie-list").append("<li data-grade='" + grade + "' data-title='" + name + "'>" + name + " " + stars + deleteItem +"</li>");
		$(".delete").on("click", function(){
			$(this).parent().remove();
		});
	}
	$("#sort").on("click", function(){
		$("#movie-list").find('li').sort(function(a, b) {
			return $(b).attr('data-grade') - $(a).attr('data-grade');
		}).appendTo($("#movie-list"));
	});
	$("#sort-name").on("click", function(){
		$("#movie-list").find('li').sort(function(a, b){
			a = a.getAttribute('data-title');
			b = b.getAttribute('data-title');
			return a < b ? -1 : a > b ? 1 : 0;
		}).appendTo($("#movie-list"));
	});

	$("#newsletter").trigger("reset");

});

function getStars(number){
	var star = "";
	for (var i = 0; i < number; i++) {
		star += "<img src='star.png' alt='star' height='20' width='20'>";
	}
	return star;
}





// "<img src='star.png' alt='star' height='15' width='15'></img>"