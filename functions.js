
/*
TODO lägg till en svart bild om den inte hittar bilden
TODO kolla så filmen sparas i local storage och kan Hämtas
*/

function printMovies(){
  $("ul li").remove();
  for (var i = 0; i < movies.length; i++){
    $("ul").append("<li>" + movies[i].title + " - " + movies[i].grade + "</li>");
  };
}

function mediaSetUp() {
    $("#whatMedia").hide();
    $("#uploading").hide();
    $("#media").show();
    $("#viewing").hide();
}

function filmSetUp() {
    $("#favourite").hide();
    $("#result").hide();
    $("#search").hide();
    $("#archive").hide();
}

function searchFilm(userInput) {
    //empty all the posts
    $("#Titel").html("");
    $("#Year").html("");
    //calling the api with the parameters t and r titel and type

    $.ajax({
        url:"http://www.omdbapi.com/?i=tt3896198&apikey=df305af",
        data:{
            s:'"' + userInput + '"',
            r: "json"
        }
    }).done(function(movieObject) {
        //check the network tab in panel for more info
        displayResult(movieObject);
    }).fail(function(movieObject) {
        $("#filmDispalyResult").empty();
        $("#filmDispalyResult").html("Something went wrong when we were looking for your film");
        console.log("could not find the film you were looking for");
    });
}

function displayResult(movieObject) {
    //add the movie information to the html
    $("#filmDispalyResult").empty();
    $.each(movieObject["Search"], function(index, movie){

      var title = movie["Title"];
      var year = movie["Year"];
      var cover = movie["Poster"];
      var html = '<div class="filmDisplay col-md-4 col-md-offset-2">' +
          '<h3>Resulstat</h3>' +
          '<img id="picture" src="'+ cover +'"alt="poster of your favorite film" height="300px">' +
          '<div class="row">' +
          '<div class="textright col-xs-8 col-sm-3 col-md-4">' +
          '<h3 id="Titel">'+ title +'</h3>'+
          '</div>' +
          '<div class="textleft col-xs-2 col-sm-3 col-md-4">' +
          '<h4 id="Year">' + year +'</h4>' +
          '</div>' +
          '<div class="textleft col-xs-0 col-sm-3 col-md-4">' +
          '</div>' +
          '<div class="btn-group" role="group" aria-label="Basic example">' +
          '<button type="button" id="makeFavourite" class="btn btn-primary">make favourite</button>' +
          '<button type="button" class="saveTo" class="btn btn-primary">save to archive</button>' +
          '</div>' +
          '<p id="message"> </p>' +
          '</div>' +
          '</div>';

          $("#filmDispalyResult").append(html);
    });
}

function saveToArchive(filmTitel, filmYear) {
    //gets the film titel and year about the film and saves it to the archive

    var archive = JSON.parse(localStorage.getItem("archive"));
    console.log(archive);
    var saveThis = {titel: filmTitel, year: filmYear};
    archive.push(saveThis);
    //saves a new verion of the archive over the old version
    var JSONArchive = JSON.stringify(archive);
    localStorage.setItem("archive", JSONArchive);
}

function displayArchive() {
    /*1 count the number of movies in the array
    2 for loop that adds the data from each post in the array to the HTML
    3 add the html snippet to to film.html
    */
    $("#displayArchive").empty();
    var archivedFilms = JSON.parse(localStorage.getItem("archive"));
    if (archivedFilms != undefined) {
        for (var i = 0; i < archivedFilms.length; i++) {
            var html = "<div class='row'>"+
                "<div class=' col-sm-2'>"+
                    //"<img src='"+ archive[i].picture +"' alt='picture of film' height='100px'>" +
                "</div>"+
                "<div class=' col-sm-4'>"+
                    "<h3>" + archivedFilms[i].titel + "</h3>" +
                    "<h4>" + archivedFilms[i].year + "</h4>" +
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

function makeFavourite(favouriteThis) {
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
      //parse the object to json format
      var allFiles = dataObject.files;
      displayMedia(allFiles);
    }).fail(function(dataObject){
      console.log("Could not load the selected mediatype from server");
    });
  };

function displayMedia(allFiles){
  //add as many boxes for media as length of list
  $("#gallery").empty();

      for (var i = 0; i < allFiles.length; i++) {
          //gets the title from this object
          var title = allFiles[i].title;

          if(allFiles[i].type == "photo"){
             //collects the image and the title in variables
             var img = "<img src=" + allFiles[i].path + " width='320' >";
             //puts variables in the HTML
             $("#gallery").append(
               "<div class='imgage col-md-3 col-lg-3'> "+
               "<figure class='img'>" + img + "<p>" + title + "</p></figure>" +
               "</a>" +
               "</div> <!-- col-6 / end -->");
           }
           else if(allFiles[i].type == "audio"){
               $("#gallery").append(
                   "<div class='audio col-md-3 col-lg-3'> "+
                   "<figure class='img'>" + "<img src='images/audioIcon.jpg' width='320' ></figure>" +
                   "<audio controls><source src='" + allFiles[i].path + "' type='audio/mpeg'>Your browser does not support the audio tag.</audio>" +
                   "<p>" + title + "</p>" +
                 "</a>" +
                 "</div> <!-- col-6 / end -->");
           }
           else if (allFiles[i].type == "video"){
               $("#gallery").append(
                   "<div class='video col-md-3 col-lg-3'> "+
                   "<video class='vid' controls><source src='" + allFiles[i].path + "' type='video/mp4'></video>" +
                   "<p>" + title + "</p>"+
                   "</a>" +
                   "</div> <!-- col-6 / end -->");
           }
       }
}

function uploadMedia() {
    //search for the media type in the database
    $('#mediaForm').ajaxSubmit({
    success: function(data) {
      $('#mediaForm')[0].reset();
      $('#status').html("Upload done!");
      console.log("the file is saved in the database");
    },
    //felhantering, om uppladdningen misslyckas visas detta felmeddelande.
    error: function() {
      $('#status').html("Something with the upload went wrong");
    }
  });


}
