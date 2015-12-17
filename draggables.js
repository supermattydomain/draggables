if (typeof(Draggables) === "undefined") {
	Draggables = {};
}

Draggables.Entity = function(svg, labelText, options) {
	this.svg = svg;
	options = $.extend(this.defaultOptions, options);
	this.g = this.svg.group(options);
	this.circle = this.svg.circle(this.g, 0, 0, 0.5);
	this.circle.setAttributeNS(null, "onmousedown", "onMouseDown(evt)");
	$(this.circle).addClass('draggable');
	$(this.g).addClass('entity');
	this.connectors = [];
};
$.extend(Draggables.Entity.prototype, {
	defaultOptions: {
		fill: 'blue', stroke: 'black', strokeWidth: 0.05
	},
	addConnector: function(connector) {
		this.connectors.push(connector);
		this.g.appendChild(connector.g);
	}
});

Draggables.Connector = function(svg, options) {
	this.svg = svg;
	options = $.extend(this.defaultOptions, options);
	this.g = this.svg.group(options);
	$(this.g).addClass('connector');
	this.circle = this.svg.circle(this.g, 0, 0, 0.5);
	this.connection = null;
};
$.extend(Draggables.Connector.prototype, {
	defaultOptions: {
		fill: 'red', stroke: 'black', strokeWidth: 0.05,
		transform: "scale(0.25) translate(2)"
	}
});

Draggables.Connection = function(svg, from, to, options) {
	this.svg = svg;
	this.from = from;
	this.to = to;
	options = $.extend(this.defaultOptions, options);
	if (this.from && this.to) {
		fromTransform = this.from.g.getScreenCTM();
		toTransform = this.to.g.getScreenCTM();
		this.g = this.svg.group(options);
		this.svg.line(this.g, fromTransform.e, fromTransform.f, toTransform.e, toTransform.f);
	}
};
$.extend(Draggables.Connection.prototype, {
	defaultOptions: {
		stroke: 'black', strokeWidth: 2
	},
	connectFrom: function(newFrom) {
		if (this.from) {
			this.disconnectFrom();
		}
		this.from = newFrom;
		this.from.connection = this;
	},
	disconnectFrom: function() {
		if (this.from) {
			this.from.connection = null;
			this.from = null;
		}
	},
	connectTo: function(newTo) {
		if (this.to) {
			this.disconnectTo();
		}
		this.to = newTo;
	},
	disconnectTo: function() {
		if (this.to) {
			this.to.connection = null;
			this.to = null;
		}
	}
});
