var selectedElement = 0;
var currentX = 0;
var currentY = 0;

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
	// Recurse up the element tree until we find a <g> element,
	// on which the display group's transforms are defined.
	while (selectedElement.localName != 'g') {
		selectedElement = selectedElement.parentElement;
	}
	// console.log("selected:", selectedElement, evt);
	currentX = evt.clientX;
	currentY = evt.clientY;
	selectedElement.setAttributeNS(null, "onmousemove", "onMouseMove(evt)");
	selectedElement.setAttributeNS(null, "onmouseout", "onMouseOut(evt)");
	selectedElement.setAttributeNS(null, "onmouseup", "onMouseUp(evt)");
	selectedElement.setAttributeNS(null, "onmouseclick", "onMouseClick(evt)");
	$(selectedElement).addClass('selected');
}

function transformToString(tr) {
	var ret = '';
	switch (tr.type) {
	case SVGTransform.SVG_TRANSFORM_MATRIX:
		// console.log('matrix', tr);
		ret = ret + 'matrix(' + tr.matrix.a + ' ' + tr.matrix.b + ' ' + tr.matrix.c + ' ' + tr.matrix.d + ' ' + tr.matrix.e + ' ' + tr.matrix.f + ')'
		break;
	case SVGTransform.SVG_TRANSFORM_TRANSLATE:
		// console.log('translate', tr);
		ret = ret + 'translate(' + tr.matrix.e + ' ' + tr.matrix.f + ')'
		break;
	case SVGTransform.SVG_TRANSFORM_SCALE:
		// console.log('scale', tr);
		ret = ret + 'scale(' + tr.matrix.a + " " + tr.matrix.d + ')'
		break;
	case SVGTransform.SVG_TRANSFORM_ROTATE:
		// console.log('rotate', tr);
		ret = ret + 'rotate(' + Math.arcsin(tr.matrix.b) + ')'
		break;
	case SVGTransform.SVG_TRANSFORM_SKEWX:
		// console.log('skewx', tr);
		ret = ret + 'skewx(?)'
		break;
	case SVGTransform.SVG_TRANSFORM_SKEWY:
		// console.log('skewy', tr);
		ret = ret + 'skewy(?)'
		break;
	default:
		throw "Unrecognised SVG node type " + tr.type;
	}
	return ret;
}

function dumpTransformList(name, l) {
	var json_list = [];
	for (var i = 0; i < l.numberOfItems; i++) {
		json_list[i] = transformToString(l[i]);
	}
	console.log(name, json_list);
}

function dumpMatrix(name, m) {
	console.log(name, [ m.a, m.b, m.c, m.d, m.e, m.f ])
}

function moveElement(evt) {
	if (selectedElement !== 0) {
		var dx = evt.clientX - currentX;
		var dy = evt.clientY - currentY;
		var item, baseVal = selectedElement.transform.baseVal;
		// dumpTransformList("Transform list before:", baseVal);
		baseVal.consolidate();
		var currentMatrix = baseVal.getItem(0).matrix;
		// dumpMatrix('current:', currentMatrix);
		currentMatrix.e += dx;
		currentMatrix.f += dy;
		baseVal.clear();
		item = baseVal.createSVGTransformFromMatrix(currentMatrix);
		baseVal.appendItem(item);
		// dumpTransformList("Transform list after:", baseVal);
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
		$(selectedElement).removeClass('selected');
		selectedElement = 0;
	}
}
