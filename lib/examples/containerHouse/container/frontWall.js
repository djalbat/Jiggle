'use strict';

var ColouredPlane = require('../../common/coloured/plane');

var FrontWall = function FrontWall(properties) {
  var length = properties.length,
      overallWidth = properties.overallWidth,
      overallHeight = properties.overallHeight,
      colour = properties.colour,
      width = overallWidth,
      height = overallHeight,
      depth = 0,
      position = [0, 0, length],
      rotations = [0, 0, 0];


  return React.createElement(ColouredPlane, { colour: colour, width: width, height: height, depth: depth, position: position, rotations: rotations });
};

module.exports = FrontWall;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leGFtcGxlcy9jb250YWluZXJIb3VzZS9jb250YWluZXIvZnJvbnRXYWxsLmpzIl0sIm5hbWVzIjpbIkNvbG91cmVkUGxhbmUiLCJyZXF1aXJlIiwiRnJvbnRXYWxsIiwicHJvcGVydGllcyIsImxlbmd0aCIsIm92ZXJhbGxXaWR0aCIsIm92ZXJhbGxIZWlnaHQiLCJjb2xvdXIiLCJ3aWR0aCIsImhlaWdodCIsImRlcHRoIiwicG9zaXRpb24iLCJyb3RhdGlvbnMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxJQUFNQSxnQkFBZ0JDLFFBQVEsNkJBQVIsQ0FBdEI7O0FBRUEsSUFBTUMsWUFBWSxTQUFaQSxTQUFZLENBQUNDLFVBQUQsRUFBZ0I7QUFBQSxNQUN4QkMsTUFEd0IsR0FDd0JELFVBRHhCLENBQ3hCQyxNQUR3QjtBQUFBLE1BQ2hCQyxZQURnQixHQUN3QkYsVUFEeEIsQ0FDaEJFLFlBRGdCO0FBQUEsTUFDRkMsYUFERSxHQUN3QkgsVUFEeEIsQ0FDRkcsYUFERTtBQUFBLE1BQ2FDLE1BRGIsR0FDd0JKLFVBRHhCLENBQ2FJLE1BRGI7QUFBQSxNQUUxQkMsS0FGMEIsR0FFbEJILFlBRmtCO0FBQUEsTUFHMUJJLE1BSDBCLEdBR2pCSCxhQUhpQjtBQUFBLE1BSTFCSSxLQUowQixHQUlsQixDQUprQjtBQUFBLE1BSzFCQyxRQUwwQixHQUtmLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUVAsTUFBUixDQUxlO0FBQUEsTUFNMUJRLFNBTjBCLEdBTWQsQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsQ0FOYzs7O0FBUWhDLFNBRUUsb0JBQUMsYUFBRCxJQUFlLFFBQVFMLE1BQXZCLEVBQStCLE9BQU9DLEtBQXRDLEVBQTZDLFFBQVFDLE1BQXJELEVBQTZELE9BQU9DLEtBQXBFLEVBQTJFLFVBQVVDLFFBQXJGLEVBQStGLFdBQVdDLFNBQTFHLEdBRkY7QUFLRCxDQWJEOztBQWVBQyxPQUFPQyxPQUFQLEdBQWlCWixTQUFqQiIsImZpbGUiOiJmcm9udFdhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IENvbG91cmVkUGxhbmUgPSByZXF1aXJlKCcuLi8uLi9jb21tb24vY29sb3VyZWQvcGxhbmUnKTtcblxuY29uc3QgRnJvbnRXYWxsID0gKHByb3BlcnRpZXMpID0+IHtcbiAgY29uc3QgeyBsZW5ndGgsIG92ZXJhbGxXaWR0aCwgb3ZlcmFsbEhlaWdodCwgY29sb3VyIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICB3aWR0aCA9IG92ZXJhbGxXaWR0aCxcbiAgICAgICAgaGVpZ2h0ID0gb3ZlcmFsbEhlaWdodCxcbiAgICAgICAgZGVwdGggPSAwLFxuICAgICAgICBwb3NpdGlvbiA9IFsgMCwgMCwgbGVuZ3RoIF0sXG4gICAgICAgIHJvdGF0aW9ucyA9IFsgMCwgMCwgMCBdO1xuXG4gIHJldHVybiAoXG5cbiAgICA8Q29sb3VyZWRQbGFuZSBjb2xvdXI9e2NvbG91cn0gd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gZGVwdGg9e2RlcHRofSBwb3NpdGlvbj17cG9zaXRpb259IHJvdGF0aW9ucz17cm90YXRpb25zfSAvPlxuXG4gICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZyb250V2FsbDtcbiJdfQ==