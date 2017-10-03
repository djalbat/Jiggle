'use strict';

var arrayUtilities = require('../../utilities/array'),
    vertexUtilities = require('../../utilities/vertex');

var flatten = arrayUtilities.flatten,
    calculateVertexIndexData = vertexUtilities.calculateVertexIndexData,
    calculateVertexNormalData = vertexUtilities.calculateVertexNormalData;


var initialVertexPositionData = calculateInitialVertexPositionData(),
    vertexIndexData = calculateVertexIndexData(initialVertexPositionData),
    vertexNormalData = calculateVertexNormalData(initialVertexPositionData);

module.exports = {
      vertexIndexData: vertexIndexData,
      vertexNormalData: vertexNormalData,
      initialVertexPositionData: initialVertexPositionData
};

function calculateInitialVertexPositionData() {
      var initialVertexPositions = [],
          facesLength = 7,
          ///
      step = 2 * Math.PI / facesLength;

      for (var count = 0; count < facesLength; count++) {
            var angle = step * count,
                firstX = Math.cos(angle),
                firstY = Math.sin(angle),
                secondX = Math.cos(angle + step),
                secondY = Math.sin(angle + step),
                firstZ = 0,
                secondZ = 1;

            initialVertexPositions.push([firstX, firstY, firstZ, 1]);
            initialVertexPositions.push([secondX, secondY, firstZ, 1]);
            initialVertexPositions.push([secondX, secondY, secondZ, 1]);
            initialVertexPositions.push([firstX, firstY, secondZ, 1]);
      }

      var initialVertexPositionData = flatten(initialVertexPositions);

      return initialVertexPositionData;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlcy9jb21tb24vY3lsaW5kZXIuanMiXSwibmFtZXMiOlsiYXJyYXlVdGlsaXRpZXMiLCJyZXF1aXJlIiwidmVydGV4VXRpbGl0aWVzIiwiZmxhdHRlbiIsImNhbGN1bGF0ZVZlcnRleEluZGV4RGF0YSIsImNhbGN1bGF0ZVZlcnRleE5vcm1hbERhdGEiLCJpbml0aWFsVmVydGV4UG9zaXRpb25EYXRhIiwiY2FsY3VsYXRlSW5pdGlhbFZlcnRleFBvc2l0aW9uRGF0YSIsInZlcnRleEluZGV4RGF0YSIsInZlcnRleE5vcm1hbERhdGEiLCJtb2R1bGUiLCJleHBvcnRzIiwiaW5pdGlhbFZlcnRleFBvc2l0aW9ucyIsImZhY2VzTGVuZ3RoIiwic3RlcCIsIk1hdGgiLCJQSSIsImNvdW50IiwiYW5nbGUiLCJmaXJzdFgiLCJjb3MiLCJmaXJzdFkiLCJzaW4iLCJzZWNvbmRYIiwic2Vjb25kWSIsImZpcnN0WiIsInNlY29uZFoiLCJwdXNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxJQUFNQSxpQkFBaUJDLFFBQVEsdUJBQVIsQ0FBdkI7QUFBQSxJQUNNQyxrQkFBa0JELFFBQVEsd0JBQVIsQ0FEeEI7O0FBR00sSUFBRUUsT0FBRixHQUFjSCxjQUFkLENBQUVHLE9BQUY7QUFBQSxJQUNFQyx3QkFERixHQUN5REYsZUFEekQsQ0FDRUUsd0JBREY7QUFBQSxJQUM0QkMseUJBRDVCLEdBQ3lESCxlQUR6RCxDQUM0QkcseUJBRDVCOzs7QUFHTixJQUFNQyw0QkFBNEJDLG9DQUFsQztBQUFBLElBQ01DLGtCQUFrQkoseUJBQXlCRSx5QkFBekIsQ0FEeEI7QUFBQSxJQUVNRyxtQkFBbUJKLDBCQUEwQkMseUJBQTFCLENBRnpCOztBQUlBSSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZILHVCQUFpQkEsZUFERjtBQUVmQyx3QkFBa0JBLGdCQUZIO0FBR2ZILGlDQUEyQkE7QUFIWixDQUFqQjs7QUFNQSxTQUFTQyxrQ0FBVCxHQUE4QztBQUM1QyxVQUFNSyx5QkFBeUIsRUFBL0I7QUFBQSxVQUNNQyxjQUFjLENBRHBCO0FBQUEsVUFDdUI7QUFDakJDLGFBQU8sSUFBSUMsS0FBS0MsRUFBVCxHQUFjSCxXQUYzQjs7QUFJQSxXQUFLLElBQUlJLFFBQVEsQ0FBakIsRUFBb0JBLFFBQVFKLFdBQTVCLEVBQXlDSSxPQUF6QyxFQUFrRDtBQUNoRCxnQkFBTUMsUUFBUUosT0FBT0csS0FBckI7QUFBQSxnQkFDTUUsU0FBU0osS0FBS0ssR0FBTCxDQUFTRixLQUFULENBRGY7QUFBQSxnQkFFTUcsU0FBU04sS0FBS08sR0FBTCxDQUFTSixLQUFULENBRmY7QUFBQSxnQkFHTUssVUFBVVIsS0FBS0ssR0FBTCxDQUFTRixRQUFRSixJQUFqQixDQUhoQjtBQUFBLGdCQUlNVSxVQUFVVCxLQUFLTyxHQUFMLENBQVNKLFFBQVFKLElBQWpCLENBSmhCO0FBQUEsZ0JBS01XLFNBQVMsQ0FMZjtBQUFBLGdCQU1NQyxVQUFVLENBTmhCOztBQVFBZCxtQ0FBdUJlLElBQXZCLENBQTRCLENBQUVSLE1BQUYsRUFBVUUsTUFBVixFQUFrQkksTUFBbEIsRUFBMEIsQ0FBMUIsQ0FBNUI7QUFDQWIsbUNBQXVCZSxJQUF2QixDQUE0QixDQUFFSixPQUFGLEVBQVdDLE9BQVgsRUFBb0JDLE1BQXBCLEVBQTRCLENBQTVCLENBQTVCO0FBQ0FiLG1DQUF1QmUsSUFBdkIsQ0FBNEIsQ0FBRUosT0FBRixFQUFXQyxPQUFYLEVBQW9CRSxPQUFwQixFQUE2QixDQUE3QixDQUE1QjtBQUNBZCxtQ0FBdUJlLElBQXZCLENBQTRCLENBQUVSLE1BQUYsRUFBVUUsTUFBVixFQUFrQkssT0FBbEIsRUFBMkIsQ0FBM0IsQ0FBNUI7QUFDRDs7QUFFRCxVQUFNcEIsNEJBQTRCSCxRQUFRUyxzQkFBUixDQUFsQzs7QUFFQSxhQUFPTix5QkFBUDtBQUNEIiwiZmlsZSI6ImN5bGluZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcnJheVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9hcnJheScpLFxuICAgICAgdmVydGV4VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vdXRpbGl0aWVzL3ZlcnRleCcpO1xuXG5jb25zdCB7IGZsYXR0ZW4gfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBjYWxjdWxhdGVWZXJ0ZXhJbmRleERhdGEsIGNhbGN1bGF0ZVZlcnRleE5vcm1hbERhdGF9ID0gdmVydGV4VXRpbGl0aWVzO1xuXG5jb25zdCBpbml0aWFsVmVydGV4UG9zaXRpb25EYXRhID0gY2FsY3VsYXRlSW5pdGlhbFZlcnRleFBvc2l0aW9uRGF0YSgpLFxuICAgICAgdmVydGV4SW5kZXhEYXRhID0gY2FsY3VsYXRlVmVydGV4SW5kZXhEYXRhKGluaXRpYWxWZXJ0ZXhQb3NpdGlvbkRhdGEpLFxuICAgICAgdmVydGV4Tm9ybWFsRGF0YSA9IGNhbGN1bGF0ZVZlcnRleE5vcm1hbERhdGEoaW5pdGlhbFZlcnRleFBvc2l0aW9uRGF0YSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB2ZXJ0ZXhJbmRleERhdGE6IHZlcnRleEluZGV4RGF0YSxcbiAgdmVydGV4Tm9ybWFsRGF0YTogdmVydGV4Tm9ybWFsRGF0YSxcbiAgaW5pdGlhbFZlcnRleFBvc2l0aW9uRGF0YTogaW5pdGlhbFZlcnRleFBvc2l0aW9uRGF0YVxufTtcblxuZnVuY3Rpb24gY2FsY3VsYXRlSW5pdGlhbFZlcnRleFBvc2l0aW9uRGF0YSgpIHtcbiAgY29uc3QgaW5pdGlhbFZlcnRleFBvc2l0aW9ucyA9IFtdLFxuICAgICAgICBmYWNlc0xlbmd0aCA9IDcsIC8vL1xuICAgICAgICBzdGVwID0gMiAqIE1hdGguUEkgLyBmYWNlc0xlbmd0aDtcblxuICBmb3IgKGxldCBjb3VudCA9IDA7IGNvdW50IDwgZmFjZXNMZW5ndGg7IGNvdW50KyspIHtcbiAgICBjb25zdCBhbmdsZSA9IHN0ZXAgKiBjb3VudCxcbiAgICAgICAgICBmaXJzdFggPSBNYXRoLmNvcyhhbmdsZSksXG4gICAgICAgICAgZmlyc3RZID0gTWF0aC5zaW4oYW5nbGUpLFxuICAgICAgICAgIHNlY29uZFggPSBNYXRoLmNvcyhhbmdsZSArIHN0ZXApLFxuICAgICAgICAgIHNlY29uZFkgPSBNYXRoLnNpbihhbmdsZSArIHN0ZXApLFxuICAgICAgICAgIGZpcnN0WiA9IDAsXG4gICAgICAgICAgc2Vjb25kWiA9IDE7XG5cbiAgICBpbml0aWFsVmVydGV4UG9zaXRpb25zLnB1c2goWyBmaXJzdFgsIGZpcnN0WSwgZmlyc3RaLCAxIF0pO1xuICAgIGluaXRpYWxWZXJ0ZXhQb3NpdGlvbnMucHVzaChbIHNlY29uZFgsIHNlY29uZFksIGZpcnN0WiwgMSBdKTtcbiAgICBpbml0aWFsVmVydGV4UG9zaXRpb25zLnB1c2goWyBzZWNvbmRYLCBzZWNvbmRZLCBzZWNvbmRaLCAxIF0pO1xuICAgIGluaXRpYWxWZXJ0ZXhQb3NpdGlvbnMucHVzaChbIGZpcnN0WCwgZmlyc3RZLCBzZWNvbmRaLCAxIF0pO1xuICB9XG5cbiAgY29uc3QgaW5pdGlhbFZlcnRleFBvc2l0aW9uRGF0YSA9IGZsYXR0ZW4oaW5pdGlhbFZlcnRleFBvc2l0aW9ucyk7XG5cbiAgcmV0dXJuIGluaXRpYWxWZXJ0ZXhQb3NpdGlvbkRhdGE7XG59XG4iXX0=