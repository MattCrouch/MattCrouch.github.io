(function() {
    //Check for Web Animations API support
    if(!("animate" in document.createElement("div"))) {
        return;
    }

    var svgNS = "http://www.w3.org/2000/svg";
    var xlinkNS = "http://www.w3.org/1999/xlink";

    var container;
    var containerPlayer;
    var sprite;

    var percentage;

    var maxDistance = calculateMaxDistance();

    var sun;
    var planets = [
        {
            svg_id: "planet_1"
        },
        {
            svg_id: "planet_2"
        },
        {
            svg_id: "planet_3"
        }
    ];

    var progress = 0;

    function createSvg(id) {
        var svg = document.createElementNS(svgNS, "svg");
        var use = document.createElementNS(svgNS, "use");
        use.setAttributeNS(xlinkNS, "href", id);        
        svg.appendChild(use);

        return svg;
    }

    function loadSprite() {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "assets/planets.svg", true);
        ajax.send();
        ajax.onload = function(e) {
            sprite = document.createElement("div");
            sprite.id = "preload_sprite";
            sprite.innerHTML = ajax.responseText;
            document.body.insertBefore(sprite, document.body.childNodes[0]);
        };
    }

    function simulateLoading() {
        progress += Math.random() * 5;
        if(progress >= 100) {
            progress = 100;
            update();
            complete();
        } else {
            setTimeout(simulateLoading, 200);
            update();
        }
    }

    function calculateMaxDistance() {
        var maxDistance = document.body.clientHeight;
        
        if(document.body.clientWidth < maxDistance) {
            maxDistance = document.body.clientWidth;
        }
        
        maxDistance /= 2;

        return maxDistance;
    }

    function calculateDuration(distance) {
        return (2 * Math.PI) * Math.sqrt((Math.pow(distance,3))/10);
    }

    function update() {
        var progressPercent = progress / 100;
        planets.forEach(function(planet) {
            planet.orbit.playbackRate = progressPercent;
            planet.orbitOffset.playbackRate = progressPercent;
        });

        percentage.innerText = Math.round(progress) + "%";
    }

    function complete() {
        containerPlayer = container.animate({
            opacity: [1, 0]
        }, {
            duration: 1000,
            delay: 500,
            easing: "ease-out",
            fill: "forwards"
        });

        containerPlayer.addEventListener("finish", cleanup);
    }

    function cleanup() {
        containerPlayer.removeEventListener("finish", cleanup);
        document.body.removeChild(sprite);
        document.body.removeChild(container);
    }

    function init() {
        //Add the container
        container = document.createElement("div");
        container.id = "preload_container";
        document.body.insertBefore(container, document.body.childNodes[0]);

        //Load the sprite
        loadSprite();

        //Add the sun
        sun = createSvg("#sun");
        sun.classList.add("sun");
        container.appendChild(sun);
        

        //Add the planets
        planets.forEach(function(planet) {
            var distance = 100 + (Math.random() * (maxDistance - 100));
            var randomPoint = Math.random() * calculateDuration(distance);
            
            var timings = {
                duration: calculateDuration(distance),
                iterations: Infinity,
                iterationStart: randomPoint
            };

            planet.svg = createSvg("#" + planet.svg_id);
            planet.svg.classList.add("planet");
            planet.svg.classList.add(planet.svg_id);
            container.appendChild(planet.svg);

            planet.orbit = planet.svg.animate([
                { transform: "rotate(0deg) translateY(-" + distance + "px)" },
                { transform: "rotate(360deg) translateY(-" + distance + "px)" },
            ], timings);

            var use = planet.svg.getElementsByTagNameNS(svgNS, "use")[0];

            planet.orbitOffset = use.animate({
                transform: ["rotate(0deg)", "rotate(-360deg)"]
            }, timings);
        });

        //Add progress percentage
        percentage = document.createElement("span");
        percentage.classList.add("percentage");
        percentage.innerText = "0%";
        container.appendChild(percentage);

        // Start the ball rolling
        simulateLoading();
    }

    init();
})();