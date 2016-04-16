var pad = new Sketch(document.getElementById("pad"));

var color = document.getElementById("color");
var width = document.getElementById("width");
var clear = document.getElementById("clear");

color.addEventListener("change", function (event) {
    pad.setColor(event.target.value);
});

width.addEventListener("change", function (event) {
    pad.setWidth(event.target.value);
});

clear.addEventListener("click", function(event) {
   pad.clear(); 
});