'use strict';

const defaultRed = 0.0,
      defaultBlue = 0.0,
      defaultGreen = 0.0,
      defaultAlpha = 1.0;

function clearColour(red = defaultRed, green = defaultGreen, blue = defaultBlue, alpha = defaultAlpha) { this.context.clearColor(red, green, blue, alpha); }

function clearColourBuffer() { this.context.clear(this.context.COLOR_BUFFER_BIT); }

const colourMixin = {
  clearColour: clearColour,
  clearColourBuffer: clearColourBuffer
};

module.exports = colourMixin;
