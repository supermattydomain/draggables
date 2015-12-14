(function($) {
	$(function() {
		var canvas = $('#draggables');
		canvas.svg({
			onLoad: function(svg) {
				var e1 = new Draggables.Entity(svg, 'Entity 1');
			}
		});
	});
})(jQuery);
