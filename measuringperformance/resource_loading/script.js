window.addEventListener("load", function(event) {
    // Detect whether this browser supports the method required to fetch the data
    if(!window.performance || !window.performance.getEntriesByType) {
        console.warn("This browser does not support performance.getEntriesByType");
        return;
    }
    
    var resourceList = performance.getEntriesByType("resource");
    var slow = [];
    
    //Add resources that took more than 1s to load into the 'slow' array
    for (i = 0; i < resourceList.length; i++)
    {
        if(resourceList[i].duration > 1000) {
            console.warn(resourceList[i]);
            slow.push(resourceList[i]);
        }
    }
    
    //Serialise the data to be stored in localStorage to send to server later
    if(slow.length > 0) {
        if(!window.localStorage) {
            console.warn("This browser does not support window.localStorage");
        } else {
            //Fetch previous 'slow' data
            var data = localStorage["data"];
            
            //Create an empty object if this is the first data we have captured
            if(data === undefined) {
                data = {};
            } else {
                data = JSON.parse(data);
            }
            
            //Timestamp this set of data for later reference
            data[(new Date()).getTime()] = slow;
            
            //Re-store the data
            localStorage["data"] = JSON.stringify(data);
        }
    }
});