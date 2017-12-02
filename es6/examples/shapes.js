'use strict';

require('../jiggle');

const Canvas = require('../canvas'),
      Scene = require('../element/scene'),
      Camera = require('../element/camera'),
      TexturedCuboid = require('./common/textured/cuboid'),
      ColouredCylinder = require('./common/coloured/cylinder'),
      imageMapUtilities = require('../utilities/imageMap');

const { preloadImageMap } = imageMapUtilities;

const shapes = () => {

  const canvas = new Canvas();

  preloadImageMap((imageMap) =>

    <Scene imageMap={imageMap} canvas={canvas}>
      <Camera initialDistance={10} initialOffset={[ 0, 0, 0 ]} canvas={canvas} />
      <TexturedCuboid imageName="concrete.jpg" position={[ -0.5, -0.5, -0.5 ]} />
      <ColouredCylinder colour={[ 1, 0, 0, 1 ]} position={[ 1, 1, 1 ]} />
    </Scene>

  );
};

module.exports = shapes;
