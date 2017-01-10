$("#form").on("submit", function(e){
    e.preventDefault();
    $("#list").empty();
    $("#list").append("<h2>Sökresultat:</h2><ul id='movie-list'></ul>");
	var title = $("#search").val()
    validate = true;
    
    if (title.length < 3){
        $("#search").css("background-color", "red");
        validate = false;
    }
    else {
        $("#search").css("background-color", "white")
    }
    
    if(validate == true){
		getMovie(title);
    }

    
    $("#form").trigger("reset");
});

function getMovie(title) { 
    $.ajax({
        url:"http://www.omdbapi.com/?",
        data:{
            s: '"'+ title + '"',
            r: "json"
        }
    }).done(function(data){
      //kolla i nätverksfilen i kontrollpanelen på hemsidan.
      console.log(data.Search[0].Title);
      printMovie(data);

    }).fail(function(data){
      console.log("fail");
    });
}
function printMovie(data){
    for (var i = 0; i < data.Search.length; i++) {
        $("#movie-list").append("<li class='movieSearch' data-title='" + data.Search[i].Title + "'><p id='movieName'>" + data.Search[i].Title + ", (" + data.Search[i].Year + ")</p><button class='arkiv', 'buttons, btn btn-default'>Lägg till i arkiv</button><button class='favorit','buttons, btn btn-default'>Lägg till som favorit</button></li>");
    };
    $(".favorit").on("click", function(){
            localStorage.setItem("favoritfilm",$(this).parent().children("p").eq(0).text());
        });
    $(".arkiv").on('click', function(){
        localStorage.setItem("arkiv",$(this).parent().children("p").eq(0).text());
    });
}

$(document).ready(function() {
    var favorit = localStorage.getItem("favoritfilm");
    $("#favfilm").append(favorit);
});

/*
$(document).ready(function() {
  $('#myForm').on("submit", function(e){
    e.preventDefault();
    $('#myForm').ajaxSubmit(function(data) {
    console.log(data); // se exempelsvar nedan
    });
  });
});


$(document).ready(function() {
    $.ajax({
        url:"server.php?action=getMedia&type=photo"
    }).done(function(data){
        for (var i = 0; i < data; i++) {
            console.log([i]);
        };
    });


});
*/


