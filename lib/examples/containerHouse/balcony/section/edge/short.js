'use strict';

var React = require('../../../../../react'),
    Edge = require('../edge');

var thickness = Edge.thickness;


var ShortEdge = function ShortEdge(properties) {
  var offset = properties.offset,
      width = properties.width,
      depth = thickness; ///

  return React.createElement(Edge, { offset: offset, width: width, depth: depth });
};

module.exports = ShortEdge;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2VzNi9leGFtcGxlcy9jb250YWluZXJIb3VzZS9iYWxjb255L3NlY3Rpb24vZWRnZS9zaG9ydC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJFZGdlIiwidGhpY2tuZXNzIiwiU2hvcnRFZGdlIiwicHJvcGVydGllcyIsIm9mZnNldCIsIndpZHRoIiwiZGVwdGgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxJQUFNQSxRQUFRQyxRQUFRLHNCQUFSLENBQWQ7QUFBQSxJQUNNQyxPQUFPRCxRQUFRLFNBQVIsQ0FEYjs7SUFHUUUsUyxHQUFjRCxJLENBQWRDLFM7OztBQUVSLElBQU1DLFlBQVksU0FBWkEsU0FBWSxDQUFDQyxVQUFELEVBQWdCO0FBQUEsTUFDeEJDLE1BRHdCLEdBQ05ELFVBRE0sQ0FDeEJDLE1BRHdCO0FBQUEsTUFDaEJDLEtBRGdCLEdBQ05GLFVBRE0sQ0FDaEJFLEtBRGdCO0FBQUEsTUFFMUJDLEtBRjBCLEdBRWxCTCxTQUZrQixFQUVOOztBQUUxQixTQUVFLG9CQUFDLElBQUQsSUFBTSxRQUFRRyxNQUFkLEVBQXNCLE9BQU9DLEtBQTdCLEVBQW9DLE9BQU9DLEtBQTNDLEdBRkY7QUFLRCxDQVREOztBQVdBQyxPQUFPQyxPQUFQLEdBQWlCTixTQUFqQiIsImZpbGUiOiJzaG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi8uLi9yZWFjdCcpLFxuICAgICAgRWRnZSA9IHJlcXVpcmUoJy4uL2VkZ2UnKTtcblxuY29uc3QgeyB0aGlja25lc3MgfSA9IEVkZ2U7XG5cbmNvbnN0IFNob3J0RWRnZSA9IChwcm9wZXJ0aWVzKSA9PiB7XG4gIGNvbnN0IHsgb2Zmc2V0LCB3aWR0aCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgZGVwdGggPSB0aGlja25lc3M7ICAvLy9cblxuICByZXR1cm4gKFxuXG4gICAgPEVkZ2Ugb2Zmc2V0PXtvZmZzZXR9IHdpZHRoPXt3aWR0aH0gZGVwdGg9e2RlcHRofSAvPlxuXG4gICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNob3J0RWRnZTtcbiJdfQ==