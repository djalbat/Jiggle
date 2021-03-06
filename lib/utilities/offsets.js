"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relativeOffsetsFromAnglesAndDirections = relativeOffsetsFromAnglesAndDirections;

var _vector = require("../maths/vector");

var _matrix = require("../utilities/matrix");

function relativeOffsetsFromAnglesAndDirections(angles, directions) {
  var reverseOrder = true,
      reflectedAngles = (0, _vector.reflect3)(angles),
      rotationsMatrix = (0, _matrix.rotationsMatrixFromAngles)(reflectedAngles, reverseOrder),
      relativeOffsets = (0, _vector.transform4)(directions, rotationsMatrix).slice(0, 3); ///

  return relativeOffsets;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9mZnNldHMuanMiXSwibmFtZXMiOlsicmVsYXRpdmVPZmZzZXRzRnJvbUFuZ2xlc0FuZERpcmVjdGlvbnMiLCJhbmdsZXMiLCJkaXJlY3Rpb25zIiwicmV2ZXJzZU9yZGVyIiwicmVmbGVjdGVkQW5nbGVzIiwicm90YXRpb25zTWF0cml4IiwicmVsYXRpdmVPZmZzZXRzIiwic2xpY2UiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBRU8sU0FBU0Esc0NBQVQsQ0FBZ0RDLE1BQWhELEVBQXdEQyxVQUF4RCxFQUFvRTtBQUN6RSxNQUFNQyxZQUFZLEdBQUcsSUFBckI7QUFBQSxNQUNNQyxlQUFlLEdBQUcsc0JBQVNILE1BQVQsQ0FEeEI7QUFBQSxNQUVNSSxlQUFlLEdBQUcsdUNBQTBCRCxlQUExQixFQUEyQ0QsWUFBM0MsQ0FGeEI7QUFBQSxNQUdNRyxlQUFlLEdBQUcsd0JBQVdKLFVBQVgsRUFBdUJHLGVBQXZCLEVBQXdDRSxLQUF4QyxDQUE4QyxDQUE5QyxFQUFpRCxDQUFqRCxDQUh4QixDQUR5RSxDQUlJOztBQUU3RSxTQUFPRCxlQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgcmVmbGVjdDMsIHRyYW5zZm9ybTQgfSBmcm9tIFwiLi4vbWF0aHMvdmVjdG9yXCI7XG5pbXBvcnQgeyByb3RhdGlvbnNNYXRyaXhGcm9tQW5nbGVzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9tYXRyaXhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbGF0aXZlT2Zmc2V0c0Zyb21BbmdsZXNBbmREaXJlY3Rpb25zKGFuZ2xlcywgZGlyZWN0aW9ucykge1xuICBjb25zdCByZXZlcnNlT3JkZXIgPSB0cnVlLFxuICAgICAgICByZWZsZWN0ZWRBbmdsZXMgPSByZWZsZWN0MyhhbmdsZXMpLFxuICAgICAgICByb3RhdGlvbnNNYXRyaXggPSByb3RhdGlvbnNNYXRyaXhGcm9tQW5nbGVzKHJlZmxlY3RlZEFuZ2xlcywgcmV2ZXJzZU9yZGVyKSxcbiAgICAgICAgcmVsYXRpdmVPZmZzZXRzID0gdHJhbnNmb3JtNChkaXJlY3Rpb25zLCByb3RhdGlvbnNNYXRyaXgpLnNsaWNlKDAsIDMpOyAvLy9cblxuICByZXR1cm4gcmVsYXRpdmVPZmZzZXRzO1xufVxuIl19