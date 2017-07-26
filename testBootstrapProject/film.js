//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
console.log("film");
//api key cfea760019e84925f803f0f6341d95e4
function searchFilm() {
    console.log("hej");
    //calling the api with the parameters t and r titel and type

    $.ajax({
        url:"https://api.themoviedb.org/3/search/movie?",
        data:{

            query:'"' + "frozen" + '"',
            api_key : "cfea760019e84925f803f0f6341d95e4"
        }
    }).done(function(movieObject) {
        //check the network tab in panel for more info
        console.log(movieObject);
    }).fail(function(movieObject) {
        $("#filmDispalyResult").empty();
        $("#filmDispalyResult").html("Something went wrong when we were looking for your film");
        console.log("could not find the film you were looking for");
    });
}
