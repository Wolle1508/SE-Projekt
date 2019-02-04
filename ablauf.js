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
		index = 1;
	});
	document.getElementById('speed').addEventListener('change', function() {
		var value = document.getElementById('speed').value;
		if (value == 1) {
			document.getElementById('speedLabel').innerHTML = 'Geschwindigkeit: ' + value + ' Sekunde/Tick';
		} else {
			document.getElementById('speedLabel').innerHTML = 'Geschwindigkeit: ' + value + ' Sekunden/Tick';
		}
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
	if (index == Object.keys(daten).length + 1) {
		index = 1;
		clearMap();
	}
	pause = false;
	(function theLoop(i) {
		setTimeout(function() {
			makeStep(daten[i]);
			if (index != Object.keys(daten).length && !pause) {
				index += 1;
				theLoop(index);
			} else {
				var startButton = document.getElementById('start');
				var backButton = document.getElementById('back');
				var clearbutton = document.getElementById('clear');
				startButton.value = 'start';
				startButton.innerHTML = 'Start';
				clearbutton.disabled = false;
				backButton.disabled = false;
			}
		}, speed);
	})(index);
}

function makeStep(obj) {
	var textfield = document.getElementById('info');
	if (obj.hasOwnProperty('primaryField')) {
		var primaryField = obj.primaryField;
		document.getElementById(primaryField.field).className = primaryField.class;
		textfield.append(primaryField.location + '\n');
	}
	var fields = obj.fields;
	for (field in fields) {
		document.getElementById(fields[field]).className = 'land-infected-rural';
	}
	textfield.append(obj.timestamp + '\n');
	textfield.append('\n');
	textfield.scrollTop = textfield.scrollHeight;
}

function clearMap() {
	var cells = document.getElementsByTagName('td');
	for (const cell in cells) {
		if (cells.hasOwnProperty(cell)) {
			if (cells[cell].className != 'water') {
				cells[cell].className = 'land';
			}
		}
	}
	document.getElementById('info').innerHTML = '';
}

function stepOn() {
	index += 1;
	clearMap();
	for (var i = 1; i < index; i++) {
		makeStep(daten[i]);
	}
}

function stepBack() {
	index -= 1;
	clearMap();
	document.getElementById('info').innerHTML = '';
	for (var i = 1; i < index; i++) {
		makeStep(daten[i]);
	}
}
