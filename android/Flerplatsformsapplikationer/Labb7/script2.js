// Vår array med filmer, två filmer inlagda som exempeldata
var movies = [
  {
  title: "Star Wars",
  grade: "5"
  },
  {
  title: "Titanic",
  grade: "4"
  }
];

function printMovies(){
  /* @TODO Skriver ut alla filmerna i vår array "movies" */
  $("#movie-list").html("");
  var deleteItem = "<img class='delete' src='x.png' alt='x' height='20' width='20'>"
  for (var i = 0; i < movies.length; i++) {
    var name = movies[i].title;
    var grade = movies[i].grade;
    var stars = getStars(grade);
    $("#movie-list").append("<li data-grade='" + grade + "' data-title='" + name + "'>" + name + " " + stars + deleteItem +"</li>");
  }
  $(".delete").on("click", function(){
    var item = $(this).parent();
    var i = movies.indexOf(item);
    movies.splice(i, 1);
    /* @TODO Tar bort en film från vår array */
    printMovies();
  });
 
}

$("#submit").on("click", function(e){
  /* @TODO Sparar en film i vår array "movies" när vi klickar på knappen "Spara film"
    och skriver sedan ut den uppdaterade listan av filmer genom funktionen "printMovies"
  */
  var name = $("#name").val()
  var grade = $("#grade").val()
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
    movies.push({
      title: name,
      grade: grade
    });
    printMovies();
  }
});

$("#save-movies").on("click", function(){
  /* Sparar vår array med filmer som JSON i localStorage */
	var JSONMovies = JSON.stringify(movies);
	localStorage.setItem("movies", JSONMovies);
});

$("#load-movies").on("click", function(){
  /* @TODO Läser in våra filmer från localStorage och skriver ut dessa i vår lista på sidan,
    samt sparar filmerna i vår array "movies"
  */
});

$("#sort-name").on("click", function(){
  $("#movie-list").find('li').sort(function(a, b){
    a = a.getAttribute('data-title');
    b = b.getAttribute('data-title');
    return a < b ? -1 : a > b ? 1 : 0;
  }).appendTo($("#movie-list"));
});

$("#sort").on("click", function(){
  $("#movie-list").find('li').sort(function(a, b) {
    return $(b).attr('data-grade') - $(a).attr('data-grade');
  }).appendTo($("#movie-list"));
});



function getStars(number){
  var star = "";
  for (var i = 0; i < number; i++) {
    star += "<img src='star.png' alt='star' height='20' width='20'>";
  }
  return star;
}


// Skriver ut att filmerna i vår lista när sidan laddats klart
printMovies();