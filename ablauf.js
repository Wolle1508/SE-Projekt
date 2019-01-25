var daten;
var pause = false;
var index = 1;
var speed = 5000

window.onload = function () {
     fetch('daten.json')
          .then(function (response) {
               return response.json();
          })
          .then(function (myJson) {
               daten = myJson;
          });
     document.getElementById("start").addEventListener("click", function () {
          document.getElementById("clear").disabled = true;
          ablauf();
          // document.getElementById("clear").disabled = false;
     });
     document.getElementById("pause").addEventListener("click", function () {
          document.getElementById("clear").disabled = false;
          console.log("pause");
          pause = true;
     });
     document.getElementById("clear").addEventListener("click", function () {
          clearMap();
     });
     document.getElementById("speed").addEventListener("change", function(){
          speed = document.getElementById("speed").value * 1000
     });
}

function ablauf() {
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

function clearMap(){
     var cells = document.getElementsByClassName("land-infected");
     for (const cell in cells) {
          if (cells.hasOwnProperty(cell)) {
               cells[cell].className = "land";
          }
     }
     index = 1;
}