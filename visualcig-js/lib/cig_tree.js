function VisualCIG(source, input) {
	CIGBase.call(this, source, input);

	return this;
}

VisualCIG.prototype = Object.create(CIGBase.prototype);
VisualCIG.prototype.constructor = VisualCIG;


// - fields

VisualCIG.prototype._data = null;
VisualCIG.prototype._root = null;
VisualCIG.prototype._tree = null;
VisualCIG.prototype._svg = null;
VisualCIG.prototype._nodes = null;
VisualCIG.prototype._hierLinks = null;
VisualCIG.prototype._extraLinks = null;
VisualCIG.prototype._opLinks = null;

VisualCIG.prototype._treeChanged = false;


// - settings

VisualCIG.prototype._settings = {
	taskWindow: {
		top: 55,
		left: 15,
		incr: 30
	},
	labels: {
		expandComposite: "double-click to expand",
		showDescription: "click for more"
	},
	dim: {
		svg: {
			padding: 25, // some padding for contents
			translate: { x: 0, y: 0 } // e.g., room for hints
		},
		tree: {
			branchWidth: 185,
			levelHeight: 105,
			translate: { x: 0, y: 14 } // else root is cut off
		},
		legend: { x: 25 }
	},
	nodeStyle: {
		circle: { radius: 12 },
		rect: {
			xIncr: -8,
			yIncr: -8,
			width: 15,
			height: 15
		},
		triangle: {
			width: 18,
			height: 18
		},
		diamond: {
			width: 12,
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
				completedState: 'rgb(0, 109, 136)',
				inactiveState: 'moccasin',
				activeState: '#00CCFF',
				startedState: 'deepskyblue',
				discardedState: 'white',
				delayedState: 'lightgrey',
				adjustedState: 'mediumpurple'
			},
			stroke_dasharray: {
				discardedState: ("3,3"),
				other: 'none'
			},
			stroke_width: {
				activeState: '2px',
				other: '1px'
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

function findOption(name, options) {
	return (options[name] ? options[name] : options['other']);
}

// transits: [{ node, workflowState, decisionState, propagate (optional) }] (mandatory; can be empty)
// operations: [{ source, target, type }] (mandatory; can be empty)
// adds: [{ parent, data }] (optional)
VisualCIG.prototype.update = function ({ transits, operations, adds }) {
	transits.forEach((transit) => {
		var nodes = (Array.isArray(transit.node) ? transit.node : [transit.node]);
		nodes.forEach((node) => this._transitTo(node,
			transit.workflowState, transit.decisionState,
			transit.propagateDown, transit.propagateUp
		));
	});
	if (adds) this._addNodes(adds);
	
	this._refreshTree();

	this._simulateOperations(operations);
}

VisualCIG.prototype._backFromHiding = function() {
	this._input._cig = this;
	this._refreshTree();
}

VisualCIG.prototype._initView = function (config) {
	this._inputs = [];

	// - initialize

	this._container = (config.container ? config.container : d3.select('div#main-container'));
	if (!config.inTaskWindow) {
		// this._showHints(config);
	}

	this._setupHeader(config);

	// - prep data object

	if (!config.inTaskWindow) {
		// (hide composite nodes in entire workflow)
		this._initComposedChildren(this._data);
	}

	// (propagate "not-chosen" state, "source" property to descendants)
	this._prepareTree(this._data);

	// - setup tree layout

	// (let's not show the workflow node)
	const nodeData = this._workflow.data.children[0];
	this._root = d3.hierarchy(nodeData);

	// calculate tree dimensions

	const stats = this._treeStats();
	const treeWidth = this._settings.dim.tree.branchWidth * stats.numBranches;
	const treeHeight = this._settings.dim.tree.levelHeight * stats.numLevels;

	this._tree = d3.tree();
	this._tree.size([treeWidth, treeHeight]);
	this._tree(this._root);

	// - initialize svg element

	this._svg = this._container.append('svg');

	var g = this._svg.append('g');

	g.append('g')
		.classed('legend', true);

	var gTree = g.append('g')
		.classed('tree', true);

	// adding operations here always puts it as the first element (even when sorting, ..)
	// so only add it when needed; in that case, it's added at the end
	gTree.selectAll(null)
		.data(['links', 'nodes'])
		.enter()
		.append('g')
		.attr('class', (d) => d);

	// - show legend
	this._showLegend();

	// - adjust tree position, e.g., based on legend
	const treeTr = this._adjustTreePos(config);

	// - show hierarchy (tree)

	this._showAndFormatTree();

	if (!config.inTaskWindow) {
		this._setupTooltip();
		this._setupInfoBox();
	}

	this._refreshHeader();

	// - ready to finalize svg element

	// .. g.tree element sometimes has different dim than treeWidth, treeHeight;
	// so let's size svg element directly based on g element

	// (not used; get width, height of document)
	// (if screen is very small or devtools are open, height will be very small, and tree will be smushed)
	// (also, not pretty in case of task windows)
	// const specWidth = $(document).width();
	// const specHeight = $(document).height();

	const actualSize = g.node().getBoundingClientRect();

	const padding = this._settings.dim.svg.padding;
	this._svg
		.attr("width", g.node().getBBox().x + actualSize.width + padding)
		.attr("height", g.node().getBBox().y + actualSize.height + padding);

	if (!config.inTaskWindow) {
		const svgTr = this._settings.dim.svg.translate;
		this._svg.attr("transform", 'translate(' + svgTr.x + "," + svgTr.y + ")");
	}

	// - operations	
	this._setupOperations();

	// - loading icon
	this._setupLoadingIcon();

	// - reset button
	this._setupResetBtn(config);

	if (!window.taskStack)
		window.taskStack = new TaskStack(this);
}

VisualCIG.prototype.shown = function() {
	this.isCurrent();
	this._refreshTree();	
}

VisualCIG.prototype._treeStats = function (node) {
	var stats = { numLevels: this._root.height, numBranches: 1 };
	this._treeStatsNode(this._root, stats);

	return stats;
}

VisualCIG.prototype._treeStatsNode = function (node, stats) {
	if (node.children === undefined)
		return;
	stats.numBranches += node.children.length - 1;
	node.children.forEach((child) => this._treeStatsNode(child, stats));
}

VisualCIG.prototype._adjustTreePos = function (config) {
	const legendDim = this._legend.node().getBoundingClientRect();

	const minTreePos = this._minTreePos(this._root, legendDim);

	var treeTr = [this._settings.dim.tree.translate.x,
	this._settings.dim.tree.translate.y];

	// console.log("treeTr?", treeTr);
	// console.log("adjust? minX = ", minTreePos, "vs.", legendDim.width);

	// adjustment needed to avoid overlap with legend
	if (minTreePos < legendDim.width) {
		// console.log("adjust!");
		treeTr[0] = legendDim.width;
	}
	// console.log("treeTr? (2)", treeTr);

	if (config.translate) {
		treeTr[0] += config.translate.x;
		treeTr[1] += config.translate.y;
	}

	this._svg.select('g g.tree')
		.attr("transform", "translate(" + treeTr[0] + "," + treeTr[1] + ")");

	return treeTr;
}

VisualCIG.prototype._minTreePos = function (node, overlap, minX) {
	if (minX === undefined)
		minX = overlap.width;

	// TODO currently not possible to get corresponding label, 
	// so use this "worst-case" (label width / 2) for min-pos
	if (node.y < overlap.height) {
		const labelX = node.x - 85;
		if (labelX < overlap.width)
			minX = labelX;

		if (node.children !== undefined)
			return this._minTreePos(node.children[0], overlap, minX);
	}
	return minX;
}

// initializes composite tasks (sets internal attribute)
// and hides their composed sub-tasks
VisualCIG.prototype._initComposedChildren = function (node) {
	if (!node.children)
		return;

	node.children.forEach((childNode) => {
		this._initComposedChildren(childNode);

		// (let's not call this for the root node; only do this for child nodes)
		if (childNode.children && childNode.node_type == 'composite_task') {
			const nexts = childNode.children.filter((d2) => !d2.composed);

			childNode._children = childNode.children;
			childNode.children = nexts;
		}
	});
}

// methods below assume that initComposedChildren was called first
// (see _initView, line 191)

VisualCIG.prototype._showComposedChildren = function (node) {
	this._showHideComposed(node, true);
}

VisualCIG.prototype._hideComposedChildren = function (node) {
	this._showHideComposed(node, false);
}

VisualCIG.prototype._showHideComposed = function (node, show) {
	const selection = node._children.filter((d2) => (show ? d2.composed : !d2.composed));
	node.children = selection;
}

// - end API 

// modify CIG

VisualCIG.prototype._transitTo = function (node, workflowState, decisionState, propagateDown, propagateUp) {
	if (workflowState)
		node.data.workflow_state = workflowState
	if (decisionState)
		node.data.decisional_state = decisionState

	if (propagateDown === true && node.children)
		node.children.forEach((child) => this._transitTo(child, workflowState, decisionState, propagateDown, propagateUp));
	else if (propagateUp && node.parent)
		this._transitTo(node.parent, workflowState, decisionState, propagateDown, propagateUp);
}

VisualCIG.prototype._addNodes = function (adds) {
	adds.forEach((add) => {
		var children = add.parent.data.children;
		if (add.before) {
			var idx = children.indexOf(add.before);
			children.splice(idx, 0, add.data);

		} else if (add.after) {
			var idx = children.indexOf(add.after);
			children.splice(idx + 1, 0, add.data);

		} else
			children.push(add.data);
	});

	this._treeChanged = true;
}

VisualCIG.prototype._simulateOperations = function (operations) {
	this._setOperationLinks(operations);
}

// - refresh

VisualCIG.prototype._refreshTree = function () {
	if (this._treeChanged) {
		this._root = d3.hierarchy(this._data);
		this._tree(this._root);
		this._showTree();

		this._treeChanged = false;
	}

	this._formatTree();
	this._refreshHeader();

	this._infoBox_onClose({});
}

// - hints

VisualCIG.prototype._showHints = function (config) {
	const hints = $("<div class='hints'></div>");
	$(this._container.node()).append(hints);
	hints.css('padding-left', this._settings.dim.legend.x + "px");
	hints.append("<div><b>Hint</b>: double-click on a composite node (circle) to expand it.</div>");
	hints.append("<div><b>Hint</b>: hover over a task to see its current state.</div>");
	hints.append("<div><b>Hint</b>: click on a task to see its description, if available.</div>");
}

// - legend

VisualCIG.prototype._showLegend = function () {
	var legend = this._svg
		.selectAll('g g.legend');

	legend.attr("transform", "translate(0,-50)");

	var x = this._settings.dim.legend.x; var xTextIncr = 22;
	var y = 65; var yTextIncr = 5;
	legend.append('path').attr('d', downTriangle(15, 15, x + 8, y)).style('fill', 'white').style('stroke', 'black');
	legend.append('text').attr('x', x + xTextIncr).attr('y', y + yTextIncr).text('decision node');

	y += 20;
	legend.append('circle').attr('cx', x + 8).attr('cy', y).attr('r', 8).style('fill', 'white').style('stroke', 'black');
	legend.append('text').attr('x', x + xTextIncr).attr('y', y + yTextIncr).text('composite node');

	y += 13;
	legend.append('rect').attr('x', x).attr('y', y).attr('width', 15).attr('height', 15).style('fill', 'white').style('stroke', 'black');
	legend.append('text').attr('x', x + xTextIncr).attr('y', y + yTextIncr + 7).text('task node');

	y += 30;
	legend.append('path').attr('d', diamond(10, 18, x + 7, y)).style('fill', 'white').style('stroke', 'black');
	legend.append('text').attr('x', x + xTextIncr).attr('y', y + yTextIncr).text('endpoint');

	y += 35; yTextIncr = 12; var yNextIncr = 20;
	var states = [
		{ label: "discarded", fill: this._settings.workflowState.node.fill.discardedState, stroke: "black", "stroke-dasharray": ("3, 3") }
		//{ label: "delayed", fill: this._settings.workflowState.node.fill.delayedState, stroke: "none", "stroke-dasharray": ("0, 0") },
		//{ label: "adjusted", fill: this._settings.workflowState.node.fill.adjustedState, stroke: "none", "stroke-dasharray": ("0, 0") }
	];

	var transitEntries = legend.selectAll('transit').data(states).enter();
	transitEntries.append('rect')
		.attr('x', x).attr('y', (d, i) => y + i * yNextIncr).attr('width', 15).attr('height', 15)
		.style('fill', (d) => d.fill).style('stroke', (d) => d.stroke).style('stroke-dasharray', (d) => d['stroke-dasharray'])
	transitEntries.append('text').attr('x', x + xTextIncr - 2).attr('y', (d, i) => y + i * yNextIncr + yTextIncr).text((d) => d.label);

	y += yNextIncr * states.length;

	yNextIncr = 20; yTextIncr = 12;
	states = [{ label: "inactive", state: 'inactiveState' },
	{ label: "active", state: 'activeState' },
	// { label: "started", fill: this._settings.workflowState.node.fill.startedState },
	{ label: "completed", state: 'completedState' }];

	var colorEntries = legend.selectAll('colors').data(states).enter();
	colorEntries.append('rect').attr('x', x).attr('y', (d, i) => y + i * yNextIncr).attr('width', 15).attr('height', 15)
		.style('fill', (d) => findOption(d.state, this._settings.workflowState.node.fill))
		.style('stroke', 'black')
		.style('stroke-width', (d) => findOption(d.state, this._settings.workflowState.node.stroke_width))
	colorEntries.append('text').attr('x', x + xTextIncr).attr('y', (d, i) => y + i * yNextIncr + yTextIncr).text((d) => d.label);

	this._legend = legend;
}

// - tree hierarchy

// (testing)
var cnt = 0;
var cnt2 = 0;


VisualCIG.prototype._showAndFormatTree = function () {
	this._showTree();
	this._formatTree();
}

VisualCIG.prototype._showTree = function () {
	// - add a reference to this cig
	// (e.g., used for mouse events)
	this._root.descendants().forEach((d) => d.cig = this);

	this._resetTreeLinks();

	// - show "regular" hierarchical links
	this._hierLinks = this._showTreeLinks(this._root.links());

	// - setup extra links for multi-parent nodes
	this._setupMultiParentLinks();
	this._extraLinks = this._showTreeLinks(this._extraLinkData);

	// - show tree nodes!
	this._showTreeNodes(this._root.descendants());
}

VisualCIG.prototype._resetTreeLinks = function () {
	this._svg
		.select('g g.tree g.links')
		.data([])
		.exit()
		.remove();

	this._svg
		.select('g g.tree')
		.append('g')
		.classed('links', true);
}

VisualCIG.prototype._showTreeLinks = function (hierLinksData) {
	var hierLinks = this._svg
		.select('g g.tree g.links')
		.append('g')
		.selectAll(null)
		.data(hierLinksData)
		.enter();

	var gs = hierLinks.filter((d) =>
		d.target.data.after === undefined
		// don't show hidden elements 
		&& d.target.data.hidden === undefined
	)
		.append('g');

	// - straight edges

	gs.filter((d) => !d.curved)
		.append('line')
		.classed('link', true)
		.attr('x1', (d) => d.source.x)
		.attr('y1', (d) => d.source.y)
		.attr('x2', (d) => d.target.x)
		.attr('y2', (d) => d.target.y)
		.style('stroke', (d) => "black");

	// - curved edges

	var curveGen = d3.line().curve(d3.curveNatural);
	gs.filter((d) => d.curved)
		.append('path')
		.attr('d', (d) => curveGen([
			[d.source.x, d.source.y],
			[d.source.x + 100, linkCentroidY(d)],
			[d.target.x, d.target.y]
		]))
		.attr('stroke', "black")
		.attr('fill', 'none')
		.attr('stroke-width', 1)
		.attr('marker-end', 'url(#tree_arrow)');

	var conditionals = gs.filter((d) => d.condition || d.target.data.condition);

	conditionals.append('text')
		.classed("hierCaption", true)
		.attr('x', (d, i) => (!d.curved ? linkCentroidX(d) : (d.source.x + 100)))
		.attr('y', (d, i) => (!d.curved ? (linkCentroidY(d) + 10) : linkCentroidY(d)))
		.attr('text-anchor', 'middle')
		.text((d) => (d.condition ? d.condition.label : d.target.data.condition.label))
		.call(getBB);

	conditionals.insert("rect", "text")
		.attr("x", (d) => d.bbox.x)
		.attr("y", (d) => d.bbox.y + 1)
		.attr("width", (d) => d.bbox.width)
		.attr("height", (d) => d.bbox.height - 1)
		.style("fill", "white");

	const config = this._config;
	conditionals.selectAll("text.hierCaption")
		.on("mouseover", (e, d) => this._linkTooltip_onMouseOver(e, d, config))
		.on("mouseout", this._linkTooltip_onMouseOut);

	conditionals.selectAll("text.hierCaption")
		.filter((d) => {
			const cond = (d.condition ? d.condition : d.target.data.condition);
			return cond.description !== undefined;
		})
		.style('cursor', "pointer")
		.on("click", this._linkInfoBox_onClick);

	var lineGen = d3.line();

	// (support for ad-hoc lines for comorbid demos)
	hierLinks
		.filter((d) => d.target.data.after !== undefined)
		.append('path') // need path when coloring line .. lol
		.attr('d', (d) => lineGen([[d.source.x, d.source.y], [d.target.x, d.target.y]]))
		.attr('stroke', "black")
		.attr('stroke-width', 2)
		.attr('marker-end', 'url(#tree_arrow)');

	setupLineArrow(this._svg, "tree_arrow", [8, 8], "black");

	return hierLinks;
}

VisualCIG.prototype._showTreeNodes = function (nodesData, update) {
	this._svg
		.select('g g.tree g.nodes')
		.data([])
		.exit()
		.remove();

	const nodes0 = this._svg
		/*.call(d3.zoom()
			.scaleExtent([1, 8])
			.on("zoom", (e) => this._svg.attr("transform", e.transform)))*/
		.select('g g.tree')
		.append('g')
		.classed('nodes', true)
		.selectAll(null)
		.data(nodesData); //, (d) => { return d.id || (d.id = cnt++); });

	this._nodes = nodes0.enter();

	// -- composite nodes

	this._nodes.filter((d) => d.data.node_type == 'composite_task')
		.append('circle')
		.classed('node', true)
		.attr('cx', (d) => d.x)
		.attr('cy', (d) => d.y)
		.attr('r', this._settings.nodeStyle.circle.radius);

	// -- task nodes (leafs)

	this._nodes.filter((d) => (d.data.node_type == 'atomic_task'))
		.append('rect')
		.classed('node', true)
		.attr('x', (d) => d.x + this._settings.nodeStyle.rect.xIncr)
		.attr('y', (d) => d.y + this._settings.nodeStyle.rect.yIncr)
		.attr('width', this._settings.nodeStyle.rect.width)
		.attr('height', this._settings.nodeStyle.rect.height);

	// -- endpoints

	this._nodes.filter((d) => (d.data.node_type == 'endpoint'))
		.append("path")
		.classed('node', true)
		.attr('d', (d) => diamond(this._settings.nodeStyle.diamond.width,
			this._settings.nodeStyle.diamond.height, d.x, d.y))
		.style("stroke-width", 1)
		.style("stroke-dasharray", "1,0")
		.style("stroke", "black");

	// -- decision nodes

	this._nodes.filter((d) => d.data.node_type == 'decision_task')
		.append('path')
		.classed('node', true)
		.attr('d', (d) => downTriangle(this._settings.nodeStyle.triangle.width,
			this._settings.nodeStyle.triangle.height, d.x, d.y));

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

	// const allNodes = this._nodes.selectAll("circle.node,rect.node,path.node");

	const config = this._config;
	this._nodes.selectAll("circle.node,rect.node,path.node")
		.filter((d) => (d && d.data.node_type))
		.on("mouseover", (e, d) => this._nodeTooltip_onMouseOver(e, d, config))
		.on("mouseout", this._nodeTooltip_onMouseOut);

	this._nodes.selectAll("circle.node,rect.node,path.node,text")
		// (non-root) composite tasks are handled specially (see below)
		.filter((d) => (d && d.data.node_type != 'composite_task' &&
			(d.data.description || d.data.source || d.data.inputForm || d.data.insert)))
		.style('cursor', "pointer")
		.on("click", this._nodeInfoBox_onClick);

	var self = this;

	// var cc = clickcancel();
	this._nodes.selectAll("circle.node,rect.node,text")
		.filter((d) => (d && d.data.node_type == 'composite_task'))
		.on("dblclick", function (e, d) {
			// unsure why this is needed ..
			self._nodeTooltip_onMouseOut.call(this, e, d);
			
			taskStack.openTaskWindow(e, d);
		})
		.style('cursor', "pointer");
	// .call(cc);

	// cc.on("click", this._nodeInfoBox_onClick);
}

// - formatting

VisualCIG.prototype._formatTree = function () {
	this._formatNodes(this._nodes);
	this._formatHierLinks(this._extraLinks);
	this._formatHierLinks(this._hierLinks);
}

VisualCIG.prototype._formatNodes = function (nodes) {
	nodes.selectAll('circle.node,rect.node,path.node')
		.filter((d) => (d && d.data.node_type))
		.style('stroke', 'black')
		.style('stroke-width', (d) => findOption(d.data.workflow_state,
			this._settings.workflowState.node.stroke_width))
		.style('fill', (d) => {
			switch (d.data.decisional_state) {
				case 'notChosenState':
					return findOption(d.data.decisional_state,
						this._settings.decisionalState.node.fill);
				default:
					return findOption(d.data.workflow_state,
						this._settings.workflowState.node.fill);
			}
		})
		.style("stroke-dasharray", (d) => {
			switch (d.data.decisional_state) {
				case 'notChosenState':
					return findOption(d.data.decisional_state,
						this._settings.decisionalState.node.stroke_dasharray);
				default:
					return findOption(d.data.workflow_state,
						this._settings.workflowState.node.stroke_dasharray);
			}
		});
}

VisualCIG.prototype._formatHierLinks = function (hierLinks) {
	hierLinks.selectAll('line')
		.style('stroke', (d) => "black")
		.style("stroke-dasharray", (d) => findOption(d.target.data.decisional_state,
			this._settings.decisionalState.link.stroke_dasharray));
}

// - main header

VisualCIG.prototype._setupHeader = function (config) {
	const header = this._container.append("div")
		.classed('header', true);

	if (config.inTaskWindow) {
		const breadcrumbs = taskStack.breadcrumbs();

		header.append('div')
			.classed('breadcrumbs', true)
			.text(breadcrumbs);

		header.append("span")
			.classed("close taskwindow-close", true)
			.html("&times;")
			.on('click', (e) => { taskStack.closeTaskWindow(e); e.stopPropagation(); });

	} else
		header.classed('main-header', true);


	header.append('div')
		.classed('title', true)
		.text(this._data.name);

	header.append('div')
		.classed('workflow-status', true);
}

VisualCIG.prototype._refreshHeader = function () {
	const header = this._container.select("div.header");
	const state = header.select('div.workflow-status');

	const workflowState = this._workflow.data.workflow_state;
	if (workflowState == 'completedState') {
		state.style('display', 'block');
		
		if (!header.classed('main-header'))
			state.html("(close to continue)");

	} else
		state.style('display', 'none');
};

// - tooltip

VisualCIG.prototype._setupTooltip = function () {
	d3.select('body')
		.append("div")
		.classed('tooltip', true)
		.style("opacity", 0)
		.attr('class', "tooltip");
}

VisualCIG.prototype._nodeTooltip_onMouseOver = function (e, d, config) {
	var cig = d.cig;

	var node = d3.select(e.target);

	var text = undefined;
	if (d.data.node_type == 'composite_task')
		text = cig._settings.labels.expandComposite;
	else // if (d.data.description || d.data.source)
		text = cig._settings.labels.showDescription;

	/*const wfState = cig._stateLabel(d.data.workflow_state);
	const dcState = cig._stateLabel(d.data.decisional_state);
	const text = `<i>workflow</i>: ${wfState}<br /><i>decisional</i>: ${dcState}`*/

	if (text !== undefined) {
		const bbox = getAbsoluteBoundingBox(node);
		// const bbox = $(node.node()).offset();
		// console.log("bbox", bbox);

		d3.select('.tooltip').html(text)
			.style('opacity', 1)
			.style('left', (bbox.left - 25) + "px")
			.style('top', (bbox.top + 25) + "px");
	}

	node.style('stroke-width', "3px");

	const factor = 1.5;
	switch (d.node_type) {

		case 'composite_task':
			node.attr('r', cig._settings.nodeStyle.circle.radius * factor)
			break;

		case 'decision_task':
			var newWidth = cig._settings.nodeStyle.triangle.width * factor;
			var newHeight = cig._settings.nodeStyle.triangle.height * factor;
			node.attr('d', (d) => downTriangle(newWidth, newHeight, d.x, d.y));
			break;

		case 'atomic_task':
			var newWidth = cig._settings.nodeStyle.rect.width * factor;
			var newHeight = cig._settings.nodeStyle.rect.height * factor;
			node.attr('x', (d) => d.x - newWidth / 2)
				.attr('y', (d) => d.y - newHeight / 2)
				.attr('width', newWidth)
				.attr('height', newHeight);
			break;

		case 'endpoint':
			var newWidth = cig._settings.nodeStyle.diamond.width * factor;
			var newHeight = cig._settings.nodeStyle.diamond.height * factor;
			node.attr('d', (d) => diamond(newWidth, newHeight, d.x, d.y));
			break;
	}
}

VisualCIG.prototype._nodeTooltip_onMouseOut = function (e, d) {
	var cig = d.cig;

	var node = d3.select(this);
	// node.style("fill", node.attr("priorFill"));

	d3.select('.tooltip').style('opacity', 0)
		.style('left', "0px")
		.style('top', "0px");

	node.style('stroke-width', (d) => findOption(d.data.workflow_state,
		cig._settings.workflowState.node.stroke_width));

	switch (d.node_type) {
		case 'composite_task':
			node.attr("r", cig._settings.nodeStyle.circle.radius);
			break;

		case 'decision_task':
			var newWidth = cig._settings.nodeStyle.triangle.width;
			var newHeight = cig._settings.nodeStyle.triangle.height;
			node.attr('d', (d) => downTriangle(newWidth, newHeight, d.x, d.y));
			break;

		case 'atomic_task':
			var priorWidth = cig._settings.nodeStyle.rect.width;
			var priorHeight = cig._settings.nodeStyle.rect.height;
			node.attr('x', (d) => d.x - priorWidth / 2)
				.attr('y', (d) => d.y - priorHeight / 2)
				.attr('width', priorWidth)
				.attr('height', priorHeight);
			break;

		case 'endpoint':
			var newWidth = cig._settings.nodeStyle.diamond.width;
			var newHeight = cig._settings.nodeStyle.diamond.height;
			node.attr('d', (d) => diamond(newWidth, newHeight, d.x, d.y));
			break;
	}
}

VisualCIG.prototype._linkTooltip_onMouseOver = function (e, d, config) {
	var text = d3.select(e.target);
	var link = d3.select(e.target.parentNode.childNodes[0]);

	link.style('stroke-width', "2px");

	const condition = (d.condition ? d.condition : d.target.data.condition)
	if (condition.description === undefined)
		return;

	var cig = d.target.cig;

	const bbox = getAbsoluteBoundingBox(text);
	// const bbox = $(text.node()).offset();
	const html = cig._settings.labels.showDescription;
	d3.select('.tooltip').html(html)
		.style('opacity', 1)
		.style('left', (bbox.left * 1) + "px")
		.style('top', (bbox.top * 1 + 15) + "px");
}

VisualCIG.prototype._linkTooltip_onMouseOut = function (e, d) {
	var text = d3.select(e.target);
	var link = d3.select(e.target.parentNode.childNodes[0]);

	link.style('stroke-width', "1px");

	const condition = (d.condition ? d.condition : d.target.data.condition)
	if (condition.description === undefined)
		return;

	var cig = d.target.cig;

	d3.select('.tooltip').style('opacity', 0)
		.style('left', "0px")
		.style('top', "0px");
}

// - infobox

var infoBoxOpen = false;

VisualCIG.prototype._setupInfoBox = function () {
	const infoBox = d3.select('body')
		.append("div")
		.classed('infobox input-form', true);

	var content = infoBox.append("div")
		.classed("infobox-content", true);

	var header = content.append("div")
		.classed("infobox-header", true);
	header.append("span")
		.classed("close", true)
		.html("&times;")
		.on('click', (e) => this._infoBox_onClose(e, this));
	header.append("h2");

	content.append("div")
		.classed("infobox-body", true);
	content.append("div")
		.classed("infobox-footer", true);

	var self = this;
	$(document).on('click', (e) => {
		if (!infoBoxOpen || e.handled) return;
		if ($(e.target).parents('.infobox').length > 0)
			return;
		self._infoBox_onClose(e, self);
	});
	$(document).keyup((e) => {
		if (e.key === "Escape") {
			self._infoBox_onClose(e, self);
		}
	});
}

VisualCIG.prototype._nodeInfoBox_onClick = function (e, d) {
	var title = d.data.name;

	var content = "";

	if (d.data.source !== undefined)
		content = `<div><b>Source</b>: ${d.data.source}</div>`;
	else {
		if (d.data.taskSource !== undefined)
			content = `<div class="source"><b>Source</b>: ${d.data.taskSource}</div>`;
		else if (d.data.workflowSource !== undefined)
			content = `<div class="source"><b>Source</b>: ${d.data.workflowSource}</div>`;
	}

	if (d.data.description !== undefined)
		content = d.data.description;

	if (d.data.insert !== undefined) {
		var insert = d.data.insert;
		insert = insert.replace(/(?:\r\n|\r|\n)/g, "");
		content += "<br />" + insert;
	}

	if (d.data.inputForm !== undefined)
		content += "<h3>Input:</h3>" + d.data.inputForm;

	var cig = d.cig;
	cig._showInfoBox(e, d, title, content, cig);

	e.stopPropagation();
	e.handled = true;
	infoBoxOpen = true;
}

VisualCIG.prototype._linkInfoBox_onClick = function (e, d) {
	const cond = (d.condition ? d.condition : d.target.data.condition);
	var label = cond.label;
	var descr = cond.description;

	var cig = d.target.cig;
	var title = label;
	var content = descr;
	cig._showInfoBox(e, d, title, content, cig);

	e.stopPropagation();
	e.handled = true;
	infoBoxOpen = true;
}

VisualCIG.prototype._showInfoBox = function (e, d, title, content, cig) {
	content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
	// content = content.replace(/(?:\t)/g, '&nbsp;&nbsp;');

	const infoBox = $('.infobox');

	infoBox.find('.infobox-header h2')
		.html(title);
	const body = infoBox.find('.infobox-body')
	body.html(content);

	if (d.data && d.data.inputForm) {
		// - first, update the html content

		// add 'disabled' property & note, if needed
		const state = d.data.workflow_state;

		// add submit & reset btn
		$("<tr><td>" +
			"<input type='submit' value='submit'></input>" +
			"&nbsp;&nbsp;<input type='submit' value='reset'></input>" +
			"</td></tr>"
		).insertAfter(body.find('tr:last-child'));

		body.find("input[value=submit]").on("click", (e) => 
			this._input.submitInputData(e.target));
		body.find("input[value=reset]").on("click", (e) => { 
			let id = $(e.target).parents('.infobox').attr('id');
			this.resetObservations(id);
		});

		if (state == 'inactiveState' || state == 'discardedState') {
			const name = state.substring(0, state.length - "state".length);
			body.find('input').prop('disabled', true);
			$(`<div class='infobox-nope'>(currently ${name})</div>`).insertBefore(body.find('table'));
		}

		// add error placeholder
		$("<tr><td colspan='2'><div class='input-error'></td></tr>"
		).insertBefore(body.find('tr:last-child'));

		this._input.setupInput(body, d.data);
		infoBox.attr('id', d.data.id);
	}

	const node = d3.select(e.target);
	// const bbox0 = $(node.node()).offset();
	const bbox = getAbsoluteBoundingBox(node);
	// console.log("bbox", bbox0, bbox);

	infoBox
		.css('left', (bbox.left + bbox.width + 5) + "px")
		.css('top', (bbox.top + (bbox.height / 2) - 75) + "px");

	infoBox.css('display', "block");
}

VisualCIG.prototype._infoBox_onClose = function (e) {
	const infoBox = $('.infobox');
	if (infoBox.css('display') == 'block') {
		infoBox.css('display', "none");

		e.handled = true; // yes
		infoBoxOpen = false;
	}
}

// - operations

VisualCIG.prototype._setupOperations = function () {
	// - arrow for operation lines	
	setupLineArrow(this._svg, "op_arrow", [15, 15], "red");
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

VisualCIG.prototype._setOperationLinks = function (opLinksData) {
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
				[d.source.x, d.source.y],
				stretchPoint(d, d.incr),
				[d.target.x + (d.target.x > d.source.x ? -8 : 8), d.target.y]
			]);
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
		.attr('text-anchor', 'middle')
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

VisualCIG.prototype._stateLabel = function (state) {
	return state.substring(0, state.length - "State".length);
}

VisualCIG.prototype._prepareTree = function (node) {
	this._propagateToDescendants(node);
}

VisualCIG.prototype._propagateToDescendants = function (node, workflowSource, assignState) {
	if (workflowSource)
		node.workflowSource = workflowSource;
	else if (node.source)
		workflowSource = node.source;

	if (assignState)
		node.decisional_state = "notChosenState";
	else if (node.decisional_state == "notChosenState")
		assignState = true;

	if (node.children)
		node.children.forEach((child) =>
			this._propagateToDescendants(child, workflowSource, assignState));
}

VisualCIG.prototype._setupMultiParentLinks = function () {
	this._extraLinkData = [];
	this._root.descendants().forEach((childNode) => {
		if (childNode.data.otherParents) {

			for (var otherParent of childNode.data.otherParents) {
				const parentId = otherParent.id;
				const parentNode = this._root.descendants().find((p) => p.data.id == parentId);

				// multi-parent pattern (1):
				// parent at depth - 1, parent at depth - 2 (possibly higher parents as well)
				// (child-node will be the "direct" child of deepest parent)
				// add a straight link for second parent
				// (json will have extra "hidden" child for that one, which clears the way)
				// add curved link for higher parents

				const curved = (parentNode.depth < childNode.depth - 2);
				this._extraLinkData.push({
					source: parentNode,
					target: childNode,
					condition: otherParent.condition,
					curved: curved
				});
			}
		}
	});
}

VisualCIG.prototype._setupLoadingIcon = function () {
	$('body').append(
		"<div class='overlay'><div class='overlay__inner'><div class='overlay__content'>" +
		"<span class='spinner'></span>" +
		"</div></div></div>"
	);
}

VisualCIG.prototype._setupResetBtn = function (config) {
	var offset = { x: 0, y: 0 };
	if (!config.inTaskWindow) {
		offset = this._settings.dim.svg.translate;
	}

	this._container
		.append("button")
		.html("reset")
		.style('position', 'absolute')
		.style('left', offset.x + 25 + "px")
		.style('bottom', -offset.y + 10 + "px")
		.on("click", this._source.resetAllObservations);
}

// - Task stack

function TaskStack(initCig) {
	this._stack.push({ id: initCig._workflow.id, data: initCig._workflow.data, nr: -1 });

	this._setupListeners();

	return this;
}

TaskStack.prototype.constructor = TaskStack;

TaskStack.prototype._stack = [];

TaskStack.prototype._setupListeners = function() {
	// (new listener will override former one)
	$(document).on('keyup', (e) => {
		if (infoBoxOpen || e.handled) return; // let infobox deal with the key
		if (this._stack.length == 1) return;
		if (e.key == "Escape") this.closeTaskWindow(e);
	});
	// (needs to be updated so clicking on window header also doesn't close it)
	// (currently leaving it out cause it's difficult)
	/* $(document).on('click', (e) => {
		if (infoBoxOpen || e.handled) return; // let infobox deal with the click
		if (this._stack.length == 1) return;

		if (e.target.nodeName == 'HTML' || e.target.nodeName == 'BODY') {
			this.closeTaskWindow(e);

		} else {
			const task = this._stack[this._stack.length - 1];
			const targetId = e.target.parentNode.getAttribute("id");
			const targetName = e.target.parentNode.nodeName;

			if (targetName != 'g' // clicked a node or link
				&& targetId != task.id) {

				this.closeTaskWindow(e);
			}
		}
	}); */
}

TaskStack.prototype.openTaskWindow = function (e, d) {
	const cig = d.cig;

	const nr = this._stack.length - 1;

	// - style prior cig

	this._getPriorCIG(nr)
		.style('opacity', (nr == 0 ? "25%" : "50%"));

	// - create container

	var incr = cig._settings.taskWindow.incr * (nr + 1);
	var top = cig._settings.taskWindow.top + incr;
	var left = cig._settings.taskWindow.left + incr;

	const id = "sub-container" + nr;
	const container = d3.select('body')
		.append("div")
		.attr("id", id)
		.classed('container window', true)
		.style('top', top + "px").style('left', left + "px");

	// - cig

	const config = {
		container: container,
		inTaskWindow: true
	};
	// Object.assign(config, cig._config);

	const newWfView = d.data;
	// will be initially hidden
	cig._showComposedChildren(newWfView);

	this._stack.push({ id: id, data: newWfView, nr: nr, cig: cig, config: config });

	var cig2 = new VisualCIG(cig._source, cig._input);
	cig2.showFromView(newWfView, config);
}

TaskStack.prototype.closeTaskWindow = function (e) {
	const { data, nr, cig } = this._stack.pop();
	
	cig.shown();

	// - remove current cig
	d3.select("div#sub-container" + nr).remove();

	// - reset prior cig
	this._getPriorCIG(nr)
		.style('opacity', "100%");

	// hide composed children again
	cig._hideComposedChildren(data);

	// override prior cig attributes
	cig._root.descendants().forEach((d) => d.cig = cig);

	// in case of any new transitions to be shown
	// (based on interactions with the sub-CIG!)
	// this.refresh();
}

TaskStack.prototype.breadcrumbs = function (d) {
	var breadcrumbs = "";
	for (const task of this._stack)
		breadcrumbs += task.data.name + " > ";

	return breadcrumbs;
}

TaskStack.prototype._getPriorCIG = function (nr) {
	if (nr == 0)
		return d3.select('div#main-container')
			.select('svg');
	else
		return d3.select('div#sub-container' + (nr - 1));
}