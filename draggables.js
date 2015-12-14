if (typeof(Draggables) === "undefined") {
	Draggables = {};
}

Draggables.Entity = function(svg, labelText, options) {
	this.svg = svg;
	// { transform: 'translate(x,y)' }
	this.g = this.svg.group(options);
	this.circle = this.svg.circle(this.g, 0, 0, 0.5);
	this.g.setAttributeNS(null, "onmousedown", "onMouseDown(evt)");
	$(this.g).addClass('draggable');
	this.connectors = [];
};
$.extend(Draggables.Entity.prototype, {
	addConnector: function(connector) {
		this.connectors.push(connector);
		this.g.appendChild(connector.g);
	}
});

Draggables.Connector = function(svg, parentEntity, options) {
	this.parentEntity = parentEntity;
	this.svg = svg;
	this.g = this.svg.group(options);
	$(this.g).addClass('connector');
	this.circle = this.svg.circle(this.g, 0, 0, 0.5);
	this.connection = null;
	parentEntity.addConnector(this);
};
$.extend(Draggables.Connector.prototype, {
});

Draggables.Connection = function(svg, from, to, options) {
	this.svg = svg;
	this.from = from;
	this.to = to;
	if (this.from && this.to) {
		fromTransform = this.from.g.getScreenCTM();
		toTransform = this.to.g.getScreenCTM();
		this.g = this.svg.group(options);
		/*
		this.g = this.svg.group($.extend(options, {
			transform: "matrix"
		}));
		*/
		this.svg.line(this.g, fromTransform.e, fromTransform.f, toTransform.e, toTransform.f);
	}
};
$.extend(Draggables.Connection.prototype, {
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
