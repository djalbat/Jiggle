'use strict';

const Element = require('../element'),
      ColourRenderer = require('../renderer/colour'),
      TextureRenderer = require('../renderer/texture');

class Part extends Element {
  constructor(textureRenderer, colourRenderer, canvas) {
    super();

    this.textureRenderer = textureRenderer;

    this.colourRenderer = colourRenderer;

    this.canvas = canvas;
  }
  
  getColourRenderer() {
    return this.colourRenderer;
  }
  
  getTextureRenderer() {
    return this.textureRenderer;
  }

  getChildElements() {
    return this.childElements;
  }

  render(offsetMatrix, rotationMatrix, positionMatrix, projectionMatrix, normalMatrix) {
    const colourRendererProgram = this.colourRenderer.getProgram(),
          textureRendererProgram = this.textureRenderer.getProgram();

    this.canvas.useProgram(colourRendererProgram);

    this.colourRenderer.bindBuffers(this.canvas);

    this.canvas.render(this.colourRenderer, offsetMatrix, rotationMatrix, positionMatrix, projectionMatrix, normalMatrix);

    this.canvas.useProgram(textureRendererProgram);
    
    this.textureRenderer.bindBuffers(this.canvas);
    
    this.textureRenderer.activateTexture(this.canvas);
    
    this.canvas.render(this.textureRenderer, offsetMatrix, rotationMatrix, positionMatrix, projectionMatrix, normalMatrix);
  }
  
  initialise() {
    const textureRenderer = this.textureRenderer,
          colourRenderer = this.colourRenderer,
          transforms = [],
          masked = false;

    this.childElements.forEach((childElement) => {
      childElement.initialise(textureRenderer, colourRenderer, transforms, masked);
    });

    this.textureRenderer.createBuffers(this.canvas);

    this.colourRenderer.createBuffers(this.canvas);
  }

  static fromProperties(properties) {
    const { imageMap, imageJSON, canvas } = properties,
          colourRenderer = ColourRenderer.fromNothing(canvas),
          textureRenderer = TextureRenderer.fromImageMapAndImageJSON(imageMap, imageJSON, canvas),
          part = Element.fromProperties(Part, properties, textureRenderer, colourRenderer, canvas);

    part.initialise();
    
    return part;
  }
}

module.exports = Part;