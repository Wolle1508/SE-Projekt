var daten = require('./daten.json');
var pause = false;
var index = 1;
var speed = 1000;

window.onload = function() {
	document.getElementById('start').addEventListener('click', function() {
		var startButton = document.getElementById('start');
		var onButton = document.getElementById('next');
		var backButton = document.getElementById('back');
		var clearbutton = document.getElementById('clear');
		if (startButton.value == 'start') {
			clearbutton.disabled = true;
			onButton.disabled = true;
			backButton.disabled = true;
			pause = false;
			ablauf();
			startButton.value = 'pause';
			startButton.innerHTML = 'Pause';
		} else {
			startButton.value = 'start';
			startButton.innerHTML = 'Start';
			clearbutton.disabled = false;
			onButton.disabled = false;
			backButton.disabled = false;
			pause = true;
		}
	});
	document.getElementById('clear').addEventListener('click', function() {
		clearMap();
	});
	document.getElementById('speed').addEventListener('change', function() {
		speed = document.getElementById('speed').value * 1000;
	});
	document.getElementById('next').addEventListener('click', function() {
		stepOn();
	});
	document.getElementById('back').addEventListener('click', function() {
		stepBack();
	});
};

function ablauf() {
	if (index != 1) index++;
	pause = false;
	var textfield = document.getElementById('info');
	(function theLoop(i) {
		setTimeout(function() {
			fields = daten[i].fields;
			for (field in fields) {
				// if (field == 0) {
				// 	document.getElementById(fields[field]).innerHTML = daten[i].location;
				// }
				document.getElementById(fields[field]).className = 'land-infected';
			}
			textfield.append(daten[i].location + '\n');
			textfield.append(daten[i].timestamp + '\n');
			textfield.scrollTop = textfield.scrollHeight;
			if (index != Object.keys(daten).length && !pause) {
				index += 1;
				theLoop(index);
			}
		}, speed);
	})(index);
}

function clearMap() {
	var cells = document.getElementsByClassName('land-infected');
	for (const cell in cells) {
		if (cells.hasOwnProperty(cell)) {
			cells[cell].className = 'land';
		}
	}
	document.getElementById('info').innerHTML = '';
	index = 1;
}

function stepOn() {
	index += 1;
	// clearMap();
	var textfield = document.getElementById('info');
	textfield.innerHTML = '';
	for (var i = 1; i != index; i++) {
		var obj = daten[i];
		var fields = obj.fields;
		for (field in fields) {
			document.getElementById(fields[field]).className = 'land-infected';
		}
		textfield.append(obj.location + '\n');
		textfield.append(obj.timestamp + '\n');
		textfield.scrollTop = textfield.scrollHeight;
	}
}

function stepBack() {
	index -= 1;
	var cells = document.getElementsByClassName('land-infected');
	for (const cell in cells) {
		if (cells.hasOwnProperty(cell)) {
			cells[cell].className = 'land';
		}
	}
	document.getElementById('info').innerHTML = '';
	var textfield = document.getElementById('info');
	for (var i = 1; i != index; i++) {
		var obj = daten[i];
		var fields = obj.fields;
		for (field in fields) {
			document.getElementById(fields[field]).className = 'land-infected';
		}
		textfield.append(obj.location + '\n');
		textfield.append(obj.timestamp + '\n');
		textfield.scrollTop = textfield.scrollHeight;
	}
}
