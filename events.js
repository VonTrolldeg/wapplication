
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
      uploadMedia();
  });
});

$("#navFilm").on("click", function() {
    //set class to active
    $("#navFilm").addClass("active");
    $("#navWeather").removeClass("active");
    $("#navMedia").removeClass("active");
    $("#film").show();
    $("#search").hide();

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
