'use strict';

var jiggle = require('../../index');

var ColouredCuboid = require('../element/common/coloured/cuboid');

var Canvas = jiggle.Canvas,
    Mask = jiggle.Mask,
    Part = jiggle.Part,
    Scene = jiggle.Scene,
    Camera = jiggle.Camera;


var canvas = new Canvas();

var cubesExample = function cubesExample() {
  return React.createElement(
    Scene,
    { canvas: canvas },
    React.createElement(
      Part,
      { canvas: canvas },
      React.createElement(
        ColouredCuboid,
        { colour: [1, 1, 0, 1], position: [-0.5, -0.5, -0.5] },
        React.createElement(
          Mask,
          null,
          React.createElement(
            ColouredCuboid,
            { width: 0.5, height: 0.5, depth: 0.5, position: [0.25, 0.25, 0.25] },
            React.createElement(
              Mask,
              null,
              React.createElement(ColouredCuboid, { width: 0.5, height: 0.5, depth: 0.5, position: [0.25, 0.25, 0.25] })
            )
          )
        )
      )
    ),
    React.createElement(Camera, { canvas: canvas, initialDistance: 5, initialOffset: [0, 0, 0] })
  );
};

module.exports = cubesExample;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2N1YmVzLmpzIl0sIm5hbWVzIjpbImppZ2dsZSIsInJlcXVpcmUiLCJDb2xvdXJlZEN1Ym9pZCIsIkNhbnZhcyIsIk1hc2siLCJQYXJ0IiwiU2NlbmUiLCJDYW1lcmEiLCJjYW52YXMiLCJjdWJlc0V4YW1wbGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLGFBQVIsQ0FBZjs7QUFFQSxJQUFNQyxpQkFBaUJELFFBQVEsbUNBQVIsQ0FBdkI7O0lBRVFFLE0sR0FBc0NILE0sQ0FBdENHLE07SUFBUUMsSSxHQUE4QkosTSxDQUE5QkksSTtJQUFNQyxJLEdBQXdCTCxNLENBQXhCSyxJO0lBQU1DLEssR0FBa0JOLE0sQ0FBbEJNLEs7SUFBT0MsTSxHQUFXUCxNLENBQVhPLE07OztBQUVuQyxJQUFNQyxTQUFTLElBQUlMLE1BQUosRUFBZjs7QUFHQSxJQUFNTSxlQUFlLFNBQWZBLFlBQWU7QUFBQSxTQUVuQjtBQUFDLFNBQUQ7QUFBQSxNQUFPLFFBQVFELE1BQWY7QUFDRTtBQUFDLFVBQUQ7QUFBQSxRQUFNLFFBQVFBLE1BQWQ7QUFDRTtBQUFDLHNCQUFEO0FBQUEsVUFBZ0IsUUFBUSxDQUFFLENBQUYsRUFBSyxDQUFMLEVBQVEsQ0FBUixFQUFXLENBQVgsQ0FBeEIsRUFBd0MsVUFBVSxDQUFFLENBQUMsR0FBSCxFQUFRLENBQUMsR0FBVCxFQUFjLENBQUMsR0FBZixDQUFsRDtBQUNFO0FBQUMsY0FBRDtBQUFBO0FBQ0U7QUFBQywwQkFBRDtBQUFBLGNBQWdCLE9BQU8sR0FBdkIsRUFBNEIsUUFBUSxHQUFwQyxFQUF5QyxPQUFPLEdBQWhELEVBQXFELFVBQVUsQ0FBRSxJQUFGLEVBQVEsSUFBUixFQUFjLElBQWQsQ0FBL0Q7QUFDRTtBQUFDLGtCQUFEO0FBQUE7QUFDRSxrQ0FBQyxjQUFELElBQWdCLE9BQU8sR0FBdkIsRUFBNEIsUUFBUSxHQUFwQyxFQUF5QyxPQUFPLEdBQWhELEVBQXFELFVBQVUsQ0FBRSxJQUFGLEVBQVEsSUFBUixFQUFjLElBQWQsQ0FBL0Q7QUFERjtBQURGO0FBREY7QUFERjtBQURGLEtBREY7QUFZRSx3QkFBQyxNQUFELElBQVEsUUFBUUEsTUFBaEIsRUFBd0IsaUJBQWlCLENBQXpDLEVBQTRDLGVBQWUsQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsQ0FBM0Q7QUFaRixHQUZtQjtBQUFBLENBQXJCOztBQW1CQUUsT0FBT0MsT0FBUCxHQUFpQkYsWUFBakIiLCJmaWxlIjoiY3ViZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGppZ2dsZSA9IHJlcXVpcmUoJy4uLy4uL2luZGV4Jyk7XG5cbmNvbnN0IENvbG91cmVkQ3Vib2lkID0gcmVxdWlyZSgnLi4vZWxlbWVudC9jb21tb24vY29sb3VyZWQvY3Vib2lkJyk7XG5cbmNvbnN0IHsgQ2FudmFzLCBNYXNrLCBQYXJ0LCBTY2VuZSwgQ2FtZXJhIH0gPSBqaWdnbGU7XG5cbmNvbnN0IGNhbnZhcyA9IG5ldyBDYW52YXMoKTtcblxuXG5jb25zdCBjdWJlc0V4YW1wbGUgPSAoKSA9PlxuXG4gIDxTY2VuZSBjYW52YXM9e2NhbnZhc30+XG4gICAgPFBhcnQgY2FudmFzPXtjYW52YXN9PlxuICAgICAgPENvbG91cmVkQ3Vib2lkIGNvbG91cj17WyAxLCAxLCAwLCAxIF19IHBvc2l0aW9uPXtbIC0wLjUsIC0wLjUsIC0wLjUgXX0+XG4gICAgICAgIDxNYXNrPlxuICAgICAgICAgIDxDb2xvdXJlZEN1Ym9pZCB3aWR0aD17MC41fSBoZWlnaHQ9ezAuNX0gZGVwdGg9ezAuNX0gcG9zaXRpb249e1sgMC4yNSwgMC4yNSwgMC4yNSBdfT5cbiAgICAgICAgICAgIDxNYXNrPlxuICAgICAgICAgICAgICA8Q29sb3VyZWRDdWJvaWQgd2lkdGg9ezAuNX0gaGVpZ2h0PXswLjV9IGRlcHRoPXswLjV9IHBvc2l0aW9uPXtbIDAuMjUsIDAuMjUsIDAuMjUgXX0gLz5cbiAgICAgICAgICAgIDwvTWFzaz5cbiAgICAgICAgICA8L0NvbG91cmVkQ3Vib2lkPlxuICAgICAgICA8L01hc2s+XG4gICAgICA8L0NvbG91cmVkQ3Vib2lkPlxuICAgIDwvUGFydD5cbiAgICA8Q2FtZXJhIGNhbnZhcz17Y2FudmFzfSBpbml0aWFsRGlzdGFuY2U9ezV9IGluaXRpYWxPZmZzZXQ9e1sgMCwgMCwgMCBdfSAvPlxuICA8L1NjZW5lPlxuXG47XG5cbm1vZHVsZS5leHBvcnRzID0gY3ViZXNFeGFtcGxlO1xuIl19