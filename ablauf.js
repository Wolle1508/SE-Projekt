const $ = require("jquery")
var daten;
var index = 1;
var pause = false;

window.onload = function () {
     fetch('daten.json')
          .then(function (response) {
               return response.json();
          })
          .then(function (myJson) {
               daten = myJson
          });
     document.getElementById("start").addEventListener("click", function () {
          ablauf();
     })
}


//einbauen : https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/
function ablauf() {
     while (index != Object.keys(daten).length + 1 && !pause) {
          console.log(daten[index.toString()]);
          var field = daten[index.toString()].field;
          var cell = document.getElementById(field);
          cell.style.backgroundColor = "Red";
          sleep(2000);
          index++;
     }
     index = 1
}

function sleep(delay) {
     var start = new Date().getTime();
     while (new Date().getTime() < start + delay);
}