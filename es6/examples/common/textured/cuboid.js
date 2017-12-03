'use strict';

const cuboid = require('../cuboid'),
      TexturedCanvasElement = require('../../../element/canvas/textured');

const { defaultVertices, defaultIndexes, defaultTextureCoordinates } = cuboid;

class TexturedCuboid extends TexturedCanvasElement {
  static fromProperties(properties) {
    const { vertices = defaultVertices, indexes = defaultIndexes, imageName, textureCoordinates = defaultTextureCoordinates } = properties,
          texturedCuboid = TexturedCanvasElement.fromProperties(TexturedCuboid, properties, vertices, indexes, imageName, textureCoordinates);

    return texturedCuboid;
  }
}

module.exports = TexturedCuboid;
