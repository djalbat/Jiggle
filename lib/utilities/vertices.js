'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var vec3 = require('../maths/vec3'),
    arrayUtilities = require('../utilities/array'),
    quaternionUtilities = require('../utilities/quaternion');

var subtract = vec3.subtract,
    cross = vec3.cross,
    first = arrayUtilities.first,
    second = arrayUtilities.second,
    third = arrayUtilities.third,
    calculateInverseRotationQuaternion = quaternionUtilities.calculateInverseRotationQuaternion,
    rotateImaginaryQuaternion = quaternionUtilities.rotateImaginaryQuaternion;


function calculateNormal(vertices) {
  var firstVertex = first(vertices),
      secondVertex = second(vertices),
      thirdVertex = third(vertices),
      firstEdge = subtract(secondVertex, firstVertex),
      secondEdge = subtract(thirdVertex, firstVertex),
      normal = cross(firstEdge, secondEdge);

  return normal;
}

function rotateVertices(vertices, rotationQuaternion) {
  var inverseRotationQuaternion = calculateInverseRotationQuaternion(rotationQuaternion);

  vertices = vertices.map(function (vertex) {
    vertex = rotateVertex(vertex, rotationQuaternion, inverseRotationQuaternion);

    return vertex;
  });

  return vertices;
}

module.exports = {
  calculateNormal: calculateNormal,
  rotateVertices: rotateVertices
};

function rotateVertex(vertex, rotationQuaternion, inverseRotationQuaternion) {
  var imaginaryQuaternion = [0].concat(_toConsumableArray(vertex)),
      ///
  rotatedImaginaryQuaternion = rotateImaginaryQuaternion(imaginaryQuaternion, rotationQuaternion, inverseRotationQuaternion);

  vertex = rotatedImaginaryQuaternion.slice(1); ///

  return vertex;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi91dGlsaXRpZXMvdmVydGljZXMuanMiXSwibmFtZXMiOlsidmVjMyIsInJlcXVpcmUiLCJhcnJheVV0aWxpdGllcyIsInF1YXRlcm5pb25VdGlsaXRpZXMiLCJzdWJ0cmFjdCIsImNyb3NzIiwiZmlyc3QiLCJzZWNvbmQiLCJ0aGlyZCIsImNhbGN1bGF0ZUludmVyc2VSb3RhdGlvblF1YXRlcm5pb24iLCJyb3RhdGVJbWFnaW5hcnlRdWF0ZXJuaW9uIiwiY2FsY3VsYXRlTm9ybWFsIiwidmVydGljZXMiLCJmaXJzdFZlcnRleCIsInNlY29uZFZlcnRleCIsInRoaXJkVmVydGV4IiwiZmlyc3RFZGdlIiwic2Vjb25kRWRnZSIsIm5vcm1hbCIsInJvdGF0ZVZlcnRpY2VzIiwicm90YXRpb25RdWF0ZXJuaW9uIiwiaW52ZXJzZVJvdGF0aW9uUXVhdGVybmlvbiIsIm1hcCIsInZlcnRleCIsInJvdGF0ZVZlcnRleCIsIm1vZHVsZSIsImV4cG9ydHMiLCJpbWFnaW5hcnlRdWF0ZXJuaW9uIiwicm90YXRlZEltYWdpbmFyeVF1YXRlcm5pb24iLCJzbGljZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLGVBQVIsQ0FBYjtBQUFBLElBQ01DLGlCQUFpQkQsUUFBUSxvQkFBUixDQUR2QjtBQUFBLElBRU1FLHNCQUFzQkYsUUFBUSx5QkFBUixDQUY1Qjs7SUFJUUcsUSxHQUFvQkosSSxDQUFwQkksUTtJQUFVQyxLLEdBQVVMLEksQ0FBVkssSztJQUNWQyxLLEdBQXlCSixjLENBQXpCSSxLO0lBQU9DLE0sR0FBa0JMLGMsQ0FBbEJLLE07SUFBUUMsSyxHQUFVTixjLENBQVZNLEs7SUFDZkMsa0MsR0FBa0VOLG1CLENBQWxFTSxrQztJQUFvQ0MseUIsR0FBOEJQLG1CLENBQTlCTyx5Qjs7O0FBRTVDLFNBQVNDLGVBQVQsQ0FBeUJDLFFBQXpCLEVBQW1DO0FBQ2pDLE1BQU1DLGNBQWNQLE1BQU1NLFFBQU4sQ0FBcEI7QUFBQSxNQUNNRSxlQUFlUCxPQUFPSyxRQUFQLENBRHJCO0FBQUEsTUFFTUcsY0FBY1AsTUFBTUksUUFBTixDQUZwQjtBQUFBLE1BR01JLFlBQVlaLFNBQVNVLFlBQVQsRUFBdUJELFdBQXZCLENBSGxCO0FBQUEsTUFJTUksYUFBYWIsU0FBU1csV0FBVCxFQUFzQkYsV0FBdEIsQ0FKbkI7QUFBQSxNQUtNSyxTQUFTYixNQUFNVyxTQUFOLEVBQWlCQyxVQUFqQixDQUxmOztBQU9BLFNBQU9DLE1BQVA7QUFDRDs7QUFFRCxTQUFTQyxjQUFULENBQXdCUCxRQUF4QixFQUFrQ1Esa0JBQWxDLEVBQXNEO0FBQ3BELE1BQU1DLDRCQUE0QlosbUNBQW1DVyxrQkFBbkMsQ0FBbEM7O0FBRUFSLGFBQVdBLFNBQVNVLEdBQVQsQ0FBYSxVQUFTQyxNQUFULEVBQWlCO0FBQ3ZDQSxhQUFTQyxhQUFhRCxNQUFiLEVBQXFCSCxrQkFBckIsRUFBeUNDLHlCQUF6QyxDQUFUOztBQUVBLFdBQU9FLE1BQVA7QUFDRCxHQUpVLENBQVg7O0FBTUEsU0FBT1gsUUFBUDtBQUNEOztBQUVEYSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZmLG1CQUFpQkEsZUFERjtBQUVmUSxrQkFBZ0JBO0FBRkQsQ0FBakI7O0FBS0EsU0FBU0ssWUFBVCxDQUFzQkQsTUFBdEIsRUFBOEJILGtCQUE5QixFQUFrREMseUJBQWxELEVBQTZFO0FBQzNFLE1BQU1NLHVCQUF1QixDQUF2Qiw0QkFBNkJKLE1BQTdCLEVBQU47QUFBQSxNQUE0QztBQUN0Q0ssK0JBQTZCbEIsMEJBQTBCaUIsbUJBQTFCLEVBQStDUCxrQkFBL0MsRUFBbUVDLHlCQUFuRSxDQURuQzs7QUFHQUUsV0FBU0ssMkJBQTJCQyxLQUEzQixDQUFpQyxDQUFqQyxDQUFULENBSjJFLENBSTdCOztBQUU5QyxTQUFPTixNQUFQO0FBQ0QiLCJmaWxlIjoidmVydGljZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHZlYzMgPSByZXF1aXJlKCcuLi9tYXRocy92ZWMzJyksXG4gICAgICBhcnJheVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9hcnJheScpLFxuICAgICAgcXVhdGVybmlvblV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9xdWF0ZXJuaW9uJyk7XG5cbmNvbnN0IHsgc3VidHJhY3QsIGNyb3NzIH0gPSB2ZWMzLFxuICAgICAgeyBmaXJzdCwgc2Vjb25kLCB0aGlyZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IGNhbGN1bGF0ZUludmVyc2VSb3RhdGlvblF1YXRlcm5pb24sIHJvdGF0ZUltYWdpbmFyeVF1YXRlcm5pb24gfSA9IHF1YXRlcm5pb25VdGlsaXRpZXM7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZU5vcm1hbCh2ZXJ0aWNlcykge1xuICBjb25zdCBmaXJzdFZlcnRleCA9IGZpcnN0KHZlcnRpY2VzKSxcbiAgICAgICAgc2Vjb25kVmVydGV4ID0gc2Vjb25kKHZlcnRpY2VzKSxcbiAgICAgICAgdGhpcmRWZXJ0ZXggPSB0aGlyZCh2ZXJ0aWNlcyksXG4gICAgICAgIGZpcnN0RWRnZSA9IHN1YnRyYWN0KHNlY29uZFZlcnRleCwgZmlyc3RWZXJ0ZXgpLFxuICAgICAgICBzZWNvbmRFZGdlID0gc3VidHJhY3QodGhpcmRWZXJ0ZXgsIGZpcnN0VmVydGV4KSxcbiAgICAgICAgbm9ybWFsID0gY3Jvc3MoZmlyc3RFZGdlLCBzZWNvbmRFZGdlKTtcblxuICByZXR1cm4gbm9ybWFsO1xufVxuXG5mdW5jdGlvbiByb3RhdGVWZXJ0aWNlcyh2ZXJ0aWNlcywgcm90YXRpb25RdWF0ZXJuaW9uKSB7XG4gIGNvbnN0IGludmVyc2VSb3RhdGlvblF1YXRlcm5pb24gPSBjYWxjdWxhdGVJbnZlcnNlUm90YXRpb25RdWF0ZXJuaW9uKHJvdGF0aW9uUXVhdGVybmlvbik7XG5cbiAgdmVydGljZXMgPSB2ZXJ0aWNlcy5tYXAoZnVuY3Rpb24odmVydGV4KSB7XG4gICAgdmVydGV4ID0gcm90YXRlVmVydGV4KHZlcnRleCwgcm90YXRpb25RdWF0ZXJuaW9uLCBpbnZlcnNlUm90YXRpb25RdWF0ZXJuaW9uKTtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH0pO1xuICBcbiAgcmV0dXJuIHZlcnRpY2VzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2FsY3VsYXRlTm9ybWFsOiBjYWxjdWxhdGVOb3JtYWwsXG4gIHJvdGF0ZVZlcnRpY2VzOiByb3RhdGVWZXJ0aWNlc1xufTtcblxuZnVuY3Rpb24gcm90YXRlVmVydGV4KHZlcnRleCwgcm90YXRpb25RdWF0ZXJuaW9uLCBpbnZlcnNlUm90YXRpb25RdWF0ZXJuaW9uKSB7XG4gIGNvbnN0IGltYWdpbmFyeVF1YXRlcm5pb24gPSBbMCwgLi4udmVydGV4XSwgLy8vXG4gICAgICAgIHJvdGF0ZWRJbWFnaW5hcnlRdWF0ZXJuaW9uID0gcm90YXRlSW1hZ2luYXJ5UXVhdGVybmlvbihpbWFnaW5hcnlRdWF0ZXJuaW9uLCByb3RhdGlvblF1YXRlcm5pb24sIGludmVyc2VSb3RhdGlvblF1YXRlcm5pb24pO1xuXG4gIHZlcnRleCA9IHJvdGF0ZWRJbWFnaW5hcnlRdWF0ZXJuaW9uLnNsaWNlKDEpOyAvLy9cblxuICByZXR1cm4gdmVydGV4O1xufVxuIl19