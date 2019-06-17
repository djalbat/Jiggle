'use strict';

const constants = require('../constants');

const { DELTA_SCALAR, MINIMUM_DISTANCE } = constants;

class Zoom {
  constructor(distance) {
    this.distance = distance;
  }

  getDistance() {
    return this.distance;
  }

  updateDistance(delta) {
    this.distance -= delta * DELTA_SCALAR;

    this.distance = Math.max(MINIMUM_DISTANCE, this.distance);
  }
  
  static fromInitialDistance(initialDistance) {
    const distance = initialDistance, ///
          zoom = new Zoom(distance);
    
    return zoom;
  }
}

module.exports = Zoom;
