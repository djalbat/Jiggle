"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElementBuffer = createElementBuffer;
exports.bindElementBuffer = bindElementBuffer;
exports.createBuffer = createBuffer;
exports.bindBuffer = bindBuffer;

function createElementBuffer(data) {
  var _this$context = this.context,
      ELEMENT_ARRAY_BUFFER = _this$context.ELEMENT_ARRAY_BUFFER,
      STATIC_DRAW = _this$context.STATIC_DRAW,
      target = ELEMENT_ARRAY_BUFFER,
      usage = STATIC_DRAW,
      uint16Array = new Uint16Array(data),
      elementBuffer = this.context.createBuffer();
  this.context.bindBuffer(target, elementBuffer);
  this.context.bufferData(target, uint16Array, usage);
  return elementBuffer;
}

function bindElementBuffer(elementBuffer) {
  var ELEMENT_ARRAY_BUFFER = this.context.ELEMENT_ARRAY_BUFFER,
      target = ELEMENT_ARRAY_BUFFER;
  this.context.bindBuffer(target, elementBuffer);
}

function createBuffer(data) {
  var _this$context2 = this.context,
      ARRAY_BUFFER = _this$context2.ARRAY_BUFFER,
      STATIC_DRAW = _this$context2.STATIC_DRAW,
      target = ARRAY_BUFFER,
      usage = STATIC_DRAW,
      buffer = this.context.createBuffer(),
      float32Array = new Float32Array(data);
  this.context.bindBuffer(target, buffer);
  this.context.bufferData(target, float32Array, usage);
  return buffer;
}

function bindBuffer(buffer, attributeLocation, components) {
  var _this$context3 = this.context,
      ARRAY_BUFFER = _this$context3.ARRAY_BUFFER,
      FLOAT = _this$context3.FLOAT,
      target = ARRAY_BUFFER,
      type = FLOAT,
      normalize = false,
      stride = 0,
      offset = 0;
  this.context.bindBuffer(target, buffer);
  this.context.vertexAttribPointer(attributeLocation, components, type, normalize, stride, offset);
  this.context.enableVertexAttribArray(attributeLocation);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1ZmZlci5qcyJdLCJuYW1lcyI6WyJjcmVhdGVFbGVtZW50QnVmZmVyIiwiZGF0YSIsImNvbnRleHQiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsIlNUQVRJQ19EUkFXIiwidGFyZ2V0IiwidXNhZ2UiLCJ1aW50MTZBcnJheSIsIlVpbnQxNkFycmF5IiwiZWxlbWVudEJ1ZmZlciIsImNyZWF0ZUJ1ZmZlciIsImJpbmRCdWZmZXIiLCJidWZmZXJEYXRhIiwiYmluZEVsZW1lbnRCdWZmZXIiLCJBUlJBWV9CVUZGRVIiLCJidWZmZXIiLCJmbG9hdDMyQXJyYXkiLCJGbG9hdDMyQXJyYXkiLCJhdHRyaWJ1dGVMb2NhdGlvbiIsImNvbXBvbmVudHMiLCJGTE9BVCIsInR5cGUiLCJub3JtYWxpemUiLCJzdHJpZGUiLCJvZmZzZXQiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRU8sU0FBU0EsbUJBQVQsQ0FBNkJDLElBQTdCLEVBQW1DO0FBQUEsc0JBQ00sS0FBS0MsT0FEWDtBQUFBLE1BQ2hDQyxvQkFEZ0MsaUJBQ2hDQSxvQkFEZ0M7QUFBQSxNQUNWQyxXQURVLGlCQUNWQSxXQURVO0FBQUEsTUFFbENDLE1BRmtDLEdBRXpCRixvQkFGeUI7QUFBQSxNQUdsQ0csS0FIa0MsR0FHMUJGLFdBSDBCO0FBQUEsTUFJbENHLFdBSmtDLEdBSXBCLElBQUlDLFdBQUosQ0FBZ0JQLElBQWhCLENBSm9CO0FBQUEsTUFLbENRLGFBTGtDLEdBS2xCLEtBQUtQLE9BQUwsQ0FBYVEsWUFBYixFQUxrQjtBQU94QyxPQUFLUixPQUFMLENBQWFTLFVBQWIsQ0FBd0JOLE1BQXhCLEVBQWdDSSxhQUFoQztBQUVBLE9BQUtQLE9BQUwsQ0FBYVUsVUFBYixDQUF3QlAsTUFBeEIsRUFBZ0NFLFdBQWhDLEVBQTZDRCxLQUE3QztBQUVBLFNBQU9HLGFBQVA7QUFDRDs7QUFFTSxTQUFTSSxpQkFBVCxDQUEyQkosYUFBM0IsRUFBMEM7QUFDekMsTUFBRU4sb0JBQUYsR0FBMkIsS0FBS0QsT0FBaEMsQ0FBRUMsb0JBQUY7QUFBQSxNQUNBRSxNQURBLEdBQ1NGLG9CQURUO0FBR04sT0FBS0QsT0FBTCxDQUFhUyxVQUFiLENBQXdCTixNQUF4QixFQUFnQ0ksYUFBaEM7QUFDRDs7QUFFTSxTQUFTQyxZQUFULENBQXNCVCxJQUF0QixFQUE0QjtBQUFBLHVCQUNLLEtBQUtDLE9BRFY7QUFBQSxNQUN6QlksWUFEeUIsa0JBQ3pCQSxZQUR5QjtBQUFBLE1BQ1hWLFdBRFcsa0JBQ1hBLFdBRFc7QUFBQSxNQUUzQkMsTUFGMkIsR0FFbEJTLFlBRmtCO0FBQUEsTUFHM0JSLEtBSDJCLEdBR25CRixXQUhtQjtBQUFBLE1BSTNCVyxNQUoyQixHQUlsQixLQUFLYixPQUFMLENBQWFRLFlBQWIsRUFKa0I7QUFBQSxNQUszQk0sWUFMMkIsR0FLWixJQUFJQyxZQUFKLENBQWlCaEIsSUFBakIsQ0FMWTtBQU9qQyxPQUFLQyxPQUFMLENBQWFTLFVBQWIsQ0FBd0JOLE1BQXhCLEVBQWdDVSxNQUFoQztBQUVBLE9BQUtiLE9BQUwsQ0FBYVUsVUFBYixDQUF3QlAsTUFBeEIsRUFBZ0NXLFlBQWhDLEVBQThDVixLQUE5QztBQUVBLFNBQU9TLE1BQVA7QUFDRDs7QUFFTSxTQUFTSixVQUFULENBQW9CSSxNQUFwQixFQUE0QkcsaUJBQTVCLEVBQStDQyxVQUEvQyxFQUEyRDtBQUFBLHVCQUNoQyxLQUFLakIsT0FEMkI7QUFBQSxNQUN4RFksWUFEd0Qsa0JBQ3hEQSxZQUR3RDtBQUFBLE1BQzFDTSxLQUQwQyxrQkFDMUNBLEtBRDBDO0FBQUEsTUFFMURmLE1BRjBELEdBRWpEUyxZQUZpRDtBQUFBLE1BRzFETyxJQUgwRCxHQUduREQsS0FIbUQ7QUFBQSxNQUkxREUsU0FKMEQsR0FJOUMsS0FKOEM7QUFBQSxNQUsxREMsTUFMMEQsR0FLakQsQ0FMaUQ7QUFBQSxNQU0xREMsTUFOMEQsR0FNakQsQ0FOaUQ7QUFRaEUsT0FBS3RCLE9BQUwsQ0FBYVMsVUFBYixDQUF3Qk4sTUFBeEIsRUFBZ0NVLE1BQWhDO0FBRUEsT0FBS2IsT0FBTCxDQUFhdUIsbUJBQWIsQ0FBaUNQLGlCQUFqQyxFQUFvREMsVUFBcEQsRUFBZ0VFLElBQWhFLEVBQXNFQyxTQUF0RSxFQUFpRkMsTUFBakYsRUFBeUZDLE1BQXpGO0FBRUEsT0FBS3RCLE9BQUwsQ0FBYXdCLHVCQUFiLENBQXFDUixpQkFBckM7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudEJ1ZmZlcihkYXRhKSB7XG4gIGNvbnN0IHsgRUxFTUVOVF9BUlJBWV9CVUZGRVIsIFNUQVRJQ19EUkFXIH0gPSB0aGlzLmNvbnRleHQsXG4gICAgICAgIHRhcmdldCA9IEVMRU1FTlRfQVJSQVlfQlVGRkVSLFxuICAgICAgICB1c2FnZSA9IFNUQVRJQ19EUkFXLFxuICAgICAgICB1aW50MTZBcnJheSA9IG5ldyBVaW50MTZBcnJheShkYXRhKSxcbiAgICAgICAgZWxlbWVudEJ1ZmZlciA9IHRoaXMuY29udGV4dC5jcmVhdGVCdWZmZXIoKTtcblxuICB0aGlzLmNvbnRleHQuYmluZEJ1ZmZlcih0YXJnZXQsIGVsZW1lbnRCdWZmZXIpO1xuXG4gIHRoaXMuY29udGV4dC5idWZmZXJEYXRhKHRhcmdldCwgdWludDE2QXJyYXksIHVzYWdlKTtcblxuICByZXR1cm4gZWxlbWVudEJ1ZmZlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRFbGVtZW50QnVmZmVyKGVsZW1lbnRCdWZmZXIpIHtcbiAgY29uc3QgeyBFTEVNRU5UX0FSUkFZX0JVRkZFUiB9ID0gdGhpcy5jb250ZXh0LFxuICAgICAgICB0YXJnZXQgPSBFTEVNRU5UX0FSUkFZX0JVRkZFUjtcblxuICB0aGlzLmNvbnRleHQuYmluZEJ1ZmZlcih0YXJnZXQsIGVsZW1lbnRCdWZmZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnVmZmVyKGRhdGEpIHtcbiAgY29uc3QgeyBBUlJBWV9CVUZGRVIsIFNUQVRJQ19EUkFXIH0gPSB0aGlzLmNvbnRleHQsXG4gICAgICAgIHRhcmdldCA9IEFSUkFZX0JVRkZFUixcbiAgICAgICAgdXNhZ2UgPSBTVEFUSUNfRFJBVyxcbiAgICAgICAgYnVmZmVyID0gdGhpcy5jb250ZXh0LmNyZWF0ZUJ1ZmZlcigpLFxuICAgICAgICBmbG9hdDMyQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KGRhdGEpO1xuXG4gIHRoaXMuY29udGV4dC5iaW5kQnVmZmVyKHRhcmdldCwgYnVmZmVyKTtcblxuICB0aGlzLmNvbnRleHQuYnVmZmVyRGF0YSh0YXJnZXQsIGZsb2F0MzJBcnJheSwgdXNhZ2UpO1xuXG4gIHJldHVybiBidWZmZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kQnVmZmVyKGJ1ZmZlciwgYXR0cmlidXRlTG9jYXRpb24sIGNvbXBvbmVudHMpIHtcbiAgY29uc3QgeyBBUlJBWV9CVUZGRVIsIEZMT0FUIH0gPSB0aGlzLmNvbnRleHQsXG4gICAgICAgIHRhcmdldCA9IEFSUkFZX0JVRkZFUixcbiAgICAgICAgdHlwZSA9IEZMT0FULFxuICAgICAgICBub3JtYWxpemUgPSBmYWxzZSxcbiAgICAgICAgc3RyaWRlID0gMCxcbiAgICAgICAgb2Zmc2V0ID0gMDtcblxuICB0aGlzLmNvbnRleHQuYmluZEJ1ZmZlcih0YXJnZXQsIGJ1ZmZlcik7XG5cbiAgdGhpcy5jb250ZXh0LnZlcnRleEF0dHJpYlBvaW50ZXIoYXR0cmlidXRlTG9jYXRpb24sIGNvbXBvbmVudHMsIHR5cGUsIG5vcm1hbGl6ZSwgc3RyaWRlLCBvZmZzZXQpO1xuXG4gIHRoaXMuY29udGV4dC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRyaWJ1dGVMb2NhdGlvbik7XG59XG4iXX0=