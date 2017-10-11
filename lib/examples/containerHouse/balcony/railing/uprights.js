'use strict';

var vec3 = require('../../../../gl/vec3'),
    Upright = require('./upright');

var add = vec3.add;


var Uprights = function Uprights(properties) {
  var offset = properties.offset,
      height = properties.height,
      length = properties.length,
      elements = [],
      step = 0.5,
      count = length / step;


  for (var index = 1; index < count; index++) {
    elements.push(React.createElement(Upright, { offset: add(offset, [step * index, 0, 0]), height: height }));
  }

  return elements;
};

module.exports = Uprights;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2VzNi9leGFtcGxlcy9jb250YWluZXJIb3VzZS9iYWxjb255L3JhaWxpbmcvdXByaWdodHMuanMiXSwibmFtZXMiOlsidmVjMyIsInJlcXVpcmUiLCJVcHJpZ2h0IiwiYWRkIiwiVXByaWdodHMiLCJwcm9wZXJ0aWVzIiwib2Zmc2V0IiwiaGVpZ2h0IiwibGVuZ3RoIiwiZWxlbWVudHMiLCJzdGVwIiwiY291bnQiLCJpbmRleCIsInB1c2giLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLHFCQUFSLENBQWI7QUFBQSxJQUNNQyxVQUFVRCxRQUFRLFdBQVIsQ0FEaEI7O0lBR1FFLEcsR0FBUUgsSSxDQUFSRyxHOzs7QUFFUixJQUFNQyxXQUFXLFNBQVhBLFFBQVcsQ0FBQ0MsVUFBRCxFQUFnQjtBQUFBLE1BQ3ZCQyxNQUR1QixHQUNJRCxVQURKLENBQ3ZCQyxNQUR1QjtBQUFBLE1BQ2ZDLE1BRGUsR0FDSUYsVUFESixDQUNmRSxNQURlO0FBQUEsTUFDUEMsTUFETyxHQUNJSCxVQURKLENBQ1BHLE1BRE87QUFBQSxNQUV6QkMsUUFGeUIsR0FFZCxFQUZjO0FBQUEsTUFHekJDLElBSHlCLEdBR2xCLEdBSGtCO0FBQUEsTUFJekJDLEtBSnlCLEdBSWpCSCxTQUFTRSxJQUpROzs7QUFNL0IsT0FBSyxJQUFJRSxRQUFRLENBQWpCLEVBQW9CQSxRQUFPRCxLQUEzQixFQUFrQ0MsT0FBbEMsRUFBMkM7QUFDekNILGFBQVNJLElBQVQsQ0FFRSxvQkFBQyxPQUFELElBQVMsUUFBUVYsSUFBSUcsTUFBSixFQUFZLENBQUVJLE9BQU9FLEtBQVQsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsQ0FBWixDQUFqQixFQUFzRCxRQUFRTCxNQUE5RCxHQUZGO0FBS0Q7O0FBRUQsU0FBT0UsUUFBUDtBQUNELENBZkQ7O0FBaUJBSyxPQUFPQyxPQUFQLEdBQWlCWCxRQUFqQiIsImZpbGUiOiJ1cHJpZ2h0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdmVjMyA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL2dsL3ZlYzMnKSxcbiAgICAgIFVwcmlnaHQgPSByZXF1aXJlKCcuL3VwcmlnaHQnKTtcblxuY29uc3QgeyBhZGQgfSA9IHZlYzM7XG5cbmNvbnN0IFVwcmlnaHRzID0gKHByb3BlcnRpZXMpID0+IHtcbiAgY29uc3QgeyBvZmZzZXQsIGhlaWdodCwgbGVuZ3RoIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICBlbGVtZW50cyA9IFtdLFxuICAgICAgICBzdGVwID0gMC41LFxuICAgICAgICBjb3VudCA9IGxlbmd0aCAvIHN0ZXA7XG5cbiAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleDwgY291bnQ7IGluZGV4KyspIHtcbiAgICBlbGVtZW50cy5wdXNoKFxuXG4gICAgICA8VXByaWdodCBvZmZzZXQ9e2FkZChvZmZzZXQsIFsgc3RlcCAqIGluZGV4LCAwLCAwIF0pfSBoZWlnaHQ9e2hlaWdodH0gLz5cblxuICAgIClcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50cztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVXByaWdodHM7XG4iXX0=