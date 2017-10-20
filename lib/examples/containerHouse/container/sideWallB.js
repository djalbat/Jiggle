'use strict';

var ColouredPlane = require('../../common/coloured/plane');

var SideWallB = function SideWallB(properties) {
  var length = properties.length,
      overallWidth = properties.overallWidth,
      overallHeight = properties.overallHeight,
      colour = properties.colour,
      width = length,
      height = overallHeight,
      depth = 0,
      position = [overallWidth, 0, length],
      rotations = [0, +90, 0];


  return React.createElement(ColouredPlane, { colour: colour, width: width, height: height, depth: depth, position: position, rotations: rotations });
};

module.exports = SideWallB;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leGFtcGxlcy9jb250YWluZXJIb3VzZS9jb250YWluZXIvc2lkZVdhbGxCLmpzIl0sIm5hbWVzIjpbIkNvbG91cmVkUGxhbmUiLCJyZXF1aXJlIiwiU2lkZVdhbGxCIiwicHJvcGVydGllcyIsImxlbmd0aCIsIm92ZXJhbGxXaWR0aCIsIm92ZXJhbGxIZWlnaHQiLCJjb2xvdXIiLCJ3aWR0aCIsImhlaWdodCIsImRlcHRoIiwicG9zaXRpb24iLCJyb3RhdGlvbnMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxJQUFNQSxnQkFBZ0JDLFFBQVEsNkJBQVIsQ0FBdEI7O0FBRUEsSUFBTUMsWUFBWSxTQUFaQSxTQUFZLENBQUNDLFVBQUQsRUFBZ0I7QUFBQSxNQUN4QkMsTUFEd0IsR0FDd0JELFVBRHhCLENBQ3hCQyxNQUR3QjtBQUFBLE1BQ2hCQyxZQURnQixHQUN3QkYsVUFEeEIsQ0FDaEJFLFlBRGdCO0FBQUEsTUFDRkMsYUFERSxHQUN3QkgsVUFEeEIsQ0FDRkcsYUFERTtBQUFBLE1BQ2FDLE1BRGIsR0FDd0JKLFVBRHhCLENBQ2FJLE1BRGI7QUFBQSxNQUUxQkMsS0FGMEIsR0FFbEJKLE1BRmtCO0FBQUEsTUFHMUJLLE1BSDBCLEdBR2pCSCxhQUhpQjtBQUFBLE1BSTFCSSxLQUowQixHQUlsQixDQUprQjtBQUFBLE1BSzFCQyxRQUwwQixHQUtmLENBQUVOLFlBQUYsRUFBZ0IsQ0FBaEIsRUFBbUJELE1BQW5CLENBTGU7QUFBQSxNQU0xQlEsU0FOMEIsR0FNZCxDQUFFLENBQUYsRUFBSyxDQUFDLEVBQU4sRUFBVSxDQUFWLENBTmM7OztBQVFoQyxTQUVFLG9CQUFDLGFBQUQsSUFBZSxRQUFRTCxNQUF2QixFQUErQixPQUFPQyxLQUF0QyxFQUE2QyxRQUFRQyxNQUFyRCxFQUE2RCxPQUFPQyxLQUFwRSxFQUEyRSxVQUFVQyxRQUFyRixFQUErRixXQUFXQyxTQUExRyxHQUZGO0FBS0QsQ0FiRDs7QUFlQUMsT0FBT0MsT0FBUCxHQUFpQlosU0FBakIiLCJmaWxlIjoic2lkZVdhbGxCLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDb2xvdXJlZFBsYW5lID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uL2NvbG91cmVkL3BsYW5lJyk7XG5cbmNvbnN0IFNpZGVXYWxsQiA9IChwcm9wZXJ0aWVzKSA9PiB7XG4gIGNvbnN0IHsgbGVuZ3RoLCBvdmVyYWxsV2lkdGgsIG92ZXJhbGxIZWlnaHQsIGNvbG91ciB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgd2lkdGggPSBsZW5ndGgsXG4gICAgICAgIGhlaWdodCA9IG92ZXJhbGxIZWlnaHQsXG4gICAgICAgIGRlcHRoID0gMCxcbiAgICAgICAgcG9zaXRpb24gPSBbIG92ZXJhbGxXaWR0aCwgMCwgbGVuZ3RoIF0sXG4gICAgICAgIHJvdGF0aW9ucyA9IFsgMCwgKzkwLCAwIF07XG5cbiAgcmV0dXJuIChcblxuICAgIDxDb2xvdXJlZFBsYW5lIGNvbG91cj17Y29sb3VyfSB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBkZXB0aD17ZGVwdGh9IHBvc2l0aW9uPXtwb3NpdGlvbn0gcm90YXRpb25zPXtyb3RhdGlvbnN9IC8+XG5cbiAgKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2lkZVdhbGxCOyJdfQ==