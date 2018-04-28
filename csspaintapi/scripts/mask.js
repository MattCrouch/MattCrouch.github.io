class MaskModule {
  // Which custom properties should we listen for?
  static get inputProperties() {
    return ["--mask-shape", "--mask-reveal"];
  }

  // Callback called any time the target repaints
  paint(ctx, geom, properties) {
    // Keep note of the shape required
    let shape = "circle";
    if (
      properties.get("--mask-shape") &&
      ["square", "triangle", "circle"].includes(
        properties
          .get("--mask-shape")
          .toString()
          .trim()
      )
    ) {
      shape = properties
        .get("--mask-shape")
        .toString()
        .trim();
    }

    // Calculate if the mask should be revealed or not
    let reveal = false;
    if (
      properties.get("--mask-reveal") &&
      properties
        .get("--mask-reveal")
        .toString()
        .trim() == "true"
    ) {
      reveal = true;
    }

    // Record the smallest dimension of the image, to make the mask even
    const maxLength = Math.min(geom.width, geom.height);

    // Proportionally scale the outside gap with the size of the image
    ctx.lineWidth = maxLength / 25;

    // Supply a fill colour to apply the mask correctly
    ctx.fillStyle = "white";

    // Change the mask based on the supplied custom property
    // Draw the inner shape first before the outer stroke
    // Stokes are drawn centred on the line - half the line width to be aligned with it
    if (shape === "square") {
      // Square mask

      if (reveal) {
        // Inner square
        ctx.rect(
          geom.width / 2 - maxLength / 2 + ctx.lineWidth * 2,
          geom.height / 2 - maxLength / 2 + ctx.lineWidth * 2,
          maxLength - ctx.lineWidth * 4,
          maxLength - ctx.lineWidth * 4
        );
        ctx.fill();
      }

      // Outer box
      ctx.beginPath();
      ctx.rect(
        geom.width / 2 - maxLength / 2 + ctx.lineWidth / 2,
        geom.height / 2 - maxLength / 2 + ctx.lineWidth / 2,
        maxLength - ctx.lineWidth,
        maxLength - ctx.lineWidth
      );
      ctx.stroke();
    } else if (shape === "triangle") {
      // Triangle mask

      if (reveal) {
        // Inner triangle
        ctx.moveTo(geom.width / 2, ctx.lineWidth * 4);
        ctx.lineTo(
          geom.width / 2 + maxLength / 2 - ctx.lineWidth * 3,
          geom.height / 2 + maxLength / 2 - ctx.lineWidth * 2
        );
        ctx.lineTo(
          geom.width / 2 - maxLength / 2 + ctx.lineWidth * 3,
          geom.height / 2 + maxLength / 2 - ctx.lineWidth * 2
        );
        ctx.fill();
      }

      // Outer line
      ctx.beginPath();
      ctx.moveTo(geom.width / 2, ctx.lineWidth);
      ctx.lineTo(
        geom.width / 2 + maxLength / 2 - ctx.lineWidth / 2,
        geom.height / 2 + maxLength / 2 - ctx.lineWidth / 2
      );
      ctx.lineTo(
        geom.width / 2 - maxLength / 2 + ctx.lineWidth / 2,
        geom.height / 2 + maxLength / 2 - ctx.lineWidth / 2
      );
      ctx.closePath();
      ctx.stroke();
    } else {
      // Circle, or something not defined

      if (reveal) {
        // Inner circle
        ctx.beginPath();
        ctx.arc(
          geom.width / 2,
          geom.height / 2,
          maxLength / 2 - ctx.lineWidth * 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // Outer ring
      ctx.beginPath();
      ctx.arc(
        geom.width / 2,
        geom.height / 2,
        maxLength / 2 - ctx.lineWidth / 2,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
  }
}

// Register our class under a specific name
registerPaint("mask", MaskModule);
