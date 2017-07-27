//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

//api key cfea760019e84925f803f0f6341d95e4


/*

Make it possible to adda movie to favourites.
When I now press make favourites nothing happens and I am too tird to solve it¨
*/

function searchFilm(searchInput) {
    //calling the api with the parameters t and r titel and type

    $.ajax({
        url:"https://api.themoviedb.org/3/search/movie?",
        data:{

            query:'"' + searchInput + '"',
            api_key : "cfea760019e84925f803f0f6341d95e4"
        }
    }).done(function(movieObject) {
        $("#cards").empty();
        //check the network tab in panel for more info

        //add the results to the HTML
        addResults(movieObject.results);

    }).fail(function(movieObject) {
        $("#cards").empty();
        $("#cards").html("Something went wrong when we were looking for your film");
        console.log("could not find the film you were looking for");
    });
}


function addResults (results) {
  var movieResult = [];
  for (var i = 0; i < results.length; i++) {
    var title = results[i].title;
    var year = results[i].release_date;
    var poster = results[i].poster_path;
    var film = {title: title, year: year , poster:"http://image.tmdb.org/t/p/w185/" + poster};
    movieResult[i] = film;

  }
  for (var i = 0; i < 10; i++) {
    var html = '<div class="col-md-4">' +
        '<div class="card">' +
          '<div class="card-block">' +
            '<img class="rounded mx-auto d-block" src="' + movieResult[i].poster +'"'+ 'alt="Interstellar Poster">' +
            '<h4 class="text-center">' + movieResult[i].title + '</h4>' +
            '<p class="text-center">' + movieResult[i].year + '</p>' +
            '<button type="button" id="makeFavourite" class="btn btn-secondary">Make favourite</button>' +
          '</div>' +
        '</div>' +
      '</div>';
      $("#cards").append(html);
  }

}


function makeFavourite() {
    //when you hit favvo movie its supposed to overwrite the current favvo movie
    var favvoTitel = $("#Titel").html();
    var favvoYear = $("#Year").html();
    var favouriteThis = {titel: favvoTitel, year: favvoYear, time: favvoTime};
    //add to localStorage
    var JSONfavourite = JSON.stringify(favouriteThis);
    localStorage.setItem("favourite", JSONfavourite);
}

function viewFavourite() {
    //get the favourite titel
    var favouriteFilm = JSON.parse(localStorage.getItem("favourite"));
    if (favouriteFilm != undefined) {
        $("#titel").text(favouriteFilm.titel);
        $("#year").text(favouriteFilm.year);
    }
}
