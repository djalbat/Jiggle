'use strict';

var React = require('../../react'),
    TextureCuboid = require('../common/cuboid/texture');

var SteelSection = function SteelSection(properties) {
  var offset = properties.offset,
      width = properties.width,
      depth = properties.depth,
      height = properties.height;


  return React.createElement(TextureCuboid, { imageName: 'rustySteel.jpg', offset: offset, width: width, depth: depth, height: height });
};

module.exports = SteelSection;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlcy9jb250YWluZXJIb3VzZS9zdGVlbFNlY3Rpb24uanMiXSwibmFtZXMiOlsiUmVhY3QiLCJyZXF1aXJlIiwiVGV4dHVyZUN1Ym9pZCIsIlN0ZWVsU2VjdGlvbiIsInByb3BlcnRpZXMiLCJvZmZzZXQiLCJ3aWR0aCIsImRlcHRoIiwiaGVpZ2h0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxhQUFSLENBQWQ7QUFBQSxJQUNNQyxnQkFBZ0JELFFBQVEsMEJBQVIsQ0FEdEI7O0FBR0EsSUFBTUUsZUFBZSxTQUFmQSxZQUFlLENBQUNDLFVBQUQsRUFBZ0I7QUFBQSxNQUMzQkMsTUFEMkIsR0FDTUQsVUFETixDQUMzQkMsTUFEMkI7QUFBQSxNQUNuQkMsS0FEbUIsR0FDTUYsVUFETixDQUNuQkUsS0FEbUI7QUFBQSxNQUNaQyxLQURZLEdBQ01ILFVBRE4sQ0FDWkcsS0FEWTtBQUFBLE1BQ0xDLE1BREssR0FDTUosVUFETixDQUNMSSxNQURLOzs7QUFHbkMsU0FFRSxvQkFBQyxhQUFELElBQWUsV0FBVSxnQkFBekIsRUFBMEMsUUFBUUgsTUFBbEQsRUFBMEQsT0FBT0MsS0FBakUsRUFBd0UsT0FBT0MsS0FBL0UsRUFBc0YsUUFBUUMsTUFBOUYsR0FGRjtBQUtELENBUkQ7O0FBVUFDLE9BQU9DLE9BQVAsR0FBaUJQLFlBQWpCIiwiZmlsZSI6InN0ZWVsU2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCcuLi8uLi9yZWFjdCcpLFxuICAgICAgVGV4dHVyZUN1Ym9pZCA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jdWJvaWQvdGV4dHVyZScpO1xuXG5jb25zdCBTdGVlbFNlY3Rpb24gPSAocHJvcGVydGllcykgPT4ge1xuICBjb25zdCB7IG9mZnNldCwgd2lkdGgsIGRlcHRoLCBoZWlnaHQgfSA9IHByb3BlcnRpZXM7XG5cbiAgcmV0dXJuIChcblxuICAgIDxUZXh0dXJlQ3Vib2lkIGltYWdlTmFtZT1cInJ1c3R5U3RlZWwuanBnXCIgb2Zmc2V0PXtvZmZzZXR9IHdpZHRoPXt3aWR0aH0gZGVwdGg9e2RlcHRofSBoZWlnaHQ9e2hlaWdodH0gLz5cbiAgICAgIFxuICApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdGVlbFNlY3Rpb247XG4iXX0=