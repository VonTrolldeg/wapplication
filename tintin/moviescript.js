//körs när man trycker på knappen 
movielist = [];

$("#get-movie").on("click", function(){
	$('#results').html("");
	var input = $("#search").val();
		//hämtar api
		$.ajax({
		url: "http://www.omdbapi.com/?t=" + input,
		type: "get",
		dataType: "JSON",
		data: {
			s: input 
		},
		
			
	}).done(function(results){
	//för varje film i arrayen så kommer de läggas till som en lista i html-dok.//

		if(results.Response == "True"){
			$.each(results["Search"], function(index, movie){
				 var title = movie["Title"];
				 var year = movie["Year"];
				 var cover = movie["Poster"];
				 $('#results').append("<figure> <img src=" + cover + " class='bilder' >" + title + " (" + year + ")<br/> <button class='fav btn btn-info' id='"+title+"'>Favorit</button> <button class='save btn btn-info' id='"+title+"'>Arkiv</button> </figure>");  
				 
			});
			
		}else {
			$('#results').append('<p>'+results.Error+"</p>");
		};
		event.preventDefault();
	});
});
		
		

$(document).on('click', '.save', function(){
	var titlen = $(this).attr("id");
	
	localStorage.setItem($(this).attr("id"), JSON.stringify(titlen));
												
	movielist.push(titlen);
	alert("Filmen " + titlen + " har nu sparats i arkivet");	
							
});

		


//hämtar alla olika delar av den film man valt som sin favoritfilm. läggs sedan till i elementet #favMovie
//genom att gå igenom alla de olika syskonelementen
$(document).on('click', '.fav', function(){
	var favorit = $(this).attr("id");
		console.log(favorit);
	$('#favMovie').html("");
	$("#favMovie").append("<p> Din favoritfilm är: <strong>" + favorit + "</strong> </p>" );
		
});
	
	
$(document).ready(function(){
	//hämtar filmerna i localStorage
	var movies= localStorage.length;
	
	if (movies == 0 ){
		$("#loadMovies").append("<p>Det finns inga filmer sparade i ditt arkiv. </p>");
	}
	else {
		for (var i = 0, len = localStorage.length; i < len; ++i){
		  var input = localStorage.getItem(localStorage.key(i));
		

			$.ajax({
				url: "http://www.omdbapi.com/?t=" + input,
				type: "get",
				dataType: "JSON",
			
			}).done(function(results){
				
				var name = results.Title;
				var ye = results.Year;
				var pic = results.Poster;
				var run= results.Runtime;
				//hämtar elementet och lägger in figurer för varje sparad film				
				$("#loadMovies").append("<figure><img src=" + pic + "><p> Namn: " + name + " År :" + ye + " Speltid: "+ run + "</p><br> <button class='delete btn btn-info' id='"+name+"'>Radera filmen</button></figure>");
			
			
				$(document).on('click', '.delete', function(){
					var radera = $(this).attr("id");	
					console.log(radera);
					
					for(var i=0;i<localStorage.length; i++) {
								if($(this).attr("id") == localStorage.key(i)){
									localStorage.removeItem($(this).attr("id"));
								};	
							};
						//gömmer button
						$(this).hide();
						//gömmer cover
						$(this.previousSibling.previousSibling.previousSibling.previousSibling).hide();
						//gömmer text-strängen för filmen
						$(this.previousSibling.previousSibling.previousSibling).hide();
						
					
				});
	
			});
		}
	};
});