
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
    $("#uploading").hide();
    $("#media").show();

}

function filmSetUp() {
    $("#favourite").hide();
    $("#result").hide();
    $("#search").hide();
    $("#archive").hide();
}

/*
mimmis sökningsfunktion som visar flera resultat och appendar knappar
*/

/*
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
*/

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
    var kelvin = data.main.temp;
    var description = data.weather[0].description;
    var celcius = (kelvin - 273.15);
    var temp = celcius.toFixed(1);
    $("#description").html(description);
    $("#temp").html(temp + " degrees celcius");
}

/*
media
*/

function mediaFromServer(mediaType){
  console.log(mediaType);
    $.ajax({
      //call the server with its url and parameterns - action and mediatype
      url:"server.php",
      data:{
        action: "getMedia",
        type: mediaType
      },
      dataType: "JSON"

    }).done(function(dataObject){
      //run the function that prints the media to the webpage
      console.log(dataObject);
      //parse the object to json format
      var jsonFiles = JSON.parse(dataObject);
      var allFiles = jsonFiles.files;
      displayMedia(allFiles);

    }).fail(function(dataObject){
      console.log("Could not load the selected mediatype from server");
    });
  };

function displayMedia(allFiles){
  console.log(allFiles);
  //forloop som går igenom aalla filer, en ifsats som går igenom alla type och jämför den med den som användaren vill ha
  //loop through all the files
    for(var i = 0; i < dataObject.files.length; i++ ){
      if(data.files[i].type == "photo"){
        $("#").append('<img src="' + data.files[i].path + '"/>');
      }
      else if (dataObject.files[0].type == "audio") {
        //ladda in en
          $("#").append('<audio controls><source src="horse.ogg" type="audio/ogg"><source src="horse.mp3" type="audio/mpeg">Your browser does not support the audio tag.</audio>')
      }
      else if (dataObject.files[0].type == "video") {
        $("#").append('video width="320" height="240" autoplay> <source src="{{HÄR SKA VIDEON IN}}" type="video/mp4"> <source src="movie.ogg" type="video/ogg"> Your browser does not support the video tag. </video>')
      }
    };

    //$("article").append('<img src="' + data.files[0].path + '"/>');
    //$("#year").text(film.Year);
};

function uploadMedia() {
  $('#mediaForm').ajaxSubmit({
    success: function(data) {
      console.log(data); // se exempelsvar nedan
      $('#mediaForm')[0].reset();
      console.log("the file is saved in the database");
    },
  //felhantering, om uppladdningen misslyckas visas detta felmeddelande.
    error: function() {
      console.log("something went wrong");
    },
  //använder ett plugin, visar uppladdningen i procent.
    uploadProgress: function(event, position, total, percent) {
      $("#status").text("Filen laddas upp: " + percent + "% klart av 100%");
      if (percent == 100){
        $('#status').text("");
      }
    }
  });
}
