(function($) {
	$(function() {
		var canvas = $('#draggables');
		canvas.svg({
			onLoad: function(svg) {
				var entityDiameter = 100;
				var e1 = new Draggables.Entity(svg, 'Entity 1', {
					fill: 'yellow',
					// transform: "scale(" + entityDiameter + ") translate(2 1)"
					transform: "matrix(" + entityDiameter + " 0 0 " + entityDiameter + " 200 100)"
				});
				var e2 = new Draggables.Entity(svg, 'Entity 2', {
					fill: 'blue',
					// transform: "scale(" + entityDiameter + ") translate(1 2)"
					transform: "matrix(" + entityDiameter + " 0 0 " + entityDiameter + " 100 200)"
				});
				var e1c1 = new Draggables.Connector(svg);
				var e2c1 = new Draggables.Connector(svg);
				e1.addConnector(e1c1);
				e2.addConnector(e2c1);
				var con = new Draggables.Connection(svg, e1c1, e2c1);
			}
		});
	});
})(jQuery);
