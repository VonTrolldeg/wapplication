//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

//api key cfea760019e84925f803f0f6341d95e4


/*
1 TODO fixa att poster är undifined hela tiden sök på typ hej och kolla konsollen
TODO when a poster is not found add a black image
TODO Make it possible to adda movie to favourites.
TODO add a html wiht hte info form local storage
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
    var poster = "http://image.tmdb.org/t/p/w185/" + results[i].poster_path;
    var film = {title: title, year: year , poster: poster};

    movieResult[i] = film ;
  }
  for (var i = 0; i < 10; i++) {
    var html = '<div class="col-md-4">' +
        '<div class="card">' +
          '<div class="card-block">' +
            '<img class="rounded mx-auto d-block" src="' + movieResult[i].poster +'"'+ 'alt="There is no poster">' +
            '<h4 class="text-center">' + movieResult[i].title + '</h4>' +
            '<p class="text-center">' + movieResult[i].year + '</p>' +
            '<button type="button" id="makeFavourite" class="btn btn-secondary">Make favourite</button>' +
            '<button type="button" id="saveToArchive" class="btn btn-secondary">Save</button>' +
          '</div>' +
        '</div>' +
      '</div>';
      $("#cards").append(html);
  }
}


function makeFavourite(favouriteThis) {
    //add to localStorage
    var JSONfavourite = JSON.stringify(favouriteThis);
    localStorage.setItem("favourite", JSONfavourite);
}

function viewFavourite() {
    //get the favourite titel
    var favouriteFilm = JSON.parse(localStorage.getItem("favourite"));

    if (favouriteFilm != undefined) {
    $("#cards").empty();
    var html = '<div class=".col-md-offset-4">' +
        '<div class="card">' +
          '<div class="card-block">' +
            '<h3 class="text-center"> Your favourite </h3>' +
            '<img class="rounded mx-auto d-block" src="' + favouriteFilm.poster +'"'+ 'alt="There is no poster">' +
            '<h4 class="text-center">' + favouriteFilm.title + '</h4>' +
            '<p class="text-center">' + favouriteFilm.year + '</p>' +
          '</div>' +
        '</div>' +
      '</div>';
      $("#cards").append(html);
    }
}

function saveToArchive(archiveThis) {
    //gets the film titel and year about the film and saves it to the archiv
    var archivedFilms = JSON.parse(localStorage.getItem("archive"));
    if (archivedFilms === null) {
        archiveList = [archiveThis];
        var JSONArchive = JSON.stringify(archiveList);
        localStorage.setItem("archive", JSONArchive);
    }
    else{
        archivedFilms.push(archiveThis);
        //saves a new verion of the archive over the old version
        var JSONArchive = JSON.stringify(archivedFilms);
        localStorage.setItem("archive", JSONArchive);
    }
}

function viewArchive(){
    //gets the data from archive in local storages and adds it to cars and then to the HTML
    var archivedFilms = JSON.parse(localStorage.getItem("archive"));
    if (archivedFilms === null) {
        $("#cards").empty();
		$("#cards").append("<h4>You have no movies saved in you archive <h4>");
	}
    else {
        $("#cards").empty();
        for (var i = 0; i < archivedFilms.length; i++) {
          var html = '<div class="col-md-4">' +
              '<div class="card">' +
                '<div class="card-block">' +
                  '<img class="rounded mx-auto d-block" src="' + archivedFilms[i].poster +'"'+ 'alt="There is no poster">' +
                  '<h4 class="text-center">' + archivedFilms[i].title + '</h4>' +
                  '<p class="text-center">' + archivedFilms[i].year + '</p>' +
                  '<button type="button" id="makeFavourite" class="btn btn-secondary">Make favourite</button>' +
                  "<button type='button' id='"+ i +"' class='remove btn btn-secondary'>remove</button>" +
                '</div>' +
              '</div>' +
            '</div>';
            $("#cards").append(html);
        }
    }
}

function removeFilm(number) {
  //TODO titeln är nyckel på filmen jag vill ta bort
    //find the film on that spot and remove it
    var archivedFilms = JSON.parse(localStorage.getItem("archive"));

    if (archivedFilms != undefined) {
            archivedFilms.splice(number, 1);
    }
    //set the new object to local storage
    var JSONArchive = JSON.stringify(archivedFilms);
    localStorage.setItem("archive", JSONArchive);
    $("#cards").empty();
    for (var i = 0; i < archivedFilms.length; i++) {
      var html = '<div class="col-md-4">' +
          '<div class="card">' +
            '<div class="card-block">' +
              '<img class="rounded mx-auto d-block" src="' + archivedFilms[i].poster +'"'+ 'alt="There is no poster">' +
              '<h4 class="text-center">' + archivedFilms[i].title + '</h4>' +
              '<p class="text-center">' + archivedFilms[i].year + '</p>' +
              '<button type="button" id="makeFavourite" class="btn btn-secondary">Make favourite</button>' +
              "<button type='button' id='"+ i +"' class='remove btn btn-secondary'>remove</button>" +
            '</div>' +
          '</div>' +
        '</div>';
        $("#cards").append(html);
    }
}
