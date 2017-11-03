'use strict';

var vec3 = require('../maths/vec3'),
    Line = require('../maths/line'),
    arrayUtilities = require('../utilities/array');

var first = arrayUtilities.first,
    second = arrayUtilities.second,
    third = arrayUtilities.third,
    fourth = arrayUtilities.fourth,
    subtract = vec3.subtract,
    dot = vec3.dot,
    cross = vec3.cross,
    normalise = vec3.normalise;


function calculateNormal(vertexPositions) {
      var firstVertexPosition = first(vertexPositions),
          secondVertexPosition = second(vertexPositions),
          fourthVertexPosition = fourth(vertexPositions),
          firstVector = subtract(secondVertexPosition, firstVertexPosition),
          secondVector = subtract(fourthVertexPosition, firstVertexPosition),
          normal = normalise(cross(firstVector, secondVector));

      return normal;
}

function calculateIntersectionOfPlanes(vertexPositionsA, vertexPositionsB) {
      var normalA = calculateNormal(vertexPositionsA),
          rotationQuaternion = calculateRotationQuaternion(normalA),
          rotatedVertexPositionsA = rotatePositions(vertexPositionsA, rotationQuaternion),
          rotatedVertexPositionsB = rotatePositions(vertexPositionsB, rotationQuaternion),
          firstRotatedVertexPositionA = first(rotatedVertexPositionsA),
          rotatedVertexPositionA = firstRotatedVertexPositionA,
          ///
      rotatedVertexPositionComponents = rotatedVertexPositionA,
          ///
      thirdRotatedVertexPositionComponent = third(rotatedVertexPositionComponents),
          z = thirdRotatedVertexPositionComponent,
          ///
      normalB = calculateNormal(rotatedVertexPositionsB),
          normalBComponents = normalB,
          ///
      firstNormalBComponent = first(normalBComponents),
          secondNormalBComponent = second(normalBComponents),
          thirdNormalBComponent = third(normalBComponents),
          a = firstNormalBComponent,
          ///
      b = secondNormalBComponent,
          ///
      c = dot(rotatedVertexPositionA, normalB) - thirdNormalBComponent * z,
          intersectionLine = Line.fromEquation(a, b, c),
          lines = linesFromVertexPositions(rotatedVertexPositionsA),
          intersections = lines.map(function (line) {
            var intersection = line.calculateIntersection(intersectionLine);

            return intersection;
      });

      debugger;
}

function linesFromVertexPositions(vertexPositions) {
      var lines = [],
          vertexPositionsLength = vertexPositions.length;

      for (var index = 0; index < vertexPositionsLength; index++) {
            var firstIndex = index,
                secondIndex = (index + 1) % vertexPositionsLength,
                firstVertexPosition = vertexPositions[firstIndex],
                secondVertexPosition = vertexPositions[secondIndex],
                line = Line.fromVertexPositions(firstVertexPosition, secondVertexPosition);

            lines.push(line);
      }

      return lines;
}

module.exports = {
      calculateIntersectionOfPlanes: calculateIntersectionOfPlanes
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi91dGlsaXRpZXMvbWFzay5qcyJdLCJuYW1lcyI6WyJ2ZWMzIiwicmVxdWlyZSIsIkxpbmUiLCJhcnJheVV0aWxpdGllcyIsImZpcnN0Iiwic2Vjb25kIiwidGhpcmQiLCJmb3VydGgiLCJzdWJ0cmFjdCIsImRvdCIsImNyb3NzIiwibm9ybWFsaXNlIiwiY2FsY3VsYXRlTm9ybWFsIiwidmVydGV4UG9zaXRpb25zIiwiZmlyc3RWZXJ0ZXhQb3NpdGlvbiIsInNlY29uZFZlcnRleFBvc2l0aW9uIiwiZm91cnRoVmVydGV4UG9zaXRpb24iLCJmaXJzdFZlY3RvciIsInNlY29uZFZlY3RvciIsIm5vcm1hbCIsImNhbGN1bGF0ZUludGVyc2VjdGlvbk9mUGxhbmVzIiwidmVydGV4UG9zaXRpb25zQSIsInZlcnRleFBvc2l0aW9uc0IiLCJub3JtYWxBIiwicm90YXRpb25RdWF0ZXJuaW9uIiwiY2FsY3VsYXRlUm90YXRpb25RdWF0ZXJuaW9uIiwicm90YXRlZFZlcnRleFBvc2l0aW9uc0EiLCJyb3RhdGVQb3NpdGlvbnMiLCJyb3RhdGVkVmVydGV4UG9zaXRpb25zQiIsImZpcnN0Um90YXRlZFZlcnRleFBvc2l0aW9uQSIsInJvdGF0ZWRWZXJ0ZXhQb3NpdGlvbkEiLCJyb3RhdGVkVmVydGV4UG9zaXRpb25Db21wb25lbnRzIiwidGhpcmRSb3RhdGVkVmVydGV4UG9zaXRpb25Db21wb25lbnQiLCJ6Iiwibm9ybWFsQiIsIm5vcm1hbEJDb21wb25lbnRzIiwiZmlyc3ROb3JtYWxCQ29tcG9uZW50Iiwic2Vjb25kTm9ybWFsQkNvbXBvbmVudCIsInRoaXJkTm9ybWFsQkNvbXBvbmVudCIsImEiLCJiIiwiYyIsImludGVyc2VjdGlvbkxpbmUiLCJmcm9tRXF1YXRpb24iLCJsaW5lcyIsImxpbmVzRnJvbVZlcnRleFBvc2l0aW9ucyIsImludGVyc2VjdGlvbnMiLCJtYXAiLCJsaW5lIiwiaW50ZXJzZWN0aW9uIiwiY2FsY3VsYXRlSW50ZXJzZWN0aW9uIiwidmVydGV4UG9zaXRpb25zTGVuZ3RoIiwibGVuZ3RoIiwiaW5kZXgiLCJmaXJzdEluZGV4Iiwic2Vjb25kSW5kZXgiLCJmcm9tVmVydGV4UG9zaXRpb25zIiwicHVzaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQU1BLE9BQU9DLFFBQVEsZUFBUixDQUFiO0FBQUEsSUFDTUMsT0FBT0QsUUFBUSxlQUFSLENBRGI7QUFBQSxJQUVNRSxpQkFBaUJGLFFBQVEsb0JBQVIsQ0FGdkI7O0lBSVFHLEssR0FBaUNELGMsQ0FBakNDLEs7SUFBT0MsTSxHQUEwQkYsYyxDQUExQkUsTTtJQUFRQyxLLEdBQWtCSCxjLENBQWxCRyxLO0lBQU9DLE0sR0FBV0osYyxDQUFYSSxNO0lBQ3RCQyxRLEdBQW9DUixJLENBQXBDUSxRO0lBQVVDLEcsR0FBMEJULEksQ0FBMUJTLEc7SUFBS0MsSyxHQUFxQlYsSSxDQUFyQlUsSztJQUFPQyxTLEdBQWNYLEksQ0FBZFcsUzs7O0FBRTlCLFNBQVNDLGVBQVQsQ0FBeUJDLGVBQXpCLEVBQTBDO0FBQ3hDLFVBQU1DLHNCQUFzQlYsTUFBTVMsZUFBTixDQUE1QjtBQUFBLFVBQ01FLHVCQUF1QlYsT0FBT1EsZUFBUCxDQUQ3QjtBQUFBLFVBRU1HLHVCQUF1QlQsT0FBT00sZUFBUCxDQUY3QjtBQUFBLFVBR01JLGNBQWNULFNBQVNPLG9CQUFULEVBQStCRCxtQkFBL0IsQ0FIcEI7QUFBQSxVQUlNSSxlQUFlVixTQUFTUSxvQkFBVCxFQUErQkYsbUJBQS9CLENBSnJCO0FBQUEsVUFLTUssU0FBU1IsVUFBVUQsTUFBTU8sV0FBTixFQUFtQkMsWUFBbkIsQ0FBVixDQUxmOztBQU9BLGFBQU9DLE1BQVA7QUFDRDs7QUFFRCxTQUFTQyw2QkFBVCxDQUF1Q0MsZ0JBQXZDLEVBQXlEQyxnQkFBekQsRUFBMkU7QUFDekUsVUFBTUMsVUFBVVgsZ0JBQWdCUyxnQkFBaEIsQ0FBaEI7QUFBQSxVQUNNRyxxQkFBcUJDLDRCQUE0QkYsT0FBNUIsQ0FEM0I7QUFBQSxVQUVNRywwQkFBMEJDLGdCQUFnQk4sZ0JBQWhCLEVBQWtDRyxrQkFBbEMsQ0FGaEM7QUFBQSxVQUdNSSwwQkFBMEJELGdCQUFnQkwsZ0JBQWhCLEVBQWtDRSxrQkFBbEMsQ0FIaEM7QUFBQSxVQUlNSyw4QkFBOEJ6QixNQUFNc0IsdUJBQU4sQ0FKcEM7QUFBQSxVQUtNSSx5QkFBeUJELDJCQUwvQjtBQUFBLFVBSzREO0FBQ3RERSx3Q0FBa0NELHNCQU54QztBQUFBLFVBTWlFO0FBQzNERSw0Q0FBc0MxQixNQUFNeUIsK0JBQU4sQ0FQNUM7QUFBQSxVQVFNRSxJQUFJRCxtQ0FSVjtBQUFBLFVBUWdEO0FBQzFDRSxnQkFBVXRCLGdCQUFnQmdCLHVCQUFoQixDQVRoQjtBQUFBLFVBVU1PLG9CQUFvQkQsT0FWMUI7QUFBQSxVQVVvQztBQUM5QkUsOEJBQXdCaEMsTUFBTStCLGlCQUFOLENBWDlCO0FBQUEsVUFZTUUseUJBQXlCaEMsT0FBTzhCLGlCQUFQLENBWi9CO0FBQUEsVUFhTUcsd0JBQXdCaEMsTUFBTTZCLGlCQUFOLENBYjlCO0FBQUEsVUFjTUksSUFBSUgscUJBZFY7QUFBQSxVQWNrQztBQUM1QkksVUFBSUgsc0JBZlY7QUFBQSxVQWVrQztBQUM1QkksVUFBSWhDLElBQUlxQixzQkFBSixFQUE0QkksT0FBNUIsSUFBdUNJLHdCQUF3QkwsQ0FoQnpFO0FBQUEsVUFpQk1TLG1CQUFtQnhDLEtBQUt5QyxZQUFMLENBQWtCSixDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLENBQXhCLENBakJ6QjtBQUFBLFVBa0JNRyxRQUFRQyx5QkFBeUJuQix1QkFBekIsQ0FsQmQ7QUFBQSxVQW1CTW9CLGdCQUFnQkYsTUFBTUcsR0FBTixDQUFVLFVBQVNDLElBQVQsRUFBZTtBQUN2QyxnQkFBTUMsZUFBZUQsS0FBS0UscUJBQUwsQ0FBMkJSLGdCQUEzQixDQUFyQjs7QUFFQSxtQkFBT08sWUFBUDtBQUNELE9BSmUsQ0FuQnRCOztBQXlCQTtBQUNEOztBQUVELFNBQVNKLHdCQUFULENBQWtDaEMsZUFBbEMsRUFBbUQ7QUFDakQsVUFBTStCLFFBQVEsRUFBZDtBQUFBLFVBQ01PLHdCQUF3QnRDLGdCQUFnQnVDLE1BRDlDOztBQUdBLFdBQUssSUFBSUMsUUFBUSxDQUFqQixFQUFvQkEsUUFBUUYscUJBQTVCLEVBQW1ERSxPQUFuRCxFQUE2RDtBQUMzRCxnQkFBTUMsYUFBYUQsS0FBbkI7QUFBQSxnQkFDTUUsY0FBYyxDQUFDRixRQUFRLENBQVQsSUFBY0YscUJBRGxDO0FBQUEsZ0JBRU1yQyxzQkFBc0JELGdCQUFnQnlDLFVBQWhCLENBRjVCO0FBQUEsZ0JBR012Qyx1QkFBdUJGLGdCQUFnQjBDLFdBQWhCLENBSDdCO0FBQUEsZ0JBSU1QLE9BQU85QyxLQUFLc0QsbUJBQUwsQ0FBeUIxQyxtQkFBekIsRUFBOENDLG9CQUE5QyxDQUpiOztBQU1BNkIsa0JBQU1hLElBQU4sQ0FBV1QsSUFBWDtBQUNEOztBQUVELGFBQU9KLEtBQVA7QUFDRDs7QUFFRGMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmdkMscUNBQStCQTtBQURoQixDQUFqQiIsImZpbGUiOiJtYXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB2ZWMzID0gcmVxdWlyZSgnLi4vbWF0aHMvdmVjMycpLFxuICAgICAgTGluZSA9IHJlcXVpcmUoJy4uL21hdGhzL2xpbmUnKSxcbiAgICAgIGFycmF5VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL2FycmF5Jyk7XG5cbmNvbnN0IHsgZmlyc3QsIHNlY29uZCwgdGhpcmQsIGZvdXJ0aCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IHN1YnRyYWN0LCBkb3QsIGNyb3NzLCBub3JtYWxpc2UgfSA9IHZlYzM7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZU5vcm1hbCh2ZXJ0ZXhQb3NpdGlvbnMpIHtcbiAgY29uc3QgZmlyc3RWZXJ0ZXhQb3NpdGlvbiA9IGZpcnN0KHZlcnRleFBvc2l0aW9ucyksXG4gICAgICAgIHNlY29uZFZlcnRleFBvc2l0aW9uID0gc2Vjb25kKHZlcnRleFBvc2l0aW9ucyksXG4gICAgICAgIGZvdXJ0aFZlcnRleFBvc2l0aW9uID0gZm91cnRoKHZlcnRleFBvc2l0aW9ucyksXG4gICAgICAgIGZpcnN0VmVjdG9yID0gc3VidHJhY3Qoc2Vjb25kVmVydGV4UG9zaXRpb24sIGZpcnN0VmVydGV4UG9zaXRpb24pLFxuICAgICAgICBzZWNvbmRWZWN0b3IgPSBzdWJ0cmFjdChmb3VydGhWZXJ0ZXhQb3NpdGlvbiwgZmlyc3RWZXJ0ZXhQb3NpdGlvbiksXG4gICAgICAgIG5vcm1hbCA9IG5vcm1hbGlzZShjcm9zcyhmaXJzdFZlY3Rvciwgc2Vjb25kVmVjdG9yKSk7XG5cbiAgcmV0dXJuIG5vcm1hbDtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlSW50ZXJzZWN0aW9uT2ZQbGFuZXModmVydGV4UG9zaXRpb25zQSwgdmVydGV4UG9zaXRpb25zQikge1xuICBjb25zdCBub3JtYWxBID0gY2FsY3VsYXRlTm9ybWFsKHZlcnRleFBvc2l0aW9uc0EpLFxuICAgICAgICByb3RhdGlvblF1YXRlcm5pb24gPSBjYWxjdWxhdGVSb3RhdGlvblF1YXRlcm5pb24obm9ybWFsQSksXG4gICAgICAgIHJvdGF0ZWRWZXJ0ZXhQb3NpdGlvbnNBID0gcm90YXRlUG9zaXRpb25zKHZlcnRleFBvc2l0aW9uc0EsIHJvdGF0aW9uUXVhdGVybmlvbiksXG4gICAgICAgIHJvdGF0ZWRWZXJ0ZXhQb3NpdGlvbnNCID0gcm90YXRlUG9zaXRpb25zKHZlcnRleFBvc2l0aW9uc0IsIHJvdGF0aW9uUXVhdGVybmlvbiksXG4gICAgICAgIGZpcnN0Um90YXRlZFZlcnRleFBvc2l0aW9uQSA9IGZpcnN0KHJvdGF0ZWRWZXJ0ZXhQb3NpdGlvbnNBKSxcbiAgICAgICAgcm90YXRlZFZlcnRleFBvc2l0aW9uQSA9IGZpcnN0Um90YXRlZFZlcnRleFBvc2l0aW9uQSwgLy8vXG4gICAgICAgIHJvdGF0ZWRWZXJ0ZXhQb3NpdGlvbkNvbXBvbmVudHMgPSByb3RhdGVkVmVydGV4UG9zaXRpb25BLCAgLy8vXG4gICAgICAgIHRoaXJkUm90YXRlZFZlcnRleFBvc2l0aW9uQ29tcG9uZW50ID0gdGhpcmQocm90YXRlZFZlcnRleFBvc2l0aW9uQ29tcG9uZW50cyksXG4gICAgICAgIHogPSB0aGlyZFJvdGF0ZWRWZXJ0ZXhQb3NpdGlvbkNvbXBvbmVudCwgIC8vL1xuICAgICAgICBub3JtYWxCID0gY2FsY3VsYXRlTm9ybWFsKHJvdGF0ZWRWZXJ0ZXhQb3NpdGlvbnNCKSxcbiAgICAgICAgbm9ybWFsQkNvbXBvbmVudHMgPSBub3JtYWxCLCAgLy8vXG4gICAgICAgIGZpcnN0Tm9ybWFsQkNvbXBvbmVudCA9IGZpcnN0KG5vcm1hbEJDb21wb25lbnRzKSxcbiAgICAgICAgc2Vjb25kTm9ybWFsQkNvbXBvbmVudCA9IHNlY29uZChub3JtYWxCQ29tcG9uZW50cyksXG4gICAgICAgIHRoaXJkTm9ybWFsQkNvbXBvbmVudCA9IHRoaXJkKG5vcm1hbEJDb21wb25lbnRzKSxcbiAgICAgICAgYSA9IGZpcnN0Tm9ybWFsQkNvbXBvbmVudCwgIC8vL1xuICAgICAgICBiID0gc2Vjb25kTm9ybWFsQkNvbXBvbmVudCwgLy8vXG4gICAgICAgIGMgPSBkb3Qocm90YXRlZFZlcnRleFBvc2l0aW9uQSwgbm9ybWFsQikgLSB0aGlyZE5vcm1hbEJDb21wb25lbnQgKiB6LFxuICAgICAgICBpbnRlcnNlY3Rpb25MaW5lID0gTGluZS5mcm9tRXF1YXRpb24oYSwgYiwgYyksXG4gICAgICAgIGxpbmVzID0gbGluZXNGcm9tVmVydGV4UG9zaXRpb25zKHJvdGF0ZWRWZXJ0ZXhQb3NpdGlvbnNBKSxcbiAgICAgICAgaW50ZXJzZWN0aW9ucyA9IGxpbmVzLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgY29uc3QgaW50ZXJzZWN0aW9uID0gbGluZS5jYWxjdWxhdGVJbnRlcnNlY3Rpb24oaW50ZXJzZWN0aW9uTGluZSk7XG5cbiAgICAgICAgICByZXR1cm4gaW50ZXJzZWN0aW9uO1xuICAgICAgICB9KTtcblxuICBkZWJ1Z2dlclxufVxuXG5mdW5jdGlvbiBsaW5lc0Zyb21WZXJ0ZXhQb3NpdGlvbnModmVydGV4UG9zaXRpb25zKSB7XG4gIGNvbnN0IGxpbmVzID0gW10sXG4gICAgICAgIHZlcnRleFBvc2l0aW9uc0xlbmd0aCA9IHZlcnRleFBvc2l0aW9ucy5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHZlcnRleFBvc2l0aW9uc0xlbmd0aDsgaW5kZXgrKyApIHtcbiAgICBjb25zdCBmaXJzdEluZGV4ID0gaW5kZXgsXG4gICAgICAgICAgc2Vjb25kSW5kZXggPSAoaW5kZXggKyAxKSAlIHZlcnRleFBvc2l0aW9uc0xlbmd0aCxcbiAgICAgICAgICBmaXJzdFZlcnRleFBvc2l0aW9uID0gdmVydGV4UG9zaXRpb25zW2ZpcnN0SW5kZXhdLFxuICAgICAgICAgIHNlY29uZFZlcnRleFBvc2l0aW9uID0gdmVydGV4UG9zaXRpb25zW3NlY29uZEluZGV4XSxcbiAgICAgICAgICBsaW5lID0gTGluZS5mcm9tVmVydGV4UG9zaXRpb25zKGZpcnN0VmVydGV4UG9zaXRpb24sIHNlY29uZFZlcnRleFBvc2l0aW9uKTtcblxuICAgIGxpbmVzLnB1c2gobGluZSk7XG4gIH1cblxuICByZXR1cm4gbGluZXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjYWxjdWxhdGVJbnRlcnNlY3Rpb25PZlBsYW5lczogY2FsY3VsYXRlSW50ZXJzZWN0aW9uT2ZQbGFuZXNcbn07XG4iXX0=