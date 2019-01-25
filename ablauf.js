var daten;
var pause = false;
var index = 1;
var speed = 1000

window.onload = function () {
     fetch('daten.json')
          .then(function (response) {
               return response.json();
          })
          .then(function (myJson) {
               daten = myJson;
          });
     document.getElementById("start").addEventListener("click", function () {
          var startButton = document.getElementById("start");
          var clearbutton = document.getElementById("clear");
          if (startButton.value == "start") {
               clearbutton.disabled = true;
               pause = false;
               ablauf();
               startButton.value = "pause";
               startButton.innerHTML = "Pause";
          }else{
               startButton.value = "start";
               startButton.innerHTML = "Start";
               clearbutton.disabled = false;
               pause = true;
          }
     });
     document.getElementById("clear").addEventListener("click", function () {
          clearMap();
     });
     document.getElementById("speed").addEventListener("change", function () {
          speed = document.getElementById("speed").value * 1000
     });
}

function ablauf() {
     if(index != 1) index++;
     pause = false;
     var textfield = document.getElementById("info");
     (function theLoop(i) {
          setTimeout(function () {
               console.log(daten[i]);
               document.getElementById(daten[i].field).className = "land-infected";
               textfield.append(daten[i].location);
               textfield.append("\n");
               if (index != Object.keys(daten).length && !pause) {
                    index += 1;
                    theLoop(index);
               }
          }, speed);
     })(index);
}

function clearMap() {
     var cells = document.getElementsByClassName("land-infected");
     for (const cell in cells) {
          if (cells.hasOwnProperty(cell)) {
               cells[cell].className = "land";
          }
     }
     document.getElementById("info").innerHTML = "";
     index = 1;
}