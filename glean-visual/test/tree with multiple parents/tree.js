// plot properties
let root;
let tree;
let diagonal;
let svg;
let duration = 750;
let treeMargin = { top: 0, right: 20, bottom: 20, left: 20 };
let treeWidth = window.innerWidth - treeMargin.right - treeMargin.left;
let treeHeight = window.innerHeight - treeMargin.top - treeMargin.bottom;
let treeDepth = 5;
let maxTextLength = 90;
let nodeWidth = maxTextLength + 20;
let nodeHeight = 36;
let scale = 1;

// tree data
let data = [
    {
        "name": "Root",
        "parent": "null",
        "children": [
            {
                "name": "Level 2: A",
                "parent": "Top Level",
                "children": [
                    {
                        "name": "A1",
                        "parent": "Level 2: A"
                    },
                    {
                        "name": "A2",
                        "parent": "Level 2: A"
                    }
                ]
            },
            {
                "name": "Level 2: B",
                "parent": "Top Level"
            }
        ]
    }
];

// additional links data array
let additionalLinks = []


/**
 * Initialize tree properties
 * @param {Object} treeData 
 */
function initTree(treeData) {
    // init
    tree = d3.layout.tree()
        .size([treeWidth, treeHeight]);
    diagonal = d3.svg.diagonal()
        .projection(function (d) { return [d.x + nodeWidth / 2, d.y + nodeHeight / 2]; });
    svg = d3.select("div#tree_view")
        .append("svg")
        .attr("width", treeWidth + treeMargin.right + treeMargin.left)
        .attr("height", treeHeight + treeMargin.top + treeMargin.bottom)
        .attr("transform", `translate(${treeMargin.left},${treeMargin.top})scale(${scale},${scale})`);
    root = treeData[0];
    root.x0 = treeHeight / 2;
    root.y0 = 0;

    // fill additionalLinks array
    let pairNode1 = tree.nodes(root).filter(function(d) {
        return d['name'] === 'Level 2: B';
    })[0];
    let pairNode2 = tree.nodes(root).filter(function(d) {
        return d['name'] === 'A2';
    })[0];

    let link = new Object();
    link.source = pairNode1;
    link.target = pairNode2;
    link._source = pairNode1; // backup source
    link._target = pairNode2; // backup target
    additionalLinks.push(link)

    // update
    updateTree(root);
    d3.select(self.frameElement).style("height", "500px");

    // add resize listener
    window.addEventListener("resize", function (event) {
        resizeTreePlot();
    });
}


/**
 * Perform tree update. Update nodes and links
 * @param {Object} source
 */
function updateTree(source) {
    let i = 0;
    let nodes = tree.nodes(root).reverse();
    let links = tree.links(nodes);

    nodes.forEach(function (d) { d.y = d.depth * 80; });

    // ======== add nodes and text elements ========
    let node = svg.selectAll("g.node")
        .data(nodes, function (d) { return d.id || (d.id = ++i); });

    let nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) { return `translate(${source.x0},${source.y0})`; })
        .on("click", click);

    nodeEnter.append("rect")
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .attr("rx", 2)
        .style("fill", function(d) { return d._children ? "#ace3b5": "#f4f4f9"; });

    nodeEnter.append("text")
        .attr("y", nodeHeight / 2)
        .attr("x", 13)
        .attr("dy", ".35em")
        .text(function (d) { return d.name; })
        .style("fill-opacity", 1e-6);

    let nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) { return `translate(${d.x},${d.y})`; });

    nodeUpdate.select("rect")
        .attr("width", nodeWidth)
        .style("fill", function(d) { return d._children ? "#ace3b5": "#f4f4f9"; });

    nodeUpdate.select("text").style("fill-opacity", 1);

    let nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) { return `translate(${source.x},${source.y})`; })
        .remove();

    nodeExit.select("rect")
        .attr("width", nodeWidth)
        .attr("rx", 2)
        .attr("height", nodeHeight);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // ======== add links ========
    let link = svg.selectAll("path.link")
        .data(links, function (d) { return d.target.id; });

    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("x", nodeWidth / 2)
        .attr("y", nodeHeight / 2)
        .attr("d", function (d) {
            var o = { x: source.x0, y: source.y0 };
            return diagonal({ source: o, target: o });
        });

    link.transition()
        .duration(duration)
        .attr("d", diagonal)

    link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
            let o = { x: source.x, y: source.y };
            return diagonal({ source: o, target: o });
        })
        .remove();

    // ======== add additional links (mpLinks) ========
    let mpLink = svg.selectAll("path.mpLink")
        .data(additionalLinks);

    mpLink.enter().insert("path", "g")
        .attr("class", "mpLink")
        .attr("x", nodeWidth / 2)
        .attr("y", nodeHeight / 2)
        .attr("d", function (d) {
            var o = { x: source.x0, y: source.y0 };
            return diagonal({ source: o, target: o });
        });

    mpLink.transition()
        .duration(duration)
        .attr("d", diagonal)
        .attr("stroke-width", 1.5)

    mpLink.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
            let o = { x: source.x, y: source.y };
            return diagonal({ source: o, target: o });
        })
        .remove();

    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

/**
 * Handle on tree node clicked actions
 * @param {Object} d node
 */
function click(d) {
    // update regular links
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }

    // update additional links
    additionalLinks.forEach(function(link){
        let sourceVisible = false;
        let targetVisible = false;
        tree.nodes(root).filter(function(n) {
            if(n["name"] == link._source.name){
                sourceVisible = true;
            }
            if(n["name"] == link._target.name){
                targetVisible = true;
            }
        });

        if(sourceVisible && targetVisible){
            link.source = link._source;
            link.target = link._target;
        }
        else if(!sourceVisible && targetVisible 
                    || !sourceVisible && !targetVisible){
            link.source = d;
            link.target = link.source;
        }
        else if(sourceVisible && !targetVisible){
            link.source = link._source;
            link.target = link.source;
        }
    });

    // define more links behavior here...

    updateTree(d);
}

/**
 * Update tree dimension
 */
 function updateTreeDimension() {
    tree.size([treeWidth, treeHeight]);
    svg.attr("width", treeWidth + treeMargin.right + treeMargin.left)
        .attr("height", treeHeight + treeMargin.top + treeMargin.bottom)
        .attr("transform", `translate(${treeMargin.left},${treeMargin.top})scale(${scale},${scale})`);
}

/**
 * Resize the tree using current window dimension
 */
function resizeTreePlot() {
    treeWidth = 0.9 * window.innerWidth - treeMargin.right - treeMargin.left;
    treeHeight = (treeDepth + 2) * nodeHeight * 2;
    updateTreeDimension();
    updateTree(root);
}


// plot tree
initTree(data);
updateTree(root);
