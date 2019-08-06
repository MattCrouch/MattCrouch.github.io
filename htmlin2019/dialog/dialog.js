// Selectors for the buttons to trigger the <dialog> elements
const showHtmlDialog = document.querySelector(".show-dialog.html");
const showJSDialog = document.querySelector(".show-dialog.js");

// Selectors for the <dialog> elements themselves
const htmlDialog = document.querySelector("dialog#html-powered");
const jsDialog = document.querySelector("dialog#js-powered");

// Output for the JS dialog
const dialogOutput = document.querySelector("#dialog-output");

// Check if this browser supports <dialog>
if (typeof jsDialog.showModal !== "function") {
  alert("This browser does not support the <dialog> element");

  // Remove any JS interactions, but leave the HTML version to show fallback
  showHtmlDialog.remove();
  showJSDialog.remove();
  htmlDialog.setAttribute("open", true);
  jsDialog.remove();
} else {
  // Open the dialog if it were done through HTML itself
  showHtmlDialog.addEventListener("click", () => {
    htmlDialog.setAttribute("open", true);
  });

  // Show modal programatically
  showJSDialog.addEventListener("click", () => {
    jsDialog.showModal();
  });

  // Form submission triggers a `close` event. Observe the value of the chosen `submit` button.
  jsDialog.addEventListener("close", () => {
    dialogOutput.innerHTML = `<code>jsDialog.returnValue</code>: ${
      jsDialog.returnValue
    }`;
  });
}
