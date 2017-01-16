
var archive = [
    {
        picture: "bridesmaids.jpg",
        titel: "Bridesmaids",
        year: 2011,
        time: "2h 19min"
    },
    {
        picture: "howTo.jpg",
        titel: "How to lose a guy in 10 days",
        year: 2003,
        time: "1h 56min"
    }
];

function loadArchive(){
  if (localStorage.getItem("archive")) {
     var movies = JSON.parse(localStorage.getItem("archive"));
  }
}

function printMovies(){
  /* @TODO Skriver ut alla filmerna i vår array "movies" */
  $("ul li").remove();
  for (var i = 0; i < movies.length; i++){
    $("ul").append("<li>" + movies[i].title + " - " + movies[i].grade + "</li>");
  };
}

function mediaSetUp() {
    $("#whatMedia").hide();
    $("#media").show();
}


function filmSetUp() {
    $("#favourite").hide();
    $("#result").hide();
    $("#search").hide();
    $("#archive").hide();
}

function searchFilm(userInput) {
    //TODO get the searchtext from the user and serach for that

    //calling the api with the parameters t and r titel and type
    $.ajax({
        url:"https://www.omdbapi.com/?",
        data:{
            t:'"' + userInput + '"',
            r: "json"
        }
    }).done(function(object) {
        //check the network tab in panel for more info
        displayResult(object);
    }).fail(function(object) {
        console.log("could not find the film you were looking for");
    });
}

function displayResult(movieObject) {
    //append the movie information to the html
    $("#Titel").append(movieObject.Title);
    $("#Year").append(movieObject.Year);
    $("#RunTime").append("Runtime: " + movieObject.Runtime);

    //checks whats already in the archive nad disables teh option if the film is already saved
    var archivedFilms = JSON.parse(localStorage.getItem("archive"));
    if (archivedFilms != undefined) {
        for (var i = 0; i < archivedFilms.length; i++) {
            if (archivedFilms[i].titel == movieObject.Title) {
                $("#saveTo").prop("disabled", true);
            }
        }
    }
}

function saveToArchive() {
    //gets the info about the film and saves it to the archive
    //TODO see if the film already exits
    //var savePicture = $("#picture").attr("src");
    var saveTitel = $("#Titel").html();
    var saveYear = $("#Year").html();
    var saveTime = $("#RunTime").html();
    //save as an object
    var saveThis = {titel: saveTitel, year: saveYear, time: saveTime};
    archive.push(saveThis);
    var JSONArchive = JSON.stringify(archive);
    localStorage.setItem("archive", JSONArchive);
}

function displayArchive() {
    /*1 count the number of movies in the array
    2 for loop that adds the data from each post in the array to the HTML
    3 add the html snippet to to film.html
    */
    var archivedFilms = JSON.parse(localStorage.getItem("archive"));

    if (archivedFilms != undefined) {
        for (var i = 0; i < archivedFilms.length; i++) {
            var html = "<div class='row'>"+
                "<div class=' col-sm-2'>"+
                    //"<img src='"+ archive[i].picture +"' alt='picture of film' height='100px'>" +
                "</div>"+
                "<div class=' col-sm-4'>"+
                    "<h4>" + archivedFilms[i].titel + "   " + archivedFilms[i].year + "</h4>" +
                    "<p>" + archivedFilms[i].time + "</p>" +
                "</div>" +
                "<div class='col-sm-4'>" +
                    "<button type='button' id='makeFavourite' class='btn btn-primary'>make favourite</button>" +
                    "<button type='button' id='"+ i +"' class='remove btn btn-primary'>remove</button>" +
                "</div>" +
            "</div>";
            //append the whole object to the html
            $("#displayArchive").append(html);
        }
    }

}

function makeFavourite() {
    //when you hit favvo movie its supposed to overwrite the current favvo movie
    var favvoTitel = $("#Titel").html();
    var favvoYear = $("#Year").html();
    var favvoTime = $("#RunTime").html();
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
        $("#runTime").text("Runtime: " + favouriteFilm.time);
    }
}

function removeFilm(number) {
    //find the film on that spot and remove it
    var archivedFilms = JSON.parse(localStorage.getItem("archive"));

    if (archivedFilms != undefined) {
            archivedFilms.splice(number, 1);
    }
    //set the new object to local storage
    var JSONArchive = JSON.stringify(archivedFilms);
    localStorage.setItem("archive", JSONArchive);

}

/*
geolocation
*/



function onSuccess(position){
  // position is an object that
  // get the position in latitude and longitude whe nthe user accepts it
  var lati = position.coords.latitude;
  var longi = position.coords.longitude;
  getWeather(lati, longi);
}

function onFail(){
  console.log("Vi kunde tyvärr inte hämta din plats just nu.");
}

/*
function getLocation(lati, longi) {
    console.log(lati, longi);
    var location = $.ajax({
        url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lati + longi + "&sensor=true"
    }).done(function(locationData) {
        console.log(locationData);
    }).fail(function(locationData) {
        console.log("We could not find your current position");
    })
}
*/
function getWeather(lati, longi) {
    $.ajax({
      //type the paramerters for the API lon and at and the API key
      url:"http://api.openweathermap.org/data/2.5/weather",
      dataType: "JSON",
      data:{
        lat: lati,
        lon: longi,
        APPID : "9b046b355c3c4db502a8aa20de792bc9"
      }
    }).done(function(data){
      //check the network tab for more information
      printWeather(data);
    }).fail(function(data){

    });
  };

function printWeather(data) {
    var data.main.temp
    console.log(data.weather[0].description);

}
