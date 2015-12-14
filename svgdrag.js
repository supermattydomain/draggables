var selectedElement = 0;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;

function onMouseMove(evt) {
	moveElement(evt)
	evt.preventDefault();
	evt.stopPropagation();
}

function onMouseOut(evt) {
	moveElement(evt);
	deselectElement(evt);
	evt.preventDefault();
	evt.stopPropagation();
}

function onMouseDown(evt) {
	deselectElement(evt);
	selectElement(evt);
	evt.preventDefault();
	evt.stopPropagation();
}

function onMouseUp(evt) {
	moveElement(evt);
	deselectElement(evt);
	evt.preventDefault();
	evt.stopPropagation();
}

function onMouseClick(evt) {
	moveElement(evt);
	deselectElement(evt);
	evt.preventDefault();
	evt.stopPropagation();
}

function selectElement(evt) {
	selectedElement = evt.target;
	currentX = evt.clientX;
	currentY = evt.clientY;
	transform = selectedElement.getAttributeNS(null, "transform");
	if (transform) {
		currentMatrix = transform.slice(7, -1).split(' ');
		for (var i = 0; i < currentMatrix.length; i++) {
			currentMatrix[i] = parseFloat(currentMatrix[i]);
		}
	} else {
		currentMatrix = [1, 0, 0, 1, 0, 0]; // Identity matrix
		newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
		selectedElement.setAttributeNS(null, "transform", newMatrix);
	}

	selectedElement.setAttributeNS(null, "onmousemove", "onMouseMove(evt)");
	selectedElement.setAttributeNS(null, "onmouseout", "onMouseOut(evt)");
	selectedElement.setAttributeNS(null, "onmouseup", "onMouseUp(evt)");
	selectedElement.setAttributeNS(null, "onmouseclick", "onMouseClick(evt)");
}

function moveElement(evt) {
	if (selectedElement !== 0) {
		var dx = evt.clientX - currentX;
		var dy = evt.clientY - currentY;
		currentMatrix[4] += dx;
		currentMatrix[5] += dy;
		newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
		selectedElement.setAttributeNS(null, "transform", newMatrix);
		currentX = evt.clientX;
		currentY = evt.clientY;
	}
}

function deselectElement(evt) {
	if (selectedElement !== 0) {
		selectedElement.removeAttributeNS(null, "onmousemove");
		selectedElement.removeAttributeNS(null, "onmouseout");
		selectedElement.removeAttributeNS(null, "onmouseup");
		selectedElement.removeAttributeNS(null, "onmouseclick");
		selectedElement = 0;
	}
}
