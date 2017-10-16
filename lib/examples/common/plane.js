'use strict';

var vertexUtilities = require('../../utilities/vertex');

var calculateVertexIndexData = vertexUtilities.calculateVertexIndexData,
    calculateVertexNormalData = vertexUtilities.calculateVertexNormalData;


var initialVertexPositionData = [0.0, 0.0, 0.0, 1, 1.0, 0.0, 0.0, 1, 1.0, 1.0, 0.0, 1, 0.0, 1.0, 0.0, 1],
    vertexIndexData = calculateVertexIndexData(initialVertexPositionData),
    vertexNormalData = calculateVertexNormalData(initialVertexPositionData);

module.exports = {
  vertexIndexData: vertexIndexData,
  vertexNormalData: vertexNormalData,
  initialVertexPositionData: initialVertexPositionData
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlcy9jb21tb24vcGxhbmUuanMiXSwibmFtZXMiOlsidmVydGV4VXRpbGl0aWVzIiwicmVxdWlyZSIsImNhbGN1bGF0ZVZlcnRleEluZGV4RGF0YSIsImNhbGN1bGF0ZVZlcnRleE5vcm1hbERhdGEiLCJpbml0aWFsVmVydGV4UG9zaXRpb25EYXRhIiwidmVydGV4SW5kZXhEYXRhIiwidmVydGV4Tm9ybWFsRGF0YSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQU1BLGtCQUFrQkMsUUFBUSx3QkFBUixDQUF4Qjs7SUFFUUMsd0IsR0FBdURGLGUsQ0FBdkRFLHdCO0lBQTBCQyx5QixHQUE2QkgsZSxDQUE3QkcseUI7OztBQUVsQyxJQUFNQyw0QkFBNEIsQ0FFMUIsR0FGMEIsRUFFckIsR0FGcUIsRUFFaEIsR0FGZ0IsRUFFWCxDQUZXLEVBRzFCLEdBSDBCLEVBR3JCLEdBSHFCLEVBR2hCLEdBSGdCLEVBR1gsQ0FIVyxFQUkxQixHQUowQixFQUlyQixHQUpxQixFQUloQixHQUpnQixFQUlYLENBSlcsRUFLMUIsR0FMMEIsRUFLckIsR0FMcUIsRUFLaEIsR0FMZ0IsRUFLWCxDQUxXLENBQWxDO0FBQUEsSUFRTUMsa0JBQWtCSCx5QkFBeUJFLHlCQUF6QixDQVJ4QjtBQUFBLElBU01FLG1CQUFtQkgsMEJBQTBCQyx5QkFBMUIsQ0FUekI7O0FBV0FHLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkgsbUJBQWlCQSxlQURGO0FBRWZDLG9CQUFrQkEsZ0JBRkg7QUFHZkYsNkJBQTJCQTtBQUhaLENBQWpCIiwiZmlsZSI6InBsYW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB2ZXJ0ZXhVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi8uLi91dGlsaXRpZXMvdmVydGV4Jyk7XG5cbmNvbnN0IHsgY2FsY3VsYXRlVmVydGV4SW5kZXhEYXRhLCBjYWxjdWxhdGVWZXJ0ZXhOb3JtYWxEYXRhfSA9IHZlcnRleFV0aWxpdGllcztcblxuY29uc3QgaW5pdGlhbFZlcnRleFBvc2l0aW9uRGF0YSA9IFtcblxuICAgICAgICAwLjAsIDAuMCwgMC4wLCAxLFxuICAgICAgICAxLjAsIDAuMCwgMC4wLCAxLFxuICAgICAgICAxLjAsIDEuMCwgMC4wLCAxLFxuICAgICAgICAwLjAsIDEuMCwgMC4wLCAxLFxuICAgIFxuICAgICAgXSxcbiAgICAgIHZlcnRleEluZGV4RGF0YSA9IGNhbGN1bGF0ZVZlcnRleEluZGV4RGF0YShpbml0aWFsVmVydGV4UG9zaXRpb25EYXRhKSxcbiAgICAgIHZlcnRleE5vcm1hbERhdGEgPSBjYWxjdWxhdGVWZXJ0ZXhOb3JtYWxEYXRhKGluaXRpYWxWZXJ0ZXhQb3NpdGlvbkRhdGEpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdmVydGV4SW5kZXhEYXRhOiB2ZXJ0ZXhJbmRleERhdGEsXG4gIHZlcnRleE5vcm1hbERhdGE6IHZlcnRleE5vcm1hbERhdGEsXG4gIGluaXRpYWxWZXJ0ZXhQb3NpdGlvbkRhdGE6IGluaXRpYWxWZXJ0ZXhQb3NpdGlvbkRhdGFcbn07XG4iXX0=