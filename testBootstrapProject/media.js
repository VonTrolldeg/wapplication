/*
media
*/

function mediaFromServer(mediaType){
    $.ajax({
      //call the server with its url and parameterns - action and mediatype
      url:"server.php",
      data:{
        action: "getMedia",
        type: mediaType
      },
      dataType: "JSON"
    }).done(function(dataObject){
      //run the function that prints the media to the webpage
      //parse the object to json format
      var allFiles = dataObject.files;
      displayMedia(allFiles);
    }).fail(function(dataObject){
      console.log("Could not load the selected mediatype from server");
    });
  };

function displayMedia(allFiles){
  //add as many boxes for media as length of list
  $("#gallery").empty();

      for (var i = 0; i < allFiles.length; i++) {
          //gets the title from this object
          var title = allFiles[i].title;

          if(allFiles[i].type == "photo"){
             //collects the image and the title in variables
             var img = "<img src=" + allFiles[i].path + " width='320' >";
             //puts variables in the HTML
             $("#gallery").append(
               "<div class='imgage col-md-3 col-lg-3'> "+
               "<figure class='img'>" + img + "<p>" + title + "</p></figure>" +
               "</a>" +
               "</div> <!-- col-6 / end -->");
           }
           else if(allFiles[i].type == "audio"){
               $("#gallery").append(
                   "<div class='audio col-md-3 col-lg-3'> "+
                   "<figure class='img'>" + "<img src='images/audioIcon.jpg' width='320' ></figure>" +
                   "<audio controls><source src='" + allFiles[i].path + "' type='audio/mpeg'>Your browser does not support the audio tag.</audio>" +
                   "<p>" + title + "</p>" +
                 "</a>" +
                 "</div> <!-- col-6 / end -->");
           }
           else if (allFiles[i].type == "video"){
               $("#gallery").append(
                   "<div class='video col-md-3 col-lg-3'> "+
                   "<video class='vid' controls><source src='" + allFiles[i].path + "' type='video/mp4'></video>" +
                   "<p>" + title + "</p>"+
                   "</a>" +
                   "</div> <!-- col-6 / end -->");
           }
       }
}

function uploadMedia() {
    //search for the media type in the database
    $('#mediaForm').ajaxSubmit({
    success: function(data) {
      $('#mediaForm')[0].reset();
      $('#status').html("Upload done!");
      console.log("the file is saved in the database");
    },
    //felhantering, om uppladdningen misslyckas visas detta felmeddelande.
    error: function() {
      $('#status').html("Something with the upload went wrong");
    }
  });


}
