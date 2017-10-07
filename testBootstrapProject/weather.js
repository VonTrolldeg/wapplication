function onSuccess(position){
  // position is an object that
  // get the position in latitude and longitude whe nthe user accepts it
  var lati = position.coords.latitude;
  var longi = position.coords.longitude;
  getWeather(lati, longi);
}

function onFail(){
  console.log("Vi kunde tyvärr inte hämta din plats just nu.");
}

function getWeather(lati, longi) {
    $.ajax({
      //type the paramerters for the API lon and at and the API key
      url:"http://api.openweathermap.org/data/2.5/weather",
      dataType: "JSON",
      data:{
        lat: lati,
        lon: longi,
        APPID : "9b046b355c3c4db502a8aa20de792bc9"
      }
    }).done(function(data){
      //check the network tab for more information
      printWeather(data);
    }).fail(function(data){

    });
  };

function printWeather(data) {
    var kelvin = data.main.temp;
    var description = data.weather[0].description;
    var celcius = (kelvin - 273.15);
    var temp = celcius.toFixed(1);
    $("#description").html(description);
    $("#temp").html(temp + " degrees celcius");
}
