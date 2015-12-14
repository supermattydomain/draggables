(function($) {
	$(function() {
		var canvas = $('#draggables');
		canvas.svg({
			onLoad: function(svg) {
				var entityDiameter = 100;
				var e1 = new Draggables.Entity(svg, 'Entity 1', {
					fill: 'yellow', stroke: 'black', strokeWidth: 0.05,
					transform: "matrix(" + entityDiameter + " 0 0 " + entityDiameter + " 200 100)"
				});
				var e2 = new Draggables.Entity(svg, 'Entity 2', {
					fill: 'blue', stroke: 'black', strokeWidth: 0.05,
					transform: "matrix(" + entityDiameter + " 0 0 " + entityDiameter + " 100 200)"
				});
				var connectorOptions = {
						fill: 'red', stroke: 'black', strokeWidth: 0.05
						, transform: "matrix(0.25 0 0 0.25 0.5 0)"
					}
				var e1c1 = new Draggables.Connector(svg, e1, connectorOptions);
				var e2c1 = new Draggables.Connector(svg, e2, connectorOptions);
				var connectionOptions = { stroke: 'black', strokeWidth: 2
					// , transform: "matrix(100 0 0 100 0 0)"
				};
				var con = new Draggables.Connection(svg, e1c1, e2c1, connectionOptions);
			}
		});
	});
})(jQuery);
