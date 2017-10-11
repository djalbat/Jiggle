'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vertexPositionAttributeName = 'aVertexPosition',
    vertexNormalAttributeName = 'aVertexNormal';

var AttributeLocations = function () {
  function AttributeLocations(vertexPositionAttributeLocation, vertexNormalAttributeLocation) {
    _classCallCheck(this, AttributeLocations);

    this.vertexPositionAttributeLocation = vertexPositionAttributeLocation;
    this.vertexNormalAttributeLocation = vertexNormalAttributeLocation;
  }

  _createClass(AttributeLocations, null, [{
    key: 'fromProgram',
    value: function fromProgram(program, canvas) {
      var vertexPositionAttributeLocation = canvas.getAttributeLocation(program, vertexPositionAttributeName),
          vertexNormalAttributeLocation = canvas.getAttributeLocation(program, vertexNormalAttributeName),
          attributeLocations = new AttributeLocations(vertexPositionAttributeLocation, vertexNormalAttributeLocation);

      return attributeLocations;
    }
  }]);

  return AttributeLocations;
}();

module.exports = AttributeLocations;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9zaGFkZXIvbG9jYXRpb25zLmpzIl0sIm5hbWVzIjpbInZlcnRleFBvc2l0aW9uQXR0cmlidXRlTmFtZSIsInZlcnRleE5vcm1hbEF0dHJpYnV0ZU5hbWUiLCJBdHRyaWJ1dGVMb2NhdGlvbnMiLCJ2ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uIiwidmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb24iLCJwcm9ncmFtIiwiY2FudmFzIiwiZ2V0QXR0cmlidXRlTG9jYXRpb24iLCJhdHRyaWJ1dGVMb2NhdGlvbnMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsOEJBQThCLGlCQUFwQztBQUFBLElBQ01DLDRCQUE0QixlQURsQzs7SUFHTUMsa0I7QUFDSiw4QkFBWUMsK0JBQVosRUFBNkNDLDZCQUE3QyxFQUE0RTtBQUFBOztBQUMxRSxTQUFLRCwrQkFBTCxHQUF1Q0EsK0JBQXZDO0FBQ0EsU0FBS0MsNkJBQUwsR0FBcUNBLDZCQUFyQztBQUNEOzs7O2dDQUVrQkMsTyxFQUFTQyxNLEVBQVE7QUFDbEMsVUFBTUgsa0NBQWtDRyxPQUFPQyxvQkFBUCxDQUE0QkYsT0FBNUIsRUFBcUNMLDJCQUFyQyxDQUF4QztBQUFBLFVBQ01JLGdDQUFnQ0UsT0FBT0Msb0JBQVAsQ0FBNEJGLE9BQTVCLEVBQXFDSix5QkFBckMsQ0FEdEM7QUFBQSxVQUVNTyxxQkFBcUIsSUFBSU4sa0JBQUosQ0FBdUJDLCtCQUF2QixFQUF3REMsNkJBQXhELENBRjNCOztBQUlBLGFBQU9JLGtCQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCUixrQkFBakIiLCJmaWxlIjoibG9jYXRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB2ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZU5hbWUgPSAnYVZlcnRleFBvc2l0aW9uJyxcbiAgICAgIHZlcnRleE5vcm1hbEF0dHJpYnV0ZU5hbWUgPSAnYVZlcnRleE5vcm1hbCc7XG5cbmNsYXNzIEF0dHJpYnV0ZUxvY2F0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKHZlcnRleFBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIHZlcnRleE5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uKSB7XG4gICAgdGhpcy52ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gdmVydGV4UG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbjtcbiAgICB0aGlzLnZlcnRleE5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uID0gdmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb247XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvZ3JhbShwcm9ncmFtLCBjYW52YXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gY2FudmFzLmdldEF0dHJpYnV0ZUxvY2F0aW9uKHByb2dyYW0sIHZlcnRleFBvc2l0aW9uQXR0cmlidXRlTmFtZSksXG4gICAgICAgICAgdmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb24gPSBjYW52YXMuZ2V0QXR0cmlidXRlTG9jYXRpb24ocHJvZ3JhbSwgdmVydGV4Tm9ybWFsQXR0cmlidXRlTmFtZSksXG4gICAgICAgICAgYXR0cmlidXRlTG9jYXRpb25zID0gbmV3IEF0dHJpYnV0ZUxvY2F0aW9ucyh2ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uLCB2ZXJ0ZXhOb3JtYWxBdHRyaWJ1dGVMb2NhdGlvbik7XG4gICAgXG4gICAgcmV0dXJuIGF0dHJpYnV0ZUxvY2F0aW9uczsgICAgXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBdHRyaWJ1dGVMb2NhdGlvbnM7XG4iXX0=