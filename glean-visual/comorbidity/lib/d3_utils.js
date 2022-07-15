function getBB(selection) {
	selection.each(function(d) { d.bbox = this.getBBox(); })
}	

function linkCentroidX(d) {
	var x1 = d.source.x;
	var x2 = d.target.x;		
	var x_min = Math.min(x1, x2);
	
	return x_min + Math.abs(x1 - x2) / 2
}

function linkCentroidY(d) {
	var y1 = d.source.y;
	var y2 = d.target.y;		
	var y_min = Math.min(y1, y2);
	
	return y_min + Math.abs(y1 - y2) / 2
}

function stretchPoint(d, incr) {
	return [ linkCentroidX(d) + incr, linkCentroidY(d) + incr ];
}

function downTriangle(width, height, x0, y0) {
	var x = x0 - width / 2; var y = y0 + height / 2;
	var x2 = x + width; var y2 = y;
	var x3 = x + width / 2; var y3 = y - height;

	return `M ${x} ${y} L ${x2} ${y2} L ${x3} ${y3} z`;
}