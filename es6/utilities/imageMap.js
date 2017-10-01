'use strict';

const arrayUtilities = require('../utilities/array'),
      imageUtilities = require('../utilities/image');

const { flatten } = arrayUtilities,
      { preloadImage } = imageUtilities,
      { imageMapJSON } = runtimeConfiguration;

function preloadImageMap(canvas, textureShader, done) {
  const source = 'imageMap';  ///

  preloadImage(source, function(image) {
    textureShader.createTexture(image, canvas);

    done();
  });
}

function textureCoordinateDataFromImageNames(imageNames) {
  const textureCoordinates = imageNames.reduce(function(textureCoordinates, textureName) {
          textureCoordinates = textureCoordinates.concat(imageMapJSON[textureName]);

          return textureCoordinates;
        }, []),
        textureCoordinateData = flatten(textureCoordinates);
  
  return textureCoordinateData;
}

module.exports = {
  preloadImageMap: preloadImageMap,
  textureCoordinateDataFromImageNames: textureCoordinateDataFromImageNames  
};