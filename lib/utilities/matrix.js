"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scaleMatrixFromScale = scaleMatrixFromScale;
exports.offsetsMatrixFromOffsets = offsetsMatrixFromOffsets;
exports.positionMatrixFromNothing = positionMatrixFromNothing;
exports.positionMatrixFromDistance = positionMatrixFromDistance;
exports.positionMatrixFromPosition = positionMatrixFromPosition;
exports.rotationsMatrixFromAngles = rotationsMatrixFromAngles;
exports.rotationsMatrixFromRotations = rotationsMatrixFromRotations;
exports.normalsMatrixFromRotationsMatrix = normalsMatrixFromRotationsMatrix;
exports.projectionMatrixFromWidthAndHeight = projectionMatrixFromWidthAndHeight;

var _vector = require("../maths/vector");

var _array = require("../utilities/array");

var _constants = require("../constants");

var _matrix = require("../maths/matrix");

function scaleMatrixFromScale(scale) {
  var scaleMatrix = (0, _matrix.identity4)();
  scaleMatrix = (0, _matrix.scale4)(scaleMatrix, scale);
  return scaleMatrix;
}

function offsetsMatrixFromOffsets(offsets) {
  var offsetsMatrix = (0, _matrix.identity4)(); ///

  offsetsMatrix = (0, _matrix.translate4)(offsetsMatrix, offsets);
  return offsetsMatrix;
}

function positionMatrixFromNothing() {
  var positionMatrix = (0, _matrix.identity4)(); ///

  return positionMatrix;
}

function positionMatrixFromDistance(distance) {
  var positionMatrix = (0, _matrix.identity4)(); ///

  var x = 0,
      y = 0,
      z = -distance;
  positionMatrix = (0, _matrix.translate4)(positionMatrix, [x, y, z]);
  return positionMatrix;
}

function positionMatrixFromPosition(position) {
  var positionMatrix = (0, _matrix.identity4)(); ///

  positionMatrix = (0, _matrix.translate4)(positionMatrix, position);
  return positionMatrix;
}

function rotationsMatrixFromAngles(angles) {
  var reverseOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var rotationsMatrix = (0, _matrix.identity4)(); ///

  var firstAngle = (0, _array.first)(angles),
      secondAngle = (0, _array.second)(angles),
      thirdAngle = (0, _array.third)(angles),
      xAngle = firstAngle,
      yAngle = secondAngle,
      zAngle = thirdAngle,
      xAxis = [1, 0, 0],
      yAxis = [0, 1, 0],
      zAxis = [0, 0, 1];

  if (reverseOrder) {
    rotationsMatrix = (0, _matrix.rotate4)(rotationsMatrix, zAngle, zAxis);
    rotationsMatrix = (0, _matrix.rotate4)(rotationsMatrix, yAngle, yAxis);
    rotationsMatrix = (0, _matrix.rotate4)(rotationsMatrix, xAngle, xAxis);
  } else {
    rotationsMatrix = (0, _matrix.rotate4)(rotationsMatrix, xAngle, xAxis);
    rotationsMatrix = (0, _matrix.rotate4)(rotationsMatrix, yAngle, yAxis);
    rotationsMatrix = (0, _matrix.rotate4)(rotationsMatrix, zAngle, zAxis);
  }

  return rotationsMatrix;
}

function rotationsMatrixFromRotations(rotations) {
  var scalar = _constants.DEGREES_TO_RADIANS_SCALAR,
      angles = (0, _vector.scale3)(rotations, scalar),
      rotationsMatrix = rotationsMatrixFromAngles(angles);
  return rotationsMatrix;
}

function normalsMatrixFromRotationsMatrix(rotationsMatrix) {
  var normalsMatrix = (0, _matrix.invert4)(rotationsMatrix);
  normalsMatrix = (0, _matrix.transpose4)(normalsMatrix);
  return normalsMatrix;
}

function projectionMatrixFromWidthAndHeight(width, height) {
  var fieldOfView = _constants.FIELD_OF_VIEW,
      ///
  aspectRatio = width / height,
      zNear = _constants.Z_NEAR,
      ///
  zFar = _constants.Z_FAR,
      ///
  projectionMatrix = (0, _matrix.perspective4)(fieldOfView, aspectRatio, zNear, zFar);
  return projectionMatrix;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdHJpeC5qcyJdLCJuYW1lcyI6WyJzY2FsZU1hdHJpeEZyb21TY2FsZSIsInNjYWxlIiwic2NhbGVNYXRyaXgiLCJvZmZzZXRzTWF0cml4RnJvbU9mZnNldHMiLCJvZmZzZXRzIiwib2Zmc2V0c01hdHJpeCIsInBvc2l0aW9uTWF0cml4RnJvbU5vdGhpbmciLCJwb3NpdGlvbk1hdHJpeCIsInBvc2l0aW9uTWF0cml4RnJvbURpc3RhbmNlIiwiZGlzdGFuY2UiLCJ4IiwieSIsInoiLCJwb3NpdGlvbk1hdHJpeEZyb21Qb3NpdGlvbiIsInBvc2l0aW9uIiwicm90YXRpb25zTWF0cml4RnJvbUFuZ2xlcyIsImFuZ2xlcyIsInJldmVyc2VPcmRlciIsInJvdGF0aW9uc01hdHJpeCIsImZpcnN0QW5nbGUiLCJzZWNvbmRBbmdsZSIsInRoaXJkQW5nbGUiLCJ4QW5nbGUiLCJ5QW5nbGUiLCJ6QW5nbGUiLCJ4QXhpcyIsInlBeGlzIiwiekF4aXMiLCJyb3RhdGlvbnNNYXRyaXhGcm9tUm90YXRpb25zIiwicm90YXRpb25zIiwic2NhbGFyIiwiREVHUkVFU19UT19SQURJQU5TX1NDQUxBUiIsIm5vcm1hbHNNYXRyaXhGcm9tUm90YXRpb25zTWF0cml4Iiwibm9ybWFsc01hdHJpeCIsInByb2plY3Rpb25NYXRyaXhGcm9tV2lkdGhBbmRIZWlnaHQiLCJ3aWR0aCIsImhlaWdodCIsImZpZWxkT2ZWaWV3IiwiRklFTERfT0ZfVklFVyIsImFzcGVjdFJhdGlvIiwiek5lYXIiLCJaX05FQVIiLCJ6RmFyIiwiWl9GQVIiLCJwcm9qZWN0aW9uTWF0cml4Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRU8sU0FBU0Esb0JBQVQsQ0FBOEJDLEtBQTlCLEVBQXFDO0FBQzFDLE1BQUlDLFdBQVcsR0FBRyx3QkFBbEI7QUFFQUEsRUFBQUEsV0FBVyxHQUFHLG9CQUFPQSxXQUFQLEVBQW9CRCxLQUFwQixDQUFkO0FBRUEs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OztBQUVNLFNBQVNjLGdDQUFULENBQTBDZCxlQUExQyxFQUEyRDtBQUNoRSxNQUFJZSxhQUFhLEdBQUcscUJBQVFmLGVBQVIsQ0FBcEI7QUFFQWUsRUFBQUEsYUFBYSxHQUFHLHdCQUFXQSxhQUFYLENBQWhCO0FBRUEsU0FBT0EsYUFBUDtBQUNEOztBQUVNLFNBQVNDLGtDQUFULENBQTRDQyxLQUE1QyxFQUFtREMsTUFBbkQsRUFBMkQ7QUFDaEUsTUFBTUMsV0FBVyxHQUFHQyx3QkFBcEI7QUFBQSxNQUFvQztBQUM5QkMsRUFBQUEsV0FBVyxHQUFHSixLQUFLLEdBQUdDLE1BRDVCO0FBQUEsTUFFTUksS0FBSyxHQUFHQyxpQkFGZDtBQUFBLE1BRXNCO0FBQ2hCQyxFQUFBQSxJQUFJLEdBQUdDLGdCQUhiO0FBQUEsTUFHb0I7QUFDZEMsRUFBQUEsZ0JBQWdCLEdBQUcsMEJBQWFQLFdBQWIsRUFBMEJFLFdBQTFCLEVBQXVDQyxLQUF2QyxFQUE4Q0UsSUFBOUMsQ0FKekI7QUFNQSxTQUFPRSxnQkFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHNjYWxlMyB9IGZyb20gXCIuLi9tYXRocy92ZWN0b3JcIjtcbmltcG9ydCB7IGZpcnN0LCBzZWNvbmQsIHRoaXJkIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hcnJheVwiO1xuaW1wb3J0IHsgREVHUkVFU19UT19SQURJQU5TX1NDQUxBUiwgRklFTERfT0ZfVklFVywgWl9ORUFSLCBaX0ZBUiB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGlkZW50aXR5NCwgc2NhbGU0LCBpbnZlcnQ0LCByb3RhdGU0LCB0cmFuc2xhdGU0LCB0cmFuc3Bvc2U0LCBwZXJzcGVjdGl2ZTQgfSBmcm9tIFwiLi4vbWF0aHMvbWF0cml4XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZU1hdHJpeEZyb21TY2FsZShzY2FsZSkge1xuICBsZXQgc2NhbGVNYXRyaXggPSBpZGVudGl0eTQoKTtcblxuICBzY2FsZU1hdHJpeCA9IHNjYWxlNChzY2FsZU1hdHJpeCwgc2NhbGUpO1xuXG4gIHJldHVybiBzY2FsZU1hdHJpeDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZnNldHNNYXRyaXhGcm9tT2Zmc2V0cyhvZmZzZXRzKSB7XG4gIGxldCBvZmZzZXRzTWF0cml4ID0gaWRlbnRpdHk0KCk7IC8vL1xuXG4gIG9mZnNldHNNYXRyaXggPSB0cmFuc2xhdGU0KG9mZnNldHNNYXRyaXgsIG9mZnNldHMpO1xuXG4gIHJldHVybiBvZmZzZXRzTWF0cml4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb25NYXRyaXhGcm9tTm90aGluZygpIHtcbiAgbGV0IHBvc2l0aW9uTWF0cml4ID0gaWRlbnRpdHk0KCk7IC8vL1xuXG4gIHJldHVybiBwb3NpdGlvbk1hdHJpeDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uTWF0cml4RnJvbURpc3RhbmNlKGRpc3RhbmNlKSB7XG4gIGxldCBwb3NpdGlvbk1hdHJpeCA9IGlkZW50aXR5NCgpOyAvLy9cblxuICBjb25zdCB4ID0gMCxcbiAgICAgICAgeSA9IDAsXG4gICAgICAgIHogPSAtZGlzdGFuY2U7XG5cbiAgcG9zaXRpb25NYXRyaXggPSB0cmFuc2xhdGU0KHBvc2l0aW9uTWF0cml4LCBbIHgsIHksIHogXSk7XG5cbiAgcmV0dXJuIHBvc2l0aW9uTWF0cml4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb25NYXRyaXhGcm9tUG9zaXRpb24ocG9zaXRpb24pIHtcbiAgbGV0IHBvc2l0aW9uTWF0cml4ID0gaWRlbnRpdHk0KCk7IC8vL1xuXG4gIHBvc2l0aW9uTWF0cml4ID0gdHJhbnNsYXRlNChwb3NpdGlvbk1hdHJpeCwgcG9zaXRpb24pO1xuXG4gIHJldHVybiBwb3NpdGlvbk1hdHJpeDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0aW9uc01hdHJpeEZyb21BbmdsZXMoYW5nbGVzLCByZXZlcnNlT3JkZXIgPSBmYWxzZSkge1xuICBsZXQgcm90YXRpb25zTWF0cml4ID0gaWRlbnRpdHk0KCk7IC8vL1xuXG4gIGNvbnN0IGZpcnN0QW5nbGUgPSBmaXJzdChhbmdsZXMpLFxuICAgICAgICBzZWNvbmRBbmdsZSA9IHNlY29uZChhbmdsZXMpLFxuICAgICAgICB0aGlyZEFuZ2xlID0gdGhpcmQoYW5nbGVzKSxcbiAgICAgICAgeEFuZ2xlID0gZmlyc3RBbmdsZSxcbiAgICAgICAgeUFuZ2xlID0gc2Vjb25kQW5nbGUsXG4gICAgICAgIHpBbmdsZSA9IHRoaXJkQW5nbGUsXG4gICAgICAgIHhBeGlzID0gWyAxLCAwLCAwIF0sXG4gICAgICAgIHlBeGlzID0gWyAwLCAxLCAwIF0sXG4gICAgICAgIHpBeGlzID0gWyAwLCAwLCAxIF07XG5cbiAgaWYgKHJldmVyc2VPcmRlcikge1xuICAgIHJvdGF0aW9uc01hdHJpeCA9IHJvdGF0ZTQocm90YXRpb25zTWF0cml4LCB6QW5nbGUsIHpBeGlzKTtcblxuICAgIHJvdGF0aW9uc01hdHJpeCA9IHJvdGF0ZTQocm90YXRpb25zTWF0cml4LCB5QW5nbGUsIHlBeGlzKTtcblxuICAgIHJvdGF0aW9uc01hdHJpeCA9IHJvdGF0ZTQocm90YXRpb25zTWF0cml4LCB4QW5nbGUsIHhBeGlzKTtcbiAgfSBlbHNlIHtcbiAgICByb3RhdGlvbnNNYXRyaXggPSByb3RhdGU0KHJvdGF0aW9uc01hdHJpeCwgeEFuZ2xlLCB4QXhpcyk7XG5cbiAgICByb3RhdGlvbnNNYXRyaXggPSByb3RhdGU0KHJvdGF0aW9uc01hdHJpeCwgeUFuZ2xlLCB5QXhpcyk7XG5cbiAgICByb3RhdGlvbnNNYXRyaXggPSByb3RhdGU0KHJvdGF0aW9uc01hdHJpeCwgekFuZ2xlLCB6QXhpcyk7XG4gIH1cblxuICByZXR1cm4gcm90YXRpb25zTWF0cml4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRpb25zTWF0cml4RnJvbVJvdGF0aW9ucyhyb3RhdGlvbnMpIHtcbiAgY29uc3Qgc2NhbGFyID0gREVHUkVFU19UT19SQURJQU5TX1NDQUxBUixcbiAgICAgICAgYW5nbGVzID0gc2NhbGUzKHJvdGF0aW9ucywgc2NhbGFyKSxcbiAgICAgICAgcm90YXRpb25zTWF0cml4ID0gcm90YXRpb25zTWF0cml4RnJvbUFuZ2xlcyhhbmdsZXMpO1xuXG4gIHJldHVybiByb3RhdGlvbnNNYXRyaXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxzTWF0cml4RnJvbVJvdGF0aW9uc01hdHJpeChyb3RhdGlvbnNNYXRyaXgpIHtcbiAgbGV0IG5vcm1hbHNNYXRyaXggPSBpbnZlcnQ0KHJvdGF0aW9uc01hdHJpeCk7XG5cbiAgbm9ybWFsc01hdHJpeCA9IHRyYW5zcG9zZTQobm9ybWFsc01hdHJpeCk7XG5cbiAgcmV0dXJuIG5vcm1hbHNNYXRyaXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0aW9uTWF0cml4RnJvbVdpZHRoQW5kSGVpZ2h0KHdpZHRoLCBoZWlnaHQpIHtcbiAgY29uc3QgZmllbGRPZlZpZXcgPSBGSUVMRF9PRl9WSUVXLCAgLy8vXG4gICAgICAgIGFzcGVjdFJhdGlvID0gd2lkdGggLyBoZWlnaHQsXG4gICAgICAgIHpOZWFyID0gWl9ORUFSLCAvLy9cbiAgICAgICAgekZhciA9IFpfRkFSLCAvLy9cbiAgICAgICAgcHJvamVjdGlvbk1hdHJpeCA9IHBlcnNwZWN0aXZlNChmaWVsZE9mVmlldywgYXNwZWN0UmF0aW8sIHpOZWFyLCB6RmFyKTtcblxuICByZXR1cm4gcHJvamVjdGlvbk1hdHJpeDtcbn1cbiJdfQ==