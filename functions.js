
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

function saveToArchive() {
    //TODO find the info about the movie and save it to the json thing
    var savePicture = $("#picture").attr("src");
    var saveTitel = $("#titel").html();
    var saveYear = $("#year").html();
    var saveTime = $("#time").html();

    var save = {titel: saveTitel, year: saveYear, time: saveTime, picture: savePicture};
    archive.push(save);
    var JSONArchive = JSON.stringify(archive);
    console.log(JSONArchive);
    localStorage.setItem("archive", JSONArchive);
}

function serachFilm(searchTerm) {
    //search in the API for the searchterm
}

function displayArchive() {
    /*1 count the number of movies in the array
    2 for loop that adds the data from each post in the array to the HTML
    3 add the html snippet to to film.html
    */
    for (var i = 0; i < archive.length; i++) {
        var html = "<div class='row'>"+
            "<div class=' col-sm-2'>" +
                "<img src='"+ archive[i].picture +"' alt='picture of film' height='100px'>" +
            "</div>"+
            "<div class=' col-sm-4'>"+
                "<h4>" + archive[i].titel + "   " + archive[i].year + "</h4>" +
                "<p>" + archive[i].time + "</p>" +
            "</div>" +
            "<div class='col-sm-4'>" +
                "<button type='button' id='makeFavourite' class='btn btn-primary'>make favourite</button>" +
                "<button type='button' id='"+ i +"' class='btn btn-primary'>remove</button>" +
            "</div>" +
        "</div>";

        $("#displayArchive").append(html);
    }

}
