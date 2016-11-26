//Check for custom element support
const supportsCustomElementsV1 = 'customElements' in window;

if(!supportsCustomElementsV1) {
    document.body.classList.add("custom-elements-unsupported");
    alert("This browser does not support Custom Elements v1");
} else {
    //Create our TabbedDisplay element class
    class TabbedDisplay extends HTMLElement {
        constructor() {
            //Always run the constructor of the parent
            super();

            // Attach a shadow root to the element.
            let shadowRoot = this.attachShadow({mode: "open"});

            //Create the contents for the shadow DOM
            shadowRoot.innerHTML = `
                <style>
                    :host {
                        box-sizing: border-box;
                        display: block;
                    }

                    #tabs-container {
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        background: var(--tab-bar-bg, transparent);
                        border-radius: 5px 5px 0 0;
                    }

                    :host([stacked]) #tabs-container {
                        flex-direction: column;
                    }

                    :host([collapsed]) #tabs-container {
                        border-radius: 5px;
                    }

                    @media(max-width: 400px) {
                        #tabs-container {
                            flex-direction: column;
                        }
                    }

                    #tabs-container ::slotted(*) {
                        cursor: pointer;
                        border: none;
                        text-decoration: none;
                        font-size: 1rem;
                        background-color: transparent;
                        padding: 0.5em;
                        border-bottom: 0.25em solid transparent;
                        flex-grow: 1;
                        text-align: center;
                        transition: all 0.25s;
                    }
                    
                    #tabs-container ::slotted([active]) {
                        border-bottom-color: var(--tab-selected-color, transparent);
                    }

                    #content-container {
                        background: var(--tab-content-bg, transparent);
                        overflow: hidden;
                        border-radius: 0 0 5px 5px;
                    }

                    #content-container ::slotted([aria-hidden=true]) {
                        display: none;
                    }

                    :host([collapsed]) #content-container {
                        display: none;
                    } 
                </style>

                <div id="tabs-container">
                    <slot name="tab"></slot>
                </div>
                
                <div id="content-container">
                    <slot></slot>
                </div>
            `;
        }

        //Set up event listeners and initial display
        connectedCallback() {
            this.tabSlot = this.shadowRoot.querySelector("#tabs-container slot");
            this.contentSlot = this.shadowRoot.querySelector("#content-container slot");

            this.boundTabClick = this.onTabSlotClick.bind(this);
            this.boundKeyDown = this.onTabSlotKeyDown.bind(this);

            this.tabSlot.addEventListener("click", this.boundTabClick);
            this.tabSlot.addEventListener("keydown", this.boundKeyDown);

            let tabs = this.getTabs();
            let contents = this.getContents();

            //Add ARIA attributes
            this.setAttribute("role", "tablist");
            for(let i = 0; i < tabs.length; i++) {
                tabs[i].setAttribute("role", "tab");
            }
            for(let i = 0; i < contents.length; i++) {
                contents[i].setAttribute("role", "tabpanel");
            }

            //Select default tab
            let defaultSelection = 0;
            for(let i = 0; i < tabs.length; i++) {
                if(tabs[i].hasAttribute("active")) {
                    defaultSelection = i;
                }
            }

            if(this.collapsed) {
                this.selected = defaultSelection;
                this.hideAllTabs();
            } else {
                this.selectTab(defaultSelection);
            }
        }

        //Define which attributes we get notified for
        static get observedAttributes() {
            return ["collapsed"];
        }

        //Add callback for when an attribute changes
        attributeChangedCallback(name, oldValue, newValue) {
            if(name == "collapsed") {
                this.collapsed = newValue;
            }
        }

        //Mirror collapsed attribute with property
        set collapsed(value) {
            if(value === true || value === "true" || value === "") {
                this.setAttribute("collapsed", value);
                this.hideAllTabs();
            } else {
                this.removeAttribute("collapsed");
                this.selectTab(this.selected);
            }
        }

        get collapsed() {
            return this.hasAttribute("collapsed") && [null,"","true"].indexOf(this.getAttribute("collapsed")) !== -1;
        }

        //Act on the click on the tab bar
        onTabSlotClick(e) {
            if(e.target.slot == "tab") {
                e.preventDefault();

                if(this.collapsed) {
                    this.collapsed = null;
                }

                let index = [].indexOf.call(e.target.parentNode.children, e.target);

                if(index >= 0) {
                    this.selectTab(index);
                }
            }
        }

        //Act on the key presses when the tab bar is focused
        onTabSlotKeyDown(e) {
            if([37,38].indexOf(e.keyCode) !== -1) {
                //Left or Up
                e.preventDefault();
                let newIndex = this.selected - 1;
                if(newIndex < 0) {
                    newIndex = this.getTabs().length - 1;
                }
                this.selectTab(newIndex);
            } else if([39,40].indexOf(e.keyCode) !== -1) {
                //Right or Down
                e.preventDefault();
                let newIndex = this.selected + 1;
                if(newIndex >= this.getTabs().length) {
                    newIndex = 0;
                }
                this.selectTab(newIndex);
            }
        }

        //Fetch all tabs at the current time
        getTabs() {
            if(typeof this.tabSlot === "undefined" || this.tabSlot.assignedNodes({flatten: true}).length === 0) {
                return undefined;
            }

            return this.tabSlot.assignedNodes({flatten: true}).filter(el => {
                return el.nodeType === Node.ELEMENT_NODE;
            });
        }

        //Fetch all the tabbed content at the current time
        getContents() {
            if(typeof this.contentSlot === "undefined" || this.contentSlot.assignedNodes({flatten: true}).length === 0) {
                return undefined;
            }

            return this.contentSlot.assignedNodes({flatten: true}).filter(el => {
                return el.nodeType === Node.ELEMENT_NODE;
            });
        }

        //Hide all available tabs
        hideAllTabs() {
            const tabs = this.getTabs();
            const contents = this.getContents();
            
            if(typeof tabs === "undefined" || typeof contents === "undefined") {
                return;
            }

            for(let i = 0; i < tabs.length; i++) {
                tabs[i].removeAttribute("active");
                tabs[i].setAttribute("tabindex", "-1");
            }

            for(let i = 0; i < contents.length; i++) {
                contents[i].setAttribute("aria-hidden", true);
            }
        }

        //Select a tab with a specified index
        selectTab(index) {
            this.selected = index;
            const tabs = this.getTabs();
            const contents = this.getContents();
            
            if(typeof tabs === "undefined" || typeof contents === "undefined") {
                return;
            }

            for(let i = 0; i < tabs.length; i++) {
                if(i == index) {
                    tabs[i].setAttribute("active", "");
                    tabs[i].setAttribute("tabindex", "0");
                    tabs[i].focus();
                } else {
                    tabs[i].removeAttribute("active");
                    tabs[i].setAttribute("tabindex", "-1");
                }
            }

            for(let i = 0; i < contents.length; i++) {
                if(i == index) {
                    contents[i].setAttribute("aria-hidden", false);
                } else {
                    contents[i].setAttribute("aria-hidden", true);
                }
            }
        }

        //Remove event listeners when the element gets removed
        disconnectedCallback() {
            this.tabSlot.removeEventListener("click", this.boundTabClick);
            this.tabSlot.removeEventListener("keydown", this.boundKeyDown);
        }
    }

    //Register the custom element
    customElements.define("tabbed-display", TabbedDisplay);
}