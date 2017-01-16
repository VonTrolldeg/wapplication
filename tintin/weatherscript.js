
	
	$(document).ready(function(){
    navigator.geolocation.getCurrentPosition(handleLocation);

    function handleLocation(position){
        getWeather(position.coords.latitude, position.coords.longitude);
    }

    function getWeather(lat, lon) {
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=c66f56c56f872792daab53e4802bdc65", function( data ) {
           
		   //hämtar vad det är för typ av väder
		   var main = data.weather[0].main;
		  
		   //hämtar temperatur i kelvin format
		   var kelvin = data.main.temp;
		   
		   //gör om till celsius
		   var celsius = kelvin - 273.5;
		   var temp = celsius.toFixed(2);
		   
		   //hämtar platsnamn
		   var name= data.name;
		  
		   //hämtar ikon i textformat
		   var ikon = data.weather[0].icon;
		   
		$(".info").append("<p>Temperatur: <strong>" + temp + "  (°C)</strong> </br> Väder : <strong>" + main +  "</strong> </p>" );
		$(".info").after("<img src=http://openweathermap.org/img/w/" + ikon +".png>");
		$("h4").after("<strong>" + name + "</strong>");
        })
		 
		   
    }
	

		  
   
});

