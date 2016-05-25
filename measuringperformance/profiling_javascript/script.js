//Example 1
document.getElementById("example_1_run").addEventListener("click", function(event) {
	//Checks to see if your browser can use the tools we use to benchmark
	if(!window.performance || !window.performance.mark || !window.performance.measure) {
		alert("Your browser does not support performance.mark(), so this example will not work.");
		return;
	}
	
	//Make sure two tests don't run concurrently
	this.disabled = true;
    this.textContent = "Running...";
    
	//Run the test multiple times to take an average
    for(var i = 0; i < 10; i++) {
		performance.mark("example_1_start");
        example1();
		performance.mark("example_1_end");
        
        performance.measure("example_1", "example_1_start", "example_1_end");
        
		performance.clearMarks("example_1_start");
		performance.clearMarks("example_1_end");
    }
	
	//Display results
	addResults(document.getElementById("example_1_results"), performance.getEntriesByName("example_1"));
	
	//Clean up
	performance.clearMeasures("example_1");
    
    this.disabled = false;
    this.textContent = "Run";
});

//Example 2
document.getElementById("example_2_run").addEventListener("click", function(event) {
	//Checks to see if your browser can use the tools we use to benchmark
	if(!window.performance || !window.performance.mark || !window.performance.measure) {
		alert("Your browser does not support performance.mark(), so this example will not work.");
		return;
	}
	
	//Make sure two tests don't run concurrently
	this.disabled = true;
    this.textContent = "Running...";
    
	//Run the test multiple times to take an average
    for(var i = 0; i < 10; i++) {
		performance.mark("example_2_start");
        example2();
		performance.mark("example_2_end");
        
        performance.measure("example_2", "example_2_start", "example_2_end");
        
		performance.clearMarks("example_2_start");
		performance.clearMarks("example_2_end");
    }
	
	//Display results
	addResults(document.getElementById("example_2_results"), performance.getEntriesByName("example_2"));
	
	//Clean up
	performance.clearMeasures("example_2");
    
    this.disabled = false;
    this.textContent = "Run";
});