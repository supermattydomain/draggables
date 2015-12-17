(function($) {
	$(function() {
		var canvas = $('#draggables');
		canvas.svg({
			onLoad: function(svg) {
				var nodeDiameter = 100;
				var n1 = new Draggables.Node(svg, 'Node 1', {
					fill: 'yellow',
					// transform: "scale(" + nodeDiameter + ") translate(2 1)"
					transform: "matrix(" + nodeDiameter + " 0 0 " + nodeDiameter + " 200 100)"
				});
				var n2 = new Draggables.Node(svg, 'Node 2', {
					fill: 'blue',
					// transform: "scale(" + nodeDiameter + ") translate(1 2)"
					transform: "matrix(" + nodeDiameter + " 0 0 " + nodeDiameter + " 100 200)"
				});
				var n1c1 = new Draggables.Connector(svg);
				var n2c1 = new Draggables.Connector(svg);
				n1.addConnector(n1c1);
				n2.addConnector(n2c1);
				var con = new Draggables.Connection(svg, n1c1, n2c1);
			}
		});
	});
})(jQuery);
