// TODO
// node type "end-point"
// indicate composite node types somehow
// support modularization (expand/contract, open in new window, ..)
// auto-determine width! ..

export function VisualCIG() {
	return this;
}

VisualCIG.prototype.constructor = VisualCIG;


// - fields

VisualCIG.prototype._data = null;
VisualCIG.prototype._root = null;
VisualCIG.prototype._tree = null;
VisualCIG.prototype._svg = null;
VisualCIG.prototype._nodes = null;
VisualCIG.prototype._hierLinks = null;
VisualCIG.prototype._opLinks = null;
VisualCIG.prototype._tooltip = null;

VisualCIG.prototype._treeChanged = false;


// - settings

VisualCIG.prototype._settings = {
	nodeStyle: {
		circle: { radius: 8	},
		rect: { 
			xIncr: -8,
			yIncr: -8,
			width: 15,
			height: 15
		},
		triangle: {
			width: 18,
			height: 18
		}	
	},
	decisionalState: {
		node: {
			fill: {
				notChosenState: 'white',
				chosenState: 'steelblue'
			},
			stroke_dasharray: {
				notChosenState: ("3,3"),
				chosenState: 'none'
			}
		},
		link: {
			stroke_dasharray: {
				notChosenState: ("10,3"),
				chosenState: 'none'
			}
		}
	},
	workflowState: {
		node: {
			fill: {
				completedState: 'steelblue',
				inactiveState: 'moccasin',
				activeState: 'cyan',
				startedState: 'deepskyblue',
				discardedState: 'white',
				delayedState: 'lightgrey',
				adjustedState: 'mediumpurple'
			},
			stroke_dasharray: {
				discardedState: ("3,3"),
				other: 'none'
			}
		},
		link: {
			stroke_dasharray: {
				discardedState: ("3,3"),
				other: 'none'
			}
		}
	}
};

// - start API 

VisualCIG.prototype.findNode = function(name) {
	return this._root.descendants().find((d) => d.data.name == name);
}

// transits: [{ node, workflowState, decisionState, propagate (optional) }] (mandatory; can be empty)
// operations: [{ source, target, type }] (mandatory; can be empty)
// adds: [{ parent, data }] (optional)
VisualCIG.prototype.update = function({ transits, operations, adds }) {
	transits.forEach((transit) => {
		var nodes = (Array.isArray(transit.node) ? transit.node : [ transit.node ]);
		nodes.forEach((node) => this._transitTo(node, transit.workflowState, transit.decisionState, transit.propagateDown, transit.propagateUp));
	});
	if (adds) this._addNodes(adds);
	this._refresh();
	
	this._simulateOperations(operations);
}

// -- show CIG

VisualCIG.prototype.show = function(json, config, callback) {
	if ((typeof json) === "string")
		this.showFromUrl(json, config, callback);
	else
		this.showFromData(json, config, callback);
}

VisualCIG.prototype.showFromUrl = function(jsonUrl, config, callback) {
	d3.json(jsonUrl).then((data) => this.showFromData(data, config, callback));
}
	
VisualCIG.prototype.showFromData = function(data, config, callback) {	
	this._data = data;
	this._config = config;
	
	var width = $(document).width() + (config.widthAdjust ? config.widthAdjust : 0);
	var height = $(document).height(); 

	// - setup svg element

	this._svg = 
		d3.select('#container')
		.append('svg')
			.attr("width", width)
			.attr("height", height);
	
	var g = this._svg.append('g');
	var gLeg = g.append('g')
		.classed('legend', true);
	var gTree = g.append('g')
		.classed('tree', true)
		.attr("transform", config.svg.translate);
		
	// adding operations here always puts it as the first element (even when sorting, ..)
	// so only add it when needed; in that case, it's added at the end
	gTree.selectAll(null)
		.data(['links', 'nodes' ])
		.enter()
		.append('g')
			.attr('class', (d) => d);
		
	// - setup tree layout
	
	this._tree = d3.tree();
	this._tree.size([width, height - 100]);
	this._root = d3.hierarchy(this._data);
	this._tree(this._root);
	
	// - propagate "not-chosen" state, "source" property to descendants
	this._propagateToDescendants(this._root);
		
	// - show legend
	this._setupLegend(config);
	
	// - show hierarchy (tree)
	this._showTree();
	this._formatTree();	
	
	// - operations	
	this._setupOperations();
		
	if (callback)
		callback();
}

// - end API 

// modify CIG

VisualCIG.prototype._transitTo = function(node, workflowState, decisionState, propagateDown, propagateUp) {
	if (workflowState)
		node.data.workflow_state = workflowState
	if (decisionState)
		node.data.decisional_state = decisionState
	
	if ((propagateDown === undefined || propagateDown === true) && node.children)
		node.children.forEach((child) => this._transitTo(child, workflowState, decisionState, propagateDown, propagateUp));
	else if (propagateUp && node.parent)
		this._transitTo(node.parent, workflowState, decisionState, propagateDown, propagateUp);
}

VisualCIG.prototype._addNodes = function(adds) {
	adds.forEach((add) => {
		var children = add.parent.data.children; 
		if (add.before) {
			var idx = children.indexOf(add.before);
			children.splice(idx, 0, add.data);
		
		} else if (add.after) {
			var idx = children.indexOf(add.after);
			children.splice(idx+1, 0, add.data);
		
		} else
			children.push(add.data);
	});
	
	this._treeChanged = true;
}

VisualCIG.prototype._simulateOperations = function(operations) {
	this._setOperationLinks(operations);
}

// - refresh

VisualCIG.prototype._refresh = function() {
	if (this._treeChanged) {	
		this._root = d3.hierarchy(this._data);
		this._tree(this._root);
		this._showTree();
		
		this._treeChanged = false;
	}
	
	this._formatTree();
}

// - legend

VisualCIG.prototype._setupLegend = function(config) {	
	var legend = this._svg
		.selectAll('g g.legend');
	
	$('#container').append("<div class='hints'></div>");
	
	var hints = $('#container .hints');
	hints.css('left', config.legend.x + "px");
	hints.append("<div><b>Hint</b>: hover over a task to see its current state.</div>")
	hints.append("<div><b>Hint</b>: click on a task to see its description, if available.</div>");
	
	var x = config.legend.x; var xTextIncr = 22; 
	var y = 65; var yTextIncr = 5;
	legend.append('path').attr('d', downTriangle(15, 15, x + 8, y)).style('fill', 'white').style('stroke', 'black');
	legend.append('text').attr('x', x + xTextIncr).attr('y', y + yTextIncr).text('decision node');
	
	y += 20;
	legend.append('circle').attr('cx', x + 8).attr('cy', y).attr('r', 8).style('fill', 'white').style('stroke', 'black');
	legend.append('text').attr('x', x + xTextIncr).attr('y', y + yTextIncr).text('composite node');
	
	y += 13;
	legend.append('rect').attr('x', x).attr('y', y).attr('width', 15).attr('height', 15).style('fill', 'white').style('stroke', 'black'); //.style('stroke-width', '1px');
	legend.append('text').attr('x', x + xTextIncr).attr('y', y + yTextIncr + 7).text('task node');
	
	y += 35; yTextIncr = 12; var yNextIncr = 20;
	var states = [ { label: "discarded", fill: this._settings.workflowState.node.fill.discardedState, stroke: "black", "stroke-dasharray": ("3, 3") },
		{ label: "delayed", fill: this._settings.workflowState.node.fill.delayedState, stroke: "none", "stroke-dasharray": ("0, 0") }, 
		{ label: "adjusted", fill: this._settings.workflowState.node.fill.adjustedState, stroke: "none", "stroke-dasharray": ("0, 0") }];
		
	var transitEntries = legend.selectAll('transit').data(states).enter();
	transitEntries.append('rect')
		.attr('x', x).attr('y', (d, i) => y + i*yNextIncr).attr('width', 15).attr('height', 15)
		.style('fill', (d) => d.fill).style('stroke', (d) => d.stroke).style('stroke-dasharray', (d) => d['stroke-dasharray'])
	transitEntries.append('text').attr('x', x + xTextIncr - 2).attr('y', (d, i) => y + i*yNextIncr + yTextIncr).text((d) => d.label);	
	
	y += yNextIncr * states.length + 15;
	
	yNextIncr = 20; yTextIncr = 12;
	states = [ { label: "inactive", fill: this._settings.workflowState.node.fill.inactiveState }, 
		{ label: "active", fill: this._settings.workflowState.node.fill.activeState }, 
		{ label: "started", fill: this._settings.workflowState.node.fill.startedState },
		{ label: "completed", fill: this._settings.workflowState.node.fill.completedState } ];
	
	var colorEntries = legend.selectAll('colors').data(states).enter();
	colorEntries.append('rect').attr('x', x).attr('y', (d, i) => y + i*yNextIncr).attr('width', 15).attr('height', 15).style('fill', (d) => d.fill)
	colorEntries.append('text').attr('x', x + xTextIncr).attr('y', (d, i) => y + i*yNextIncr + yTextIncr).text((d) => d.label);	
}

// - tree hierarchy

var cnt = 0;
	
VisualCIG.prototype._showTree = function() {
	// - add a reference to this cig
	// (e.g., used for mouse events)
	this._root.descendants().forEach((d) => d.cig = this);
	
	this._showTreeLinks(this._root.links());
	this._showTreeNodes(this._root.descendants());
	
	this._setupTooltip();
	this._setupInfoBox();
}

VisualCIG.prototype._showTreeNodes = function(nodesData, update) {
	this._svg
		.select('g g.tree g.nodes')
		.data([])
		.exit()
		.remove();

	this._nodes = this._svg
		/*.call(d3.zoom()
			.scaleExtent([1, 8])
			.on("zoom", (e) => this._svg.attr("transform", e.transform)))*/
		.select('g g.tree')
		.append('g')
			.classed('nodes', true)
		.selectAll(null)
		.data(nodesData, (d) => { return d.id || (d.id = cnt++); });
	
	this._nodes = this._nodes.enter();
		
	// -- composite nodes
	
	this._nodes.filter((d) => d.data.node_type == 'task_node' && d.children !== undefined)
		  .append('circle')
		  .classed('node', true)
		  .attr('cx', (d) => d.x)
		  .attr('cy', (d) => d.y)
		  .attr('r', this._settings.nodeStyle.circle.radius);
		  
	// -- task nodes (leafs)
	
	this._nodes.filter((d) => (d.data.node_type == 'task_node' && d.children === undefined))
		  .append('rect')
		  .classed('node', true)
		  .attr('x', (d) => d.x + this._settings.nodeStyle.rect.xIncr)
		  .attr('y', (d) => d.y + this._settings.nodeStyle.rect.yIncr)
		  .attr('width', this._settings.nodeStyle.rect.width)
		  .attr('height', this._settings.nodeStyle.rect.height);
		  
	// -- decision nodes
		  
	this._nodes.filter((d) => d.data.node_type == 'decision_node')
		  .append('path')
		  .classed('node', true)
		  .attr('d', (d) => downTriangle(this._settings.nodeStyle.triangle.width, this._settings.nodeStyle.triangle.height, d.x, d.y));
		  
	// -- captions
		  
	this._nodes.append("text")
		  .classed('nodeCaption', true)
		  .attr('x', (d) => d.x)
		  .attr('y', (d) => d.y + 24)
		  .attr("text-anchor", "middle")
		  .text((d) => d.data.name)
		  .call(getBB);
	this._nodes.insert("rect", "text")
		.attr("x", (d) => d.bbox.x)
		.attr("y", (d) => d.bbox.y + 1)
		.attr("width", (d) => d.bbox.width)
		.attr("height", (d) => d.bbox.height - 1)
		.style("fill", "white");
	
	const allNodes = this._nodes.selectAll("circle.node,rect.node,path.node");
	
	const config = this._config;
	allNodes.filter((d) => (d && d.data.node_type))
		.on("mouseover", (e, i) => this._tooltip_onMouseOver(e, i, config))
		.on("mouseout", this._tooltip_onMouseOut);
		
	allNodes.filter((d) => (d && d.data.node_type && (d.data.description || d.data.source)))
		.style('cursor', "pointer")
		.on("click", this._infoBox_onClick);
}

VisualCIG.prototype._showTreeLinks = function(hierLinksData) {	
	this._svg
		.select('g g.tree g.links')
		.data([])
		.exit()
		.remove();

	this._hierLinks = this._svg
		.select('g g.tree')
		.append('g')
			.classed('links', true)
		.selectAll(null)
		.data(hierLinksData)
		.enter();
		
	this._hierLinks.filter((d) => d.target.data.after === undefined)
		.append('line')
		.classed('link', true)
		.attr('x1', (d) => d.source.x)
		.attr('y1', (d) => d.source.y)
		.attr('x2', (d) => d.target.x)
		.attr('y2', (d) => d.target.y)
		.style('stroke', (d) => "black");
	
	var lineGen = d3.line();

	this._hierLinks
		.filter((d) => d.target.data.after !== undefined)
		.append('path') // need path when coloring line .. lol
		.attr('d', (d) => lineGen([ [ d.source.x, d.source.y ], [ d.target.x, d.target.y ] ]))
		.attr('stroke', "black")
		.attr('stroke-width', 2)
		.attr('marker-end', 'url(#tree_arrow)');

	showLineCaption(
		this._hierLinks.filter((d) => d.target.data.condition !== undefined),
		(d) => d.target.data.condition
	);
	
	showLineCaption(
		this._hierLinks.filter((d) => d.target.data.after !== undefined),
		(d) => "after"
	);
	
	setupLineArrow(this._svg, "tree_arrow", [ 8, 8 ], "black");
}

function showLineCaption(selection, getCaption) {
	selection
		.append('text')
		.classed("hierCaption", true)
		.attr('x', (d, i) => linkCentroidX(d))
		.attr('y', (d, i) => linkCentroidY(d) + 10)
		.attr('text-anchor','middle')
		.text((d) => "<" + getCaption(d) + ">")
		.call(getBB);
	
	selection
		.insert("rect", "text")
		.attr("x", (d) => d.bbox.x)
		.attr("y", (d) => d.bbox.y + 1)
		.attr("width", (d) => d.bbox.width)
		.attr("height", (d) => d.bbox.height - 1)
		.style("fill", "white");		
}

// - formatting

VisualCIG.prototype._formatTree = function() {
	this._formatNodes(this._nodes);
	this._formatHierLinks(this._hierLinks);	
}

VisualCIG.prototype._formatNodes = function(nodes) {
	this._formatNodesOfType(nodes, 'task_node');
	this._formatNodesOfType(nodes, 'decision_node');
}

VisualCIG.prototype._formatNodesOfType = function(nodes, type) {
	nodes.selectAll('circle.node,rect.node,path.node')
		.filter((d) => (d && d.data.node_type))
		.style('stroke', 'black')
		.style('fill', (d) => { 
		  switch (d.data.decisional_state) {
			case 'notChosenState':
				return this._settings.decisionalState.node.fill[d.data.decisional_state];
			default:
				const state = d.data.workflow_state;
				const options = this._settings.workflowState.node.fill;
				return (options[state] ? options[state] : options['other']);
		}})
		.style("stroke-dasharray", (d) => {
		   switch (d.data.decisional_state) {
				case 'notChosenState':
					return this._settings.decisionalState.node.stroke_dasharray[d.data.decisional_state];
				default:
					const state = d.data.workflow_state;
					const options = this._settings.workflowState.node.stroke_dasharray;
					return (options[state] ? options[state] : options['other']);
		}});
}

VisualCIG.prototype._formatHierLinks = function(hierLinks) {
	hierLinks.selectAll('line')
		.style('stroke', (d) => "black")
		.style("stroke-dasharray", (d) => {
			const state = d.target.data.decisional_state;
			const options = this._settings.decisionalState.link.stroke_dasharray;
			return (options[state] ? options[state] : options['other'])
		});
}

// - tooltip

VisualCIG.prototype._setupTooltip = function() {
	this._tooltip = d3.select('#container')
		.append("div")
		.classed('tooltip', true)
		.style("opacity", 0)
		.attr('class', "tooltip");	
}

VisualCIG.prototype._setupInfoBox = function() {
	this._infoBox = d3.select('#container')
		.append("div")
		.classed('infobox', true)
		.classed('modal', true);
	
	var content = this._infoBox.append("div")
		.classed("modal-content", true);
	
	var header = content.append("div")
		.classed("modal-header", true);
	header.append("span")
		.classed("modal-close", true)
		.html("&times;")
		.on('click', (e) => this._infoBox_onClose(e, this));
	header.append("h2");
		
	content.append("div")
		.classed("modal-body", true);	
	content.append("div")
		.classed("modal-footer", true);
		
	var self = this;
	$(document).on('click', (e) => {
		if ($(e.target).hasClass('modal'))
			self._infoBox_onClose(e, self);
	});
	$(document).keyup(function(e) {
		if (e.key === "Escape") {
			self._infoBox_onClose(e, self);
		}
	});
}

VisualCIG.prototype._tooltip_onMouseOver = function(e, i, config) {
	var cig = i.cig;
	
	var node = d3.select(e.target);		
	// node.attr('priorFill', node.style('fill'))
	// node.style('fill', "red");
	
	/*var container = $('#container');
	var pos = container.position();*/

	var adjustX = (config.widthAdjust ? -config.widthAdjust : 0);

	var bbox = node.node().getBBox();
	var wfState = cig._stateLabel(i.data.workflow_state);
	var dcState = cig._stateLabel(i.data.decisional_state);
	cig._tooltip.html(`<i>workflow</i>: ${wfState}<br /><i>decisional</i>: ${dcState}`)
		.style('opacity', 1)
		.style('left', (bbox.x*1 /*+ pos.left*/ + adjustX - 25) + "px")
		.style('top', (bbox.y*1 /*+ pos.top*/ + 25) + "px");
	
	node.style('stroke-width', "2px");
	
	const factor = 1.5;
	switch (this.nodeName) {
		case 'circle':
			node.attr('r', cig._settings.nodeStyle.circle.radius * factor)
			break;
			
		case 'rect':
			var newWidth = cig._settings.nodeStyle.rect.width * factor;
			var newHeight = cig._settings.nodeStyle.rect.height * factor;
			node.attr('x', (d) => d.x - newWidth / 2)
				.attr('y', (d) => d.y - newHeight / 2)
				.attr('width', newWidth)
				.attr('height', newHeight);					
			break;
				
		case 'path':
			var newWidth = cig._settings.nodeStyle.triangle.width * factor;
			var newHeight = cig._settings.nodeStyle.triangle.height * factor;
			node.attr('d', (d) => downTriangle(newWidth, newHeight, d.x, d.y));				
			break;
	}
}

VisualCIG.prototype._tooltip_onMouseOut = function(d, i) {
	var cig = i.cig;
	
	var node = d3.select(this);
	// node.style("fill", node.attr("priorFill"));
	
	cig._tooltip.style('opacity', 0);
	
	node.style('stroke-width', "1px");
	switch (this.nodeName) {
		case 'circle':
			node.attr("r", cig._settings.nodeStyle.circle.radius);	
			break;
			
		case 'rect':
			var priorWidth = cig._settings.nodeStyle.rect.width;
			var priorHeight = cig._settings.nodeStyle.rect.height;
			node.attr('x', (d) => d.x - priorWidth / 2)
				.attr('y', (d) => d.y - priorHeight / 2)
				.attr('width', priorWidth)
				.attr('height', priorHeight);
			break;
			
		case 'path':
			var newWidth = cig._settings.nodeStyle.triangle.width;
			var newHeight = cig._settings.nodeStyle.triangle.height;
			node.attr('d', (d) => downTriangle(newWidth, newHeight, d.x, d.y));
			break;
	}
}

VisualCIG.prototype._infoBox_onClick = function(d, i) {	
	var descr = "";
	if (i.data.source !== undefined)
		descr = `<div><b>Source</b>: ${i.data.source}</div>`;
	
	else { 
		if (i.data.taskSource !== undefined)
			descr = `<div class="source"><b>Source</b>: ${i.data.taskSource}</div>`;
		else if (i.data.workflowSource !== undefined)
			descr = `<div class="source"><b>Source</b>: ${i.data.workflowSource}</div>`;
	}
	
	if (i.data.description !== undefined)
		descr += i.data.description;
		
	if (descr == "")
		return;

	var cig = i.cig;
	
	var title = i.data.name;	
	var content = descr;
	content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
	// content = content.replace(/(?:\t)/g, '&nbsp;&nbsp;');
	
	cig._infoBox.select('div.modal-header h2')
		.html(title);
	cig._infoBox.select('div.modal-body')
		.html(content);
		
	cig._infoBox.style('display', "block");
}

VisualCIG.prototype._infoBox_onClose = function(e, cig) {	
	cig._infoBox.style('display', "none");
}

// - operations
	
VisualCIG.prototype._setupOperations = function() {
	// - arrow for operation lines	
	setupLineArrow(this._svg, "op_arrow", [ 15, 15 ], "red");
}

function setupLineArrow(svg, id, markerDim, color) {
	const markerWidth = markerDim[0];
	const markerHeight = markerDim[1];
	const refX = markerWidth / 2;
	const refY = markerHeight / 2;
	const arrowPoints = [[0, 0], [0, markerHeight], [markerWidth, markerHeight / 2]];
		
	svg.append("svg:defs")
		.append("svg:marker")
		.attr('id', id)
		// .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
		.attr('refX', refX + 7)
		.attr('refY', refY)
		.attr('markerWidth', markerWidth)
		.attr('markerHeight', markerHeight)
		.attr('orient', 'auto-start-reverse')
		.append('path')
		.attr('d', d3.line()(arrowPoints))
		.attr('stroke', color)
		.style("fill", color);
}

VisualCIG.prototype._setOperationLinks = function(opLinksData) {
	this._svg
		.select('g g.tree g.operations')
		.data([])
		.exit()
		.remove();
	
	this._opLinks = 	
		this._svg.select('g g.tree')
		.append('g')
			.classed('operations', true)
		.selectAll(null)
		.data(opLinksData)
		.enter();
		
	/*this._opLinks.append('line')
		.classed('link', true)
		.attr('x1', (d) => d.source.x)
		.attr('y1', (d) => d.source.y)
		// adjust for arrow head
		.attr('x2', (d) => d.target.x + (d.target.x > d.source.x ? -7 : 7))
		.attr('y2', (d) => d.target.y + (d.target.y < d.source.y ? 3 : -3))*/
		
	const curve = d3.line().curve(d3.curveNatural);
	
	this._opLinks.append('path')
		.classed('link', true)
		.call((selection) => {
			selection.each((d) => {
				d.incr = 0;
				switch (d.curve) {
					case "up":
						d.incr = -50;
						break;
					case "down":
						d.incr = 50;
						break;
				}
			})
		})
		.attr('d', (d) => {
			const dStr = curve([
				[ d.source.x, d.source.y ], 
				stretchPoint(d, d.incr), 
				[ d.target.x + (d.target.x > d.source.x ? -8 : 8), d.target.y ]
			]);
			// console.log(dStr);
			return dStr; 
		})
		.style('stroke', (d) => "red")
		.style('fill', 'none')
		.style("stroke-dasharray", ("10,3"))
		.attr('marker-end', 'url(#op_arrow)');
		
	this._opLinks.append('text')
		.classed("opCaption", true)
		.style('fill', "red")
		.attr('x', (d, i) => linkCentroidX(d) + d.incr)
		.attr('y', (d, i) => linkCentroidY(d) + d.incr)
		.attr('text-anchor','middle')
		.text((d) => d.type)
		.call(getBB);
	this._opLinks.insert("rect", "text")
		.attr("x", (d) => d.bbox.x)
		.attr("y", (d) => d.bbox.y)
		.attr("width", (d) => d.bbox.width)
		.attr("height", (d) => d.bbox.height)
		.style("fill", "white");
		// .style("stroke", "red");
}

// - misc

VisualCIG.prototype._stateLabel = function(state) {
	return state.substring(0, state.length - "State".length);
}
VisualCIG.prototype._propagateToDescendants = function(node, workflowSource, assignState) {	
	if (workflowSource)
		node.data.workflowSource = workflowSource;
	else if (node.data.source)
		workflowSource = node.data.source;

	if (assignState)
		node.data.decisional_state = "notChosenState";
	else if (node.data.decisional_state == "notChosenState")
		assignState = true;
	
	if (node.children)
		node.children.forEach((child) => this._propagateToDescendants(child, workflowSource, assignState));
}
