'use strict';

require('../jiggle');

const Canvas = require('../canvas'),
      Scene = require('../element/scene'),
      Camera = require('../element/camera'),
      Mask = require('../element/canvas/mask'),
      TexturedPlane = require('./common/textured/plane'),
      TexturedCuboid = require('./common/textured/cuboid'),
      ColouredCylinder = require('./common/coloured/cylinder'),
      TexturedCylinder = require('./common/textured/cylinder'),
      imageMapUtilities = require('../utilities/imageMap');

const { preloadImageMap } = imageMapUtilities;

const shapes = () => {

  const canvas = new Canvas();

  preloadImageMap((imageMap) =>

    <Scene imageMap={imageMap} canvas={canvas}>
      <Camera initialDistance={10} initialOffset={[ 0, 0, 0 ]} canvas={canvas} />
      <TexturedPlane width={1} height={1} position={[ -1, -1, -1 ]} imageName="gravel.jpg" >
        <Mask />
      </TexturedPlane>
    </Scene>

  );
};

module.exports = shapes;

/*

 <TexturedCuboid width={1} height={1} depth={1} position={[ 0, 2, 0 ]} imageName="bricks.jpg" />
 <ColouredCylinder width={1} height={1} depth={1} position={[ 0, -1, 1 ]} rotations={[ 0, 0, 0 ]} colour={[ 1, 0, 0, 1 ]} />
 <TexturedCylinder width={1} height={1} depth={1} position={[ 0, 1, -1 ]} rotations={[ 0, 90, 90 ]} imageName="grass.jpg" />

 */