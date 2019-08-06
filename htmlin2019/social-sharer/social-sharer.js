// Store information about the sharing platforms for use inside the element
const PLATFORMS = {
  facebook: {
    iconPath: "icons/facebook.svg",
    url: "https://www.facebook.com/sharer/sharer.php?u=",
    name: "Facebook"
  },
  linkedin: {
    iconPath: "icons/linkedin.svg",
    url: "https://www.linkedin.com/sharing/share-offsite/?url=",
    name: "LinkedIn"
  },
  twitter: {
    iconPath: "icons/twitter.svg",
    url: "https://twitter.com/intent/tweet?text=",
    name: "Twitter"
  }
};

// Create a class for the new element
class SocialSharer extends HTMLElement {
  // What happens when the element appears on the page
  connectedCallback() {
    // Create a shadow root to encapsulate all styles within the component
    const shadow = this.attachShadow({ mode: "open" });

    // Apply styles to the shadow root
    shadow.innerHTML = `
      <style>
        ul {
          align-items: center;
          justify-content: space-between;
          display: flex;
          list-style: none;
          margin: 0 auto;
          padding: 0;
          max-width: 30rem;
        }

        li {
          display: inline-block;
          flex: 1;
          text-align: center;
          padding: 0 1rem;
        }

        a { 
          width: 100%;
        }

        img {
          max-width: 3rem;
        }
      </style>
    `;

    // Create a container for each platform
    const ul = document.createElement("ul");

    // Iterate over each platform to create an icon
    Object.keys(PLATFORMS).forEach(platformName => {
      // Extract data for the current platform
      const { iconPath, url, name } = PLATFORMS[platformName];

      // Build a list item, link and icon
      const li = document.createElement("li");

      const a = document.createElement("a");
      a.href = url + this.getAttribute("url");
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      const img = document.createElement("img");
      img.alt = name;
      img.src = iconPath;

      // Add these to the container
      a.appendChild(img);
      li.appendChild(a);
      ul.appendChild(li);
    });

    // Add container to shadow root to have it appear
    shadow.appendChild(ul);
  }
}

// Let the browser know about the new element
customElements.define("social-sharer", SocialSharer);
