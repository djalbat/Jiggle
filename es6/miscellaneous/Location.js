'use strict';

const constants = require('../constants'),
    vectorMaths = require('../maths/vector'),
    arrayUtilities = require('../utilities/array');

const { first, second } = arrayUtilities,
      { add3, subtract2, scale2 } = vectorMaths,
      { OFFSET_SCALAR, INITIAL_MOUSE_COORDINATES } = constants;

class Location {
  constructor(offset, previousOffset, mouseCoordinates, previousMouseCoordinates) {
    this.offset = offset;
    this.previousOffset = previousOffset;
    this.mouseCoordinates = mouseCoordinates;
    this.previousMouseCoordinates = previousMouseCoordinates;
  }

  getOffset() {
    return this.offset;
  }

  setMouseCoordinates(mouseCoordinates) {
    this.mouseCoordinates = mouseCoordinates;
  }

  updatePreviousMouseCoordinates() {
    this.previousMouseCoordinates = this.mouseCoordinates;
  }

  updatePreviousOffset() {
    this.previousOffset = this.offset;
  }

  updateOffset(tilt) {
    const xAngle = tilt.getXAngle(),
          yAngle = tilt.getYAngle(),
          scalar = OFFSET_SCALAR, ///
          relativeMouseCoordinates = subtract2(this.mouseCoordinates, this.previousMouseCoordinates),
          relativeOffset = scale2(relativeMouseCoordinates, scalar),
          yAngleOffset = calculateYAngleOffset(yAngle, relativeOffset),
          xAngleOffset = calculateXAngleOffset(xAngle, yAngle, relativeOffset);

    this.offset = add3(add3(this.previousOffset, yAngleOffset), xAngleOffset);  ///
  }

  static fromInitialOffset(initialOffset) {
    const offset = initialOffset, ///
          previousOffset = offset,  ///
          mouseCoordinates = INITIAL_MOUSE_COORDINATES, ///
          previousMouseCoordinates = mouseCoordinates,  ///
          location = new Location(offset, previousOffset, mouseCoordinates, previousMouseCoordinates);

    return location;
  }
}

module.exports = Location;

function calculateYAngleOffset(yAngle, relativeOffset) {
  const relativeOffsetComponents = relativeOffset,  ///
      firstRelativeOffsetComponent = first(relativeOffsetComponents),
      yAngleOffset = [
        -Math.cos(yAngle) * firstRelativeOffsetComponent,
        +0,
        -Math.sin(yAngle) * firstRelativeOffsetComponent
      ];

  return yAngleOffset;
}

function calculateXAngleOffset(xAngle, yAngle, relativeOffset) {
  const relativeOffsetComponents = relativeOffset,  ///
      secondRelativeOffsetComponent = second(relativeOffsetComponents),
      xAngleOffset = [
        -Math.sin(xAngle) * Math.sin(yAngle) * secondRelativeOffsetComponent,
        -Math.cos(xAngle) * secondRelativeOffsetComponent,
        +Math.sin(xAngle) * Math.cos(yAngle) * secondRelativeOffsetComponent
      ];

  return xAngleOffset;
}