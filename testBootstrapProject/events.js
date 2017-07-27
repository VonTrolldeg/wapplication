
$("#art").on("click", function() {
  var searchInput = $('#inputField').val();
  if (searchInput.length != 0 ) {
    searchFilm(searchInput);
    $('#inputField').val(" ");
  }
});

$('#inputField').keypress(function (e) {

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
  console.log("knark ");
  //makeFavourite()
});
