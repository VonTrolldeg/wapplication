
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


$('#art').on("click", function() {
  viewFavourite();
});
