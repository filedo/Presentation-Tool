
function count(answerList,choiceNum){
	var numbers = new Array(9);
	for(var i = 0;i < numbers.length;i++){
		numbers[i] = 0;
	}


	for(var i = 0;i < answerList.length;i++){
		var number = answerList[i];
		switch(number){
			case '1': numbers[0]++;
			break;
			case '2': numbers[1]++;
			break;
			case '3': numbers[2]++;
			break;
			case '4': numbers[3]++;
			break;
			case '5': numbers[4]++;
			break;
			case '6': numbers[5]++;
			break;
			case '7': numbers[6]++;
			break;
			case '8': numbers[7]++;
			break;
			case '9': numbers[8]++;
			break;
		}
	}

	var dataset = [];


	for(var i=1;i<=choiceNum;i++){
		var data = {name: i, count: numbers[i-1]};
		dataset.push(data);
	}


	var scaleX = d3.scale.linear()
        .domain([0, dataset.length]).range([0, 600]);
    var scaleY = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d){return d.count;})]).range([0,180]);

    var canvas = d3.select("#countDialog");
    var svg = canvas.append("svg")
        .attr("width",550).attr("height",200)
        .attr("shape-rendering", "crispEdges");


    svg.selectAll("rect")
        .data(dataset).enter().append("rect")
        .attr("x", function(d, i){return scaleX(i) + 25/dataset.length})
        .attr("y", function(d, i){return 190 - scaleY(d.count)})
        .attr("width", function(d, i){return 150/dataset.length})
        .attr("height", function(d, i){return scaleY(d.count)})
        .attr("fill", "blue");

    svg.selectAll("text.name")
        .data(dataset).enter().append("text")
        .attr("x", function(d, i){return scaleX(i) + 100/dataset.length})
        .attr("y", function(d, i){return 200})
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .attr("font-family", "selif")
        .text(function(d, i){return d.name})
        .attr("fill", "black");

    svg.selectAll("text.count")
        .data(dataset).enter().append("text")
        .attr("x", function(d, i){return scaleX(i) + 100/dataset.length})
        .attr("y", function(d, i){return 210 - scaleY(d.count)})
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("font-family", "selif")
        .text(function(d, i){return d.count})
        .attr("fill", "white");
}