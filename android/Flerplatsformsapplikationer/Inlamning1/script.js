function toggleMenu(lists){
	// här ändras attributen på display till none eller block beroende på om menyn visas eller ej
	if (lists.style.display == "none") {
		lists.style.display = "block";
	} else {
		lists.style.display = "none";
	}

}

function dropDown(){
	// fixar dropdownmenyn när man surfar in med mobiltelefon om listan inte visas så ska den visas när man trycker på menu, sker delvis i toggleMenu
	var menu = document.querySelector("#menu");
	var lists = document.querySelector("#navigationList"); 
	lists.style.display = "none";
	menu.addEventListener("click", function() {
		console.log(this.nextElementSibling);
		toggleMenu(this.nextElementSibling);
	});
}

function style(s){
	// ändrar färgen på head, main och foot
	if (s == "grey"){
		document.querySelector("#head").style.backgroundColor = "#C0C0C0"
		document.querySelector("#main").style.backgroundColor = "#C0C0C0"
		document.querySelector("#foot").style.backgroundColor = "#C0C0C0"
	}
	if (s == "lightblue"){
		document.querySelector("#head").style.backgroundColor = "lightblue"
		document.querySelector("#main").style.backgroundColor = "lightblue"
		document.querySelector("#foot").style.backgroundColor = "lightblue"
	}
	if (s == "green"){
		document.querySelector("#head").style.backgroundColor = "green"
		document.querySelector("#main").style.backgroundColor = "green"
		document.querySelector("#foot").style.backgroundColor = "green"
	}


}

function changeStyle(){
	// Hämtar style ur dropdownlistan och sparar den i local storage. sen körs funktionen style
	var css = document.querySelector("#css");
	css.addEventListener("change", function(event){
		var s = event.target.value;
		console.log(s);
		localStorage.setItem("style", s);
		style(s);
	});

}

if (localStorage.getItem("style")){
	// om det finns i localstorage
 	var s = localStorage.getItem("style");
	var cssOption = document.getElementById('css');
	cssOption.value = s;
 	style(s);
}
else {
	// om det inte finns i localstorage
	document.querySelector("#head").style.backgroundColor = "#C0C0C0"
	document.querySelector("#main").style.backgroundColor = "#C0C0C0"
	document.querySelector("#foot").style.backgroundColor = "#C0C0C0"
}



dropDown();
changeStyle();