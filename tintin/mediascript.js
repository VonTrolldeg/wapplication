$(document).ready(function() {

  $('#myForm').on("submit", function(e){
    e.preventDefault();

    $('#myForm').ajaxSubmit({
    	success: function(data) {
	    	console.log(data); // se exempelsvar nedan
	    	$('#myForm')[0].reset();
	    	alert('Uppladdning lyckades! Filen finns nu i databasen');
	    	
    	},
		//felhantering, om uppladdningen misslyckas visas detta felmeddelande. 
    	error: function() {
    		alert("Något gick fel, uppladdningen misslyckades");
    	},
		//använder ett plugin, visar uppladdningen i procent. 
    	uploadProgress: function(event, position, total, percent) {
    		$("#status").text("Filen laddas upp: " + percent + "% klart av 100%");
    		if (percent == 100){
    			$('#status').text("");
    		}
    	}
    });
  });

});

$(document).ready(function(){
		
	// när en besökare ändrar i dropdownen - innan uppladdning
	$('#type').change(ChooseType);
	function ChooseType(){
		var value = $('#type').val();
		
		if (value == "photo"){
			$('#pic').attr("accept","image/*");
			$('#pic').attr("capture","camera");
		}
		else if (value == "audio"){
			$('#pic').attr("accept","audio/*");
			$('#pic').attr("capture","microphone");
		}
		else if (value == "video"){
			$('#pic').attr("accept","video/*");
			$('#pic').attr("capture","camcorder");
		}
	}
		
	// när en användare ändrar i dropdownen - för filtrering av media
	$('#show').change(showFiles);
	function showFiles() {
		var userchoice = $('#show').val();
	
		// töm resultat
		$('#resultat').html("");
		
		
		//detta kommer att ske när man väljer någonting i dropdown menyn
		for (var i = 0; i < allFiles.length; i++ ) {
			var file = allFiles[i];
			// hämtar alla titlar ifrån filerna. Bildtexten till filerna
			var title = file.title;
		
			// filterar ut så att enbart bilder visas
			if (file.type == "photo" && userchoice == "photo" ) {
				var img = "<img src=" + file.path + ">";
				$('#resultat').append("<figure class='img'>" + img + "<p>" + title + "</p></figure>");
			}
			else if (file.type == "audio" && userchoice == "audio") {
				$('#resultat').append("<audio controls><source src='" + file.path + "' type='audio/mpeg'></audio>");
				$('#resultat').append("<p>" + title + "</p>");
			} 
			else if (file.type == "video" && userchoice == "video") {
				$('#resultat').append("<video class='vid' controls><source src='" + file.path + "' type='video/mp4'></video>");
				$('#resultat').append("<p class='videotxt'>" + title + "</p>");
			}
		}
	}
		
	var allFiles;
		
	// hämta all media från början när sidan laddas. Sparas i den globala "allFiles" som kommer kunna filtreras senare
	$.ajax({
		url: "server.php?action=getMedia",
	})
	.done(function(data){
		var e = JSON.parse(data);
		// hämtar filerna från arrayen "e"
		var files = e.files;
		// stoppa in files i den globala variabeln
		allFiles = files;
		
		//detta kommer att visas när sidan laddas. alla filer.
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			// hämtar alla titlar ifrån filerna. Bildtexten till filerna
			var title = file.title;
		
			// för att bilderna ska visas
			if (file.type == "photo") {	
				var img = "<img src=" + file.path + ">";
				$('#resultat').append("<figure class='img'>" + img + "<p>" + title + "</p></figure>");
			}
			else if (file.type == "audio") {
				$('#resultat').append("<audio controls><source src='" + file.path + "' type='audio/mpeg'></audio>")
				$('#resultat').append("<p>" + title + "</p>");
				
			} else if (file.type == "video") {
				$('#resultat').append("<video class='vid' controls><source src='" + file.path + "' type='video/mp4'></video>")
				
				
			}
		} // end-for-loop
	}); // end-done()
	
	
});


