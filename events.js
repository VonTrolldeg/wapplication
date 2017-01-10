
$( document ).ready(function() {
    if( document.getElementById("uploadMedia")) {
        mediaSetUp();
    }
    if( document.getElementById("film")) {
        filmSetUp();
    }
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
    var inputFilm = $("#inputFilm").val();
    serachFilm(inputFilm);
    $("#search").show();
    $("#result").hide();
    $("#favourite").hide();
    $("#archive").hide();

});

$("#viewFavourite").on("click", function() {
    //show favourite movie
    $("#result").hide();
    $("#favourite").show();
    $("#search").hide();
    $("#archive").hide();
});

$("#viewArchive").on("click", function() {
    //show results at the moment
    //TODO build archive view
    displayArchive();
    $("#archive").show();
    $("#result").hide();
    $("#favourite").hide();
    $("#search").hide();
});

$("#magnifier").on("click", function() {
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
