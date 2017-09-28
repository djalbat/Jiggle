'use strict';

const necessary = require('necessary');

const ColourCube = require('./cube/colour'),
      TextureCube = require('./cube/texture'),
      imagesUtilities = require('../../utilities/images');

const { arrayUtilities, asynchronousUtilities } = necessary,
      { sequence } = asynchronousUtilities,
      { preload } = imagesUtilities,
      { first } = arrayUtilities;

function create(colourShader, textureShader, canvas, done) {
  const callbacks = [
          createColourCubeCallback,
          createTextureCubeCallback
        ],
        context = {
          colourShader: colourShader,
          textureShader: textureShader,
          canvas: canvas
        };

  sequence(callbacks, done, context);
}

module.exports = {
  create: create
};

function createColourCubeCallback(next, done, context) {
  const { colourShader, canvas } = context,
        offsetPosition = [-2, 0, 0];

  const vertexPositionData = ColourCube.getVertexPositionData(offsetPosition),
        vertexNormalData = ColourCube.getVertexNormalData(),
        vertexIndexData = ColourCube.getVertexIndexData(),
        vertexColourData = ColourCube.getVertexColourData();

  colourShader.addVertexPositionData(vertexPositionData);
  colourShader.addVertexNormalData(vertexNormalData);
  colourShader.addVertexIndexData(vertexIndexData);
  colourShader.addVertexColourData(vertexColourData);

  colourShader.createBuffers(canvas);

  next();
}

function createTextureCubeCallback(next, done, context) {
  const { textureShader, canvas } = context,
        sources = [
          'texture/bricks.jpg'
        ];

  preload(sources, function(images) {
    const firstImage = first(images),
          offsetPosition = [+2, 0, 0],
          image = firstImage;

    const vertexPositionData = TextureCube.getVertexPositionData(offsetPosition),
          vertexNormalData = TextureCube.getVertexNormalData(),
          textureCoordinateData = TextureCube.getTextureCoordinateData(),
          vertexIndexData = TextureCube.getVertexIndexData();

    textureShader.addVertexPositionData(vertexPositionData);
    textureShader.addVertexNormalData(vertexNormalData);
    textureShader.addVertexIndexData(vertexIndexData);

    textureShader.createBuffers(textureCoordinateData, canvas);

    textureShader.createTexture(image, canvas);

    next();
  });
}