'use strict';

var ColouredSquare = require('./colouredSquare');

var Face = function Face(properties) {
  var colour = properties.colour;


  return React.createElement(ColouredSquare, { colour: colour, position: [-0.5, -0.5, +0.5] });
};

module.exports = Face;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL2VsZW1lbnQvZmFjZS5qcyJdLCJuYW1lcyI6WyJDb2xvdXJlZFNxdWFyZSIsInJlcXVpcmUiLCJGYWNlIiwicHJvcGVydGllcyIsImNvbG91ciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQU1BLGlCQUFpQkMsUUFBUSxrQkFBUixDQUF2Qjs7QUFJQSxJQUFNQyxPQUFPLFNBQVBBLElBQU8sQ0FBQ0MsVUFBRCxFQUFnQjtBQUFBLE1BQ25CQyxNQURtQixHQUNSRCxVQURRLENBQ25CQyxNQURtQjs7O0FBRzNCLFNBRUUsb0JBQUMsY0FBRCxJQUFnQixRQUFRQSxNQUF4QixFQUFnQyxVQUFVLENBQUUsQ0FBQyxHQUFILEVBQVEsQ0FBQyxHQUFULEVBQWMsQ0FBQyxHQUFmLENBQTFDLEdBRkY7QUFLRCxDQVJEOztBQVVBQyxPQUFPQyxPQUFQLEdBQWlCSixJQUFqQiIsImZpbGUiOiJmYWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDb2xvdXJlZFNxdWFyZSA9IHJlcXVpcmUoJy4vY29sb3VyZWRTcXVhcmUnKTtcblxuXG5cbmNvbnN0IEZhY2UgPSAocHJvcGVydGllcykgPT4ge1xuICBjb25zdCB7IGNvbG91ciB9ID0gcHJvcGVydGllcztcblxuICByZXR1cm4gKFxuXG4gICAgPENvbG91cmVkU3F1YXJlIGNvbG91cj17Y29sb3VyfSBwb3NpdGlvbj17WyAtMC41LCAtMC41LCArMC41IF19IC8+XG5cbiAgKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRmFjZTtcbiJdfQ==