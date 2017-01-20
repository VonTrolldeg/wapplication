
$( document ).ready(function() {
    //run setup functions for each site
    if( document.getElementById("uploadMedia")) {
        mediaSetUp();
    }
    if( document.getElementById("film")) {
        filmSetUp();
    }
    //get teh current position
    navigator.geolocation.getCurrentPosition(onSuccess, onFail, {});

    //uoload media
    $("#mediaForm").on("submit", function(e) {
      e.preventDefault();
      uploadMedia();
  });
});

$("#navFilm").on("click", function() {
    $("#film").show();
    $("#search").hide();

});

$("#pictures").on("click", function() {
});

$("#viewMedia").on("click", function() {
    $("#media").hide();
    $("#whatMedia").show();
});


$("#searchFilm").on("click", function() {
    $("#search").show();
    $("#result").hide();
    $("#favourite").hide();
    $("#archive").hide();

});

/*
$("#inputFilm").keyup(function(event){
    if(event.keyCode == 13){
        $("#id_of_button").click();
    }
});
*/


$("#viewFavourite").on("click", function() {
    //show favourite movie
    viewFavourite()
    $("#result").hide();
    $("#favourite").show();
    $("#search").hide();
    $("#archive").hide();
});

$("#viewArchive").on("click", function() {
    $("#viewArchive").css("background-color", "red");
    //show results at the moment
    //TODO build archive view
    displayArchive();
    $("#archive").show();
    $("#result").hide();
    $("#favourite").hide();
    $("#search").hide();
});

$("#magnifier").on("click", function() {
    var input = $("#inputFilm").val();
    searchFilm(input);
    //show results
    $("#result").show();
    $("#favourite").hide();
    $("#search").hide();
    //var searchtitel = textfield.val();
});

$("#saveTo").on("click", function() {
    $("#message").show();
    saveToArchive();
    //feedback when saved
});

$("#remove").on("click", function() {
    //remove from archive
    //look for number in id
    removeFilm();
});

$("#makeFavourite").on("click", function() {
    makeFavourite();
});

/*
$("#1").on("click", function() {
    console.log("click remove");
    var number = this.attr("id");
    console.log(number);
    removeFilm(number);
})
*/

$("#uploadMedia").on("click", function() {
  $("#uploading").show();
/*
  //get the value from
  var mediaType =
  mediaFromServer(mediatype);
  */
});

$("#pictureButton").on("click", function() {
  console.log("picture");
  mediaFromServer("photo");
});

$("#videoButton").on("click", function() {
  mediaFromServer("video");
});

$("#audioButton").on("click", function() {
  mediaFromServer("audio");
});
