var TPP = {
	menu: undefined,
	menuVisible: false,
	init: function() {
		this.attachCss();
		this.menu = this.createMenu();
		this.addMenu(this.menu);
		var windowResize = function() {
			TPP.alignMenu();
		};
		if (window.addEventListener) {    // most non-IE browsers and IE9
			window.addEventListener("resize", windowResize, false);
		} else if (window.attachEvent) {  // Internet Explorer 5 or above
			window.attachEvent("onresize", windowResize);
		}
		//this.showMenu();
		window.setInterval(this.tick,151); //Gotta catch 'em all!
	},
	attachCss: function() {
		var css = document.createElement('link');
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.href = 'http://lc.mattcrouch.github.io/tpp/tpp.css';
		document.getElementsByTagName("head")[0].appendChild(css);
	},
	createMenu: function() {
		if (this.menu) {
			this.removeMenu();
		}
		var menu = document.createElement('div');
		var ul = document.createElement('ul');

		var menuItems = ["POKéDEX", "POKéMON", "ITEM", "RED", "SAVE", "OPTION", "EXIT"];

		for (var i = 0; i < menuItems.length; i++) {
			var li = document.createElement('li');
			
			li.appendChild(document.createTextNode(menuItems[i]));
			ul.appendChild(li);
		}

		menu.appendChild(ul);

		menu.id = "tpp_menu";
		return menu;
	},
	addMenu: function(menu) {
		this.menu = document.body.appendChild(menu);
		this.alignMenu();
	},
	removeMenu: function() {
		this.menu.remove();
		this.menu = null;
	},
	showMenu: function() {
		this.menu.style.opacity = 1;
		this.menuVisible = true;
		this.alignMenu();
		this.up(); //Select first menu item
	},
	hideMenu: function() {
		this.menu.style.opacity = 0;
		this.menuVisible = false;
		this.clearSelect();
	},
	alignMenu: function() {
		var height = this.menu.offsetHeight;
		var screenHeight = window.innerHeight;
		this.menu.style.top = (screenHeight - height) / 2 + "px";
	},
	tick: function() {
		var rand = Math.random();

		if(TPP.menuVisible) {
			if (rand > 0.9) {
				TPP.hideMenu();
			} else {
				if (parseInt(rand*10,10) % 2) {
					TPP.up();
				} else {
					TPP.down();
				}
			}
		} else {
			if (rand > 0.9) {
				TPP.showMenu();
			}
		}
	},
	up: function() {
		var allMenuItems = this.menu.querySelectorAll("ul li");
		var selected;
		for (var i = 0; i < allMenuItems.length; i++) {
			if(allMenuItems[i].className == "selected") {
				if(i>0) {
					selected = allMenuItems[i-1];
				} else {
					selected = allMenuItems[0];
				}
			}
			allMenuItems[i].className = "";
		}
		if (!selected) {
			selected = allMenuItems[0];
		}
		selected.className = "selected";
	},
	down: function() {
		var allMenuItems = this.menu.querySelectorAll("ul li");
		var selected;
		for (var i = 0; i < allMenuItems.length; i++) {
			if(allMenuItems[i].className == "selected") {
				if(i<allMenuItems.length-1) {
					selected = allMenuItems[i+1];
				} else {
					selected = allMenuItems[i];
				}
			}
			allMenuItems[i].className = "";
		}
		if (!selected) {
			selected = allMenuItems[0];
		}
		selected.className = "selected";
	},
	clearSelect:function() {
		var selectedItems = this.menu.getElementsByClassName("selected");
		for (var i = 0; i < selectedItems.length; i++) {
			selectedItems[i].className = "";
		}
	}
};

TPP.init(); TPP.alignMenu();