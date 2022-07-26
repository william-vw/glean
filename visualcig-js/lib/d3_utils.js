function getAbsoluteBoundingBox(node) {
    // relative to current viewing window (i.e., changes when scrolling)
    const bbox = node.node().getBoundingClientRect();

    // so, let's adjust the top and left based on current scrolling
    // so our positioning stays the same despite scrolling
    const bbox2 = { top: bbox.top + window.scrollY, left: bbox.left + window.scrollX, 
        width: bbox.width, height: bbox.height };

    return bbox2;
}

function getPxVal(quantVal) {
    return quantVal.substring(0, quantVal.length - 2);
}

function getBB(selection) {
    selection.each(function (d) { d.bbox = this.getBBox(); })
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
    return [linkCentroidX(d) + incr, linkCentroidY(d) + incr];
}

function downTriangle(width, height, x0, y0) {
    var x = x0 - width / 2; var y = y0 + height / 2;
    var x2 = x + width; var y2 = y;
    var x3 = x + width / 2; var y3 = y - height;

    return `M ${x} ${y} L ${x2} ${y2} L ${x3} ${y3} z`;
}

function diamond(width, height, x0, y0) {
    var x = x0; var y = y0 - height / 2;
    var x2 = x + width / 2; var y2 = y0;
    var x3 = x0; var y3 = y0 + height / 2;
    var x4 = x0 - width / 2; var y4 = y0

    return `M ${x} ${y} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} z`;
}

function hexagon(width, height, x0, y0) {
    var x1 = x0 - width; var y1 = y0;
    var x2 = x0 - width / 2; var y2 = y0 - height;
    var x3 = x0 + width / 2; var y3 = y0 - height;
    var x4 = x0 + width; var y4 = y0;
    var x5 = x0 + width / 2; var y5 = y0 + height;
    var x6 = x0 - width / 2; var y6 = y0 + height;

    return `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} L ${x5} ${y5} L ${x6} ${y6} z`;
}

// Copies a variable number of methods from source to target.
d3.rebind = function (target, source) {
    var i = 1, n = arguments.length, method;
    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
    return target;
};

// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
function d3_rebind(target, source, method) {
    return function () {
        var value = method.apply(source, arguments);
        return value === source ? target : value;
    };
}

// based on
// http://bl.ocks.org/couchand/6394506
// (updated for d3.v6 ..)
function clickcancel() {
    var event = d3.dispatch('click', 'dblclick');
    function cc(selection) {
        var down,
            tolerance = 5,
            last,
            wait = null;
        // euclidean distance
        function dist(a, b) {
            return Math.sqrt(Math.pow(a[0] - b[0], 2), Math.pow(a[1] - b[1], 2));
        }
        selection.on('mousedown', (e) => {
            down = d3.pointer(e);
            last = +new Date();
        });
        selection.on('mouseup', (e, d) => {
            ;
            if (dist(down, d3.pointer(e)) > tolerance) {
                return;
            } else {
                if (wait) {
                    window.clearTimeout(wait);
                    wait = null;
                    event.call("dblclick", this, e, d);
                } else {
                    wait = window.setTimeout((() => {
                        event.call("click", this, e, d);
                        wait = null;
                    }), 300);
                }
            }
        });
    };
    return d3.rebind(cc, event, 'on');
}
var cc = clickcancel();
d3.select('#map').call(cc);
cc.on('click', function () {
    d3.select('#map').text(d3.select('#map').text() + 'click, ');
});
cc.on('dblclick', function () {
    d3.select('#map').text(d3.select('#map').text() + 'dblclick, ');
});