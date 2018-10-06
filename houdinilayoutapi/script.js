(async function() {
  // Feature detect Layout API
  if ("layoutWorklet" in CSS) {
    // Apply module
    await CSS.layoutWorklet.addModule("worklet.js");
  } else {
    alert("Your browser is not supported :(");
  }
})();
