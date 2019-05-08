'use strict';

function enableBlending() {
  var _context = this.context,
      BLEND = _context.BLEND,
      SRC_ALPHA = _context.SRC_ALPHA,
      ONE = _context.ONE,
      capacity = BLEND,
      sourceFactor = SRC_ALPHA,
      destinationFactor = ONE;


  this.context.enable(capacity);

  this.context.blendFunc(sourceFactor, destinationFactor);
}

module.exports = {
  enableBlending: enableBlending
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9taXhpbi9ibGVuZGluZy5qcyJdLCJuYW1lcyI6WyJlbmFibGVCbGVuZGluZyIsImNvbnRleHQiLCJCTEVORCIsIlNSQ19BTFBIQSIsIk9ORSIsImNhcGFjaXR5Iiwic291cmNlRmFjdG9yIiwiZGVzdGluYXRpb25GYWN0b3IiLCJlbmFibGUiLCJibGVuZEZ1bmMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxTQUFTQSxjQUFULEdBQTBCO0FBQUEsaUJBQ1UsS0FBS0MsT0FEZjtBQUFBLE1BQ2hCQyxLQURnQixZQUNoQkEsS0FEZ0I7QUFBQSxNQUNUQyxTQURTLFlBQ1RBLFNBRFM7QUFBQSxNQUNFQyxHQURGLFlBQ0VBLEdBREY7QUFBQSxNQUVsQkMsUUFGa0IsR0FFUEgsS0FGTztBQUFBLE1BR2xCSSxZQUhrQixHQUdISCxTQUhHO0FBQUEsTUFJbEJJLGlCQUprQixHQUlFSCxHQUpGOzs7QUFNeEIsT0FBS0gsT0FBTCxDQUFhTyxNQUFiLENBQW9CSCxRQUFwQjs7QUFFQSxPQUFLSixPQUFMLENBQWFRLFNBQWIsQ0FBdUJILFlBQXZCLEVBQXFDQyxpQkFBckM7QUFDRDs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQjtBQUNmWDtBQURlLENBQWpCIiwiZmlsZSI6ImJsZW5kaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBlbmFibGVCbGVuZGluZygpIHtcbiAgY29uc3QgeyBCTEVORCwgU1JDX0FMUEhBLCBPTkUgfSA9IHRoaXMuY29udGV4dCxcbiAgICAgICAgY2FwYWNpdHkgPSBCTEVORCxcbiAgICAgICAgc291cmNlRmFjdG9yID0gU1JDX0FMUEhBLFxuICAgICAgICBkZXN0aW5hdGlvbkZhY3RvciA9IE9ORTtcblxuICB0aGlzLmNvbnRleHQuZW5hYmxlKGNhcGFjaXR5KTtcblxuICB0aGlzLmNvbnRleHQuYmxlbmRGdW5jKHNvdXJjZUZhY3RvciwgZGVzdGluYXRpb25GYWN0b3IpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW5hYmxlQmxlbmRpbmdcbn07XG4iXX0=