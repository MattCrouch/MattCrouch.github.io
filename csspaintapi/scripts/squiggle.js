class SquiggleModule {
  // Which custom properties should we listen for?
  static get inputProperties() {
    return [
      '--dropshadow-color',
      '--foreground-color',
      '--dropshadow-color',
      '--dropshadow-distance',
      '--x-position',
      '--y-position'
    ];
  }

  // Called for every squiggle that is rendered
  drawPoint(x, y, cursorX, cursorY, width, ctx) {
    // Start drawing a squiggle
    ctx.beginPath();
    // Save the current coordinate system
    ctx.save();
    // Move to the start point
    ctx.translate(x, y);
    
    // If cursor points have been defined, rotate to face that position
    if (cursorX && cursorY) {
      ctx.rotate(this.calculateAngle(x, y, cursorX.toString(), cursorY.toString())); // rotate around the start point of your line
    }

    // Move the context to the starting position, where the point will be drawn
    ctx.moveTo(0,0);

    // Create three lines to create the squiggle
    ctx.lineTo(10, 8);
    ctx.lineTo(20, 0);
    ctx.lineTo(30, 8);

    // Draw the lines
    ctx.stroke();

    // Reset the context to the original positioning
    ctx.restore();
  }

  // Callback called any time the target repaints
  paint(ctx, geom, properties) {
    // Define the width and spacing of the squiggle lines
    const width = 10;
    const spacing = 20;
    
    // Set up context from the custom property values
    ctx.strokeStyle = properties.get('--foreground-color').toString();
    ctx.shadowOffsetX = properties.get('--dropshadow-distance').toString();
    ctx.shadowOffsetY = properties.get('--dropshadow-distance').toString();
    ctx.shadowColor = properties.get('--dropshadow-color').toString();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';

    // Define how often the squiggles will repeat
    let offsetX = (geom.width / 2) % (width * spacing);
    let offsetY = (geom.height / 2) % (width * spacing);

    // Loop through each row of squiggles
    for(let y = 0; y < geom.height/(width * spacing) + 1; y++) {
      // Count how many have been on each row so far
      let count = 0;

      // Loop through each column of squiggles
      for(let x = 0; x < geom.width/(width * spacing) + 1; x++) {
        // Up the count
        count++;

        // Calculate where each squiggle should be placed
        let pointX = (x * (width * spacing)) - ((width * spacing) - offsetX);
        let pointY = (y * (width * spacing)) - ((width * spacing) - offsetY);

        // Offset every other squiggle in a row
        if (count % 2 === 1) {
          pointY += (width * (spacing / 2));
        }
        
        // Draw a squiggle at a given position
        this.drawPoint(pointX, pointY, properties.get('--x-position'), properties.get('--y-position'), width, ctx);
      }
    }
  }

  // Calculate the angle the squiggle should orientate itself to
  calculateAngle(pointX, pointY, cursorX, cursorY) {
    return Math.atan2(cursorY - pointY, cursorX - pointX);
  }
}

// Register our class under a specific name
registerPaint('squiggle', SquiggleModule);