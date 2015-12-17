if (typeof(Draggables) === "undefined") {
	Draggables = {};
}

Draggables.Node = function(svg, labelText, options) {
	var tthis = this;
	this.svg = svg;
	options = $.extend(this.defaultOptions, options);
	this.g = this.svg.group(options);
	this.circle = this.svg.circle(this.g, 0, 0, 0.5);
	this.circle.setAttributeNS(null, "onmousedown", "onMouseDown(evt)");
	function updateConnectorPositions() {
		$(tthis.connectors).each(function(i, connector) {
			connector.updatePosition();
		});
	};
	$(this.g).addClass('draggable').on("dragBegin", updateConnectorPositions).on("dragMove", updateConnectorPositions);
	$(this.g).addClass('node');
	this.connectors = [];
};
$.extend(Draggables.Node.prototype, {
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
	this.edge = null;
};
$.extend(Draggables.Connector.prototype, {
	defaultOptions: {
		fill: 'red', stroke: 'black', strokeWidth: 0.05,
		transform: "scale(0.25) translate(2)"
	},
	updatePosition: function() {
		if (this.edge !== null) {
			this.edge.updatePosition();
		}
	}
});

Draggables.Edge = function(svg, from, to, options) {
	this.svg = svg;
	this.connectFrom(from);
	this.connectTo(to);
	options = $.extend(this.defaultOptions, options);
	this.g = this.svg.group(options);
	this.updatePosition();
};
$.extend(Draggables.Edge.prototype, {
	defaultOptions: {
		stroke: 'black', strokeWidth: 2
	},
	connectFrom: function(newFrom) {
		this.disconnectFrom();
		if (newFrom) {
			this.from = newFrom;
			this.from.edge = this;
		}
	},
	disconnectFrom: function() {
		if (this.from) {
			this.from.edge = null;
			this.from = null;
		}
	},
	connectTo: function(newTo) {
		this.disconnectTo();
		if (newTo) {
			this.to = newTo;
			this.to.edge = this;
		}
	},
	disconnectTo: function() {
		if (this.to) {
			this.to.edge = null;
			this.to = null;
		}
	},
	updatePosition: function() {
		// console.log('Edge.updatePosition');
		if (this.from && this.to) {
			var fromTransform = this.from.g.getScreenCTM();
			var toTransform = this.to.g.getScreenCTM();
			if (this.line) {
				this.line.setAttributeNS(null, 'x1', fromTransform.e);
				this.line.setAttributeNS(null, 'y1', fromTransform.f);
				this.line.setAttributeNS(null, 'x2', toTransform.e);
				this.line.setAttributeNS(null, 'y2', toTransform.f);
			} else {
				this.line = this.svg.line(this.g, fromTransform.e, fromTransform.f, toTransform.e, toTransform.f);
			}
		}
	}
});
