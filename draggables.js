if (typeof(Draggables) === "undefined") {
	Draggables = {};
}

Draggables.Entity = function(svg, labelText) {
	this.svg = svg;
	// { transform: 'translate(x,y)' }
	this.g = this.svg.group();
	this.svg.circle(this.g, 100, 100, 75, {id: 'circle2', class_: 'grouped',
		fill: 'yellow', stroke: 'black', strokeWidth: 3});
	this.g.setAttributeNS(null, "onmousedown", "onMouseDown(evt)");
	$(this.g).addClass('draggable');
	this.connectors = 0;
};
$.extend(Draggables.Entity.prototype, {
});

Draggables.Connector = function(svg, parentEntity) {
	this.parentEntity = parentEntity;
	this.svg = svg;
	this.g = this.svg.group();
	$(this.g).addClass('connector');
	this.svg.circle(this.g, 100, 100, 10, {
		fill: 'red', stroke: 'black', strokeWidth: 3});
	this.parentEntity.elt.append(this.g);
	this.from = this.to = null;
};
$.extend(Draggables.Connector.prototype, {});

Draggables.Connection = function(from, to) {};
$.extend(Draggables.Connection.prototype, {});
