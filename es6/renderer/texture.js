'use strict';

const necessary = require('necessary');

const Renderer = require('../renderer'),
      vertexShaderSource = require('./source/texture/vertexShader'),
      fragmentShaderSource = require('./source/texture/fragmentShader'),
      TextureUniformLocations = require('./locations/texture/uniform'),
      TextureAttributeLocations = require('./locations/texture/attribute');

const { createProgram } = Renderer,
      { arrayUtilities } = necessary,
      { merge } = arrayUtilities,
      add = merge;  ///

class TextureRenderer extends Renderer {
  constructor(program, uniformLocations, attributeLocations, textureCoordinateData, textureCoordinateBuffer) {
    super(program, uniformLocations, attributeLocations);

    this.textureCoordinateData = textureCoordinateData;
    this.textureCoordinateBuffer = textureCoordinateBuffer;
  }

  getTextureCoordinateAttributeLocation() {
    const attributeLocations = this.getAttributeLocations(),
          textureCoordinateAttributeLocation = attributeLocations.getTextureCoordinateAttributeLocation();

    return textureCoordinateAttributeLocation;
  }

  addTextureCoordinateData(textureCoordinateData) {
    add(this.textureCoordinateData, textureCoordinateData);
  }

  createBuffers(canvas) {
    this.textureCoordinateBuffer = canvas.createBuffer(this.textureCoordinateData);

    super.createBuffers(canvas);
  }

  bindBuffers(canvas) {
    const textureCoordinateAttributeLocation = this.getTextureCoordinateAttributeLocation(),
          textureCoordinateComponents = 2;

    canvas.bindBuffer(this.textureCoordinateBuffer, textureCoordinateAttributeLocation, textureCoordinateComponents);

    super.bindBuffers(canvas);
  }

  createTexture(image, canvas) {
    canvas.createTexture(image);
  }

  activateTexture(canvas) {
    const context = canvas.getContext(),
          { TEXTURE0 } = context,
          target = TEXTURE0,  ///
          uniformLocations = this.getUniformLocations(),
          samplerUniformLocation = uniformLocations.getSamplerUniformLocation(),
          uSamplerUniformLocationIntegerValue = 0;

    canvas.activateTexture(target);

    canvas.setUniformLocationIntegerValue(samplerUniformLocation, uSamplerUniformLocationIntegerValue);
  }

  static fromNothing(canvas) {
    const program = createProgram(vertexShaderSource, fragmentShaderSource),
          textureUniformLocations = TextureUniformLocations.fromProgram(program, canvas),
          textureAttributeLocations = TextureAttributeLocations.fromProgram(program, canvas),
          uniformLocations = textureUniformLocations,  ///
          attributeLocations = textureAttributeLocations,  ///
          textureCoordinateData = [],
          textureCoordinateBuffer = null, ///
          textureRenderer = new TextureRenderer(program, uniformLocations, attributeLocations, textureCoordinateData, textureCoordinateBuffer);

    return textureRenderer;
  }
}

module.exports = TextureRenderer;