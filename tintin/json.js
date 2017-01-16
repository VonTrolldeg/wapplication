results = [
{
	"path": {
		"kind": "item",
		"collection": "Event",
		"key": "1130f3c60a02aa03",
		"ref": "91dfc313851ad37f",
		"reftime": 1462370126347
	},
	"value": {
		"sub-title": "ij",
		"sub-dis": "ji",
		"date": "May 4th 2016, 3:55:25 pm"
	},
	"reftime": 1462370126347
}, 


{	
	"path": {
		"kind": "item",
		"collection": "Event",
		"key": "1130f51d2102aa04",
		"ref": "0b352cdd60963a6c",
		"reftime": 1462370214178
	},
	"value": {
		"sub-tit": "Hejsan",
		"dis": "OStenji",
		"date": "May 4th 2016, 3:56:53 pm"
	},
	"reftime": 1462370214178

},{

}]

$(document).ready(function(results){
console.log(results);


 

var date = results[1]["value"].date;
console.log("Datum :" + date);
var dis = results[1]["value"].dis;
console.log("Discription: " + dis);
var tit = results[1]["value"].sub-tit;
console.log("Titel: " + tit);
var item = results[1]["path"].collection;
console.log("Typ :" + item);













});