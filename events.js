
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
      $("#replace").delete();
  });
});

$("li").on("click", function(){
    console.log("kör den ens det här?!");
   var hej = $("li").find(".active") //.removeClass("active");
   console.log(hej);
   $(this).addClass("active");
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
    $("#uploading").hide();
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
    //$("#viewArchive").css("background-color", "red");
    //show results at the moment
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

$("#filmDispalyResult").on("click", ".saveTo", function() {
    var titel = $(this).parent().prev().prev().prev().text();
    var year = $(this).parent().prev().prev().text();
    saveToArchive(titel, year);
    //TODO feedback when saved
});

$("#displayArchive").on("click", ".remove", function() {
  //run this när den
    var removeThis = $(this).prev().prev().text();
    console.log(removeThis);
    removeFilm(removeThis);
});

$("#makeFavourite").on("click", function() {
    makeFavourite();
});

$("#uploadMedia").on("click", function() {
  $("#uploading").show();
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
