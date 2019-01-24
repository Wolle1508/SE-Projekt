var daten;
var pause = false;
var index = 1;

window.onload = function () {
     fetch('daten.json')
          .then(function (response) {
               return response.json();
          })
          .then(function (myJson) {
               daten = myJson;
          });
     document.getElementById("start").addEventListener("click", function () {
          ablauf();
     });
     document.getElementById("pause").addEventListener("click", function () {
          console.log("pause");
          pause = true;
     });
     document.getElementById("clear").addEventListener("click", function () {
          clearMap();
     });
}

function ablauf() {
     pause = false;
     (function theLoop(i) {
          setTimeout(function () {
               console.log(daten[i]);
               document.getElementById(daten[i].field).className = "land-infected";
               if (index != Object.keys(daten).length && !pause) {
                    index += 1;
                    theLoop(index); 
               }
          }, 500);
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