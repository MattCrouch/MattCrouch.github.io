window.onload = (function() {
	var inputTxt = document.getElementById("instructions");
	var submitBtn = document.getElementById("submit");
	var outputTxt = document.getElementById("response");

	var orientations = ["N", "E", "S", "W"];
	var worldSize;
	var losses = [];
	var output = [];

	var Position = function(x, y) {
		/*
		 * Reports the current position of the robot
		 * @return {String} position
		 */
		var reportPosition = function() {
			return x + "," + y;
		};

		/*
		 * Go forward, based on current direction of travel
		 * @param {String} direction
		 * @return {Boolean} success
		 */
		var move = function(direction) {
			var oldX = x;
			var oldY = y;

			switch(direction) {
				case "N":
					y += 1;
					break;
				case "E":
					x += 1;
					break;
				case "S":
					y -= 1;
					break;
				case "W":
					x -= 1;
					break;
			}

			if(!inBounds(x, y)) {
				//Revert change for position reporting
				x = oldX;
				y = oldY;

				if(checkLosses(x, y)) {
					//Ignore this instruction, but carry on
					return true;
				}

				//No previous loss detected, we lose the robot
				return false;
			}

			return true;
		};

		/*
		 * Compares positions. Used to check if scent has been left.
		 * @param {Integer} matchX
		 * @param {Integer} matchY
		 * @return {Boolean} match
		 */
		var matches = function(matchX, matchY) {
			if(x === matchX && y === matchY) {
				return true;
			}

			return false;
		};

		return {
			reportPosition: reportPosition,
			move: move,
			matches: matches
		};
	};

	var Robot = function(x, y, orientation) {
		var position = new Position(x, y);
		var isLost = false;

		/*
		 * Turn the robot in the direction specified
		 * @param {String} direction
		 */
		var turn = function(direction) {
			//move across orientations array in direction
			var shift;
			if(direction == "L") {
				//Move left across array
				shift = -1;
			} else if(direction == "R") {
				//Move right across array
				shift = 1;
			}

			//Locate position of current orientation so we can shift in the array
			var orientationIndex = orientations.indexOf(orientation);

			if(orientationIndex !== -1) {
				orientationIndex = (orientationIndex + shift) % orientations.length;
				if(orientationIndex < 0) {
					//Loop back to the end of the array
					orientationIndex = orientations.length + orientationIndex;
				}
				orientation = orientations[orientationIndex];
			}
		};

		/*
		 * Move the robot forward
		 * @return {Boolean} success
		 */
		var move = function() {
			return position.move(orientation);
		};

		/*
		 * Reports the position of the robot, and its status if lost
		 * @return {String} status
		 */
		var reportPosition = function() {
			return position.reportPosition() + orientation + (isLost ? "LOST" : "");
		};

		/*
		 * Reports the loss of a robot, and pushes its last known position to the loss array
		 */
		var reportLoss = function() {
			isLost = true;
			losses.push(position);
		};

		return {
			position: position,
			turn: turn,
			move: move,
			reportPosition: reportPosition,
			reportLoss: reportLoss
		};
	};

	/*
	 * Resets the world
	 */
	var reset = function() {
		worldSize = undefined;
		losses = [];
		output = [];
	};

	/*
	 * Processes the instructions inside the input box and displays in the output box
	 * @param {Event} event
	 */
	var processInput = function(event) {
		reset();

		//Separate all lines so we can deal with them separately
		var instructions = inputTxt.value.split("\n");

		for(var i = 0; i < instructions.length; i++) {
			var instruction = instructions[i].trim();

			if(instruction === "") {
				//Blank instruction
				continue;
			}
			
			//Set the world size, as this will be the first instruction supplied
			if(worldSize === undefined) {
				try {
					setWorldSize(instruction);
				} catch(e) {
					output.push(e);
					break;
				}

				continue;
			}

			//Process the initial location and movement instructions for this robot
			i++;
			var nextInstruction = instructions[i].trim();

			processRobot(instruction, nextInstruction);
		}

		//Display the final outcome
		renderOutput();
	};

	/*
	 * Sets the size of the world the robots move in from a string instruction
	 * @param {String} instruction
	 */
	var setWorldSize = function(instruction) {
		instruction = instruction.split(",");

		var x = parseInt(instruction[0], 10);
		var y = parseInt(instruction[1], 10);

		if(x < 0 || y < 0) {
			//World cannot be 0 or negative height/width
			throw "Invalid world size";
		}

		worldSize = {
			x: x,
			y: y
		};
	};

	/*
	 * Create and move based on string instructions
	 * @param {String} initialise
	 * @param {String} movement
	 */
	var processRobot = function(initialise, movement) {
		var robot;
		try {
			robot = createRobot(initialise);
			moveRobot(robot, movement);
		} catch(e) {
			output.push(e);
		}
	};

	/*
	 * Create a robot based on a string instruction
	 * @param {String} instruction
	 * @return {Robot} robot
	 */
	var createRobot = function(instruction) {
		var initialise = instruction.split("");

		var x = parseInt(initialise[0], 10);
		var y = parseInt(initialise[2], 10);
		var orientation = initialise[3];

		if(!inBounds(x, y)) {
			throw "Robot not on map";
		}

		if(orientations.indexOf(orientation) === -1) {
			throw "Invalid orientation";
		}

		return new Robot(x, y, orientation);
	};

	/*
	 * Move a specified robot based on a string instruction
	 * @param {Robot} robot
	 * @param {String} instruction
	 */
	var moveRobot = function(robot, instruction) {
		var movements = instruction.split("");

		//Turn if instruction is Left or Right, or move if it is Forward
		for(var i = 0; i < movements.length; i++) {
			if(movements[i] == "L" || movements[i] == "R") {
				robot.turn(movements[i]);
			} else if(movements[i] == "F") {
				if(!robot.move()) {
					//Cannot move the robot to this point in the map
					robot.reportLoss();
					break;
				}
			}
		}

		output.push(robot.reportPosition());
	};

	/*
	 * Checks whether provided co-ordinates are within the map
	 * @param {Integer} x
	 * @param {Integer} y
	 * @return {Boolean} inBounds
	 */
	var inBounds = function(x, y) {
		if( x >= 0 && x <= worldSize.x && y >= 0 && y <= worldSize.y) {
			return true;
		}

		return false;
	};

	/*
	 * Searches losses to see if a robot has left a scent in this position
	 * @param {Integer} x
	 * @param {Integer} y
	 * @return {Boolean} lossFound
	 */
	var checkLosses = function(x, y) {
		if(losses.length === 0) {
			//There will be no matches
			return false;
		}

		for(var i = 0; i < losses.length; i++) {
			if(losses[i].matches(x, y)) {
				return true;
			}
		}

		//No matches
		return false;
	};

	/*
	 * Renders the output in the output box
	 */
	var renderOutput = function() {
		outputTxt.value = output.join("\n");
	};

	submitBtn.addEventListener("click", processInput);
});