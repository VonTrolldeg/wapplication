var success = document.querySelector("#success");
var error = document.querySelector("#error");
var info = document.querySelector("#info");
var addItem = document.querySelector("#add-item");
var removeItem = document.querySelector("#remove-item");
//var items = document.querySelector("#items")

function addClass(){
	console.log(this);
	var element = document.querySelector("#message-box");
	element.setAttribute("class", this.id);
}

function addAttribute(){
	var text = prompt("Skriv in sak i listan!");
	// Skapar ett <li>-element
	var li = document.createElement("li");
	// Skapar en text-nod, alltså det som ska stå i paragrafen
	var textNode = document.createTextNode(text);
	// Lägg till text-noden till paragrafen
	li.appendChild(textNode)
	// Lägger till paragrafen som ett barn till elementet <body>
	document.querySelector("#items").appendChild(li);
}

function removeAttribute(){
	/*var child = items.lastChild;
	items.removeChild(child);
	FUNKAR MEN VET INTE VARFÖR?? BUGGAR DELUXE!!!!
	*/
	var items = document.querySelector("#items");
	var lastItem = items.lastChild;
	items.removeChild(lastItem);
}

success.addEventListener("click", addClass);
error.addEventListener("click", addClass);
info.addEventListener("click", addClass);
addItem.addEventListener("click", addAttribute);
removeItem.addEventListener("click", removeAttribute);