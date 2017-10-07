
/*MOVIE EVENTS*/
$('#searchButton').on("click", function() {
//when you in the input field and hit enter it searches for that
    var searchInput = $('#inputField').val();
    searchFilm(searchInput);
    $('#inputField').val(" ");
});

$('#inputField').keypress(function (e) {
//when you in the input field and hit enter it searches for that
  var key = e.which;
  if ( key == 13) {
    var searchInput = $('#inputField').val();
    if (searchInput.length != 0 ) {
        searchFilm(searchInput);
        $('#inputField').val(" ");
    }
  }
});

$('#cards').on('click', '#makeFavourite', function(){
  //when the user clicks on the dynamically added button for make favourite
  var title = $(this).siblings("h4").text();
  var year = $(this).siblings("p").text();
  var poster = $(this).siblings("img").attr("src");

  var favouriteMovie = {title: title, year: year , poster: poster};
  //an object with the movie is sent to a function that stores it in local storage
  makeFavourite(favouriteMovie)

});

$('#cards').on('click', '#saveToArchive', function(){
  //when the user clicks on the dynamically added button for save to favourite
  var title = $(this).siblings("h4").text();
  var year = $(this).siblings("p").text();
  var poster = $(this).siblings("img").attr("src");

  var archiveThis = {title: title, year: year , poster: poster};
  //an object with the movie is sent to a function that stores it in local storage
  saveToArchive(archiveThis);

});


$('#art').on("click", function() {
  viewFavourite();
});

$('#buttonFavourite').on("click", function() {
  viewFavourite();
});

$('#buttonArchive').on("click", function() {
  viewArchive();
});

$("#cards").on("click", ".remove", function() {
  //run this när den
    var removeThis = $(this).prev().prev().text();
    removeFilm(removeThis);
});


/* MEDIA EVENTS */

$("#viewMedia").on("click", function() {
    $(".buttonsMedia").show();
    $(".uploadMedia").hide();
    $("#whatMedia").show();

});

$("#uploadMedia").on("click", function() {
    $(".buttonsMedia").hide();
  $(".uploadMedia").show();
  $("#viewing").show();

});

$("#selectType").change(function(){
  var selectedType = $("#selectType").val();
  if (selectedType == "photo"){
    //lol error handling
    selectedType = "image";
  }
  var html = '<input type="file" id="replace" name="media" accept="' +selectedType+'/*" class="btn btn-default">';
  $("#replace").replaceWith(html);
});

$("#pictureButton").on("click", function() {
  $("#viewing").show();
  $("#uploading").hide();
  mediaFromServer("photo");
});

$("#videoButton").on("click", function() {
  $("#viewing").show();
  $("#uploading").hide();
  mediaFromServer("video");
});

$("#audioButton").on("click", function() {
  $("#viewing").show();
  $("#uploading").hide();
  mediaFromServer("audio");
});
