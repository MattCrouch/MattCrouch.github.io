//Checks to see if your browser can use the tools we use to benchmark
window.addEventListener("load", function() {
	if(!window.performance || !window.performance.mark || !window.performance.measure) {
		document.getElementById("no_performance_mark").style.display = "block";
		
		var runButtons = document.getElementsByTagName("button");
		
		Array.prototype.forEach.call(runButtons, function(element) {
			element.disabled = true;
		}, this);
	}
});

//Takes an array of values and fetches the median
function getMedian(results) {
    var sorted = results.slice().sort();
    var half = Math.floor(sorted.length / 2);

    if(sorted.length % 2 === 1) {
        return sorted[half];
    } else {
        return (sorted[half-1] + sorted[half]) / 2;
    }
}

//Tabulates results of the test
function addResults(table, measures) {
	table.getElementsByTagName("tbody")[0].innerHTML = "";
    table.getElementsByClassName("median")[0].textContent = "";
	
	var durations = [];
	
	for(var i = 0; i < measures.length; i++) {
		durations.push(measures[i].duration);
		var timeTaken = measures[i].duration;

		var tbody = table.getElementsByTagName("tbody")[0];
		var row = tbody.insertRow();
		var runCountCell = row.insertCell();
		runCountCell.appendChild(document.createTextNode(i+1));
		var timeTakenCell = row.insertCell();
		timeTakenCell.appendChild(document.createTextNode(timeTaken));
	}

    table.getElementsByClassName("median")[0].textContent = getMedian(durations);
}
