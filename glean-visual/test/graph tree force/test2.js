var width = window.innerWidth - 20,
  height = window.innerHeight - 20,
  radius = 30;

var min_zoom = 0.1;
var max_zoom = 7;

var zoom = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom])

var fill = d3.scale.category20();

var force = d3.layout.force()
  .charge(-8000)
  .linkDistance(200)
  .size([width, height]);

force.drag().on("dragstart", dragstarted)

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

var chart = svg.append('g');

var json = {
  "nodes": [{
    "name": "node0"
  }, {
    "name": "node1"
  }, {
    "name": "node2"
  }, {
    "name": "node3"
  }, {
    "name": "node4"
  }, {
    "name": "node5"
  }, {
    "name": "node6"
  }, {
    "name": "node7"
  }, {
    "name": "node8"
  }, {
    "name": "node9"
  }, {
    "name": "node10"
  }, {
    "name": "node11"
  }, {
    "name": "node12"
  }, {
    "name": "node13"
  }, {
    "name": "node14"
  }, {
    "name": "node15"
  }, {
    "name": "node16"
  }, {
    "name": "node17"
  }, {
    "name": "node18"
  }, {
    "name": "node19"
  }, {
    "name": "node20"
  }, {
    "name": "node21"
  }, {
    "name": "node22"
  }, {
    "name": "node23"
  }, {
    "name": "node24"
  }, {
    "name": "node25"
  }, {
    "name": "node26"
  }, {
    "name": "node27"
  }, {
    "name": "node28"
  }, {
    "name": "node29"
  }, {
    "name": "node30"
  }, {
    "name": "node31"
  }, {
    "name": "node32"
  }, {
    "name": "node33"
  }, {
    "name": "node34"
  }, {
    "name": "node35"
  }, {
    "name": "node36"
  }, {
    "name": "node37"
  }, {
    "name": "node38"
  }, {
    "name": "node39"
  }, {
    "name": "node40"
  }, {
    "name": "node41"
  }, {
    "name": "node42"
  }, {
    "name": "node43"
  }, {
    "name": "node44"
  }, {
    "name": "node45"
  }, {
    "name": "node46"
  }, {
    "name": "node47"
  }, {
    "name": "node48"
  }, {
    "name": "node49"
  }, {
    "name": "node50"
  }, {
    "name": "node51"
  }, {
    "name": "node52"
  }, {
    "name": "node53"
  }, {
    "name": "node54"
  }, {
    "name": "node55"
  }, {
    "name": "node56"
  }, {
    "name": "node57"
  }, {
    "name": "node58"
  }, {
    "name": "node59"
  }, {
    "name": "node60"
  }, {
    "name": "node61"
  }, {
    "name": "node62"
  }, {
    "name": "node63"
  }, {
    "name": "node64"
  }, {
    "name": "node65"
  }, {
    "name": "node66"
  }, {
    "name": "node67"
  }, {
    "name": "node68"
  }, {
    "name": "node69"
  }, {
    "name": "node70"
  }, {
    "name": "node71"
  }, {
    "name": "node72"
  }, {
    "name": "node73"
  }, {
    "name": "node74"
  }, {
    "name": "node75"
  }, {
    "name": "node76"
  }, {
    "name": "node77"
  }, {
    "name": "node78"
  }, {
    "name": "node79"
  }, {
    "name": "node80"
  }, {
    "name": "node81"
  }, {
    "name": "node82"
  }, {
    "name": "node83"
  }, {
    "name": "node84"
  }, {
    "name": "node85"
  }, {
    "name": "node86"
  }, {
    "name": "node87"
  }, {
    "name": "node88"
  }, {
    "name": "node89"
  }, {
    "name": "node90"
  }, {
    "name": "node91"
  }, {
    "name": "node92"
  }, {
    "name": "node93"
  }, {
    "name": "node94"
  }, {
    "name": "node95"
  }, {
    "name": "node96"
  }, {
    "name": "node97"
  }, {
    "name": "node98"
  }, {
    "name": "node99"
  }],
  "links": [ {
    "source": 0,
    "target": 1
  }, {
    "source": 0,
    "target": 2
  }, {
    "source": 1,
    "target": 3
  }, {
    "source": 1,
    "target": 4
  }, {
    "source": 2,
    "target": 5
  }, {
    "source": 2,
    "target": 6
  }, {
    "source": 3,
    "target": 7
  }, {
    "source": 3,
    "target": 8
  }, {
    "source": 4,
    "target": 9
  }, {
    "source": 4,
    "target": 10
  }, {
    "source": 5,
    "target": 11
  }, {
    "source": 5,
    "target": 12
  }, {
    "source": 6,
    "target": 13
  }, {
    "source": 6,
    "target": 14
  }, {
    "source": 7,
    "target": 15
  }, {
    "source": 7,
    "target": 16
  }, {
    "source": 8,
    "target": 17
  }, {
    "source": 8,
    "target": 18
  }, {
    "source": 9,
    "target": 19
  }, {
    "source": 9,
    "target": 20
  }, {
    "source": 10,
    "target": 21
  }, {
    "source": 10,
    "target": 22
  }, {
    "source": 11,
    "target": 23
  }, {
    "source": 11,
    "target": 24
  }, {
    "source": 12,
    "target": 25
  }, {
    "source": 12,
    "target": 26
  }, {
    "source": 13,
    "target": 27
  }, {
    "source": 13,
    "target": 28
  }, {
    "source": 14,
    "target": 29
  }, {
    "source": 14,
    "target": 30
  }, {
    "source": 15,
    "target": 31
  }, {
    "source": 15,
    "target": 32
  }, {
    "source": 16,
    "target": 33
  }, {
    "source": 16,
    "target": 34
  }, {
    "source": 17,
    "target": 35
  }, {
    "source": 17,
    "target": 36
  }, {
    "source": 18,
    "target": 37
  }, {
    "source": 18,
    "target": 38
  }, {
    "source": 19,
    "target": 39
  }, {
    "source": 19,
    "target": 40
  }, {
    "source": 20,
    "target": 41
  }, {
    "source": 20,
    "target": 42
  }, {
    "source": 21,
    "target": 43
  }, {
    "source": 21,
    "target": 44
  }, {
    "source": 22,
    "target": 45
  }, {
    "source": 22,
    "target": 46
  }, {
    "source": 23,
    "target": 47
  }, {
    "source": 23,
    "target": 48
  }, {
    "source": 24,
    "target": 49
  }, {
    "source": 24,
    "target": 50
  }, {
    "source": 25,
    "target": 51
  }, {
    "source": 25,
    "target": 52
  }, {
    "source": 26,
    "target": 53
  }, {
    "source": 26,
    "target": 54
  }, {
    "source": 27,
    "target": 55
  }, {
    "source": 27,
    "target": 56
  }, {
    "source": 28,
    "target": 57
  }, {
    "source": 28,
    "target": 58
  }, {
    "source": 29,
    "target": 59
  }, {
    "source": 29,
    "target": 60
  }, {
    "source": 30,
    "target": 61
  }, {
    "source": 30,
    "target": 62
  }, {
    "source": 31,
    "target": 63
  }, {
    "source": 31,
    "target": 64
  }, {
    "source": 32,
    "target": 65
  }, {
    "source": 32,
    "target": 66
  }, {
    "source": 33,
    "target": 67
  }, {
    "source": 33,
    "target": 68
  }, {
    "source": 34,
    "target": 69
  }, {
    "source": 34,
    "target": 70
  }, {
    "source": 35,
    "target": 71
  }, {
    "source": 35,
    "target": 72
  }, {
    "source": 36,
    "target": 73
  }, {
    "source": 36,
    "target": 74
  }, {
    "source": 37,
    "target": 75
  }, {
    "source": 37,
    "target": 76
  }, {
    "source": 38,
    "target": 77
  }, {
    "source": 38,
    "target": 78
  }, {
    "source": 39,
    "target": 79
  }, {
    "source": 39,
    "target": 80
  }, {
    "source": 40,
    "target": 81
  }, {
    "source": 40,
    "target": 82
  }, {
    "source": 41,
    "target": 83
  }, {
    "source": 41,
    "target": 84
  }, {
    "source": 42,
    "target": 85
  }, {
    "source": 42,
    "target": 86
  }, {
    "source": 43,
    "target": 87
  }, {
    "source": 43,
    "target": 88
  }, {
    "source": 44,
    "target": 89
  }, {
    "source": 44,
    "target": 90
  }, {
    "source": 45,
    "target": 91
  }, {
    "source": 45,
    "target": 92
  }, {
    "source": 46,
    "target": 93
  }, {
    "source": 46,
    "target": 94
  }, {
    "source": 47,
    "target": 95
  }, {
    "source": 47,
    "target": 96
  }, {
    "source": 48,
    "target": 97
  }, {
    "source": 48,
    "target": 98
  }, {
    "source": 49,
    "target": 99
  },{
    "source": 0,
    "target": 99
  }]
}

var link = chart.selectAll("line")
  .data(json.links)
  .enter()
  .append("line")
  .attr("stroke", function(d) {
    return 'blue'
  })

var node = chart.selectAll("circle")
  .data(json.nodes)
  .enter().append("circle")
  .attr("r", radius - .75)
  .style("fill", function(d) {
    return "blue"; // fill(d.group);
  })
  .style("stroke", function(d) {
    return "black"; //d3.rgb(fill(d.group)).darker();
  })
  .on('mouseover', d => console.log(d))

.call(force.drag);

function dragstarted() {
  d3.event.sourceEvent.stopPropagation();
}

zoom.on("zoom", function(d) {

  var evt = d3.event;
  debugger;
  /*
	var dcx = (window.innerWidth/2-d.x*zoom.scale());
	var dcy = (window.innerHeight/2-d.y*zoom.scale());
  */
  var dcx = evt.translate[0]
  var dcy = evt.translate[1]

  zoom.translate([dcx, dcy]);

  chart.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");;

});

force
  .nodes(json.nodes)
  .links(json.links)
  .on("tick", tick)
  .start();

svg.call(zoom)

function tick(e) {
  var k = 6 * e.alpha;

  // Push sources up and targets down to form a weak tree.
  link
    .each(function(d,i) {
   
      d.source.y -= k * 60, d.target.y += k * 100;
    /*
    if(i%2==1){
       d.source.x -=  0.4/k  
    }else{
        d.source.x +=  0.4/k  
    }
    */
    
    })
    .attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    });

  node
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    });

}