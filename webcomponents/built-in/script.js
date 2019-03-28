// Extend existing element rather than generic `HTMLElement`
class RelativeTime extends HTMLTimeElement {
  // Keep an eye on any changes to the `datetime` attribute
  static get observedAttributes() {
    return ["datetime"];
  }

  // Display the time once the element connects
  connectedCallback() {
    this.setTime();
  }

  // If `datetime` changes, set the time again
  attributeChangedCallback() {
    this.setTime();
  }

  setTime() {
    // Display the relative time inside the element
    this.innerHTML = timeago().format(this.getAttribute("datetime"));

    // Set the title so users can get an idea of the exact time
    this.setAttribute("title", this.getAttribute("datetime"));
  }
}

// Register the element with the browser
// Detail exactly which element this should extend
customElements.define("relative-time", RelativeTime, { extends: "time" });
