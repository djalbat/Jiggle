(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

require('./lib/xgl');

module.exports = {
  Canvas: require('./lib/canvas'),
  Mask: require('./lib/element/mask'),
  Part: require('./lib/element/part'),
  Scene: require('./lib/element/scene'),
  Camera: require('./lib/element/camera'),
  CanvasElement: require('./lib/element/canvas'),
  ColouredCanvasElement: require('./lib/element/canvas/coloured'),
  TexturedCanvasElement: require('./lib/element/canvas/textured')
};

},{"./lib/canvas":2,"./lib/element/camera":5,"./lib/element/canvas":6,"./lib/element/canvas/coloured":7,"./lib/element/canvas/textured":9,"./lib/element/mask":10,"./lib/element/part":11,"./lib/element/scene":12,"./lib/xgl":84}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var depthMixin = require('./mixin/depth'),
    colourMixin = require('./mixin/colour'),
    shaderMixin = require('./mixin/shader'),
    bufferMixin = require('./mixin/buffer'),
    matrixMixin = require('./mixin/matrix'),
    programMixin = require('./mixin/program'),
    textureMixin = require('./mixin/texture'),
    blendingMixin = require('./mixin/blending');

var defaultOffset = 0;

var Canvas = function () {
  function Canvas() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'canvas';

    _classCallCheck(this, Canvas);

    var domElement = domElementFromSelector(selector),
        context = domElement.getContext('webgl');

    if (!context) {
      throw new Error('Unable to initialise the context.');
    }

    this.context = context;

    this.domElement = domElement;

    this.enableDepthTesting(); ///
  }

  _createClass(Canvas, [{
    key: 'getContext',
    value: function getContext() {
      return this.context;
    }
  }, {
    key: 'getDOMElement',
    value: function getDOMElement() {
      return this.domElement;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.domElement.width;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.domElement.height;
    }
  }, {
    key: 'getClientWidth',
    value: function getClientWidth() {
      return this.domElement.clientWidth;
    }
  }, {
    key: 'getClientHeight',
    value: function getClientHeight() {
      return this.domElement.clientHeight;
    }
  }, {
    key: 'getUniformLocation',
    value: function getUniformLocation(program, name) {
      return this.context.getUniformLocation(program, name);
    }
  }, {
    key: 'getAttributeLocation',
    value: function getAttributeLocation(program, name) {
      return this.context.getAttribLocation(program, name);
    }
  }, {
    key: 'setWidth',
    value: function setWidth(width) {
      this.domElement.setAttribute('width', width);
    }
  }, {
    key: 'setHeight',
    value: function setHeight(height) {
      this.domElement.setAttribute('height', height);
    }
  }, {
    key: 'setViewport',
    value: function setViewport(x, y, width, height) {
      this.context.viewport(x, y, width, height);
    }
  }, {
    key: 'setUniformLocationIntegerValue',
    value: function setUniformLocationIntegerValue(uniformLocation, integerValue) {
      this.context.uniform1i(uniformLocation, integerValue);
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.clearDepth();
      this.clearColour();
      this.clearDepthBuffer();
      this.clearColourBuffer();
    }
  }, {
    key: 'resize',
    value: function resize(width, height) {
      this.setWidth(width);
      this.setHeight(height);
      this.setViewport(0, 0, width, height);
    }
  }, {
    key: 'render',
    value: function render(shader, offsetMatrix, rotationMatrix, positionMatrix, projectionMatrix, normalMatrix) {
      var offsetMatrixUniformLocation = shader.getOffsetMatrixUniformLocation(),
          rotationMatrixUniformLocation = shader.getRotationMatrixUniformLocation(),
          positionMatrixUniformLocation = shader.getPositionMatrixUniformLocation(),
          projectionMatrixUniformLocation = shader.getProjectionMatrixUniformLocation(),
          normalMatrixUniformLocation = shader.getNormalMatrixUniformLocation();

      this.applyMatrix(offsetMatrixUniformLocation, offsetMatrix);
      this.applyMatrix(rotationMatrixUniformLocation, rotationMatrix);
      this.applyMatrix(positionMatrixUniformLocation, positionMatrix);
      this.applyMatrix(projectionMatrixUniformLocation, projectionMatrix);
      this.applyMatrix(normalMatrixUniformLocation, normalMatrix);

      var count = shader.getCount();

      this.drawElements(count);
    }
  }, {
    key: 'drawElements',
    value: function drawElements(count) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOffset;
      var _context = this.context,
          TRIANGLES = _context.TRIANGLES,
          UNSIGNED_SHORT = _context.UNSIGNED_SHORT,
          mode = TRIANGLES,
          type = UNSIGNED_SHORT;


      this.context.drawElements(mode, count, type, offset);
    }
  }]);

  return Canvas;
}();

Object.assign(Canvas.prototype, depthMixin);
Object.assign(Canvas.prototype, colourMixin);
Object.assign(Canvas.prototype, shaderMixin);
Object.assign(Canvas.prototype, bufferMixin);
Object.assign(Canvas.prototype, matrixMixin);
Object.assign(Canvas.prototype, programMixin);
Object.assign(Canvas.prototype, textureMixin);
Object.assign(Canvas.prototype, blendingMixin);

module.exports = Canvas;

function domElementFromSelector(selector) {
  var domElement = typeof selector === 'string' ? document.querySelectorAll(selector)[0] : ///
  selector; ///

  return domElement;
}

},{"./mixin/blending":33,"./mixin/buffer":34,"./mixin/colour":35,"./mixin/depth":36,"./mixin/matrix":37,"./mixin/program":38,"./mixin/shader":39,"./mixin/texture":40}],3:[function(require,module,exports){
'use strict';

var Z_FAR = 1000,
    Z_NEAR = 1,
    MOUSE_UP = 'MOUSE_UP',
    MOUSE_DOWN = 'MOUSE_DOWN',
    MOUSE_MOVE = 'MOUSE_MOVE',
    MOUSE_WHEEL = 'MOUSE_WHEEL',
    CTRL_KEY_CODE = 17,
    SHIFT_KEY_CODE = 16,
    VERTICES_LENGTH = 3,
    MINIMUM_DISTANCE = 1,
    DEGREES_TO_RADIANS = Math.PI / 180,
    FIELD_OF_VIEW = 45 * DEGREES_TO_RADIANS,
    ANGLES_SCALAR = 0.01,
    OFFSET_SCALAR = 0.25,
    INITIAL_ANGLES = [0, 0],
    DISTANCE_SCALAR = 1.25,
    DEFAULT_MARGIN_OF_ERROR = 0.0000001,
    INITIAL_MOUSE_COORDINATES = [0, 0];

module.exports = {
  Z_FAR: Z_FAR,
  Z_NEAR: Z_NEAR,
  MOUSE_UP: MOUSE_UP,
  MOUSE_DOWN: MOUSE_DOWN,
  MOUSE_MOVE: MOUSE_MOVE,
  MOUSE_WHEEL: MOUSE_WHEEL,
  CTRL_KEY_CODE: CTRL_KEY_CODE,
  SHIFT_KEY_CODE: SHIFT_KEY_CODE,
  VERTICES_LENGTH: VERTICES_LENGTH,
  MINIMUM_DISTANCE: MINIMUM_DISTANCE,
  DEGREES_TO_RADIANS: DEGREES_TO_RADIANS,
  FIELD_OF_VIEW: FIELD_OF_VIEW,
  ANGLES_SCALAR: ANGLES_SCALAR,
  OFFSET_SCALAR: OFFSET_SCALAR,
  INITIAL_ANGLES: INITIAL_ANGLES,
  DISTANCE_SCALAR: DISTANCE_SCALAR,
  DEFAULT_MARGIN_OF_ERROR: DEFAULT_MARGIN_OF_ERROR,
  INITIAL_MOUSE_COORDINATES: INITIAL_MOUSE_COORDINATES
};

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Element = function () {
  function Element() {
    _classCallCheck(this, Element);
  }

  _createClass(Element, [{
    key: 'getChildElements',
    value: function getChildElements() {
      return this.childElements;
    }
  }, {
    key: 'setChildElements',
    value: function setChildElements(childElements) {
      this.childElements = childElements;
    }
  }, {
    key: 'assignContext',
    value: function assignContext(names, thenDelete) {
      var _this = this;

      var argumentsLength = arguments.length;

      if (argumentsLength === 1) {
        var firstArgument = first(arguments);

        if (typeof firstArgument === 'boolean') {
          names = Object.keys(this.context);

          thenDelete = firstArgument;
        } else {
          thenDelete = true;
        }
      }

      if (argumentsLength === 0) {
        names = Object.keys(this.context);

        thenDelete = true;
      }

      names.forEach(function (name) {
        var value = _this.context[name],
            propertyName = name,
            ///
        descriptor = {
          value: value
        };

        Object.defineProperty(_this, propertyName, descriptor);

        if (thenDelete) {
          delete _this.context[name];
        }
      });
    }
  }, {
    key: 'updateContext',
    value: function updateContext(childElement) {
      var context = typeof childElement.parentContext === 'function' ? childElement.parentContext() : childElement.context;

      this.context = Object.assign({}, this.context, context);

      delete childElement.context;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        remainingArguments[_key - 2] = arguments[_key];
      }

      var element = new (Function.prototype.bind.apply(Class, [null].concat(remainingArguments)))();

      applyProperties(element, properties);

      return element;
    }
  }]);

  return Element;
}();

module.exports = Element;

function applyProperties(element, properties) {
  var childElements = typeof element.childElements === 'function' ? element.childElements(properties) : properties.childElements || [];

  element.setChildElements(childElements);

  childElements.forEach(function (childElement) {
    return element.updateContext(childElement);
  });
}

},{}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element'),
    Pan = require('../miscellaneous/pan'),
    Tilt = require('../miscellaneous/tilt'),
    Zoom = require('../miscellaneous/zoom'),
    KeyEvents = require('../miscellaneous/keyEvents'),
    MouseEvents = require('../miscellaneous/mouseEvents'),
    cameraUtilities = require('../utilities/camera');

var calculateOffsetMatrix = cameraUtilities.calculateOffsetMatrix,
    calculateRotationMatrix = cameraUtilities.calculateRotationMatrix,
    calculatePositionMatrix = cameraUtilities.calculatePositionMatrix,
    calculateProjectionMatrix = cameraUtilities.calculateProjectionMatrix,
    calculateNormalMatrix = cameraUtilities.calculateNormalMatrix;


var defaultInitialDistance = 5,
    defaultInitialOffset = [0, 0, 0];

var Camera = function (_Element) {
  _inherits(Camera, _Element);

  function Camera(pan, tilt, zoom, keyEvents, mouseEvents, updateHandler) {
    _classCallCheck(this, Camera);

    var _this = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this));

    _this.pan = pan;
    _this.tilt = tilt;
    _this.zoom = zoom;
    _this.keyEvents = keyEvents;
    _this.mouseEvents = mouseEvents;
    _this.updateHandler = updateHandler;
    return _this;
  }

  _createClass(Camera, [{
    key: 'shiftKeyHandler',
    value: function shiftKeyHandler(shiftKeyDown) {
      this.pan.shiftKeyHandler(shiftKeyDown);

      this.tilt.shiftKeyHandler(shiftKeyDown);
    }
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler(mouseCoordinates, mouseDown, canvas) {
      this.tilt.mouseUpHandler();

      this.pan.mouseUpHandler();
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler(mouseCoordinates, mouseDown, canvas) {
      this.tilt.mouseDownHandler();

      this.pan.mouseDownHandler();
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler(mouseCoordinates, mouseDown, canvas) {
      var shiftKeyDown = this.keyEvents.isShiftKeyDown();

      this.tilt.mouseMoveHandler(mouseCoordinates, mouseDown, shiftKeyDown);

      this.pan.mouseMoveHandler(mouseCoordinates, mouseDown, shiftKeyDown, this.tilt);

      if (mouseDown) {
        this.update(canvas);
      }
    }
  }, {
    key: 'mouseWheelHandler',
    value: function mouseWheelHandler(delta, canvas) {
      this.zoom.mouseWheelEventHandler(delta);

      this.update(canvas);
    }
  }, {
    key: 'forceUpdate',
    value: function forceUpdate(canvas) {
      this.update(canvas);
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(updateHandler) {
      this.updateHandler = updateHandler;
    }
  }, {
    key: 'update',
    value: function update(canvas) {
      var width = canvas.getWidth(),
          height = canvas.getHeight(),
          offset = this.pan.getOffset(),
          angles = this.tilt.getAngles(),
          distance = this.zoom.getDistance(),
          offsetMatrix = calculateOffsetMatrix(offset),
          rotationMatrix = calculateRotationMatrix(angles),
          positionMatrix = calculatePositionMatrix(distance),
          projectionMatrix = calculateProjectionMatrix(width, height),
          normalMatrix = calculateNormalMatrix(rotationMatrix);

      this.updateHandler(offsetMatrix, rotationMatrix, positionMatrix, projectionMatrix, normalMatrix);
    }
  }, {
    key: 'render',
    value: function render(canvas, offsetMatrix, rotationMatrix, positionMatrix, projectionMatrix, normalMatrix) {
      ///
    }
  }, {
    key: 'parentContext',
    value: function parentContext() {
      var onUpdate = this.onUpdate.bind(this),
          forceUpdate = this.forceUpdate.bind(this);

      return {
        onUpdate: onUpdate,
        forceUpdate: forceUpdate
      };
    }
  }, {
    key: 'initialise',
    value: function initialise(canvas) {
      var keyEvents = KeyEvents.fromNothing(canvas),
          mouseEvents = MouseEvents.fromNothing(canvas),
          shiftKeyHandler = this.shiftKeyHandler.bind(this),
          mouseUpHandler = this.mouseUpHandler.bind(this),
          mouseDownHandler = this.mouseDownHandler.bind(this),
          mouseMoveHandler = this.mouseMoveHandler.bind(this),
          mouseWheelHandler = this.mouseWheelHandler.bind(this);

      keyEvents.addShiftKeyHandler(shiftKeyHandler);

      mouseEvents.addMouseUpHandler(mouseUpHandler);
      mouseEvents.addMouseDownHandler(mouseDownHandler);
      mouseEvents.addMouseMoveHandler(mouseMoveHandler);
      mouseEvents.addMouseWheelHandler(mouseWheelHandler);

      this.keyEvents = keyEvents;

      this.mouseEvents = mouseEvents;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var _properties$initialOf = properties.initialOffset,
          initialOffset = _properties$initialOf === undefined ? defaultInitialOffset : _properties$initialOf,
          _properties$initialDi = properties.initialDistance,
          initialDistance = _properties$initialDi === undefined ? defaultInitialDistance : _properties$initialDi,
          pan = Pan.fromInitialOffset(initialOffset),
          tilt = Tilt.fromNothing(),
          zoom = Zoom.fromInitialDistance(initialDistance),
          keyEvents = null,
          mouseEvents = null,
          updateHandler = null,
          camera = Element.fromProperties(Camera, properties, pan, tilt, zoom, keyEvents, mouseEvents, updateHandler);


      return camera;
    }
  }]);

  return Camera;
}(Element);

module.exports = Camera;

},{"../element":4,"../miscellaneous/keyEvents":28,"../miscellaneous/mouseEvents":29,"../miscellaneous/pan":30,"../miscellaneous/tilt":31,"../miscellaneous/zoom":32,"../utilities/camera":75}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element'),
    arrayUtilities = require('../utilities/array'),
    transformUtilities = require('../utilities/transform');

var push = arrayUtilities.push,
    composeTransform = transformUtilities.composeTransform;

var CanvasElement = function (_Element) {
  _inherits(CanvasElement, _Element);

  function CanvasElement(transform, facets, mask) {
    _classCallCheck(this, CanvasElement);

    var _this = _possibleConstructorReturn(this, (CanvasElement.__proto__ || Object.getPrototypeOf(CanvasElement)).call(this));

    _this.transform = transform;
    _this.facets = facets;
    _this.mask = mask;
    return _this;
  }

  _createClass(CanvasElement, [{
    key: 'getTransform',
    value: function getTransform() {
      return this.transform;
    }
  }, {
    key: 'getFacets',
    value: function getFacets() {
      return this.facets;
    }
  }, {
    key: 'getMask',
    value: function getMask() {
      return this.mask;
    }
  }, {
    key: 'setFacets',
    value: function setFacets(facets) {
      this.facets = facets;
    }
  }, {
    key: 'getVertexIndexes',
    value: function getVertexIndexes() {
      var vertexIndexes = this.facets.reduce(function (vertexIndexes, facet, index) {
        var facetVertexIndexes = facet.getVertexIndexes(index);

        push(vertexIndexes, facetVertexIndexes);

        return vertexIndexes;
      }, []);

      return vertexIndexes;
    }
  }, {
    key: 'getVertexNormals',
    value: function getVertexNormals() {
      var vertexNormals = this.facets.reduce(function (vertexNormals, facet) {
        var facetVertexNormals = facet.getVertexNormals();

        push(vertexNormals, facetVertexNormals);

        return vertexNormals;
      }, []);

      return vertexNormals;
    }
  }, {
    key: 'getVertexPositions',
    value: function getVertexPositions() {
      var vertexPositions = this.facets.reduce(function (vertexPositions, facet) {
        var facetVertexPositions = facet.getVertexPositions();

        push(vertexPositions, facetVertexPositions);

        return vertexPositions;
      }, []);

      return vertexPositions;
    }
  }, {
    key: 'applyMask',
    value: function applyMask(mask) {
      if (mask) {
        var element = this; ///

        mask.maskElement(element);
      }
    }
  }, {
    key: 'applyTransform',
    value: function applyTransform(transform) {
      this.facets.forEach(function (facet) {
        return facet.applyTransform(transform);
      });

      var childElements = this.getChildElements();

      childElements.forEach(function (childElement) {
        return childElement.applyTransform(transform);
      });
    }
  }, {
    key: 'applyTransformsAndMasks',
    value: function applyTransformsAndMasks() {
      var childElements = this.getChildElements();

      childElements.forEach(function (childElement) {
        return childElement.applyTransformsAndMasks();
      });

      this.applyTransform(this.transform);

      this.applyMask(this.mask);
    }
  }, {
    key: 'render',
    value: function render(colourRenderer, textureRenderer) {
      var childElements = this.getChildElements();

      childElements.forEach(function (childElement) {
        return childElement.render(colourRenderer, textureRenderer);
      });
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      var facets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      for (var _len = arguments.length, remainingArguments = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        remainingArguments[_key - 3] = arguments[_key];
      }

      var size = properties.size,
          position = properties.position,
          rotations = properties.rotations,
          _properties$mask = properties.mask,
          mask = _properties$mask === undefined ? null : _properties$mask,
          transform = composeTransform(size, position, rotations),
          canvasElement = Element.fromProperties.apply(Element, [Class, properties, transform, facets, mask].concat(remainingArguments));


      return canvasElement;
    }
  }]);

  return CanvasElement;
}(Element);

module.exports = CanvasElement;

},{"../element":4,"../utilities/array":74,"../utilities/transform":82}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColouredFacet = require('../../primitive/facet/coloured'),
    CanvasElement = require('../../element/canvas'),
    arrayUtilities = require('../../utilities/array');

var push = arrayUtilities.push;

var ColouredCanvasElement = function (_CanvasElement) {
  _inherits(ColouredCanvasElement, _CanvasElement);

  function ColouredCanvasElement() {
    _classCallCheck(this, ColouredCanvasElement);

    return _possibleConstructorReturn(this, (ColouredCanvasElement.__proto__ || Object.getPrototypeOf(ColouredCanvasElement)).apply(this, arguments));
  }

  _createClass(ColouredCanvasElement, [{
    key: 'render',
    value: function render(colourRenderer, textureRenderer) {
      var vertexIndexes = this.getVertexIndexes(),
          vertexNormals = this.getVertexNormals(),
          vertexColours = this.getVertexColours(),
          vertexPositions = this.getVertexPositions();

      colourRenderer.addVertexPositions(vertexPositions);

      colourRenderer.addVertexIndexes(vertexIndexes);

      colourRenderer.addVertexNormals(vertexNormals);

      colourRenderer.addVertexColours(vertexColours);

      _get(ColouredCanvasElement.prototype.__proto__ || Object.getPrototypeOf(ColouredCanvasElement.prototype), 'render', this).call(this, colourRenderer, textureRenderer);
    }
  }, {
    key: 'getVertexColours',
    value: function getVertexColours() {
      var facets = this.getFacets(),
          vertexColours = facets.reduce(function (vertexColours, facet) {
        var colouredFacet = facet,
            ///
        colouredFacetVertexColours = colouredFacet.getVertexColours();

        push(vertexColours, colouredFacetVertexColours);

        return vertexColours;
      }, []);

      return vertexColours;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties, coordinates, indexes, colour) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
        remainingArguments[_key - 5] = arguments[_key];
      }

      var indexTuples = indexes,
          ///
      coordinateTuples = coordinates,
          ///
      colouredFacets = indexTuples.map(function (indexTuple) {
        var colouredFacet = ColouredFacet.fromCoordinateTuplesIndexTupleAndColour(coordinateTuples, indexTuple, colour);

        return colouredFacet;
      }),
          facets = colouredFacets,
          ///
      colouredCanvasElement = CanvasElement.fromProperties.apply(CanvasElement, [Class, properties, facets].concat(remainingArguments));

      return colouredCanvasElement;
    }
  }]);

  return ColouredCanvasElement;
}(CanvasElement);

module.exports = ColouredCanvasElement;

},{"../../element/canvas":6,"../../primitive/facet/coloured":44,"../../utilities/array":74}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CanvasElement = require('../../element/canvas');

var FunctionCanvasElement = function (_CanvasElement) {
  _inherits(FunctionCanvasElement, _CanvasElement);

  function FunctionCanvasElement() {
    _classCallCheck(this, FunctionCanvasElement);

    return _possibleConstructorReturn(this, (FunctionCanvasElement.__proto__ || Object.getPrototypeOf(FunctionCanvasElement)).apply(this, arguments));
  }

  _createClass(FunctionCanvasElement, null, [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var facets = [],
          functionElement = CanvasElement.fromProperties(FunctionCanvasElement, properties, facets);

      return functionElement;
    }
  }]);

  return FunctionCanvasElement;
}(CanvasElement);

module.exports = FunctionCanvasElement;

},{"../../element/canvas":6}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TexturedFacet = require('../../primitive/facet/textured'),
    CanvasElement = require('../../element/canvas'),
    arrayUtilities = require('../../utilities/array');

var push = arrayUtilities.push;

var TexturedCanvasElement = function (_CanvasElement) {
  _inherits(TexturedCanvasElement, _CanvasElement);

  function TexturedCanvasElement() {
    _classCallCheck(this, TexturedCanvasElement);

    return _possibleConstructorReturn(this, (TexturedCanvasElement.__proto__ || Object.getPrototypeOf(TexturedCanvasElement)).apply(this, arguments));
  }

  _createClass(TexturedCanvasElement, [{
    key: 'render',
    value: function render(colourRenderer, textureRenderer) {
      var imageMapJSON = textureRenderer.getImageMapJSON(),
          vertexIndexes = this.getVertexIndexes(),
          vertexNormals = this.getVertexNormals(),
          vertexPositions = this.getVertexPositions(),
          vertexTextureCoordinatesTuples = this.getVertexTextureCoordinatesTuples(imageMapJSON);

      textureRenderer.addVertexPositions(vertexPositions);

      textureRenderer.addVertexIndexes(vertexIndexes);

      textureRenderer.addVertexNormals(vertexNormals);

      textureRenderer.addVertexTextureCoordinates(vertexTextureCoordinatesTuples);

      _get(TexturedCanvasElement.prototype.__proto__ || Object.getPrototypeOf(TexturedCanvasElement.prototype), 'render', this).call(this, colourRenderer, textureRenderer);
    }
  }, {
    key: 'getVertexTextureCoordinatesTuples',
    value: function getVertexTextureCoordinatesTuples(imageMapJSON) {
      var facets = this.getFacets(),
          vertexTextureCoordinatesTuples = facets.reduce(function (vertexTextureCoordinatesTuples, facet) {
        var texturedFacet = facet,
            ///
        texturedFacetVertexTextureCoordinatesTuples = texturedFacet.getVertexTextureCoordinatesTuple(imageMapJSON);

        push(vertexTextureCoordinatesTuples, texturedFacetVertexTextureCoordinatesTuples);

        return vertexTextureCoordinatesTuples;
      }, []);

      return vertexTextureCoordinatesTuples;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties, coordinates, indexes, imageName, textureCoordinates) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        remainingArguments[_key - 6] = arguments[_key];
      }

      var indexTuples = indexes,
          ///
      coordinateTuples = coordinates,
          ///
      textureCoordinatesTuples = textureCoordinates,
          ///
      texturedFacets = indexTuples.map(function (indexTuple, index) {
        var textureCoordinatesTuple = textureCoordinatesTuples[index],
            texturedFacet = TexturedFacet.fromTextureCoordinateTupleCoordinatesTuplesIndexTupleAndImageName(textureCoordinatesTuple, coordinateTuples, indexTuple, imageName);

        return texturedFacet;
      }),
          facets = texturedFacets,
          ///
      texturedCanvasElement = CanvasElement.fromProperties.apply(CanvasElement, [Class, properties, facets].concat(remainingArguments));

      return texturedCanvasElement;
    }
  }]);

  return TexturedCanvasElement;
}(CanvasElement);

module.exports = TexturedCanvasElement;

},{"../../element/canvas":6,"../../primitive/facet/textured":45,"../../utilities/array":74}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element'),
    MaskingFacet = require('../primitive/maskingFacet'),
    arrayUtilities = require('../utilities/array');

var push = arrayUtilities.push;

var Mask = function (_Element) {
  _inherits(Mask, _Element);

  function Mask() {
    _classCallCheck(this, Mask);

    return _possibleConstructorReturn(this, (Mask.__proto__ || Object.getPrototypeOf(Mask)).apply(this, arguments));
  }

  _createClass(Mask, [{
    key: 'retrieveMaskingFacets',
    value: function retrieveMaskingFacets() {
      var childElements = this.getChildElements(),
          facets = retrieveFacets(childElements),
          maskingFacets = facets.map(function (facet) {
        var maskingFacet = MaskingFacet.fromFacet(facet);

        return maskingFacet;
      });

      return maskingFacets;
    }
  }, {
    key: 'maskElement',
    value: function maskElement(element) {
      var maskingFacets = this.retrieveMaskingFacets(),
          childElements = element.getChildElements();

      _maskElement(element, maskingFacets);

      childElements.forEach(function (childElement) {
        return _maskElement(childElement, maskingFacets);
      });
    }
  }, {
    key: 'initialise',
    value: function initialise() {
      var childElements = this.getChildElements();

      childElements.forEach(function (childElement) {
        return childElement.applyTransformsAndMasks();
      });
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var mask = Element.fromProperties(Mask, properties);

      mask.initialise();

      return mask;
    }
  }]);

  return Mask;
}(Element);

module.exports = Mask;

function retrieveFacets(childElements) {
  var facets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  childElements.forEach(function (childElement) {
    var element = childElement,
        ///
    elementFacets = element.getFacets(),
        childElements = element.getChildElements();

    push(facets, elementFacets);

    retrieveFacets(childElements, facets);
  });

  return facets;
}

function _maskElement(element, maskingFacets) {
  var facets = element.getFacets();

  maskingFacets.forEach(function (maskingFacet) {
    var unmaskedFacets = [];

    facets.forEach(function (facet) {
      return maskingFacet.maskFacet(facet, unmaskedFacets);
    });

    facets = unmaskedFacets; ///
  });

  element.setFacets(facets);

  var childElements = element.getChildElements();

  childElements.forEach(function (childElement) {
    var element = childElement; ///

    _maskElement(element, maskingFacets);
  });
}

},{"../element":4,"../primitive/maskingFacet":46,"../utilities/array":74}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element'),
    ColourRenderer = require('../renderer/colour'),
    TextureRenderer = require('../renderer/texture');

var Part = function (_Element) {
  _inherits(Part, _Element);

  function Part(imageMap, imageMapJSON, colourRenderer, textureRenderer) {
    _classCallCheck(this, Part);

    var _this = _possibleConstructorReturn(this, (Part.__proto__ || Object.getPrototypeOf(Part)).call(this));

    _this.imageMap = imageMap;
    _this.imageMapJSON = imageMapJSON;
    _this.colourRenderer = colourRenderer;
    _this.textureRenderer = textureRenderer;
    return _this;
  }

  _createClass(Part, [{
    key: 'render',
    value: function render(canvas, offsetMatrix, rotationMatrix, positionMatrix, projectionMatrix, normalMatrix) {
      var colourRendererProgram = this.colourRenderer.getProgram(),
          textureRendererProgram = this.textureRenderer.getProgram();

      canvas.useProgram(colourRendererProgram);

      this.colourRenderer.bindBuffers(canvas);

      canvas.render(this.colourRenderer, offsetMatrix, rotationMatrix, positionMatrix, projectionMatrix, normalMatrix);

      canvas.useProgram(textureRendererProgram);

      this.textureRenderer.bindBuffers(canvas);

      this.textureRenderer.activateTexture(canvas);

      canvas.render(this.textureRenderer, offsetMatrix, rotationMatrix, positionMatrix, projectionMatrix, normalMatrix);
    }
  }, {
    key: 'initialise',
    value: function initialise(canvas) {
      var childElements = this.getChildElements(),
          colourRenderer = ColourRenderer.fromNothing(canvas),
          textureRenderer = TextureRenderer.fromImageMapAndImageMapJSON(this.imageMap, this.imageMapJSON, canvas);

      childElements.forEach(function (childElement) {
        return childElement.applyTransformsAndMasks();
      });

      childElements.forEach(function (childElement) {
        return childElement.render(colourRenderer, textureRenderer);
      });

      colourRenderer.createBuffers(canvas);

      textureRenderer.createBuffers(canvas);

      this.colourRenderer = colourRenderer;

      this.textureRenderer = textureRenderer;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var imageMap = properties.imageMap,
          imageMapJSON = properties.imageMapJSON,
          colourRenderer = null,
          textureRenderer = null,
          part = Element.fromProperties(Part, properties, imageMap, imageMapJSON, colourRenderer, textureRenderer);


      return part;
    }
  }]);

  return Part;
}(Element);

module.exports = Part;

},{"../element":4,"../renderer/colour":55,"../renderer/texture":71}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Scene = function (_Element) {
  _inherits(Scene, _Element);

  function Scene(canvas) {
    _classCallCheck(this, Scene);

    var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this));

    _this.canvas = canvas;
    return _this;
  }

  _createClass(Scene, [{
    key: 'onResize',
    value: function onResize(resizeHandler) {
      window.onresize = resizeHandler;
    }
  }, {
    key: 'resizeHandler',
    value: function resizeHandler() {
      var clientWidth = this.canvas.getClientWidth(),
          clientHeight = this.canvas.getClientHeight(),
          width = clientWidth,
          ///
      height = clientHeight; ///

      this.canvas.resize(width, height);

      this.forceUpdate(this.canvas);
    }
  }, {
    key: 'updateHandler',
    value: function updateHandler(offsetMatrix, rotationMatrix, positionMatrix, projectionMatrix, normalMatrix) {
      this.render(offsetMatrix, rotationMatrix, positionMatrix, projectionMatrix, normalMatrix);
    }
  }, {
    key: 'render',
    value: function render(offsetMatrix, rotationMatrix, positionMatrix, projectionMatrix, normalMatrix) {
      var _this2 = this;

      this.canvas.clear();

      this.childElements.forEach(function (childElement) {
        return childElement.render(_this2.canvas, offsetMatrix, rotationMatrix, positionMatrix, projectionMatrix, normalMatrix);
      });
    }
  }, {
    key: 'initialise',
    value: function initialise() {
      var _this3 = this;

      var childElements = this.getChildElements(),
          resizeHandler = this.resizeHandler.bind(this),
          updateHandler = this.updateHandler.bind(this);

      this.assignContext();

      this.onResize(resizeHandler);

      this.onUpdate(updateHandler);

      childElements.forEach(function (childElement) {
        return childElement.initialise(_this3.canvas);
      });

      this.resizeHandler(); ///
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var canvas = properties.canvas,
          scene = Element.fromProperties(Scene, properties, canvas);


      scene.initialise();

      return scene;
    }
  }]);

  return Scene;
}(Element);

module.exports = Scene;

},{"../element":4}],13:[function(require,module,exports){
'use strict';

var cubeExample = require('./example/cube'),
    simpleExample = require('./example/simple'),
    maskingExample = require('./example/masking'),
    pyramidExample = require('./example/pyramid'),
    temporaryExample = require('./example/temporary');

var example = window.location.search.substring(1); ///

switch (example) {
  case 'temporary':
    temporaryExample();
    break;

  case 'simple':
    simpleExample();
    break;

  case 'cube':
    cubeExample();
    break;

  case 'masking':
    maskingExample();
    break;

  case 'pyramid':
    pyramidExample();
    break;
}

},{"./example/cube":14,"./example/masking":21,"./example/pyramid":22,"./example/simple":23,"./example/temporary":24}],14:[function(require,module,exports){
'use strict';

var xgl = require('../../index'); ///

var Cube = require('./element/cube');

var Canvas = xgl.Canvas,
    Scene = xgl.Scene,
    Part = xgl.Part,
    Camera = xgl.Camera;


var canvas = new Canvas();

var cubeExample = function cubeExample() {
	return React.createElement(
		Scene,
		{ canvas: canvas },
		React.createElement(
			Part,
			null,
			React.createElement(Cube, { colour: [0, 1, 0] })
		),
		React.createElement(Camera, null)
	);
};

module.exports = cubeExample;

},{"../../index":1,"./element/cube":16}],15:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var xgl = require('../../../index'); ///

var ColouredCanvasElement = xgl.ColouredCanvasElement;


var coordinates = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
    indexes = [[0, 1, 3], [3, 2, 0]],
    defaultColour = [1, 0, 0];

var ColouredSquare = function (_ColouredCanvasElemen) {
  _inherits(ColouredSquare, _ColouredCanvasElemen);

  function ColouredSquare() {
    _classCallCheck(this, ColouredSquare);

    return _possibleConstructorReturn(this, (ColouredSquare.__proto__ || Object.getPrototypeOf(ColouredSquare)).apply(this, arguments));
  }

  _createClass(ColouredSquare, null, [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var _properties$colour = properties.colour,
          colour = _properties$colour === undefined ? defaultColour : _properties$colour,
          colouredSquare = ColouredCanvasElement.fromProperties(ColouredSquare, properties, coordinates, indexes, colour);


      return colouredSquare;
    }
  }]);

  return ColouredSquare;
}(ColouredCanvasElement);

module.exports = ColouredSquare;

},{"../../../index":1}],16:[function(require,module,exports){
'use strict';

var Face = require('./face');

var defaultColour = [1, 1, 0];

var Cube = function Cube(properties) {
  var _properties$colour = properties.colour,
      colour = _properties$colour === undefined ? defaultColour : _properties$colour;


  return [React.createElement(Face, { colour: colour, rotations: [0, 0, 0] }), React.createElement(Face, { colour: colour, rotations: [+90, 0, 0] }), React.createElement(Face, { colour: colour, rotations: [0, +90, 0] }), React.createElement(Face, { colour: colour, rotations: [180, 0, 0] }), React.createElement(Face, { colour: colour, rotations: [-90, 0, 0] }), React.createElement(Face, { colour: colour, rotations: [0, -90, 0] })];
};

module.exports = Cube;

},{"./face":17}],17:[function(require,module,exports){
'use strict';

var ColouredSquare = require('./colouredSquare');

var Face = function Face(properties) {
  var colour = properties.colour;


  return React.createElement(ColouredSquare, { colour: colour, position: [-0.5, -0.5, +0.5] });
};

module.exports = Face;

},{"./colouredSquare":15}],18:[function(require,module,exports){
'use strict';

var Side = require('./side');

var Pyramid = function Pyramid(properties) {
  return [React.createElement(Side, null), React.createElement(Side, { rotations: [0, 90, 0] }), React.createElement(Side, { rotations: [0, 180, 0] }), React.createElement(Side, { rotations: [0, 270, 0] })];
};

module.exports = Pyramid;

},{"./side":19}],19:[function(require,module,exports){
'use strict';

var TexturedTriangle = require('./texturedTriangle');

var Side = function Side(properties) {
  return React.createElement(TexturedTriangle, { size: [1, 1 / Math.sqrt(2), 1], position: [-0.5, 0, 0.5], rotations: [-45, 0, 0] });
};

module.exports = Side;

},{"./texturedTriangle":20}],20:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var xgl = require('../../../index'); ///

var TexturedCanvasElement = xgl.TexturedCanvasElement;


var coordinates = [[0, 0, 0], [1, 0, 0], [0.5, 1, 0]],
    indexes = [[0, 1, 2]],
    defaultImageName = "stripes.jpg",
    defaultTextureCoordinates = [[[0, 0], [1, 0], [0.5, 1]]];

var TexturedTriangle = function (_TexturedCanvasElemen) {
  _inherits(TexturedTriangle, _TexturedCanvasElemen);

  function TexturedTriangle() {
    _classCallCheck(this, TexturedTriangle);

    return _possibleConstructorReturn(this, (TexturedTriangle.__proto__ || Object.getPrototypeOf(TexturedTriangle)).apply(this, arguments));
  }

  _createClass(TexturedTriangle, null, [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var _properties$imageName = properties.imageName,
          imageName = _properties$imageName === undefined ? defaultImageName : _properties$imageName,
          _properties$textureCo = properties.textureCoordinates,
          textureCoordinates = _properties$textureCo === undefined ? defaultTextureCoordinates : _properties$textureCo,
          texturedTriangle = TexturedCanvasElement.fromProperties(TexturedTriangle, properties, coordinates, indexes, imageName, textureCoordinates);


      return texturedTriangle;
    }
  }]);

  return TexturedTriangle;
}(TexturedCanvasElement);

module.exports = TexturedTriangle;

},{"../../../index":1}],21:[function(require,module,exports){
'use strict';

var xgl = require('../../index'); ///

var Cube = require('./element/cube');

var Canvas = xgl.Canvas,
    Scene = xgl.Scene,
    Mask = xgl.Mask,
    Part = xgl.Part,
    Camera = xgl.Camera;


var canvas = new Canvas();

var maskingExample = function maskingExample() {
  var SmallCube = React.createElement(Cube, { size: [1 / 4, 1 / 4, 1 / 4] }),
      smallCubeMask = React.createElement(
    Mask,
    null,
    React.createElement(SmallCube, null)
  ),
      MediumCube = React.createElement(Cube, { size: [1 / 2, 1 / 2, 1 / 2], mask: smallCubeMask }),
      mediumCubeMask = React.createElement(
    Mask,
    null,
    React.createElement(MediumCube, null)
  ),
      LargeCube = React.createElement(Cube, { mask: mediumCubeMask });

  return React.createElement(
    Scene,
    { canvas: canvas },
    React.createElement(
      Part,
      null,
      React.createElement(LargeCube, null)
    ),
    React.createElement(Camera, null)
  );
};

module.exports = maskingExample;

},{"../../index":1,"./element/cube":16}],22:[function(require,module,exports){
'use strict';

var xgl = require('../../index'); ///

var Pyramid = require('./element/pyramid'),
    configuration = require('../miscellaneous/configuration');

var Canvas = xgl.Canvas,
    Scene = xgl.Scene,
    Part = xgl.Part,
    Camera = xgl.Camera;


var canvas = new Canvas();

var pyramidExample = function pyramidExample() {
  preloadImageMap(function (imageMap) {
    var imageMapJSON = configuration.imageMapJSON;


    return React.createElement(
      Scene,
      { canvas: canvas },
      React.createElement(
        Part,
        { imageMap: imageMap, imageMapJSON: imageMapJSON },
        React.createElement(Pyramid, null)
      ),
      React.createElement(Camera, null)
    );
  });
};

module.exports = pyramidExample;

function preloadImageMap(callback) {
  var imageMapURI = configuration.imageMapURI,
      imageMap = new Image(),
      src = imageMapURI; ///

  Object.assign(imageMap, {
    src: src,
    onload: onload
  });

  function onload(event) {
    callback(imageMap);
  }
}

},{"../../index":1,"../miscellaneous/configuration":27,"./element/pyramid":18}],23:[function(require,module,exports){
'use strict';

var xgl = require('../../index'); ///

var ColouredSquare = require('./element/colouredSquare');

var Canvas = xgl.Canvas,
    Scene = xgl.Scene,
    Part = xgl.Part,
    Camera = xgl.Camera;


var canvas = new Canvas();

var simpleExample = function simpleExample() {
  return React.createElement(
    Scene,
    { canvas: canvas },
    React.createElement(
      Part,
      null,
      React.createElement(ColouredSquare, { colour: [0, 0, 1] })
    ),
    React.createElement(Camera, null)
  );
};

module.exports = simpleExample;

},{"../../index":1,"./element/colouredSquare":15}],24:[function(require,module,exports){
'use strict';

var xgl = require('../../index'); ///

var ColouredSquare = require('./element/colouredSquare');

var Canvas = xgl.Canvas,
    Scene = xgl.Scene,
    Part = xgl.Part,
    Mask = xgl.Mask,
    Camera = xgl.Camera;


var canvas = new Canvas();

var mask = React.createElement(
  Mask,
  null,
  React.createElement(ColouredSquare, { size: [0.5, 0.5, 0] })
);

var MaskedColouredSquare = function MaskedColouredSquare(properties) {
  return React.createElement(ColouredSquare, { mask: mask });
};

var temporaryExample = function temporaryExample() {
  return React.createElement(
    Scene,
    { canvas: canvas },
    React.createElement(
      Part,
      null,
      React.createElement(MaskedColouredSquare, { size: [2, 2, 0], rotations: [0, 45, 0] })
    ),
    React.createElement(Camera, null)
  );
};

module.exports = temporaryExample;

},{"../../index":1,"./element/colouredSquare":15}],25:[function(require,module,exports){
'use strict';

function identity2() {
  return [1, 0, 0, 1];
}

function identity3() {
  return [1, 0, 0, 0, 1, 0, 0, 0, 1];
}

function identity4() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

function invert2(matrix) {
  var m0 = matrix[0],
      m1 = matrix[1],
      m2 = matrix[2],
      m3 = matrix[3],
      determinant = m0 * m3 - m2 * m1;

  if (determinant !== 0) {
    return [+m3 / determinant, -m1 / determinant, -m2 / determinant, +m0 / determinant];
  }
}

function invert3(matrix) {
  var a00 = matrix[0],
      a01 = matrix[1],
      a02 = matrix[2],
      a10 = matrix[3],
      a11 = matrix[4],
      a12 = matrix[5],
      a20 = matrix[6],
      a21 = matrix[7],
      a22 = matrix[8],
      b01 = a22 * a11 - a12 * a21,
      b11 = -a22 * a10 + a12 * a20,
      b21 = a21 * a10 - a11 * a20,
      determinant = a00 * b01 + a01 * b11 + a02 * b21;

  if (determinant !== 0) {
    return [b01 / determinant, (-a22 * a01 + a02 * a21) / determinant, (a12 * a01 - a02 * a11) / determinant, b11 / determinant, (a22 * a00 - a02 * a20) / determinant, (-a12 * a00 + a02 * a10) / determinant, b21 / determinant, (-a21 * a00 + a01 * a20) / determinant, (a11 * a00 - a01 * a10) / determinant];
  }
}

function invert4(matrix) {
  var a00 = matrix[0],
      a01 = matrix[1],
      a02 = matrix[2],
      a03 = matrix[3],
      a10 = matrix[4],
      a11 = matrix[5],
      a12 = matrix[6],
      a13 = matrix[7],
      a20 = matrix[8],
      a21 = matrix[9],
      a22 = matrix[10],
      a23 = matrix[11],
      a30 = matrix[12],
      a31 = matrix[13],
      a32 = matrix[14],
      a33 = matrix[15],
      b00 = a00 * a11 - a01 * a10,
      b01 = a00 * a12 - a02 * a10,
      b02 = a00 * a13 - a03 * a10,
      b03 = a01 * a12 - a02 * a11,
      b04 = a01 * a13 - a03 * a11,
      b05 = a02 * a13 - a03 * a12,
      b06 = a20 * a31 - a21 * a30,
      b07 = a20 * a32 - a22 * a30,
      b08 = a20 * a33 - a23 * a30,
      b09 = a21 * a32 - a22 * a31,
      b10 = a21 * a33 - a23 * a31,
      b11 = a22 * a33 - a23 * a32,
      determinant = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (determinant !== 0) {
    return [(a11 * b11 - a12 * b10 + a13 * b09) / determinant, (a02 * b10 - a01 * b11 - a03 * b09) / determinant, (a31 * b05 - a32 * b04 + a33 * b03) / determinant, (a22 * b04 - a21 * b05 - a23 * b03) / determinant, (a12 * b08 - a10 * b11 - a13 * b07) / determinant, (a00 * b11 - a02 * b08 + a03 * b07) / determinant, (a32 * b02 - a30 * b05 - a33 * b01) / determinant, (a20 * b05 - a22 * b02 + a23 * b01) / determinant, (a10 * b10 - a11 * b08 + a13 * b06) / determinant, (a01 * b08 - a00 * b10 - a03 * b06) / determinant, (a30 * b04 - a31 * b02 + a33 * b00) / determinant, (a21 * b02 - a20 * b04 - a23 * b00) / determinant, (a11 * b07 - a10 * b09 - a12 * b06) / determinant, (a00 * b09 - a01 * b07 + a02 * b06) / determinant, (a31 * b01 - a30 * b03 - a32 * b00) / determinant, (a20 * b03 - a21 * b01 + a22 * b00) / determinant];
  }
}

function transpose2(matrix) {
  return [matrix[0], matrix[2], matrix[1], matrix[3]];
}

function transpose3(matrix) {
  return [matrix[0], matrix[3], matrix[6], matrix[1], matrix[4], matrix[7], matrix[2], matrix[5], matrix[8]];
}

function transpose4(matrix) {
  return [matrix[0], matrix[4], matrix[8], matrix[12], matrix[1], matrix[5], matrix[9], matrix[13], matrix[2], matrix[6], matrix[10], matrix[14], matrix[3], matrix[7], matrix[11], matrix[15]];
}

function scale4(matrix, vector) {
  var x = vector[0],
      y = vector[1],
      z = vector[2];

  return [matrix[0] * x, matrix[1] * x, matrix[2] * x, matrix[3] * x, matrix[4] * y, matrix[5] * y, matrix[6] * y, matrix[7] * y, matrix[8] * z, matrix[9] * z, matrix[10] * z, matrix[11] * z, matrix[12], matrix[13], matrix[14], matrix[15]];
}

function rotate4(matrix, angle, vector) {
  var x = vector[0],
      y = vector[1],
      z = vector[2];

  var length = Math.sqrt(x * x + y * y + z * z);

  if (length !== 0) {
    x /= length;
    y /= length;
    z /= length;

    var s = Math.sin(angle),
        c = Math.cos(angle),
        t = 1 - c,
        a00 = matrix[0],
        a01 = matrix[1],
        a02 = matrix[2],
        a03 = matrix[3],
        a10 = matrix[4],
        a11 = matrix[5],
        a12 = matrix[6],
        a13 = matrix[7],
        a20 = matrix[8],
        a21 = matrix[9],
        a22 = matrix[10],
        a23 = matrix[11],
        b00 = x * x * t + c,
        b01 = y * x * t + z * s,
        b02 = z * x * t - y * s,
        b10 = x * y * t - z * s,
        b11 = y * y * t + c,
        b12 = z * y * t + x * s,
        b20 = x * z * t + y * s,
        b21 = y * z * t - x * s,
        b22 = z * z * t + c;

    return [a00 * b00 + a10 * b01 + a20 * b02, a01 * b00 + a11 * b01 + a21 * b02, a02 * b00 + a12 * b01 + a22 * b02, a03 * b00 + a13 * b01 + a23 * b02, a00 * b10 + a10 * b11 + a20 * b12, a01 * b10 + a11 * b11 + a21 * b12, a02 * b10 + a12 * b11 + a22 * b12, a03 * b10 + a13 * b11 + a23 * b12, a00 * b20 + a10 * b21 + a20 * b22, a01 * b20 + a11 * b21 + a21 * b22, a02 * b20 + a12 * b21 + a22 * b22, a03 * b20 + a13 * b21 + a23 * b22, matrix[12], matrix[13], matrix[14], matrix[15]];
  }
}

function translate4(matrix, vector) {
  var x = vector[0],
      y = vector[1],
      z = vector[2],
      a00 = matrix[0],
      a01 = matrix[1],
      a02 = matrix[2],
      a03 = matrix[3],
      a10 = matrix[4],
      a11 = matrix[5],
      a12 = matrix[6],
      a13 = matrix[7],
      a20 = matrix[8],
      a21 = matrix[9],
      a22 = matrix[10],
      a23 = matrix[11];

  return [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a00 * x + a10 * y + a20 * z + matrix[12], a01 * x + a11 * y + a21 * z + matrix[13], a02 * x + a12 * y + a22 * z + matrix[14], a03 * x + a13 * y + a23 * z + matrix[15]];
}

function perspective4(fieldOfView, aspectRatio, zNear, zFar) {
  var f = 1.0 / Math.tan(fieldOfView / 2),
      nf = 1 / (zNear - zFar);

  return [f / aspectRatio, 0, 0, 0, 0, f, 0, 0, 0, 0, (zFar + zNear) * nf, -1, 0, 0, 2 * zFar * zNear * nf, 0];
}

module.exports = {
  identity2: identity2,
  identity3: identity3,
  identity4: identity4,
  invert2: invert2,
  invert3: invert3,
  invert4: invert4,
  scale4: scale4,
  rotate4: rotate4,
  transpose2: transpose2,
  transpose3: transpose3,
  transpose4: transpose4,
  translate4: translate4,
  perspective4: perspective4
};

},{}],26:[function(require,module,exports){
'use strict';

function length2(vector) {
  var x = vector[0],
      y = vector[1];

  return Math.sqrt(x * x + y * y);
}

function length3(vector) {
  var x = vector[0],
      y = vector[1],
      z = vector[2];

  return Math.sqrt(x * x + y * y + z * z);
}

function length4(vector) {
  var x = vector[0],
      y = vector[1],
      z = vector[2],
      w = vector[3];

  return Math.sqrt(x * x + y * y + z * z + w * w);
}

function dot2(vectorA, vectorB) {
  return vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1];
}

function dot3(vectorA, vectorB) {
  return vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1] + vectorA[2] * vectorB[2];
}

function dot4(vectorA, vectorB) {
  return vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1] + vectorA[2] * vectorB[2] + vectorA[3] * vectorB[3];
}

function cross3(vectorA, vectorB) {
  var ax = vectorA[0],
      ay = vectorA[1],
      az = vectorA[2],
      bx = vectorB[0],
      by = vectorB[1],
      bz = vectorB[2];

  return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
}

function normalise2(vector) {
  var x = vector[0],
      y = vector[1],
      length = Math.sqrt(x * x + y * y);

  if (length > 0) {
    return [x / length, y / length];
  }
}

function normalise3(vector) {
  var x = vector[0],
      y = vector[1],
      z = vector[2],
      length = Math.sqrt(x * x + y * y + z * z);

  if (length > 0) {
    return [x / length, y / length, z / length];
  }
}

function normalise4(vector) {
  var x = vector[0],
      y = vector[1],
      z = vector[2],
      w = vector[3],
      length = Math.sqrt(x * x + y * y + z * z + w * w);

  if (length > 0) {
    return [x / length, y / length, z / length, w / length];
  }
}

function scale2(vector, scalar) {
  return [vector[0] * scalar, vector[1] * scalar];
}

function scale3(vector, scalar) {
  return [vector[0] * scalar, vector[1] * scalar, vector[2] * scalar];
}

function scale4(vector, scalar) {
  return [vector[0] * scalar, vector[1] * scalar, vector[2] * scalar, vector[3] * scalar];
}

function add2(vectorA, vectorB) {
  return [vectorA[0] + vectorB[0], vectorA[1] + vectorB[1]];
}

function add3(vectorA, vectorB) {
  return [vectorA[0] + vectorB[0], vectorA[1] + vectorB[1], vectorA[2] + vectorB[2]];
}

function add4(vectorA, vectorB) {
  return [vectorA[0] + vectorB[0], vectorA[1] + vectorB[1], vectorA[2] + vectorB[2], vectorA[3] + vectorB[3]];
}

function subtract2(vectorA, vectorB) {
  return [vectorA[0] - vectorB[0], vectorA[1] - vectorB[1]];
}

function subtract3(vectorA, vectorB) {
  return [vectorA[0] - vectorB[0], vectorA[1] - vectorB[1], vectorA[2] - vectorB[2]];
}

function subtract4(vectorA, vectorB) {
  return [vectorA[0] - vectorB[0], vectorA[1] - vectorB[1], vectorA[2] - vectorB[2], vectorA[3] - vectorB[3]];
}

function multiply2(vectorA, vectorB) {
  return [vectorA[0] * vectorB[0], vectorA[1] * vectorB[1]];
}

function multiply3(vectorA, vectorB) {
  return [vectorA[0] * vectorB[0], vectorA[1] * vectorB[1], vectorA[2] * vectorB[2]];
}

function multiply4(vectorA, vectorB) {
  return [vectorA[0] * vectorB[0], vectorA[1] * vectorB[1], vectorA[2] * vectorB[2], vectorA[3] * vectorB[3]];
}

function transform2(vector, matrix) {
  var x = vector[0],
      y = vector[1];

  return [matrix[0] * x + matrix[2] * y, matrix[1] * x + matrix[3] * y];
}

function transform3(vector, matrix) {
  var x = vector[0],
      y = vector[1],
      z = vector[2];

  return [matrix[0] * x + matrix[3] * y + matrix[6] * z, matrix[1] * x + matrix[4] * y + matrix[7] * z, matrix[2] * x + matrix[5] * y + matrix[8] * z];
}

function transform4(vector, matrix) {
  var x = vector[0],
      y = vector[1],
      z = vector[2],
      w = vector[3];

  return [matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12] * w, matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13] * w, matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14] * w, matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] * w];
}

module.exports = {
  length2: length2,
  length3: length3,
  length4: length4,
  dot2: dot2,
  dot3: dot3,
  dot4: dot4,
  cross3: cross3,
  normalise2: normalise2,
  normalise3: normalise3,
  normalise4: normalise4,
  scale2: scale2,
  scale3: scale3,
  scale4: scale4,
  add2: add2,
  add3: add3,
  add4: add4,
  subtract2: subtract2,
  subtract3: subtract3,
  subtract4: subtract4,
  multiply2: multiply2,
  multiply3: multiply3,
  multiply4: multiply4,
  transform2: transform2,
  transform3: transform3,
  transform4: transform4
};

},{}],27:[function(require,module,exports){
'use strict';

module.exports = window.__configuration__; ///

},{}],28:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var constants = require('../constants');

var CTRL_KEY_CODE = constants.CTRL_KEY_CODE,
    SHIFT_KEY_CODE = constants.SHIFT_KEY_CODE;

var KeyEvents = function () {
  function KeyEvents(handlersMap, ctrlKeyDown, shiftKeyDown) {
    _classCallCheck(this, KeyEvents);

    this.handlersMap = handlersMap;
    this.ctrlKeyDown = ctrlKeyDown;
    this.shiftKeyDown = shiftKeyDown;
  }

  _createClass(KeyEvents, [{
    key: 'isCtrlKeyDown',
    value: function isCtrlKeyDown() {
      return this.ctrlKeyDown;
    }
  }, {
    key: 'isShiftKeyDown',
    value: function isShiftKeyDown() {
      return this.shiftKeyDown;
    }
  }, {
    key: 'keyUpEventListener',
    value: function keyUpEventListener(event) {
      var keyCode = event.keyCode;

      switch (keyCode) {
        case CTRL_KEY_CODE:
          this.ctrlKeyUpEventListener();
          break;

        case SHIFT_KEY_CODE:
          this.shiftKeyUpEventListener();
          break;
      }
    }
  }, {
    key: 'keyDownEventListener',
    value: function keyDownEventListener(event) {
      var keyCode = event.keyCode;

      switch (keyCode) {
        case CTRL_KEY_CODE:
          this.ctrlKeyDownEventListener();
          break;

        case SHIFT_KEY_CODE:
          this.shiftKeyDownEventListener();
          break;
      }
    }
  }, {
    key: 'ctrlKeyUpEventListener',
    value: function ctrlKeyUpEventListener() {
      var _this = this;

      this.ctrlKeyDown = false;

      var ctrlKeyHandlers = this.handlersMap[CTRL_KEY_CODE];

      ctrlKeyHandlers.forEach(function (ctrlKeyHandler) {
        return ctrlKeyHandler(_this.ctrlKeyDown);
      });
    }
  }, {
    key: 'shiftKeyUpEventListener',
    value: function shiftKeyUpEventListener() {
      var _this2 = this;

      this.shiftKeyDown = false;

      var shiftKeyHandlers = this.handlersMap[SHIFT_KEY_CODE];

      shiftKeyHandlers.forEach(function (shiftKeyHandler) {
        return shiftKeyHandler(_this2.shiftKeyDown);
      });
    }
  }, {
    key: 'ctrlKeyDownEventListener',
    value: function ctrlKeyDownEventListener() {
      var _this3 = this;

      this.ctrlKeyDown = true;

      var ctrlKeyHandlers = this.handlersMap[CTRL_KEY_CODE];

      ctrlKeyHandlers.forEach(function (ctrlKeyHandler) {
        return ctrlKeyHandler(_this3.ctrlKeyDown);
      });
    }
  }, {
    key: 'shiftKeyDownEventListener',
    value: function shiftKeyDownEventListener() {
      var _this4 = this;

      this.shiftKeyDown = true;

      var shiftKeyHandlers = this.handlersMap[SHIFT_KEY_CODE];

      shiftKeyHandlers.forEach(function (shiftKeyHandler) {
        return shiftKeyHandler(_this4.shiftKeyDown);
      });
    }
  }, {
    key: 'addCtrlKeyHandler',
    value: function addCtrlKeyHandler(ctrlKeyHandler) {
      var ctrlKeyHandlers = this.handlersMap[CTRL_KEY_CODE];

      ctrlKeyHandlers.push(ctrlKeyHandler);
    }
  }, {
    key: 'addShiftKeyHandler',
    value: function addShiftKeyHandler(shiftKeyHandler) {
      var shiftKeyHandlers = this.handlersMap[SHIFT_KEY_CODE];

      shiftKeyHandlers.push(shiftKeyHandler);
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing(canvas) {
      var handlersMap = {};

      handlersMap[CTRL_KEY_CODE] = [];
      handlersMap[SHIFT_KEY_CODE] = [];

      var ctrlKeyDown = false,
          ///
      shiftKeyDown = false,
          ///
      keyEvents = new KeyEvents(handlersMap, ctrlKeyDown, shiftKeyDown),
          keyUpEventListener = keyEvents.keyUpEventListener.bind(keyEvents),
          keyDownEventListener = keyEvents.keyDownEventListener.bind(keyEvents),
          documentDOMElement = document.documentElement; ///

      documentDOMElement.addEventListener('keyup', keyUpEventListener);
      documentDOMElement.addEventListener('keydown', keyDownEventListener);

      return keyEvents;
    }
  }]);

  return KeyEvents;
}();

module.exports = KeyEvents;

},{"../constants":3}],29:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var constants = require('../constants');

var MOUSE_UP = constants.MOUSE_UP,
    MOUSE_DOWN = constants.MOUSE_DOWN,
    MOUSE_MOVE = constants.MOUSE_MOVE,
    MOUSE_WHEEL = constants.MOUSE_WHEEL;

var MouseEvents = function () {
  function MouseEvents(handlersMap, mouseDown, canvas) {
    _classCallCheck(this, MouseEvents);

    this.handlersMap = handlersMap;
    this.mouseDown = mouseDown;
    this.canvas = canvas;
  }

  _createClass(MouseEvents, [{
    key: 'mouseEventListener',
    value: function mouseEventListener(event, eventType) {
      var _this = this;

      var handlers = this.handlersMap[eventType],
          mouseCoordinates = mouseCoordinatesFromEvent(event, this.canvas);

      handlers.forEach(function (handler) {
        return handler(mouseCoordinates, _this.mouseDown, _this.canvas);
      });

      event.preventDefault();
    }
  }, {
    key: 'mouseUpEventListener',
    value: function mouseUpEventListener(event) {
      this.mouseDown = false;

      this.mouseEventListener(event, MOUSE_UP);
    }
  }, {
    key: 'mouseDownEventListener',
    value: function mouseDownEventListener(event) {
      this.mouseDown = true;

      this.mouseEventListener(event, MOUSE_DOWN);
    }
  }, {
    key: 'mouseMoveEventListener',
    value: function mouseMoveEventListener(event) {
      this.mouseEventListener(event, MOUSE_MOVE);
    }
  }, {
    key: 'mouseWheelEventListener',
    value: function mouseWheelEventListener(event) {
      var _this2 = this;

      var delta = deltaFromEvent(event),
          handlers = this.handlersMap[MOUSE_WHEEL];

      handlers.forEach(function (handler) {
        return handler(delta, _this2.canvas);
      });

      event.preventDefault();
    }
  }, {
    key: 'addMouseUpHandler',
    value: function addMouseUpHandler(mouseUpHandler) {
      var mouseUpHandlers = this.handlersMap[MOUSE_UP];

      mouseUpHandlers.push(mouseUpHandler);
    }
  }, {
    key: 'addMouseDownHandler',
    value: function addMouseDownHandler(mouseDownHandler) {
      var mouseDownHandlers = this.handlersMap[MOUSE_DOWN];

      mouseDownHandlers.push(mouseDownHandler);
    }
  }, {
    key: 'addMouseMoveHandler',
    value: function addMouseMoveHandler(mouseMoveHandler) {
      var mouseMoveHandlers = this.handlersMap[MOUSE_MOVE];

      mouseMoveHandlers.push(mouseMoveHandler);
    }
  }, {
    key: 'addMouseWheelHandler',
    value: function addMouseWheelHandler(mouseWheelHandler) {
      var mouseWheelHandlers = this.handlersMap[MOUSE_WHEEL];

      mouseWheelHandlers.push(mouseWheelHandler);
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing(canvas) {
      var handlersMap = {};

      handlersMap[MOUSE_UP] = [];
      handlersMap[MOUSE_DOWN] = [];
      handlersMap[MOUSE_MOVE] = [];
      handlersMap[MOUSE_WHEEL] = [];

      var mouseDown = false,
          ///
      mouseEvents = new MouseEvents(handlersMap, mouseDown, canvas),
          canvasDOMElement = canvas.getDOMElement(),
          mouseUpEventListener = mouseEvents.mouseUpEventListener.bind(mouseEvents),
          mouseDownEventListener = mouseEvents.mouseDownEventListener.bind(mouseEvents),
          mouseMoveEventListener = mouseEvents.mouseMoveEventListener.bind(mouseEvents),
          mouseWheelEventListener = mouseEvents.mouseWheelEventListener.bind(mouseEvents);

      canvasDOMElement.addEventListener('mouseup', mouseUpEventListener);
      canvasDOMElement.addEventListener('mousedown', mouseDownEventListener);
      canvasDOMElement.addEventListener('mousemove', mouseMoveEventListener);
      canvasDOMElement.addEventListener('mousewheel', mouseWheelEventListener);

      return mouseEvents;
    }
  }]);

  return MouseEvents;
}();

module.exports = MouseEvents;

function deltaFromEvent(event) {
  var delta = Math.max(-1, Math.min(1, event.wheelDelta)); ///

  return delta;
}

function mouseCoordinatesFromEvent(event) {
  var canvasDOMElement = event.target,
      ///
  domElementBoundingClientRect = canvasDOMElement.getBoundingClientRect(),
      mouseCoordinates = [+(event.clientX - domElementBoundingClientRect.left), -(event.clientY - domElementBoundingClientRect.top)];

  return mouseCoordinates;
}

},{"../constants":3}],30:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var constants = require('../constants'),
    vectorMaths = require('../maths/vector'),
    arrayUtilities = require('../utilities/array');

var first = arrayUtilities.first,
    second = arrayUtilities.second,
    add3 = vectorMaths.add3,
    subtract2 = vectorMaths.subtract2,
    scale2 = vectorMaths.scale2,
    OFFSET_SCALAR = constants.OFFSET_SCALAR,
    INITIAL_MOUSE_COORDINATES = constants.INITIAL_MOUSE_COORDINATES;

var Pan = function () {
  function Pan(offset, previousOffset, mouseCoordinates, previousMouseCoordinates) {
    _classCallCheck(this, Pan);

    this.offset = offset;
    this.previousOffset = previousOffset;
    this.mouseCoordinates = mouseCoordinates;
    this.previousMouseCoordinates = previousMouseCoordinates;
  }

  _createClass(Pan, [{
    key: 'getOffset',
    value: function getOffset() {
      return this.offset;
    }
  }, {
    key: 'shiftKeyHandler',
    value: function shiftKeyHandler(shiftKeyDown) {
      if (shiftKeyDown) {
        this.previousOffset = this.offset;

        this.previousMouseCoordinates = this.mouseCoordinates;
      }
    }
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler() {
      this.previousMouseCoordinates = this.mouseCoordinates;
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler() {
      this.previousOffset = this.offset;

      if (this.shiftKeyDown) {
        this.previousOffset = this.offset;

        this.previousMouseCoordinates = this.mouseCoordinates;
      }
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler(mouseCoordinates, mouseDown, shiftKeyDown, tilt) {
      this.mouseCoordinates = mouseCoordinates;

      if (mouseDown && shiftKeyDown) {
        this.updateOffset(tilt);
      }
    }
  }, {
    key: 'updateOffset',
    value: function updateOffset(tilt) {
      var xAngle = tilt.getXAngle(),
          yAngle = tilt.getYAngle(),
          scalar = OFFSET_SCALAR,
          relativeMouseCoordinates = subtract2(this.mouseCoordinates, this.previousMouseCoordinates),
          relativeOffset = scale2(relativeMouseCoordinates, scalar),
          yAngleOffset = calculateYAngleOffset(yAngle, relativeOffset),
          xAngleOffset = calculateXAngleOffset(xAngle, yAngle, relativeOffset);

      this.offset = add3(add3(this.previousOffset, yAngleOffset), xAngleOffset); ///
    }
  }], [{
    key: 'fromInitialOffset',
    value: function fromInitialOffset(initialOffset) {
      var offset = initialOffset,
          ///
      previousOffset = offset,
          ///
      mouseCoordinates = INITIAL_MOUSE_COORDINATES,
          ///
      previousMouseCoordinates = mouseCoordinates,
          ///
      pan = new Pan(offset, previousOffset, mouseCoordinates, previousMouseCoordinates);

      return pan;
    }
  }]);

  return Pan;
}();

module.exports = Pan;

function calculateYAngleOffset(yAngle, relativeOffset) {
  var relativeOffsetComponents = relativeOffset,
      ///
  firstRelativeOffsetComponent = first(relativeOffsetComponents),
      yAngleOffset = [-Math.cos(yAngle) * firstRelativeOffsetComponent, +0, -Math.sin(yAngle) * firstRelativeOffsetComponent];

  return yAngleOffset;
}

function calculateXAngleOffset(xAngle, yAngle, relativeOffset) {
  var relativeOffsetComponents = relativeOffset,
      ///
  secondRelativeOffsetComponent = second(relativeOffsetComponents),
      xAngleOffset = [-Math.sin(xAngle) * Math.sin(yAngle) * secondRelativeOffsetComponent, -Math.cos(xAngle) * secondRelativeOffsetComponent, +Math.sin(xAngle) * Math.cos(yAngle) * secondRelativeOffsetComponent];

  return xAngleOffset;
}

},{"../constants":3,"../maths/vector":26,"../utilities/array":74}],31:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var constants = require('../constants'),
    vectorMaths = require('../maths/vector'),
    arrayUtilities = require('../utilities/array');

var first = arrayUtilities.first,
    second = arrayUtilities.second,
    add2 = vectorMaths.add2,
    scale2 = vectorMaths.scale2,
    subtract2 = vectorMaths.subtract2,
    ANGLES_SCALAR = constants.ANGLES_SCALAR,
    INITIAL_ANGLES = constants.INITIAL_ANGLES,
    INITIAL_MOUSE_COORDINATES = constants.INITIAL_MOUSE_COORDINATES;

var Tilt = function () {
  function Tilt(angles, previousAngles, mouseCoordinates, previousMouseCoordinates) {
    _classCallCheck(this, Tilt);

    this.angles = angles;
    this.previousAngles = previousAngles;
    this.mouseCoordinates = mouseCoordinates;
    this.previousMouseCoordinates = previousMouseCoordinates;
  }

  _createClass(Tilt, [{
    key: 'getXAngle',
    value: function getXAngle() {
      var secondAngle = second(this.angles),
          xAngle = secondAngle; ///

      return xAngle;
    }
  }, {
    key: 'getYAngle',
    value: function getYAngle() {
      var firstAngle = first(this.angles),
          yAngle = -firstAngle; ///

      return yAngle;
    }
  }, {
    key: 'getZAngle',
    value: function getZAngle() {
      var zAngle = 0;

      return zAngle;
    }
  }, {
    key: 'getAngles',
    value: function getAngles() {
      ///
      var xAngle = this.getXAngle(),
          yAngle = this.getYAngle(),
          zAngle = this.getZAngle(),
          angles = [xAngle, yAngle, zAngle];

      return angles;
    }
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler() {
      this.previousAngles = this.angles;
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler() {
      this.previousMouseCoordinates = this.mouseCoordinates;
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler(mouseCoordinates, mouseDown, shiftKeyDown) {
      this.mouseCoordinates = mouseCoordinates;

      if (mouseDown && !shiftKeyDown) {
        this.updateAngles();
      }
    }
  }, {
    key: 'shiftKeyHandler',
    value: function shiftKeyHandler(shiftKeyDown) {
      if (!shiftKeyDown) {
        this.previousAngles = this.angles;

        this.previousMouseCoordinates = this.mouseCoordinates;
      }
    }
  }, {
    key: 'updateAngles',
    value: function updateAngles() {
      var scalar = ANGLES_SCALAR,
          relativeMouseCoordinates = subtract2(this.mouseCoordinates, this.previousMouseCoordinates),
          relativeAngles = scale2(relativeMouseCoordinates, scalar);

      this.angles = add2(this.previousAngles, relativeAngles);
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var angles = INITIAL_ANGLES,
          previousAngles = angles,
          ///
      mouseCoordinates = INITIAL_MOUSE_COORDINATES,
          previousMouseCoordinates = mouseCoordinates,
          ///
      tilt = new Tilt(angles, previousAngles, mouseCoordinates, previousMouseCoordinates);

      return tilt;
    }
  }]);

  return Tilt;
}();

module.exports = Tilt;

},{"../constants":3,"../maths/vector":26,"../utilities/array":74}],32:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var constants = require('../constants');

var DISTANCE_SCALAR = constants.DISTANCE_SCALAR,
    MINIMUM_DISTANCE = constants.MINIMUM_DISTANCE;

var Zoom = function () {
  function Zoom(distance) {
    _classCallCheck(this, Zoom);

    this.distance = distance;
  }

  _createClass(Zoom, [{
    key: 'getDistance',
    value: function getDistance() {
      return this.distance;
    }
  }, {
    key: 'mouseWheelEventHandler',
    value: function mouseWheelEventHandler(delta) {
      var scalar = DISTANCE_SCALAR;

      this.distance -= delta * scalar;

      this.distance = Math.max(MINIMUM_DISTANCE, this.distance);
    }
  }], [{
    key: 'fromInitialDistance',
    value: function fromInitialDistance(initialDistance) {
      var distance = initialDistance,
          ///
      zoom = new Zoom(distance);

      return zoom;
    }
  }]);

  return Zoom;
}();

module.exports = Zoom;

},{"../constants":3}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
'use strict';

function createElementBuffer(data) {
  var _context = this.context,
      ELEMENT_ARRAY_BUFFER = _context.ELEMENT_ARRAY_BUFFER,
      STATIC_DRAW = _context.STATIC_DRAW,
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
  var _context2 = this.context,
      ARRAY_BUFFER = _context2.ARRAY_BUFFER,
      STATIC_DRAW = _context2.STATIC_DRAW,
      target = ARRAY_BUFFER,
      usage = STATIC_DRAW,
      buffer = this.context.createBuffer(),
      float32Array = new Float32Array(data);


  this.context.bindBuffer(target, buffer);

  this.context.bufferData(target, float32Array, usage);

  return buffer;
}

function bindBuffer(buffer, attributeLocation, components) {
  var _context3 = this.context,
      ARRAY_BUFFER = _context3.ARRAY_BUFFER,
      FLOAT = _context3.FLOAT,
      target = ARRAY_BUFFER,
      type = FLOAT,
      normalize = false,
      stride = 0,
      offset = 0;


  this.context.bindBuffer(target, buffer);

  this.context.vertexAttribPointer(attributeLocation, components, type, normalize, stride, offset);

  this.context.enableVertexAttribArray(attributeLocation);
}

module.exports = {
  createElementBuffer: createElementBuffer,
  bindElementBuffer: bindElementBuffer,
  createBuffer: createBuffer,
  bindBuffer: bindBuffer
};

},{}],35:[function(require,module,exports){
'use strict';

var defaultR = 0.0,
    defaultG = 0.0,
    defaultB = 0.0,
    defaultA = 1.0;

function clearColour() {
      var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultR;
      var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultG;
      var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultB;
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultA;
      this.context.clearColor(r, g, b, a);
}

function clearColourBuffer() {
      var COLOR_BUFFER_BIT = this.context.COLOR_BUFFER_BIT,
          mask = COLOR_BUFFER_BIT;


      this.context.clear(mask);
}

module.exports = {
      clearColour: clearColour,
      clearColourBuffer: clearColourBuffer
};

},{}],36:[function(require,module,exports){
'use strict';

var defaultDepth = 1.0;

function clearDepth() {
  var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultDepth;

  this.context.clearDepth(depth);
}

function clearDepthBuffer() {
  var DEPTH_BUFFER_BIT = this.context.DEPTH_BUFFER_BIT,
      mask = DEPTH_BUFFER_BIT;


  this.context.clear(mask);
}

function enableDepthTesting() {
  var _context = this.context,
      DEPTH_TEST = _context.DEPTH_TEST,
      LEQUAL = _context.LEQUAL,
      capacity = DEPTH_TEST,
      depthComparisonFunction = LEQUAL;


  this.context.enable(capacity);

  this.context.depthFunc(depthComparisonFunction);
}

module.exports = {
  clearDepth: clearDepth,
  clearDepthBuffer: clearDepthBuffer,
  enableDepthTesting: enableDepthTesting
};

},{}],37:[function(require,module,exports){
'use strict';

function applyMatrix(uniformLocation, matrix) {
  var transpose = false; ///

  this.context.uniformMatrix4fv(uniformLocation, transpose, matrix);
}

module.exports = {
  applyMatrix: applyMatrix
};

},{}],38:[function(require,module,exports){
'use strict';

function createProgram(vertexShader, fragmentShader) {
  var program = this.context.createProgram();

  this.context.attachShader(program, vertexShader);

  this.context.attachShader(program, fragmentShader);

  this.context.linkProgram(program);

  return program;
}

function useProgram(program) {
  this.context.useProgram(program);
}

module.exports = {
  createProgram: createProgram,
  useProgram: useProgram
};

},{}],39:[function(require,module,exports){
'use strict';

function createShader(type, shaderSource) {
  var COMPILE_STATUS = this.context.COMPILE_STATUS,
      pname = COMPILE_STATUS,
      shader = this.context.createShader(type);


  this.context.shaderSource(shader, shaderSource);

  this.context.compileShader(shader);

  var compileStatus = this.context.getShaderParameter(shader, pname);

  if (!compileStatus) {
    throw new Error('Unable to create the shader.');
  }

  return shader;
}

function createVertexShader(vertexShaderSource, canvas) {
  var VERTEX_SHADER = this.context.VERTEX_SHADER,
      type = VERTEX_SHADER,
      vertexShader = this.createShader(type, vertexShaderSource);


  return vertexShader;
}

function createFragmentShader(fragmentShaderSource, canvas) {
  var FRAGMENT_SHADER = this.context.FRAGMENT_SHADER,
      type = FRAGMENT_SHADER,
      vertexShader = this.createShader(type, fragmentShaderSource);


  return vertexShader;
}

module.exports = {
  createShader: createShader,
  createVertexShader: createVertexShader,
  createFragmentShader: createFragmentShader
};

},{}],40:[function(require,module,exports){
'use strict';

function createTexture(image) {
			var _context = this.context,
			    RGBA = _context.RGBA,
			    LINEAR = _context.LINEAR,
			    UNSIGNED_BYTE = _context.UNSIGNED_BYTE,
			    TEXTURE_2D = _context.TEXTURE_2D,
			    TEXTURE_MIN_FILTER = _context.TEXTURE_MIN_FILTER,
			    target = TEXTURE_2D,
			    level = 0,
			    internalFormat = RGBA,
			    format = RGBA,
			    type = UNSIGNED_BYTE,
			    pname = TEXTURE_MIN_FILTER,
			    param = LINEAR,
			    texture = this.context.createTexture();


			this.context.bindTexture(target, texture);

			this.context.texImage2D(target, level, internalFormat, format, type, image);

			this.context.texParameteri(target, pname, param);
}

function activateTexture(target) {
			this.context.activeTexture(target);
}

module.exports = {
			createTexture: createTexture,
			activateTexture: activateTexture
};

},{}],41:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vectorMaths = require('../maths/vector');

var subtract3 = vectorMaths.subtract3;

var Edge = function () {
  function Edge(position, extent) {
    _classCallCheck(this, Edge);

    this.position = position;
    this.extent = extent;
  }

  _createClass(Edge, [{
    key: 'getPosition',
    value: function getPosition() {
      return this.position;
    }
  }, {
    key: 'getExtent',
    value: function getExtent() {
      return this.extent;
    }
  }, {
    key: 'clone',
    value: function clone() {
      var position = this.position.slice(),
          extent = this.extent.slice(),
          edge = new Edge(position, extent);

      return edge;
    }
  }], [{
    key: 'fromStartVertexAndEndVertex',
    value: function fromStartVertexAndEndVertex(Class, startVertex, endVertex) {
      if (endVertex === undefined) {
        endVertex = startVertex;
        startVertex = Class;
        Class = Edge;
      }

      var startPosition = startVertex.getPosition(),
          endPosition = endVertex.getPosition(),
          position = startPosition.slice(),
          ///
      extent = subtract3(endPosition, startPosition),
          edge = new Class(position, extent);

      return edge;
    }
  }]);

  return Edge;
}();

module.exports = Edge;

},{"../maths/vector":26}],42:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Edge = require('../edge'),
    vectorMaths = require('../../maths/vector'),
    arrayUtilities = require('../../utilities/array'),
    midPointUtilities = require('../../utilities/midPoint');

var third = arrayUtilities.third,
    subtract3 = vectorMaths.subtract3,
    cross3 = vectorMaths.cross3,
    projectMidPointPositionOntoXYPlane = midPointUtilities.projectMidPointPositionOntoXYPlane;

var MaskingEdge = function (_Edge) {
      _inherits(MaskingEdge, _Edge);

      function MaskingEdge() {
            _classCallCheck(this, MaskingEdge);

            return _possibleConstructorReturn(this, (MaskingEdge.__proto__ || Object.getPrototypeOf(MaskingEdge)).apply(this, arguments));
      }

      _createClass(MaskingEdge, [{
            key: 'isMidPointPositionToTheLeft',
            value: function isMidPointPositionToTheLeft(midPointPosition) {
                  midPointPosition = projectMidPointPositionOntoXYPlane(midPointPosition); ///

                  var extent = this.getExtent(),
                      position = this.getPosition(),
                      midPointRelativePosition = subtract3(midPointPosition, position),
                      crossProductComponents = cross3(extent, midPointRelativePosition),
                      ///
                  thirdCrossProductComponent = third(crossProductComponents),
                      midPointPositionToTheLeft = thirdCrossProductComponent > 0;

                  return midPointPositionToTheLeft;
            }
      }, {
            key: 'isMidPointPositionToTheRight',
            value: function isMidPointPositionToTheRight(midPointPosition) {
                  var midPointPositionToTheLeft = this.isMidPointPositionToTheLeft(midPointPosition),
                      midPointPositionToTheRight = !midPointPositionToTheLeft;

                  return midPointPositionToTheRight;
            }
      }], [{
            key: 'fromStartVertexAndEndVertex',
            value: function fromStartVertexAndEndVertex(startVertex, endVertex) {
                  return Edge.fromStartVertexAndEndVertex(MaskingEdge, startVertex, endVertex);
            }
      }]);

      return MaskingEdge;
}(Edge);

module.exports = MaskingEdge;

},{"../../maths/vector":26,"../../utilities/array":74,"../../utilities/midPoint":78,"../edge":41}],43:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Edge = require('./edge'),
    Normal = require('./normal'),
    Vertex = require('./vertex'),
    constants = require('../constants'),
    facetUtilities = require('../utilities/facet'),
    arrayUtilities = require('../utilities/array'),
    midPointUtilities = require('../utilities/midPoint'),
    intersectionUtilities = require('../utilities/intersection');

var VERTICES_LENGTH = constants.VERTICES_LENGTH,
    push = arrayUtilities.push,
    _permute = arrayUtilities.permute,
    calculateEdges = facetUtilities.calculateEdges,
    calculateNormal = facetUtilities.calculateNormal,
    calculateMidPointPosition = midPointUtilities.calculateMidPointPosition,
    isMidPointPositionToOneSideOfMaskingEdges = midPointUtilities.isMidPointPositionToOneSideOfMaskingEdges,
    calculateIntermediateVertexPosition = intersectionUtilities.calculateIntermediateVertexPosition,
    calculateNonNullIntersections = intersectionUtilities.calculateNonNullIntersections,
    calculateNullIntersectionIndex = intersectionUtilities.calculateNullIntersectionIndex,
    calculateNonNullIntersectionIndex = intersectionUtilities.calculateNonNullIntersectionIndex;

var Facet = function () {
  function Facet(vertices, normal, edges) {
    _classCallCheck(this, Facet);

    this.vertices = vertices;
    this.normal = normal;
    this.edges = edges;
  }

  _createClass(Facet, [{
    key: 'getVertices',
    value: function getVertices() {
      return this.vertices;
    }
  }, {
    key: 'getNormal',
    value: function getNormal() {
      return this.normal;
    }
  }, {
    key: 'getEdges',
    value: function getEdges() {
      return this.edges;
    }
  }, {
    key: 'getVertexPositions',
    value: function getVertexPositions() {
      var vertexPositions = this.vertices.map(function (vertex) {
        return vertex.getPosition();
      });

      return vertexPositions;
    }
  }, {
    key: 'getVertexNormals',
    value: function getVertexNormals() {
      var normalExtent = this.normal.getExtent(),
          vertexNormal = normalExtent,
          ///
      vertexNormals = [vertexNormal, vertexNormal, vertexNormal];

      return vertexNormals;
    }
  }, {
    key: 'getVertexIndexes',
    value: function getVertexIndexes(index) {
      ///
      var vertexIndex = index * 3,
          vertexIndexes = [vertexIndex + 0, vertexIndex + 1, vertexIndex + 2];

      return vertexIndexes;
    }
  }, {
    key: 'isMasked',
    value: function isMasked(maskingFacet) {
      var maskingEdges = maskingFacet.getMaskingEdges(),
          midPointPosition = calculateMidPointPosition(this.vertices),
          midPointPositionToOneSideOfMaskingEdges = isMidPointPositionToOneSideOfMaskingEdges(midPointPosition, maskingEdges),
          masked = midPointPositionToOneSideOfMaskingEdges; ///

      return masked;
    }
  }, {
    key: 'permute',
    value: function permute(places) {
      this.vertices = _permute(this.vertices, places);

      this.normal = calculateNormal(this.vertices, Normal);

      this.edges = calculateEdges(this.vertices, Edge);
    }
  }, {
    key: 'rotate',
    value: function rotate(rotationQuaternion) {
      this.vertices.forEach(function (vertex) {
        return vertex.rotate(rotationQuaternion);
      });

      this.normal = calculateNormal(this.vertices, Normal);

      this.edges = calculateEdges(this.vertices, Edge);
    }
  }, {
    key: 'applyTransform',
    value: function applyTransform(transform) {
      this.vertices.forEach(function (vertex) {
        return vertex.applyTransform(transform);
      });

      this.normal = calculateNormal(this.vertices, Normal);

      this.edges = calculateEdges(this.vertices, Edge);
    }
  }, {
    key: 'splitWithIntersections',
    value: function splitWithIntersections(intersections, smallerFacets) {
      var nonNullIntersections = calculateNonNullIntersections(intersections),
          nonNullIntersectionsLength = nonNullIntersections.length;

      switch (nonNullIntersectionsLength) {
        case 2:
          this.splitWithTwoNonNullIntersections(intersections, smallerFacets);
          break;

        case 1:
          this.splitWithOneNonNullIntersection(intersections, smallerFacets);
          break;

        case 0:
          this.splitWithNoNonNullIntersections(intersections, smallerFacets);
          break;
      }
    }
  }, {
    key: 'splitWithTwoNonNullIntersections',
    value: function splitWithTwoNonNullIntersections(intersections, smallerFacets) {
      var nullIntersectionIndex = calculateNullIntersectionIndex(intersections),
          places = (VERTICES_LENGTH - nullIntersectionIndex) % VERTICES_LENGTH;

      intersections = _permute(intersections, places);

      intersections = intersections.slice(1); ///

      this.permute(places);

      var startVertexPositionIndexes = [1, 2],
          endVertexPositionIndexes = [2, 0],
          indexTuples = [[0, 1, 3], [3, 4, 0], [3, 2, 4]];

      this.splitWithIndexTuplesAndIntersections(startVertexPositionIndexes, endVertexPositionIndexes, indexTuples, intersections, smallerFacets);
    }
  }, {
    key: 'splitWithOneNonNullIntersection',
    value: function splitWithOneNonNullIntersection(intersections, smallerFacets) {
      var nonNullIntersectionIndex = calculateNonNullIntersectionIndex(intersections),
          places = (VERTICES_LENGTH - nonNullIntersectionIndex) % VERTICES_LENGTH;

      intersections = _permute(intersections, places);

      intersections = intersections.slice(0, 1); ///

      this.permute(places);

      var startVertexPositionIndexes = [0],
          endVertexPositionIndexes = [1],
          indexTuples = [[0, 3, 2], [3, 1, 2]];

      this.splitWithIndexTuplesAndIntersections(startVertexPositionIndexes, endVertexPositionIndexes, indexTuples, intersections, smallerFacets);
    }
  }, {
    key: 'splitWithNoNonNullIntersections',
    value: function splitWithNoNonNullIntersections(intersections, smallerFacets) {
      var smallerFacet = this.fromVertices(this.vertices); ///

      smallerFacets.push(smallerFacet);
    }
  }, {
    key: 'splitWithIndexTuplesAndIntersections',
    value: function splitWithIndexTuplesAndIntersections(startVertexPositionIndexes, endVertexPositionIndexes, indexTuples, intersections, smallerFacets) {
      var _this = this;

      var vertexPositions = this.getVertexPositions(),
          intermediateVertexPositions = intersections.map(function (intersection, index) {
        var startVertexPositionIndex = startVertexPositionIndexes[index],
            endVertexPositionIndex = endVertexPositionIndexes[index],
            startVertexPosition = vertexPositions[startVertexPositionIndex],
            endVertexPosition = vertexPositions[endVertexPositionIndex],
            intermediateVertexPosition = calculateIntermediateVertexPosition(startVertexPosition, endVertexPosition, intersection);

        return intermediateVertexPosition;
      });

      push(vertexPositions, intermediateVertexPositions);

      indexTuples.forEach(function (indexTuple) {
        var positions = vertexPositions,
            ///
        indexes = indexTuple,
            ///
        facet = _this,
            smallerFacet = smallerFacetFromPositionsIndexesAndFacet(positions, indexes, facet);

        if (smallerFacet !== null) {
          smallerFacets.push(smallerFacet);
        }
      });
    }
  }]);

  return Facet;
}();

module.exports = Facet;

function smallerFacetFromPositionsIndexesAndFacet(positions, indexes, facet) {
  var vertices = indexes.map(function (index) {
    var position = positions[index];

    position = position.slice(); ///

    var vertex = Vertex.fromPosition(position);

    return vertex;
  }),
      smallerFacet = facet.fromVertices(vertices);

  return smallerFacet;
}

},{"../constants":3,"../utilities/array":74,"../utilities/facet":76,"../utilities/intersection":77,"../utilities/midPoint":78,"./edge":41,"./normal":47,"./vertex":48}],44:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Edge = require('../edge'),
    Facet = require('../facet'),
    Normal = require('../normal'),
    Vertex = require('../vertex'),
    facetUtilities = require('../../utilities/facet'),
    verticesUtilities = require('../../utilities/vertices'),
    approximateUtilities = require('../../utilities/approximate');

var isApproximatelyEqualToZero = approximateUtilities.isApproximatelyEqualToZero,
    verticesFromCoordinateTuplesAndIndexTuple = verticesUtilities.verticesFromCoordinateTuplesAndIndexTuple,
    cloneEdges = facetUtilities.cloneEdges,
    cloneNormal = facetUtilities.cloneNormal,
    cloneVertices = facetUtilities.cloneVertices,
    calculateArea = facetUtilities.calculateArea,
    calculateEdges = facetUtilities.calculateEdges,
    calculateNormal = facetUtilities.calculateNormal;

var ColouredFacet = function (_Facet) {
  _inherits(ColouredFacet, _Facet);

  function ColouredFacet(vertices, normal, edges, rgba) {
    _classCallCheck(this, ColouredFacet);

    var _this = _possibleConstructorReturn(this, (ColouredFacet.__proto__ || Object.getPrototypeOf(ColouredFacet)).call(this, vertices, normal, edges));

    _this.rgba = rgba;
    return _this;
  }

  _createClass(ColouredFacet, [{
    key: 'clone',
    value: function clone() {
      var vertices = this.getVertices(),
          normal = this.getNormal(),
          edges = this.getEdges();

      vertices = cloneVertices(vertices);
      normal = cloneNormal(normal);
      edges = cloneEdges(edges);

      var rgba = this.rgba,
          colouredFacet = new ColouredFacet(vertices, normal, edges, rgba);

      return colouredFacet;
    }
  }, {
    key: 'getVertexColours',
    value: function getVertexColours() {
      var vertexColour = this.rgba,
          ///
      vertexColours = [vertexColour, vertexColour, vertexColour];

      return vertexColours;
    }
  }, {
    key: 'fromVertices',
    value: function fromVertices(vertices) {
      var colouredFacet = null;

      var area = calculateArea(vertices),
          areaApproximatelyEqualToZero = isApproximatelyEqualToZero(area),
          largeEnough = !areaApproximatelyEqualToZero; ///

      if (largeEnough) {
        var rgba = this.rgba,
            normal = calculateNormal(vertices, Normal),
            edges = calculateEdges(vertices, Edge);

        colouredFacet = new ColouredFacet(vertices, normal, edges, rgba);
      }

      return colouredFacet;
    }
  }], [{
    key: 'fromCoordinateTuplesIndexTupleAndColour',
    value: function fromCoordinateTuplesIndexTupleAndColour(coordinateTuples, indexTuple, colour) {
      var colouredFacet = null;

      var vertices = verticesFromCoordinateTuplesAndIndexTuple(coordinateTuples, indexTuple, Vertex),
          area = calculateArea(vertices),
          areaApproximatelyEqualToZero = isApproximatelyEqualToZero(area),
          largeEnough = !areaApproximatelyEqualToZero; ///

      if (largeEnough) {
        var normal = calculateNormal(vertices, Normal),
            edges = calculateEdges(vertices, Edge),
            rgba = [].concat(_toConsumableArray(colour), [1]); ///

        colouredFacet = new ColouredFacet(vertices, normal, edges, rgba);
      }

      return colouredFacet;
    }
  }]);

  return ColouredFacet;
}(Facet);

module.exports = ColouredFacet;

},{"../../utilities/approximate":73,"../../utilities/facet":76,"../../utilities/vertices":83,"../edge":41,"../facet":43,"../normal":47,"../vertex":48}],45:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Edge = require('../edge'),
    Facet = require('../facet'),
    Normal = require('../normal'),
    Vertex = require('../vertex'),
    arrayUtilities = require('../../utilities/array'),
    facetUtilities = require('../../utilities/facet'),
    textureUtilities = require('../../utilities/texture'),
    verticesUtilities = require('../../utilities/vertices'),
    approximateUtilities = require('../../utilities/approximate');

var _permute = arrayUtilities.permute,
    isApproximatelyEqualToZero = approximateUtilities.isApproximatelyEqualToZero,
    verticesFromCoordinateTuplesAndIndexTuple = verticesUtilities.verticesFromCoordinateTuplesAndIndexTuple,
    cloneEdges = facetUtilities.cloneEdges,
    cloneNormal = facetUtilities.cloneNormal,
    cloneVertices = facetUtilities.cloneVertices,
    calculateArea = facetUtilities.calculateArea,
    calculateEdges = facetUtilities.calculateEdges,
    calculateNormal = facetUtilities.calculateNormal,
    cloneTextureCoordinatesTuple = textureUtilities.cloneTextureCoordinatesTuple,
    calculateVertexTextureCoordinatesTuple = textureUtilities.calculateVertexTextureCoordinatesTuple,
    calculateAdjustedTextureCoordinatesTuple = textureUtilities.calculateAdjustedTextureCoordinatesTuple;

var TexturedFacet = function (_Facet) {
  _inherits(TexturedFacet, _Facet);

  function TexturedFacet(vertices, normal, edges, imageName, textureCoordinatesTuple) {
    _classCallCheck(this, TexturedFacet);

    var _this = _possibleConstructorReturn(this, (TexturedFacet.__proto__ || Object.getPrototypeOf(TexturedFacet)).call(this, vertices, normal, edges));

    _this.imageName = imageName;

    _this.textureCoordinatesTuple = textureCoordinatesTuple;
    return _this;
  }

  _createClass(TexturedFacet, [{
    key: 'clone',
    value: function clone() {
      var vertices = this.getVertices(),
          normal = this.getNormal(),
          edges = this.getEdges();

      vertices = cloneVertices(vertices);
      normal = cloneNormal(normal);
      edges = cloneEdges(edges);

      var imageName = this.imageName,
          textureCoordinatesTuple = cloneTextureCoordinatesTuple(this.textureCoordinatesTuple),
          texturedFacet = new TexturedFacet(vertices, normal, edges, imageName, textureCoordinatesTuple);

      return texturedFacet;
    }
  }, {
    key: 'getImageName',
    value: function getImageName() {
      return this.imageName;
    }
  }, {
    key: 'getTextureCoordinates',
    value: function getTextureCoordinates() {
      return this.textureCoordinatesTuple;
    }
  }, {
    key: 'getVertexTextureCoordinatesTuple',
    value: function getVertexTextureCoordinatesTuple(imageMapJSON) {
      var json = imageMapJSON[this.imageName],
          extent = json,
          left = extent.left,
          bottom = extent.bottom,
          width = extent.width,
          height = extent.height,
          vertexTextureCoordinatesTuple = calculateVertexTextureCoordinatesTuple(this.textureCoordinatesTuple, left, bottom, width, height);


      return vertexTextureCoordinatesTuple;
    }
  }, {
    key: 'permute',
    value: function permute(places) {
      _get(TexturedFacet.prototype.__proto__ || Object.getPrototypeOf(TexturedFacet.prototype), 'permute', this).call(this, places);

      this.textureCoordinatesTuple = _permute(this.textureCoordinatesTuple, places);
    }
  }, {
    key: 'fromVertices',
    value: function fromVertices(vertices) {
      var texturedFacet = null;

      var area = calculateArea(vertices),
          areaApproximatelyEqualToZero = isApproximatelyEqualToZero(area),
          largeEnough = !areaApproximatelyEqualToZero; ///

      if (largeEnough) {
        var normal = calculateNormal(vertices, Normal),
            parentVertices = this.vertices,
            ///
        adjustedTextureCoordinatesTuple = calculateAdjustedTextureCoordinatesTuple(vertices, normal, parentVertices, this.textureCoordinatesTuple),
            edges = calculateEdges(vertices, Edge),
            imageName = this.imageName,
            textureCoordinatesTuple = adjustedTextureCoordinatesTuple; ///

        texturedFacet = new TexturedFacet(vertices, normal, edges, imageName, textureCoordinatesTuple);
      }

      return texturedFacet;
    }
  }], [{
    key: 'fromTextureCoordinateTupleCoordinatesTuplesIndexTupleAndImageName',
    value: function fromTextureCoordinateTupleCoordinatesTuplesIndexTupleAndImageName(textureCoordinatesTuple, coordinateTuples, indexTuple, imageName) {
      var texturedFacet = null;

      var vertices = verticesFromCoordinateTuplesAndIndexTuple(coordinateTuples, indexTuple, Vertex),
          area = calculateArea(vertices),
          areaApproximatelyEqualToZero = isApproximatelyEqualToZero(area),
          largeEnough = !areaApproximatelyEqualToZero; ///

      if (largeEnough) {
        var normal = calculateNormal(vertices, Normal),
            edges = calculateEdges(vertices, Edge);

        texturedFacet = new TexturedFacet(vertices, normal, edges, imageName, textureCoordinatesTuple);
      }

      return texturedFacet;
    }
  }]);

  return TexturedFacet;
}(Facet);

module.exports = TexturedFacet;

},{"../../utilities/approximate":73,"../../utilities/array":74,"../../utilities/facet":76,"../../utilities/texture":81,"../../utilities/vertices":83,"../edge":41,"../facet":43,"../normal":47,"../vertex":48}],46:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var constants = require('../constants'),
    MaskingEdge = require('./edge/masking'),
    VerticalLine = require('./verticalLine'),
    arrayUtilities = require('../utilities/array'),
    verticesUtilities = require('../utilities/vertices'),
    quaternionUtilities = require('../utilities/quaternion');

var VERTICES_LENGTH = constants.VERTICES_LENGTH,
    push = arrayUtilities.push,
    separate = arrayUtilities.separate,
    rotateVertices = verticesUtilities.rotateVertices,
    calculateArbitraryRotationQuaternion = quaternionUtilities.calculateArbitraryRotationQuaternion,
    calculateForwardsRotationQuaternion = quaternionUtilities.calculateForwardsRotationQuaternion,
    calculateBackwardsRotationQuaternion = quaternionUtilities.calculateBackwardsRotationQuaternion;

var MaskingFacet = function () {
  function MaskingFacet(maskingEdges, verticalLines, forwardsRotationQuaternion, backwardsRotationQuaternion) {
    _classCallCheck(this, MaskingFacet);

    this.maskingEdges = maskingEdges;
    this.verticalLines = verticalLines;
    this.forwardsRotationQuaternion = forwardsRotationQuaternion;
    this.backwardsRotationQuaternion = backwardsRotationQuaternion;
  }

  _createClass(MaskingFacet, [{
    key: 'getMaskingEdges',
    value: function getMaskingEdges() {
      return this.maskingEdges;
    }
  }, {
    key: 'getVerticalLines',
    value: function getVerticalLines() {
      return this.verticalLines;
    }
  }, {
    key: 'getForwardsRotationQuaternion',
    value: function getForwardsRotationQuaternion() {
      return this.forwardsRotationQuaternion;
    }
  }, {
    key: 'getBackwardsRotationQuaternion',
    value: function getBackwardsRotationQuaternion() {
      return this.backwardsRotationQuaternion;
    }
  }, {
    key: 'maskFacet',
    value: function maskFacet(facet, unmaskedFacets) {
      var _this = this;

      var unmaskedFacet = facet.clone(); ///

      facet.rotate(this.forwardsRotationQuaternion);

      var maskingFacet = this,
          ///
      smallerFacets = this.splitFacet(facet),
          maskedSmallerFacets = [],
          unmaskedSmallerFacets = [];

      separate(smallerFacets, maskedSmallerFacets, unmaskedSmallerFacets, function (smallerFacet) {
        var smallerFacetMasked = smallerFacet.isMasked(maskingFacet);

        return smallerFacetMasked;
      });

      var maskedSmallerFacetsLength = maskedSmallerFacets.length;

      if (maskedSmallerFacetsLength === 0) {
        unmaskedFacets.push(unmaskedFacet);
      } else {
        unmaskedSmallerFacets.forEach(function (unmaskedSmallerFacet) {
          unmaskedSmallerFacet.rotate(_this.backwardsRotationQuaternion);
        });

        push(unmaskedFacets, unmaskedSmallerFacets);
      }
    }
  }, {
    key: 'splitFacet',
    value: function splitFacet(facet) {
      var facets = [facet],
          smallerFacets = facets; ///

      this.verticalLines.forEach(function (verticalLine) {
        smallerFacets = verticalLine.splitFacets(facets);

        facets = smallerFacets; ///
      });

      return smallerFacets;
    }
  }], [{
    key: 'fromFacet',
    value: function fromFacet(facet) {
      var facetNormal = facet.getNormal(),
          facetVertices = facet.getVertices(),
          normal = facetNormal,
          ///
      arbitraryRotationQuaternion = calculateArbitraryRotationQuaternion(normal),
          rotationQuaternion = arbitraryRotationQuaternion,
          ///
      vertices = rotateVertices(facetVertices, rotationQuaternion),
          maskingEdges = calculateMaskingEdges(vertices),
          verticalLines = maskingEdges.map(function (maskingEdge) {
        var verticalLine = VerticalLine.fromMaskingEdge(maskingEdge);

        return verticalLine;
      }),
          forwardsRotationQuaternion = calculateForwardsRotationQuaternion(rotationQuaternion),
          backwardsRotationQuaternion = calculateBackwardsRotationQuaternion(rotationQuaternion),
          maskingFacet = new MaskingFacet(maskingEdges, verticalLines, forwardsRotationQuaternion, backwardsRotationQuaternion);

      return maskingFacet;
    }
  }]);

  return MaskingFacet;
}();

module.exports = MaskingFacet;

function calculateMaskingEdges(vertices) {
  var maskingEdges = vertices.map(function (vertex, index) {
    var startIndex = index,
        endIndex = (startIndex + 1) % VERTICES_LENGTH,
        startVertex = vertices[startIndex],
        endVertex = vertices[endIndex],
        maskingEdge = MaskingEdge.fromStartVertexAndEndVertex(startVertex, endVertex);

    return maskingEdge;
  });

  return maskingEdges;
}

},{"../constants":3,"../utilities/array":74,"../utilities/quaternion":79,"../utilities/vertices":83,"./edge/masking":42,"./verticalLine":49}],47:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vectorMaths = require('../maths/vector'),
    arrayUtilities = require('../utilities/array');

var first = arrayUtilities.first,
    second = arrayUtilities.second,
    third = arrayUtilities.third,
    normalise3 = vectorMaths.normalise3,
    subtract3 = vectorMaths.subtract3,
    cross3 = vectorMaths.cross3;

var Normal = function () {
  function Normal(extent) {
    _classCallCheck(this, Normal);

    this.extent = extent;
  }

  _createClass(Normal, [{
    key: 'clone',
    value: function clone() {
      var extent = cloneExtent(this.extent),
          normal = new Normal(extent);

      return normal;
    }
  }, {
    key: 'getExtent',
    value: function getExtent() {
      return this.extent;
    }
  }], [{
    key: 'fromVertices',
    value: function fromVertices(vertices) {
      var firstVertex = first(vertices),
          secondVertex = second(vertices),
          thirdVertex = third(vertices),
          firstPosition = firstVertex.getPosition(),
          secondPosition = secondVertex.getPosition(),
          thirdPosition = thirdVertex.getPosition(),
          firstExtent = subtract3(secondPosition, firstPosition),
          secondExtent = subtract3(thirdPosition, firstPosition),
          extent = normalise3(cross3(firstExtent, secondExtent)),
          normal = new Normal(extent);

      return normal;
    }
  }]);

  return Normal;
}();

module.exports = Normal;

function cloneExtent(extent) {
  return extent.slice();
}

},{"../maths/vector":26,"../utilities/array":74}],48:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rotationUtilities = require('../utilities/rotation');

var rotatePosition = rotationUtilities.rotatePosition;

var Vertex = function () {
  function Vertex(position) {
    _classCallCheck(this, Vertex);

    this.position = position;
  }

  _createClass(Vertex, [{
    key: 'getPosition',
    value: function getPosition() {
      return this.position;
    }
  }, {
    key: 'clone',
    value: function clone() {
      var position = this.position.slice(),
          ///
      vertex = new Vertex(position);

      return vertex;
    }
  }, {
    key: 'rotate',
    value: function rotate(rotationQuaternion) {
      this.position = rotatePosition(this.position, rotationQuaternion);
    }
  }, {
    key: 'applyTransform',
    value: function applyTransform(transform) {
      this.position = transform(this.position);
    }
  }], [{
    key: 'fromPosition',
    value: function fromPosition(position) {
      var vertex = new Vertex(position);

      return vertex;
    }
  }, {
    key: 'fromCoordinateTuple',
    value: function fromCoordinateTuple(coordinateTuple) {
      var position = coordinateTuple.slice(),
          ///
      vertex = new Vertex(position);

      return vertex;
    }
  }]);

  return Vertex;
}();

module.exports = Vertex;

},{"../utilities/rotation":80}],49:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arrayUtilities = require('../utilities/array'),
    rotationUtilities = require('../utilities/rotation'),
    quaternionUtilities = require('../utilities/quaternion'),
    intersectionUtilities = require('../utilities/intersection');

var first = arrayUtilities.first,
    rotatePosition = rotationUtilities.rotatePosition,
    calculateIntersection = intersectionUtilities.calculateIntersection,
    calculateRotationAboutZAxisQuaternion = quaternionUtilities.calculateRotationAboutZAxisQuaternion,
    calculateForwardsRotationQuaternion = quaternionUtilities.calculateForwardsRotationQuaternion,
    calculateBackwardsRotationQuaternion = quaternionUtilities.calculateBackwardsRotationQuaternion;

var VerticalLine = function () {
  function VerticalLine(firstPositionComponent, forwardsRotationQuaternion, backwardsRotationQuaternion) {
    _classCallCheck(this, VerticalLine);

    this.firstPositionComponent = firstPositionComponent;
    this.forwardsRotationQuaternion = forwardsRotationQuaternion;
    this.backwardsRotationQuaternion = backwardsRotationQuaternion;
  }

  _createClass(VerticalLine, [{
    key: 'getFirstPositionComponent',
    value: function getFirstPositionComponent() {
      return this.firstPositionComponent;
    }
  }, {
    key: 'getForwardsRotationQuaternion',
    value: function getForwardsRotationQuaternion() {
      return this.forwardsRotationQuaternion;
    }
  }, {
    key: 'getBackwardsRotationQuaternion',
    value: function getBackwardsRotationQuaternion() {
      return this.backwardsRotationQuaternion;
    }
  }, {
    key: 'splitFacet',
    value: function splitFacet(facet, smallerFacets) {
      var _this = this;

      var edges = facet.getEdges(),
          intersections = edges.map(function (edge) {
        var intersection = calculateIntersection(edge, _this.firstPositionComponent);

        return intersection;
      });

      facet.splitWithIntersections(intersections, smallerFacets);
    }
  }, {
    key: 'splitFacets',
    value: function splitFacets(facets) {
      var _this2 = this;

      var smallerFacets = [];

      facets.forEach(function (facet) {
        facet.rotate(_this2.forwardsRotationQuaternion);

        _this2.splitFacet(facet, smallerFacets);
      });

      smallerFacets.forEach(function (smallerFacet) {
        return smallerFacet.rotate(_this2.backwardsRotationQuaternion);
      });

      return smallerFacets;
    }
  }], [{
    key: 'fromMaskingEdge',
    value: function fromMaskingEdge(maskingEdge) {
      var maskingEdgePosition = maskingEdge.getPosition(),
          rotationAboutZAxisQuaternion = calculateRotationAboutZAxisQuaternion(maskingEdge),
          rotationQuaternion = rotationAboutZAxisQuaternion,
          ///
      forwardsRotationQuaternion = calculateForwardsRotationQuaternion(rotationQuaternion),
          backwardsRotationQuaternion = calculateBackwardsRotationQuaternion(rotationQuaternion),
          position = rotatePosition(maskingEdgePosition, rotationQuaternion),
          positionComponents = position,
          ///
      firstPositionComponent = first(positionComponents),
          verticalLine = new VerticalLine(firstPositionComponent, forwardsRotationQuaternion, backwardsRotationQuaternion);

      return verticalLine;
    }
  }]);

  return VerticalLine;
}();

module.exports = VerticalLine;

},{"../utilities/array":74,"../utilities/intersection":77,"../utilities/quaternion":79,"../utilities/rotation":80}],50:[function(require,module,exports){
'use strict';

var Element = require('./element'),
    CanvasElement = require('./element/canvas'),
    arrayUtilities = require('./utilities/array'),
    FunctionCanvasElement = require('./element/canvas/function');

var guarantee = arrayUtilities.guarantee;


function createElement(firstArgument, properties) {
  for (var _len = arguments.length, childElements = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    childElements[_key - 2] = arguments[_key];
  }

  properties = properties || {}; ///

  var element = void 0;

  if (firstArgument instanceof CanvasElement) {
    element = firstArgument; ///
  } else if (isSubclassOf(firstArgument, Element)) {
    var Class = firstArgument; ///

    Object.assign(properties, {
      childElements: childElements
    });

    element = Class.fromProperties(properties);
  } else if (typeof firstArgument === 'function') {
    var func = firstArgument,
        ///
    _childElements = guarantee(func(properties));

    Object.assign(properties, {
      childElements: _childElements
    });

    element = FunctionCanvasElement.fromProperties(properties);
  }

  return element;
}

var React = {
  createElement: createElement
};

module.exports = React;

function isSubclassOf(argument, Class) {
  var typeOf = false;

  if (argument.name === Class.name) {
    ///
    typeOf = true;
  } else {
    argument = Object.getPrototypeOf(argument); ///

    if (argument) {
      typeOf = isSubclassOf(argument, Class);
    }
  }

  return typeOf;
}

},{"./element":4,"./element/canvas":6,"./element/canvas/function":8,"./utilities/array":74}],51:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer(program, rendererData, rendererBuffers, uniformLocations, attributeLocations) {
    _classCallCheck(this, Renderer);

    this.program = program;
    this.rendererData = rendererData;
    this.rendererBuffers = rendererBuffers;
    this.uniformLocations = uniformLocations;
    this.attributeLocations = attributeLocations;
  }

  _createClass(Renderer, [{
    key: 'getProgram',
    value: function getProgram() {
      return this.program;
    }
  }, {
    key: 'getRendererData',
    value: function getRendererData() {
      return this.rendererData;
    }
  }, {
    key: 'getRendererBuffers',
    value: function getRendererBuffers() {
      return this.rendererBuffers;
    }
  }, {
    key: 'getUniformLocations',
    value: function getUniformLocations() {
      return this.uniformLocations;
    }
  }, {
    key: 'getAttributeLocations',
    value: function getAttributeLocations() {
      return this.attributeLocations;
    }
  }, {
    key: 'getCount',
    value: function getCount() {
      return this.rendererData.getCount();
    }
  }, {
    key: 'getOffsetMatrixUniformLocation',
    value: function getOffsetMatrixUniformLocation() {
      return this.uniformLocations.getOffsetMatrixUniformLocation();
    }
  }, {
    key: 'getRotationMatrixUniformLocation',
    value: function getRotationMatrixUniformLocation() {
      return this.uniformLocations.getRotationMatrixUniformLocation();
    }
  }, {
    key: 'getPositionMatrixUniformLocation',
    value: function getPositionMatrixUniformLocation() {
      return this.uniformLocations.getPositionMatrixUniformLocation();
    }
  }, {
    key: 'getProjectionMatrixUniformLocation',
    value: function getProjectionMatrixUniformLocation() {
      return this.uniformLocations.getProjectionMatrixUniformLocation();
    }
  }, {
    key: 'getNormalMatrixUniformLocation',
    value: function getNormalMatrixUniformLocation() {
      return this.uniformLocations.getNormalMatrixUniformLocation();
    }
  }, {
    key: 'getVertexPositionAttributeLocation',
    value: function getVertexPositionAttributeLocation() {
      return this.attributeLocations.getVertexPositionAttributeLocation();
    }
  }, {
    key: 'getVertexNormalAttributeLocation',
    value: function getVertexNormalAttributeLocation() {
      return this.attributeLocations.getVertexNormalAttributeLocation();
    }
  }, {
    key: 'addVertexPositions',
    value: function addVertexPositions(vertexPositions) {
      this.rendererData.addVertexPositions(vertexPositions);
    }
  }, {
    key: 'addVertexNormals',
    value: function addVertexNormals(vertexNormals) {
      this.rendererData.addVertexNormals(vertexNormals);
    }
  }, {
    key: 'addVertexIndexes',
    value: function addVertexIndexes(vertexIndexes) {
      this.rendererData.addVertexIndexes(vertexIndexes);
    }
  }]);

  return Renderer;
}();

function createProgram(vertexShaderSource, fragmentShaderSource, canvas) {
  var vertexShader = canvas.createVertexShader(vertexShaderSource),
      fragmentShader = canvas.createFragmentShader(fragmentShaderSource),
      program = canvas.createProgram(vertexShader, fragmentShader);

  return program;
}

Object.assign(Renderer, {
  createProgram: createProgram
});

module.exports = Renderer;

},{}],52:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vertexNormalComponents = 3,
    vertexPositionComponents = 3;

var RendererBuffers = function () {
  function RendererBuffers(vertexPositionsBuffer, vertexNormalsBuffer, vertexIndexesElementBuffer) {
    _classCallCheck(this, RendererBuffers);

    this.vertexPositionsBuffer = vertexPositionsBuffer;
    this.vertexNormalsBuffer = vertexNormalsBuffer;
    this.vertexIndexesElementBuffer = vertexIndexesElementBuffer;
  }

  _createClass(RendererBuffers, [{
    key: 'createVertexPositionsBuffer',
    value: function createVertexPositionsBuffer(vertexPositionsData, canvas) {
      this.vertexPositionsBuffer = canvas.createBuffer(vertexPositionsData);
    }
  }, {
    key: 'createVertexNormalsBuffer',
    value: function createVertexNormalsBuffer(vertexNormalsData, canvas) {
      this.vertexNormalsBuffer = canvas.createBuffer(vertexNormalsData);
    }
  }, {
    key: 'createVertexIndexesElementBuffer',
    value: function createVertexIndexesElementBuffer(vertexIndexesData, canvas) {
      this.vertexIndexesElementBuffer = canvas.createElementBuffer(vertexIndexesData);
    }
  }, {
    key: 'bindVertexNormalsBuffer',
    value: function bindVertexNormalsBuffer(vertexNormalAttributeLocation, canvas) {
      canvas.bindBuffer(this.vertexNormalsBuffer, vertexNormalAttributeLocation, vertexNormalComponents);
    }
  }, {
    key: 'bindVertexPositionsBuffer',
    value: function bindVertexPositionsBuffer(vertexPositionAttributeLocation, canvas) {
      canvas.bindBuffer(this.vertexPositionsBuffer, vertexPositionAttributeLocation, vertexPositionComponents);
    }
  }, {
    key: 'bindVertexIndexesElementBuffer',
    value: function bindVertexIndexesElementBuffer(canvas) {
      canvas.bindElementBuffer(this.vertexIndexesElementBuffer);
    }
  }, {
    key: 'createBuffers',
    value: function createBuffers(vertexPositionsData, vertexNormalsData, vertexIndexesData, canvas) {
      this.createVertexPositionsBuffer(vertexPositionsData, canvas);
      this.createVertexNormalsBuffer(vertexNormalsData, canvas);
      this.createVertexIndexesElementBuffer(vertexIndexesData, canvas);
    }
  }, {
    key: 'bindBuffers',
    value: function bindBuffers(vertexNormalAttributeLocation, vertexPositionAttributeLocation, canvas) {
      this.bindVertexNormalsBuffer(vertexNormalAttributeLocation, canvas);
      this.bindVertexPositionsBuffer(vertexPositionAttributeLocation, canvas);
      this.bindVertexIndexesElementBuffer(canvas);
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing(Class) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        remainingArguments[_key - 1] = arguments[_key];
      }

      var vertexPositionsBuffer = null,
          ///
      vertexNormalsBuffer = null,
          ///
      vertexIndexesElementBuffer = null,
          ///
      rendererBuffers = new (Function.prototype.bind.apply(Class, [null].concat([vertexPositionsBuffer, vertexNormalsBuffer, vertexIndexesElementBuffer], remainingArguments)))();

      return rendererBuffers;
    }
  }]);

  return RendererBuffers;
}();

module.exports = RendererBuffers;

},{}],53:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RendererBuffers = require('../../renderer/buffers');

var vertexColourComponents = 4;

var ColourRendererBuffers = function (_RendererBuffers) {
  _inherits(ColourRendererBuffers, _RendererBuffers);

  function ColourRendererBuffers(vertexPositionsBuffer, vertexNormalsBuffer, vertexIndexesElementBuffer, vertexColoursBuffer) {
    _classCallCheck(this, ColourRendererBuffers);

    var _this = _possibleConstructorReturn(this, (ColourRendererBuffers.__proto__ || Object.getPrototypeOf(ColourRendererBuffers)).call(this, vertexPositionsBuffer, vertexNormalsBuffer, vertexIndexesElementBuffer));

    _this.vertexColoursBuffer = vertexColoursBuffer;
    return _this;
  }

  _createClass(ColourRendererBuffers, [{
    key: 'getVertexColoursBuffer',
    value: function getVertexColoursBuffer() {
      return this.vertexColoursBuffer;
    }
  }, {
    key: 'createVertexColoursBuffer',
    value: function createVertexColoursBuffer(vertexColoursData, canvas) {
      this.vertexColoursBuffer = canvas.createBuffer(vertexColoursData);
    }
  }, {
    key: 'bindVertexColoursBuffer',
    value: function bindVertexColoursBuffer(vertexColourAttributeLocation, canvas) {
      canvas.bindBuffer(this.vertexColoursBuffer, vertexColourAttributeLocation, vertexColourComponents);
    }
  }, {
    key: 'createBuffers',
    value: function createBuffers(vertexPositionsData, vertexNormalsData, vertexIndexesData, vertexColoursData, canvas) {
      _get(ColourRendererBuffers.prototype.__proto__ || Object.getPrototypeOf(ColourRendererBuffers.prototype), 'createBuffers', this).call(this, vertexPositionsData, vertexNormalsData, vertexIndexesData, canvas);

      this.createVertexColoursBuffer(vertexColoursData, canvas);
    }
  }, {
    key: 'bindBuffers',
    value: function bindBuffers(vertexNormalAttributeLocation, vertexPositionAttributeLocation, vertexColourAttributeLocation, canvas) {
      _get(ColourRendererBuffers.prototype.__proto__ || Object.getPrototypeOf(ColourRendererBuffers.prototype), 'bindBuffers', this).call(this, vertexNormalAttributeLocation, vertexPositionAttributeLocation, canvas);

      this.bindVertexColoursBuffer(vertexColourAttributeLocation, canvas);
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var vertexColoursBuffer = null,
          ///
      colourRendererBuffers = RendererBuffers.fromNothing(ColourRendererBuffers, vertexColoursBuffer);

      return colourRendererBuffers;
    }
  }]);

  return ColourRendererBuffers;
}(RendererBuffers);

module.exports = ColourRendererBuffers;

},{"../../renderer/buffers":52}],54:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RendererBuffers = require('../../renderer/buffers');

var textureCoordinateComponents = 2;

var TextureRendererBuffers = function (_RendererBuffers) {
  _inherits(TextureRendererBuffers, _RendererBuffers);

  function TextureRendererBuffers(vertexPositionsBuffer, vertexNormalsBuffer, vertexIndexesElementBuffer, textureCoordinatesBuffer) {
    _classCallCheck(this, TextureRendererBuffers);

    var _this = _possibleConstructorReturn(this, (TextureRendererBuffers.__proto__ || Object.getPrototypeOf(TextureRendererBuffers)).call(this, vertexPositionsBuffer, vertexNormalsBuffer, vertexIndexesElementBuffer));

    _this.textureCoordinatesBuffer = textureCoordinatesBuffer;
    return _this;
  }

  _createClass(TextureRendererBuffers, [{
    key: 'getTextureCoordinatesBuffer',
    value: function getTextureCoordinatesBuffer() {
      return this.textureCoordinatesBuffer;
    }
  }, {
    key: 'createTextureCoordinatesBuffer',
    value: function createTextureCoordinatesBuffer(textureCoordinatesData, canvas) {
      this.textureCoordinatesBuffer = canvas.createBuffer(textureCoordinatesData);
    }
  }, {
    key: 'bindTextureCoordinatesBuffer',
    value: function bindTextureCoordinatesBuffer(textureCoordinateAttributeLocation, canvas) {
      canvas.bindBuffer(this.textureCoordinatesBuffer, textureCoordinateAttributeLocation, textureCoordinateComponents);
    }
  }, {
    key: 'createBuffers',
    value: function createBuffers(vertexPositionsData, vertexNormalsData, vertexIndexesData, textureCoordinatesData, canvas) {
      _get(TextureRendererBuffers.prototype.__proto__ || Object.getPrototypeOf(TextureRendererBuffers.prototype), 'createBuffers', this).call(this, vertexPositionsData, vertexNormalsData, vertexIndexesData, canvas);

      this.createTextureCoordinatesBuffer(textureCoordinatesData, canvas);
    }
  }, {
    key: 'bindBuffers',
    value: function bindBuffers(vertexNormalAttributeLocation, vertexPositionAttributeLocation, textureCoordinateAttributeLocation, canvas) {
      _get(TextureRendererBuffers.prototype.__proto__ || Object.getPrototypeOf(TextureRendererBuffers.prototype), 'bindBuffers', this).call(this, vertexNormalAttributeLocation, vertexPositionAttributeLocation, canvas);

      this.bindTextureCoordinatesBuffer(textureCoordinateAttributeLocation, canvas);
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var textureCoordinatesBuffer = null,
          ///
      textureRendererBuffers = RendererBuffers.fromNothing(TextureRendererBuffers, textureCoordinatesBuffer);

      return textureRendererBuffers;
    }
  }]);

  return TextureRendererBuffers;
}(RendererBuffers);

module.exports = TextureRendererBuffers;

},{"../../renderer/buffers":52}],55:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Renderer = require('../renderer'),
    ColourRendererData = require('../renderer/data/colour'),
    vertexShaderSource = require('./source/colour/vertexShader'),
    fragmentShaderSource = require('./source/colour/fragmentShader'),
    ColourRendererBuffers = require('../renderer/buffers/colour'),
    ColourUniformLocations = require('./locations/colour/uniform'),
    ColourAttributeLocations = require('./locations/colour/attribute');

var createProgram = Renderer.createProgram;

var ColourRenderer = function (_Renderer) {
      _inherits(ColourRenderer, _Renderer);

      function ColourRenderer() {
            _classCallCheck(this, ColourRenderer);

            return _possibleConstructorReturn(this, (ColourRenderer.__proto__ || Object.getPrototypeOf(ColourRenderer)).apply(this, arguments));
      }

      _createClass(ColourRenderer, [{
            key: 'getVertexColourAttributeLocation',
            value: function getVertexColourAttributeLocation() {
                  var attributeLocations = this.getAttributeLocations(),
                      vertexColourAttributeLocation = attributeLocations.getVertexColourAttributeLocation();

                  return vertexColourAttributeLocation;
            }
      }, {
            key: 'addVertexColours',
            value: function addVertexColours(vertexColours) {
                  this.rendererData.addVertexColours(vertexColours);
            }
      }, {
            key: 'createBuffers',
            value: function createBuffers(canvas) {
                  var rendererData = this.getRendererData(),
                      rendererBuffers = this.getRendererBuffers(),
                      vertexPositionsData = rendererData.getVertexPositionsData(),
                      vertexNormalsData = rendererData.getVertexNormalsData(),
                      vertexIndexesData = rendererData.getVertexIndexesData(),
                      vertexColoursData = rendererData.getVertexColoursData();

                  rendererBuffers.createBuffers(vertexPositionsData, vertexNormalsData, vertexIndexesData, vertexColoursData, canvas);
            }
      }, {
            key: 'bindBuffers',
            value: function bindBuffers(canvas) {
                  var rendererBuffers = this.getRendererBuffers(),
                      vertexNormalAttributeLocation = this.getVertexNormalAttributeLocation(),
                      vertexPositionAttributeLocation = this.getVertexPositionAttributeLocation(),
                      vertexColourAttributeLocation = this.getVertexColourAttributeLocation();

                  rendererBuffers.bindBuffers(vertexNormalAttributeLocation, vertexPositionAttributeLocation, vertexColourAttributeLocation, canvas);
            }
      }], [{
            key: 'fromNothing',
            value: function fromNothing(canvas) {
                  var program = createProgram(vertexShaderSource, fragmentShaderSource, canvas),
                      colourRendererData = ColourRendererData.fromNothing(),
                      colourRendererBuffers = ColourRendererBuffers.fromNothing(),
                      rendererData = colourRendererData,
                      ///
                  rendererBuffers = colourRendererBuffers,
                      ///
                  uniformLocations = ColourUniformLocations.fromProgram(program, canvas),
                      attributeLocations = ColourAttributeLocations.fromProgram(program, canvas),
                      colourRenderer = new ColourRenderer(program, rendererData, rendererBuffers, uniformLocations, attributeLocations);

                  return colourRenderer;
            }
      }]);

      return ColourRenderer;
}(Renderer);

module.exports = ColourRenderer;

},{"../renderer":51,"../renderer/buffers/colour":53,"../renderer/data/colour":57,"./locations/colour/attribute":60,"./locations/colour/uniform":61,"./source/colour/fragmentShader":65,"./source/colour/vertexShader":66}],56:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arrayUtilities = require('../utilities/array');

var flatten = arrayUtilities.flatten,
    merge = arrayUtilities.merge,
    add = merge; ///

var RendererData = function () {
  function RendererData(vertexPositionsData, vertexNormalsData, vertexIndexesData, maximumVertexIndex) {
    _classCallCheck(this, RendererData);

    this.vertexPositionsData = vertexPositionsData;
    this.vertexNormalsData = vertexNormalsData;
    this.vertexIndexesData = vertexIndexesData;
    this.maximumVertexIndex = maximumVertexIndex;
  }

  _createClass(RendererData, [{
    key: 'getCount',
    value: function getCount() {
      var vertexIndexesDataLength = this.vertexIndexesData.length,
          count = vertexIndexesDataLength; ///

      return count;
    }
  }, {
    key: 'getVertexPositionsData',
    value: function getVertexPositionsData() {
      return this.vertexPositionsData;
    }
  }, {
    key: 'getVertexNormalsData',
    value: function getVertexNormalsData() {
      return this.vertexNormalsData;
    }
  }, {
    key: 'getVertexIndexesData',
    value: function getVertexIndexesData() {
      return this.vertexIndexesData;
    }
  }, {
    key: 'addVertexPositions',
    value: function addVertexPositions(vertexPositions) {
      var vertexPositionsData = flatten(vertexPositions);

      add(this.vertexPositionsData, vertexPositionsData);
    }
  }, {
    key: 'addVertexNormals',
    value: function addVertexNormals(vertexNormals) {
      var vertexNormalsData = flatten(vertexNormals);

      add(this.vertexNormalsData, vertexNormalsData);
    }
  }, {
    key: 'addVertexIndexes',
    value: function addVertexIndexes(vertexIndexes) {
      var offset = this.maximumVertexIndex + 1;

      vertexIndexes = vertexIndexes.map(function (vertexIndex) {
        return vertexIndex + offset;
      });

      this.maximumVertexIndex = Math.max.apply(Math, [this.maximumVertexIndex].concat(_toConsumableArray(vertexIndexes)));

      var vertexIndexesData = vertexIndexes;

      add(this.vertexIndexesData, vertexIndexesData);
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing(Class) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        remainingArguments[_key - 1] = arguments[_key];
      }

      var vertexPositionsData = [],
          vertexNormalsData = [],
          vertexIndexesData = [],
          maximumVertexIndex = -1,
          ///
      rendererData = new (Function.prototype.bind.apply(Class, [null].concat([vertexPositionsData, vertexNormalsData, vertexIndexesData, maximumVertexIndex], remainingArguments)))();

      return rendererData;
    }
  }]);

  return RendererData;
}();

module.exports = RendererData;

},{"../utilities/array":74}],57:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RendererData = require('../../renderer/data'),
    arrayUtilities = require('../../utilities/array');

var merge = arrayUtilities.merge,
    flatten = arrayUtilities.flatten,
    add = merge; ///

var ColourRendererData = function (_RendererData) {
  _inherits(ColourRendererData, _RendererData);

  function ColourRendererData(vertexPositionsData, vertexNormalsData, vertexIndexesData, maximumVertexIndex, vertexColoursData) {
    _classCallCheck(this, ColourRendererData);

    var _this = _possibleConstructorReturn(this, (ColourRendererData.__proto__ || Object.getPrototypeOf(ColourRendererData)).call(this, vertexPositionsData, vertexNormalsData, vertexIndexesData, maximumVertexIndex));

    _this.vertexColoursData = vertexColoursData;
    return _this;
  }

  _createClass(ColourRendererData, [{
    key: 'getVertexColoursData',
    value: function getVertexColoursData() {
      return this.vertexColoursData;
    }
  }, {
    key: 'addVertexColours',
    value: function addVertexColours(vertexColours) {
      var vertexColoursData = flatten(vertexColours);

      add(this.vertexColoursData, vertexColoursData);
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var vertexColoursData = [],
          colourRendererData = RendererData.fromNothing(ColourRendererData, vertexColoursData);

      return colourRendererData;
    }
  }]);

  return ColourRendererData;
}(RendererData);

module.exports = ColourRendererData;

},{"../../renderer/data":56,"../../utilities/array":74}],58:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RendererData = require('../../renderer/data'),
    vectorMaths = require('../../maths/vector'),
    arrayUtilities = require('../../utilities/array');

var add2 = vectorMaths.add2,
    multiply2 = vectorMaths.multiply2,
    merge = arrayUtilities.merge,
    flatten = arrayUtilities.flatten,
    add = merge; ///

var TextureRendererData = function (_RendererData) {
  _inherits(TextureRendererData, _RendererData);

  function TextureRendererData(vertexPositionsData, vertexNormalsData, vertexIndexesData, maximumVertexIndex, vertexTextureCoordinatesData) {
    _classCallCheck(this, TextureRendererData);

    var _this = _possibleConstructorReturn(this, (TextureRendererData.__proto__ || Object.getPrototypeOf(TextureRendererData)).call(this, vertexPositionsData, vertexNormalsData, vertexIndexesData, maximumVertexIndex));

    _this.vertexTextureCoordinatesData = vertexTextureCoordinatesData;
    return _this;
  }

  _createClass(TextureRendererData, [{
    key: 'getVertexTextureCoordinatesData',
    value: function getVertexTextureCoordinatesData() {
      return this.vertexTextureCoordinatesData;
    }
  }, {
    key: 'addVertexTextureCoordinates',
    value: function addVertexTextureCoordinates(vertexTextureCoordinates) {
      vertexTextureCoordinates = vertexTextureCoordinates.map(function (vertexTextureCoordinates) {
        ///
        vertexTextureCoordinates = verticallyFlipVertexTextureCoordinates(vertexTextureCoordinates);

        return vertexTextureCoordinates;
      });

      var vertexTextureCoordinatesData = flatten(vertexTextureCoordinates);

      add(this.vertexTextureCoordinatesData, vertexTextureCoordinatesData);
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var vertexTextureCoordinatesData = [],
          textureRendererData = RendererData.fromNothing(TextureRendererData, vertexTextureCoordinatesData);

      return textureRendererData;
    }
  }]);

  return TextureRendererData;
}(RendererData);

module.exports = TextureRendererData;

function verticallyFlipVertexTextureCoordinates(vertexTextureCoordinates) {
  return add2(multiply2(vertexTextureCoordinates, [1, -1]), [0, 1]);
} ///

},{"../../maths/vector":26,"../../renderer/data":56,"../../utilities/array":74}],59:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lightingSource = require('../source/lighting'),
    positionSource = require('../source/position');

var vertexNormalAttributeName = lightingSource.vertexNormalAttributeName,
    vertexPositionAttributeName = positionSource.vertexPositionAttributeName;

var AttributeLocations = function () {
  function AttributeLocations(vertexPositionAttributeLocation, vertexNormalAttributeLocation) {
    _classCallCheck(this, AttributeLocations);

    this.vertexPositionAttributeLocation = vertexPositionAttributeLocation;
    this.vertexNormalAttributeLocation = vertexNormalAttributeLocation;
  }

  _createClass(AttributeLocations, [{
    key: 'getVertexPositionAttributeLocation',
    value: function getVertexPositionAttributeLocation() {
      return this.vertexPositionAttributeLocation;
    }
  }, {
    key: 'getVertexNormalAttributeLocation',
    value: function getVertexNormalAttributeLocation() {
      return this.vertexNormalAttributeLocation;
    }
  }], [{
    key: 'fromProgram',
    value: function fromProgram(Class, program, canvas) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        remainingArguments[_key - 3] = arguments[_key];
      }

      var vertexPositionAttributeLocation = canvas.getAttributeLocation(program, vertexPositionAttributeName),
          vertexNormalAttributeLocation = canvas.getAttributeLocation(program, vertexNormalAttributeName),
          attributeLocations = new (Function.prototype.bind.apply(Class, [null].concat([vertexPositionAttributeLocation, vertexNormalAttributeLocation], remainingArguments)))();

      return attributeLocations;
    }
  }]);

  return AttributeLocations;
}();

module.exports = AttributeLocations;

},{"../source/lighting":67,"../source/position":68}],60:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AttributeLocations = require('../../locations/attribute'),
    vertexShaderSource = require('../../source/colour/vertexShader');

var vertexColourAttributeName = vertexShaderSource.vertexColourAttributeName;

var ColourAttributeLocations = function (_AttributeLocations) {
  _inherits(ColourAttributeLocations, _AttributeLocations);

  function ColourAttributeLocations(vertexPositionAttributeLocation, vertexNormalAttributeLocation, vertexColourAttributeLocation) {
    _classCallCheck(this, ColourAttributeLocations);

    var _this = _possibleConstructorReturn(this, (ColourAttributeLocations.__proto__ || Object.getPrototypeOf(ColourAttributeLocations)).call(this, vertexPositionAttributeLocation, vertexNormalAttributeLocation));

    _this.vertexColourAttributeLocation = vertexColourAttributeLocation;
    return _this;
  }

  _createClass(ColourAttributeLocations, [{
    key: 'getVertexColourAttributeLocation',
    value: function getVertexColourAttributeLocation() {
      return this.vertexColourAttributeLocation;
    }
  }], [{
    key: 'fromProgram',
    value: function fromProgram(program, canvas) {
      var vertexColourAttributeLocation = canvas.getAttributeLocation(program, vertexColourAttributeName),
          colourAttributeLocations = AttributeLocations.fromProgram(ColourAttributeLocations, program, canvas, vertexColourAttributeLocation);

      return colourAttributeLocations;
    }
  }]);

  return ColourAttributeLocations;
}(AttributeLocations);

module.exports = ColourAttributeLocations;

},{"../../locations/attribute":59,"../../source/colour/vertexShader":66}],61:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UniformLocations = require('../../locations/uniform');

var ColourUniformLocations = function (_UniformLocations) {
  _inherits(ColourUniformLocations, _UniformLocations);

  function ColourUniformLocations() {
    _classCallCheck(this, ColourUniformLocations);

    return _possibleConstructorReturn(this, (ColourUniformLocations.__proto__ || Object.getPrototypeOf(ColourUniformLocations)).apply(this, arguments));
  }

  _createClass(ColourUniformLocations, null, [{
    key: 'fromProgram',
    value: function fromProgram(program, canvas) {
      return UniformLocations.fromProgram(ColourUniformLocations, program, canvas);
    }
  }]);

  return ColourUniformLocations;
}(UniformLocations);

module.exports = ColourUniformLocations;

},{"../../locations/uniform":64}],62:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AttributeLocations = require('../../locations/attribute'),
    vertexShaderSource = require('../../source/texture/vertexShader');

var textureCoordinateAttributeName = vertexShaderSource.textureCoordinateAttributeName;

var TextureAttributeLocations = function (_AttributeLocations) {
  _inherits(TextureAttributeLocations, _AttributeLocations);

  function TextureAttributeLocations(vertexPositionAttributeLocation, vertexNormalAttributeLocation, textureCoordinateAttributeLocation) {
    _classCallCheck(this, TextureAttributeLocations);

    var _this = _possibleConstructorReturn(this, (TextureAttributeLocations.__proto__ || Object.getPrototypeOf(TextureAttributeLocations)).call(this, vertexPositionAttributeLocation, vertexNormalAttributeLocation));

    _this.textureCoordinateAttributeLocation = textureCoordinateAttributeLocation;
    return _this;
  }

  _createClass(TextureAttributeLocations, [{
    key: 'getTextureCoordinateAttributeLocation',
    value: function getTextureCoordinateAttributeLocation() {
      return this.textureCoordinateAttributeLocation;
    }
  }], [{
    key: 'fromProgram',
    value: function fromProgram(program, canvas) {
      var textureCoordinateAttributeLocation = canvas.getAttributeLocation(program, textureCoordinateAttributeName),
          textureAttributeLocations = AttributeLocations.fromProgram(TextureAttributeLocations, program, canvas, textureCoordinateAttributeLocation);

      return textureAttributeLocations;
    }
  }]);

  return TextureAttributeLocations;
}(AttributeLocations);

module.exports = TextureAttributeLocations;

},{"../../locations/attribute":59,"../../source/texture/vertexShader":70}],63:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UniformLocations = require('../../locations/uniform'),
    fragmentShaderSource = require('../../source/texture/fragmentShader');

var samplerName = fragmentShaderSource.samplerName;

var TextureUniformLocations = function (_UniformLocations) {
  _inherits(TextureUniformLocations, _UniformLocations);

  function TextureUniformLocations(offsetMatrixUniformLocation, rotationMatrixUniformLocation, positionMatrixUniformLocation, projectionMatrixUniformLocation, normalMatrixUniformLocation, samplerUniformLocation) {
    _classCallCheck(this, TextureUniformLocations);

    var _this = _possibleConstructorReturn(this, (TextureUniformLocations.__proto__ || Object.getPrototypeOf(TextureUniformLocations)).call(this, offsetMatrixUniformLocation, rotationMatrixUniformLocation, positionMatrixUniformLocation, projectionMatrixUniformLocation, normalMatrixUniformLocation));

    _this.samplerUniformLocation = samplerUniformLocation;
    return _this;
  }

  _createClass(TextureUniformLocations, [{
    key: 'getSamplerUniformLocation',
    value: function getSamplerUniformLocation() {
      return this.samplerUniformLocation;
    }
  }], [{
    key: 'fromProgram',
    value: function fromProgram(program, canvas) {
      var samplerUniformLocation = canvas.getUniformLocation(program, samplerName),
          textureUniformLocations = UniformLocations.fromProgram(TextureUniformLocations, program, canvas, samplerUniformLocation);

      return textureUniformLocations;
    }
  }]);

  return TextureUniformLocations;
}(UniformLocations);

module.exports = TextureUniformLocations;

},{"../../locations/uniform":64,"../../source/texture/fragmentShader":69}],64:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lightingSource = require('../source/lighting'),
    positionSource = require('../source/position');

var normalMatrixName = lightingSource.normalMatrixName,
    offsetMatrixName = positionSource.offsetMatrixName,
    rotationMatrixName = positionSource.rotationMatrixName,
    positionMatrixName = positionSource.positionMatrixName,
    projectionMatrixName = positionSource.projectionMatrixName;

var UniformLocations = function () {
  function UniformLocations(offsetMatrixUniformLocation, rotationMatrixUniformLocation, positionMatrixUniformLocation, projectionMatrixUniformLocation, normalMatrixUniformLocation) {
    _classCallCheck(this, UniformLocations);

    this.offsetMatrixUniformLocation = offsetMatrixUniformLocation;
    this.rotationMatrixUniformLocation = rotationMatrixUniformLocation;
    this.positionMatrixUniformLocation = positionMatrixUniformLocation;
    this.projectionMatrixUniformLocation = projectionMatrixUniformLocation;
    this.normalMatrixUniformLocation = normalMatrixUniformLocation;
  }

  _createClass(UniformLocations, [{
    key: 'getOffsetMatrixUniformLocation',
    value: function getOffsetMatrixUniformLocation() {
      return this.offsetMatrixUniformLocation;
    }
  }, {
    key: 'getRotationMatrixUniformLocation',
    value: function getRotationMatrixUniformLocation() {
      return this.rotationMatrixUniformLocation;
    }
  }, {
    key: 'getPositionMatrixUniformLocation',
    value: function getPositionMatrixUniformLocation() {
      return this.positionMatrixUniformLocation;
    }
  }, {
    key: 'getProjectionMatrixUniformLocation',
    value: function getProjectionMatrixUniformLocation() {
      return this.projectionMatrixUniformLocation;
    }
  }, {
    key: 'getNormalMatrixUniformLocation',
    value: function getNormalMatrixUniformLocation() {
      return this.normalMatrixUniformLocation;
    }
  }], [{
    key: 'fromProgram',
    value: function fromProgram(Class, program, canvas) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        remainingArguments[_key - 3] = arguments[_key];
      }

      var offsetMatrixUniformLocation = canvas.getUniformLocation(program, offsetMatrixName),
          rotationMatrixUniformLocation = canvas.getUniformLocation(program, rotationMatrixName),
          positionMatrixUniformLocation = canvas.getUniformLocation(program, positionMatrixName),
          projectionMatrixUniformLocation = canvas.getUniformLocation(program, projectionMatrixName),
          normalMatrixUniformLocation = canvas.getUniformLocation(program, normalMatrixName),
          uniformLocations = new (Function.prototype.bind.apply(Class, [null].concat([offsetMatrixUniformLocation, rotationMatrixUniformLocation, positionMatrixUniformLocation, projectionMatrixUniformLocation, normalMatrixUniformLocation], remainingArguments)))();

      return uniformLocations;
    }
  }]);

  return UniformLocations;
}();

module.exports = UniformLocations;

},{"../source/lighting":67,"../source/position":68}],65:[function(require,module,exports){
'use strict';

var fragmentShaderSource = new String('\n        \n        varying lowp vec4 vColour;\n              \n        varying highp vec3 vLighting;\n\n        void main() {\n          gl_FragColor = vec4(vColour.rgb * vLighting, vColour.a);\n        }\n        \n      ');

module.exports = fragmentShaderSource;

},{}],66:[function(require,module,exports){
'use strict';

var lightingSource = require('../../source/lighting'),
    positionSource = require('../../source/position');

var vertexColourAttributeName = 'aVertexColour',
    vertexShaderSource = new String('\n    \n        attribute vec4 ' + vertexColourAttributeName + ';\n\n        ' + lightingSource + '\n      \n        ' + positionSource + '\n    \n        varying highp vec3 vLighting;\n        \n        varying lowp vec4 vColour;\n        \n        void main() {\n          vLighting = calculateLighting();\n\n          gl_Position = calculatePosition();\n\n          vColour = ' + vertexColourAttributeName + ';                    \n        }\n        \n      ');

Object.assign(vertexShaderSource, {
  vertexColourAttributeName: vertexColourAttributeName
});

module.exports = vertexShaderSource;

},{"../../source/lighting":67,"../../source/position":68}],67:[function(require,module,exports){
'use strict';

var normalMatrixName = 'uNormalMatrix',
    vertexNormalAttributeName = 'aVertexNormal';

var lightingSource = new String('\n  \n        uniform mat4 ' + normalMatrixName + ';\n\n        attribute vec3 ' + vertexNormalAttributeName + ';\n\n        vec3 directionalLightColour = vec3(1, 1, 1),\n             directionalVector = normalize(vec3(1.0, 1.0, 1.0));\n          \n        vec3 calculateLighting() {\n          vec4 transformedNormal = ' + normalMatrixName + ' * vec4(' + vertexNormalAttributeName + ', 1.0);            \n\n          float directional = (dot(transformedNormal.xyz, directionalVector) + 1.0) / 2.0;\n          \n          vec3 lighting = (directionalLightColour * directional);\n          \n          return lighting;\n        }\n\n      ');

Object.assign(lightingSource, {
  normalMatrixName: normalMatrixName,
  vertexNormalAttributeName: vertexNormalAttributeName
});

module.exports = lightingSource;

},{}],68:[function(require,module,exports){
'use strict';

var offsetMatrixName = 'uOffsetMatrix',
    rotationMatrixName = 'uRotationMatrix',
    positionMatrixName = 'uPositionMatrix',
    projectionMatrixName = 'uPerspectiveMatrix',
    vertexPositionAttributeName = 'aVertexPosition';

var positionSource = new String('\n  \n        uniform mat4 ' + offsetMatrixName + ',\n                     ' + rotationMatrixName + ',\n                     ' + positionMatrixName + ',\n                     ' + projectionMatrixName + ';\n        \n        attribute vec4 ' + vertexPositionAttributeName + ';\n\n        vec4 calculatePosition() {\n          vec4 position = ' + projectionMatrixName + ' * ' + positionMatrixName + ' * ' + rotationMatrixName + ' * ' + offsetMatrixName + ' * ' + vertexPositionAttributeName + ';\n          \n          return position;\n        }\n        \n      ');

Object.assign(positionSource, {
  offsetMatrixName: offsetMatrixName,
  rotationMatrixName: rotationMatrixName,
  positionMatrixName: positionMatrixName,
  projectionMatrixName: projectionMatrixName,
  vertexPositionAttributeName: vertexPositionAttributeName
});

module.exports = positionSource;

},{}],69:[function(require,module,exports){
'use strict';

var samplerName = 'uSampler',
    fragmentShaderSource = new String('\n        \n        uniform sampler2D ' + samplerName + ';\n\n        varying highp vec3 vLighting;\n                   \n        varying highp vec2 vTextureCoordinate;\n        \n        void main() {\n          highp vec4 texelColour = texture2D(' + samplerName + ', vTextureCoordinate);\n          \n          gl_FragColor = vec4(texelColour.rgb * vLighting, texelColour.a);  \n        }\n        \n      ');

Object.assign(fragmentShaderSource, {
  samplerName: samplerName
});

module.exports = fragmentShaderSource;

},{}],70:[function(require,module,exports){
'use strict';

var lightingSource = require('../../source/lighting'),
    positionSource = require('../../source/position');

var textureCoordinateAttributeName = 'aTextureCoordinate',
    vertexShaderSource = new String('\n        \n        attribute vec2 ' + textureCoordinateAttributeName + ';\n        \n        ' + lightingSource + '\n      \n        ' + positionSource + '\n\n        varying highp vec3 vLighting;\n        \n        varying highp vec2 vTextureCoordinate;\n        \n        void main() {\n          vLighting = calculateLighting();\n\n          gl_Position = calculatePosition();\n                    \n          vTextureCoordinate = ' + textureCoordinateAttributeName + ';\n        }\n        \n      ');

Object.assign(vertexShaderSource, {
  textureCoordinateAttributeName: textureCoordinateAttributeName
});

module.exports = vertexShaderSource;

},{"../../source/lighting":67,"../../source/position":68}],71:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Renderer = require('../renderer'),
    vertexShaderSource = require('./source/texture/vertexShader'),
    TextureRendererData = require('../renderer/data/texture'),
    fragmentShaderSource = require('./source/texture/fragmentShader'),
    TextureRendererBuffers = require('../renderer/buffers/texture'),
    TextureUniformLocations = require('./locations/texture/uniform'),
    TextureAttributeLocations = require('./locations/texture/attribute');

var createProgram = Renderer.createProgram;

var TextureRenderer = function (_Renderer) {
  _inherits(TextureRenderer, _Renderer);

  function TextureRenderer(program, rendererData, rendererBuffers, uniformLocations, attributeLocations, imageMapJSON) {
    _classCallCheck(this, TextureRenderer);

    var _this = _possibleConstructorReturn(this, (TextureRenderer.__proto__ || Object.getPrototypeOf(TextureRenderer)).call(this, program, rendererData, rendererBuffers, uniformLocations, attributeLocations));

    _this.imageMapJSON = imageMapJSON;
    return _this;
  }

  _createClass(TextureRenderer, [{
    key: 'getImageMapJSON',
    value: function getImageMapJSON() {
      return this.imageMapJSON;
    }
  }, {
    key: 'getTextureCoordinateAttributeLocation',
    value: function getTextureCoordinateAttributeLocation() {
      var attributeLocations = this.getAttributeLocations(),
          textureCoordinateAttributeLocation = attributeLocations.getTextureCoordinateAttributeLocation();

      return textureCoordinateAttributeLocation;
    }
  }, {
    key: 'addVertexTextureCoordinates',
    value: function addVertexTextureCoordinates(vertexTextureCoordinates) {
      this.rendererData.addVertexTextureCoordinates(vertexTextureCoordinates);
    }
  }, {
    key: 'createBuffers',
    value: function createBuffers(canvas) {
      var rendererData = this.getRendererData(),
          rendererBuffers = this.getRendererBuffers(),
          vertexPositionsData = rendererData.getVertexPositionsData(),
          vertexNormalsData = rendererData.getVertexNormalsData(),
          vertexIndexesData = rendererData.getVertexIndexesData(),
          textureCoordinatesData = rendererData.getVertexTextureCoordinatesData();

      rendererBuffers.createBuffers(vertexPositionsData, vertexNormalsData, vertexIndexesData, textureCoordinatesData, canvas);
    }
  }, {
    key: 'bindBuffers',
    value: function bindBuffers(canvas) {
      var rendererBuffers = this.getRendererBuffers(),
          vertexNormalAttributeLocation = this.getVertexNormalAttributeLocation(),
          vertexPositionAttributeLocation = this.getVertexPositionAttributeLocation(),
          textureCoordinateAttributeLocation = this.getTextureCoordinateAttributeLocation();

      rendererBuffers.bindBuffers(vertexNormalAttributeLocation, vertexPositionAttributeLocation, textureCoordinateAttributeLocation, canvas);
    }
  }, {
    key: 'activateTexture',
    value: function activateTexture(canvas) {
      var context = canvas.getContext(),
          TEXTURE0 = context.TEXTURE0,
          target = TEXTURE0,
          uniformLocations = this.getUniformLocations(),
          samplerUniformLocation = uniformLocations.getSamplerUniformLocation(),
          uSamplerUniformLocationIntegerValue = 0;


      canvas.activateTexture(target);

      canvas.setUniformLocationIntegerValue(samplerUniformLocation, uSamplerUniformLocationIntegerValue);
    }
  }], [{
    key: 'fromImageMapAndImageMapJSON',
    value: function fromImageMapAndImageMapJSON() {
      var imageMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var imageMapJSON = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var canvas = arguments[2];

      var program = createProgram(vertexShaderSource, fragmentShaderSource, canvas),
          textureRendererData = TextureRendererData.fromNothing(),
          textureRendererBuffers = TextureRendererBuffers.fromNothing(),
          rendererData = textureRendererData,
          ///
      rendererBuffers = textureRendererBuffers,
          ///
      uniformLocations = TextureUniformLocations.fromProgram(program, canvas),
          attributeLocations = TextureAttributeLocations.fromProgram(program, canvas),
          textureRenderer = new TextureRenderer(program, rendererData, rendererBuffers, uniformLocations, attributeLocations, imageMapJSON);

      if (imageMap !== null) {
        var image = imageMap; ///

        canvas.createTexture(image);
      }

      return textureRenderer;
    }
  }]);

  return TextureRenderer;
}(Renderer);

module.exports = TextureRenderer;

},{"../renderer":51,"../renderer/buffers/texture":54,"../renderer/data/texture":58,"./locations/texture/attribute":62,"./locations/texture/uniform":63,"./source/texture/fragmentShader":69,"./source/texture/vertexShader":70}],72:[function(require,module,exports){
'use strict';

function calculateHalfAngleSine(angleCosine) {
  return Math.sqrt((1 - angleCosine) / 2);
}

function calculateHalfAngleCosine(angleCosine) {
  return Math.sqrt((1 + angleCosine) / 2);
}

module.exports = {
  calculateHalfAngleSine: calculateHalfAngleSine,
  calculateHalfAngleCosine: calculateHalfAngleCosine
};

},{}],73:[function(require,module,exports){
'use strict';

var constants = require('../constants');

var DEFAULT_MARGIN_OF_ERROR = constants.DEFAULT_MARGIN_OF_ERROR;


function isApproximatelyEqualToOne(value) {
  var marginOfError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_MARGIN_OF_ERROR;
  return isApproximatelyEqualTo(value, 1, marginOfError);
}

function isApproximatelyEqualToZero(value) {
  var marginOfError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_MARGIN_OF_ERROR;
  return isApproximatelyEqualTo(value, 0, marginOfError);
}

module.exports = {
  isApproximatelyEqualToOne: isApproximatelyEqualToOne,
  isApproximatelyEqualToZero: isApproximatelyEqualToZero
};

function isApproximatelyEqualTo(valueA, valueB) {
  var marginOfError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_MARGIN_OF_ERROR;

  var difference = valueA - valueB,
      absoluteDifference = Math.abs(difference),
      approximatelyEqual = absoluteDifference < marginOfError;

  return approximatelyEqual;
}

},{"../constants":3}],74:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var necessary = require('necessary');

var arrayUtilities = necessary.arrayUtilities;


function permute(array, places) {
  var length = array.length,
      cut = length - places,
      leadingElements = array.slice(0, cut),
      trailingElements = array.slice(cut);

  array = [].concat(_toConsumableArray(trailingElements), _toConsumableArray(leadingElements));

  return array;
}

function flatten(arrays) {
  return arrays.reduce(function (elements, array) {
    return elements.concat(array);
  }, []);
}

function guarantee(arrayOrElement) {
  arrayOrElement = arrayOrElement || [];

  return arrayOrElement instanceof Array ? arrayOrElement : [arrayOrElement];
}

module.exports = Object.assign(arrayUtilities, {
  permute: permute,
  flatten: flatten,
  guarantee: guarantee
});

},{"necessary":86}],75:[function(require,module,exports){
'use strict';

var constants = require('../constants'),
    matrixMaths = require('../maths/matrix'),
    arrayUtilities = require('../utilities/array');

var first = arrayUtilities.first,
    second = arrayUtilities.second,
    third = arrayUtilities.third,
    FIELD_OF_VIEW = constants.FIELD_OF_VIEW,
    Z_NEAR = constants.Z_NEAR,
    Z_FAR = constants.Z_FAR,
    identity4 = matrixMaths.identity4,
    invert4 = matrixMaths.invert4,
    rotate4 = matrixMaths.rotate4,
    translate4 = matrixMaths.translate4,
    transpose4 = matrixMaths.transpose4,
    perspective4 = matrixMaths.perspective4;


function calculateOffsetMatrix(offset) {
  var offsetMatrix = identity4();

  offsetMatrix = translate4(offsetMatrix, offset);

  return offsetMatrix;
}

function calculateRotationMatrix(angles) {
  var firstAngle = first(angles),
      secondAngle = second(angles),
      thirdAngle = third(angles),
      xAngle = firstAngle,
      yAngle = secondAngle,
      zAngle = thirdAngle;

  var rotationMatrix = identity4();

  rotationMatrix = rotate4(rotationMatrix, xAngle, [1, 0, 0]);
  rotationMatrix = rotate4(rotationMatrix, yAngle, [0, 1, 0]);
  rotationMatrix = rotate4(rotationMatrix, zAngle, [0, 0, 1]);

  return rotationMatrix;
}

function calculatePositionMatrix(distance) {
  var x = 0,
      y = 0,
      z = -distance;

  var positionMatrix = identity4();

  positionMatrix = translate4(positionMatrix, [x, y, z]);

  return positionMatrix;
}

function calculateProjectionMatrix(width, height) {
  var fieldOfView = FIELD_OF_VIEW,
      aspectRatio = width / height,
      zNear = Z_NEAR,
      zFar = Z_FAR,
      projectionMatrix = perspective4(fieldOfView, aspectRatio, zNear, zFar);

  return projectionMatrix;
}

function calculateNormalMatrix(rotationMatrix) {
  var normalMatrix = invert4(rotationMatrix);

  normalMatrix = transpose4(normalMatrix);

  return normalMatrix;
}

module.exports = {
  calculateOffsetMatrix: calculateOffsetMatrix,
  calculateRotationMatrix: calculateRotationMatrix,
  calculatePositionMatrix: calculatePositionMatrix,
  calculateProjectionMatrix: calculateProjectionMatrix,
  calculateNormalMatrix: calculateNormalMatrix
};

},{"../constants":3,"../maths/matrix":25,"../utilities/array":74}],76:[function(require,module,exports){
'use strict';

var constants = require('../constants'),
    vectorMaths = require('../maths/vector'),
    arrayUtilities = require('../utilities/array');

var VERTICES_LENGTH = constants.VERTICES_LENGTH,
    first = arrayUtilities.first,
    second = arrayUtilities.second,
    third = arrayUtilities.third,
    subtract3 = vectorMaths.subtract3,
    cross3 = vectorMaths.cross3,
    length3 = vectorMaths.length3;


function cloneEdges(edges) {
  edges = edges.map(function (edge) {
    return edge.clone();
  });

  return edges;
}

function cloneNormal(normal) {
  normal = normal.clone();

  return normal;
}

function cloneVertices(vertices) {
  vertices = vertices.map(function (vertex) {
    return vertex.clone();
  });

  return vertices;
}

function calculateEdges(vertices, Edge) {
  var edges = vertices.map(function (vertex, index) {
    var startIndex = index,
        ///
    endIndex = (startIndex + 1) % VERTICES_LENGTH,
        startVertex = vertices[startIndex],
        endVertex = vertices[endIndex],
        edge = Edge.fromStartVertexAndEndVertex(startVertex, endVertex);

    return edge;
  });

  return edges;
}

function calculateNormal(vertices, Normal) {
  var normal = Normal.fromVertices(vertices);

  return normal;
}

function calculateArea(vertices) {
  var firstVertex = first(vertices),
      secondVertex = second(vertices),
      thirdVertex = third(vertices),
      firstVertexPosition = firstVertex.getPosition(),
      secondVertexPosition = secondVertex.getPosition(),
      thirdVertexPosition = thirdVertex.getPosition(),
      firstExtent = subtract3(secondVertexPosition, firstVertexPosition),
      secondExtent = subtract3(thirdVertexPosition, firstVertexPosition),
      area = length3(cross3(firstExtent, secondExtent)) / 2;

  return area;
}

module.exports = {
  cloneEdges: cloneEdges,
  cloneNormal: cloneNormal,
  cloneVertices: cloneVertices,
  calculateEdges: calculateEdges,
  calculateNormal: calculateNormal,
  calculateArea: calculateArea
};

},{"../constants":3,"../maths/vector":26,"../utilities/array":74}],77:[function(require,module,exports){
'use strict';

var vectorMaths = require('../maths/vector'),
    arrayUtilities = require('../utilities/array'),
    approximateUtilities = require('../utilities/approximate');

var add3 = vectorMaths.add3,
    subtract3 = vectorMaths.subtract3,
    scale3 = vectorMaths.scale3,
    first = arrayUtilities.first,
    second = arrayUtilities.second,
    isApproximatelyEqualToZero = approximateUtilities.isApproximatelyEqualToZero;


function calculateIntersection(edge, firstPositionComponent) {
  var intersection = null;

  var edgeNonParallel = isEdgeNonParallel(edge);

  if (edgeNonParallel) {
    var edgeIntersection = calculateEdgeIntersection(edge, firstPositionComponent),
        edgeIntersectionNonTrivial = edgeIntersection > 0 && edgeIntersection < 1;

    if (edgeIntersectionNonTrivial) {
      intersection = edgeIntersection; ///
    }
  }

  return intersection;
}

function calculateNonNullIntersections(intersections) {
  var nonNullIntersections = intersections.reduce(function (nonNullIntersections, intersection) {
    if (intersection !== null) {
      var nonNullIntersection = intersection; ///

      nonNullIntersections.push(nonNullIntersection);
    }

    return nonNullIntersections;
  }, []);

  return nonNullIntersections;
}

function calculateNullIntersectionIndex(intersections) {
  var nullIntersectionIndex = intersections.reduce(function (nullIntersectionIndex, intersection, index) {
    if (nullIntersectionIndex === null) {
      if (intersection === null) {
        nullIntersectionIndex = index;
      }
    }

    return nullIntersectionIndex;
  }, null);

  return nullIntersectionIndex;
}

function calculateNonNullIntersectionIndex(intersections) {
  var nullIntersectionIndex = intersections.reduce(function (nullIntersectionIndex, intersection, index) {
    if (nullIntersectionIndex === null) {
      if (intersection !== null) {
        nullIntersectionIndex = index;
      }
    }

    return nullIntersectionIndex;
  }, null);

  return nullIntersectionIndex;
}

function calculateIntermediateVertexPosition(startVertexPosition, endVertexPosition, intersection) {
  var extent = subtract3(endVertexPosition, startVertexPosition),
      offset = scale3(extent, intersection),
      intermediateVertexPosition = add3(startVertexPosition, offset);

  return intermediateVertexPosition;
}

module.exports = module.exports = {
  calculateIntersection: calculateIntersection,
  calculateNonNullIntersections: calculateNonNullIntersections,
  calculateNullIntersectionIndex: calculateNullIntersectionIndex,
  calculateNonNullIntersectionIndex: calculateNonNullIntersectionIndex,
  calculateIntermediateVertexPosition: calculateIntermediateVertexPosition
};

function isEdgeNonParallel(edge) {
  var edgeExtent = edge.getExtent(),
      edgeExtentComponents = edgeExtent,
      ///
  firstEdgeExtentComponent = first(edgeExtentComponents),
      secondEdgeExtentComponent = second(edgeExtentComponents),
      edgeAngleTangent = firstEdgeExtentComponent / secondEdgeExtentComponent,
      edgeAngleTangentApproximatelyEqualToZero = isApproximatelyEqualToZero(edgeAngleTangent),
      edgeParallel = edgeAngleTangentApproximatelyEqualToZero,
      ///
  edgeNonParallel = !edgeParallel;

  return edgeNonParallel;
}

function calculateEdgeIntersection(edge, firstPositionComponent) {
  var edgeExtent = edge.getExtent(),
      edgePosition = edge.getPosition(),
      edgeExtentComponents = edgeExtent,
      ///
  edgePositionComponents = edgePosition,
      ///
  firstEdgeExtentComponent = first(edgeExtentComponents),
      firstEdgePositionComponent = first(edgePositionComponents),
      edgeIntersection = (firstPositionComponent - firstEdgePositionComponent) / firstEdgeExtentComponent;

  return edgeIntersection;
}

},{"../maths/vector":26,"../utilities/approximate":73,"../utilities/array":74}],78:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var vectorMaths = require('../maths/vector');

var add3 = vectorMaths.add3,
    scale3 = vectorMaths.scale3;


function calculateMidPointPosition(vertices) {
  var midPointPosition = vertices.reduce(function (midPointPosition, vertex) {
    var vertexPosition = vertex.getPosition(),
        scaledVertexPosition = scale3(vertexPosition, 1 / 3);

    midPointPosition = add3(midPointPosition, scaledVertexPosition);

    return midPointPosition;
  }, [0, 0, 0]);

  return midPointPosition;
}

function projectMidPointPositionOntoXYPlane(midPointPosition) {
  midPointPosition = [].concat(_toConsumableArray(midPointPosition.slice(0, 2)), [0]); ///

  return midPointPosition;
}

function isMidPointPositionToOneSideOfMaskingEdges(midPointPosition, maskingEdges) {
  var midPointPositionToTheLeftOfMaskingEdges = isMidPointPositionToTheLeftOfMaskingEdges(midPointPosition, maskingEdges),
      midPointPositionToTheRightOfMaskingEdges = isMidPointPositionToTheRightOfMaskingEdges(midPointPosition, maskingEdges),
      midPointPositionToOneSideOfMaskingEdges = midPointPositionToTheLeftOfMaskingEdges || midPointPositionToTheRightOfMaskingEdges; ///

  return midPointPositionToOneSideOfMaskingEdges;
}

module.exports = module.exports = {
  calculateMidPointPosition: calculateMidPointPosition,
  projectMidPointPositionOntoXYPlane: projectMidPointPositionOntoXYPlane,
  isMidPointPositionToOneSideOfMaskingEdges: isMidPointPositionToOneSideOfMaskingEdges
};

function isMidPointPositionToTheLeftOfMaskingEdges(midPointPosition, maskingEdges) {
  var midPointPositionToTheLeftOfMaskingEdges = maskingEdges.reduce(function (midPointPositionToTheLeftOfMaskingEdges, maskingEdge) {
    if (midPointPositionToTheLeftOfMaskingEdges) {
      var midPointPositionToTheLeftOfMaskingEdge = maskingEdge.isMidPointPositionToTheLeft(midPointPosition);

      midPointPositionToTheLeftOfMaskingEdges = midPointPositionToTheLeftOfMaskingEdge;
    }

    return midPointPositionToTheLeftOfMaskingEdges;
  }, true);

  return midPointPositionToTheLeftOfMaskingEdges;
}

function isMidPointPositionToTheRightOfMaskingEdges(midPointPosition, maskingEdges) {
  var midPointPositionToTheRightOfMaskingEdges = maskingEdges.reduce(function (midPointPositionToTheRightOfMaskingEdges, maskingEdge) {
    if (midPointPositionToTheRightOfMaskingEdges) {
      var midPointPositionToTheRightOfMaskingEdge = maskingEdge.isMidPointPositionToTheRight(midPointPosition);

      midPointPositionToTheRightOfMaskingEdges = midPointPositionToTheRightOfMaskingEdge;
    }

    return midPointPositionToTheRightOfMaskingEdges;
  }, true);

  return midPointPositionToTheRightOfMaskingEdges;
}

},{"../maths/vector":26}],79:[function(require,module,exports){
'use strict';

var vectorMaths = require('../maths/vector'),
    arrayUtilities = require('../utilities/array'),
    angleUtilities = require('../utilities/angle'),
    approximateUtilities = require('../utilities/approximate');

var dot3 = vectorMaths.dot3,
    cross3 = vectorMaths.cross3,
    normalise3 = vectorMaths.normalise3,
    isApproximatelyEqualToOne = approximateUtilities.isApproximatelyEqualToOne,
    first = arrayUtilities.first,
    second = arrayUtilities.second,
    third = arrayUtilities.third,
    fourth = arrayUtilities.fourth,
    calculateHalfAngleCosine = angleUtilities.calculateHalfAngleCosine,
    calculateHalfAngleSine = angleUtilities.calculateHalfAngleSine;


function rotateImaginaryQuaternion(imaginaryQuaternion, rotationQuaternion, inverseRotationQuaternion) {
  return hamiltonProduct(hamiltonProduct(rotationQuaternion, imaginaryQuaternion), inverseRotationQuaternion);
}

function calculateInverseRotationQuaternion(rotationQuaternion) {
  var rotationQuaternionComponents = rotationQuaternion,
      ///
  firstRotationQuaternionComponent = first(rotationQuaternionComponents),
      secondRotationQuaternionComponent = second(rotationQuaternionComponents),
      thirdRotationQuaternionComponent = third(rotationQuaternionComponents),
      fourthRotationQuaternionComponent = fourth(rotationQuaternionComponents),
      inverseRotationQuaternion = [firstRotationQuaternionComponent, -secondRotationQuaternionComponent, -thirdRotationQuaternionComponent, -fourthRotationQuaternionComponent];

  return inverseRotationQuaternion;
}

function calculateForwardsRotationQuaternion(rotationQuaternion) {
  var forwardsRotationQuaternion = rotationQuaternion; ///

  return forwardsRotationQuaternion;
}

function calculateBackwardsRotationQuaternion(rotationQuaternion) {
  var inverseRotationQuaternion = calculateInverseRotationQuaternion(rotationQuaternion),
      backwardsRotationQuaternion = inverseRotationQuaternion; ///

  return backwardsRotationQuaternion;
}

function calculateArbitraryRotationQuaternion(normal) {
  var extent = normal.getExtent(),
      unitNormal = extent,
      ///
  zAxis = [0, 0, 1],
      dotProductOfUnitNormalAndZAxis = dot3(unitNormal, zAxis),
      crossProductOfUnitNormalAndZAxis = cross3(unitNormal, zAxis),
      angleOfRotationCosine = dotProductOfUnitNormalAndZAxis,
      ///
  angleOfRotationCosineAbsoluteValue = Math.abs(angleOfRotationCosine),
      angleOfRotationCosineAbsoluteValueApproximatelyEqualToOne = isApproximatelyEqualToOne(angleOfRotationCosineAbsoluteValue),
      axisOfRotation = angleOfRotationCosineAbsoluteValueApproximatelyEqualToOne ? [1, 0, 0] : ///
  crossProductOfUnitNormalAndZAxis,
      unitAxisOfRotation = normalise3(axisOfRotation),
      halfAngleOfRotationCosine = calculateHalfAngleCosine(angleOfRotationCosine),
      halfAngleOfRotationSine = calculateHalfAngleSine(angleOfRotationCosine),
      unitAxisOfRotationComponents = unitAxisOfRotation,
      ///
  firstAxisOfRotationComponent = first(unitAxisOfRotationComponents),
      secondAxisOfRotationComponent = second(unitAxisOfRotationComponents),
      thirdAxisOfRotationComponent = third(unitAxisOfRotationComponents),
      arbitraryRotationQuaternion = [halfAngleOfRotationCosine, firstAxisOfRotationComponent * halfAngleOfRotationSine, secondAxisOfRotationComponent * halfAngleOfRotationSine, thirdAxisOfRotationComponent * halfAngleOfRotationSine];

  return arbitraryRotationQuaternion;
}

function calculateRotationAboutZAxisQuaternion(maskingEdge) {
  var maskingEdgeExtent = maskingEdge.getExtent(),
      unitMaskingEdgeExtent = normalise3(maskingEdgeExtent),
      unitMaskingEdgeExtentComponents = unitMaskingEdgeExtent,
      ///
  firstUnitMaskingEdgeExtentComponent = first(unitMaskingEdgeExtentComponents),
      secondUnitMaskingEdgeExtentComponent = second(unitMaskingEdgeExtentComponents),
      angleOfRotationSine = firstUnitMaskingEdgeExtentComponent,
      ///
  angleOfRotationCosine = secondUnitMaskingEdgeExtentComponent,
      ///
  halfAngleOfRotationCosine = calculateHalfAngleCosine(angleOfRotationCosine),
      halfAngleOfRotationSine = angleOfRotationSine > 0 ? +calculateHalfAngleSine(angleOfRotationCosine) : -calculateHalfAngleSine(angleOfRotationCosine),
      rotationAboutZAxisQuaternion = [halfAngleOfRotationCosine, 0, 0, halfAngleOfRotationSine];

  return rotationAboutZAxisQuaternion;
}

module.exports = {
  rotateImaginaryQuaternion: rotateImaginaryQuaternion,
  calculateInverseRotationQuaternion: calculateInverseRotationQuaternion,
  calculateForwardsRotationQuaternion: calculateForwardsRotationQuaternion,
  calculateBackwardsRotationQuaternion: calculateBackwardsRotationQuaternion,
  calculateArbitraryRotationQuaternion: calculateArbitraryRotationQuaternion,
  calculateRotationAboutZAxisQuaternion: calculateRotationAboutZAxisQuaternion
};

function hamiltonProduct(quaternionA, quaternionB) {
  var a1 = quaternionA[0],
      b1 = quaternionA[1],
      c1 = quaternionA[2],
      d1 = quaternionA[3],
      a2 = quaternionB[0],
      b2 = quaternionB[1],
      c2 = quaternionB[2],
      d2 = quaternionB[3],
      a = a1 * a2 - b1 * b2 - c1 * c2 - d1 * d2,
      b = a1 * b2 + b1 * a2 + c1 * d2 - d1 * c2,
      c = a1 * c2 - b1 * d2 + c1 * a2 + d1 * b2,
      d = a1 * d2 + b1 * c2 - c1 * b2 + d1 * a2,
      quaternion = [a, b, c, d];

  return quaternion;
}

},{"../maths/vector":26,"../utilities/angle":72,"../utilities/approximate":73,"../utilities/array":74}],80:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var quaternionUtilities = require('../utilities/quaternion');

var rotateImaginaryQuaternion = quaternionUtilities.rotateImaginaryQuaternion,
    calculateInverseRotationQuaternion = quaternionUtilities.calculateInverseRotationQuaternion;


function rotatePosition(position, rotationQuaternion) {
  var imaginaryQuaternion = imaginaryQuaternionFromPosition(position),
      inverseRotationQuaternion = calculateInverseRotationQuaternion(rotationQuaternion),
      rotatedImaginaryQuaternion = rotateImaginaryQuaternion(imaginaryQuaternion, rotationQuaternion, inverseRotationQuaternion);

  position = positionFromImaginaryQuaternion(rotatedImaginaryQuaternion);

  return position;
}

module.exports = {
  rotatePosition: rotatePosition
};

function imaginaryQuaternionFromPosition(position) {
  return [0].concat(_toConsumableArray(position));
} ///

function positionFromImaginaryQuaternion(imaginaryQuaternion) {
  return imaginaryQuaternion.slice(1);
} ///

},{"../utilities/quaternion":79}],81:[function(require,module,exports){
'use strict';

var matrixMaths = require('../maths/matrix'),
    vectorMaths = require('../maths/vector'),
    arrayUtilities = require('../utilities/array'),
    verticesUtilities = require('../utilities/vertices'),
    quaternionUtilities = require('../utilities/quaternion');

var rotateVertices = verticesUtilities.rotateVertices,
    invert2 = matrixMaths.invert2,
    invert3 = matrixMaths.invert3,
    first = arrayUtilities.first,
    second = arrayUtilities.second,
    third = arrayUtilities.third,
    calculateArbitraryRotationQuaternion = quaternionUtilities.calculateArbitraryRotationQuaternion,
    add2 = vectorMaths.add2,
    multiply2 = vectorMaths.multiply2,
    transform2 = vectorMaths.transform2,
    transform3 = vectorMaths.transform3;


function cloneTextureCoordinatesTuple(textureCoordinatesTuple) {
  textureCoordinatesTuple = textureCoordinatesTuple.map(function (textureCoordinates) {
    return textureCoordinates.slice();
  }); ///

  return textureCoordinatesTuple;
}

function calculateVertexTextureCoordinatesTuple(textureCoordinatesTuple, left, bottom, width, height) {
  var vertexTextureCoordinatesTuple = textureCoordinatesTuple.map(function (textureCoordinates) {
    return add2(multiply2(textureCoordinates, [width, height]), [left, bottom]);
  }); ///

  return vertexTextureCoordinatesTuple;
}

function calculateAdjustedTextureCoordinatesTuple(vertices, normal, parentVertices, textureCoordinatesTuple) {
  var arbitraryRotationQuaternion = calculateArbitraryRotationQuaternion(normal),
      rotationQuaternion = arbitraryRotationQuaternion; ///

  var tempVertices = rotateVertices(vertices, rotationQuaternion);

  parentVertices = rotateVertices(parentVertices, rotationQuaternion);

  vertices = tempVertices; ///

  var firstVertex = first(vertices),
      secondVertex = second(vertices),
      thirdVertex = third(vertices),
      firstParentVertex = first(parentVertices),
      secondParentVertex = second(parentVertices),
      thirdParentVertex = third(parentVertices),
      firstTextureCoordinates = first(textureCoordinatesTuple),
      secondTextureCoordinates = second(textureCoordinatesTuple),
      thirdTextureCoordinates = third(textureCoordinatesTuple),
      firstVertexPosition = firstVertex.getPosition(),
      secondVertexPosition = secondVertex.getPosition(),
      thirdVertexPosition = thirdVertex.getPosition(),
      firstParentVertexPosition = firstParentVertex.getPosition(),
      secondParentVertexPosition = secondParentVertex.getPosition(),
      thirdParentVertexPosition = thirdParentVertex.getPosition(),
      R1x = firstVertexPosition[0],
      ///
  R1y = firstVertexPosition[1],
      ///
  R2x = secondVertexPosition[0],
      ///
  R2y = secondVertexPosition[1],
      ///
  R3x = thirdVertexPosition[0],
      ///
  R3y = thirdVertexPosition[1],
      ///
  P1x = firstParentVertexPosition[0],
      ///
  P2x = secondParentVertexPosition[0],
      ///
  P3x = thirdParentVertexPosition[0],
      ///
  P1y = firstParentVertexPosition[1],
      ///
  P2y = secondParentVertexPosition[1],
      ///
  P3y = thirdParentVertexPosition[1],
      ///
  P1u = firstTextureCoordinates[0],
      ///
  P1v = firstTextureCoordinates[1],
      ///
  P2u = secondTextureCoordinates[0],
      ///
  P2v = secondTextureCoordinates[1],
      ///
  P3u = thirdTextureCoordinates[0],
      ///
  P3v = thirdTextureCoordinates[1],
      ///
  textureCoordinatesMatrix = invert3([1, 1, 1, P1u, P2u, P3u, P1v, P2v, P3v]),
      firstTransformedParentVerticesComponent = transform3([P1x, P2x, P3x], textureCoordinatesMatrix),
      secondTransformedParentVerticesComponent = transform3([P1y, P2y, P3y], textureCoordinatesMatrix),
      Ox = firstTransformedParentVerticesComponent[0],
      ///
  Ux = firstTransformedParentVerticesComponent[1],
      ///
  Vx = firstTransformedParentVerticesComponent[2],
      ///
  Oy = secondTransformedParentVerticesComponent[0],
      ///
  Uy = secondTransformedParentVerticesComponent[1],
      ///
  Vy = secondTransformedParentVerticesComponent[2],
      ///
  transformedParentVerticesMatrix = invert2([Ux, Uy, Vx, Vy]),
      firstAdjustedTextureCoordinatesComponent = transform2([R1x - Ox, R1y - Oy], transformedParentVerticesMatrix),
      secondAdjustedTextureCoordinatesComponent = transform2([R2x - Ox, R2y - Oy], transformedParentVerticesMatrix),
      thirdAdjustedTextureCoordinatesComponent = transform2([R3x - Ox, R3y - Oy], transformedParentVerticesMatrix),
      adjustedTextureCoordinatesTuple = [firstAdjustedTextureCoordinatesComponent, secondAdjustedTextureCoordinatesComponent, thirdAdjustedTextureCoordinatesComponent];

  return adjustedTextureCoordinatesTuple;
}

module.exports = {
  cloneTextureCoordinatesTuple: cloneTextureCoordinatesTuple,
  calculateVertexTextureCoordinatesTuple: calculateVertexTextureCoordinatesTuple,
  calculateAdjustedTextureCoordinatesTuple: calculateAdjustedTextureCoordinatesTuple
};

},{"../maths/matrix":25,"../maths/vector":26,"../utilities/array":74,"../utilities/quaternion":79,"../utilities/vertices":83}],82:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var constants = require('../constants'),
    vectorMaths = require('../maths/vector'),
    matrixMaths = require('../maths/matrix');

var transform4 = vectorMaths.transform4,
    DEGREES_TO_RADIANS = constants.DEGREES_TO_RADIANS,
    identity4 = matrixMaths.identity4,
    scale4 = matrixMaths.scale4,
    rotate4 = matrixMaths.rotate4,
    translate4 = matrixMaths.translate4;


var xAxis = [1, 0, 0],
    yAxis = [0, 1, 0],
    zAxis = [0, 0, 1],
    defaultSize = [1, 1, 1],
    defaultPosition = [0, 0, 0],
    defaultRotations = [0, 0, 0];

function composeTransform(size, position, rotations) {
  var scale = composeScale(size),
      rotate = composeRotate(rotations),
      translate = composeTranslate(position);

  return function (vector) {
    return translate(rotate(scale(vector)));
  };
}

module.exports = module.exports = {
  composeTransform: composeTransform
};

function compose(matrix) {
  return function (vector) {
    return transform4([].concat(_toConsumableArray(vector), [1]), matrix).slice(0, 3);
  };
}

function composeScale() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSize;

  var matrix = identity4();

  matrix = scale4(matrix, size);

  return compose(matrix);
}

function composeRotate() {
  var rotations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultRotations;

  var matrix = identity4();

  var xAngle = rotations[0] * DEGREES_TO_RADIANS,
      ///
  yAngle = rotations[1] * DEGREES_TO_RADIANS,
      ///
  zAngle = rotations[2] * DEGREES_TO_RADIANS; ///

  matrix = rotate4(matrix, xAngle, xAxis);
  matrix = rotate4(matrix, yAngle, yAxis);
  matrix = rotate4(matrix, zAngle, zAxis);

  return compose(matrix);
}

function composeTranslate() {
  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultPosition;

  var matrix = identity4();

  matrix = translate4(matrix, position);

  return compose(matrix);
}

},{"../constants":3,"../maths/matrix":25,"../maths/vector":26}],83:[function(require,module,exports){
'use strict';

function rotateVertices(vertices, rotationQuaternion) {
  var rotatedVertices = vertices.map(function (vertex) {
    var rotatedVertex = vertex.clone(); ///

    rotatedVertex.rotate(rotationQuaternion);

    return rotatedVertex;
  });

  return rotatedVertices;
}

function verticesFromCoordinateTuplesAndIndexTuple(coordinateTuples, indexTuple, Vertex) {
  ///
  var indexes = indexTuple,
      ///
  vertices = indexes.map(function (index) {
    var coordinateTuple = coordinateTuples[index],
        vertex = Vertex.fromCoordinateTuple(coordinateTuple);

    return vertex;
  });

  return vertices;
}

module.exports = {
  rotateVertices: rotateVertices,
  verticesFromCoordinateTuplesAndIndexTuple: verticesFromCoordinateTuplesAndIndexTuple
};

},{}],84:[function(require,module,exports){
'use strict';

var React = require('./react');

Object.defineProperty(window, 'React', {
  get: function get() {
    return React;
  }
});

},{"./react":50}],85:[function(require,module,exports){

},{}],86:[function(require,module,exports){
'use strict';

module.exports = {
  pathUtilities: require('./lib/utilities/path'),
  arrayUtilities: require('./lib/utilities/array'),
  templateUtilities: require('./lib/utilities/template'),
  fileSystemUtilities: require('./lib/utilities/fileSystem'),
  asynchronousUtilities: require('./lib/utilities/asynchronous'),
  miscellaneousUtilities: require('./lib/utilities/miscellaneous')
};

},{"./lib/utilities/array":87,"./lib/utilities/asynchronous":88,"./lib/utilities/fileSystem":89,"./lib/utilities/miscellaneous":90,"./lib/utilities/path":96,"./lib/utilities/template":97}],87:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function first(array) {
  return array[0];
}

function second(array) {
  return array[1];
}

function third(array) {
  return array[2];
}

function fourth(array) {
  return array[3];
}

function fifth(array) {
  return array[4];
}

function fifthLast(array) {
  return array[array.length - 5];
}

function fourthLast(array) {
  return array[array.length - 4];
}

function thirdLast(array) {
  return array[array.length - 3];
}

function secondLast(array) {
  return array[array.length - 2];
}

function last(array) {
  return array[array.length - 1];
}

function tail(array) {
  return array.slice(1);
}

function push(array1, array2) {
  Array.prototype.push.apply(array1, array2);
}

function unshift(array1, array2) {
  Array.prototype.unshift.apply(array1, array2);
}

function concat(array1, array2) {
  if (!(array2 instanceof Array)) {
    array2 = [array2];
  }

  var start = 0,
      deleteCount = 0;

  splice(array1, start, deleteCount, array2);
}

function clear(array) {
  var start = 0;

  return array.splice(start);
}

function copy(array1, array2) {
  var start = 0,
      deleteCount = array2.length; ///

  splice(array1, start, deleteCount, array2);
}

function merge(array1, array2) {
  var start = array2.length,
      ///
  deleteCount = 0;

  splice(array1, start, deleteCount, array2);
}

function splice(array1, start) {
  var deleteCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
  var array2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var args = [start, deleteCount].concat(_toConsumableArray(array2)),
      deletedItemsArray = Array.prototype.splice.apply(array1, args);

  return deletedItemsArray;
}

function replace(array, element, test) {
  var start = -1;

  var found = array.some(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      start = index; ///

      return true;
    }
  });

  if (found) {
    var deleteCount = 1;

    array.splice(start, deleteCount, element);
  }

  return found;
}

function filter(array, test) {
  var filteredElements = [];

  backwardsForEach(array, function (element, index) {
    var passed = test(element, index);

    if (!passed) {
      var start = index,
          ///
      deleteCount = 1,
          deletedElements = array.splice(start, deleteCount),
          firstDeletedElement = first(deletedElements);

      filteredElements.unshift(firstDeletedElement); ///
    }
  });

  return filteredElements;
}

function find(array, test) {
  var elements = [];

  forwardsForEach(array, function (element, index) {
    var passed = test(element, index);

    if (passed) {
      elements.push(element);
    }
  });

  return elements;
}

function prune(array, test) {
  var prunedElement = undefined;

  array.some(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      var start = index,
          ///
      deleteCount = 1,
          deletedElements = array.splice(start, deleteCount),
          firstDeletedElement = first(deletedElements);

      prunedElement = firstDeletedElement; ///

      return true;
    }
  });

  return prunedElement;
}

function patch(array, element, test) {
  var found = array.some(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      return true;
    }
  });

  if (found) {
    array.push(element);
  }

  return found;
}

function augment(array1, array2, test) {
  array2.forEach(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      array1.push(element);
    }
  });
}

function separate(array, array1, array2, test) {
  array.forEach(function (element, index) {
    var passed = test(element, index);

    passed ? array1.push(element) : array2.push(element);
  });
}

function forwardsSome(array, callback) {
  var arrayLength = array.length;

  for (var index = 0; index < arrayLength; index++) {
    var element = array[index],
        result = callback(element, index);

    if (result) {
      return true;
    }
  }

  return false;
}

function backwardsSome(array, callback) {
  var arrayLength = array.length;

  for (var index = arrayLength - 1; index >= 0; index--) {
    var element = array[index],
        result = callback(element, index);

    if (result) {
      return true;
    }
  }

  return false;
}

function forwardsEvery(array, callback) {
  var arrayLength = array.length;

  for (var index = 0; index < arrayLength; index++) {
    var element = array[index],
        result = callback(element, index);

    if (!result) {
      return false;
    }
  }

  return true;
}

function backwardsEvery(array, callback) {
  var arrayLength = array.length;

  for (var index = arrayLength - 1; index >= 0; index--) {
    var element = array[index],
        result = callback(element, index);

    if (!result) {
      return false;
    }
  }

  return true;
}

function forwardsForEach(array, callback) {
  var arrayLength = array.length;

  for (var index = 0; index < arrayLength; index++) {
    var element = array[index];

    callback(element, index);
  }
}

function backwardsForEach(array, callback) {
  var arrayLength = array.length;

  for (var index = arrayLength - 1; index >= 0; index--) {
    var element = array[index];

    callback(element, index);
  }
}

module.exports = {
  first: first,
  second: second,
  third: third,
  fourth: fourth,
  fifth: fifth,
  fifthLast: fifthLast,
  fourthLast: fourthLast,
  thirdLast: thirdLast,
  secondLast: secondLast,
  last: last,
  tail: tail,
  push: push,
  unshift: unshift,
  concat: concat,
  clear: clear,
  copy: copy,
  merge: merge,
  splice: splice,
  replace: replace,
  filter: filter,
  find: find,
  prune: prune,
  patch: patch,
  augment: augment,
  separate: separate,
  forwardsSome: forwardsSome,
  backwardsSome: backwardsSome,
  forwardsEvery: forwardsEvery,
  backwardsEvery: backwardsEvery,
  forwardsForEach: forwardsForEach,
  backwardsForEach: backwardsForEach
};

},{}],88:[function(require,module,exports){
'use strict';

function whilst(callback, done, context) {
  var count = -1;

  function next() {
    count++;

    var index = count,
        ///
    terminate = callback(next, done, context, index);

    if (terminate) {
      done();
    }
  }

  next();
}

function forEach(array, callback, done, context) {
  var length = array.length; ///

  var count = -1;

  function next() {
    count++;

    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];

      callback(element, next, done, context, index);
    }
  }

  next();
}

function sequence(callbacks, done, context) {
  var length = callbacks.length; ///

  var count = -1;

  function next() {
    count++;

    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      callback = callbacks[index];

      callback(next, done, context, index);
    }
  }

  next();
}

function eventually(callbacks, done, context) {
  var length = callbacks.length; ///

  var count = 0;

  function next() {
    count++;

    var terminate = count === length;

    if (terminate) {
      done();
    }
  }

  callbacks.forEach(function (callback, index) {
    callback(next, done, context, index);
  });
}

function repeatedly(callback, length, done, context) {
  var count = 0;

  function next() {
    count++;

    var terminate = count === length;

    if (terminate) {
      done();
    }
  }

  for (var index = 0; index < length; index++) {
    callback(next, done, context, index);
  }
}

function forwardsForEach(array, callback, done, context) {
  var length = array.length; ///

  var count = -1;

  function next() {
    count++;

    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];

      callback(element, next, done, context, index);
    }
  }

  next();
}

function backwardsForEach(array, callback, done, context) {
  var length = array.length; ///

  var count = length;

  function next() {
    count--;

    var terminate = count === -1;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];

      callback(element, next, done, context, index);
    }
  }

  next();
}

module.exports = {
  whilst: whilst,
  forEach: forEach,
  sequence: sequence,
  eventually: eventually,
  repeatedly: repeatedly,
  forwardsForEach: forwardsForEach,
  backwardsForEach: backwardsForEach
};

},{}],89:[function(require,module,exports){
'use strict';

var fs = require('fs');

function doesEntryExist(absolutePath) {
  var entryExists = fs.existsSync(absolutePath);

  return entryExists;
}

function doesFileExist(absoluteFilePath) {
  var fileExists = false;

  var absolutePath = absoluteFilePath,
      ///
  entryExists = doesEntryExist(absolutePath);

  if (entryExists) {
    var entryFile = isEntryFile(absolutePath);

    if (entryFile) {
      fileExists = true;
    }
  }

  return fileExists;
}

function doesDirectoryExist(absoluteDirectoryPath) {
  var directoryExists = false;

  var absolutePath = absoluteDirectoryPath,
      ///
  entryExists = doesEntryExist(absolutePath);

  if (entryExists) {
    var entryDirectory = isEntryDirectory(absolutePath);

    if (entryDirectory) {
      directoryExists = true;
    }
  }

  return directoryExists;
}

function isEntryFile(absolutePath) {
  var stat = fs.statSync(absolutePath),
      entryDirectory = stat.isDirectory(),
      entryFile = !entryDirectory;

  return entryFile;
}

function isEntryDirectory(absolutePath) {
  var stat = fs.statSync(absolutePath),
      entryDirectory = stat.isDirectory();

  return entryDirectory;
}

function isDirectoryEmpty(absoluteDirectoryPath) {
  var subEntryNames = readDirectory(absoluteDirectoryPath),
      subEntryNamesLength = subEntryNames.length,
      directoryEmpty = subEntryNamesLength === 0;

  return directoryEmpty;
}

function readDirectory(absoluteDirectoryPath) {
  var subEntryNames = fs.readdirSync(absoluteDirectoryPath);

  return subEntryNames;
}

function readFile(absoluteFilePath) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf8';

  var options = {
    encoding: encoding
  },
      content = fs.readFileSync(absoluteFilePath, options);

  return content;
}

function writeFile(absoluteFilePath, content) {
  fs.writeFileSync(absoluteFilePath, content);
}

function appendToFile(absoluteFilePath, content) {
  fs.appendFileSync(absoluteFilePath, content);
}

function renameFile(oldAbsoluteFilePath, newAbsoluteFilePath) {
  fs.renameSync(oldAbsoluteFilePath, newAbsoluteFilePath);
}

function getStats(absoluteFilePath) {
  return fs.statSync(absoluteFilePath);
}

module.exports = {
  doesEntryExist: doesEntryExist,
  doesFileExist: doesFileExist,
  doesDirectoryExist: doesDirectoryExist,
  isEntryFile: isEntryFile,
  isEntryDirectory: isEntryDirectory,
  isDirectoryEmpty: isDirectoryEmpty,
  readDirectory: readDirectory,
  readFile: readFile,
  writeFile: writeFile,
  appendToFile: appendToFile,
  renameFile: renameFile,
  getStats: getStats
};

},{"fs":85}],90:[function(require,module,exports){
'use strict';

var rc = require('./miscellaneous/rc'),
    log = require('./miscellaneous/log'),
    ajax = require('./miscellaneous/ajax'),
    onETX = require('./miscellaneous/onETX'),
    prompt = require('./miscellaneous/prompt');

var get = ajax.get,
    post = ajax.post;


module.exports = {
  log: log,
  rc: rc,
  get: get,
  post: post,
  onETX: onETX,
  prompt: prompt
};

},{"./miscellaneous/ajax":91,"./miscellaneous/log":92,"./miscellaneous/onETX":93,"./miscellaneous/prompt":94,"./miscellaneous/rc":95}],91:[function(require,module,exports){
'use strict';

var GET_METHOD = 'GET',
    POST_METHOD = 'POST';

function get(host, uri, parameters, callback) {
  if (callback === undefined) {
    callback = parameters; ///
    parameters = {};
  }

  var method = GET_METHOD,
      body = undefined;

  request(host, uri, parameters, method, body, callback);
}

function post(host, uri, json, parameters, callback) {
  if (callback === undefined) {
    callback = parameters; ///
    parameters = {};
  }

  var method = POST_METHOD,
      body = JSON.stringify(json);

  request(host, uri, parameters, method, body, callback);
}

module.exports = {
  get: get,
  post: post
};

function request(host, uri, parameters, method, body, callback) {
  var url = urlFromHostURIAndParameters(host, uri, parameters),
      xmlHttpRequest = new XMLHttpRequest();

  xmlHttpRequest.onreadystatechange = function () {
    var readyState = xmlHttpRequest.readyState,
        status = xmlHttpRequest.status,
        responseText = xmlHttpRequest.responseText;


    if (readyState == 4) {
      if (status == 200) {
        var jsonString = responseText,
            ///
        json = JSON.parse(jsonString);

        callback(json);
      } else {
        callback(null);
      }
    }
  };

  xmlHttpRequest.open(method, url, true);

  xmlHttpRequest.send(body);
}

function urlFromHostURIAndParameters(host, uri, parameters) {
  var queryString = queryStringFromParameters(parameters),
      url = queryString === '' ? host + '/' + uri : host + '/' + uri + '?' + queryString;

  return url;
}

function queryStringFromParameters(parameters) {
  var names = Object.keys(parameters),
      namesLength = names.length,
      lastIndex = namesLength - 1,
      queryString = names.reduce(function (queryString, name, index) {
    var value = parameters[name],
        encodedName = encodeURIComponent(name),
        encodedValue = encodeURIComponent(value),
        ampersandOrNothing = index !== lastIndex ? '&' : '';

    queryString += encodedName + '=' + encodedValue + ampersandOrNothing;

    return queryString;
  }, '');

  return queryString;
}

},{}],92:[function(require,module,exports){
'use strict';

var path = require('path');

var pathUtilities = require('../../utilities/path'),
    arrayUtilities = require('../../utilities/array'),
    fileSystemUtilities = require('../../utilities/fileSystem');

var second = arrayUtilities.second,
    concatenatePaths = pathUtilities.concatenatePaths,
    doesFileExist = fileSystemUtilities.doesFileExist,
    readFile = fileSystemUtilities.readFile,
    appendToFile = fileSystemUtilities.appendToFile,
    renameFile = fileSystemUtilities.renameFile,
    getStats = fileSystemUtilities.getStats;


var TRACE = 'TRACE',
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    FATAL = 'FATAL';

var logLevel = WARNING,
    logFileBaseName = 'default',
    logDirectoryPath = null;

function log(message) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var pertinentStackMessageIndex = 2;

  var levels = [TRACE, DEBUG, INFO, WARNING, ERROR, FATAL];

  if (level) {
    ///
    var levelIndex = levels.indexOf(level),
        logLevelIndex = levels.indexOf(logLevel);

    if (levelIndex < logLevelIndex) {
      return;
    }

    pertinentStackMessageIndex += 1;

    level = level + ' '; ///
  }

  var error = new Error(),
      stack = error.stack,
      stackMessages = stack.split(/\r\n|\n/),
      pertinentStackMessage = stackMessages[pertinentStackMessageIndex],
      currentDateAndTimeString = getCurrentDateAndTimeString(),
      filePath = filePathFromStackMessage(pertinentStackMessage),
      lineNumber = lineNumberFromStackMessage(pertinentStackMessage),
      logMessage = '' + level + currentDateAndTimeString + ' ' + filePath + '(' + lineNumber + ') ' + message;


  console.log(logMessage);

  if (logDirectoryPath !== null) {
    rollOverLogFile();

    var logFilePath = getLogFilePath(),
        logFileContent = logMessage + '\n';

    appendToFile(logFilePath, logFileContent);
  }

  return logMessage;
}

function trace(message) {
  return log(message, TRACE);
}

function debug(message) {
  return log(message, DEBUG);
}

function info(message) {
  return log(message, INFO);
}

function warning(message) {
  return log(message, WARNING);
}

function error(message) {
  return log(message, ERROR);
}

function fatal(message) {
  return log(message, FATAL);
}

function setLogLevel(level) {
  logLevel = level;
}

function setLogFileBaseName(fileBaseName) {
  logFileBaseName = fileBaseName;
}

function setLogDirectoryPath(directoryPath) {
  logDirectoryPath = directoryPath;
}

function getLogFileContent() {
  var logFilePath = getLogFilePath(),
      logFileContent = readFile(logFilePath);

  return logFileContent;
}

Object.assign(log, {
  TRACE: TRACE,
  DEBUG: DEBUG,
  INFO: INFO,
  WARNING: WARNING,
  ERROR: ERROR,
  FATAL: FATAL,
  trace: trace,
  debug: debug,
  info: info,
  warning: warning,
  error: error,
  fatal: fatal,
  setLogLevel: setLogLevel,
  setLogFileBaseName: setLogFileBaseName,
  setLogDirectoryPath: setLogDirectoryPath,
  getLogFileContent: getLogFileContent
});

module.exports = log;

function getLogFilePath() {
  var logFileName = logFileBaseName + '.log',
      logFilePath = concatenatePaths(logDirectoryPath, logFileName);

  return logFilePath;
}

function getRolledOverLogFilePath() {
  var currentDateString = getCurrentDateString(),
      rolledOverLogFileName = logFileBaseName + '.' + currentDateString + '.log',
      rolledOverLogFilePath = concatenatePaths(logDirectoryPath, rolledOverLogFileName);

  return rolledOverLogFilePath;
}

function getLogFileLastModifiedDate() {
  var logFilePath = getLogFilePath(),
      logFileStats = getStats(logFilePath),
      mtime = logFileStats.mtime,
      logFileLastModifiedDate = new Date(mtime); ///

  return logFileLastModifiedDate;
}

function rollOverLogFile() {
  var logFilePath = getLogFilePath(),
      logFileExists = doesFileExist(logFilePath);

  if (!logFileExists) {
    return;
  }

  var logFileLastModifiedDate = getLogFileLastModifiedDate(),
      logFileLastModifiedDateCurrentDate = isDateCurrentDate(logFileLastModifiedDate);

  if (!logFileLastModifiedDateCurrentDate) {
    var rolledOverLogFilePath = getRolledOverLogFilePath();

    renameFile(logFilePath, rolledOverLogFilePath);
  }
}

function isDateCurrentDate(date) {
  var currentDate = new Date(),
      dateString = date.toDateString(),
      currentDateString = currentDate.toDateString(),
      dateCurrentDate = dateString === currentDateString;

  return dateCurrentDate;
}

function getCurrentDateString() {
  var date = new Date(),
      day = padStartWithZeroes(date.getDate(), 2),
      ///
  month = padStartWithZeroes(date.getMonth() + 1, 2),
      ///
  year = date.getFullYear(),
      currentDateAndTimeString = day + '-' + month + '-' + year;

  return currentDateAndTimeString;
}

function getCurrentDateAndTimeString() {
  var date = new Date(),
      day = padStartWithZeroes(date.getDate(), 2),
      ///
  month = padStartWithZeroes(date.getMonth() + 1, 2),
      ///
  year = date.getFullYear(),
      hours = padStartWithZeroes(date.getHours(), 2),
      minutes = padStartWithZeroes(date.getMinutes(), 2),
      seconds = padStartWithZeroes(date.getSeconds(), 2),
      milliseconds = padStartWithZeroes(date.getMilliseconds(), 3),
      currentDateAndTimeString = day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;

  return currentDateAndTimeString;
}

function filePathFromStackMessage(stackMessage) {
  var matches = stackMessage.match(/(\/.+)\:\d+\:\d+/),
      secondMatch = second(matches),
      absoluteFilePath = secondMatch,
      ///
  currentWorkingDirectoryPath = path.resolve('.'),
      ///
  currentWorkingDirectoryPathLength = currentWorkingDirectoryPath.length,
      start = currentWorkingDirectoryPathLength + 1,
      ///
  filePath = absoluteFilePath.substr(start);

  return filePath;
}

function lineNumberFromStackMessage(stackMessage) {
  var matches = stackMessage.match(/\:(\d+)/),
      secondMatch = second(matches),
      lineNumber = secondMatch; ///

  return lineNumber;
}

function padStartWithZeroes(string, targetLength) {
  var padString = '0',
      paddedString = padStart(string, targetLength, padString);

  return paddedString;
}

function padStart(string, targetLength, padString) {
  var padding = '';

  for (var index = 0; index < targetLength; index++) {
    padding += padString;
  }

  var paddedString = ('' + padding + string).substr(-targetLength);

  return paddedString;
}

},{"../../utilities/array":87,"../../utilities/fileSystem":89,"../../utilities/path":96,"path":98}],93:[function(require,module,exports){
(function (process){
'use strict';

var ETX_CHARACTER = '\x03';

function onETX(handler) {
  var _process = process,
      stdin = _process.stdin,
      setRawMode = stdin.setRawMode;


  if (setRawMode) {
    var rawMode = true,
        encoding = 'utf8';

    stdin.setRawMode(rawMode);
    stdin.setEncoding(encoding);

    stdin.resume();

    stdin.addListener('data', dataHandler);

    return offExt;
  }

  function offExt() {
    stdin.removeListener('data', dataHandler);
  }

  function dataHandler(character) {
    if (character === ETX_CHARACTER) {
      handler();
    }
  }
}

module.exports = onETX;

}).call(this,require('_process'))

},{"_process":99}],94:[function(require,module,exports){
(function (process){
'use strict';

var onETX = require('./onETX'),
    asynchronousUtilities = require('../../utilities/asynchronous');

var _process = process,
    stdin = _process.stdin,
    stdout = _process.stdout,
    whilst = asynchronousUtilities.whilst,
    _process2 = process,
    exit = _process2.exit;


var BACKSPACE_CHARACTER = String.fromCharCode(127),
    LINE_FEED_CHARACTER = '\n',
    CARRIAGE_RETURN_CHARACTER = '\r';

function prompt(options, callback) {
  var value = null,
      _options$attempts = options.attempts,
      attempts = _options$attempts === undefined ? 3 : _options$attempts,
      context = {
    value: value,
    attempts: attempts,
    options: options
  };


  whilst(attempt, function () {
    var value = context.value;


    callback(value);
  }, context);
}

module.exports = prompt;

function attempt(next, done, context) {
  var attempts = context.attempts;


  var terminate = attempts-- === 0;

  if (terminate) {
    done();

    return;
  }

  var options = context.options,
      description = options.description,
      errorMessage = options.errorMessage,
      validationPattern = options.validationPattern,
      validationFunction = options.validationFunction,
      _options$encoding = options.encoding,
      encoding = _options$encoding === undefined ? 'utf8' : _options$encoding,
      _options$hidden = options.hidden,
      hidden = _options$hidden === undefined ? false : _options$hidden;


  hidden ? hiddenInput(description, encoding, callback) : visibleInput(description, encoding, callback);

  function callback(value) {
    var valid = validationFunction ? ///
    validationFunction(value) : validationPattern.test(value);

    if (valid) {
      Object.assign(context, {
        value: value
      });

      done();
    } else {
      console.log(errorMessage);

      Object.assign(context, {
        attempts: attempts
      });

      next();
    }
  }
}

function visibleInput(description, encoding, callback) {
  var rawMode = false;

  stdout.write(description);

  stdin.setEncoding(encoding);

  stdin.setRawMode(rawMode);

  stdin.resume();

  var value = void 0;

  var listener = function listener(chunk) {
    value = chunk.trim();

    stdin.removeListener('data', listener);

    stdin.pause();

    callback(value);
  };

  stdin.on('data', listener);
}

function hiddenInput(description, encoding, callback) {
  var rawMode = true,
      offETX = onETX(function () {
    console.log('^C');

    exit();
  });

  stdout.write(description);

  stdin.setEncoding(encoding);

  stdin.setRawMode(rawMode);

  stdin.resume();

  var value = '';

  var listener = function listener(chunk) {
    var character = chunk.toString(encoding);

    switch (character) {
      case LINE_FEED_CHARACTER:
      case CARRIAGE_RETURN_CHARACTER:
        stdout.write(LINE_FEED_CHARACTER);

        stdin.removeListener('data', listener);

        stdin.pause();

        offETX();

        callback(value);
        break;

      case BACKSPACE_CHARACTER:
        value = truncate(value);

        stdout.clearLine();

        stdout.cursorTo(0);

        stdout.write(description);
        break;

      default:
        value += character;
        break;
    }
  };

  stdin.on('data', listener);
}

function truncate(value) {
  return value.slice(0, value.length - 1);
}

}).call(this,require('_process'))

},{"../../utilities/asynchronous":88,"./onETX":93,"_process":99}],95:[function(require,module,exports){
'use strict';

var path = require('path');

var arrayUtilities = require('../../utilities/array'),
    fileSystemUtilities = require('../../utilities/fileSystem');

var first = arrayUtilities.first,
    second = arrayUtilities.second,
    readFile = fileSystemUtilities.readFile,
    writeFile = fileSystemUtilities.writeFile;


var rcBaseExtension = '';

function rc() {
  var environmentNameOrArgv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var environment = void 0,
      environmentName = void 0;

  if (environmentNameOrArgv instanceof Array) {
    var argv = environmentNameOrArgv;

    environmentName = environmentNameFromArgv(argv);
  } else {
    environmentName = environmentNameOrArgv;
  }

  var json = readRCFile(),
      environments = json.environments;


  if (environmentName === null) {
    var firstEnvironment = first(environments);

    environment = firstEnvironment; ///
  } else {
    environment = environments.find(function (environment) {
      var name = environment.name,
          found = name === environmentName;


      return found;
    });
  }

  delete environment.name;

  Object.assign(rc, environment);

  return environment;
}

function readRCFile() {
  var filePath = './.' + rcBaseExtension + 'rc',
      absoluteFilePath = path.resolve(filePath),
      fileContent = readFile(absoluteFilePath),
      json = JSON.parse(fileContent);

  return json;
}

function writeRCFile(json) {
  var filePath = './.' + rcBaseExtension + 'rc',
      absoluteFilePath = path.resolve(filePath),
      fileContent = JSON.stringify(json, null, '\t');

  writeFile(absoluteFilePath, fileContent);
}

function updateRCFile(addedPropperties) {
  var json = readRCFile();

  if (addedPropperties) {
    Object.assign(json, addedPropperties);
  }

  for (var _len = arguments.length, deletedPropertyNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    deletedPropertyNames[_key - 1] = arguments[_key];
  }

  deletedPropertyNames.forEach(function (deletedPropertyName) {
    delete json[deletedPropertyName];
  });

  writeRCFile(json);
}

function setRCBaseExtension(baseExtension) {
  rcBaseExtension = baseExtension;
}

Object.assign(rc, {
  readRCFile: readRCFile,
  writeRCFile: writeRCFile,
  updateRCFile: updateRCFile,
  setRCBaseExtension: setRCBaseExtension
});

module.exports = rc;

function environmentNameFromArgv(argv) {
  var environmentName = null;

  argv.find(function (argument) {
    ///
    var matches = argument.match(/\-\-environment=(.+)/),
        found = matches !== null;

    if (found) {
      var secondMatch = second(matches);

      environmentName = secondMatch;
    }

    return found;
  });

  return environmentName;
}

},{"../../utilities/array":87,"../../utilities/fileSystem":89,"path":98}],96:[function(require,module,exports){
'use strict';

var array = require('./array');

var first = array.first,
    second = array.second,
    last = array.last;


function isPathRelativePath(path) {
  var position = path.search(/^\.{1,2}\//),
      pathRelativePath = position !== -1;

  return pathRelativePath;
}

function isPathAbsolutePath(path) {
  var pathRelativePath = isPathRelativePath(path),
      pathAbsolutePath = !pathRelativePath; ///

  return pathAbsolutePath;
}

function isPathTopmostDirectoryName(path) {
  var position = path.search(/^[^\/]+\/?$/),
      pathTopmostDirectoryName = position !== -1;

  return pathTopmostDirectoryName;
}

function isTopmostDirectoryNameContainedInPath(topmostDirectoryName, path) {
  topmostDirectoryName = topmostDirectoryName.replace(/\/$/, ''); ///

  var regExp = new RegExp('^' + topmostDirectoryName + '(?:\\/.+)?$'),
      position = path.search(regExp),
      topmostDirectoryNameContainedInFilePath = position !== -1;

  return topmostDirectoryNameContainedInFilePath;
}

function combinePaths(directoryPath, relativePath) {
  var absolutePath = null;

  var directoryPathSubEntryNames = directoryPath.split('/'),
      relativeFilePathSubEntryNames = relativePath.split('/');

  var firstRelativeFilePathSubEntryName = first(relativeFilePathSubEntryNames),
      lastDirectoryPathSubEntryName = void 0;

  if (firstRelativeFilePathSubEntryName === '.') {
    relativeFilePathSubEntryNames.shift();
  }

  firstRelativeFilePathSubEntryName = first(relativeFilePathSubEntryNames);
  lastDirectoryPathSubEntryName = last(directoryPathSubEntryNames);

  while (firstRelativeFilePathSubEntryName === '..' && lastDirectoryPathSubEntryName !== undefined) {
    relativeFilePathSubEntryNames.shift();
    directoryPathSubEntryNames.pop();

    firstRelativeFilePathSubEntryName = first(relativeFilePathSubEntryNames);
    lastDirectoryPathSubEntryName = last(directoryPathSubEntryNames);
  }

  if (lastDirectoryPathSubEntryName !== undefined) {
    var absoluteFilePathSubEntryNames = [].concat(directoryPathSubEntryNames).concat(relativeFilePathSubEntryNames);

    absolutePath = absoluteFilePathSubEntryNames.join('/');
  }

  return absolutePath;
}

function concatenatePaths(path1, path2) {
  path1 = path1.replace(/\/$/, ''); ///

  var combinedPath = path1 + '/' + path2;

  return combinedPath;
}

function bottommostNameFromPath(path) {
  var bottommostName = null;

  var matches = path.match(/^.+\/([^\/]+\/?)$/);

  if (matches !== null) {
    var secondMatch = second(matches);

    bottommostName = secondMatch; ///
  }

  return bottommostName;
}

function topmostDirectoryPathFromPath(path) {
  var matches = path.match(/^(.+)\/[^\/]+\/?$/),
      secondMatch = second(matches),
      directoryPath = secondMatch; ///

  return directoryPath;
}

function topmostDirectoryNameFromPath(path) {
  var topmostDirectoryName = null;

  var matches = path.match(/^([^\/]+)\/.+$/);

  if (matches !== null) {
    var secondMatch = second(matches);

    topmostDirectoryName = secondMatch; ///
  }

  return topmostDirectoryName;
}

function pathWithoutBottommostNameFromPath(path) {
  var pathWithoutBottommostName = null;

  var matches = path.match(/(^.+)\/[^\/]+\/?$/);

  if (matches !== null) {
    var secondMatch = second(matches);

    pathWithoutBottommostName = secondMatch; ///
  }

  return pathWithoutBottommostName;
}

function pathWithoutTopmostDirectoryNameFromPath(path) {
  var pathWithoutTopmostDirectoryName = null;

  var matches = path.match(/^[^\/]+\/(.+)$/);

  if (matches !== null) {
    var secondMatch = second(matches);

    pathWithoutTopmostDirectoryName = secondMatch;
  }

  return pathWithoutTopmostDirectoryName;
}

module.exports = {
  isPathRelativePath: isPathRelativePath,
  isPathAbsolutePath: isPathAbsolutePath,
  isPathTopmostDirectoryName: isPathTopmostDirectoryName,
  isTopmostDirectoryNameContainedInPath: isTopmostDirectoryNameContainedInPath,
  combinePaths: combinePaths,
  concatenatePaths: concatenatePaths,
  bottommostNameFromPath: bottommostNameFromPath,
  topmostDirectoryPathFromPath: topmostDirectoryPathFromPath,
  topmostDirectoryNameFromPath: topmostDirectoryNameFromPath,
  pathWithoutBottommostNameFromPath: pathWithoutBottommostNameFromPath,
  pathWithoutTopmostDirectoryNameFromPath: pathWithoutTopmostDirectoryNameFromPath
};

},{"./array":87}],97:[function(require,module,exports){
'use strict';

var fileSystemUtilities = require('../utilities/fileSystem');

var readFile = fileSystemUtilities.readFile;


function parseFile(filePath, args) {
  var content = readFile(filePath),
      parsedContent = parseContent(content, args);

  return parsedContent;
}

function parseContent(content, args) {
  var lines = content.split('\n'),
      parsedLines = parseLines(lines, args),
      parsedContent = parsedLines.join('\n');

  return parsedContent;
}

function parseLine(line, args) {
  var parsedLine = line.replace(/\$\{(.+?)\}/g, function (match, token) {
    var parsedToken = parseToken(token, args);

    return parsedToken;
  });

  return parsedLine;
}

module.exports = {
  parseFile: parseFile,
  parseContent: parseContent,
  parseLine: parseLine
};

function parseLines(lines, args) {
  var parsedLines = lines.map(function (line) {
    var parsedLine = parseLine(line, args);

    return parsedLine;
  });

  return parsedLines;
}

function parseToken(token, args) {
  var parsedToken = '';

  if (args.hasOwnProperty(token)) {
    parsedToken = args[token];
  }

  return parsedToken;
}

},{"../utilities/fileSystem":89}],98:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))

},{"_process":99}],99:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImVzNi9jYW52YXMuanMiLCJlczYvY29uc3RhbnRzLmpzIiwiZXM2L2VsZW1lbnQuanMiLCJlczYvZWxlbWVudC9jYW1lcmEuanMiLCJlczYvZWxlbWVudC9jYW52YXMuanMiLCJlczYvZWxlbWVudC9jYW52YXMvY29sb3VyZWQuanMiLCJlczYvZWxlbWVudC9jYW52YXMvZnVuY3Rpb24uanMiLCJlczYvZWxlbWVudC9jYW52YXMvdGV4dHVyZWQuanMiLCJlczYvZWxlbWVudC9tYXNrLmpzIiwiZXM2L2VsZW1lbnQvcGFydC5qcyIsImVzNi9lbGVtZW50L3NjZW5lLmpzIiwiZXM2L2V4YW1wbGUuanMiLCJlczYvZXhhbXBsZS9jdWJlLmpzIiwiZXM2L2V4YW1wbGUvZWxlbWVudC9jb2xvdXJlZFNxdWFyZS5qcyIsImVzNi9leGFtcGxlL2VsZW1lbnQvY3ViZS5qcyIsImVzNi9leGFtcGxlL2VsZW1lbnQvZmFjZS5qcyIsImVzNi9leGFtcGxlL2VsZW1lbnQvcHlyYW1pZC5qcyIsImVzNi9leGFtcGxlL2VsZW1lbnQvc2lkZS5qcyIsImVzNi9leGFtcGxlL2VsZW1lbnQvdGV4dHVyZWRUcmlhbmdsZS5qcyIsImVzNi9leGFtcGxlL21hc2tpbmcuanMiLCJlczYvZXhhbXBsZS9weXJhbWlkLmpzIiwiZXM2L2V4YW1wbGUvc2ltcGxlLmpzIiwiZXM2L2V4YW1wbGUvdGVtcG9yYXJ5LmpzIiwiZXM2L21hdGhzL21hdHJpeC5qcyIsImVzNi9tYXRocy92ZWN0b3IuanMiLCJlczYvbWlzY2VsbGFuZW91cy9jb25maWd1cmF0aW9uLmpzIiwiZXM2L21pc2NlbGxhbmVvdXMva2V5RXZlbnRzLmpzIiwiZXM2L21pc2NlbGxhbmVvdXMvbW91c2VFdmVudHMuanMiLCJlczYvbWlzY2VsbGFuZW91cy9wYW4uanMiLCJlczYvbWlzY2VsbGFuZW91cy90aWx0LmpzIiwiZXM2L21pc2NlbGxhbmVvdXMvem9vbS5qcyIsImVzNi9taXhpbi9ibGVuZGluZy5qcyIsImVzNi9taXhpbi9idWZmZXIuanMiLCJlczYvbWl4aW4vY29sb3VyLmpzIiwiZXM2L21peGluL2RlcHRoLmpzIiwiZXM2L21peGluL21hdHJpeC5qcyIsImVzNi9taXhpbi9wcm9ncmFtLmpzIiwiZXM2L21peGluL3NoYWRlci5qcyIsImVzNi9taXhpbi90ZXh0dXJlLmpzIiwiZXM2L3ByaW1pdGl2ZS9lZGdlLmpzIiwiZXM2L3ByaW1pdGl2ZS9lZGdlL21hc2tpbmcuanMiLCJlczYvcHJpbWl0aXZlL2ZhY2V0LmpzIiwiZXM2L3ByaW1pdGl2ZS9mYWNldC9jb2xvdXJlZC5qcyIsImVzNi9wcmltaXRpdmUvZmFjZXQvdGV4dHVyZWQuanMiLCJlczYvcHJpbWl0aXZlL21hc2tpbmdGYWNldC5qcyIsImVzNi9wcmltaXRpdmUvbm9ybWFsLmpzIiwiZXM2L3ByaW1pdGl2ZS92ZXJ0ZXguanMiLCJlczYvcHJpbWl0aXZlL3ZlcnRpY2FsTGluZS5qcyIsImVzNi9yZWFjdC5qcyIsImVzNi9yZW5kZXJlci5qcyIsImVzNi9yZW5kZXJlci9idWZmZXJzLmpzIiwiZXM2L3JlbmRlcmVyL2J1ZmZlcnMvY29sb3VyLmpzIiwiZXM2L3JlbmRlcmVyL2J1ZmZlcnMvdGV4dHVyZS5qcyIsImVzNi9yZW5kZXJlci9jb2xvdXIuanMiLCJlczYvcmVuZGVyZXIvZGF0YS5qcyIsImVzNi9yZW5kZXJlci9kYXRhL2NvbG91ci5qcyIsImVzNi9yZW5kZXJlci9kYXRhL3RleHR1cmUuanMiLCJlczYvcmVuZGVyZXIvbG9jYXRpb25zL2F0dHJpYnV0ZS5qcyIsImVzNi9yZW5kZXJlci9sb2NhdGlvbnMvY29sb3VyL2F0dHJpYnV0ZS5qcyIsImVzNi9yZW5kZXJlci9sb2NhdGlvbnMvY29sb3VyL3VuaWZvcm0uanMiLCJlczYvcmVuZGVyZXIvbG9jYXRpb25zL3RleHR1cmUvYXR0cmlidXRlLmpzIiwiZXM2L3JlbmRlcmVyL2xvY2F0aW9ucy90ZXh0dXJlL3VuaWZvcm0uanMiLCJlczYvcmVuZGVyZXIvbG9jYXRpb25zL3VuaWZvcm0uanMiLCJlczYvcmVuZGVyZXIvc291cmNlL2NvbG91ci9mcmFnbWVudFNoYWRlci5qcyIsImVzNi9yZW5kZXJlci9zb3VyY2UvY29sb3VyL3ZlcnRleFNoYWRlci5qcyIsImVzNi9yZW5kZXJlci9zb3VyY2UvbGlnaHRpbmcuanMiLCJlczYvcmVuZGVyZXIvc291cmNlL3Bvc2l0aW9uLmpzIiwiZXM2L3JlbmRlcmVyL3NvdXJjZS90ZXh0dXJlL2ZyYWdtZW50U2hhZGVyLmpzIiwiZXM2L3JlbmRlcmVyL3NvdXJjZS90ZXh0dXJlL3ZlcnRleFNoYWRlci5qcyIsImVzNi9yZW5kZXJlci90ZXh0dXJlLmpzIiwiZXM2L3V0aWxpdGllcy9hbmdsZS5qcyIsImVzNi91dGlsaXRpZXMvYXBwcm94aW1hdGUuanMiLCJlczYvdXRpbGl0aWVzL2FycmF5LmpzIiwiZXM2L3V0aWxpdGllcy9jYW1lcmEuanMiLCJlczYvdXRpbGl0aWVzL2ZhY2V0LmpzIiwiZXM2L3V0aWxpdGllcy9pbnRlcnNlY3Rpb24uanMiLCJlczYvdXRpbGl0aWVzL21pZFBvaW50LmpzIiwiZXM2L3V0aWxpdGllcy9xdWF0ZXJuaW9uLmpzIiwiZXM2L3V0aWxpdGllcy9yb3RhdGlvbi5qcyIsImVzNi91dGlsaXRpZXMvdGV4dHVyZS5qcyIsImVzNi91dGlsaXRpZXMvdHJhbnNmb3JtLmpzIiwiZXM2L3V0aWxpdGllcy92ZXJ0aWNlcy5qcyIsImVzNi94Z2wuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvZXM2L3V0aWxpdGllcy9hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvZXM2L3V0aWxpdGllcy9hc3luY2hyb25vdXMuanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2VzNi91dGlsaXRpZXMvZmlsZVN5c3RlbS5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvZXM2L3V0aWxpdGllcy9taXNjZWxsYW5lb3VzLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9lczYvdXRpbGl0aWVzL21pc2NlbGxhbmVvdXMvYWpheC5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvZXM2L3V0aWxpdGllcy9taXNjZWxsYW5lb3VzL2xvZy5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvbGliL3V0aWxpdGllcy9taXNjZWxsYW5lb3VzL25vZGVfbW9kdWxlcy9uZWNlc3NhcnkvZXM2L3V0aWxpdGllcy9taXNjZWxsYW5lb3VzL29uRVRYLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvdXRpbGl0aWVzL21pc2NlbGxhbmVvdXMvbm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9lczYvdXRpbGl0aWVzL21pc2NlbGxhbmVvdXMvcHJvbXB0LmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9lczYvdXRpbGl0aWVzL21pc2NlbGxhbmVvdXMvcmMuanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2VzNi91dGlsaXRpZXMvcGF0aC5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvZXM2L3V0aWxpdGllcy90ZW1wbGF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoLWJyb3dzZXJpZnkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBOzs7Ozs7QUFFQSxJQUFNLGFBQWEsUUFBUSxlQUFSLENBQW5CO0FBQUEsSUFDTSxjQUFjLFFBQVEsZ0JBQVIsQ0FEcEI7QUFBQSxJQUVNLGNBQWMsUUFBUSxnQkFBUixDQUZwQjtBQUFBLElBR00sY0FBYyxRQUFRLGdCQUFSLENBSHBCO0FBQUEsSUFJTSxjQUFjLFFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9saWIveGdsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBDYW52YXM6IHJlcXVpcmUoJy4vbGliL2NhbnZhcycpLFxuICBNYXNrOiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L21hc2snKSxcbiAgUGFydDogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9wYXJ0JyksXG4gIFNjZW5lOiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L3NjZW5lJyksXG4gIENhbWVyYTogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9jYW1lcmEnKSxcbiAgQ2FudmFzRWxlbWVudDogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9jYW52YXMnKSxcbiAgQ29sb3VyZWRDYW52YXNFbGVtZW50OiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L2NhbnZhcy9jb2xvdXJlZCcpLFxuICBUZXh0dXJlZENhbnZhc0VsZW1lbnQ6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvY2FudmFzL3RleHR1cmVkJylcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGRlcHRoTWl4aW4gPSByZXF1aXJlKCcuL21peGluL2RlcHRoJyksXG4gICAgICBjb2xvdXJNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vY29sb3VyJyksXG4gICAgICBzaGFkZXJNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vc2hhZGVyJyksXG4gICAgICBidWZmZXJNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vYnVmZmVyJyksXG4gICAgICBtYXRyaXhNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vbWF0cml4JyksXG4gICAgICBwcm9ncmFtTWl4aW4gPSByZXF1aXJlKCcuL21peGluL3Byb2dyYW0nKSxcbiAgICAgIHRleHR1cmVNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vdGV4dHVyZScpLFxuICAgICAgYmxlbmRpbmdNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vYmxlbmRpbmcnKTtcblxuY29uc3QgZGVmYXVsdE9mZnNldCA9IDA7XG5cbmNsYXNzIENhbnZhcyB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yID0gJ2NhbnZhcycpIHtcbiAgICBjb25zdCBkb21FbGVtZW50ID0gZG9tRWxlbWVudEZyb21TZWxlY3RvcihzZWxlY3RvciksXG4gICAgICAgICAgY29udGV4dCA9IGRvbUVsZW1lbnQuZ2V0Q29udGV4dCgnd2ViZ2wnKTtcblxuICAgIGlmICghY29udGV4dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gaW5pdGlhbGlzZSB0aGUgY29udGV4dC5gKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIFxuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG5cbiAgICB0aGlzLmVuYWJsZURlcHRoVGVzdGluZygpOyAgLy8vXG4gIH1cblxuICBnZXRDb250ZXh0KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gIH1cblxuICBnZXRET01FbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmRvbUVsZW1lbnQ7XG4gIH1cblxuICBnZXRXaWR0aCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC53aWR0aDsgfVxuXG4gIGdldEhlaWdodCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5oZWlnaHQ7IH1cblxuICBnZXRDbGllbnRXaWR0aCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5jbGllbnRXaWR0aDsgfVxuXG4gIGdldENsaWVudEhlaWdodCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5jbGllbnRIZWlnaHQ7IH1cblxuICBnZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSkgeyByZXR1cm4gdGhpcy5jb250ZXh0LmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBuYW1lKTsgfVxuXG4gIGdldEF0dHJpYnV0ZUxvY2F0aW9uKHByb2dyYW0sIG5hbWUpIHsgcmV0dXJuIHRoaXMuY29udGV4dC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBuYW1lKTsgfVxuXG4gIHNldFdpZHRoKHdpZHRoKSB7IHRoaXMuZG9tRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGgpOyB9XG5cbiAgc2V0SGVpZ2h0KGhlaWdodCkgeyB0aGlzLmRvbUVsZW1lbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoZWlnaHQpOyB9XG5cbiAgc2V0Vmlld3BvcnQoeCwgeSwgd2lkdGgsIGhlaWdodCkgeyB0aGlzLmNvbnRleHQudmlld3BvcnQoeCwgeSwgd2lkdGgsIGhlaWdodCk7IH1cblxuICBzZXRVbmlmb3JtTG9jYXRpb25JbnRlZ2VyVmFsdWUodW5pZm9ybUxvY2F0aW9uLCBpbnRlZ2VyVmFsdWUpIHsgdGhpcy5jb250ZXh0LnVuaWZvcm0xaSh1bmlmb3JtTG9jYXRpb24sIGludGVnZXJWYWx1ZSk7IH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmNsZWFyRGVwdGgoKTtcbiAgICB0aGlzLmNsZWFyQ29sb3VyKCk7XG4gICAgdGhpcy5jbGVhckRlcHRoQnVmZmVyKCk7XG4gICAgdGhpcy5jbGVhckNvbG91ckJ1ZmZlcigpO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnNldFdpZHRoKHdpZHRoKTtcbiAgICB0aGlzLnNldEhlaWdodChoZWlnaHQpO1xuICAgIHRoaXMuc2V0Vmlld3BvcnQoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICByZW5kZXIoc2hhZGVyLCBvZmZzZXRNYXRyaXgsIHJvdGF0aW9uTWF0cml4LCBwb3NpdGlvbk1hdHJpeCwgcHJvamVjdGlvbk1hdHJpeCwgbm9ybWFsTWF0cml4KSB7XG4gICAgY29uc3Qgb2Zmc2V0TWF0cml4VW5pZm9ybUxvY2F0aW9uID0gc2hhZGVyLmdldE9mZnNldE1hdHJpeFVuaWZvcm1Mb2NhdGlvbigpLFxuICAgICAgICAgIHJvdGF0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uID0gc2hhZGVyLmdldFJvdGF0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uKCksXG4gICAgICAgICAgcG9zaXRpb25NYXRyaXhVbmlmb3JtTG9jYXRpb24gPSBzaGFkZXIuZ2V0UG9zaXRpb25NYXRyaXhVbmlmb3JtTG9jYXRpb24oKSxcbiAgICAgICAgICBwcm9qZWN0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uID0gc2hhZGVyLmdldFByb2plY3Rpb25NYXRyaXhVbmlmb3JtTG9jYXRpb24oKSxcbiAgICAgICAgICBub3JtYWxNYXRyaXhVbmlmb3JtTG9jYXRpb24gPSBzaGFkZXIuZ2V0Tm9ybWFsTWF0cml4VW5pZm9ybUxvY2F0aW9uKCk7XG5cbiAgICB0aGlzLmFwcGx5TWF0cml4KG9mZnNldE1hdHJpeFVuaWZvcm1Mb2NhdGlvbiwgb2Zmc2V0TWF0cml4KTtcbiAgICB0aGlzLmFwcGx5TWF0cml4KHJvdGF0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uLCByb3RhdGlvbk1hdHJpeCk7XG4gICAgdGhpcy5hcHBseU1hdHJpeChwb3NpdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbiwgcG9zaXRpb25NYXRyaXgpO1xuICAgIHRoaXMuYXBwbHlNYXRyaXgocHJvamVjdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbiwgcHJvamVjdGlvbk1hdHJpeCk7XG4gICAgdGhpcy5hcHBseU1hdHJpeChub3JtYWxNYXRyaXhVbmlmb3JtTG9jYXRpb24sIG5vcm1hbE1hdHJpeCk7XG5cbiAgICBjb25zdCBjb3VudCA9IHNoYWRlci5nZXRDb3VudCgpO1xuXG4gICAgdGhpcy5kcmF3RWxlbWVudHMoY291bnQpO1xuICB9XG5cbiAgZHJhd0VsZW1lbnRzKGNvdW50LCBvZmZzZXQgPSBkZWZhdWx0T2Zmc2V0KSB7XG4gICAgY29uc3QgeyBUUklBTkdMRVMsIFVOU0lHTkVEX1NIT1JUIH0gPSB0aGlzLmNvbnRleHQsXG4gICAgICAgICAgbW9kZSA9IFRSSUFOR0xFUyxcbiAgICAgICAgICB0eXBlID0gVU5TSUdORURfU0hPUlQ7XG5cbiAgICB0aGlzLmNvbnRleHQuZHJhd0VsZW1lbnRzKG1vZGUsIGNvdW50LCB0eXBlLCBvZmZzZXQpXG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihDYW52YXMucHJvdG90eXBlLCBkZXB0aE1peGluKTtcbk9iamVjdC5hc3NpZ24oQ2FudmFzLnByb3RvdHlwZSwgY29sb3VyTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihDYW52YXMucHJvdG90eXBlLCBzaGFkZXJNaXhpbik7XG5PYmplY3QuYXNzaWduKENhbnZhcy5wcm90b3R5cGUsIGJ1ZmZlck1peGluKTtcbk9iamVjdC5hc3NpZ24oQ2FudmFzLnByb3RvdHlwZSwgbWF0cml4TWl4aW4pO1xuT2JqZWN0LmFzc2lnbihDYW52YXMucHJvdG90eXBlLCBwcm9ncmFtTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihDYW52YXMucHJvdG90eXBlLCB0ZXh0dXJlTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihDYW52YXMucHJvdG90eXBlLCBibGVuZGluZ01peGluKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW52YXM7XG5cbmZ1bmN0aW9uIGRvbUVsZW1lbnRGcm9tU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgY29uc3QgZG9tRWxlbWVudCA9ICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSA/XG4gICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpWzBdIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOyAgLy8vXG5cbiAgcmV0dXJuIGRvbUVsZW1lbnQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFpfRkFSID0gMTAwMCxcbiAgICAgIFpfTkVBUiA9IDEsXG4gICAgICBNT1VTRV9VUCA9ICdNT1VTRV9VUCcsXG4gICAgICBNT1VTRV9ET1dOID0gJ01PVVNFX0RPV04nLFxuICAgICAgTU9VU0VfTU9WRSA9ICdNT1VTRV9NT1ZFJyxcbiAgICAgIE1PVVNFX1dIRUVMID0gJ01PVVNFX1dIRUVMJyxcbiAgICAgIENUUkxfS0VZX0NPREUgPSAxNyxcbiAgICAgIFNISUZUX0tFWV9DT0RFID0gMTYsXG4gICAgICBWRVJUSUNFU19MRU5HVEggPSAzLFxuICAgICAgTUlOSU1VTV9ESVNUQU5DRSA9IDEsXG4gICAgICBERUdSRUVTX1RPX1JBRElBTlMgPSBNYXRoLlBJIC8gMTgwLFxuICAgICAgRklFTERfT0ZfVklFVyA9IDQ1ICogREVHUkVFU19UT19SQURJQU5TLFxuICAgICAgQU5HTEVTX1NDQUxBUiA9IDAuMDEsXG4gICAgICBPRkZTRVRfU0NBTEFSID0gMC4yNSxcbiAgICAgIElOSVRJQUxfQU5HTEVTID0gWyAwLCAwIF0sXG4gICAgICBESVNUQU5DRV9TQ0FMQVIgPSAxLjI1LFxuICAgICAgREVGQVVMVF9NQVJHSU5fT0ZfRVJST1IgPSAwLjAwMDAwMDEsXG4gICAgICBJTklUSUFMX01PVVNFX0NPT1JESU5BVEVTID0gWyAwLCAwIF07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBaX0ZBUixcbiAgWl9ORUFSLFxuICBNT1VTRV9VUCxcbiAgTU9VU0VfRE9XTixcbiAgTU9VU0VfTU9WRSxcbiAgTU9VU0VfV0hFRUwsXG4gIENUUkxfS0VZX0NPREUsXG4gIFNISUZUX0tFWV9DT0RFLFxuICBWRVJUSUNFU19MRU5HVEgsXG4gIE1JTklNVU1fRElTVEFOQ0UsXG4gIERFR1JFRVNfVE9fUkFESUFOUyxcbiAgRklFTERfT0ZfVklFVyxcbiAgQU5HTEVTX1NDQUxBUixcbiAgT0ZGU0VUX1NDQUxBUixcbiAgSU5JVElBTF9BTkdMRVMsXG4gIERJU1RBTkNFX1NDQUxBUixcbiAgREVGQVVMVF9NQVJHSU5fT0ZfRVJST1IsXG4gIElOSVRJQUxfTU9VU0VfQ09PUkRJTkFURVNcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEVsZW1lbnQge1xuICBnZXRDaGlsZEVsZW1lbnRzKCkge1xuICAgIHJldHVybiB0aGlzLmNoaWxkRWxlbWVudHM7XG4gIH1cblxuICBzZXRDaGlsZEVsZW1lbnRzKGNoaWxkRWxlbWVudHMpIHtcbiAgICB0aGlzLmNoaWxkRWxlbWVudHMgPSBjaGlsZEVsZW1lbnRzO1xuICB9XG5cbiAgYXNzaWduQ29udGV4dChuYW1lcywgdGhlbkRlbGV0ZSkge1xuICAgIGNvbnN0IGFyZ3VtZW50c0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIFxuICAgIGlmIChhcmd1bWVudHNMZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbnN0IGZpcnN0QXJndW1lbnQgPSBmaXJzdChhcmd1bWVudHMpO1xuICBcbiAgICAgIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIG5hbWVzID0gT2JqZWN0LmtleXModGhpcy5jb250ZXh0KTtcbiAgXG4gICAgICAgIHRoZW5EZWxldGUgPSBmaXJzdEFyZ3VtZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhlbkRlbGV0ZSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBpZiAoYXJndW1lbnRzTGVuZ3RoID09PSAwKSB7XG4gICAgICBuYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuY29udGV4dCk7XG4gIFxuICAgICAgdGhlbkRlbGV0ZSA9IHRydWU7XG4gICAgfVxuICBcbiAgICBuYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29udGV4dFtuYW1lXSxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZSA9IG5hbWUsICAvLy9cbiAgICAgICAgICAgIGRlc2NyaXB0b3IgPSB7XG4gICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICB9O1xuICBcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBwcm9wZXJ0eU5hbWUsIGRlc2NyaXB0b3IpO1xuICBcbiAgICAgIGlmICh0aGVuRGVsZXRlKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvbnRleHRbbmFtZV07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVDb250ZXh0KGNoaWxkRWxlbWVudCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSAodHlwZW9mIGNoaWxkRWxlbWVudC5wYXJlbnRDb250ZXh0ID09PSAnZnVuY3Rpb24nKSA/XG4gICAgICAgICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50LnBhcmVudENvbnRleHQoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQuY29udGV4dDtcblxuICAgIHRoaXMuY29udGV4dCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29udGV4dCwgY29udGV4dCk7XG5cbiAgICBkZWxldGUgY2hpbGRFbGVtZW50LmNvbnRleHQ7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBuZXcgQ2xhc3MoLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcblxuICAgIGFwcGx5UHJvcGVydGllcyhlbGVtZW50LCBwcm9wZXJ0aWVzKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudDtcblxuZnVuY3Rpb24gYXBwbHlQcm9wZXJ0aWVzKGVsZW1lbnQsIHByb3BlcnRpZXMpIHtcbiAgY29uc3QgY2hpbGRFbGVtZW50cyA9ICh0eXBlb2YgZWxlbWVudC5jaGlsZEVsZW1lbnRzID09PSAnZnVuY3Rpb24nKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5jaGlsZEVsZW1lbnRzIHx8IFtdO1xuXG4gIGVsZW1lbnQuc2V0Q2hpbGRFbGVtZW50cyhjaGlsZEVsZW1lbnRzKTtcblxuICBjaGlsZEVsZW1lbnRzLmZvckVhY2goKGNoaWxkRWxlbWVudCkgPT4gZWxlbWVudC51cGRhdGVDb250ZXh0KGNoaWxkRWxlbWVudCkpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpLFxuICAgICAgUGFuID0gcmVxdWlyZSgnLi4vbWlzY2VsbGFuZW91cy9wYW4nKSxcbiAgICAgIFRpbHQgPSByZXF1aXJlKCcuLi9taXNjZWxsYW5lb3VzL3RpbHQnKSxcbiAgICAgIFpvb20gPSByZXF1aXJlKCcuLi9taXNjZWxsYW5lb3VzL3pvb20nKSxcbiAgICAgIEtleUV2ZW50cyA9IHJlcXVpcmUoJy4uL21pc2NlbGxhbmVvdXMva2V5RXZlbnRzJyksXG4gICAgICBNb3VzZUV2ZW50cyA9IHJlcXVpcmUoJy4uL21pc2NlbGxhbmVvdXMvbW91c2VFdmVudHMnKSxcbiAgICAgIGNhbWVyYVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9jYW1lcmEnKTtcblxuY29uc3QgeyBjYWxjdWxhdGVPZmZzZXRNYXRyaXgsIGNhbGN1bGF0ZVJvdGF0aW9uTWF0cml4LCBjYWxjdWxhdGVQb3NpdGlvbk1hdHJpeCwgY2FsY3VsYXRlUHJvamVjdGlvbk1hdHJpeCwgY2FsY3VsYXRlTm9ybWFsTWF0cml4IH0gPSBjYW1lcmFVdGlsaXRpZXM7XG5cbmNvbnN0IGRlZmF1bHRJbml0aWFsRGlzdGFuY2UgPSA1LFxuICAgICAgZGVmYXVsdEluaXRpYWxPZmZzZXQgPSBbIDAsIDAsIDAgXTtcblxuY2xhc3MgQ2FtZXJhIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHBhbiwgdGlsdCwgem9vbSwga2V5RXZlbnRzLCBtb3VzZUV2ZW50cywgdXBkYXRlSGFuZGxlcikge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnBhbiA9IHBhbjtcbiAgICB0aGlzLnRpbHQgPSB0aWx0O1xuICAgIHRoaXMuem9vbSA9IHpvb207XG4gICAgdGhpcy5rZXlFdmVudHMgPSBrZXlFdmVudHM7XG4gICAgdGhpcy5tb3VzZUV2ZW50cyA9IG1vdXNlRXZlbnRzO1xuICAgIHRoaXMudXBkYXRlSGFuZGxlciA9IHVwZGF0ZUhhbmRsZXI7XG4gIH1cblxuICBzaGlmdEtleUhhbmRsZXIoc2hpZnRLZXlEb3duKSB7XG4gICAgdGhpcy5wYW4uc2hpZnRLZXlIYW5kbGVyKHNoaWZ0S2V5RG93bik7XG5cbiAgICB0aGlzLnRpbHQuc2hpZnRLZXlIYW5kbGVyKHNoaWZ0S2V5RG93bik7XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihtb3VzZUNvb3JkaW5hdGVzLCBtb3VzZURvd24sIGNhbnZhcykge1xuICAgIHRoaXMudGlsdC5tb3VzZVVwSGFuZGxlcigpO1xuXG4gICAgdGhpcy5wYW4ubW91c2VVcEhhbmRsZXIoKTtcbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIobW91c2VDb29yZGluYXRlcywgbW91c2VEb3duLCBjYW52YXMpIHtcbiAgICB0aGlzLnRpbHQubW91c2VEb3duSGFuZGxlcigpO1xuXG4gICAgdGhpcy5wYW4ubW91c2VEb3duSGFuZGxlcigpO1xuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZUNvb3JkaW5hdGVzLCBtb3VzZURvd24sIGNhbnZhcykge1xuICAgIGNvbnN0IHNoaWZ0S2V5RG93biA9IHRoaXMua2V5RXZlbnRzLmlzU2hpZnRLZXlEb3duKCk7XG5cbiAgICB0aGlzLnRpbHQubW91c2VNb3ZlSGFuZGxlcihtb3VzZUNvb3JkaW5hdGVzLCBtb3VzZURvd24sIHNoaWZ0S2V5RG93bik7XG5cbiAgICB0aGlzLnBhbi5tb3VzZU1vdmVIYW5kbGVyKG1vdXNlQ29vcmRpbmF0ZXMsIG1vdXNlRG93biwgc2hpZnRLZXlEb3duLCB0aGlzLnRpbHQpO1xuXG4gICAgaWYgKG1vdXNlRG93bikge1xuICAgICAgdGhpcy51cGRhdGUoY2FudmFzKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZVdoZWVsSGFuZGxlcihkZWx0YSwgY2FudmFzKSB7XG4gICAgdGhpcy56b29tLm1vdXNlV2hlZWxFdmVudEhhbmRsZXIoZGVsdGEpO1xuXG4gICAgdGhpcy51cGRhdGUoY2FudmFzKTtcbiAgfVxuXG4gIGZvcmNlVXBkYXRlKGNhbnZhcykge1xuICAgIHRoaXMudXBkYXRlKGNhbnZhcyk7XG4gIH1cblxuICBvblVwZGF0ZSh1cGRhdGVIYW5kbGVyKSB7XG4gICAgdGhpcy51cGRhdGVIYW5kbGVyID0gdXBkYXRlSGFuZGxlcjtcbiAgfVxuICBcbiAgdXBkYXRlKGNhbnZhcykge1xuICAgIGNvbnN0IHdpZHRoID0gY2FudmFzLmdldFdpZHRoKCksXG4gICAgICAgICAgaGVpZ2h0ID0gY2FudmFzLmdldEhlaWdodCgpLFxuICAgICAgICAgIG9mZnNldCA9IHRoaXMucGFuLmdldE9mZnNldCgpLFxuICAgICAgICAgIGFuZ2xlcyA9IHRoaXMudGlsdC5nZXRBbmdsZXMoKSxcbiAgICAgICAgICBkaXN0YW5jZSA9IHRoaXMuem9vbS5nZXREaXN0YW5jZSgpLFxuICAgICAgICAgIG9mZnNldE1hdHJpeCA9IGNhbGN1bGF0ZU9mZnNldE1hdHJpeChvZmZzZXQpLFxuICAgICAgICAgIHJvdGF0aW9uTWF0cml4ID0gY2FsY3VsYXRlUm90YXRpb25NYXRyaXgoYW5nbGVzKSxcbiAgICAgICAgICBwb3NpdGlvbk1hdHJpeCA9IGNhbGN1bGF0ZVBvc2l0aW9uTWF0cml4KGRpc3RhbmNlKSxcbiAgICAgICAgICBwcm9qZWN0aW9uTWF0cml4ID0gY2FsY3VsYXRlUHJvamVjdGlvbk1hdHJpeCh3aWR0aCwgaGVpZ2h0KSxcbiAgICAgICAgICBub3JtYWxNYXRyaXggPSBjYWxjdWxhdGVOb3JtYWxNYXRyaXgocm90YXRpb25NYXRyaXgpO1xuICAgIFxuICAgIHRoaXMudXBkYXRlSGFuZGxlcihvZmZzZXRNYXRyaXgsIHJvdGF0aW9uTWF0cml4LCBwb3NpdGlvbk1hdHJpeCwgcHJvamVjdGlvbk1hdHJpeCwgbm9ybWFsTWF0cml4KTtcbiAgfVxuXG4gIHJlbmRlcihjYW52YXMsIG9mZnNldE1hdHJpeCwgcm90YXRpb25NYXRyaXgsIHBvc2l0aW9uTWF0cml4LCBwcm9qZWN0aW9uTWF0cml4LCBub3JtYWxNYXRyaXgpIHtcbiAgICAvLy9cbiAgfVxuXG4gIHBhcmVudENvbnRleHQoKSB7XG5cdCAgY29uc3Qgb25VcGRhdGUgPSB0aGlzLm9uVXBkYXRlLmJpbmQodGhpcyksXG5cdFx0XHRcdCAgZm9yY2VVcGRhdGUgPSB0aGlzLmZvcmNlVXBkYXRlLmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKHtcbiAgICAgIG9uVXBkYXRlLFxuICAgICAgZm9yY2VVcGRhdGVcbiAgICB9KTtcbiAgfVxuICBcbiAgaW5pdGlhbGlzZShjYW52YXMpIHtcbiAgICBjb25zdCBrZXlFdmVudHMgPSBLZXlFdmVudHMuZnJvbU5vdGhpbmcoY2FudmFzKSxcbiAgICAgICAgICBtb3VzZUV2ZW50cyA9IE1vdXNlRXZlbnRzLmZyb21Ob3RoaW5nKGNhbnZhcyksXG4gICAgICAgICAgc2hpZnRLZXlIYW5kbGVyID0gdGhpcy5zaGlmdEtleUhhbmRsZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICBtb3VzZVVwSGFuZGxlciA9IHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICBtb3VzZURvd25IYW5kbGVyID0gdGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgbW91c2VNb3ZlSGFuZGxlciA9IHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpLFxuICAgICAgICAgIG1vdXNlV2hlZWxIYW5kbGVyID0gdGhpcy5tb3VzZVdoZWVsSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAga2V5RXZlbnRzLmFkZFNoaWZ0S2V5SGFuZGxlcihzaGlmdEtleUhhbmRsZXIpO1xuXG4gICAgbW91c2VFdmVudHMuYWRkTW91c2VVcEhhbmRsZXIobW91c2VVcEhhbmRsZXIpO1xuICAgIG1vdXNlRXZlbnRzLmFkZE1vdXNlRG93bkhhbmRsZXIobW91c2VEb3duSGFuZGxlcik7XG4gICAgbW91c2VFdmVudHMuYWRkTW91c2VNb3ZlSGFuZGxlcihtb3VzZU1vdmVIYW5kbGVyKTtcbiAgICBtb3VzZUV2ZW50cy5hZGRNb3VzZVdoZWVsSGFuZGxlcihtb3VzZVdoZWVsSGFuZGxlcik7XG5cbiAgICB0aGlzLmtleUV2ZW50cyA9IGtleUV2ZW50cztcblxuICAgIHRoaXMubW91c2VFdmVudHMgPSBtb3VzZUV2ZW50cztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBpbml0aWFsT2Zmc2V0ID0gZGVmYXVsdEluaXRpYWxPZmZzZXQsIGluaXRpYWxEaXN0YW5jZSA9IGRlZmF1bHRJbml0aWFsRGlzdGFuY2UgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgcGFuID0gUGFuLmZyb21Jbml0aWFsT2Zmc2V0KGluaXRpYWxPZmZzZXQpLFxuICAgICAgICAgIHRpbHQgPSBUaWx0LmZyb21Ob3RoaW5nKCksXG4gICAgICAgICAgem9vbSA9IFpvb20uZnJvbUluaXRpYWxEaXN0YW5jZShpbml0aWFsRGlzdGFuY2UpLFxuICAgICAgICAgIGtleUV2ZW50cyA9IG51bGwsIC8vL1xuICAgICAgICAgIG1vdXNlRXZlbnRzID0gbnVsbCwgLy8vXG4gICAgICAgICAgdXBkYXRlSGFuZGxlciA9IG51bGwsICAvLy9cbiAgICAgICAgICBjYW1lcmEgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENhbWVyYSwgcHJvcGVydGllcywgcGFuLCB0aWx0LCB6b29tLCBrZXlFdmVudHMsIG1vdXNlRXZlbnRzLCB1cGRhdGVIYW5kbGVyKTtcblxuICAgIHJldHVybiBjYW1lcmE7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDYW1lcmE7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50JyksXG4gICAgICBhcnJheVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9hcnJheScpLFxuICAgICAgdHJhbnNmb3JtVXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL3RyYW5zZm9ybScpO1xuXG5jb25zdCB7IHB1c2ggfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBjb21wb3NlVHJhbnNmb3JtIH0gPSB0cmFuc2Zvcm1VdGlsaXRpZXM7XG5cbmNsYXNzIENhbnZhc0VsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IodHJhbnNmb3JtLCBmYWNldHMsIG1hc2spIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gICAgdGhpcy5mYWNldHMgPSBmYWNldHM7XG4gICAgdGhpcy5tYXNrID0gbWFzaztcbiAgfVxuXG4gIGdldFRyYW5zZm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm07XG4gIH1cblxuICBnZXRGYWNldHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmFjZXRzO1xuICB9XG5cbiAgZ2V0TWFzaygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXNrO1xuICB9XG5cbiAgc2V0RmFjZXRzKGZhY2V0cykge1xuICAgIHRoaXMuZmFjZXRzID0gZmFjZXRzO1xuICB9XG5cbiAgZ2V0VmVydGV4SW5kZXhlcygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhJbmRleGVzID0gdGhpcy5mYWNldHMucmVkdWNlKCh2ZXJ0ZXhJbmRleGVzLCBmYWNldCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGZhY2V0VmVydGV4SW5kZXhlcyA9IGZhY2V0LmdldFZlcnRleEluZGV4ZXMoaW5kZXgpO1xuICAgICAgXG4gICAgICBwdXNoKHZlcnRleEluZGV4ZXMsIGZhY2V0VmVydGV4SW5kZXhlcyk7XG5cbiAgICAgIHJldHVybiB2ZXJ0ZXhJbmRleGVzO1xuICAgIH0sIFtdKTtcblxuICAgIHJldHVybiB2ZXJ0ZXhJbmRleGVzO1xuICB9XG5cbiAgZ2V0VmVydGV4Tm9ybWFscygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhOb3JtYWxzID0gdGhpcy5mYWNldHMucmVkdWNlKCh2ZXJ0ZXhOb3JtYWxzLCBmYWNldCkgPT4ge1xuICAgICAgY29uc3QgZmFjZXRWZXJ0ZXhOb3JtYWxzID0gZmFjZXQuZ2V0VmVydGV4Tm9ybWFscygpO1xuXG4gICAgICBwdXNoKHZlcnRleE5vcm1hbHMsIGZhY2V0VmVydGV4Tm9ybWFscyk7XG5cbiAgICAgIHJldHVybiB2ZXJ0ZXhOb3JtYWxzO1xuICAgIH0sIFtdKTtcblxuICAgIHJldHVybiB2ZXJ0ZXhOb3JtYWxzO1xuICB9XG5cbiAgZ2V0VmVydGV4UG9zaXRpb25zKCkge1xuICAgIGNvbnN0IHZlcnRleFBvc2l0aW9ucyA9IHRoaXMuZmFjZXRzLnJlZHVjZSgodmVydGV4UG9zaXRpb25zLCBmYWNldCkgPT4ge1xuICAgICAgY29uc3QgZmFjZXRWZXJ0ZXhQb3NpdGlvbnMgPSBmYWNldC5nZXRWZXJ0ZXhQb3NpdGlvbnMoKTtcblxuICAgICAgcHVzaCh2ZXJ0ZXhQb3NpdGlvbnMsIGZhY2V0VmVydGV4UG9zaXRpb25zKTtcblxuICAgICAgcmV0dXJuIHZlcnRleFBvc2l0aW9ucztcbiAgICB9LCBbXSk7XG5cbiAgICByZXR1cm4gdmVydGV4UG9zaXRpb25zO1xuICB9XG5cbiAgYXBwbHlNYXNrKG1hc2spIHtcbiAgICBpZiAobWFzaykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXM7IC8vL1xuXG4gICAgICBtYXNrLm1hc2tFbGVtZW50KGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGFwcGx5VHJhbnNmb3JtKHRyYW5zZm9ybSkge1xuICAgIHRoaXMuZmFjZXRzLmZvckVhY2goKGZhY2V0KSA9PiBmYWNldC5hcHBseVRyYW5zZm9ybSh0cmFuc2Zvcm0pKTtcblxuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoKTtcblxuICAgIGNoaWxkRWxlbWVudHMuZm9yRWFjaCgoY2hpbGRFbGVtZW50KSA9PiBjaGlsZEVsZW1lbnQuYXBwbHlUcmFuc2Zvcm0odHJhbnNmb3JtKSk7XG4gIH1cblxuICBhcHBseVRyYW5zZm9ybXNBbmRNYXNrcygpIHtcbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCk7XG5cbiAgICBjaGlsZEVsZW1lbnRzLmZvckVhY2goKGNoaWxkRWxlbWVudCkgPT4gY2hpbGRFbGVtZW50LmFwcGx5VHJhbnNmb3Jtc0FuZE1hc2tzKCkpO1xuXG4gICAgdGhpcy5hcHBseVRyYW5zZm9ybSh0aGlzLnRyYW5zZm9ybSk7XG5cbiAgICB0aGlzLmFwcGx5TWFzayh0aGlzLm1hc2spO1xuICB9XG5cbiAgcmVuZGVyKGNvbG91clJlbmRlcmVyLCB0ZXh0dXJlUmVuZGVyZXIpIHtcbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCk7XG5cbiAgICBjaGlsZEVsZW1lbnRzLmZvckVhY2goKGNoaWxkRWxlbWVudCkgPT4gY2hpbGRFbGVtZW50LnJlbmRlcihjb2xvdXJSZW5kZXJlciwgdGV4dHVyZVJlbmRlcmVyKSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIGZhY2V0cyA9IFtdLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCB7IHNpemUsIHBvc2l0aW9uLCByb3RhdGlvbnMsIG1hc2sgPSBudWxsIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHRyYW5zZm9ybSA9IGNvbXBvc2VUcmFuc2Zvcm0oc2l6ZSwgcG9zaXRpb24sIHJvdGF0aW9ucyksXG4gICAgICAgICAgY2FudmFzRWxlbWVudCA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIHRyYW5zZm9ybSwgZmFjZXRzLCBtYXNrLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuXG4gICAgcmV0dXJuIGNhbnZhc0VsZW1lbnQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDYW52YXNFbGVtZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDb2xvdXJlZEZhY2V0ID0gcmVxdWlyZSgnLi4vLi4vcHJpbWl0aXZlL2ZhY2V0L2NvbG91cmVkJyksXG4gICAgICBDYW52YXNFbGVtZW50ID0gcmVxdWlyZSgnLi4vLi4vZWxlbWVudC9jYW52YXMnKSxcbiAgICAgIGFycmF5VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vdXRpbGl0aWVzL2FycmF5Jyk7XG5cbmNvbnN0IHsgcHVzaCB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmNsYXNzIENvbG91cmVkQ2FudmFzRWxlbWVudCBleHRlbmRzIENhbnZhc0VsZW1lbnQge1xuICByZW5kZXIoY29sb3VyUmVuZGVyZXIsIHRleHR1cmVSZW5kZXJlcikge1xuICAgIGNvbnN0IHZlcnRleEluZGV4ZXMgPSB0aGlzLmdldFZlcnRleEluZGV4ZXMoKSxcbiAgICAgICAgICB2ZXJ0ZXhOb3JtYWxzID0gdGhpcy5nZXRWZXJ0ZXhOb3JtYWxzKCksXG4gICAgICAgICAgdmVydGV4Q29sb3VycyA9IHRoaXMuZ2V0VmVydGV4Q29sb3VycygpLFxuICAgICAgICAgIHZlcnRleFBvc2l0aW9ucyA9IHRoaXMuZ2V0VmVydGV4UG9zaXRpb25zKCk7XG5cbiAgICBjb2xvdXJSZW5kZXJlci5hZGRWZXJ0ZXhQb3NpdGlvbnModmVydGV4UG9zaXRpb25zKTtcblxuICAgIGNvbG91clJlbmRlcmVyLmFkZFZlcnRleEluZGV4ZXModmVydGV4SW5kZXhlcyk7XG5cbiAgICBjb2xvdXJSZW5kZXJlci5hZGRWZXJ0ZXhOb3JtYWxzKHZlcnRleE5vcm1hbHMpO1xuXG4gICAgY29sb3VyUmVuZGVyZXIuYWRkVmVydGV4Q29sb3Vycyh2ZXJ0ZXhDb2xvdXJzKTtcblxuICAgIHN1cGVyLnJlbmRlcihjb2xvdXJSZW5kZXJlciwgdGV4dHVyZVJlbmRlcmVyKTtcbiAgfVxuXG4gIGdldFZlcnRleENvbG91cnMoKSB7XG4gICAgY29uc3QgZmFjZXRzID0gdGhpcy5nZXRGYWNldHMoKSxcbiAgICAgICAgICB2ZXJ0ZXhDb2xvdXJzID0gZmFjZXRzLnJlZHVjZSgodmVydGV4Q29sb3VycywgZmFjZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbG91cmVkRmFjZXQgPSBmYWNldCwgIC8vL1xuICAgICAgICAgICAgICAgICAgY29sb3VyZWRGYWNldFZlcnRleENvbG91cnMgPSBjb2xvdXJlZEZhY2V0LmdldFZlcnRleENvbG91cnMoKTtcblxuICAgICAgICAgICAgcHVzaCh2ZXJ0ZXhDb2xvdXJzLCBjb2xvdXJlZEZhY2V0VmVydGV4Q29sb3Vycyk7XG5cbiAgICAgICAgICAgIHJldHVybiB2ZXJ0ZXhDb2xvdXJzO1xuICAgICAgICAgIH0sIFtdKTtcblxuICAgIHJldHVybiB2ZXJ0ZXhDb2xvdXJzO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBjb29yZGluYXRlcywgaW5kZXhlcywgY29sb3VyLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBpbmRleFR1cGxlcyA9IGluZGV4ZXMsICAvLy9cbiAgICAgICAgICBjb29yZGluYXRlVHVwbGVzID0gY29vcmRpbmF0ZXMsIC8vL1xuICAgICAgICAgIGNvbG91cmVkRmFjZXRzID0gaW5kZXhUdXBsZXMubWFwKChpbmRleFR1cGxlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2xvdXJlZEZhY2V0ID0gQ29sb3VyZWRGYWNldC5mcm9tQ29vcmRpbmF0ZVR1cGxlc0luZGV4VHVwbGVBbmRDb2xvdXIoY29vcmRpbmF0ZVR1cGxlcywgaW5kZXhUdXBsZSwgY29sb3VyKTtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbG91cmVkRmFjZXQ7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgZmFjZXRzID0gY29sb3VyZWRGYWNldHMsICAvLy9cbiAgICAgICAgICBjb2xvdXJlZENhbnZhc0VsZW1lbnQgPSBDYW52YXNFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBmYWNldHMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG5cbiAgICByZXR1cm4gY29sb3VyZWRDYW52YXNFbGVtZW50O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sb3VyZWRDYW52YXNFbGVtZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDYW52YXNFbGVtZW50ID0gcmVxdWlyZSgnLi4vLi4vZWxlbWVudC9jYW52YXMnKTtcblxuY2xhc3MgRnVuY3Rpb25DYW52YXNFbGVtZW50IGV4dGVuZHMgQ2FudmFzRWxlbWVudCB7XG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgZmFjZXRzID0gW10sXG4gICAgICAgICAgZnVuY3Rpb25FbGVtZW50ID0gQ2FudmFzRWxlbWVudC5mcm9tUHJvcGVydGllcyhGdW5jdGlvbkNhbnZhc0VsZW1lbnQsIHByb3BlcnRpZXMsIGZhY2V0cyk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb25FbGVtZW50O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb25DYW52YXNFbGVtZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBUZXh0dXJlZEZhY2V0ID0gcmVxdWlyZSgnLi4vLi4vcHJpbWl0aXZlL2ZhY2V0L3RleHR1cmVkJyksXG4gICAgICBDYW52YXNFbGVtZW50ID0gcmVxdWlyZSgnLi4vLi4vZWxlbWVudC9jYW52YXMnKSxcbiAgICAgIGFycmF5VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vdXRpbGl0aWVzL2FycmF5Jyk7XG5cbmNvbnN0IHsgcHVzaCB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmNsYXNzIFRleHR1cmVkQ2FudmFzRWxlbWVudCBleHRlbmRzIENhbnZhc0VsZW1lbnQge1xuICByZW5kZXIoY29sb3VyUmVuZGVyZXIsIHRleHR1cmVSZW5kZXJlcikge1xuICAgIGNvbnN0IGltYWdlTWFwSlNPTiA9IHRleHR1cmVSZW5kZXJlci5nZXRJbWFnZU1hcEpTT04oKSxcblx0XHRcdFx0XHR2ZXJ0ZXhJbmRleGVzID0gdGhpcy5nZXRWZXJ0ZXhJbmRleGVzKCksXG4gICAgICAgICAgdmVydGV4Tm9ybWFscyA9IHRoaXMuZ2V0VmVydGV4Tm9ybWFscygpLFxuICAgICAgICAgIHZlcnRleFBvc2l0aW9ucyA9IHRoaXMuZ2V0VmVydGV4UG9zaXRpb25zKCksXG4gICAgICAgICAgdmVydGV4VGV4dHVyZUNvb3JkaW5hdGVzVHVwbGVzID0gdGhpcy5nZXRWZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZXMoaW1hZ2VNYXBKU09OKTtcblxuICAgIHRleHR1cmVSZW5kZXJlci5hZGRWZXJ0ZXhQb3NpdGlvbnModmVydGV4UG9zaXRpb25zKTtcblxuICAgIHRleHR1cmVSZW5kZXJlci5hZGRWZXJ0ZXhJbmRleGVzKHZlcnRleEluZGV4ZXMpO1xuXG4gICAgdGV4dHVyZVJlbmRlcmVyLmFkZFZlcnRleE5vcm1hbHModmVydGV4Tm9ybWFscyk7XG5cbiAgICB0ZXh0dXJlUmVuZGVyZXIuYWRkVmVydGV4VGV4dHVyZUNvb3JkaW5hdGVzKHZlcnRleFRleHR1cmVDb29yZGluYXRlc1R1cGxlcyk7XG5cbiAgICBzdXBlci5yZW5kZXIoY29sb3VyUmVuZGVyZXIsIHRleHR1cmVSZW5kZXJlcik7XG4gIH1cblxuICBnZXRWZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZXMoaW1hZ2VNYXBKU09OKSB7XG4gICAgY29uc3QgZmFjZXRzID0gdGhpcy5nZXRGYWNldHMoKSxcbiAgICAgICAgICB2ZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZXMgPSBmYWNldHMucmVkdWNlKCh2ZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZXMsIGZhY2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0dXJlZEZhY2V0ID0gZmFjZXQsICAvLy9cbiAgICAgICAgICAgICAgICAgIHRleHR1cmVkRmFjZXRWZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZXMgPSB0ZXh0dXJlZEZhY2V0LmdldFZlcnRleFRleHR1cmVDb29yZGluYXRlc1R1cGxlKGltYWdlTWFwSlNPTik7XG4gIFxuICAgICAgICAgICAgcHVzaCh2ZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZXMsIHRleHR1cmVkRmFjZXRWZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZXMpO1xuICBcbiAgICAgICAgICAgIHJldHVybiB2ZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZXM7XG4gICAgICAgICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIHZlcnRleFRleHR1cmVDb29yZGluYXRlc1R1cGxlcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgY29vcmRpbmF0ZXMsIGluZGV4ZXMsIGltYWdlTmFtZSwgdGV4dHVyZUNvb3JkaW5hdGVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBpbmRleFR1cGxlcyA9IGluZGV4ZXMsICAvLy9cbiAgICAgICAgICBjb29yZGluYXRlVHVwbGVzID0gY29vcmRpbmF0ZXMsIC8vL1xuICAgICAgICAgIHRleHR1cmVDb29yZGluYXRlc1R1cGxlcyA9IHRleHR1cmVDb29yZGluYXRlcywgLy8vXG4gICAgICAgICAgdGV4dHVyZWRGYWNldHMgPSBpbmRleFR1cGxlcy5tYXAoKGluZGV4VHVwbGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSA9IHRleHR1cmVDb29yZGluYXRlc1R1cGxlc1tpbmRleF0sXG4gICAgICAgICAgICAgICAgICB0ZXh0dXJlZEZhY2V0ID0gVGV4dHVyZWRGYWNldC5mcm9tVGV4dHVyZUNvb3JkaW5hdGVUdXBsZUNvb3JkaW5hdGVzVHVwbGVzSW5kZXhUdXBsZUFuZEltYWdlTmFtZSh0ZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSwgY29vcmRpbmF0ZVR1cGxlcywgaW5kZXhUdXBsZSwgaW1hZ2VOYW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRleHR1cmVkRmFjZXQ7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgZmFjZXRzID0gdGV4dHVyZWRGYWNldHMsICAvLy9cbiAgICAgICAgICB0ZXh0dXJlZENhbnZhc0VsZW1lbnQgPSBDYW52YXNFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBmYWNldHMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gICAgXG4gICAgcmV0dXJuIHRleHR1cmVkQ2FudmFzRWxlbWVudDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHR1cmVkQ2FudmFzRWxlbWVudDtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKSxcbiAgICAgIE1hc2tpbmdGYWNldCA9IHJlcXVpcmUoJy4uL3ByaW1pdGl2ZS9tYXNraW5nRmFjZXQnKSxcbiAgICAgIGFycmF5VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL2FycmF5Jyk7XG5cbmNvbnN0IHsgcHVzaCB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmNsYXNzIE1hc2sgZXh0ZW5kcyBFbGVtZW50IHtcbiAgcmV0cmlldmVNYXNraW5nRmFjZXRzKCkge1xuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgICBmYWNldHMgPSByZXRyaWV2ZUZhY2V0cyhjaGlsZEVsZW1lbnRzKSxcbiAgICAgICAgICBtYXNraW5nRmFjZXRzID0gZmFjZXRzLm1hcCgoZmFjZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hc2tpbmdGYWNldCA9IE1hc2tpbmdGYWNldC5mcm9tRmFjZXQoZmFjZXQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbWFza2luZ0ZhY2V0O1xuICAgICAgICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBtYXNraW5nRmFjZXRzOyAgICAgICAgICBcbiAgfVxuXG4gIG1hc2tFbGVtZW50KGVsZW1lbnQpIHtcbiAgICBjb25zdCBtYXNraW5nRmFjZXRzID0gdGhpcy5yZXRyaWV2ZU1hc2tpbmdGYWNldHMoKSxcbiAgICAgICAgICBjaGlsZEVsZW1lbnRzID0gZWxlbWVudC5nZXRDaGlsZEVsZW1lbnRzKCk7XG5cbiAgICBtYXNrRWxlbWVudChlbGVtZW50LCBtYXNraW5nRmFjZXRzKTtcblxuICAgIGNoaWxkRWxlbWVudHMuZm9yRWFjaCgoY2hpbGRFbGVtZW50KSA9PiBtYXNrRWxlbWVudChjaGlsZEVsZW1lbnQsIG1hc2tpbmdGYWNldHMpKTtcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygpO1xuXG4gICAgY2hpbGRFbGVtZW50cy5mb3JFYWNoKChjaGlsZEVsZW1lbnQpID0+IGNoaWxkRWxlbWVudC5hcHBseVRyYW5zZm9ybXNBbmRNYXNrcygpKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgbWFzayA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoTWFzaywgcHJvcGVydGllcyk7XG5cbiAgICBtYXNrLmluaXRpYWxpc2UoKTtcblxuICAgIHJldHVybiBtYXNrO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWFzaztcblxuZnVuY3Rpb24gcmV0cmlldmVGYWNldHMoY2hpbGRFbGVtZW50cywgZmFjZXRzID0gW10pIHtcbiAgY2hpbGRFbGVtZW50cy5mb3JFYWNoKChjaGlsZEVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gY2hpbGRFbGVtZW50LCAvLy9cbiAgICAgICAgICBlbGVtZW50RmFjZXRzID0gZWxlbWVudC5nZXRGYWNldHMoKSxcbiAgICAgICAgICBjaGlsZEVsZW1lbnRzID0gZWxlbWVudC5nZXRDaGlsZEVsZW1lbnRzKCk7XG5cbiAgICBwdXNoKGZhY2V0cywgZWxlbWVudEZhY2V0cyk7XG5cbiAgICByZXRyaWV2ZUZhY2V0cyhjaGlsZEVsZW1lbnRzLCBmYWNldHMpO1xuICB9KTtcblxuICByZXR1cm4gZmFjZXRzO1xufVxuXG5mdW5jdGlvbiBtYXNrRWxlbWVudChlbGVtZW50LCBtYXNraW5nRmFjZXRzKSB7XG4gIGxldCBmYWNldHMgPSBlbGVtZW50LmdldEZhY2V0cygpO1xuXG4gIG1hc2tpbmdGYWNldHMuZm9yRWFjaCgobWFza2luZ0ZhY2V0KSA9PiB7XG4gICAgY29uc3QgdW5tYXNrZWRGYWNldHMgPSBbXTtcblxuICAgIGZhY2V0cy5mb3JFYWNoKChmYWNldCkgPT4gbWFza2luZ0ZhY2V0Lm1hc2tGYWNldChmYWNldCwgdW5tYXNrZWRGYWNldHMpKTtcblxuICAgIGZhY2V0cyA9IHVubWFza2VkRmFjZXRzOyAgLy8vXG4gIH0pO1xuXG4gIGVsZW1lbnQuc2V0RmFjZXRzKGZhY2V0cyk7XG5cbiAgY29uc3QgY2hpbGRFbGVtZW50cyA9IGVsZW1lbnQuZ2V0Q2hpbGRFbGVtZW50cygpO1xuXG4gIGNoaWxkRWxlbWVudHMuZm9yRWFjaCgoY2hpbGRFbGVtZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGNoaWxkRWxlbWVudDsgLy8vXG5cbiAgICBtYXNrRWxlbWVudChlbGVtZW50LCBtYXNraW5nRmFjZXRzKTtcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50JyksXG4gICAgICBDb2xvdXJSZW5kZXJlciA9IHJlcXVpcmUoJy4uL3JlbmRlcmVyL2NvbG91cicpLFxuICAgICAgVGV4dHVyZVJlbmRlcmVyID0gcmVxdWlyZSgnLi4vcmVuZGVyZXIvdGV4dHVyZScpO1xuXG5jbGFzcyBQYXJ0IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKGltYWdlTWFwLCBpbWFnZU1hcEpTT04sIGNvbG91clJlbmRlcmVyLCB0ZXh0dXJlUmVuZGVyZXIpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pbWFnZU1hcCA9IGltYWdlTWFwO1xuICAgIHRoaXMuaW1hZ2VNYXBKU09OID0gaW1hZ2VNYXBKU09OO1xuICAgIHRoaXMuY29sb3VyUmVuZGVyZXIgPSBjb2xvdXJSZW5kZXJlcjtcbiAgICB0aGlzLnRleHR1cmVSZW5kZXJlciA9IHRleHR1cmVSZW5kZXJlcjtcbiAgfVxuICBcbiAgcmVuZGVyKGNhbnZhcywgb2Zmc2V0TWF0cml4LCByb3RhdGlvbk1hdHJpeCwgcG9zaXRpb25NYXRyaXgsIHByb2plY3Rpb25NYXRyaXgsIG5vcm1hbE1hdHJpeCkge1xuICAgIGNvbnN0IGNvbG91clJlbmRlcmVyUHJvZ3JhbSA9IHRoaXMuY29sb3VyUmVuZGVyZXIuZ2V0UHJvZ3JhbSgpLFxuICAgICAgICAgIHRleHR1cmVSZW5kZXJlclByb2dyYW0gPSB0aGlzLnRleHR1cmVSZW5kZXJlci5nZXRQcm9ncmFtKCk7XG5cbiAgICBjYW52YXMudXNlUHJvZ3JhbShjb2xvdXJSZW5kZXJlclByb2dyYW0pO1xuXG4gICAgdGhpcy5jb2xvdXJSZW5kZXJlci5iaW5kQnVmZmVycyhjYW52YXMpO1xuXG4gICAgY2FudmFzLnJlbmRlcih0aGlzLmNvbG91clJlbmRlcmVyLCBvZmZzZXRNYXRyaXgsIHJvdGF0aW9uTWF0cml4LCBwb3NpdGlvbk1hdHJpeCwgcHJvamVjdGlvbk1hdHJpeCwgbm9ybWFsTWF0cml4KTtcblxuICAgIGNhbnZhcy51c2VQcm9ncmFtKHRleHR1cmVSZW5kZXJlclByb2dyYW0pO1xuICAgIFxuICAgIHRoaXMudGV4dHVyZVJlbmRlcmVyLmJpbmRCdWZmZXJzKGNhbnZhcyk7XG4gICAgXG4gICAgdGhpcy50ZXh0dXJlUmVuZGVyZXIuYWN0aXZhdGVUZXh0dXJlKGNhbnZhcyk7XG4gICAgXG4gICAgY2FudmFzLnJlbmRlcih0aGlzLnRleHR1cmVSZW5kZXJlciwgb2Zmc2V0TWF0cml4LCByb3RhdGlvbk1hdHJpeCwgcG9zaXRpb25NYXRyaXgsIHByb2plY3Rpb25NYXRyaXgsIG5vcm1hbE1hdHJpeCk7XG4gIH1cbiAgXG4gIGluaXRpYWxpc2UoY2FudmFzKSB7XG4gICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygpLFxuICAgICAgICAgIGNvbG91clJlbmRlcmVyID0gQ29sb3VyUmVuZGVyZXIuZnJvbU5vdGhpbmcoY2FudmFzKSxcbiAgICAgICAgICB0ZXh0dXJlUmVuZGVyZXIgPSBUZXh0dXJlUmVuZGVyZXIuZnJvbUltYWdlTWFwQW5kSW1hZ2VNYXBKU09OKHRoaXMuaW1hZ2VNYXAsIHRoaXMuaW1hZ2VNYXBKU09OLCBjYW52YXMpO1xuXG4gICAgY2hpbGRFbGVtZW50cy5mb3JFYWNoKChjaGlsZEVsZW1lbnQpID0+IGNoaWxkRWxlbWVudC5hcHBseVRyYW5zZm9ybXNBbmRNYXNrcygpKTtcblxuICAgIGNoaWxkRWxlbWVudHMuZm9yRWFjaCgoY2hpbGRFbGVtZW50KSA9PiBjaGlsZEVsZW1lbnQucmVuZGVyKGNvbG91clJlbmRlcmVyLCB0ZXh0dXJlUmVuZGVyZXIpKTtcblxuICAgIGNvbG91clJlbmRlcmVyLmNyZWF0ZUJ1ZmZlcnMoY2FudmFzKTtcblxuICAgIHRleHR1cmVSZW5kZXJlci5jcmVhdGVCdWZmZXJzKGNhbnZhcyk7XG5cbiAgICB0aGlzLmNvbG91clJlbmRlcmVyID0gY29sb3VyUmVuZGVyZXI7XG5cbiAgICB0aGlzLnRleHR1cmVSZW5kZXJlciA9IHRleHR1cmVSZW5kZXJlcjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBpbWFnZU1hcCwgaW1hZ2VNYXBKU09OIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNvbG91clJlbmRlcmVyID0gbnVsbCwgIC8vL1xuICAgICAgICAgIHRleHR1cmVSZW5kZXJlciA9IG51bGwsIC8vL1xuICAgICAgICAgIHBhcnQgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFBhcnQsIHByb3BlcnRpZXMsIGltYWdlTWFwLCBpbWFnZU1hcEpTT04sIGNvbG91clJlbmRlcmVyLCB0ZXh0dXJlUmVuZGVyZXIpO1xuXG4gICAgcmV0dXJuIHBhcnQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYXJ0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG5jbGFzcyBTY2VuZSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gIH1cblxuICBvblJlc2l6ZShyZXNpemVIYW5kbGVyKSB7XG4gICAgd2luZG93Lm9ucmVzaXplID0gcmVzaXplSGFuZGxlcjtcbiAgfVxuXG4gIHJlc2l6ZUhhbmRsZXIoKSB7XG4gICAgY29uc3QgY2xpZW50V2lkdGggPSB0aGlzLmNhbnZhcy5nZXRDbGllbnRXaWR0aCgpLFxuICAgICAgICAgIGNsaWVudEhlaWdodCA9IHRoaXMuY2FudmFzLmdldENsaWVudEhlaWdodCgpLFxuICAgICAgICAgIHdpZHRoID0gY2xpZW50V2lkdGgsICAvLy9cbiAgICAgICAgICBoZWlnaHQgPSBjbGllbnRIZWlnaHQ7ICAvLy9cblxuICAgIHRoaXMuY2FudmFzLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHRoaXMuZm9yY2VVcGRhdGUodGhpcy5jYW52YXMpO1xuICB9XG5cbiAgdXBkYXRlSGFuZGxlcihvZmZzZXRNYXRyaXgsIHJvdGF0aW9uTWF0cml4LCBwb3NpdGlvbk1hdHJpeCwgcHJvamVjdGlvbk1hdHJpeCwgbm9ybWFsTWF0cml4KSB7XG4gICAgdGhpcy5yZW5kZXIob2Zmc2V0TWF0cml4LCByb3RhdGlvbk1hdHJpeCwgcG9zaXRpb25NYXRyaXgsIHByb2plY3Rpb25NYXRyaXgsIG5vcm1hbE1hdHJpeCk7XG4gIH1cblxuICByZW5kZXIob2Zmc2V0TWF0cml4LCByb3RhdGlvbk1hdHJpeCwgcG9zaXRpb25NYXRyaXgsIHByb2plY3Rpb25NYXRyaXgsIG5vcm1hbE1hdHJpeCkge1xuICAgIHRoaXMuY2FudmFzLmNsZWFyKCk7XG5cbiAgICB0aGlzLmNoaWxkRWxlbWVudHMuZm9yRWFjaCgoY2hpbGRFbGVtZW50KSA9PiBjaGlsZEVsZW1lbnQucmVuZGVyKHRoaXMuY2FudmFzLCBvZmZzZXRNYXRyaXgsIHJvdGF0aW9uTWF0cml4LCBwb3NpdGlvbk1hdHJpeCwgcHJvamVjdGlvbk1hdHJpeCwgbm9ybWFsTWF0cml4KSk7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgICByZXNpemVIYW5kbGVyID0gdGhpcy5yZXNpemVIYW5kbGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgdXBkYXRlSGFuZGxlciA9IHRoaXMudXBkYXRlSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG5cbiAgICB0aGlzLm9uUmVzaXplKHJlc2l6ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5vblVwZGF0ZSh1cGRhdGVIYW5kbGVyKTtcblxuICAgIGNoaWxkRWxlbWVudHMuZm9yRWFjaCgoY2hpbGRFbGVtZW50KSA9PiBjaGlsZEVsZW1lbnQuaW5pdGlhbGlzZSh0aGlzLmNhbnZhcykpO1xuXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyKCk7IC8vL1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBzY2VuZSA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoU2NlbmUsIHByb3BlcnRpZXMsIGNhbnZhcyk7XG5cbiAgICBzY2VuZS5pbml0aWFsaXNlKCk7XG5cbiAgICByZXR1cm4gc2NlbmU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTY2VuZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY3ViZUV4YW1wbGUgPSByZXF1aXJlKCcuL2V4YW1wbGUvY3ViZScpLFxuICAgICAgc2ltcGxlRXhhbXBsZSA9IHJlcXVpcmUoJy4vZXhhbXBsZS9zaW1wbGUnKSxcbiAgICAgIG1hc2tpbmdFeGFtcGxlID0gcmVxdWlyZSgnLi9leGFtcGxlL21hc2tpbmcnKSxcbiAgICAgIHB5cmFtaWRFeGFtcGxlID0gcmVxdWlyZSgnLi9leGFtcGxlL3B5cmFtaWQnKSxcbiAgICAgIHRlbXBvcmFyeUV4YW1wbGUgPSByZXF1aXJlKCcuL2V4YW1wbGUvdGVtcG9yYXJ5Jyk7XG5cbmNvbnN0IGV4YW1wbGUgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTsgIC8vL1xuXG5zd2l0Y2ggKGV4YW1wbGUpIHtcbiAgY2FzZSAndGVtcG9yYXJ5JzpcbiAgICB0ZW1wb3JhcnlFeGFtcGxlKCk7XG4gICAgYnJlYWs7XG5cbiAgY2FzZSAnc2ltcGxlJzpcbiAgICBzaW1wbGVFeGFtcGxlKCk7XG4gICAgYnJlYWs7XG5cbiAgY2FzZSAnY3ViZSc6XG4gICAgY3ViZUV4YW1wbGUoKTtcbiAgICBicmVhaztcblxuICBjYXNlICdtYXNraW5nJzpcbiAgICBtYXNraW5nRXhhbXBsZSgpO1xuICAgIGJyZWFrO1xuXG4gIGNhc2UgJ3B5cmFtaWQnOlxuICAgIHB5cmFtaWRFeGFtcGxlKCk7XG4gICAgYnJlYWs7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHhnbCA9IHJlcXVpcmUoJy4uLy4uL2luZGV4Jyk7IC8vL1xuXG5jb25zdCBDdWJlID0gcmVxdWlyZSgnLi9lbGVtZW50L2N1YmUnKTtcblxuY29uc3QgeyBDYW52YXMsIFNjZW5lLCBQYXJ0LCBDYW1lcmEgfSA9IHhnbDtcblxuY29uc3QgY2FudmFzID0gbmV3IENhbnZhcygpO1xuXG5jb25zdCBjdWJlRXhhbXBsZSA9ICgpID0+XG5cblx0PFNjZW5lIGNhbnZhcz17Y2FudmFzfT5cblx0XHQ8UGFydD5cblx0XHRcdDxDdWJlIGNvbG91cj17WyAwLCAxLCAwIF19IC8+XG5cdFx0PC9QYXJ0PlxuXHRcdDxDYW1lcmEgLz5cblx0PC9TY2VuZT5cblxuO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGN1YmVFeGFtcGxlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB4Z2wgPSByZXF1aXJlKCcuLi8uLi8uLi9pbmRleCcpOyAgLy8vXG5cbmNvbnN0IHsgQ29sb3VyZWRDYW52YXNFbGVtZW50IH0gPSB4Z2w7XG5cbmNvbnN0IGNvb3JkaW5hdGVzID0gW1xuXG4gICAgICAgIFsgMCwgMCwgMCBdLFxuICAgICAgICBbIDEsIDAsIDAgXSxcbiAgICAgICAgWyAwLCAxLCAwIF0sXG4gICAgICAgIFsgMSwgMSwgMCBdLFxuXG4gICAgICBdLFxuICAgICAgaW5kZXhlcyA9IFtcblxuICAgICAgICBbIDAsIDEsIDMgXSxcbiAgICAgICAgWyAzLCAyLCAwIF0sXG5cbiAgICAgIF0sXG4gICAgICBkZWZhdWx0Q29sb3VyID0gWyAxLCAwLCAwIF07XG5cbmNsYXNzIENvbG91cmVkU3F1YXJlIGV4dGVuZHMgQ29sb3VyZWRDYW52YXNFbGVtZW50IHtcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgXHRjb25zdCB7IGNvbG91ciA9IGRlZmF1bHRDb2xvdXIgfSA9IHByb3BlcnRpZXMsXG5cdFx0XHQgICAgY29sb3VyZWRTcXVhcmUgPSBDb2xvdXJlZENhbnZhc0VsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ29sb3VyZWRTcXVhcmUsIHByb3BlcnRpZXMsIGNvb3JkaW5hdGVzLCBpbmRleGVzLCBjb2xvdXIpO1xuXG4gIFx0cmV0dXJuIGNvbG91cmVkU3F1YXJlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sb3VyZWRTcXVhcmU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEZhY2UgPSByZXF1aXJlKCcuL2ZhY2UnKTtcblxuY29uc3QgZGVmYXVsdENvbG91ciA9IFsgMSwgMSwgMCBdO1xuXG5jb25zdCBDdWJlID0gKHByb3BlcnRpZXMpID0+IHtcbiAgY29uc3QgeyBjb2xvdXIgPSBkZWZhdWx0Q29sb3VyIH0gPSBwcm9wZXJ0aWVzO1xuXG4gIHJldHVybiAoW1xuXG4gICAgPEZhY2UgY29sb3VyPXtjb2xvdXJ9IHJvdGF0aW9ucz17WyAgIDAsICAgMCwgMCBdfSAvPixcbiAgICA8RmFjZSBjb2xvdXI9e2NvbG91cn0gcm90YXRpb25zPXtbICs5MCwgICAwLCAwIF19IC8+LFxuICAgIDxGYWNlIGNvbG91cj17Y29sb3VyfSByb3RhdGlvbnM9e1sgICAwLCArOTAsIDAgXX0gLz4sXG5cbiAgICA8RmFjZSBjb2xvdXI9e2NvbG91cn0gcm90YXRpb25zPXtbIDE4MCwgICAwLCAwIF19IC8+LFxuICAgIDxGYWNlIGNvbG91cj17Y29sb3VyfSByb3RhdGlvbnM9e1sgLTkwLCAgIDAsIDAgXX0gLz4sXG4gICAgPEZhY2UgY29sb3VyPXtjb2xvdXJ9IHJvdGF0aW9ucz17WyAgIDAsIC05MCwgMCBdfSAvPixcblxuICBdKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ3ViZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQ29sb3VyZWRTcXVhcmUgPSByZXF1aXJlKCcuL2NvbG91cmVkU3F1YXJlJyk7XG5cbmNvbnN0IEZhY2UgPSAocHJvcGVydGllcykgPT4ge1xuICBjb25zdCB7IGNvbG91ciB9ID0gcHJvcGVydGllcztcblxuICByZXR1cm4gKFxuXG4gICAgPENvbG91cmVkU3F1YXJlIGNvbG91cj17Y29sb3VyfSBwb3NpdGlvbj17WyAtMC41LCAtMC41LCArMC41IF19IC8+XG5cbiAgKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRmFjZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgU2lkZSA9IHJlcXVpcmUoJy4vc2lkZScpO1xuXG5jb25zdCBQeXJhbWlkID0gKHByb3BlcnRpZXMpID0+IFtcblxuICA8U2lkZSAvPixcbiAgPFNpZGUgcm90YXRpb25zPXtbIDAsICA5MCwgMCBdfSAvPixcbiAgPFNpZGUgcm90YXRpb25zPXtbIDAsIDE4MCwgMCBdfSAvPixcbiAgPFNpZGUgcm90YXRpb25zPXtbIDAsIDI3MCwgMCBdfSAvPixcblxuXTtcblxubW9kdWxlLmV4cG9ydHMgPSBQeXJhbWlkO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBUZXh0dXJlZFRyaWFuZ2xlID0gcmVxdWlyZSgnLi90ZXh0dXJlZFRyaWFuZ2xlJyk7XG5cbmNvbnN0IFNpZGUgPSAocHJvcGVydGllcykgPT5cblxuICA8VGV4dHVyZWRUcmlhbmdsZSBzaXplPXtbIDEsIDEvTWF0aC5zcXJ0KDIpLCAxIF19IHBvc2l0aW9uPXtbIC0wLjUsIDAsIDAuNSBdfSByb3RhdGlvbnM9e1sgLTQ1LCAwLCAwIF19IC8+XG5cbjtcblxubW9kdWxlLmV4cG9ydHMgPSBTaWRlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB4Z2wgPSByZXF1aXJlKCcuLi8uLi8uLi9pbmRleCcpOyAgLy8vXG5cbmNvbnN0IHsgVGV4dHVyZWRDYW52YXNFbGVtZW50IH0gPSB4Z2w7XG5cbmNvbnN0IGNvb3JkaW5hdGVzID0gW1xuXG4gICAgICAgIFsgICAwLCAwLCAwIF0sXG4gICAgICAgIFsgICAxLCAwLCAwIF0sXG4gICAgICAgIFsgMC41LCAxLCAwIF0sXG5cbiAgICAgIF0sXG4gICAgICBpbmRleGVzID0gW1xuXG4gICAgICAgIFsgMCwgMSwgMiBdLFxuXG4gICAgICBdLFxuICAgICAgZGVmYXVsdEltYWdlTmFtZSA9IFwic3RyaXBlcy5qcGdcIixcbiAgICAgIGRlZmF1bHRUZXh0dXJlQ29vcmRpbmF0ZXMgPSBbXG5cbiAgICAgICAgWyBbIDAsIDAgXSwgWyAxLCAwIF0sIFsgMC41LCAxIF0gXSxcblxuICAgICAgXTtcblxuY2xhc3MgVGV4dHVyZWRUcmlhbmdsZSBleHRlbmRzIFRleHR1cmVkQ2FudmFzRWxlbWVudCB7XG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBpbWFnZU5hbWUgPSBkZWZhdWx0SW1hZ2VOYW1lLCB0ZXh0dXJlQ29vcmRpbmF0ZXMgPSBkZWZhdWx0VGV4dHVyZUNvb3JkaW5hdGVzIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHRleHR1cmVkVHJpYW5nbGUgPSBUZXh0dXJlZENhbnZhc0VsZW1lbnQuZnJvbVByb3BlcnRpZXMoVGV4dHVyZWRUcmlhbmdsZSwgcHJvcGVydGllcywgY29vcmRpbmF0ZXMsIGluZGV4ZXMsIGltYWdlTmFtZSwgdGV4dHVyZUNvb3JkaW5hdGVzKTtcblxuICAgIHJldHVybiB0ZXh0dXJlZFRyaWFuZ2xlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dHVyZWRUcmlhbmdsZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeGdsID0gcmVxdWlyZSgnLi4vLi4vaW5kZXgnKTsgLy8vXG5cbmNvbnN0IEN1YmUgPSByZXF1aXJlKCcuL2VsZW1lbnQvY3ViZScpO1xuXG5jb25zdCB7IENhbnZhcywgU2NlbmUsIE1hc2ssIFBhcnQsIENhbWVyYSB9ID0geGdsO1xuXG5jb25zdCBjYW52YXMgPSBuZXcgQ2FudmFzKCk7XG5cbmNvbnN0IG1hc2tpbmdFeGFtcGxlID0gKCkgPT4ge1xuICBjb25zdCBTbWFsbEN1YmUgPVxuXG4gICAgICAgICAgPEN1YmUgc2l6ZT17WyAxLzQsIDEvNCwgMS80IF19IC8+XG5cbiAgICAgICAgLFxuICAgICAgICBzbWFsbEN1YmVNYXNrID1cblxuICAgICAgICAgIDxNYXNrPlxuICAgICAgICAgICAgPFNtYWxsQ3ViZSAvPlxuICAgICAgICAgIDwvTWFzaz5cblxuICAgICAgICAsXG4gICAgICAgIE1lZGl1bUN1YmUgPVxuXG4gICAgICAgICAgPEN1YmUgc2l6ZT17WyAxLzIsIDEvMiwgMS8yIF19IG1hc2s9e3NtYWxsQ3ViZU1hc2t9IC8+XG5cbiAgICAgICAgLFxuICAgICAgICBtZWRpdW1DdWJlTWFzayA9XG5cbiAgICAgICAgICA8TWFzaz5cbiAgICAgICAgICAgIDxNZWRpdW1DdWJlIC8+XG4gICAgICAgICAgPC9NYXNrPlxuXG4gICAgICAgICxcbiAgICAgICAgTGFyZ2VDdWJlID1cblxuICAgICAgICAgIDxDdWJlIG1hc2s9e21lZGl1bUN1YmVNYXNrfSAvPlxuXG4gICAgICAgIDtcblxuICByZXR1cm4gKFxuXG4gICAgPFNjZW5lIGNhbnZhcz17Y2FudmFzfT5cbiAgICAgIDxQYXJ0PlxuICAgICAgICA8TGFyZ2VDdWJlIC8+XG4gICAgICA8L1BhcnQ+XG4gICAgICA8Q2FtZXJhIC8+XG4gICAgPC9TY2VuZT5cblxuICApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtYXNraW5nRXhhbXBsZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeGdsID0gcmVxdWlyZSgnLi4vLi4vaW5kZXgnKTsgLy8vXG5cbmNvbnN0IFB5cmFtaWQgPSByZXF1aXJlKCcuL2VsZW1lbnQvcHlyYW1pZCcpLFxuICAgICAgY29uZmlndXJhdGlvbiA9IHJlcXVpcmUoJy4uL21pc2NlbGxhbmVvdXMvY29uZmlndXJhdGlvbicpO1xuXG5jb25zdCB7IENhbnZhcywgU2NlbmUsIFBhcnQsIENhbWVyYSB9ID0geGdsO1xuXG5jb25zdCBjYW52YXMgPSBuZXcgQ2FudmFzKCk7XG5cbmNvbnN0IHB5cmFtaWRFeGFtcGxlID0gKCkgPT4ge1xuICBwcmVsb2FkSW1hZ2VNYXAoKGltYWdlTWFwKSA9PiB7XG4gICAgY29uc3QgeyBpbWFnZU1hcEpTT04gfSA9IGNvbmZpZ3VyYXRpb247XG5cbiAgICByZXR1cm4gKFxuXG4gICAgICA8U2NlbmUgY2FudmFzPXtjYW52YXN9PlxuICAgICAgICA8UGFydCBpbWFnZU1hcD17aW1hZ2VNYXB9IGltYWdlTWFwSlNPTj17aW1hZ2VNYXBKU09OfT5cbiAgICAgICAgICA8UHlyYW1pZCAvPlxuICAgICAgICA8L1BhcnQ+XG4gICAgICAgIDxDYW1lcmEgLz5cbiAgICAgIDwvU2NlbmU+XG5cbiAgICApO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcHlyYW1pZEV4YW1wbGU7XG5cbmZ1bmN0aW9uIHByZWxvYWRJbWFnZU1hcChjYWxsYmFjaykge1xuICBjb25zdCB7IGltYWdlTWFwVVJJIH0gPSBjb25maWd1cmF0aW9uLFxuICAgICAgICBpbWFnZU1hcCA9IG5ldyBJbWFnZSgpLFx0Ly8vXG4gICAgICAgIHNyYyA9IGltYWdlTWFwVVJJOyAgLy8vXG5cbiAgT2JqZWN0LmFzc2lnbihpbWFnZU1hcCwge1xuICAgIHNyYyxcbiAgICBvbmxvYWRcbiAgfSk7XG5cbiAgZnVuY3Rpb24gb25sb2FkKGV2ZW50KSB7XG4gICAgY2FsbGJhY2soaW1hZ2VNYXApO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHhnbCA9IHJlcXVpcmUoJy4uLy4uL2luZGV4Jyk7IC8vL1xuXG5jb25zdCBDb2xvdXJlZFNxdWFyZSA9IHJlcXVpcmUoJy4vZWxlbWVudC9jb2xvdXJlZFNxdWFyZScpO1xuXG5jb25zdCB7IENhbnZhcywgU2NlbmUsIFBhcnQsIENhbWVyYSB9ID0geGdsO1xuXG5jb25zdCBjYW52YXMgPSBuZXcgQ2FudmFzKCk7XG5cbmNvbnN0IHNpbXBsZUV4YW1wbGUgPSAoKSA9PlxuXG4gIDxTY2VuZSBjYW52YXM9e2NhbnZhc30+XG4gICAgPFBhcnQ+XG4gICAgICA8Q29sb3VyZWRTcXVhcmUgY29sb3VyPXtbIDAsIDAsIDEgXX0gLz5cbiAgICA8L1BhcnQ+XG4gICAgPENhbWVyYSAvPlxuICA8L1NjZW5lPlxuXG47XG5cbm1vZHVsZS5leHBvcnRzID0gc2ltcGxlRXhhbXBsZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeGdsID0gcmVxdWlyZSgnLi4vLi4vaW5kZXgnKTsgLy8vXG5cbmNvbnN0IENvbG91cmVkU3F1YXJlID0gcmVxdWlyZSgnLi9lbGVtZW50L2NvbG91cmVkU3F1YXJlJyk7XG5cbmNvbnN0IHsgQ2FudmFzLCBTY2VuZSwgUGFydCwgTWFzaywgQ2FtZXJhIH0gPSB4Z2w7XG5cbmNvbnN0IGNhbnZhcyA9IG5ldyBDYW52YXMoKTtcblxuY29uc3QgbWFzayA9XG5cbiAgPE1hc2s+XG4gICAgPENvbG91cmVkU3F1YXJlIHNpemU9e1sgMC41LCAwLjUsIDAgXX0gLz5cbiAgPC9NYXNrPlxuXG47XG5cbmNvbnN0IE1hc2tlZENvbG91cmVkU3F1YXJlID0gKHByb3BlcnRpZXMpID0+XG5cbiAgPENvbG91cmVkU3F1YXJlIG1hc2s9e21hc2t9IC8+XG5cbjtcblxuICBjb25zdCB0ZW1wb3JhcnlFeGFtcGxlID0gKCkgPT5cblxuICA8U2NlbmUgY2FudmFzPXtjYW52YXN9PlxuICAgIDxQYXJ0PlxuICAgICAgPE1hc2tlZENvbG91cmVkU3F1YXJlIHNpemU9e1sgMiwgMiwgMCBdfSByb3RhdGlvbnM9e1sgMCwgNDUsIDAgXX0gLz5cbiAgICA8L1BhcnQ+XG4gICAgPENhbWVyYSAvPlxuICA8L1NjZW5lPlxuXG47XG5cbm1vZHVsZS5leHBvcnRzID0gdGVtcG9yYXJ5RXhhbXBsZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaWRlbnRpdHkyKCkge1xuICByZXR1cm4gKFtcblxuICAgIDEsIDAsXG4gICAgMCwgMSxcblxuICBdKTtcbn1cblxuZnVuY3Rpb24gaWRlbnRpdHkzKCkge1xuICByZXR1cm4gKFtcblxuICAgIDEsIDAsIDAsXG4gICAgMCwgMSwgMCxcbiAgICAwLCAwLCAxLFxuXG4gIF0pO1xufVxuXG5mdW5jdGlvbiBpZGVudGl0eTQoKSB7XG4gIHJldHVybiAoW1xuXG4gICAgMSwgMCwgMCwgMCxcbiAgICAwLCAxLCAwLCAwLFxuICAgIDAsIDAsIDEsIDAsXG4gICAgMCwgMCwgMCwgMSxcblxuICBdKTtcbn1cblxuZnVuY3Rpb24gaW52ZXJ0MihtYXRyaXgpIHtcbiAgY29uc3QgbTAgPSBtYXRyaXhbMF0sXG4gICAgICAgIG0xID0gbWF0cml4WzFdLFxuICAgICAgICBtMiA9IG1hdHJpeFsyXSxcbiAgICAgICAgbTMgPSBtYXRyaXhbM10sXG5cbiAgICAgICAgZGV0ZXJtaW5hbnQgPSBtMCAqIG0zIC0gbTIgKiBtMTtcblxuICBpZiAoZGV0ZXJtaW5hbnQgIT09IDApIHtcbiAgICByZXR1cm4gKFtcblxuICAgICAgK20zIC8gZGV0ZXJtaW5hbnQsXG4gICAgICAtbTEgLyBkZXRlcm1pbmFudCxcbiAgICAgIC1tMiAvIGRldGVybWluYW50LFxuICAgICAgK20wIC8gZGV0ZXJtaW5hbnQsXG5cbiAgICBdKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnZlcnQzKG1hdHJpeCkge1xuICBjb25zdCBhMDAgPSBtYXRyaXhbMF0sIGEwMSA9IG1hdHJpeFsxXSwgYTAyID0gbWF0cml4WzJdLFxuICAgICAgICBhMTAgPSBtYXRyaXhbM10sIGExMSA9IG1hdHJpeFs0XSwgYTEyID0gbWF0cml4WzVdLFxuICAgICAgICBhMjAgPSBtYXRyaXhbNl0sIGEyMSA9IG1hdHJpeFs3XSwgYTIyID0gbWF0cml4WzhdLFxuXG4gICAgICAgIGIwMSA9IGEyMiAqIGExMSAtIGExMiAqIGEyMSxcbiAgICAgICAgYjExID0gLWEyMiAqIGExMCArIGExMiAqIGEyMCxcbiAgICAgICAgYjIxID0gYTIxICogYTEwIC0gYTExICogYTIwLFxuXG4gICAgICAgIGRldGVybWluYW50ID0gYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxO1xuXG4gIGlmIChkZXRlcm1pbmFudCAhPT0gMCkge1xuICAgIHJldHVybiAoW1xuXG4gICAgICBiMDEgLyBkZXRlcm1pbmFudCxcbiAgICAgICgtYTIyICogYTAxICsgYTAyICogYTIxKSAvIGRldGVybWluYW50LFxuICAgICAgKGExMiAqIGEwMSAtIGEwMiAqIGExMSkgLyBkZXRlcm1pbmFudCxcbiAgICAgIGIxMSAvIGRldGVybWluYW50LFxuICAgICAgKGEyMiAqIGEwMCAtIGEwMiAqIGEyMCkgLyBkZXRlcm1pbmFudCxcbiAgICAgICgtYTEyICogYTAwICsgYTAyICogYTEwKSAvIGRldGVybWluYW50LFxuICAgICAgYjIxIC8gZGV0ZXJtaW5hbnQsXG4gICAgICAoLWEyMSAqIGEwMCArIGEwMSAqIGEyMCkgLyBkZXRlcm1pbmFudCxcbiAgICAgIChhMTEgKiBhMDAgLSBhMDEgKiBhMTApIC8gZGV0ZXJtaW5hbnQsXG5cbiAgICBdKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnZlcnQ0KG1hdHJpeCkge1xuICBjb25zdCBhMDAgPSBtYXRyaXhbIDBdLCBhMDEgPSBtYXRyaXhbIDFdLCBhMDIgPSBtYXRyaXhbIDJdLCBhMDMgPSBtYXRyaXhbIDNdLFxuICAgICAgICBhMTAgPSBtYXRyaXhbIDRdLCBhMTEgPSBtYXRyaXhbIDVdLCBhMTIgPSBtYXRyaXhbIDZdLCBhMTMgPSBtYXRyaXhbIDddLFxuICAgICAgICBhMjAgPSBtYXRyaXhbIDhdLCBhMjEgPSBtYXRyaXhbIDldLCBhMjIgPSBtYXRyaXhbMTBdLCBhMjMgPSBtYXRyaXhbMTFdLFxuICAgICAgICBhMzAgPSBtYXRyaXhbMTJdLCBhMzEgPSBtYXRyaXhbMTNdLCBhMzIgPSBtYXRyaXhbMTRdLCBhMzMgPSBtYXRyaXhbMTVdLFxuXG4gICAgICAgIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMCxcbiAgICAgICAgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwLFxuICAgICAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsXG4gICAgICAgIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMSxcbiAgICAgICAgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExLFxuICAgICAgICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG4gICAgICAgIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMCxcbiAgICAgICAgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwLFxuICAgICAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsXG4gICAgICAgIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMSxcbiAgICAgICAgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxLFxuICAgICAgICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzIsXG5cbiAgICAgICAgZGV0ZXJtaW5hbnQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG5cbiAgaWYgKGRldGVybWluYW50ICE9PSAwKSB7XG4gICAgcmV0dXJuIChbXG5cbiAgICAgIChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpIC8gZGV0ZXJtaW5hbnQsXG4gICAgICAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAvIGRldGVybWluYW50LFxuICAgICAgKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgLyBkZXRlcm1pbmFudCxcbiAgICAgIChhMjIgKiBiMDQgLSBhMjEgKiBiMDUgLSBhMjMgKiBiMDMpIC8gZGV0ZXJtaW5hbnQsXG4gICAgICAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAvIGRldGVybWluYW50LFxuICAgICAgKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgLyBkZXRlcm1pbmFudCxcbiAgICAgIChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpIC8gZGV0ZXJtaW5hbnQsXG4gICAgICAoYTIwICogYjA1IC0gYTIyICogYjAyICsgYTIzICogYjAxKSAvIGRldGVybWluYW50LFxuICAgICAgKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgLyBkZXRlcm1pbmFudCxcbiAgICAgIChhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDYpIC8gZGV0ZXJtaW5hbnQsXG4gICAgICAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAvIGRldGVybWluYW50LFxuICAgICAgKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgLyBkZXRlcm1pbmFudCxcbiAgICAgIChhMTEgKiBiMDcgLSBhMTAgKiBiMDkgLSBhMTIgKiBiMDYpIC8gZGV0ZXJtaW5hbnQsXG4gICAgICAoYTAwICogYjA5IC0gYTAxICogYjA3ICsgYTAyICogYjA2KSAvIGRldGVybWluYW50LFxuICAgICAgKGEzMSAqIGIwMSAtIGEzMCAqIGIwMyAtIGEzMiAqIGIwMCkgLyBkZXRlcm1pbmFudCxcbiAgICAgIChhMjAgKiBiMDMgLSBhMjEgKiBiMDEgKyBhMjIgKiBiMDApIC8gZGV0ZXJtaW5hbnQsXG5cbiAgICBdKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0cmFuc3Bvc2UyKG1hdHJpeCkge1xuICByZXR1cm4gKFtcblxuICAgIG1hdHJpeFswXSwgbWF0cml4WzJdLFxuICAgIG1hdHJpeFsxXSwgbWF0cml4WzNdLFxuXG4gIF0pO1xufVxuXG5mdW5jdGlvbiB0cmFuc3Bvc2UzKG1hdHJpeCkge1xuICByZXR1cm4gKFtcblxuICAgIG1hdHJpeFswXSwgbWF0cml4WzNdLCBtYXRyaXhbNl0sXG4gICAgbWF0cml4WzFdLCBtYXRyaXhbNF0sIG1hdHJpeFs3XSxcbiAgICBtYXRyaXhbMl0sIG1hdHJpeFs1XSwgbWF0cml4WzhdLFxuXG4gIF0pO1xufVxuXG5mdW5jdGlvbiB0cmFuc3Bvc2U0KG1hdHJpeCkge1xuICByZXR1cm4gKFtcblxuICAgIG1hdHJpeFsgMF0sIG1hdHJpeFsgNF0sIG1hdHJpeFsgOF0sIG1hdHJpeFsxMl0sXG4gICAgbWF0cml4WyAxXSwgbWF0cml4WyA1XSwgbWF0cml4WyA5XSwgbWF0cml4WzEzXSxcbiAgICBtYXRyaXhbIDJdLCBtYXRyaXhbIDZdLCBtYXRyaXhbMTBdLCBtYXRyaXhbMTRdLFxuICAgIG1hdHJpeFsgM10sIG1hdHJpeFsgN10sIG1hdHJpeFsxMV0sIG1hdHJpeFsxNV0sXG5cbiAgXSk7XG59XG5cbmZ1bmN0aW9uIHNjYWxlNChtYXRyaXgsIHZlY3Rvcikge1xuICBjb25zdCB4ID0gdmVjdG9yWzBdLFxuICAgICAgICB5ID0gdmVjdG9yWzFdLFxuICAgICAgICB6ID0gdmVjdG9yWzJdO1xuXG4gIHJldHVybiAoW1xuXG4gICAgbWF0cml4WyAwXSAqIHgsXG4gICAgbWF0cml4WyAxXSAqIHgsXG4gICAgbWF0cml4WyAyXSAqIHgsXG4gICAgbWF0cml4WyAzXSAqIHgsXG5cbiAgICBtYXRyaXhbIDRdICogeSxcbiAgICBtYXRyaXhbIDVdICogeSxcbiAgICBtYXRyaXhbIDZdICogeSxcbiAgICBtYXRyaXhbIDddICogeSxcblxuICAgIG1hdHJpeFsgOF0gKiB6LFxuICAgIG1hdHJpeFsgOV0gKiB6LFxuICAgIG1hdHJpeFsxMF0gKiB6LFxuICAgIG1hdHJpeFsxMV0gKiB6LFxuXG4gICAgbWF0cml4WzEyXSxcbiAgICBtYXRyaXhbMTNdLFxuICAgIG1hdHJpeFsxNF0sXG4gICAgbWF0cml4WzE1XSxcblxuICBdKTtcbn1cblxuZnVuY3Rpb24gcm90YXRlNChtYXRyaXgsIGFuZ2xlLCB2ZWN0b3IpIHtcbiAgbGV0IHggPSB2ZWN0b3JbMF0sXG4gICAgICB5ID0gdmVjdG9yWzFdLFxuICAgICAgeiA9IHZlY3RvclsyXTtcblxuICBjb25zdCBsZW5ndGggPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KTtcblxuICBpZiAobGVuZ3RoICE9PSAwKSB7XG4gICAgeCAvPSBsZW5ndGg7XG4gICAgeSAvPSBsZW5ndGg7XG4gICAgeiAvPSBsZW5ndGg7XG5cbiAgICBjb25zdCBzID0gTWF0aC5zaW4oYW5nbGUpLFxuICAgICAgICAgIGMgPSBNYXRoLmNvcyhhbmdsZSksXG4gICAgICAgICAgdCA9IDEgLSBjLFxuICAgICAgICAgIGEwMCA9IG1hdHJpeFsgMF0sXG4gICAgICAgICAgYTAxID0gbWF0cml4WyAxXSxcbiAgICAgICAgICBhMDIgPSBtYXRyaXhbIDJdLFxuICAgICAgICAgIGEwMyA9IG1hdHJpeFsgM10sXG4gICAgICAgICAgYTEwID0gbWF0cml4WyA0XSxcbiAgICAgICAgICBhMTEgPSBtYXRyaXhbIDVdLFxuICAgICAgICAgIGExMiA9IG1hdHJpeFsgNl0sXG4gICAgICAgICAgYTEzID0gbWF0cml4WyA3XSxcbiAgICAgICAgICBhMjAgPSBtYXRyaXhbIDhdLFxuICAgICAgICAgIGEyMSA9IG1hdHJpeFsgOV0sXG4gICAgICAgICAgYTIyID0gbWF0cml4WzEwXSxcbiAgICAgICAgICBhMjMgPSBtYXRyaXhbMTFdLFxuICAgICAgICAgIGIwMCA9IHggKiB4ICogdCArIGMsXG4gICAgICAgICAgYjAxID0geSAqIHggKiB0ICsgeiAqIHMsXG4gICAgICAgICAgYjAyID0geiAqIHggKiB0IC0geSAqIHMsXG4gICAgICAgICAgYjEwID0geCAqIHkgKiB0IC0geiAqIHMsXG4gICAgICAgICAgYjExID0geSAqIHkgKiB0ICsgYyxcbiAgICAgICAgICBiMTIgPSB6ICogeSAqIHQgKyB4ICogcyxcbiAgICAgICAgICBiMjAgPSB4ICogeiAqIHQgKyB5ICogcyxcbiAgICAgICAgICBiMjEgPSB5ICogeiAqIHQgLSB4ICogcyxcbiAgICAgICAgICBiMjIgPSB6ICogeiAqIHQgKyBjO1xuXG4gICAgcmV0dXJuIChbXG5cbiAgICAgIGEwMCAqIGIwMCArIGExMCAqIGIwMSArIGEyMCAqIGIwMixcbiAgICAgIGEwMSAqIGIwMCArIGExMSAqIGIwMSArIGEyMSAqIGIwMixcbiAgICAgIGEwMiAqIGIwMCArIGExMiAqIGIwMSArIGEyMiAqIGIwMixcbiAgICAgIGEwMyAqIGIwMCArIGExMyAqIGIwMSArIGEyMyAqIGIwMixcbiAgICAgIGEwMCAqIGIxMCArIGExMCAqIGIxMSArIGEyMCAqIGIxMixcbiAgICAgIGEwMSAqIGIxMCArIGExMSAqIGIxMSArIGEyMSAqIGIxMixcbiAgICAgIGEwMiAqIGIxMCArIGExMiAqIGIxMSArIGEyMiAqIGIxMixcbiAgICAgIGEwMyAqIGIxMCArIGExMyAqIGIxMSArIGEyMyAqIGIxMixcbiAgICAgIGEwMCAqIGIyMCArIGExMCAqIGIyMSArIGEyMCAqIGIyMixcbiAgICAgIGEwMSAqIGIyMCArIGExMSAqIGIyMSArIGEyMSAqIGIyMixcbiAgICAgIGEwMiAqIGIyMCArIGExMiAqIGIyMSArIGEyMiAqIGIyMixcbiAgICAgIGEwMyAqIGIyMCArIGExMyAqIGIyMSArIGEyMyAqIGIyMixcbiAgICAgIG1hdHJpeFsxMl0sXG4gICAgICBtYXRyaXhbMTNdLFxuICAgICAgbWF0cml4WzE0XSxcbiAgICAgIG1hdHJpeFsxNV0sXG5cbiAgICBdKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGU0KG1hdHJpeCwgdmVjdG9yKSB7XG4gIGxldCB4ID0gdmVjdG9yWzBdLFxuICAgICAgeSA9IHZlY3RvclsxXSxcbiAgICAgIHogPSB2ZWN0b3JbMl0sXG4gICAgICBhMDAgPSBtYXRyaXhbMF0sXG4gICAgICBhMDEgPSBtYXRyaXhbMV0sXG4gICAgICBhMDIgPSBtYXRyaXhbMl0sXG4gICAgICBhMDMgPSBtYXRyaXhbM10sXG4gICAgICBhMTAgPSBtYXRyaXhbNF0sXG4gICAgICBhMTEgPSBtYXRyaXhbNV0sXG4gICAgICBhMTIgPSBtYXRyaXhbNl0sXG4gICAgICBhMTMgPSBtYXRyaXhbN10sXG4gICAgICBhMjAgPSBtYXRyaXhbOF0sXG4gICAgICBhMjEgPSBtYXRyaXhbOV0sXG4gICAgICBhMjIgPSBtYXRyaXhbMTBdLFxuICAgICAgYTIzID0gbWF0cml4WzExXTtcblxuICByZXR1cm4gKFtcblxuICAgIGEwMCxcbiAgICBhMDEsXG4gICAgYTAyLFxuICAgIGEwMyxcbiAgICBhMTAsXG4gICAgYTExLFxuICAgIGExMixcbiAgICBhMTMsXG4gICAgYTIwLFxuICAgIGEyMSxcbiAgICBhMjIsXG4gICAgYTIzLFxuICAgIGEwMCAqIHggKyBhMTAgKiB5ICsgYTIwICogeiArIG1hdHJpeFsxMl0sXG4gICAgYTAxICogeCArIGExMSAqIHkgKyBhMjEgKiB6ICsgbWF0cml4WzEzXSxcbiAgICBhMDIgKiB4ICsgYTEyICogeSArIGEyMiAqIHogKyBtYXRyaXhbMTRdLFxuICAgIGEwMyAqIHggKyBhMTMgKiB5ICsgYTIzICogeiArIG1hdHJpeFsxNV0sXG5cbiAgXSk7XG59XG5cbmZ1bmN0aW9uIHBlcnNwZWN0aXZlNChmaWVsZE9mVmlldywgYXNwZWN0UmF0aW8sIHpOZWFyLCB6RmFyKSB7XG4gIGNvbnN0IGYgPSAxLjAgLyBNYXRoLnRhbihmaWVsZE9mVmlldyAvIDIpLFxuICAgICAgICBuZiA9IDEgLyAoek5lYXIgLSB6RmFyKTtcblxuICByZXR1cm4gKFtcblxuICAgIGYgLyBhc3BlY3RSYXRpbywgMCwgMCwgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgMCwgICAgICAgICAgICAgICBmLCAwLCAgICAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAwLCAgICAgICAgICAgICAgIDAsICh6RmFyICsgek5lYXIpICogbmYsICAgIC0xLFxuICAgIDAsICAgICAgICAgICAgICAgMCwgKDIgKiB6RmFyICogek5lYXIpICogbmYsIDAsXG5cbiAgXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpZGVudGl0eTIsXG4gIGlkZW50aXR5MyxcbiAgaWRlbnRpdHk0LFxuICBpbnZlcnQyLFxuICBpbnZlcnQzLFxuICBpbnZlcnQ0LFxuICBzY2FsZTQsXG4gIHJvdGF0ZTQsXG4gIHRyYW5zcG9zZTIsXG4gIHRyYW5zcG9zZTMsXG4gIHRyYW5zcG9zZTQsXG4gIHRyYW5zbGF0ZTQsXG4gIHBlcnNwZWN0aXZlNFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbGVuZ3RoMih2ZWN0b3IpIHtcbiAgY29uc3QgeCA9IHZlY3RvclswXSxcbiAgICAgICAgeSA9IHZlY3RvclsxXTtcblxuICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSk7XG59XG5cbmZ1bmN0aW9uIGxlbmd0aDModmVjdG9yKSB7XG4gIGNvbnN0IHggPSB2ZWN0b3JbMF0sXG4gICAgICAgIHkgPSB2ZWN0b3JbMV0sXG4gICAgICAgIHogPSB2ZWN0b3JbMl07XG5cbiAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xufVxuXG5mdW5jdGlvbiBsZW5ndGg0KHZlY3Rvcikge1xuICBjb25zdCB4ID0gdmVjdG9yWzBdLFxuICAgICAgICB5ID0gdmVjdG9yWzFdLFxuICAgICAgICB6ID0gdmVjdG9yWzJdLFxuICAgICAgICB3ID0gdmVjdG9yWzNdO1xuXG4gIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6ICsgdyp3KTtcbn1cblxuZnVuY3Rpb24gZG90Mih2ZWN0b3JBLCB2ZWN0b3JCKSB7IHJldHVybiAodmVjdG9yQVswXSAqIHZlY3RvckJbMF0gKyB2ZWN0b3JBWzFdICogdmVjdG9yQlsxXSk7IH1cblxuZnVuY3Rpb24gZG90Myh2ZWN0b3JBLCB2ZWN0b3JCKSB7IHJldHVybiAodmVjdG9yQVswXSAqIHZlY3RvckJbMF0gKyB2ZWN0b3JBWzFdICogdmVjdG9yQlsxXSArIHZlY3RvckFbMl0gKiB2ZWN0b3JCWzJdKTsgfVxuXG5mdW5jdGlvbiBkb3Q0KHZlY3RvckEsIHZlY3RvckIpIHsgcmV0dXJuICh2ZWN0b3JBWzBdICogdmVjdG9yQlswXSArIHZlY3RvckFbMV0gKiB2ZWN0b3JCWzFdICsgdmVjdG9yQVsyXSAqIHZlY3RvckJbMl0gKyB2ZWN0b3JBWzNdICogdmVjdG9yQlszXSk7IH1cblxuZnVuY3Rpb24gY3Jvc3MzKHZlY3RvckEsIHZlY3RvckIpIHtcbiAgY29uc3QgYXggPSB2ZWN0b3JBWzBdLCBheSA9IHZlY3RvckFbMV0sIGF6ID0gdmVjdG9yQVsyXSxcbiAgICAgICAgYnggPSB2ZWN0b3JCWzBdLCBieSA9IHZlY3RvckJbMV0sIGJ6ID0gdmVjdG9yQlsyXTtcblxuICByZXR1cm4gKFtcblxuICAgIGF5ICogYnogLSBheiAqIGJ5LFxuICAgIGF6ICogYnggLSBheCAqIGJ6LFxuICAgIGF4ICogYnkgLSBheSAqIGJ4LFxuXG4gIF0pXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGlzZTIodmVjdG9yKSB7XG4gIGNvbnN0IHggPSB2ZWN0b3JbMF0sXG4gICAgICAgIHkgPSB2ZWN0b3JbMV0sXG4gICAgICAgIGxlbmd0aCA9IE1hdGguc3FydCh4KnggKyB5KnkpO1xuXG4gIGlmIChsZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIChbXG5cbiAgICAgIHggLyBsZW5ndGgsXG4gICAgICB5IC8gbGVuZ3RoLFxuXG4gICAgXSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbm9ybWFsaXNlMyh2ZWN0b3IpIHtcbiAgY29uc3QgeCA9IHZlY3RvclswXSxcbiAgICAgICAgeSA9IHZlY3RvclsxXSxcbiAgICAgICAgeiA9IHZlY3RvclsyXSxcbiAgICAgICAgbGVuZ3RoID0gTWF0aC5zcXJ0KHgqeCArIHkqeSArIHoqeik7XG5cbiAgaWYgKGxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gKFtcblxuICAgICAgeCAvIGxlbmd0aCxcbiAgICAgIHkgLyBsZW5ndGgsXG4gICAgICB6IC8gbGVuZ3RoLFxuXG4gICAgXSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbm9ybWFsaXNlNCh2ZWN0b3IpIHtcbiAgY29uc3QgeCA9IHZlY3RvclswXSxcbiAgICAgICAgeSA9IHZlY3RvclsxXSxcbiAgICAgICAgeiA9IHZlY3RvclsyXSxcbiAgICAgICAgdyA9IHZlY3RvclszXSxcbiAgICAgICAgbGVuZ3RoID0gTWF0aC5zcXJ0KHgqeCArIHkqeSArIHoqeiArIHcqdyk7XG5cbiAgaWYgKGxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gKFtcblxuICAgICAgeCAvIGxlbmd0aCxcbiAgICAgIHkgLyBsZW5ndGgsXG4gICAgICB6IC8gbGVuZ3RoLFxuICAgICAgdyAvIGxlbmd0aCxcblxuICAgIF0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNjYWxlMih2ZWN0b3IsIHNjYWxhcikge1xuICByZXR1cm4gKFtcblxuICAgIHZlY3RvclswXSAqIHNjYWxhcixcbiAgICB2ZWN0b3JbMV0gKiBzY2FsYXIsXG5cbiAgXSk7XG59XG5cbmZ1bmN0aW9uIHNjYWxlMyh2ZWN0b3IsIHNjYWxhcikge1xuICByZXR1cm4gKFtcblxuICAgIHZlY3RvclswXSAqIHNjYWxhcixcbiAgICB2ZWN0b3JbMV0gKiBzY2FsYXIsXG4gICAgdmVjdG9yWzJdICogc2NhbGFyLFxuXG4gIF0pO1xufVxuXG5mdW5jdGlvbiBzY2FsZTQodmVjdG9yLCBzY2FsYXIpIHtcbiAgcmV0dXJuIChbXG5cbiAgICB2ZWN0b3JbMF0gKiBzY2FsYXIsXG4gICAgdmVjdG9yWzFdICogc2NhbGFyLFxuICAgIHZlY3RvclsyXSAqIHNjYWxhcixcbiAgICB2ZWN0b3JbM10gKiBzY2FsYXIsXG5cbiAgXSk7XG59XG5cbmZ1bmN0aW9uIGFkZDIodmVjdG9yQSwgdmVjdG9yQikge1xuICByZXR1cm4gKFtcblxuICAgIHZlY3RvckFbMF0gKyB2ZWN0b3JCWzBdLFxuICAgIHZlY3RvckFbMV0gKyB2ZWN0b3JCWzFdLFxuXG4gIF0pO1xufVxuXG5mdW5jdGlvbiBhZGQzKHZlY3RvckEsIHZlY3RvckIpIHtcbiAgcmV0dXJuIChbXG5cbiAgICB2ZWN0b3JBWzBdICsgdmVjdG9yQlswXSxcbiAgICB2ZWN0b3JBWzFdICsgdmVjdG9yQlsxXSxcbiAgICB2ZWN0b3JBWzJdICsgdmVjdG9yQlsyXSxcblxuICBdKTtcbn1cblxuZnVuY3Rpb24gYWRkNCh2ZWN0b3JBLCB2ZWN0b3JCKSB7XG4gIHJldHVybiAoW1xuXG4gICAgdmVjdG9yQVswXSArIHZlY3RvckJbMF0sXG4gICAgdmVjdG9yQVsxXSArIHZlY3RvckJbMV0sXG4gICAgdmVjdG9yQVsyXSArIHZlY3RvckJbMl0sXG4gICAgdmVjdG9yQVszXSArIHZlY3RvckJbM10sXG5cbiAgXSk7XG59XG5cbmZ1bmN0aW9uIHN1YnRyYWN0Mih2ZWN0b3JBLCB2ZWN0b3JCKSB7XG4gIHJldHVybiAoW1xuXG4gICAgdmVjdG9yQVswXSAtIHZlY3RvckJbMF0sXG4gICAgdmVjdG9yQVsxXSAtIHZlY3RvckJbMV0sXG5cbiAgXSk7XG59XG5cbmZ1bmN0aW9uIHN1YnRyYWN0Myh2ZWN0b3JBLCB2ZWN0b3JCKSB7XG4gIHJldHVybiAoW1xuXG4gICAgdmVjdG9yQVswXSAtIHZlY3RvckJbMF0sXG4gICAgdmVjdG9yQVsxXSAtIHZlY3RvckJbMV0sXG4gICAgdmVjdG9yQVsyXSAtIHZlY3RvckJbMl0sXG5cbiAgXSk7XG59XG5cbmZ1bmN0aW9uIHN1YnRyYWN0NCh2ZWN0b3JBLCB2ZWN0b3JCKSB7XG4gIHJldHVybiAoW1xuXG4gICAgdmVjdG9yQVswXSAtIHZlY3RvckJbMF0sXG4gICAgdmVjdG9yQVsxXSAtIHZlY3RvckJbMV0sXG4gICAgdmVjdG9yQVsyXSAtIHZlY3RvckJbMl0sXG4gICAgdmVjdG9yQVszXSAtIHZlY3RvckJbM10sXG5cbiAgXSk7XG59XG5cbmZ1bmN0aW9uIG11bHRpcGx5Mih2ZWN0b3JBLCB2ZWN0b3JCKSB7XG4gIHJldHVybiAoW1xuXG4gICAgdmVjdG9yQVswXSAqIHZlY3RvckJbMF0sXG4gICAgdmVjdG9yQVsxXSAqIHZlY3RvckJbMV0sXG5cbiAgXSk7XG59XG5cbmZ1bmN0aW9uIG11bHRpcGx5Myh2ZWN0b3JBLCB2ZWN0b3JCKSB7XG4gIHJldHVybiAoW1xuXG4gICAgdmVjdG9yQVswXSAqIHZlY3RvckJbMF0sXG4gICAgdmVjdG9yQVsxXSAqIHZlY3RvckJbMV0sXG4gICAgdmVjdG9yQVsyXSAqIHZlY3RvckJbMl0sXG5cbiAgXSk7XG59XG5cbmZ1bmN0aW9uIG11bHRpcGx5NCh2ZWN0b3JBLCB2ZWN0b3JCKSB7XG4gIHJldHVybiAoW1xuXG4gICAgdmVjdG9yQVswXSAqIHZlY3RvckJbMF0sXG4gICAgdmVjdG9yQVsxXSAqIHZlY3RvckJbMV0sXG4gICAgdmVjdG9yQVsyXSAqIHZlY3RvckJbMl0sXG4gICAgdmVjdG9yQVszXSAqIHZlY3RvckJbM10sXG5cbiAgXSk7XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybTIodmVjdG9yLCBtYXRyaXgpIHtcbiAgY29uc3QgeCA9IHZlY3RvclswXSxcbiAgICAgICAgeSA9IHZlY3RvclsxXTtcblxuICByZXR1cm4gKFtcblxuICAgIG1hdHJpeFswXSAqIHggKyBtYXRyaXhbMl0gKiB5LFxuICAgIG1hdHJpeFsxXSAqIHggKyBtYXRyaXhbM10gKiB5LFxuXG4gIF0pO1xufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm0zKHZlY3RvciwgbWF0cml4KSB7XG4gIGNvbnN0IHggPSB2ZWN0b3JbMF0sXG4gICAgICAgIHkgPSB2ZWN0b3JbMV0sXG4gICAgICAgIHogPSB2ZWN0b3JbMl07XG5cbiAgcmV0dXJuIChbXG5cbiAgICBtYXRyaXhbMF0gKiB4ICsgbWF0cml4WzNdICogeSArIG1hdHJpeFs2XSAqIHosXG4gICAgbWF0cml4WzFdICogeCArIG1hdHJpeFs0XSAqIHkgKyBtYXRyaXhbN10gKiB6LFxuICAgIG1hdHJpeFsyXSAqIHggKyBtYXRyaXhbNV0gKiB5ICsgbWF0cml4WzhdICogeixcblxuICBdKTtcbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtNCh2ZWN0b3IsIG1hdHJpeCkge1xuICBjb25zdCB4ID0gdmVjdG9yWzBdLFxuICAgICAgICB5ID0gdmVjdG9yWzFdLFxuICAgICAgICB6ID0gdmVjdG9yWzJdLFxuICAgICAgICB3ID0gdmVjdG9yWzNdO1xuXG4gIHJldHVybiAoW1xuXG4gICAgbWF0cml4WyAwXSAqIHggKyBtYXRyaXhbIDRdICogeSArIG1hdHJpeFsgOF0gKiB6ICsgbWF0cml4WzEyXSAqIHcsXG4gICAgbWF0cml4WyAxXSAqIHggKyBtYXRyaXhbIDVdICogeSArIG1hdHJpeFsgOV0gKiB6ICsgbWF0cml4WzEzXSAqIHcsXG4gICAgbWF0cml4WyAyXSAqIHggKyBtYXRyaXhbIDZdICogeSArIG1hdHJpeFsxMF0gKiB6ICsgbWF0cml4WzE0XSAqIHcsXG4gICAgbWF0cml4WyAzXSAqIHggKyBtYXRyaXhbIDddICogeSArIG1hdHJpeFsxMV0gKiB6ICsgbWF0cml4WzE1XSAqIHcsXG5cbiAgXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBsZW5ndGgyLFxuICBsZW5ndGgzLFxuICBsZW5ndGg0LFxuICBkb3QyLFxuICBkb3QzLFxuICBkb3Q0LFxuICBjcm9zczMsXG4gIG5vcm1hbGlzZTIsXG4gIG5vcm1hbGlzZTMsXG4gIG5vcm1hbGlzZTQsXG4gIHNjYWxlMixcbiAgc2NhbGUzLFxuICBzY2FsZTQsXG4gIGFkZDIsXG4gIGFkZDMsXG4gIGFkZDQsXG4gIHN1YnRyYWN0MixcbiAgc3VidHJhY3QzLFxuICBzdWJ0cmFjdDQsXG4gIG11bHRpcGx5MixcbiAgbXVsdGlwbHkzLFxuICBtdWx0aXBseTQsXG4gIHRyYW5zZm9ybTIsXG4gIHRyYW5zZm9ybTMsXG4gIHRyYW5zZm9ybTRcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gd2luZG93Ll9fY29uZmlndXJhdGlvbl9fOyAvLy9cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbmNvbnN0IHsgQ1RSTF9LRVlfQ09ERSwgU0hJRlRfS0VZX0NPREUgfSA9IGNvbnN0YW50cztcblxuY2xhc3MgS2V5RXZlbnRzIHtcbiAgY29uc3RydWN0b3IoaGFuZGxlcnNNYXAsIGN0cmxLZXlEb3duLCBzaGlmdEtleURvd24pIHtcbiAgICB0aGlzLmhhbmRsZXJzTWFwID0gaGFuZGxlcnNNYXA7XG4gICAgdGhpcy5jdHJsS2V5RG93biA9IGN0cmxLZXlEb3duO1xuICAgIHRoaXMuc2hpZnRLZXlEb3duID0gc2hpZnRLZXlEb3duO1xuICB9XG5cbiAgaXNDdHJsS2V5RG93bigpIHtcbiAgICByZXR1cm4gdGhpcy5jdHJsS2V5RG93bjtcbiAgfVxuXG4gIGlzU2hpZnRLZXlEb3duKCkge1xuICAgIHJldHVybiB0aGlzLnNoaWZ0S2V5RG93bjtcbiAgfVxuXG4gIGtleVVwRXZlbnRMaXN0ZW5lcihldmVudCkge1xuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICBjYXNlIENUUkxfS0VZX0NPREUgOlxuICAgICAgICB0aGlzLmN0cmxLZXlVcEV2ZW50TGlzdGVuZXIoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgU0hJRlRfS0VZX0NPREUgOlxuICAgICAgICB0aGlzLnNoaWZ0S2V5VXBFdmVudExpc3RlbmVyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGtleURvd25FdmVudExpc3RlbmVyKGV2ZW50KSB7XG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgIGNhc2UgQ1RSTF9LRVlfQ09ERSA6XG4gICAgICAgIHRoaXMuY3RybEtleURvd25FdmVudExpc3RlbmVyKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFNISUZUX0tFWV9DT0RFIDpcbiAgICAgICAgdGhpcy5zaGlmdEtleURvd25FdmVudExpc3RlbmVyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBcbiAgY3RybEtleVVwRXZlbnRMaXN0ZW5lcigpIHtcbiAgICB0aGlzLmN0cmxLZXlEb3duID0gZmFsc2U7XG5cbiAgICBjb25zdCBjdHJsS2V5SGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzTWFwW0NUUkxfS0VZX0NPREVdO1xuXG4gICAgY3RybEtleUhhbmRsZXJzLmZvckVhY2goKGN0cmxLZXlIYW5kbGVyKSA9PiBjdHJsS2V5SGFuZGxlcih0aGlzLmN0cmxLZXlEb3duKSk7XG4gIH1cblxuICBzaGlmdEtleVVwRXZlbnRMaXN0ZW5lcigpIHtcbiAgICB0aGlzLnNoaWZ0S2V5RG93biA9IGZhbHNlO1xuXG4gICAgY29uc3Qgc2hpZnRLZXlIYW5kbGVycyA9IHRoaXMuaGFuZGxlcnNNYXBbU0hJRlRfS0VZX0NPREVdO1xuXG4gICAgc2hpZnRLZXlIYW5kbGVycy5mb3JFYWNoKChzaGlmdEtleUhhbmRsZXIpID0+IHNoaWZ0S2V5SGFuZGxlcih0aGlzLnNoaWZ0S2V5RG93bikpO1xuICB9XG5cbiAgY3RybEtleURvd25FdmVudExpc3RlbmVyKCkge1xuICAgIHRoaXMuY3RybEtleURvd24gPSB0cnVlO1xuXG4gICAgY29uc3QgY3RybEtleUhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc01hcFtDVFJMX0tFWV9DT0RFXTtcblxuICAgIGN0cmxLZXlIYW5kbGVycy5mb3JFYWNoKChjdHJsS2V5SGFuZGxlcikgPT4gY3RybEtleUhhbmRsZXIodGhpcy5jdHJsS2V5RG93bikpO1xuICB9XG5cbiAgc2hpZnRLZXlEb3duRXZlbnRMaXN0ZW5lcigpIHtcbiAgICB0aGlzLnNoaWZ0S2V5RG93biA9IHRydWU7XG5cbiAgICBjb25zdCBzaGlmdEtleUhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc01hcFtTSElGVF9LRVlfQ09ERV07XG5cbiAgICBzaGlmdEtleUhhbmRsZXJzLmZvckVhY2goKHNoaWZ0S2V5SGFuZGxlcikgPT4gc2hpZnRLZXlIYW5kbGVyKHRoaXMuc2hpZnRLZXlEb3duKSk7XG4gIH1cblxuICBhZGRDdHJsS2V5SGFuZGxlcihjdHJsS2V5SGFuZGxlcikge1xuICAgIGNvbnN0IGN0cmxLZXlIYW5kbGVycyA9IHRoaXMuaGFuZGxlcnNNYXBbIENUUkxfS0VZX0NPREUgXTtcblxuICAgIGN0cmxLZXlIYW5kbGVycy5wdXNoKGN0cmxLZXlIYW5kbGVyKTtcbiAgfVxuXG4gIGFkZFNoaWZ0S2V5SGFuZGxlcihzaGlmdEtleUhhbmRsZXIpIHtcbiAgICBjb25zdCBzaGlmdEtleUhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc01hcFsgU0hJRlRfS0VZX0NPREUgXTtcblxuICAgIHNoaWZ0S2V5SGFuZGxlcnMucHVzaChzaGlmdEtleUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKGNhbnZhcykge1xuICAgIGNvbnN0IGhhbmRsZXJzTWFwID0ge307XG4gICAgXG4gICAgaGFuZGxlcnNNYXBbIENUUkxfS0VZX0NPREUgXSA9IFtdO1xuICAgIGhhbmRsZXJzTWFwWyBTSElGVF9LRVlfQ09ERSBdID0gW107XG5cbiAgICBjb25zdCBjdHJsS2V5RG93biA9IGZhbHNlLCAgLy8vXG4gICAgICAgICAgc2hpZnRLZXlEb3duID0gZmFsc2UsICAvLy9cbiAgICAgICAgICBrZXlFdmVudHMgPSBuZXcgS2V5RXZlbnRzKGhhbmRsZXJzTWFwLCBjdHJsS2V5RG93biwgc2hpZnRLZXlEb3duKSxcbiAgICAgICAgICBrZXlVcEV2ZW50TGlzdGVuZXIgPSBrZXlFdmVudHMua2V5VXBFdmVudExpc3RlbmVyLmJpbmQoa2V5RXZlbnRzKSxcbiAgICAgICAgICBrZXlEb3duRXZlbnRMaXN0ZW5lciA9IGtleUV2ZW50cy5rZXlEb3duRXZlbnRMaXN0ZW5lci5iaW5kKGtleUV2ZW50cyksXG4gICAgICAgICAgZG9jdW1lbnRET01FbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50OyAgLy8vXG5cbiAgICBkb2N1bWVudERPTUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBrZXlVcEV2ZW50TGlzdGVuZXIpO1xuICAgIGRvY3VtZW50RE9NRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5RG93bkV2ZW50TGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGtleUV2ZW50cztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEtleUV2ZW50cztcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbmNvbnN0IHsgTU9VU0VfVVAsIE1PVVNFX0RPV04sIE1PVVNFX01PVkUsIE1PVVNFX1dIRUVMIH0gPSBjb25zdGFudHM7XG5cbmNsYXNzIE1vdXNlRXZlbnRzIHtcbiAgY29uc3RydWN0b3IoaGFuZGxlcnNNYXAsIG1vdXNlRG93biwgY2FudmFzKSB7XG4gICAgdGhpcy5oYW5kbGVyc01hcCA9IGhhbmRsZXJzTWFwO1xuICAgIHRoaXMubW91c2VEb3duID0gbW91c2VEb3duO1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICB9XG5cbiAgbW91c2VFdmVudExpc3RlbmVyKGV2ZW50LCBldmVudFR5cGUpIHtcbiAgICBjb25zdCBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnNNYXBbZXZlbnRUeXBlXSxcbiAgICAgICAgICBtb3VzZUNvb3JkaW5hdGVzID0gbW91c2VDb29yZGluYXRlc0Zyb21FdmVudChldmVudCwgdGhpcy5jYW52YXMpO1xuXG4gICAgaGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlcikgPT4gaGFuZGxlcihtb3VzZUNvb3JkaW5hdGVzLCB0aGlzLm1vdXNlRG93biwgdGhpcy5jYW52YXMpKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBtb3VzZVVwRXZlbnRMaXN0ZW5lcihldmVudCkge1xuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG5cbiAgICB0aGlzLm1vdXNlRXZlbnRMaXN0ZW5lcihldmVudCwgTU9VU0VfVVApO1xuICB9XG5cblx0bW91c2VEb3duRXZlbnRMaXN0ZW5lcihldmVudCkge1xuICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcblxuICAgIHRoaXMubW91c2VFdmVudExpc3RlbmVyKGV2ZW50LCBNT1VTRV9ET1dOKTtcbiAgfVxuXG5cdG1vdXNlTW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQpIHtcbiAgICB0aGlzLm1vdXNlRXZlbnRMaXN0ZW5lcihldmVudCwgTU9VU0VfTU9WRSk7XG4gIH1cblxuICBtb3VzZVdoZWVsRXZlbnRMaXN0ZW5lcihldmVudCkge1xuICAgIGNvbnN0IGRlbHRhID0gZGVsdGFGcm9tRXZlbnQoZXZlbnQpLFxuICAgICAgICAgIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc01hcFsgTU9VU0VfV0hFRUwgXTtcblxuICAgIGhhbmRsZXJzLmZvckVhY2goKGhhbmRsZXIpID0+IGhhbmRsZXIoZGVsdGEsIHRoaXMuY2FudmFzKSk7XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgYWRkTW91c2VVcEhhbmRsZXIobW91c2VVcEhhbmRsZXIpIHtcbiAgICBjb25zdCBtb3VzZVVwSGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzTWFwWyBNT1VTRV9VUCBdO1xuXG4gICAgbW91c2VVcEhhbmRsZXJzLnB1c2gobW91c2VVcEhhbmRsZXIpO1xuICB9XG5cbiAgYWRkTW91c2VEb3duSGFuZGxlcihtb3VzZURvd25IYW5kbGVyKSB7XG4gICAgY29uc3QgbW91c2VEb3duSGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzTWFwWyBNT1VTRV9ET1dOIF07XG5cbiAgICBtb3VzZURvd25IYW5kbGVycy5wdXNoKG1vdXNlRG93bkhhbmRsZXIpO1xuICB9XG5cbiAgYWRkTW91c2VNb3ZlSGFuZGxlcihtb3VzZU1vdmVIYW5kbGVyKSB7XG4gICAgY29uc3QgbW91c2VNb3ZlSGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzTWFwWyBNT1VTRV9NT1ZFIF07XG5cbiAgICBtb3VzZU1vdmVIYW5kbGVycy5wdXNoKG1vdXNlTW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgYWRkTW91c2VXaGVlbEhhbmRsZXIobW91c2VXaGVlbEhhbmRsZXIpIHtcbiAgICBjb25zdCBtb3VzZVdoZWVsSGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzTWFwWyBNT1VTRV9XSEVFTCBdO1xuXG4gICAgbW91c2VXaGVlbEhhbmRsZXJzLnB1c2gobW91c2VXaGVlbEhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKGNhbnZhcykge1xuICAgIGNvbnN0IGhhbmRsZXJzTWFwID0ge307XG5cbiAgICBoYW5kbGVyc01hcFsgTU9VU0VfVVAgXSA9IFtdO1xuICAgIGhhbmRsZXJzTWFwWyBNT1VTRV9ET1dOIF0gPSBbXTtcbiAgICBoYW5kbGVyc01hcFsgTU9VU0VfTU9WRSBdID0gW107XG4gICAgaGFuZGxlcnNNYXBbIE1PVVNFX1dIRUVMIF0gPSBbXTtcblxuICAgIGNvbnN0IG1vdXNlRG93biA9IGZhbHNlLCAgLy8vXG5cdFx0XHRcdFx0bW91c2VFdmVudHMgPSBuZXcgTW91c2VFdmVudHMoaGFuZGxlcnNNYXAsIG1vdXNlRG93biwgY2FudmFzKSxcbiAgICAgICAgICBjYW52YXNET01FbGVtZW50ID0gY2FudmFzLmdldERPTUVsZW1lbnQoKSxcblx0XHRcdFx0XHRtb3VzZVVwRXZlbnRMaXN0ZW5lciA9IG1vdXNlRXZlbnRzLm1vdXNlVXBFdmVudExpc3RlbmVyLmJpbmQobW91c2VFdmVudHMpLFxuXHRcdFx0XHRcdG1vdXNlRG93bkV2ZW50TGlzdGVuZXIgPSBtb3VzZUV2ZW50cy5tb3VzZURvd25FdmVudExpc3RlbmVyLmJpbmQobW91c2VFdmVudHMpLFxuXHRcdFx0XHRcdG1vdXNlTW92ZUV2ZW50TGlzdGVuZXIgPSBtb3VzZUV2ZW50cy5tb3VzZU1vdmVFdmVudExpc3RlbmVyLmJpbmQobW91c2VFdmVudHMpLFxuXHRcdFx0XHRcdG1vdXNlV2hlZWxFdmVudExpc3RlbmVyID0gbW91c2VFdmVudHMubW91c2VXaGVlbEV2ZW50TGlzdGVuZXIuYmluZChtb3VzZUV2ZW50cyk7XG5cbiAgICBjYW52YXNET01FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwRXZlbnRMaXN0ZW5lcik7XG4gICAgY2FudmFzRE9NRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd25FdmVudExpc3RlbmVyKTtcbiAgICBjYW52YXNET01FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZUV2ZW50TGlzdGVuZXIpO1xuICAgIGNhbnZhc0RPTUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIG1vdXNlV2hlZWxFdmVudExpc3RlbmVyKTtcblxuICAgIHJldHVybiBtb3VzZUV2ZW50cztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vdXNlRXZlbnRzO1xuXG5mdW5jdGlvbiBkZWx0YUZyb21FdmVudChldmVudCkge1xuICBjb25zdCBkZWx0YSA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBldmVudC53aGVlbERlbHRhKSk7IC8vL1xuXG4gIHJldHVybiBkZWx0YTtcbn1cblxuZnVuY3Rpb24gbW91c2VDb29yZGluYXRlc0Zyb21FdmVudChldmVudCkge1xuICBjb25zdCBjYW52YXNET01FbGVtZW50ID0gZXZlbnQudGFyZ2V0LCAgLy8vXG4gICAgICAgIGRvbUVsZW1lbnRCb3VuZGluZ0NsaWVudFJlY3QgPSBjYW52YXNET01FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICBtb3VzZUNvb3JkaW5hdGVzID0gW1xuICAgICAgICAgICsoZXZlbnQuY2xpZW50WCAtIGRvbUVsZW1lbnRCb3VuZGluZ0NsaWVudFJlY3QubGVmdCksXG4gICAgICAgICAgLShldmVudC5jbGllbnRZIC0gZG9tRWxlbWVudEJvdW5kaW5nQ2xpZW50UmVjdC50b3ApXG4gICAgICAgIF07XG5cbiAgcmV0dXJuIG1vdXNlQ29vcmRpbmF0ZXM7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpLFxuICAgICAgdmVjdG9yTWF0aHMgPSByZXF1aXJlKCcuLi9tYXRocy92ZWN0b3InKSxcbiAgICAgIGFycmF5VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL2FycmF5Jyk7XG5cbmNvbnN0IHsgZmlyc3QsIHNlY29uZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IGFkZDMsIHN1YnRyYWN0Miwgc2NhbGUyIH0gPSB2ZWN0b3JNYXRocyxcbiAgICAgIHsgT0ZGU0VUX1NDQUxBUiwgSU5JVElBTF9NT1VTRV9DT09SRElOQVRFUyB9ID0gY29uc3RhbnRzO1xuXG5jbGFzcyBQYW4ge1xuICBjb25zdHJ1Y3RvcihvZmZzZXQsIHByZXZpb3VzT2Zmc2V0LCBtb3VzZUNvb3JkaW5hdGVzLCBwcmV2aW91c01vdXNlQ29vcmRpbmF0ZXMpIHtcbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICB0aGlzLnByZXZpb3VzT2Zmc2V0ID0gcHJldmlvdXNPZmZzZXQ7XG4gICAgdGhpcy5tb3VzZUNvb3JkaW5hdGVzID0gbW91c2VDb29yZGluYXRlcztcbiAgICB0aGlzLnByZXZpb3VzTW91c2VDb29yZGluYXRlcyA9IHByZXZpb3VzTW91c2VDb29yZGluYXRlcztcbiAgfVxuXG4gIGdldE9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5vZmZzZXQ7XG4gIH1cblxuICBzaGlmdEtleUhhbmRsZXIoc2hpZnRLZXlEb3duKSB7XG4gICAgaWYgKHNoaWZ0S2V5RG93bikge1xuICAgICAgdGhpcy5wcmV2aW91c09mZnNldCA9IHRoaXMub2Zmc2V0O1xuXG4gICAgICB0aGlzLnByZXZpb3VzTW91c2VDb29yZGluYXRlcyA9IHRoaXMubW91c2VDb29yZGluYXRlcztcbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcigpIHtcbiAgICB0aGlzLnByZXZpb3VzTW91c2VDb29yZGluYXRlcyA9IHRoaXMubW91c2VDb29yZGluYXRlcztcbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIoKSB7XG4gICAgdGhpcy5wcmV2aW91c09mZnNldCA9IHRoaXMub2Zmc2V0O1xuXG4gICAgaWYgKHRoaXMuc2hpZnRLZXlEb3duKSB7XG4gICAgICB0aGlzLnByZXZpb3VzT2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG5cbiAgICAgIHRoaXMucHJldmlvdXNNb3VzZUNvb3JkaW5hdGVzID0gdGhpcy5tb3VzZUNvb3JkaW5hdGVzO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZUhhbmRsZXIobW91c2VDb29yZGluYXRlcywgbW91c2VEb3duLCBzaGlmdEtleURvd24sIHRpbHQpIHtcbiAgICB0aGlzLm1vdXNlQ29vcmRpbmF0ZXMgPSBtb3VzZUNvb3JkaW5hdGVzO1xuXG4gICAgaWYgKG1vdXNlRG93biAmJiBzaGlmdEtleURvd24pIHtcbiAgICAgIHRoaXMudXBkYXRlT2Zmc2V0KHRpbHQpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU9mZnNldCh0aWx0KSB7XG4gICAgY29uc3QgeEFuZ2xlID0gdGlsdC5nZXRYQW5nbGUoKSxcbiAgICAgICAgICB5QW5nbGUgPSB0aWx0LmdldFlBbmdsZSgpLFxuICAgICAgICAgIHNjYWxhciA9IE9GRlNFVF9TQ0FMQVIsXG4gICAgICAgICAgcmVsYXRpdmVNb3VzZUNvb3JkaW5hdGVzID0gc3VidHJhY3QyKHRoaXMubW91c2VDb29yZGluYXRlcywgdGhpcy5wcmV2aW91c01vdXNlQ29vcmRpbmF0ZXMpLFxuICAgICAgICAgIHJlbGF0aXZlT2Zmc2V0ID0gc2NhbGUyKHJlbGF0aXZlTW91c2VDb29yZGluYXRlcywgc2NhbGFyKSxcbiAgICAgICAgICB5QW5nbGVPZmZzZXQgPSBjYWxjdWxhdGVZQW5nbGVPZmZzZXQoeUFuZ2xlLCByZWxhdGl2ZU9mZnNldCksXG4gICAgICAgICAgeEFuZ2xlT2Zmc2V0ID0gY2FsY3VsYXRlWEFuZ2xlT2Zmc2V0KHhBbmdsZSwgeUFuZ2xlLCByZWxhdGl2ZU9mZnNldCk7XG5cbiAgICB0aGlzLm9mZnNldCA9IGFkZDMoYWRkMyh0aGlzLnByZXZpb3VzT2Zmc2V0LCB5QW5nbGVPZmZzZXQpLCB4QW5nbGVPZmZzZXQpOyAgLy8vXG4gIH1cblxuICBzdGF0aWMgZnJvbUluaXRpYWxPZmZzZXQoaW5pdGlhbE9mZnNldCkge1xuICAgIGNvbnN0IG9mZnNldCA9IGluaXRpYWxPZmZzZXQsIC8vL1xuICAgICAgICAgIHByZXZpb3VzT2Zmc2V0ID0gb2Zmc2V0LCAgLy8vXG4gICAgICAgICAgbW91c2VDb29yZGluYXRlcyA9IElOSVRJQUxfTU9VU0VfQ09PUkRJTkFURVMsIC8vL1xuICAgICAgICAgIHByZXZpb3VzTW91c2VDb29yZGluYXRlcyA9IG1vdXNlQ29vcmRpbmF0ZXMsICAvLy9cbiAgICAgICAgICBwYW4gPSBuZXcgUGFuKG9mZnNldCwgcHJldmlvdXNPZmZzZXQsIG1vdXNlQ29vcmRpbmF0ZXMsIHByZXZpb3VzTW91c2VDb29yZGluYXRlcyk7XG4gICAgXG4gICAgcmV0dXJuIHBhbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhbjtcblxuZnVuY3Rpb24gY2FsY3VsYXRlWUFuZ2xlT2Zmc2V0KHlBbmdsZSwgcmVsYXRpdmVPZmZzZXQpIHtcbiAgY29uc3QgcmVsYXRpdmVPZmZzZXRDb21wb25lbnRzID0gcmVsYXRpdmVPZmZzZXQsICAvLy9cbiAgICAgICAgZmlyc3RSZWxhdGl2ZU9mZnNldENvbXBvbmVudCA9IGZpcnN0KHJlbGF0aXZlT2Zmc2V0Q29tcG9uZW50cyksXG4gICAgICAgIHlBbmdsZU9mZnNldCA9IFtcbiAgICAgICAgICAtTWF0aC5jb3MoeUFuZ2xlKSAqIGZpcnN0UmVsYXRpdmVPZmZzZXRDb21wb25lbnQsXG4gICAgICAgICAgKzAsXG4gICAgICAgICAgLU1hdGguc2luKHlBbmdsZSkgKiBmaXJzdFJlbGF0aXZlT2Zmc2V0Q29tcG9uZW50XG4gICAgICAgIF07XG5cbiAgcmV0dXJuIHlBbmdsZU9mZnNldDtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlWEFuZ2xlT2Zmc2V0KHhBbmdsZSwgeUFuZ2xlLCByZWxhdGl2ZU9mZnNldCkge1xuICBjb25zdCByZWxhdGl2ZU9mZnNldENvbXBvbmVudHMgPSByZWxhdGl2ZU9mZnNldCwgIC8vL1xuICAgICAgICBzZWNvbmRSZWxhdGl2ZU9mZnNldENvbXBvbmVudCA9IHNlY29uZChyZWxhdGl2ZU9mZnNldENvbXBvbmVudHMpLFxuICAgICAgICB4QW5nbGVPZmZzZXQgPSBbXG4gICAgICAgICAgLU1hdGguc2luKHhBbmdsZSkgKiBNYXRoLnNpbih5QW5nbGUpICogc2Vjb25kUmVsYXRpdmVPZmZzZXRDb21wb25lbnQsXG4gICAgICAgICAgLU1hdGguY29zKHhBbmdsZSkgKiBzZWNvbmRSZWxhdGl2ZU9mZnNldENvbXBvbmVudCxcbiAgICAgICAgICArTWF0aC5zaW4oeEFuZ2xlKSAqIE1hdGguY29zKHlBbmdsZSkgKiBzZWNvbmRSZWxhdGl2ZU9mZnNldENvbXBvbmVudFxuICAgICAgICBdO1xuXG4gIHJldHVybiB4QW5nbGVPZmZzZXQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpLFxuICAgICAgdmVjdG9yTWF0aHMgPSByZXF1aXJlKCcuLi9tYXRocy92ZWN0b3InKSxcbiAgICAgIGFycmF5VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL2FycmF5Jyk7XG5cbmNvbnN0IHsgZmlyc3QsIHNlY29uZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IGFkZDIsIHNjYWxlMiwgc3VidHJhY3QyIH0gPSB2ZWN0b3JNYXRocyxcbiAgICAgIHsgQU5HTEVTX1NDQUxBUiwgSU5JVElBTF9BTkdMRVMsIElOSVRJQUxfTU9VU0VfQ09PUkRJTkFURVMgfSA9IGNvbnN0YW50cztcblxuY2xhc3MgVGlsdCB7XG4gIGNvbnN0cnVjdG9yKGFuZ2xlcywgcHJldmlvdXNBbmdsZXMsIG1vdXNlQ29vcmRpbmF0ZXMsIHByZXZpb3VzTW91c2VDb29yZGluYXRlcykge1xuICAgIHRoaXMuYW5nbGVzID0gYW5nbGVzO1xuICAgIHRoaXMucHJldmlvdXNBbmdsZXMgPSBwcmV2aW91c0FuZ2xlcztcbiAgICB0aGlzLm1vdXNlQ29vcmRpbmF0ZXMgPSBtb3VzZUNvb3JkaW5hdGVzO1xuICAgIHRoaXMucHJldmlvdXNNb3VzZUNvb3JkaW5hdGVzID0gcHJldmlvdXNNb3VzZUNvb3JkaW5hdGVzO1xuICB9XG5cbiAgZ2V0WEFuZ2xlKCkge1xuICAgIGNvbnN0IHNlY29uZEFuZ2xlID0gc2Vjb25kKHRoaXMuYW5nbGVzKSxcbiAgICAgICAgICB4QW5nbGUgPSBzZWNvbmRBbmdsZTsgLy8vXG5cbiAgICByZXR1cm4geEFuZ2xlO1xuICB9XG4gIFxuICBnZXRZQW5nbGUoKSB7XG4gICAgY29uc3QgZmlyc3RBbmdsZSA9IGZpcnN0KHRoaXMuYW5nbGVzKSxcbiAgICAgICAgICB5QW5nbGUgPSAtZmlyc3RBbmdsZTsgLy8vXG5cbiAgICByZXR1cm4geUFuZ2xlO1xuICB9XG5cbiAgZ2V0WkFuZ2xlKCkge1xuICAgIGNvbnN0IHpBbmdsZSA9IDA7XG5cbiAgICByZXR1cm4gekFuZ2xlO1xuICB9XG4gIFxuICBnZXRBbmdsZXMoKSB7IC8vL1xuICAgIGNvbnN0IHhBbmdsZSA9IHRoaXMuZ2V0WEFuZ2xlKCksXG4gICAgICAgICAgeUFuZ2xlID0gdGhpcy5nZXRZQW5nbGUoKSxcbiAgICAgICAgICB6QW5nbGUgPSB0aGlzLmdldFpBbmdsZSgpLFxuICAgICAgICAgIGFuZ2xlcyA9IFtcbiAgICAgICAgICAgIHhBbmdsZSxcbiAgICAgICAgICAgIHlBbmdsZSxcbiAgICAgICAgICAgIHpBbmdsZVxuICAgICAgICAgIF07XG4gICAgXG4gICAgcmV0dXJuIGFuZ2xlcztcbiAgfVxuICBcbiAgbW91c2VVcEhhbmRsZXIoKSB7XG4gICAgdGhpcy5wcmV2aW91c0FuZ2xlcyA9IHRoaXMuYW5nbGVzO1xuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcigpIHtcbiAgICB0aGlzLnByZXZpb3VzTW91c2VDb29yZGluYXRlcyA9IHRoaXMubW91c2VDb29yZGluYXRlcztcbiAgfVxuXG4gIG1vdXNlTW92ZUhhbmRsZXIobW91c2VDb29yZGluYXRlcywgbW91c2VEb3duLCBzaGlmdEtleURvd24pIHtcbiAgICB0aGlzLm1vdXNlQ29vcmRpbmF0ZXMgPSBtb3VzZUNvb3JkaW5hdGVzO1xuXG4gICAgaWYgKG1vdXNlRG93biAmJiAhc2hpZnRLZXlEb3duKSB7XG4gICAgICB0aGlzLnVwZGF0ZUFuZ2xlcygpO1xuICAgIH1cbiAgfVxuXG4gIHNoaWZ0S2V5SGFuZGxlcihzaGlmdEtleURvd24pIHtcbiAgICBpZiAoIXNoaWZ0S2V5RG93bikge1xuICAgICAgdGhpcy5wcmV2aW91c0FuZ2xlcyA9IHRoaXMuYW5nbGVzO1xuXG4gICAgICB0aGlzLnByZXZpb3VzTW91c2VDb29yZGluYXRlcyA9IHRoaXMubW91c2VDb29yZGluYXRlcztcbiAgICB9XG4gIH1cblxuICB1cGRhdGVBbmdsZXMoKSB7XG4gICAgY29uc3Qgc2NhbGFyID0gQU5HTEVTX1NDQUxBUixcbiAgICAgICAgICByZWxhdGl2ZU1vdXNlQ29vcmRpbmF0ZXMgPSBzdWJ0cmFjdDIodGhpcy5tb3VzZUNvb3JkaW5hdGVzLCB0aGlzLnByZXZpb3VzTW91c2VDb29yZGluYXRlcyksXG4gICAgICAgICAgcmVsYXRpdmVBbmdsZXMgPSBzY2FsZTIocmVsYXRpdmVNb3VzZUNvb3JkaW5hdGVzLCBzY2FsYXIpO1xuXG4gICAgdGhpcy5hbmdsZXMgPSBhZGQyKHRoaXMucHJldmlvdXNBbmdsZXMsIHJlbGF0aXZlQW5nbGVzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCBhbmdsZXMgPSBJTklUSUFMX0FOR0xFUyxcbiAgICAgICAgICBwcmV2aW91c0FuZ2xlcyA9IGFuZ2xlcywgIC8vL1xuICAgICAgICAgIG1vdXNlQ29vcmRpbmF0ZXMgPSBJTklUSUFMX01PVVNFX0NPT1JESU5BVEVTLFxuICAgICAgICAgIHByZXZpb3VzTW91c2VDb29yZGluYXRlcyA9IG1vdXNlQ29vcmRpbmF0ZXMsICAvLy9cbiAgICAgICAgICB0aWx0ID0gbmV3IFRpbHQoYW5nbGVzLCBwcmV2aW91c0FuZ2xlcywgbW91c2VDb29yZGluYXRlcywgcHJldmlvdXNNb3VzZUNvb3JkaW5hdGVzKTtcblxuICAgIHJldHVybiB0aWx0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsdDtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbmNvbnN0IHsgRElTVEFOQ0VfU0NBTEFSLCBNSU5JTVVNX0RJU1RBTkNFIH0gPSBjb25zdGFudHM7IFxuXG5jbGFzcyBab29tIHtcbiAgY29uc3RydWN0b3IoZGlzdGFuY2UpIHtcbiAgICB0aGlzLmRpc3RhbmNlID0gZGlzdGFuY2U7XG4gIH1cblxuICBnZXREaXN0YW5jZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kaXN0YW5jZTtcbiAgfVxuXG4gIG1vdXNlV2hlZWxFdmVudEhhbmRsZXIoZGVsdGEpIHtcbiAgICBjb25zdCBzY2FsYXIgPSBESVNUQU5DRV9TQ0FMQVI7XG4gICAgXG4gICAgdGhpcy5kaXN0YW5jZSAtPSBkZWx0YSAqIHNjYWxhcjtcblxuICAgIHRoaXMuZGlzdGFuY2UgPSBNYXRoLm1heChNSU5JTVVNX0RJU1RBTkNFLCB0aGlzLmRpc3RhbmNlKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Jbml0aWFsRGlzdGFuY2UoaW5pdGlhbERpc3RhbmNlKSB7XG4gICAgY29uc3QgZGlzdGFuY2UgPSBpbml0aWFsRGlzdGFuY2UsIC8vL1xuICAgICAgICAgIHpvb20gPSBuZXcgWm9vbShkaXN0YW5jZSk7XG4gICAgXG4gICAgcmV0dXJuIHpvb207XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBab29tO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBlbmFibGVCbGVuZGluZygpIHtcbiAgY29uc3QgeyBCTEVORCwgU1JDX0FMUEhBLCBPTkUgfSA9IHRoaXMuY29udGV4dCxcbiAgICAgICAgY2FwYWNpdHkgPSBCTEVORCxcbiAgICAgICAgc291cmNlRmFjdG9yID0gU1JDX0FMUEhBLFxuICAgICAgICBkZXN0aW5hdGlvbkZhY3RvciA9IE9ORTtcblxuICB0aGlzLmNvbnRleHQuZW5hYmxlKGNhcGFjaXR5KTtcblxuICB0aGlzLmNvbnRleHQuYmxlbmRGdW5jKHNvdXJjZUZhY3RvciwgZGVzdGluYXRpb25GYWN0b3IpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW5hYmxlQmxlbmRpbmdcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRCdWZmZXIoZGF0YSkge1xuICBjb25zdCB7IEVMRU1FTlRfQVJSQVlfQlVGRkVSLCBTVEFUSUNfRFJBVyB9ID0gdGhpcy5jb250ZXh0LFxuICAgICAgICB0YXJnZXQgPSBFTEVNRU5UX0FSUkFZX0JVRkZFUixcbiAgICAgICAgdXNhZ2UgPSBTVEFUSUNfRFJBVyxcbiAgICAgICAgdWludDE2QXJyYXkgPSBuZXcgVWludDE2QXJyYXkoZGF0YSksXG4gICAgICAgIGVsZW1lbnRCdWZmZXIgPSB0aGlzLmNvbnRleHQuY3JlYXRlQnVmZmVyKCk7XG5cbiAgdGhpcy5jb250ZXh0LmJpbmRCdWZmZXIodGFyZ2V0LCBlbGVtZW50QnVmZmVyKTtcblxuICB0aGlzLmNvbnRleHQuYnVmZmVyRGF0YSh0YXJnZXQsIHVpbnQxNkFycmF5LCB1c2FnZSk7XG5cbiAgcmV0dXJuIGVsZW1lbnRCdWZmZXI7XG59XG5cbmZ1bmN0aW9uIGJpbmRFbGVtZW50QnVmZmVyKGVsZW1lbnRCdWZmZXIpIHtcbiAgY29uc3QgeyBFTEVNRU5UX0FSUkFZX0JVRkZFUiB9ID0gdGhpcy5jb250ZXh0LFxuICAgICAgICB0YXJnZXQgPSBFTEVNRU5UX0FSUkFZX0JVRkZFUjtcblxuICB0aGlzLmNvbnRleHQuYmluZEJ1ZmZlcih0YXJnZXQsIGVsZW1lbnRCdWZmZXIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIoZGF0YSkge1xuICBjb25zdCB7IEFSUkFZX0JVRkZFUiwgU1RBVElDX0RSQVcgfSA9IHRoaXMuY29udGV4dCxcbiAgICAgICAgdGFyZ2V0ID0gQVJSQVlfQlVGRkVSLFxuICAgICAgICB1c2FnZSA9IFNUQVRJQ19EUkFXLFxuICAgICAgICBidWZmZXIgPSB0aGlzLmNvbnRleHQuY3JlYXRlQnVmZmVyKCksXG4gICAgICAgIGZsb2F0MzJBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoZGF0YSk7XG5cbiAgdGhpcy5jb250ZXh0LmJpbmRCdWZmZXIodGFyZ2V0LCBidWZmZXIpO1xuXG4gIHRoaXMuY29udGV4dC5idWZmZXJEYXRhKHRhcmdldCwgZmxvYXQzMkFycmF5LCB1c2FnZSk7XG5cbiAgcmV0dXJuIGJ1ZmZlcjtcbn1cblxuZnVuY3Rpb24gYmluZEJ1ZmZlcihidWZmZXIsIGF0dHJpYnV0ZUxvY2F0aW9uLCBjb21wb25lbnRzKSB7XG4gIGNvbnN0IHsgQVJSQVlfQlVGRkVSLCBGTE9BVCB9ID0gdGhpcy5jb250ZXh0LFxuICAgICAgICB0YXJnZXQgPSBBUlJBWV9CVUZGRVIsXG4gICAgICAgIHR5cGUgPSBGTE9BVCxcbiAgICAgICAgbm9ybWFsaXplID0gZmFsc2UsXG4gICAgICAgIHN0cmlkZSA9IDAsXG4gICAgICAgIG9mZnNldCA9IDA7XG5cbiAgdGhpcy5jb250ZXh0LmJpbmRCdWZmZXIodGFyZ2V0LCBidWZmZXIpO1xuXG4gIHRoaXMuY29udGV4dC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dHJpYnV0ZUxvY2F0aW9uLCBjb21wb25lbnRzLCB0eXBlLCBub3JtYWxpemUsIHN0cmlkZSwgb2Zmc2V0KTtcblxuICB0aGlzLmNvbnRleHQuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0cmlidXRlTG9jYXRpb24pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlRWxlbWVudEJ1ZmZlcixcbiAgYmluZEVsZW1lbnRCdWZmZXIsXG4gIGNyZWF0ZUJ1ZmZlcixcbiAgYmluZEJ1ZmZlclxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZGVmYXVsdFIgPSAwLjAsXG4gICAgICBkZWZhdWx0RyA9IDAuMCxcbiAgICAgIGRlZmF1bHRCID0gMC4wLFxuICAgICAgZGVmYXVsdEEgPSAxLjA7XG5cbmZ1bmN0aW9uIGNsZWFyQ29sb3VyKHIgPSBkZWZhdWx0UiwgZyA9IGRlZmF1bHRHLCBiID0gZGVmYXVsdEIsIGEgPSBkZWZhdWx0QSkgeyB0aGlzLmNvbnRleHQuY2xlYXJDb2xvcihyLCBnLCBiLCBhKTsgfVxuXG5mdW5jdGlvbiBjbGVhckNvbG91ckJ1ZmZlcigpIHtcbiAgY29uc3QgeyBDT0xPUl9CVUZGRVJfQklUIH0gPSB0aGlzLmNvbnRleHQsXG4gICAgICAgIG1hc2sgPSBDT0xPUl9CVUZGRVJfQklUO1xuXG4gIHRoaXMuY29udGV4dC5jbGVhcihtYXNrKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNsZWFyQ29sb3VyLFxuICBjbGVhckNvbG91ckJ1ZmZlclxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZGVmYXVsdERlcHRoID0gMS4wO1xuXG5mdW5jdGlvbiBjbGVhckRlcHRoKGRlcHRoID0gZGVmYXVsdERlcHRoKSB7IFxuICB0aGlzLmNvbnRleHQuY2xlYXJEZXB0aChkZXB0aCk7IFxufVxuXG5mdW5jdGlvbiBjbGVhckRlcHRoQnVmZmVyKCkge1xuICBjb25zdCB7IERFUFRIX0JVRkZFUl9CSVQgfSA9IHRoaXMuY29udGV4dCxcbiAgICAgICAgbWFzayA9IERFUFRIX0JVRkZFUl9CSVQ7XG5cbiAgdGhpcy5jb250ZXh0LmNsZWFyKG1hc2spO1xufVxuXG5mdW5jdGlvbiBlbmFibGVEZXB0aFRlc3RpbmcoKSB7XG4gIGNvbnN0IHsgREVQVEhfVEVTVCwgTEVRVUFMIH0gPSB0aGlzLmNvbnRleHQsXG4gICAgICAgIGNhcGFjaXR5ID0gREVQVEhfVEVTVCxcbiAgICAgICAgZGVwdGhDb21wYXJpc29uRnVuY3Rpb24gPSBMRVFVQUw7XG5cbiAgdGhpcy5jb250ZXh0LmVuYWJsZShjYXBhY2l0eSk7XG5cbiAgdGhpcy5jb250ZXh0LmRlcHRoRnVuYyhkZXB0aENvbXBhcmlzb25GdW5jdGlvbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjbGVhckRlcHRoLFxuICBjbGVhckRlcHRoQnVmZmVyLFxuICBlbmFibGVEZXB0aFRlc3Rpbmdcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGFwcGx5TWF0cml4KHVuaWZvcm1Mb2NhdGlvbiwgbWF0cml4KSB7XG4gIGNvbnN0IHRyYW5zcG9zZSA9IGZhbHNlOyAgLy8vXG5cbiAgdGhpcy5jb250ZXh0LnVuaWZvcm1NYXRyaXg0ZnYodW5pZm9ybUxvY2F0aW9uLCB0cmFuc3Bvc2UsIG1hdHJpeCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhcHBseU1hdHJpeFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gY3JlYXRlUHJvZ3JhbSh2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKSB7XG4gIGNvbnN0IHByb2dyYW0gPSB0aGlzLmNvbnRleHQuY3JlYXRlUHJvZ3JhbSgpO1xuXG4gIHRoaXMuY29udGV4dC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcblxuICB0aGlzLmNvbnRleHQuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgXG4gIHRoaXMuY29udGV4dC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgXG4gIHJldHVybiBwcm9ncmFtO1xufVxuXG5mdW5jdGlvbiB1c2VQcm9ncmFtKHByb2dyYW0pIHtcbiAgdGhpcy5jb250ZXh0LnVzZVByb2dyYW0ocHJvZ3JhbSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVQcm9ncmFtLFxuICB1c2VQcm9ncmFtXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBjcmVhdGVTaGFkZXIodHlwZSwgc2hhZGVyU291cmNlKSB7XG4gIGNvbnN0IHsgQ09NUElMRV9TVEFUVVMgfSA9IHRoaXMuY29udGV4dCxcbiAgICAgICAgcG5hbWUgPSBDT01QSUxFX1NUQVRVUyxcbiAgICAgICAgc2hhZGVyID0gdGhpcy5jb250ZXh0LmNyZWF0ZVNoYWRlcih0eXBlKTtcblxuICB0aGlzLmNvbnRleHQuc2hhZGVyU291cmNlKHNoYWRlciwgc2hhZGVyU291cmNlKTtcblxuICB0aGlzLmNvbnRleHQuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG4gIGNvbnN0IGNvbXBpbGVTdGF0dXMgPSB0aGlzLmNvbnRleHQuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgcG5hbWUpO1xuXG4gIGlmICghY29tcGlsZVN0YXR1cykge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGNyZWF0ZSB0aGUgc2hhZGVyLmApO1xuICB9XG5cbiAgcmV0dXJuIHNoYWRlcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVmVydGV4U2hhZGVyKHZlcnRleFNoYWRlclNvdXJjZSwgY2FudmFzKSB7XG4gIGNvbnN0IHsgVkVSVEVYX1NIQURFUiB9ID0gdGhpcy5jb250ZXh0LFxuICAgICAgICB0eXBlID0gVkVSVEVYX1NIQURFUixcbiAgICAgICAgdmVydGV4U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIodHlwZSwgdmVydGV4U2hhZGVyU291cmNlKTtcblxuICByZXR1cm4gdmVydGV4U2hhZGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudFNoYWRlcihmcmFnbWVudFNoYWRlclNvdXJjZSwgY2FudmFzKSB7XG4gIGNvbnN0IHsgRlJBR01FTlRfU0hBREVSIH0gPSB0aGlzLmNvbnRleHQsXG4gICAgICAgIHR5cGUgPSBGUkFHTUVOVF9TSEFERVIsXG4gICAgICAgIHZlcnRleFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKHR5cGUsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcblxuICByZXR1cm4gdmVydGV4U2hhZGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlU2hhZGVyLFxuICBjcmVhdGVWZXJ0ZXhTaGFkZXIsXG4gIGNyZWF0ZUZyYWdtZW50U2hhZGVyXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBjcmVhdGVUZXh0dXJlKGltYWdlKSB7XG5cdGNvbnN0IHsgUkdCQSwgTElORUFSLCBVTlNJR05FRF9CWVRFLCBURVhUVVJFXzJELCBURVhUVVJFX01JTl9GSUxURVIgfSA9IHRoaXMuY29udGV4dCxcblx0XHRcdFx0dGFyZ2V0ID0gVEVYVFVSRV8yRCxcblx0XHRcdFx0bGV2ZWwgPSAwLFxuXHRcdFx0XHRpbnRlcm5hbEZvcm1hdCA9IFJHQkEsXG5cdFx0XHRcdGZvcm1hdCA9IFJHQkEsXG5cdFx0XHRcdHR5cGUgPSBVTlNJR05FRF9CWVRFLFxuXHRcdFx0XHRwbmFtZSA9IFRFWFRVUkVfTUlOX0ZJTFRFUixcblx0XHRcdFx0cGFyYW0gPSBMSU5FQVIsXG5cdFx0XHRcdHRleHR1cmUgPSB0aGlzLmNvbnRleHQuY3JlYXRlVGV4dHVyZSgpO1xuXG5cdHRoaXMuY29udGV4dC5iaW5kVGV4dHVyZSh0YXJnZXQsIHRleHR1cmUpO1xuXG5cdHRoaXMuY29udGV4dC50ZXhJbWFnZTJEKHRhcmdldCwgbGV2ZWwsIGludGVybmFsRm9ybWF0LCBmb3JtYXQsIHR5cGUsIGltYWdlKTtcblxuXHR0aGlzLmNvbnRleHQudGV4UGFyYW1ldGVyaSh0YXJnZXQsIHBuYW1lLCBwYXJhbSk7XG59XG5cbmZ1bmN0aW9uIGFjdGl2YXRlVGV4dHVyZSh0YXJnZXQpIHsgdGhpcy5jb250ZXh0LmFjdGl2ZVRleHR1cmUodGFyZ2V0KTsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlVGV4dHVyZSxcbiAgYWN0aXZhdGVUZXh0dXJlXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB2ZWN0b3JNYXRocyA9IHJlcXVpcmUoJy4uL21hdGhzL3ZlY3RvcicpO1xuXG5jb25zdCB7IHN1YnRyYWN0MyB9ID0gdmVjdG9yTWF0aHM7XG5cbmNsYXNzIEVkZ2Uge1xuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbiwgZXh0ZW50KSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMuZXh0ZW50ID0gZXh0ZW50O1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb247XG4gIH1cblxuICBnZXRFeHRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXh0ZW50O1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLnNsaWNlKCksXG4gICAgICAgICAgZXh0ZW50ID0gdGhpcy5leHRlbnQuc2xpY2UoKSxcbiAgICAgICAgICBlZGdlID0gbmV3IEVkZ2UocG9zaXRpb24sIGV4dGVudCk7XG5cbiAgICByZXR1cm4gZWRnZTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tU3RhcnRWZXJ0ZXhBbmRFbmRWZXJ0ZXgoQ2xhc3MsIHN0YXJ0VmVydGV4LCBlbmRWZXJ0ZXgpIHtcbiAgICBpZiAoZW5kVmVydGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVuZFZlcnRleCA9IHN0YXJ0VmVydGV4O1xuICAgICAgc3RhcnRWZXJ0ZXggPSBDbGFzcztcbiAgICAgIENsYXNzID0gRWRnZTtcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgc3RhcnRQb3NpdGlvbiA9IHN0YXJ0VmVydGV4LmdldFBvc2l0aW9uKCksXG4gICAgICAgICAgZW5kUG9zaXRpb24gPSBlbmRWZXJ0ZXguZ2V0UG9zaXRpb24oKSxcbiAgICAgICAgICBwb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb24uc2xpY2UoKSwgLy8vXG4gICAgICAgICAgZXh0ZW50ID0gc3VidHJhY3QzKGVuZFBvc2l0aW9uLCBzdGFydFBvc2l0aW9uKSxcbiAgICAgICAgICBlZGdlID0gbmV3IENsYXNzKHBvc2l0aW9uLCBleHRlbnQpO1xuXG4gICAgcmV0dXJuIGVkZ2U7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFZGdlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFZGdlID0gcmVxdWlyZSgnLi4vZWRnZScpLFxuICAgICAgdmVjdG9yTWF0aHMgPSByZXF1aXJlKCcuLi8uLi9tYXRocy92ZWN0b3InKSxcbiAgICAgIGFycmF5VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vdXRpbGl0aWVzL2FycmF5JyksXG4gICAgICBtaWRQb2ludFV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9taWRQb2ludCcpO1xuXG5jb25zdCB7IHRoaXJkIH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgc3VidHJhY3QzLCBjcm9zczMgfSA9IHZlY3Rvck1hdGhzLFxuICAgICAgeyBwcm9qZWN0TWlkUG9pbnRQb3NpdGlvbk9udG9YWVBsYW5lIH0gPSBtaWRQb2ludFV0aWxpdGllcztcblxuY2xhc3MgTWFza2luZ0VkZ2UgZXh0ZW5kcyBFZGdlIHtcbiAgaXNNaWRQb2ludFBvc2l0aW9uVG9UaGVMZWZ0KG1pZFBvaW50UG9zaXRpb24pIHtcbiAgICBtaWRQb2ludFBvc2l0aW9uID0gcHJvamVjdE1pZFBvaW50UG9zaXRpb25PbnRvWFlQbGFuZShtaWRQb2ludFBvc2l0aW9uKTsgIC8vL1xuXG4gICAgY29uc3QgZXh0ZW50ID0gdGhpcy5nZXRFeHRlbnQoKSxcbiAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKSxcbiAgICAgICAgICBtaWRQb2ludFJlbGF0aXZlUG9zaXRpb24gPSBzdWJ0cmFjdDMobWlkUG9pbnRQb3NpdGlvbiwgcG9zaXRpb24pLFxuICAgICAgICAgIGNyb3NzUHJvZHVjdENvbXBvbmVudHMgPSBjcm9zczMoZXh0ZW50LCBtaWRQb2ludFJlbGF0aXZlUG9zaXRpb24pLCAvLy9cbiAgICAgICAgICB0aGlyZENyb3NzUHJvZHVjdENvbXBvbmVudCA9IHRoaXJkKGNyb3NzUHJvZHVjdENvbXBvbmVudHMpLFxuICAgICAgICAgIG1pZFBvaW50UG9zaXRpb25Ub1RoZUxlZnQgPSAodGhpcmRDcm9zc1Byb2R1Y3RDb21wb25lbnQgPiAwKTtcblxuICAgIHJldHVybiBtaWRQb2ludFBvc2l0aW9uVG9UaGVMZWZ0O1xuICB9XG4gIFxuICBpc01pZFBvaW50UG9zaXRpb25Ub1RoZVJpZ2h0KG1pZFBvaW50UG9zaXRpb24pIHtcbiAgICBjb25zdCBtaWRQb2ludFBvc2l0aW9uVG9UaGVMZWZ0ID0gdGhpcy5pc01pZFBvaW50UG9zaXRpb25Ub1RoZUxlZnQobWlkUG9pbnRQb3NpdGlvbiksXG4gICAgICAgICAgbWlkUG9pbnRQb3NpdGlvblRvVGhlUmlnaHQgPSAhbWlkUG9pbnRQb3NpdGlvblRvVGhlTGVmdDtcbiAgICBcbiAgICByZXR1cm4gbWlkUG9pbnRQb3NpdGlvblRvVGhlUmlnaHQ7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tU3RhcnRWZXJ0ZXhBbmRFbmRWZXJ0ZXgoc3RhcnRWZXJ0ZXgsIGVuZFZlcnRleCkgeyByZXR1cm4gRWRnZS5mcm9tU3RhcnRWZXJ0ZXhBbmRFbmRWZXJ0ZXgoTWFza2luZ0VkZ2UsIHN0YXJ0VmVydGV4LCBlbmRWZXJ0ZXgpOyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWFza2luZ0VkZ2U7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVkZ2UgPSByZXF1aXJlKCcuL2VkZ2UnKSxcbiAgICAgIE5vcm1hbCA9IHJlcXVpcmUoJy4vbm9ybWFsJyksXG4gICAgICBWZXJ0ZXggPSByZXF1aXJlKCcuL3ZlcnRleCcpLFxuICAgICAgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyksXG4gICAgICBmYWNldFV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9mYWNldCcpLFxuICAgICAgYXJyYXlVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvYXJyYXknKSxcbiAgICAgIG1pZFBvaW50VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL21pZFBvaW50JyksXG4gICAgICBpbnRlcnNlY3Rpb25VdGlsaXRpZXMgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvaW50ZXJzZWN0aW9uJyk7XG5cbmNvbnN0IHsgVkVSVElDRVNfTEVOR1RIIH0gPSBjb25zdGFudHMsXG4gICAgICB7IHB1c2gsIHBlcm11dGUgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBjYWxjdWxhdGVFZGdlcywgY2FsY3VsYXRlTm9ybWFsIH0gPSBmYWNldFV0aWxpdGllcyxcbiAgICAgIHsgY2FsY3VsYXRlTWlkUG9pbnRQb3NpdGlvbiwgaXNNaWRQb2ludFBvc2l0aW9uVG9PbmVTaWRlT2ZNYXNraW5nRWRnZXMgfSA9IG1pZFBvaW50VXRpbGl0aWVzLFxuICAgICAgeyBjYWxjdWxhdGVJbnRlcm1lZGlhdGVWZXJ0ZXhQb3NpdGlvbiwgY2FsY3VsYXRlTm9uTnVsbEludGVyc2VjdGlvbnMsIGNhbGN1bGF0ZU51bGxJbnRlcnNlY3Rpb25JbmRleCwgY2FsY3VsYXRlTm9uTnVsbEludGVyc2VjdGlvbkluZGV4IH0gPSBpbnRlcnNlY3Rpb25VdGlsaXRpZXM7XG5cbmNsYXNzIEZhY2V0IHtcbiAgY29uc3RydWN0b3IodmVydGljZXMsIG5vcm1hbCwgZWRnZXMpIHtcbiAgICB0aGlzLnZlcnRpY2VzID0gdmVydGljZXM7XG4gICAgdGhpcy5ub3JtYWwgPSBub3JtYWw7XG4gICAgdGhpcy5lZGdlcyA9IGVkZ2VzO1xuICB9XG5cbiAgZ2V0VmVydGljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMudmVydGljZXM7XG4gIH1cblxuICBnZXROb3JtYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9ybWFsO1xuICB9XG5cbiAgZ2V0RWRnZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWRnZXM7XG4gIH1cbiAgXG4gIGdldFZlcnRleFBvc2l0aW9ucygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQb3NpdGlvbnMgPSB0aGlzLnZlcnRpY2VzLm1hcCgodmVydGV4KSA9PiB2ZXJ0ZXguZ2V0UG9zaXRpb24oKSk7XG4gICAgXG4gICAgcmV0dXJuIHZlcnRleFBvc2l0aW9ucztcbiAgfVxuICBcbiAgZ2V0VmVydGV4Tm9ybWFscygpIHtcbiAgICBjb25zdCBub3JtYWxFeHRlbnQgPSB0aGlzLm5vcm1hbC5nZXRFeHRlbnQoKSxcbiAgICAgICAgICB2ZXJ0ZXhOb3JtYWwgPSBub3JtYWxFeHRlbnQsICAvLy9cbiAgICAgICAgICB2ZXJ0ZXhOb3JtYWxzID0gW1xuICAgICAgICAgICAgdmVydGV4Tm9ybWFsLFxuICAgICAgICAgICAgdmVydGV4Tm9ybWFsLFxuICAgICAgICAgICAgdmVydGV4Tm9ybWFsLFxuICAgICAgICAgIF07XG4gICAgXG4gICAgcmV0dXJuIHZlcnRleE5vcm1hbHM7XG4gIH1cbiAgXG4gIGdldFZlcnRleEluZGV4ZXMoaW5kZXgpIHsgLy8vXG4gICAgY29uc3QgdmVydGV4SW5kZXggPSBpbmRleCAqIDMsXG4gICAgICAgICAgdmVydGV4SW5kZXhlcyA9IFtcbiAgICAgICAgICAgIHZlcnRleEluZGV4ICsgMCxcbiAgICAgICAgICAgIHZlcnRleEluZGV4ICsgMSxcbiAgICAgICAgICAgIHZlcnRleEluZGV4ICsgMixcbiAgICAgICAgICBdO1xuICAgIFxuICAgIHJldHVybiB2ZXJ0ZXhJbmRleGVzO1xuICB9XG5cbiAgaXNNYXNrZWQobWFza2luZ0ZhY2V0KSB7XG4gICAgY29uc3QgbWFza2luZ0VkZ2VzID0gbWFza2luZ0ZhY2V0LmdldE1hc2tpbmdFZGdlcygpLFxuICAgICAgICAgIG1pZFBvaW50UG9zaXRpb24gPSBjYWxjdWxhdGVNaWRQb2ludFBvc2l0aW9uKHRoaXMudmVydGljZXMpLFxuICAgICAgICAgIG1pZFBvaW50UG9zaXRpb25Ub09uZVNpZGVPZk1hc2tpbmdFZGdlcyA9IGlzTWlkUG9pbnRQb3NpdGlvblRvT25lU2lkZU9mTWFza2luZ0VkZ2VzKG1pZFBvaW50UG9zaXRpb24sIG1hc2tpbmdFZGdlcyksXG4gICAgICAgICAgbWFza2VkID0gbWlkUG9pbnRQb3NpdGlvblRvT25lU2lkZU9mTWFza2luZ0VkZ2VzOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIG1hc2tlZDtcbiAgfVxuXG4gIHBlcm11dGUocGxhY2VzKSB7XG4gICAgdGhpcy52ZXJ0aWNlcyA9IHBlcm11dGUodGhpcy52ZXJ0aWNlcywgcGxhY2VzKTtcblxuICAgIHRoaXMubm9ybWFsID0gY2FsY3VsYXRlTm9ybWFsKHRoaXMudmVydGljZXMsIE5vcm1hbCk7XG5cbiAgICB0aGlzLmVkZ2VzID0gY2FsY3VsYXRlRWRnZXModGhpcy52ZXJ0aWNlcywgRWRnZSk7XG4gIH1cblxuICByb3RhdGUocm90YXRpb25RdWF0ZXJuaW9uKSB7XG4gICAgdGhpcy52ZXJ0aWNlcy5mb3JFYWNoKCh2ZXJ0ZXgpID0+IHZlcnRleC5yb3RhdGUocm90YXRpb25RdWF0ZXJuaW9uKSk7XG5cbiAgICB0aGlzLm5vcm1hbCA9IGNhbGN1bGF0ZU5vcm1hbCh0aGlzLnZlcnRpY2VzLCBOb3JtYWwpO1xuXG4gICAgdGhpcy5lZGdlcyA9IGNhbGN1bGF0ZUVkZ2VzKHRoaXMudmVydGljZXMsIEVkZ2UpO1xuICB9XG5cbiAgYXBwbHlUcmFuc2Zvcm0odHJhbnNmb3JtKSB7XG4gICAgdGhpcy52ZXJ0aWNlcy5mb3JFYWNoKCh2ZXJ0ZXgpID0+IHZlcnRleC5hcHBseVRyYW5zZm9ybSh0cmFuc2Zvcm0pKTtcblxuICAgIHRoaXMubm9ybWFsID0gY2FsY3VsYXRlTm9ybWFsKHRoaXMudmVydGljZXMsIE5vcm1hbCk7XG5cbiAgICB0aGlzLmVkZ2VzID0gY2FsY3VsYXRlRWRnZXModGhpcy52ZXJ0aWNlcywgRWRnZSk7XG4gIH1cblxuICBzcGxpdFdpdGhJbnRlcnNlY3Rpb25zKGludGVyc2VjdGlvbnMsIHNtYWxsZXJGYWNldHMpIHtcbiAgICBjb25zdCBub25OdWxsSW50ZXJzZWN0aW9ucyA9IGNhbGN1bGF0ZU5vbk51bGxJbnRlcnNlY3Rpb25zKGludGVyc2VjdGlvbnMpLFxuICAgICAgICAgIG5vbk51bGxJbnRlcnNlY3Rpb25zTGVuZ3RoID0gbm9uTnVsbEludGVyc2VjdGlvbnMubGVuZ3RoO1xuXG4gICAgc3dpdGNoIChub25OdWxsSW50ZXJzZWN0aW9uc0xlbmd0aCkge1xuICAgICAgY2FzZSAyIDpcbiAgICAgICAgdGhpcy5zcGxpdFdpdGhUd29Ob25OdWxsSW50ZXJzZWN0aW9ucyhpbnRlcnNlY3Rpb25zLCBzbWFsbGVyRmFjZXRzKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMSA6XG4gICAgICAgIHRoaXMuc3BsaXRXaXRoT25lTm9uTnVsbEludGVyc2VjdGlvbihpbnRlcnNlY3Rpb25zLCBzbWFsbGVyRmFjZXRzKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMCA6XG4gICAgICAgIHRoaXMuc3BsaXRXaXRoTm9Ob25OdWxsSW50ZXJzZWN0aW9ucyhpbnRlcnNlY3Rpb25zLCBzbWFsbGVyRmFjZXRzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIFxuICBzcGxpdFdpdGhUd29Ob25OdWxsSW50ZXJzZWN0aW9ucyhpbnRlcnNlY3Rpb25zLCBzbWFsbGVyRmFjZXRzKSB7XG4gICAgY29uc3QgbnVsbEludGVyc2VjdGlvbkluZGV4ID0gY2FsY3VsYXRlTnVsbEludGVyc2VjdGlvbkluZGV4KGludGVyc2VjdGlvbnMpLFxuICAgICAgICAgIHBsYWNlcyA9IChWRVJUSUNFU19MRU5HVEggLSBudWxsSW50ZXJzZWN0aW9uSW5kZXgpICUgVkVSVElDRVNfTEVOR1RIO1xuXG4gICAgaW50ZXJzZWN0aW9ucyA9IHBlcm11dGUoaW50ZXJzZWN0aW9ucywgcGxhY2VzKTtcblxuICAgIGludGVyc2VjdGlvbnMgPSBpbnRlcnNlY3Rpb25zLnNsaWNlKDEpOyAvLy9cblxuICAgIHRoaXMucGVybXV0ZShwbGFjZXMpO1xuXG4gICAgY29uc3Qgc3RhcnRWZXJ0ZXhQb3NpdGlvbkluZGV4ZXMgPSBbIDEsIDIgXSxcbiAgICAgICAgICBlbmRWZXJ0ZXhQb3NpdGlvbkluZGV4ZXMgPSBbIDIsIDAgXSxcbiAgICAgICAgICBpbmRleFR1cGxlcyA9IFtcblxuICAgICAgICAgICAgWyAwLCAxLCAzIF0sXG4gICAgICAgICAgICBbIDMsIDQsIDAgXSxcbiAgICAgICAgICAgIFsgMywgMiwgNCBdLFxuXG4gICAgICAgICAgXTtcblxuICAgIHRoaXMuc3BsaXRXaXRoSW5kZXhUdXBsZXNBbmRJbnRlcnNlY3Rpb25zKHN0YXJ0VmVydGV4UG9zaXRpb25JbmRleGVzLCBlbmRWZXJ0ZXhQb3NpdGlvbkluZGV4ZXMsIGluZGV4VHVwbGVzLCBpbnRlcnNlY3Rpb25zLCBzbWFsbGVyRmFjZXRzKTtcbiAgfVxuXG4gIHNwbGl0V2l0aE9uZU5vbk51bGxJbnRlcnNlY3Rpb24oaW50ZXJzZWN0aW9ucywgc21hbGxlckZhY2V0cykge1xuICAgIGNvbnN0IG5vbk51bGxJbnRlcnNlY3Rpb25JbmRleCA9IGNhbGN1bGF0ZU5vbk51bGxJbnRlcnNlY3Rpb25JbmRleChpbnRlcnNlY3Rpb25zKSxcbiAgICAgICAgICBwbGFjZXMgPSAoVkVSVElDRVNfTEVOR1RIIC0gbm9uTnVsbEludGVyc2VjdGlvbkluZGV4KSAlIFZFUlRJQ0VTX0xFTkdUSDtcblxuICAgIGludGVyc2VjdGlvbnMgPSBwZXJtdXRlKGludGVyc2VjdGlvbnMsIHBsYWNlcyk7XG5cbiAgICBpbnRlcnNlY3Rpb25zID0gaW50ZXJzZWN0aW9ucy5zbGljZSgwLCAxKTsgIC8vL1xuXG4gICAgdGhpcy5wZXJtdXRlKHBsYWNlcyk7XG5cbiAgICBjb25zdCBzdGFydFZlcnRleFBvc2l0aW9uSW5kZXhlcyA9IFsgMCBdLFxuICAgICAgICAgIGVuZFZlcnRleFBvc2l0aW9uSW5kZXhlcyA9IFsgMSBdLFxuICAgICAgICAgIGluZGV4VHVwbGVzID0gW1xuXG4gICAgICAgICAgICBbIDAsIDMsIDIgXSxcbiAgICAgICAgICAgIFsgMywgMSwgMiBdLFxuXG4gICAgICAgICAgXTtcblxuICAgIHRoaXMuc3BsaXRXaXRoSW5kZXhUdXBsZXNBbmRJbnRlcnNlY3Rpb25zKHN0YXJ0VmVydGV4UG9zaXRpb25JbmRleGVzLCBlbmRWZXJ0ZXhQb3NpdGlvbkluZGV4ZXMsIGluZGV4VHVwbGVzLCBpbnRlcnNlY3Rpb25zLCBzbWFsbGVyRmFjZXRzKTtcbiAgfVxuXG4gIHNwbGl0V2l0aE5vTm9uTnVsbEludGVyc2VjdGlvbnMoaW50ZXJzZWN0aW9ucywgc21hbGxlckZhY2V0cykge1xuICAgIGNvbnN0IHNtYWxsZXJGYWNldCA9IHRoaXMuZnJvbVZlcnRpY2VzKHRoaXMudmVydGljZXMpOyAgLy8vXG5cbiAgICBzbWFsbGVyRmFjZXRzLnB1c2goc21hbGxlckZhY2V0KTtcbiAgfVxuXG4gIHNwbGl0V2l0aEluZGV4VHVwbGVzQW5kSW50ZXJzZWN0aW9ucyhzdGFydFZlcnRleFBvc2l0aW9uSW5kZXhlcywgZW5kVmVydGV4UG9zaXRpb25JbmRleGVzLCBpbmRleFR1cGxlcywgaW50ZXJzZWN0aW9ucywgc21hbGxlckZhY2V0cykge1xuICAgIGNvbnN0IHZlcnRleFBvc2l0aW9ucyA9IHRoaXMuZ2V0VmVydGV4UG9zaXRpb25zKCksXG4gICAgICAgICAgaW50ZXJtZWRpYXRlVmVydGV4UG9zaXRpb25zID0gaW50ZXJzZWN0aW9ucy5tYXAoKGludGVyc2VjdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0VmVydGV4UG9zaXRpb25JbmRleCA9IHN0YXJ0VmVydGV4UG9zaXRpb25JbmRleGVzW2luZGV4XSxcbiAgICAgICAgICAgICAgICAgIGVuZFZlcnRleFBvc2l0aW9uSW5kZXggPSBlbmRWZXJ0ZXhQb3NpdGlvbkluZGV4ZXNbaW5kZXhdLFxuICAgICAgICAgICAgICAgICAgc3RhcnRWZXJ0ZXhQb3NpdGlvbiA9IHZlcnRleFBvc2l0aW9uc1tzdGFydFZlcnRleFBvc2l0aW9uSW5kZXhdLFxuICAgICAgICAgICAgICAgICAgZW5kVmVydGV4UG9zaXRpb24gPSB2ZXJ0ZXhQb3NpdGlvbnNbZW5kVmVydGV4UG9zaXRpb25JbmRleF0sXG4gICAgICAgICAgICAgICAgICBpbnRlcm1lZGlhdGVWZXJ0ZXhQb3NpdGlvbiA9IGNhbGN1bGF0ZUludGVybWVkaWF0ZVZlcnRleFBvc2l0aW9uKHN0YXJ0VmVydGV4UG9zaXRpb24sIGVuZFZlcnRleFBvc2l0aW9uLCBpbnRlcnNlY3Rpb24pO1xuXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJtZWRpYXRlVmVydGV4UG9zaXRpb247XG4gICAgICAgICAgfSk7XG5cbiAgICBwdXNoKHZlcnRleFBvc2l0aW9ucywgaW50ZXJtZWRpYXRlVmVydGV4UG9zaXRpb25zKTtcblxuICAgIGluZGV4VHVwbGVzLmZvckVhY2goKGluZGV4VHVwbGUpID0+IHtcbiAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IHZlcnRleFBvc2l0aW9ucywgIC8vL1xuICAgICAgICAgICAgaW5kZXhlcyA9IGluZGV4VHVwbGUsICAvLy9cbiAgICAgICAgICAgIGZhY2V0ID0gdGhpcywgXG4gICAgICAgICAgICBzbWFsbGVyRmFjZXQgPSBzbWFsbGVyRmFjZXRGcm9tUG9zaXRpb25zSW5kZXhlc0FuZEZhY2V0KHBvc2l0aW9ucywgaW5kZXhlcywgZmFjZXQpO1xuXG4gICAgICBpZiAoc21hbGxlckZhY2V0ICE9PSBudWxsKSB7XG4gICAgICAgIHNtYWxsZXJGYWNldHMucHVzaChzbWFsbGVyRmFjZXQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmFjZXQ7XG5cbmZ1bmN0aW9uIHNtYWxsZXJGYWNldEZyb21Qb3NpdGlvbnNJbmRleGVzQW5kRmFjZXQocG9zaXRpb25zLCBpbmRleGVzLCBmYWNldCkge1xuICBjb25zdCB2ZXJ0aWNlcyA9IGluZGV4ZXMubWFwKChpbmRleCkgPT4ge1xuICAgICAgICAgIGxldCBwb3NpdGlvbiA9IHBvc2l0aW9uc1tpbmRleF07XG4gICAgXG4gICAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbi5zbGljZSgpOyAvLy9cbiAgICBcbiAgICAgICAgICBjb25zdCB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbVBvc2l0aW9uKHBvc2l0aW9uKTtcblxuICAgICAgICAgIHJldHVybiB2ZXJ0ZXg7XG4gICAgICAgIH0pLFxuICAgICAgICBzbWFsbGVyRmFjZXQgPSBmYWNldC5mcm9tVmVydGljZXModmVydGljZXMpO1xuXG4gIHJldHVybiBzbWFsbGVyRmFjZXQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVkZ2UgPSByZXF1aXJlKCcuLi9lZGdlJyksXG4gICAgICBGYWNldCA9IHJlcXVpcmUoJy4uL2ZhY2V0JyksXG4gICAgICBOb3JtYWwgPSByZXF1aXJlKCcuLi9ub3JtYWwnKSxcbiAgICAgIFZlcnRleCA9IHJlcXVpcmUoJy4uL3ZlcnRleCcpLFxuICAgICAgZmFjZXRVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi8uLi91dGlsaXRpZXMvZmFjZXQnKSxcbiAgICAgIHZlcnRpY2VzVXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vdXRpbGl0aWVzL3ZlcnRpY2VzJyksXG4gICAgICBhcHByb3hpbWF0ZVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9hcHByb3hpbWF0ZScpO1xuXG5jb25zdCB7IGlzQXBwcm94aW1hdGVseUVxdWFsVG9aZXJvIH0gPSBhcHByb3hpbWF0ZVV0aWxpdGllcyxcbiAgICAgIHsgdmVydGljZXNGcm9tQ29vcmRpbmF0ZVR1cGxlc0FuZEluZGV4VHVwbGUgfSA9IHZlcnRpY2VzVXRpbGl0aWVzLFxuICAgICAgeyBjbG9uZUVkZ2VzLCBjbG9uZU5vcm1hbCwgY2xvbmVWZXJ0aWNlcywgY2FsY3VsYXRlQXJlYSwgY2FsY3VsYXRlRWRnZXMsIGNhbGN1bGF0ZU5vcm1hbCB9ID0gZmFjZXRVdGlsaXRpZXM7XG5cbmNsYXNzIENvbG91cmVkRmFjZXQgZXh0ZW5kcyBGYWNldCB7XG4gIGNvbnN0cnVjdG9yKHZlcnRpY2VzLCBub3JtYWwsIGVkZ2VzLCByZ2JhKSB7XG4gICAgc3VwZXIodmVydGljZXMsIG5vcm1hbCwgZWRnZXMpO1xuICAgIFxuICAgIHRoaXMucmdiYSA9IHJnYmE7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICBsZXQgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCksXG4gICAgICAgIG5vcm1hbCA9IHRoaXMuZ2V0Tm9ybWFsKCksXG4gICAgICAgIGVkZ2VzID0gdGhpcy5nZXRFZGdlcygpO1xuXG4gICAgdmVydGljZXMgPSBjbG9uZVZlcnRpY2VzKHZlcnRpY2VzKTtcbiAgICBub3JtYWwgPSBjbG9uZU5vcm1hbChub3JtYWwpO1xuICAgIGVkZ2VzID0gY2xvbmVFZGdlcyhlZGdlcyk7XG5cbiAgICBjb25zdCByZ2JhID0gdGhpcy5yZ2JhLFxuICAgICAgICAgIGNvbG91cmVkRmFjZXQgPSBuZXcgQ29sb3VyZWRGYWNldCh2ZXJ0aWNlcywgbm9ybWFsLCBlZGdlcywgcmdiYSk7XG5cbiAgICByZXR1cm4gY29sb3VyZWRGYWNldDtcbiAgfVxuXG4gIGdldFZlcnRleENvbG91cnMoKSB7XG4gICAgY29uc3QgdmVydGV4Q29sb3VyID0gdGhpcy5yZ2JhLCAvLy9cbiAgICAgICAgICB2ZXJ0ZXhDb2xvdXJzID0gW1xuICAgICAgICAgICAgdmVydGV4Q29sb3VyLFxuICAgICAgICAgICAgdmVydGV4Q29sb3VyLFxuICAgICAgICAgICAgdmVydGV4Q29sb3VyLFxuICAgICAgICAgIF07XG4gICAgXG4gICAgcmV0dXJuIHZlcnRleENvbG91cnM7XG4gIH1cblxuICBmcm9tVmVydGljZXModmVydGljZXMpIHtcbiAgICBsZXQgY29sb3VyZWRGYWNldCA9IG51bGw7XG5cbiAgICBjb25zdCBhcmVhID0gY2FsY3VsYXRlQXJlYSh2ZXJ0aWNlcyksXG4gICAgICAgICAgYXJlYUFwcHJveGltYXRlbHlFcXVhbFRvWmVybyA9IGlzQXBwcm94aW1hdGVseUVxdWFsVG9aZXJvKGFyZWEpLFxuICAgICAgICAgIGxhcmdlRW5vdWdoID0gIWFyZWFBcHByb3hpbWF0ZWx5RXF1YWxUb1plcm87ICAvLy9cblxuICAgIGlmIChsYXJnZUVub3VnaCkge1xuICAgICAgY29uc3QgcmdiYSA9IHRoaXMucmdiYSxcbiAgICAgICAgICAgIG5vcm1hbCA9IGNhbGN1bGF0ZU5vcm1hbCh2ZXJ0aWNlcywgTm9ybWFsKSxcbiAgICAgICAgICAgIGVkZ2VzID0gY2FsY3VsYXRlRWRnZXModmVydGljZXMsIEVkZ2UpO1xuXG4gICAgICBjb2xvdXJlZEZhY2V0ID0gbmV3IENvbG91cmVkRmFjZXQodmVydGljZXMsIG5vcm1hbCwgZWRnZXMsIHJnYmEpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xvdXJlZEZhY2V0O1xuICB9XG5cbiAgc3RhdGljIGZyb21Db29yZGluYXRlVHVwbGVzSW5kZXhUdXBsZUFuZENvbG91cihjb29yZGluYXRlVHVwbGVzLCBpbmRleFR1cGxlLCBjb2xvdXIpIHtcbiAgICBsZXQgY29sb3VyZWRGYWNldCA9IG51bGw7XG5cbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHZlcnRpY2VzRnJvbUNvb3JkaW5hdGVUdXBsZXNBbmRJbmRleFR1cGxlKGNvb3JkaW5hdGVUdXBsZXMsIGluZGV4VHVwbGUsIFZlcnRleCksXG4gICAgICAgICAgYXJlYSA9IGNhbGN1bGF0ZUFyZWEodmVydGljZXMpLFxuICAgICAgICAgIGFyZWFBcHByb3hpbWF0ZWx5RXF1YWxUb1plcm8gPSBpc0FwcHJveGltYXRlbHlFcXVhbFRvWmVybyhhcmVhKSxcbiAgICAgICAgICBsYXJnZUVub3VnaCA9ICFhcmVhQXBwcm94aW1hdGVseUVxdWFsVG9aZXJvOyAgLy8vXG5cbiAgICBpZiAobGFyZ2VFbm91Z2gpIHtcbiAgICAgIGNvbnN0IG5vcm1hbCA9IGNhbGN1bGF0ZU5vcm1hbCh2ZXJ0aWNlcywgTm9ybWFsKSxcbiAgICAgICAgICAgIGVkZ2VzID0gY2FsY3VsYXRlRWRnZXModmVydGljZXMsIEVkZ2UpLFxuICAgICAgICAgICAgcmdiYSA9IFsuLi5jb2xvdXIsIDFdOyAgLy8vXG5cbiAgICAgIGNvbG91cmVkRmFjZXQgPSBuZXcgQ29sb3VyZWRGYWNldCh2ZXJ0aWNlcywgbm9ybWFsLCBlZGdlcywgcmdiYSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbG91cmVkRmFjZXQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb2xvdXJlZEZhY2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFZGdlID0gcmVxdWlyZSgnLi4vZWRnZScpLFxuICAgICAgRmFjZXQgPSByZXF1aXJlKCcuLi9mYWNldCcpLFxuICAgICAgTm9ybWFsID0gcmVxdWlyZSgnLi4vbm9ybWFsJyksXG4gICAgICBWZXJ0ZXggPSByZXF1aXJlKCcuLi92ZXJ0ZXgnKSxcbiAgICAgIGFycmF5VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vLi4vdXRpbGl0aWVzL2FycmF5JyksXG4gICAgICBmYWNldFV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9mYWNldCcpLFxuICAgICAgdGV4dHVyZVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy90ZXh0dXJlJyksXG4gICAgICB2ZXJ0aWNlc1V0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy92ZXJ0aWNlcycpLFxuICAgICAgYXBwcm94aW1hdGVVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi8uLi91dGlsaXRpZXMvYXBwcm94aW1hdGUnKTtcblxuY29uc3QgeyBwZXJtdXRlIH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgaXNBcHByb3hpbWF0ZWx5RXF1YWxUb1plcm8gfSA9IGFwcHJveGltYXRlVXRpbGl0aWVzLFxuICAgICAgeyB2ZXJ0aWNlc0Zyb21Db29yZGluYXRlVHVwbGVzQW5kSW5kZXhUdXBsZSB9ID0gdmVydGljZXNVdGlsaXRpZXMsXG4gICAgICB7IGNsb25lRWRnZXMsIGNsb25lTm9ybWFsLCBjbG9uZVZlcnRpY2VzLCBjYWxjdWxhdGVBcmVhLCBjYWxjdWxhdGVFZGdlcywgY2FsY3VsYXRlTm9ybWFsIH0gPSBmYWNldFV0aWxpdGllcyxcbiAgICAgIHsgY2xvbmVUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSwgY2FsY3VsYXRlVmVydGV4VGV4dHVyZUNvb3JkaW5hdGVzVHVwbGUsIGNhbGN1bGF0ZUFkanVzdGVkVGV4dHVyZUNvb3JkaW5hdGVzVHVwbGUgfSA9IHRleHR1cmVVdGlsaXRpZXM7XG5cbmNsYXNzIFRleHR1cmVkRmFjZXQgZXh0ZW5kcyBGYWNldCB7XG4gIGNvbnN0cnVjdG9yKHZlcnRpY2VzLCBub3JtYWwsIGVkZ2VzLCBpbWFnZU5hbWUsIHRleHR1cmVDb29yZGluYXRlc1R1cGxlKSB7XG4gICAgc3VwZXIodmVydGljZXMsIG5vcm1hbCwgZWRnZXMpO1xuXG4gICAgdGhpcy5pbWFnZU5hbWUgPSBpbWFnZU5hbWU7XG5cbiAgICB0aGlzLnRleHR1cmVDb29yZGluYXRlc1R1cGxlID0gdGV4dHVyZUNvb3JkaW5hdGVzVHVwbGU7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICBsZXQgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCksXG4gICAgICAgIG5vcm1hbCA9IHRoaXMuZ2V0Tm9ybWFsKCksXG4gICAgICAgIGVkZ2VzID0gdGhpcy5nZXRFZGdlcygpO1xuXG4gICAgdmVydGljZXMgPSBjbG9uZVZlcnRpY2VzKHZlcnRpY2VzKTtcbiAgICBub3JtYWwgPSBjbG9uZU5vcm1hbChub3JtYWwpO1xuICAgIGVkZ2VzID0gY2xvbmVFZGdlcyhlZGdlcyk7XG5cbiAgICBjb25zdCBpbWFnZU5hbWUgPSB0aGlzLmltYWdlTmFtZSxcbiAgICAgICAgICB0ZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSA9IGNsb25lVGV4dHVyZUNvb3JkaW5hdGVzVHVwbGUodGhpcy50ZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSksXG4gICAgICAgICAgdGV4dHVyZWRGYWNldCA9IG5ldyBUZXh0dXJlZEZhY2V0KHZlcnRpY2VzLCBub3JtYWwsIGVkZ2VzLCBpbWFnZU5hbWUsIHRleHR1cmVDb29yZGluYXRlc1R1cGxlKTtcblxuICAgIHJldHVybiB0ZXh0dXJlZEZhY2V0O1xuICB9XG5cbiAgZ2V0SW1hZ2VOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLmltYWdlTmFtZTtcbiAgfVxuXG4gIGdldFRleHR1cmVDb29yZGluYXRlcygpIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZTtcbiAgfVxuXG4gIGdldFZlcnRleFRleHR1cmVDb29yZGluYXRlc1R1cGxlKGltYWdlTWFwSlNPTikge1xuICAgIGNvbnN0IGpzb24gPSBpbWFnZU1hcEpTT05bdGhpcy5pbWFnZU5hbWVdLFxuICAgICAgICAgIGV4dGVudCA9IGpzb24sICAvLy9cbiAgICAgICAgICB7IGxlZnQsIGJvdHRvbSwgd2lkdGgsIGhlaWdodCB9ID0gZXh0ZW50LFxuICAgICAgICAgIHZlcnRleFRleHR1cmVDb29yZGluYXRlc1R1cGxlID0gY2FsY3VsYXRlVmVydGV4VGV4dHVyZUNvb3JkaW5hdGVzVHVwbGUodGhpcy50ZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSwgbGVmdCwgYm90dG9tLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHJldHVybiB2ZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZTtcbiAgfVxuXG4gIHBlcm11dGUocGxhY2VzKSB7XG4gICAgc3VwZXIucGVybXV0ZShwbGFjZXMpO1xuXG4gICAgdGhpcy50ZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSA9IHBlcm11dGUodGhpcy50ZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSwgcGxhY2VzKTtcbiAgfVxuXG4gIGZyb21WZXJ0aWNlcyh2ZXJ0aWNlcykge1xuICAgIGxldCB0ZXh0dXJlZEZhY2V0ID0gbnVsbDtcblxuICAgIGNvbnN0IGFyZWEgPSBjYWxjdWxhdGVBcmVhKHZlcnRpY2VzKSxcbiAgICAgICAgICBhcmVhQXBwcm94aW1hdGVseUVxdWFsVG9aZXJvID0gaXNBcHByb3hpbWF0ZWx5RXF1YWxUb1plcm8oYXJlYSksXG4gICAgICAgICAgbGFyZ2VFbm91Z2ggPSAhYXJlYUFwcHJveGltYXRlbHlFcXVhbFRvWmVybzsgIC8vL1xuXG4gICAgaWYgKGxhcmdlRW5vdWdoKSB7XG4gICAgICBjb25zdCBub3JtYWwgPSBjYWxjdWxhdGVOb3JtYWwodmVydGljZXMsIE5vcm1hbCksXG4gICAgICAgICAgICBwYXJlbnRWZXJ0aWNlcyA9IHRoaXMudmVydGljZXMsIC8vL1xuICAgICAgICAgICAgYWRqdXN0ZWRUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSA9IGNhbGN1bGF0ZUFkanVzdGVkVGV4dHVyZUNvb3JkaW5hdGVzVHVwbGUodmVydGljZXMsIG5vcm1hbCwgcGFyZW50VmVydGljZXMsIHRoaXMudGV4dHVyZUNvb3JkaW5hdGVzVHVwbGUpLFxuICAgICAgICAgICAgZWRnZXMgPSBjYWxjdWxhdGVFZGdlcyh2ZXJ0aWNlcywgRWRnZSksXG4gICAgICAgICAgICBpbWFnZU5hbWUgPSB0aGlzLmltYWdlTmFtZSxcbiAgICAgICAgICAgIHRleHR1cmVDb29yZGluYXRlc1R1cGxlID0gYWRqdXN0ZWRUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZTsgIC8vL1xuXG4gICAgICB0ZXh0dXJlZEZhY2V0ID0gbmV3IFRleHR1cmVkRmFjZXQodmVydGljZXMsIG5vcm1hbCwgZWRnZXMsIGltYWdlTmFtZSwgdGV4dHVyZUNvb3JkaW5hdGVzVHVwbGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0ZXh0dXJlZEZhY2V0O1xuICB9XG5cbiAgc3RhdGljIGZyb21UZXh0dXJlQ29vcmRpbmF0ZVR1cGxlQ29vcmRpbmF0ZXNUdXBsZXNJbmRleFR1cGxlQW5kSW1hZ2VOYW1lKHRleHR1cmVDb29yZGluYXRlc1R1cGxlLCBjb29yZGluYXRlVHVwbGVzLCBpbmRleFR1cGxlLCBpbWFnZU5hbWUpIHtcbiAgICBsZXQgdGV4dHVyZWRGYWNldCA9IG51bGw7XG5cbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHZlcnRpY2VzRnJvbUNvb3JkaW5hdGVUdXBsZXNBbmRJbmRleFR1cGxlKGNvb3JkaW5hdGVUdXBsZXMsIGluZGV4VHVwbGUsIFZlcnRleCksXG4gICAgICAgICAgYXJlYSA9IGNhbGN1bGF0ZUFyZWEodmVydGljZXMpLFxuICAgICAgICAgIGFyZWFBcHByb3hpbWF0ZWx5RXF1YWxUb1plcm8gPSBpc0FwcHJveGltYXRlbHlFcXVhbFRvWmVybyhhcmVhKSxcbiAgICAgICAgICBsYXJnZUVub3VnaCA9ICFhcmVhQXBwcm94aW1hdGVseUVxdWFsVG9aZXJvOyAgLy8vXG5cbiAgICBpZiAobGFyZ2VFbm91Z2gpIHtcbiAgICAgIGNvbnN0IG5vcm1hbCA9IGNhbGN1bGF0ZU5vcm1hbCh2ZXJ0aWNlcywgTm9ybWFsKSxcbiAgICAgICAgICAgIGVkZ2VzID0gY2FsY3VsYXRlRWRnZXModmVydGljZXMsIEVkZ2UpO1xuXG4gICAgICB0ZXh0dXJlZEZhY2V0ID0gbmV3IFRleHR1cmVkRmFjZXQodmVydGljZXMsIG5vcm1hbCwgZWRnZXMsIGltYWdlTmFtZSwgdGV4dHVyZUNvb3JkaW5hdGVzVHVwbGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0ZXh0dXJlZEZhY2V0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dHVyZWRGYWNldDtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyksXG4gICAgICBNYXNraW5nRWRnZSA9IHJlcXVpcmUoJy4vZWRnZS9tYXNraW5nJyksXG4gICAgICBWZXJ0aWNhbExpbmUgPSByZXF1aXJlKCcuL3ZlcnRpY2FsTGluZScpLFxuICAgICAgYXJyYXlVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvYXJyYXknKSxcbiAgICAgIHZlcnRpY2VzVXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL3ZlcnRpY2VzJyksXG4gICAgICBxdWF0ZXJuaW9uVXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL3F1YXRlcm5pb24nKTtcblxuY29uc3QgeyBWRVJUSUNFU19MRU5HVEggfSA9IGNvbnN0YW50cyxcbiAgICAgIHsgcHVzaCwgc2VwYXJhdGUgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyByb3RhdGVWZXJ0aWNlcyB9ID0gdmVydGljZXNVdGlsaXRpZXMsXG4gICAgICB7IGNhbGN1bGF0ZUFyYml0cmFyeVJvdGF0aW9uUXVhdGVybmlvbiwgY2FsY3VsYXRlRm9yd2FyZHNSb3RhdGlvblF1YXRlcm5pb24sIGNhbGN1bGF0ZUJhY2t3YXJkc1JvdGF0aW9uUXVhdGVybmlvbiB9ID0gcXVhdGVybmlvblV0aWxpdGllcztcblxuY2xhc3MgTWFza2luZ0ZhY2V0IHtcbiAgY29uc3RydWN0b3IobWFza2luZ0VkZ2VzLCB2ZXJ0aWNhbExpbmVzLCBmb3J3YXJkc1JvdGF0aW9uUXVhdGVybmlvbiwgYmFja3dhcmRzUm90YXRpb25RdWF0ZXJuaW9uKSB7XG4gICAgdGhpcy5tYXNraW5nRWRnZXMgPSBtYXNraW5nRWRnZXM7XG4gICAgdGhpcy52ZXJ0aWNhbExpbmVzID0gdmVydGljYWxMaW5lcztcbiAgICB0aGlzLmZvcndhcmRzUm90YXRpb25RdWF0ZXJuaW9uID0gZm9yd2FyZHNSb3RhdGlvblF1YXRlcm5pb247XG4gICAgdGhpcy5iYWNrd2FyZHNSb3RhdGlvblF1YXRlcm5pb24gPSBiYWNrd2FyZHNSb3RhdGlvblF1YXRlcm5pb247XG4gIH1cblxuICBnZXRNYXNraW5nRWRnZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFza2luZ0VkZ2VzO1xuICB9XG5cbiAgZ2V0VmVydGljYWxMaW5lcygpIHtcbiAgICByZXR1cm4gdGhpcy52ZXJ0aWNhbExpbmVzO1xuICB9XG5cbiAgZ2V0Rm9yd2FyZHNSb3RhdGlvblF1YXRlcm5pb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9yd2FyZHNSb3RhdGlvblF1YXRlcm5pb247XG4gIH1cblxuICBnZXRCYWNrd2FyZHNSb3RhdGlvblF1YXRlcm5pb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYmFja3dhcmRzUm90YXRpb25RdWF0ZXJuaW9uO1xuICB9XG5cbiAgbWFza0ZhY2V0KGZhY2V0LCB1bm1hc2tlZEZhY2V0cykge1xuICAgIGNvbnN0IHVubWFza2VkRmFjZXQgPSBmYWNldC5jbG9uZSgpOyAgLy8vXG5cbiAgICBmYWNldC5yb3RhdGUodGhpcy5mb3J3YXJkc1JvdGF0aW9uUXVhdGVybmlvbik7XG5cbiAgICBjb25zdCBtYXNraW5nRmFjZXQgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgc21hbGxlckZhY2V0cyA9IHRoaXMuc3BsaXRGYWNldChmYWNldCksXG4gICAgICAgICAgbWFza2VkU21hbGxlckZhY2V0cyA9IFtdLFxuICAgICAgICAgIHVubWFza2VkU21hbGxlckZhY2V0cyA9IFtdO1xuXG4gICAgc2VwYXJhdGUoc21hbGxlckZhY2V0cywgbWFza2VkU21hbGxlckZhY2V0cywgdW5tYXNrZWRTbWFsbGVyRmFjZXRzLCAoc21hbGxlckZhY2V0KSA9PiB7XG4gICAgICBjb25zdCBzbWFsbGVyRmFjZXRNYXNrZWQgPSBzbWFsbGVyRmFjZXQuaXNNYXNrZWQobWFza2luZ0ZhY2V0KTtcblxuICAgICAgcmV0dXJuIHNtYWxsZXJGYWNldE1hc2tlZDtcbiAgICB9KTtcblxuICAgIGNvbnN0IG1hc2tlZFNtYWxsZXJGYWNldHNMZW5ndGggPSBtYXNrZWRTbWFsbGVyRmFjZXRzLmxlbmd0aDtcblxuICAgIGlmIChtYXNrZWRTbWFsbGVyRmFjZXRzTGVuZ3RoID09PSAwKSB7XG4gICAgICB1bm1hc2tlZEZhY2V0cy5wdXNoKHVubWFza2VkRmFjZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1bm1hc2tlZFNtYWxsZXJGYWNldHMuZm9yRWFjaCgodW5tYXNrZWRTbWFsbGVyRmFjZXQpID0+IHtcbiAgICAgICAgdW5tYXNrZWRTbWFsbGVyRmFjZXQucm90YXRlKHRoaXMuYmFja3dhcmRzUm90YXRpb25RdWF0ZXJuaW9uKTtcbiAgICAgIH0pO1xuXG4gICAgICBwdXNoKHVubWFza2VkRmFjZXRzLCB1bm1hc2tlZFNtYWxsZXJGYWNldHMpO1xuICAgIH1cbiAgfVxuICBcbiAgc3BsaXRGYWNldChmYWNldCkge1xuICAgIGxldCBmYWNldHMgPSBbXG4gICAgICAgICAgZmFjZXRcbiAgICAgICAgXSxcbiAgICAgICAgc21hbGxlckZhY2V0cyA9IGZhY2V0czsgLy8vXG5cbiAgICB0aGlzLnZlcnRpY2FsTGluZXMuZm9yRWFjaCgodmVydGljYWxMaW5lKSA9PiB7XG4gICAgICBzbWFsbGVyRmFjZXRzID0gdmVydGljYWxMaW5lLnNwbGl0RmFjZXRzKGZhY2V0cyk7XG5cbiAgICAgIGZhY2V0cyA9IHNtYWxsZXJGYWNldHM7IC8vL1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNtYWxsZXJGYWNldHM7XG4gIH1cblxuICBzdGF0aWMgZnJvbUZhY2V0KGZhY2V0KSB7XG4gICAgY29uc3QgZmFjZXROb3JtYWwgPSBmYWNldC5nZXROb3JtYWwoKSxcbiAgICAgICAgICBmYWNldFZlcnRpY2VzID0gZmFjZXQuZ2V0VmVydGljZXMoKSxcbiAgICAgICAgICBub3JtYWwgPSBmYWNldE5vcm1hbCwgLy8vXG4gICAgICAgICAgYXJiaXRyYXJ5Um90YXRpb25RdWF0ZXJuaW9uID0gY2FsY3VsYXRlQXJiaXRyYXJ5Um90YXRpb25RdWF0ZXJuaW9uKG5vcm1hbCksXG4gICAgICAgICAgcm90YXRpb25RdWF0ZXJuaW9uID0gYXJiaXRyYXJ5Um90YXRpb25RdWF0ZXJuaW9uLCAvLy9cbiAgICAgICAgICB2ZXJ0aWNlcyA9IHJvdGF0ZVZlcnRpY2VzKGZhY2V0VmVydGljZXMsIHJvdGF0aW9uUXVhdGVybmlvbiksXG4gICAgICAgICAgbWFza2luZ0VkZ2VzID0gY2FsY3VsYXRlTWFza2luZ0VkZ2VzKHZlcnRpY2VzKSxcbiAgICAgICAgICB2ZXJ0aWNhbExpbmVzID0gbWFza2luZ0VkZ2VzLm1hcCgobWFza2luZ0VkZ2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZlcnRpY2FsTGluZSA9IFZlcnRpY2FsTGluZS5mcm9tTWFza2luZ0VkZ2UobWFza2luZ0VkZ2UpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdmVydGljYWxMaW5lO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIGZvcndhcmRzUm90YXRpb25RdWF0ZXJuaW9uID0gY2FsY3VsYXRlRm9yd2FyZHNSb3RhdGlvblF1YXRlcm5pb24ocm90YXRpb25RdWF0ZXJuaW9uKSxcbiAgICAgICAgICBiYWNrd2FyZHNSb3RhdGlvblF1YXRlcm5pb24gPSBjYWxjdWxhdGVCYWNrd2FyZHNSb3RhdGlvblF1YXRlcm5pb24ocm90YXRpb25RdWF0ZXJuaW9uKSxcbiAgICAgICAgICBtYXNraW5nRmFjZXQgPSBuZXcgTWFza2luZ0ZhY2V0KG1hc2tpbmdFZGdlcywgdmVydGljYWxMaW5lcywgZm9yd2FyZHNSb3RhdGlvblF1YXRlcm5pb24sIGJhY2t3YXJkc1JvdGF0aW9uUXVhdGVybmlvbik7XG5cbiAgICByZXR1cm4gbWFza2luZ0ZhY2V0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWFza2luZ0ZhY2V0O1xuXG5mdW5jdGlvbiBjYWxjdWxhdGVNYXNraW5nRWRnZXModmVydGljZXMpIHtcbiAgY29uc3QgbWFza2luZ0VkZ2VzID0gdmVydGljZXMubWFwKCh2ZXJ0ZXgsIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IGluZGV4LFxuICAgICAgICAgICAgICAgIGVuZEluZGV4ID0gKHN0YXJ0SW5kZXggKyAxKSAlIFZFUlRJQ0VTX0xFTkdUSCxcbiAgICAgICAgICAgICAgICBzdGFydFZlcnRleCA9IHZlcnRpY2VzW3N0YXJ0SW5kZXhdLFxuICAgICAgICAgICAgICAgIGVuZFZlcnRleCA9IHZlcnRpY2VzW2VuZEluZGV4XSxcbiAgICAgICAgICAgICAgICBtYXNraW5nRWRnZSA9IE1hc2tpbmdFZGdlLmZyb21TdGFydFZlcnRleEFuZEVuZFZlcnRleChzdGFydFZlcnRleCwgZW5kVmVydGV4KTtcblxuICAgICAgICAgIHJldHVybiBtYXNraW5nRWRnZTtcbiAgICAgICAgfSk7XG5cbiAgcmV0dXJuIG1hc2tpbmdFZGdlcztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdmVjdG9yTWF0aHMgPSByZXF1aXJlKCcuLi9tYXRocy92ZWN0b3InKSxcbiAgICAgIGFycmF5VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL2FycmF5Jyk7XG5cbmNvbnN0IHsgZmlyc3QsIHNlY29uZCwgdGhpcmQgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBub3JtYWxpc2UzLCBzdWJ0cmFjdDMsIGNyb3NzMyB9ID0gdmVjdG9yTWF0aHM7XG5cbmNsYXNzIE5vcm1hbCB7XG4gIGNvbnN0cnVjdG9yKGV4dGVudCkge1xuICAgIHRoaXMuZXh0ZW50ID0gZXh0ZW50O1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgY29uc3QgZXh0ZW50ID0gY2xvbmVFeHRlbnQodGhpcy5leHRlbnQpLFxuICAgICAgICAgIG5vcm1hbCA9IG5ldyBOb3JtYWwoZXh0ZW50KTtcblxuICAgIHJldHVybiBub3JtYWw7XG4gIH1cblxuICBnZXRFeHRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXh0ZW50O1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVZlcnRpY2VzKHZlcnRpY2VzKSB7XG4gICAgY29uc3QgZmlyc3RWZXJ0ZXggPSBmaXJzdCh2ZXJ0aWNlcyksXG4gICAgICAgICAgc2Vjb25kVmVydGV4ID0gc2Vjb25kKHZlcnRpY2VzKSxcbiAgICAgICAgICB0aGlyZFZlcnRleCA9IHRoaXJkKHZlcnRpY2VzKSxcbiAgICAgICAgICBmaXJzdFBvc2l0aW9uID0gZmlyc3RWZXJ0ZXguZ2V0UG9zaXRpb24oKSxcbiAgICAgICAgICBzZWNvbmRQb3NpdGlvbiA9IHNlY29uZFZlcnRleC5nZXRQb3NpdGlvbigpLFxuICAgICAgICAgIHRoaXJkUG9zaXRpb24gPSB0aGlyZFZlcnRleC5nZXRQb3NpdGlvbigpLFxuICAgICAgICAgIGZpcnN0RXh0ZW50ID0gc3VidHJhY3QzKHNlY29uZFBvc2l0aW9uLCBmaXJzdFBvc2l0aW9uKSxcbiAgICAgICAgICBzZWNvbmRFeHRlbnQgPSBzdWJ0cmFjdDModGhpcmRQb3NpdGlvbiwgZmlyc3RQb3NpdGlvbiksXG4gICAgICAgICAgZXh0ZW50ID0gbm9ybWFsaXNlMyhjcm9zczMoZmlyc3RFeHRlbnQsIHNlY29uZEV4dGVudCkpLFxuICAgICAgICAgIG5vcm1hbCA9IG5ldyBOb3JtYWwoZXh0ZW50KTtcblxuICAgIHJldHVybiBub3JtYWw7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb3JtYWw7XG5cbmZ1bmN0aW9uIGNsb25lRXh0ZW50KGV4dGVudCkgeyByZXR1cm4gZXh0ZW50LnNsaWNlKCk7IH1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgcm90YXRpb25VdGlsaXRpZXMgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvcm90YXRpb24nKTtcblxuY29uc3QgeyByb3RhdGVQb3NpdGlvbiB9ID0gcm90YXRpb25VdGlsaXRpZXM7XG5cbmNsYXNzIFZlcnRleCB7XG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uKSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb247XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uc2xpY2UoKSwgLy8vXG4gICAgICAgICAgdmVydGV4ID0gbmV3IFZlcnRleChwb3NpdGlvbik7XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgcm90YXRlKHJvdGF0aW9uUXVhdGVybmlvbikge1xuICAgIHRoaXMucG9zaXRpb24gPSByb3RhdGVQb3NpdGlvbih0aGlzLnBvc2l0aW9uLCByb3RhdGlvblF1YXRlcm5pb24pO1xuICB9XG5cbiAgYXBwbHlUcmFuc2Zvcm0odHJhbnNmb3JtKSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHRyYW5zZm9ybSh0aGlzLnBvc2l0aW9uKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICBjb25zdCB2ZXJ0ZXggPSBuZXcgVmVydGV4KHBvc2l0aW9uKTtcbiAgICBcbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbUNvb3JkaW5hdGVUdXBsZShjb29yZGluYXRlVHVwbGUpIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IGNvb3JkaW5hdGVUdXBsZS5zbGljZSgpLCAvLy9cbiAgICAgICAgICB2ZXJ0ZXggPSBuZXcgVmVydGV4KHBvc2l0aW9uKTtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBWZXJ0ZXg7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFycmF5VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL2FycmF5JyksXG4gICAgICByb3RhdGlvblV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9yb3RhdGlvbicpLFxuICAgICAgcXVhdGVybmlvblV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9xdWF0ZXJuaW9uJyksXG4gICAgICBpbnRlcnNlY3Rpb25VdGlsaXRpZXMgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvaW50ZXJzZWN0aW9uJyk7XG5cbmNvbnN0IHsgZmlyc3QgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyByb3RhdGVQb3NpdGlvbiB9ID0gcm90YXRpb25VdGlsaXRpZXMsXG4gICAgICB7IGNhbGN1bGF0ZUludGVyc2VjdGlvbiB9ID0gaW50ZXJzZWN0aW9uVXRpbGl0aWVzLFxuICAgICAgeyBjYWxjdWxhdGVSb3RhdGlvbkFib3V0WkF4aXNRdWF0ZXJuaW9uLCBjYWxjdWxhdGVGb3J3YXJkc1JvdGF0aW9uUXVhdGVybmlvbiwgY2FsY3VsYXRlQmFja3dhcmRzUm90YXRpb25RdWF0ZXJuaW9uIH0gPSBxdWF0ZXJuaW9uVXRpbGl0aWVzO1xuXG5jbGFzcyBWZXJ0aWNhbExpbmUge1xuICBjb25zdHJ1Y3RvcihmaXJzdFBvc2l0aW9uQ29tcG9uZW50LCBmb3J3YXJkc1JvdGF0aW9uUXVhdGVybmlvbiwgYmFja3dhcmRzUm90YXRpb25RdWF0ZXJuaW9uKSB7XG4gICAgdGhpcy5maXJzdFBvc2l0aW9uQ29tcG9uZW50ID0gZmlyc3RQb3NpdGlvbkNvbXBvbmVudDtcbiAgICB0aGlzLmZvcndhcmRzUm90YXRpb25RdWF0ZXJuaW9uID0gZm9yd2FyZHNSb3RhdGlvblF1YXRlcm5pb247XG4gICAgdGhpcy5iYWNrd2FyZHNSb3RhdGlvblF1YXRlcm5pb24gPSBiYWNrd2FyZHNSb3RhdGlvblF1YXRlcm5pb247XG4gIH1cblxuICBnZXRGaXJzdFBvc2l0aW9uQ29tcG9uZW50KCkge1xuICAgIHJldHVybiB0aGlzLmZpcnN0UG9zaXRpb25Db21wb25lbnQ7XG4gIH1cbiAgXG4gIGdldEZvcndhcmRzUm90YXRpb25RdWF0ZXJuaW9uKCkge1xuICAgIHJldHVybiB0aGlzLmZvcndhcmRzUm90YXRpb25RdWF0ZXJuaW9uO1xuICB9XG5cbiAgZ2V0QmFja3dhcmRzUm90YXRpb25RdWF0ZXJuaW9uKCkge1xuICAgIHJldHVybiB0aGlzLmJhY2t3YXJkc1JvdGF0aW9uUXVhdGVybmlvbjtcbiAgfVxuXG4gIHNwbGl0RmFjZXQoZmFjZXQsIHNtYWxsZXJGYWNldHMpIHtcbiAgICBjb25zdCBlZGdlcyA9IGZhY2V0LmdldEVkZ2VzKCksXG4gICAgICAgICAgaW50ZXJzZWN0aW9ucyA9IGVkZ2VzLm1hcCgoZWRnZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW50ZXJzZWN0aW9uID0gY2FsY3VsYXRlSW50ZXJzZWN0aW9uKGVkZ2UsIHRoaXMuZmlyc3RQb3NpdGlvbkNvbXBvbmVudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBpbnRlcnNlY3Rpb247XG4gICAgICAgICAgfSk7XG5cbiAgICBmYWNldC5zcGxpdFdpdGhJbnRlcnNlY3Rpb25zKGludGVyc2VjdGlvbnMsIHNtYWxsZXJGYWNldHMpO1xuICB9XG5cbiAgc3BsaXRGYWNldHMoZmFjZXRzKSB7XG4gICAgY29uc3Qgc21hbGxlckZhY2V0cyA9IFtdO1xuXG4gICAgZmFjZXRzLmZvckVhY2goKGZhY2V0KSA9PiB7XG4gICAgICBmYWNldC5yb3RhdGUodGhpcy5mb3J3YXJkc1JvdGF0aW9uUXVhdGVybmlvbik7XG5cbiAgICAgIHRoaXMuc3BsaXRGYWNldChmYWNldCwgc21hbGxlckZhY2V0cyk7XG4gICAgfSk7XG5cbiAgICBzbWFsbGVyRmFjZXRzLmZvckVhY2goKHNtYWxsZXJGYWNldCkgPT4gc21hbGxlckZhY2V0LnJvdGF0ZSh0aGlzLmJhY2t3YXJkc1JvdGF0aW9uUXVhdGVybmlvbikpO1xuXG4gICAgcmV0dXJuIHNtYWxsZXJGYWNldHM7XG4gIH1cblxuICBzdGF0aWMgZnJvbU1hc2tpbmdFZGdlKG1hc2tpbmdFZGdlKSB7XG4gICAgY29uc3QgbWFza2luZ0VkZ2VQb3NpdGlvbiA9IG1hc2tpbmdFZGdlLmdldFBvc2l0aW9uKCksXG4gICAgICAgICAgcm90YXRpb25BYm91dFpBeGlzUXVhdGVybmlvbiA9IGNhbGN1bGF0ZVJvdGF0aW9uQWJvdXRaQXhpc1F1YXRlcm5pb24obWFza2luZ0VkZ2UpLFxuICAgICAgICAgIHJvdGF0aW9uUXVhdGVybmlvbiA9IHJvdGF0aW9uQWJvdXRaQXhpc1F1YXRlcm5pb24sICAvLy9cbiAgICAgICAgICBmb3J3YXJkc1JvdGF0aW9uUXVhdGVybmlvbiA9IGNhbGN1bGF0ZUZvcndhcmRzUm90YXRpb25RdWF0ZXJuaW9uKHJvdGF0aW9uUXVhdGVybmlvbiksXG4gICAgICAgICAgYmFja3dhcmRzUm90YXRpb25RdWF0ZXJuaW9uID0gY2FsY3VsYXRlQmFja3dhcmRzUm90YXRpb25RdWF0ZXJuaW9uKHJvdGF0aW9uUXVhdGVybmlvbiksXG4gICAgICAgICAgcG9zaXRpb24gPSByb3RhdGVQb3NpdGlvbihtYXNraW5nRWRnZVBvc2l0aW9uLCByb3RhdGlvblF1YXRlcm5pb24pLFxuICAgICAgICAgIHBvc2l0aW9uQ29tcG9uZW50cyA9IHBvc2l0aW9uLCAvLy9cbiAgICAgICAgICBmaXJzdFBvc2l0aW9uQ29tcG9uZW50ID0gZmlyc3QocG9zaXRpb25Db21wb25lbnRzKSxcbiAgICAgICAgICB2ZXJ0aWNhbExpbmUgPSBuZXcgVmVydGljYWxMaW5lKGZpcnN0UG9zaXRpb25Db21wb25lbnQsIGZvcndhcmRzUm90YXRpb25RdWF0ZXJuaW9uLCBiYWNrd2FyZHNSb3RhdGlvblF1YXRlcm5pb24pO1xuXG4gICAgcmV0dXJuIHZlcnRpY2FsTGluZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZlcnRpY2FsTGluZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4vZWxlbWVudCcpLFxuICAgICAgQ2FudmFzRWxlbWVudCA9IHJlcXVpcmUoJy4vZWxlbWVudC9jYW52YXMnKSxcbiAgICAgIGFycmF5VXRpbGl0aWVzID0gcmVxdWlyZSgnLi91dGlsaXRpZXMvYXJyYXknKSxcbiAgICAgIEZ1bmN0aW9uQ2FudmFzRWxlbWVudCA9IHJlcXVpcmUoJy4vZWxlbWVudC9jYW52YXMvZnVuY3Rpb24nKTtcblxuY29uc3QgeyBndWFyYW50ZWUgfSA9IGFycmF5VXRpbGl0aWVzO1xuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KGZpcnN0QXJndW1lbnQsIHByb3BlcnRpZXMsIC4uLmNoaWxkRWxlbWVudHMpIHtcbiAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwge307ICAvLy9cblxuICBsZXQgZWxlbWVudDtcblxuICBpZiAoZmlyc3RBcmd1bWVudCBpbnN0YW5jZW9mIENhbnZhc0VsZW1lbnQpIHtcbiAgICBlbGVtZW50ID0gZmlyc3RBcmd1bWVudDsgIC8vL1xuICB9IGVsc2UgaWYgKGlzU3ViY2xhc3NPZihmaXJzdEFyZ3VtZW50LCBFbGVtZW50KSkge1xuICAgIGNvbnN0IENsYXNzID0gZmlyc3RBcmd1bWVudDsgIC8vL1xuXG4gICAgT2JqZWN0LmFzc2lnbihwcm9wZXJ0aWVzLCB7XG4gICAgICBjaGlsZEVsZW1lbnRzXG4gICAgfSk7XG5cbiAgICBlbGVtZW50ID0gQ2xhc3MuZnJvbVByb3BlcnRpZXMocHJvcGVydGllcyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGZpcnN0QXJndW1lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCBmdW5jID0gZmlyc3RBcmd1bWVudCwgIC8vL1xuICAgICAgICAgIGNoaWxkRWxlbWVudHMgPSBndWFyYW50ZWUoZnVuYyhwcm9wZXJ0aWVzKSk7XG5cbiAgICBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIHtcbiAgICAgIGNoaWxkRWxlbWVudHNcbiAgICB9KTtcblxuICAgIGVsZW1lbnQgPSBGdW5jdGlvbkNhbnZhc0VsZW1lbnQuZnJvbVByb3BlcnRpZXMocHJvcGVydGllcyk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuY29uc3QgUmVhY3QgPSB7XG4gIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XG5cbmZ1bmN0aW9uIGlzU3ViY2xhc3NPZihhcmd1bWVudCwgQ2xhc3MpIHtcbiAgbGV0IHR5cGVPZiA9IGZhbHNlO1xuXG4gIGlmIChhcmd1bWVudC5uYW1lID09PSBDbGFzcy5uYW1lKSB7IC8vL1xuICAgIHR5cGVPZiA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgYXJndW1lbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYXJndW1lbnQpOyAvLy9cblxuICAgIGlmIChhcmd1bWVudCkge1xuICAgICAgdHlwZU9mID0gaXNTdWJjbGFzc09mKGFyZ3VtZW50LCBDbGFzcyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHR5cGVPZjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgUmVuZGVyZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9ncmFtLCByZW5kZXJlckRhdGEsIHJlbmRlcmVyQnVmZmVycywgdW5pZm9ybUxvY2F0aW9ucywgYXR0cmlidXRlTG9jYXRpb25zKSB7XG4gICAgdGhpcy5wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICB0aGlzLnJlbmRlcmVyRGF0YSA9IHJlbmRlcmVyRGF0YTtcbiAgICB0aGlzLnJlbmRlcmVyQnVmZmVycyA9IHJlbmRlcmVyQnVmZmVycztcbiAgICB0aGlzLnVuaWZvcm1Mb2NhdGlvbnMgPSB1bmlmb3JtTG9jYXRpb25zO1xuICAgIHRoaXMuYXR0cmlidXRlTG9jYXRpb25zID0gYXR0cmlidXRlTG9jYXRpb25zO1xuICB9XG5cbiAgZ2V0UHJvZ3JhbSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9ncmFtO1xuICB9XG4gIFxuICBnZXRSZW5kZXJlckRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZXJEYXRhO1xuICB9XG4gIFxuICBnZXRSZW5kZXJlckJ1ZmZlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZXJCdWZmZXJzO1xuICB9XG5cbiAgZ2V0VW5pZm9ybUxvY2F0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy51bmlmb3JtTG9jYXRpb25zO1xuICB9XG5cbiAgZ2V0QXR0cmlidXRlTG9jYXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZUxvY2F0aW9ucztcbiAgfVxuXG4gIGdldENvdW50KCkgeyByZXR1cm4gdGhpcy5yZW5kZXJlckRhdGEuZ2V0Q291bnQoKTsgfVxuXG4gIGdldE9mZnNldE1hdHJpeFVuaWZvcm1Mb2NhdGlvbigpIHsgcmV0dXJuIHRoaXMudW5pZm9ybUxvY2F0aW9ucy5nZXRPZmZzZXRNYXRyaXhVbmlmb3JtTG9jYXRpb24oKTsgfVxuXG4gIGdldFJvdGF0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uKCkgeyByZXR1cm4gdGhpcy51bmlmb3JtTG9jYXRpb25zLmdldFJvdGF0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uKCk7IH1cblxuICBnZXRQb3NpdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbigpIHsgcmV0dXJuIHRoaXMudW5pZm9ybUxvY2F0aW9ucy5nZXRQb3NpdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbigpOyB9XG5cbiAgZ2V0UHJvamVjdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbigpIHsgcmV0dXJuIHRoaXMudW5pZm9ybUxvY2F0aW9ucy5nZXRQcm9qZWN0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uKCk7IH1cblxuICBnZXROb3JtYWxNYXRyaXhVbmlmb3JtTG9jYXRpb24oKSB7IHJldHVybiB0aGlzLnVuaWZvcm1Mb2NhdGlvbnMuZ2V0Tm9ybWFsTWF0cml4VW5pZm9ybUxvY2F0aW9uKCk7IH1cblxuICBnZXRWZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uKCkgeyByZXR1cm4gdGhpcy5hdHRyaWJ1dGVMb2NhdGlvbnMuZ2V0VmVydGV4UG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbigpOyB9XG5cbiAgZ2V0VmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb24oKSB7IHJldHVybiB0aGlzLmF0dHJpYnV0ZUxvY2F0aW9ucy5nZXRWZXJ0ZXhOb3JtYWxBdHRyaWJ1dGVMb2NhdGlvbigpOyB9XG5cbiAgYWRkVmVydGV4UG9zaXRpb25zKHZlcnRleFBvc2l0aW9ucykgeyB0aGlzLnJlbmRlcmVyRGF0YS5hZGRWZXJ0ZXhQb3NpdGlvbnModmVydGV4UG9zaXRpb25zKTsgfVxuXG4gIGFkZFZlcnRleE5vcm1hbHModmVydGV4Tm9ybWFscykgeyB0aGlzLnJlbmRlcmVyRGF0YS5hZGRWZXJ0ZXhOb3JtYWxzKHZlcnRleE5vcm1hbHMpOyB9XG5cbiAgYWRkVmVydGV4SW5kZXhlcyh2ZXJ0ZXhJbmRleGVzKSB7IHRoaXMucmVuZGVyZXJEYXRhLmFkZFZlcnRleEluZGV4ZXModmVydGV4SW5kZXhlcyk7IH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvZ3JhbSh2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlLCBjYW52YXMpIHtcbiAgY29uc3QgdmVydGV4U2hhZGVyID0gY2FudmFzLmNyZWF0ZVZlcnRleFNoYWRlcih2ZXJ0ZXhTaGFkZXJTb3VyY2UpLFxuICAgICAgICBmcmFnbWVudFNoYWRlciA9IGNhbnZhcy5jcmVhdGVGcmFnbWVudFNoYWRlcihmcmFnbWVudFNoYWRlclNvdXJjZSksXG4gICAgICAgIHByb2dyYW0gPSBjYW52YXMuY3JlYXRlUHJvZ3JhbSh2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKTtcbiAgXG4gIHJldHVybiBwcm9ncmFtO1xufVxuXG5PYmplY3QuYXNzaWduKFJlbmRlcmVyLCB7XG4gIGNyZWF0ZVByb2dyYW1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlcmVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB2ZXJ0ZXhOb3JtYWxDb21wb25lbnRzID0gMyxcbiAgICAgIHZlcnRleFBvc2l0aW9uQ29tcG9uZW50cyA9IDM7XG5cbmNsYXNzIFJlbmRlcmVyQnVmZmVycyB7XG4gIGNvbnN0cnVjdG9yKHZlcnRleFBvc2l0aW9uc0J1ZmZlciwgdmVydGV4Tm9ybWFsc0J1ZmZlciwgdmVydGV4SW5kZXhlc0VsZW1lbnRCdWZmZXIpIHtcbiAgICB0aGlzLnZlcnRleFBvc2l0aW9uc0J1ZmZlciA9IHZlcnRleFBvc2l0aW9uc0J1ZmZlcjtcbiAgICB0aGlzLnZlcnRleE5vcm1hbHNCdWZmZXIgPSB2ZXJ0ZXhOb3JtYWxzQnVmZmVyO1xuICAgIHRoaXMudmVydGV4SW5kZXhlc0VsZW1lbnRCdWZmZXIgPSB2ZXJ0ZXhJbmRleGVzRWxlbWVudEJ1ZmZlcjtcbiAgfVxuXG4gIGNyZWF0ZVZlcnRleFBvc2l0aW9uc0J1ZmZlcih2ZXJ0ZXhQb3NpdGlvbnNEYXRhLCBjYW52YXMpIHtcbiAgICB0aGlzLnZlcnRleFBvc2l0aW9uc0J1ZmZlciA9IGNhbnZhcy5jcmVhdGVCdWZmZXIodmVydGV4UG9zaXRpb25zRGF0YSk7XG4gIH1cblxuICBjcmVhdGVWZXJ0ZXhOb3JtYWxzQnVmZmVyKHZlcnRleE5vcm1hbHNEYXRhLCBjYW52YXMpIHtcbiAgICB0aGlzLnZlcnRleE5vcm1hbHNCdWZmZXIgPSBjYW52YXMuY3JlYXRlQnVmZmVyKHZlcnRleE5vcm1hbHNEYXRhKTtcbiAgfVxuXG4gIGNyZWF0ZVZlcnRleEluZGV4ZXNFbGVtZW50QnVmZmVyKHZlcnRleEluZGV4ZXNEYXRhLCBjYW52YXMpIHtcbiAgICB0aGlzLnZlcnRleEluZGV4ZXNFbGVtZW50QnVmZmVyID0gY2FudmFzLmNyZWF0ZUVsZW1lbnRCdWZmZXIodmVydGV4SW5kZXhlc0RhdGEpO1xuICB9XG5cbiAgYmluZFZlcnRleE5vcm1hbHNCdWZmZXIodmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb24sIGNhbnZhcykge1xuICAgIGNhbnZhcy5iaW5kQnVmZmVyKHRoaXMudmVydGV4Tm9ybWFsc0J1ZmZlciwgdmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb24sIHZlcnRleE5vcm1hbENvbXBvbmVudHMpO1xuICB9XG5cbiAgYmluZFZlcnRleFBvc2l0aW9uc0J1ZmZlcih2ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uLCBjYW52YXMpIHtcbiAgICBjYW52YXMuYmluZEJ1ZmZlcih0aGlzLnZlcnRleFBvc2l0aW9uc0J1ZmZlciwgdmVydGV4UG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiwgdmVydGV4UG9zaXRpb25Db21wb25lbnRzKTtcbiAgfVxuXG4gIGJpbmRWZXJ0ZXhJbmRleGVzRWxlbWVudEJ1ZmZlcihjYW52YXMpIHtcbiAgICBjYW52YXMuYmluZEVsZW1lbnRCdWZmZXIodGhpcy52ZXJ0ZXhJbmRleGVzRWxlbWVudEJ1ZmZlcik7XG4gIH1cblxuICBjcmVhdGVCdWZmZXJzKHZlcnRleFBvc2l0aW9uc0RhdGEsIHZlcnRleE5vcm1hbHNEYXRhLCB2ZXJ0ZXhJbmRleGVzRGF0YSwgY2FudmFzKSB7XG4gICAgdGhpcy5jcmVhdGVWZXJ0ZXhQb3NpdGlvbnNCdWZmZXIodmVydGV4UG9zaXRpb25zRGF0YSwgY2FudmFzKTtcbiAgICB0aGlzLmNyZWF0ZVZlcnRleE5vcm1hbHNCdWZmZXIodmVydGV4Tm9ybWFsc0RhdGEsIGNhbnZhcyk7XG4gICAgdGhpcy5jcmVhdGVWZXJ0ZXhJbmRleGVzRWxlbWVudEJ1ZmZlcih2ZXJ0ZXhJbmRleGVzRGF0YSwgY2FudmFzKTtcbiAgfVxuXG4gIGJpbmRCdWZmZXJzKHZlcnRleE5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uLCB2ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uLCBjYW52YXMpIHtcbiAgICB0aGlzLmJpbmRWZXJ0ZXhOb3JtYWxzQnVmZmVyKHZlcnRleE5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uLCBjYW52YXMpO1xuICAgIHRoaXMuYmluZFZlcnRleFBvc2l0aW9uc0J1ZmZlcih2ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uLCBjYW52YXMpO1xuICAgIHRoaXMuYmluZFZlcnRleEluZGV4ZXNFbGVtZW50QnVmZmVyKGNhbnZhcyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoQ2xhc3MsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IHZlcnRleFBvc2l0aW9uc0J1ZmZlciA9IG51bGwsIC8vL1xuICAgICAgICAgIHZlcnRleE5vcm1hbHNCdWZmZXIgPSBudWxsLCAvLy9cbiAgICAgICAgICB2ZXJ0ZXhJbmRleGVzRWxlbWVudEJ1ZmZlciA9IG51bGwsICAvLy9cbiAgICAgICAgICByZW5kZXJlckJ1ZmZlcnMgPSBuZXcgQ2xhc3ModmVydGV4UG9zaXRpb25zQnVmZmVyLCB2ZXJ0ZXhOb3JtYWxzQnVmZmVyLCB2ZXJ0ZXhJbmRleGVzRWxlbWVudEJ1ZmZlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcblxuICAgIHJldHVybiByZW5kZXJlckJ1ZmZlcnM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZW5kZXJlckJ1ZmZlcnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFJlbmRlcmVyQnVmZmVycyA9IHJlcXVpcmUoJy4uLy4uL3JlbmRlcmVyL2J1ZmZlcnMnKTtcblxuY29uc3QgdmVydGV4Q29sb3VyQ29tcG9uZW50cyA9IDQ7XG5cbmNsYXNzIENvbG91clJlbmRlcmVyQnVmZmVycyBleHRlbmRzIFJlbmRlcmVyQnVmZmVycyB7XG4gIGNvbnN0cnVjdG9yKHZlcnRleFBvc2l0aW9uc0J1ZmZlciwgdmVydGV4Tm9ybWFsc0J1ZmZlciwgdmVydGV4SW5kZXhlc0VsZW1lbnRCdWZmZXIsIHZlcnRleENvbG91cnNCdWZmZXIpIHtcbiAgICBzdXBlcih2ZXJ0ZXhQb3NpdGlvbnNCdWZmZXIsIHZlcnRleE5vcm1hbHNCdWZmZXIsIHZlcnRleEluZGV4ZXNFbGVtZW50QnVmZmVyKTtcblxuICAgIHRoaXMudmVydGV4Q29sb3Vyc0J1ZmZlciA9IHZlcnRleENvbG91cnNCdWZmZXI7XG4gIH1cblxuICBnZXRWZXJ0ZXhDb2xvdXJzQnVmZmVyKCkge1xuICAgIHJldHVybiB0aGlzLnZlcnRleENvbG91cnNCdWZmZXI7XG4gIH1cblxuICBjcmVhdGVWZXJ0ZXhDb2xvdXJzQnVmZmVyKHZlcnRleENvbG91cnNEYXRhLCBjYW52YXMpIHtcbiAgICB0aGlzLnZlcnRleENvbG91cnNCdWZmZXIgPSBjYW52YXMuY3JlYXRlQnVmZmVyKHZlcnRleENvbG91cnNEYXRhKTtcbiAgfVxuXG4gIGJpbmRWZXJ0ZXhDb2xvdXJzQnVmZmVyKHZlcnRleENvbG91ckF0dHJpYnV0ZUxvY2F0aW9uLCBjYW52YXMpIHtcbiAgICBjYW52YXMuYmluZEJ1ZmZlcih0aGlzLnZlcnRleENvbG91cnNCdWZmZXIsIHZlcnRleENvbG91ckF0dHJpYnV0ZUxvY2F0aW9uLCB2ZXJ0ZXhDb2xvdXJDb21wb25lbnRzKTtcbiAgfVxuXG4gIGNyZWF0ZUJ1ZmZlcnModmVydGV4UG9zaXRpb25zRGF0YSwgdmVydGV4Tm9ybWFsc0RhdGEsIHZlcnRleEluZGV4ZXNEYXRhLCB2ZXJ0ZXhDb2xvdXJzRGF0YSwgY2FudmFzKSB7XG4gICAgc3VwZXIuY3JlYXRlQnVmZmVycyh2ZXJ0ZXhQb3NpdGlvbnNEYXRhLCB2ZXJ0ZXhOb3JtYWxzRGF0YSwgdmVydGV4SW5kZXhlc0RhdGEsIGNhbnZhcyk7XG5cbiAgICB0aGlzLmNyZWF0ZVZlcnRleENvbG91cnNCdWZmZXIodmVydGV4Q29sb3Vyc0RhdGEsIGNhbnZhcyk7XG4gIH1cblxuICBiaW5kQnVmZmVycyh2ZXJ0ZXhOb3JtYWxBdHRyaWJ1dGVMb2NhdGlvbiwgdmVydGV4UG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiwgdmVydGV4Q29sb3VyQXR0cmlidXRlTG9jYXRpb24sIGNhbnZhcykge1xuICAgIHN1cGVyLmJpbmRCdWZmZXJzKHZlcnRleE5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uLCB2ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uLCBjYW52YXMpO1xuXG4gICAgdGhpcy5iaW5kVmVydGV4Q29sb3Vyc0J1ZmZlcih2ZXJ0ZXhDb2xvdXJBdHRyaWJ1dGVMb2NhdGlvbiwgY2FudmFzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhDb2xvdXJzQnVmZmVyID0gbnVsbCwgLy8vXG4gICAgICAgICAgY29sb3VyUmVuZGVyZXJCdWZmZXJzID0gUmVuZGVyZXJCdWZmZXJzLmZyb21Ob3RoaW5nKENvbG91clJlbmRlcmVyQnVmZmVycywgdmVydGV4Q29sb3Vyc0J1ZmZlcik7XG4gICAgXG4gICAgcmV0dXJuIGNvbG91clJlbmRlcmVyQnVmZmVycztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbG91clJlbmRlcmVyQnVmZmVycztcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgUmVuZGVyZXJCdWZmZXJzID0gcmVxdWlyZSgnLi4vLi4vcmVuZGVyZXIvYnVmZmVycycpO1xuXG5jb25zdCB0ZXh0dXJlQ29vcmRpbmF0ZUNvbXBvbmVudHMgPSAyO1xuXG5jbGFzcyBUZXh0dXJlUmVuZGVyZXJCdWZmZXJzIGV4dGVuZHMgUmVuZGVyZXJCdWZmZXJzIHtcbiAgY29uc3RydWN0b3IodmVydGV4UG9zaXRpb25zQnVmZmVyLCB2ZXJ0ZXhOb3JtYWxzQnVmZmVyLCB2ZXJ0ZXhJbmRleGVzRWxlbWVudEJ1ZmZlciwgdGV4dHVyZUNvb3JkaW5hdGVzQnVmZmVyKSB7XG4gICAgc3VwZXIodmVydGV4UG9zaXRpb25zQnVmZmVyLCB2ZXJ0ZXhOb3JtYWxzQnVmZmVyLCB2ZXJ0ZXhJbmRleGVzRWxlbWVudEJ1ZmZlcik7XG4gICAgXG4gICAgdGhpcy50ZXh0dXJlQ29vcmRpbmF0ZXNCdWZmZXIgPSB0ZXh0dXJlQ29vcmRpbmF0ZXNCdWZmZXI7XG4gIH1cbiAgXG4gIGdldFRleHR1cmVDb29yZGluYXRlc0J1ZmZlcigpIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0dXJlQ29vcmRpbmF0ZXNCdWZmZXI7XG4gIH1cbiAgXG4gIGNyZWF0ZVRleHR1cmVDb29yZGluYXRlc0J1ZmZlcih0ZXh0dXJlQ29vcmRpbmF0ZXNEYXRhLCBjYW52YXMpIHtcbiAgICB0aGlzLnRleHR1cmVDb29yZGluYXRlc0J1ZmZlciA9IGNhbnZhcy5jcmVhdGVCdWZmZXIodGV4dHVyZUNvb3JkaW5hdGVzRGF0YSk7XG4gIH1cbiAgXG4gIGJpbmRUZXh0dXJlQ29vcmRpbmF0ZXNCdWZmZXIodGV4dHVyZUNvb3JkaW5hdGVBdHRyaWJ1dGVMb2NhdGlvbiwgY2FudmFzKSB7XG4gICAgY2FudmFzLmJpbmRCdWZmZXIodGhpcy50ZXh0dXJlQ29vcmRpbmF0ZXNCdWZmZXIsIHRleHR1cmVDb29yZGluYXRlQXR0cmlidXRlTG9jYXRpb24sIHRleHR1cmVDb29yZGluYXRlQ29tcG9uZW50cyk7XG4gIH1cblxuICBjcmVhdGVCdWZmZXJzKHZlcnRleFBvc2l0aW9uc0RhdGEsIHZlcnRleE5vcm1hbHNEYXRhLCB2ZXJ0ZXhJbmRleGVzRGF0YSwgdGV4dHVyZUNvb3JkaW5hdGVzRGF0YSwgY2FudmFzKSB7XG4gICAgc3VwZXIuY3JlYXRlQnVmZmVycyh2ZXJ0ZXhQb3NpdGlvbnNEYXRhLCB2ZXJ0ZXhOb3JtYWxzRGF0YSwgdmVydGV4SW5kZXhlc0RhdGEsIGNhbnZhcyk7XG5cbiAgICB0aGlzLmNyZWF0ZVRleHR1cmVDb29yZGluYXRlc0J1ZmZlcih0ZXh0dXJlQ29vcmRpbmF0ZXNEYXRhLCBjYW52YXMpO1xuICB9XG5cbiAgYmluZEJ1ZmZlcnModmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb24sIHZlcnRleFBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIHRleHR1cmVDb29yZGluYXRlQXR0cmlidXRlTG9jYXRpb24sIGNhbnZhcykge1xuICAgIHN1cGVyLmJpbmRCdWZmZXJzKHZlcnRleE5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uLCB2ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uLCBjYW52YXMpO1xuXG4gICAgdGhpcy5iaW5kVGV4dHVyZUNvb3JkaW5hdGVzQnVmZmVyKHRleHR1cmVDb29yZGluYXRlQXR0cmlidXRlTG9jYXRpb24sIGNhbnZhcyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgdGV4dHVyZUNvb3JkaW5hdGVzQnVmZmVyID0gbnVsbCwgIC8vL1xuICAgICAgICAgIHRleHR1cmVSZW5kZXJlckJ1ZmZlcnMgPSBSZW5kZXJlckJ1ZmZlcnMuZnJvbU5vdGhpbmcoVGV4dHVyZVJlbmRlcmVyQnVmZmVycywgdGV4dHVyZUNvb3JkaW5hdGVzQnVmZmVyKTtcbiAgICBcbiAgICByZXR1cm4gdGV4dHVyZVJlbmRlcmVyQnVmZmVycztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHR1cmVSZW5kZXJlckJ1ZmZlcnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFJlbmRlcmVyID0gcmVxdWlyZSgnLi4vcmVuZGVyZXInKSxcbiAgICAgIENvbG91clJlbmRlcmVyRGF0YSA9IHJlcXVpcmUoJy4uL3JlbmRlcmVyL2RhdGEvY29sb3VyJyksXG4gICAgICB2ZXJ0ZXhTaGFkZXJTb3VyY2UgPSByZXF1aXJlKCcuL3NvdXJjZS9jb2xvdXIvdmVydGV4U2hhZGVyJyksXG4gICAgICBmcmFnbWVudFNoYWRlclNvdXJjZSA9IHJlcXVpcmUoJy4vc291cmNlL2NvbG91ci9mcmFnbWVudFNoYWRlcicpLFxuICAgICAgQ29sb3VyUmVuZGVyZXJCdWZmZXJzID0gcmVxdWlyZSgnLi4vcmVuZGVyZXIvYnVmZmVycy9jb2xvdXInKSxcbiAgICAgIENvbG91clVuaWZvcm1Mb2NhdGlvbnMgPSByZXF1aXJlKCcuL2xvY2F0aW9ucy9jb2xvdXIvdW5pZm9ybScpLFxuICAgICAgQ29sb3VyQXR0cmlidXRlTG9jYXRpb25zID0gcmVxdWlyZSgnLi9sb2NhdGlvbnMvY29sb3VyL2F0dHJpYnV0ZScpO1xuXG5jb25zdCB7IGNyZWF0ZVByb2dyYW0gfSA9IFJlbmRlcmVyO1xuXG5jbGFzcyBDb2xvdXJSZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcbiAgZ2V0VmVydGV4Q29sb3VyQXR0cmlidXRlTG9jYXRpb24oKSB7XG4gICAgY29uc3QgYXR0cmlidXRlTG9jYXRpb25zID0gdGhpcy5nZXRBdHRyaWJ1dGVMb2NhdGlvbnMoKSxcbiAgICAgICAgICB2ZXJ0ZXhDb2xvdXJBdHRyaWJ1dGVMb2NhdGlvbiA9IGF0dHJpYnV0ZUxvY2F0aW9ucy5nZXRWZXJ0ZXhDb2xvdXJBdHRyaWJ1dGVMb2NhdGlvbigpO1xuXG4gICAgcmV0dXJuIHZlcnRleENvbG91ckF0dHJpYnV0ZUxvY2F0aW9uO1xuICB9XG5cbiAgYWRkVmVydGV4Q29sb3Vycyh2ZXJ0ZXhDb2xvdXJzKSB7IHRoaXMucmVuZGVyZXJEYXRhLmFkZFZlcnRleENvbG91cnModmVydGV4Q29sb3Vycyk7IH1cblxuICBjcmVhdGVCdWZmZXJzKGNhbnZhcykge1xuICAgIGNvbnN0IHJlbmRlcmVyRGF0YSA9IHRoaXMuZ2V0UmVuZGVyZXJEYXRhKCksXG4gICAgICAgICAgcmVuZGVyZXJCdWZmZXJzID0gdGhpcy5nZXRSZW5kZXJlckJ1ZmZlcnMoKSxcbiAgICAgICAgICB2ZXJ0ZXhQb3NpdGlvbnNEYXRhID0gcmVuZGVyZXJEYXRhLmdldFZlcnRleFBvc2l0aW9uc0RhdGEoKSxcbiAgICAgICAgICB2ZXJ0ZXhOb3JtYWxzRGF0YSA9IHJlbmRlcmVyRGF0YS5nZXRWZXJ0ZXhOb3JtYWxzRGF0YSgpLFxuICAgICAgICAgIHZlcnRleEluZGV4ZXNEYXRhID0gcmVuZGVyZXJEYXRhLmdldFZlcnRleEluZGV4ZXNEYXRhKCksXG4gICAgICAgICAgdmVydGV4Q29sb3Vyc0RhdGEgPSByZW5kZXJlckRhdGEuZ2V0VmVydGV4Q29sb3Vyc0RhdGEoKTtcblxuICAgIHJlbmRlcmVyQnVmZmVycy5jcmVhdGVCdWZmZXJzKHZlcnRleFBvc2l0aW9uc0RhdGEsIHZlcnRleE5vcm1hbHNEYXRhLCB2ZXJ0ZXhJbmRleGVzRGF0YSwgdmVydGV4Q29sb3Vyc0RhdGEsIGNhbnZhcyk7XG4gIH1cblxuICBiaW5kQnVmZmVycyhjYW52YXMpIHtcbiAgICBjb25zdCByZW5kZXJlckJ1ZmZlcnMgPSB0aGlzLmdldFJlbmRlcmVyQnVmZmVycygpLFxuICAgICAgICAgIHZlcnRleE5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uID0gdGhpcy5nZXRWZXJ0ZXhOb3JtYWxBdHRyaWJ1dGVMb2NhdGlvbigpLFxuICAgICAgICAgIHZlcnRleFBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSB0aGlzLmdldFZlcnRleFBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24oKSxcbiAgICAgICAgICB2ZXJ0ZXhDb2xvdXJBdHRyaWJ1dGVMb2NhdGlvbiA9IHRoaXMuZ2V0VmVydGV4Q29sb3VyQXR0cmlidXRlTG9jYXRpb24oKTtcbiAgICBcbiAgICByZW5kZXJlckJ1ZmZlcnMuYmluZEJ1ZmZlcnModmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb24sIHZlcnRleFBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIHZlcnRleENvbG91ckF0dHJpYnV0ZUxvY2F0aW9uLCBjYW52YXMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKGNhbnZhcykge1xuICAgIGNvbnN0IHByb2dyYW0gPSBjcmVhdGVQcm9ncmFtKHZlcnRleFNoYWRlclNvdXJjZSwgZnJhZ21lbnRTaGFkZXJTb3VyY2UsIGNhbnZhcyksXG4gICAgICAgICAgY29sb3VyUmVuZGVyZXJEYXRhID0gQ29sb3VyUmVuZGVyZXJEYXRhLmZyb21Ob3RoaW5nKCksXG4gICAgICAgICAgY29sb3VyUmVuZGVyZXJCdWZmZXJzID0gQ29sb3VyUmVuZGVyZXJCdWZmZXJzLmZyb21Ob3RoaW5nKCksXG4gICAgICAgICAgcmVuZGVyZXJEYXRhID0gY29sb3VyUmVuZGVyZXJEYXRhLCAgLy8vXG4gICAgICAgICAgcmVuZGVyZXJCdWZmZXJzID0gY29sb3VyUmVuZGVyZXJCdWZmZXJzLCAgLy8vXG4gICAgICAgICAgdW5pZm9ybUxvY2F0aW9ucyA9IENvbG91clVuaWZvcm1Mb2NhdGlvbnMuZnJvbVByb2dyYW0ocHJvZ3JhbSwgY2FudmFzKSxcbiAgICAgICAgICBhdHRyaWJ1dGVMb2NhdGlvbnMgPSBDb2xvdXJBdHRyaWJ1dGVMb2NhdGlvbnMuZnJvbVByb2dyYW0ocHJvZ3JhbSwgY2FudmFzKSxcbiAgICAgICAgICBjb2xvdXJSZW5kZXJlciA9IG5ldyBDb2xvdXJSZW5kZXJlcihwcm9ncmFtLCByZW5kZXJlckRhdGEsIHJlbmRlcmVyQnVmZmVycywgdW5pZm9ybUxvY2F0aW9ucywgYXR0cmlidXRlTG9jYXRpb25zKTtcbiAgICBcbiAgICByZXR1cm4gY29sb3VyUmVuZGVyZXI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb2xvdXJSZW5kZXJlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXJyYXlVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvYXJyYXknKTtcblxuY29uc3QgeyBmbGF0dGVuLCBtZXJnZSB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICBhZGQgPSBtZXJnZTsgIC8vL1xuXG5jbGFzcyBSZW5kZXJlckRhdGEge1xuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhQb3NpdGlvbnNEYXRhLCB2ZXJ0ZXhOb3JtYWxzRGF0YSwgdmVydGV4SW5kZXhlc0RhdGEsIG1heGltdW1WZXJ0ZXhJbmRleCkge1xuICAgIHRoaXMudmVydGV4UG9zaXRpb25zRGF0YSA9IHZlcnRleFBvc2l0aW9uc0RhdGE7XG4gICAgdGhpcy52ZXJ0ZXhOb3JtYWxzRGF0YSA9IHZlcnRleE5vcm1hbHNEYXRhO1xuICAgIHRoaXMudmVydGV4SW5kZXhlc0RhdGEgPSB2ZXJ0ZXhJbmRleGVzRGF0YTtcbiAgICB0aGlzLm1heGltdW1WZXJ0ZXhJbmRleCA9IG1heGltdW1WZXJ0ZXhJbmRleDtcbiAgfVxuXG4gIGdldENvdW50KCkge1xuICAgIGNvbnN0IHZlcnRleEluZGV4ZXNEYXRhTGVuZ3RoID0gdGhpcy52ZXJ0ZXhJbmRleGVzRGF0YS5sZW5ndGgsXG4gICAgICAgICAgY291bnQgPSB2ZXJ0ZXhJbmRleGVzRGF0YUxlbmd0aDsgIC8vL1xuXG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG4gIFxuICBnZXRWZXJ0ZXhQb3NpdGlvbnNEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLnZlcnRleFBvc2l0aW9uc0RhdGE7XG4gIH1cbiAgXG4gIGdldFZlcnRleE5vcm1hbHNEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLnZlcnRleE5vcm1hbHNEYXRhO1xuICB9XG4gIFxuICBnZXRWZXJ0ZXhJbmRleGVzRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy52ZXJ0ZXhJbmRleGVzRGF0YTtcbiAgfVxuXG4gIGFkZFZlcnRleFBvc2l0aW9ucyh2ZXJ0ZXhQb3NpdGlvbnMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQb3NpdGlvbnNEYXRhID0gZmxhdHRlbih2ZXJ0ZXhQb3NpdGlvbnMpO1xuXG4gICAgYWRkKHRoaXMudmVydGV4UG9zaXRpb25zRGF0YSwgdmVydGV4UG9zaXRpb25zRGF0YSk7XG4gIH1cblxuICBhZGRWZXJ0ZXhOb3JtYWxzKHZlcnRleE5vcm1hbHMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhOb3JtYWxzRGF0YSA9IGZsYXR0ZW4odmVydGV4Tm9ybWFscyk7XG5cbiAgICBhZGQodGhpcy52ZXJ0ZXhOb3JtYWxzRGF0YSwgdmVydGV4Tm9ybWFsc0RhdGEpO1xuICB9XG5cbiAgYWRkVmVydGV4SW5kZXhlcyh2ZXJ0ZXhJbmRleGVzKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5tYXhpbXVtVmVydGV4SW5kZXggKyAxO1xuXG4gICAgdmVydGV4SW5kZXhlcyA9IHZlcnRleEluZGV4ZXMubWFwKCh2ZXJ0ZXhJbmRleCkgPT4gKHZlcnRleEluZGV4ICsgb2Zmc2V0KSk7XG5cbiAgICB0aGlzLm1heGltdW1WZXJ0ZXhJbmRleCA9IE1hdGgubWF4KHRoaXMubWF4aW11bVZlcnRleEluZGV4LCAuLi52ZXJ0ZXhJbmRleGVzKTtcblxuICAgIGNvbnN0IHZlcnRleEluZGV4ZXNEYXRhID0gdmVydGV4SW5kZXhlcztcblxuICAgIGFkZCh0aGlzLnZlcnRleEluZGV4ZXNEYXRhLCB2ZXJ0ZXhJbmRleGVzRGF0YSk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tTm90aGluZyhDbGFzcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgdmVydGV4UG9zaXRpb25zRGF0YSA9IFtdLFxuICAgICAgICAgIHZlcnRleE5vcm1hbHNEYXRhID0gW10sXG4gICAgICAgICAgdmVydGV4SW5kZXhlc0RhdGEgPSBbXSxcbiAgICAgICAgICBtYXhpbXVtVmVydGV4SW5kZXggPSAtMSwgIC8vL1xuICAgICAgICAgIHJlbmRlcmVyRGF0YSA9IG5ldyBDbGFzcyh2ZXJ0ZXhQb3NpdGlvbnNEYXRhLCB2ZXJ0ZXhOb3JtYWxzRGF0YSwgdmVydGV4SW5kZXhlc0RhdGEsIG1heGltdW1WZXJ0ZXhJbmRleCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgICBcbiAgICByZXR1cm4gcmVuZGVyZXJEYXRhO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyZXJEYXRhO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBSZW5kZXJlckRhdGEgPSByZXF1aXJlKCcuLi8uLi9yZW5kZXJlci9kYXRhJyksXG4gICAgICBhcnJheVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9hcnJheScpO1xuXG5jb25zdCB7IG1lcmdlLCBmbGF0dGVuIH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIGFkZCA9IG1lcmdlOyAgLy8vXG5cbmNsYXNzIENvbG91clJlbmRlcmVyRGF0YSBleHRlbmRzIFJlbmRlcmVyRGF0YSB7XG4gIGNvbnN0cnVjdG9yKHZlcnRleFBvc2l0aW9uc0RhdGEsIHZlcnRleE5vcm1hbHNEYXRhLCB2ZXJ0ZXhJbmRleGVzRGF0YSwgbWF4aW11bVZlcnRleEluZGV4LCB2ZXJ0ZXhDb2xvdXJzRGF0YSkge1xuICAgIHN1cGVyKHZlcnRleFBvc2l0aW9uc0RhdGEsIHZlcnRleE5vcm1hbHNEYXRhLCB2ZXJ0ZXhJbmRleGVzRGF0YSwgbWF4aW11bVZlcnRleEluZGV4KTtcblxuICAgIHRoaXMudmVydGV4Q29sb3Vyc0RhdGEgPSB2ZXJ0ZXhDb2xvdXJzRGF0YTtcbiAgfVxuICBcbiAgZ2V0VmVydGV4Q29sb3Vyc0RhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMudmVydGV4Q29sb3Vyc0RhdGE7XG4gIH1cblxuICBhZGRWZXJ0ZXhDb2xvdXJzKHZlcnRleENvbG91cnMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhDb2xvdXJzRGF0YSA9IGZsYXR0ZW4odmVydGV4Q29sb3Vycyk7XG5cbiAgICBhZGQodGhpcy52ZXJ0ZXhDb2xvdXJzRGF0YSwgdmVydGV4Q29sb3Vyc0RhdGEpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkgeyBcbiAgICBjb25zdCB2ZXJ0ZXhDb2xvdXJzRGF0YSA9IFtdLFxuICAgICAgICAgIGNvbG91clJlbmRlcmVyRGF0YSA9IFJlbmRlcmVyRGF0YS5mcm9tTm90aGluZyhDb2xvdXJSZW5kZXJlckRhdGEsIHZlcnRleENvbG91cnNEYXRhKTtcbiAgICBcbiAgICByZXR1cm4gY29sb3VyUmVuZGVyZXJEYXRhO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sb3VyUmVuZGVyZXJEYXRhO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBSZW5kZXJlckRhdGEgPSByZXF1aXJlKCcuLi8uLi9yZW5kZXJlci9kYXRhJyksXG4gICAgICB2ZWN0b3JNYXRocyA9IHJlcXVpcmUoJy4uLy4uL21hdGhzL3ZlY3RvcicpLFxuICAgICAgYXJyYXlVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi8uLi91dGlsaXRpZXMvYXJyYXknKTtcblxuY29uc3QgeyBhZGQyLCBtdWx0aXBseTIgfSA9IHZlY3Rvck1hdGhzLFxuICAgICAgeyBtZXJnZSwgZmxhdHRlbiB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICBhZGQgPSBtZXJnZTsgIC8vL1xuXG5jbGFzcyBUZXh0dXJlUmVuZGVyZXJEYXRhIGV4dGVuZHMgUmVuZGVyZXJEYXRhIHtcbiAgY29uc3RydWN0b3IodmVydGV4UG9zaXRpb25zRGF0YSwgdmVydGV4Tm9ybWFsc0RhdGEsIHZlcnRleEluZGV4ZXNEYXRhLCBtYXhpbXVtVmVydGV4SW5kZXgsIHZlcnRleFRleHR1cmVDb29yZGluYXRlc0RhdGEpIHtcbiAgICBzdXBlcih2ZXJ0ZXhQb3NpdGlvbnNEYXRhLCB2ZXJ0ZXhOb3JtYWxzRGF0YSwgdmVydGV4SW5kZXhlc0RhdGEsIG1heGltdW1WZXJ0ZXhJbmRleCk7XG4gICAgXG4gICAgdGhpcy52ZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNEYXRhID0gdmVydGV4VGV4dHVyZUNvb3JkaW5hdGVzRGF0YTtcbiAgfVxuICBcbiAgZ2V0VmVydGV4VGV4dHVyZUNvb3JkaW5hdGVzRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy52ZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNEYXRhO1xuICB9XG5cbiAgYWRkVmVydGV4VGV4dHVyZUNvb3JkaW5hdGVzKHZlcnRleFRleHR1cmVDb29yZGluYXRlcykge1xuICAgIHZlcnRleFRleHR1cmVDb29yZGluYXRlcyA9IHZlcnRleFRleHR1cmVDb29yZGluYXRlcy5tYXAoKHZlcnRleFRleHR1cmVDb29yZGluYXRlcykgPT4geyAgLy8vXG4gICAgICB2ZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXMgPSAgdmVydGljYWxseUZsaXBWZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXModmVydGV4VGV4dHVyZUNvb3JkaW5hdGVzKTtcblxuICAgICAgcmV0dXJuIHZlcnRleFRleHR1cmVDb29yZGluYXRlcztcbiAgICB9KTtcblxuICAgIGNvbnN0IHZlcnRleFRleHR1cmVDb29yZGluYXRlc0RhdGEgPSBmbGF0dGVuKHZlcnRleFRleHR1cmVDb29yZGluYXRlcyk7XG5cbiAgICBhZGQodGhpcy52ZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNEYXRhLCB2ZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNEYXRhKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHsgXG4gICAgY29uc3QgdmVydGV4VGV4dHVyZUNvb3JkaW5hdGVzRGF0YSA9IFtdLFxuICAgICAgICAgIHRleHR1cmVSZW5kZXJlckRhdGEgPSBSZW5kZXJlckRhdGEuZnJvbU5vdGhpbmcoVGV4dHVyZVJlbmRlcmVyRGF0YSwgdmVydGV4VGV4dHVyZUNvb3JkaW5hdGVzRGF0YSk7XG4gICAgXG4gICAgcmV0dXJuIHRleHR1cmVSZW5kZXJlckRhdGE7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0dXJlUmVuZGVyZXJEYXRhO1xuXG5mdW5jdGlvbiB2ZXJ0aWNhbGx5RmxpcFZlcnRleFRleHR1cmVDb29yZGluYXRlcyh2ZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXMpIHsgcmV0dXJuIGFkZDIobXVsdGlwbHkyKHZlcnRleFRleHR1cmVDb29yZGluYXRlcywgWyAxLCAtMSBdKSwgWyAwLCAxIF0pOyB9ICAvLy9cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbGlnaHRpbmdTb3VyY2UgPSByZXF1aXJlKCcuLi9zb3VyY2UvbGlnaHRpbmcnKSxcbiAgICAgIHBvc2l0aW9uU291cmNlID0gcmVxdWlyZSgnLi4vc291cmNlL3Bvc2l0aW9uJyk7XG5cbmNvbnN0IHsgdmVydGV4Tm9ybWFsQXR0cmlidXRlTmFtZSB9ID0gbGlnaHRpbmdTb3VyY2UsXG4gICAgICB7IHZlcnRleFBvc2l0aW9uQXR0cmlidXRlTmFtZSB9ID0gcG9zaXRpb25Tb3VyY2U7XG5cbmNsYXNzIEF0dHJpYnV0ZUxvY2F0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKHZlcnRleFBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIHZlcnRleE5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uKSB7XG4gICAgdGhpcy52ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gdmVydGV4UG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbjtcbiAgICB0aGlzLnZlcnRleE5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uID0gdmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb247XG4gIH1cbiAgXG4gIGdldFZlcnRleFBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudmVydGV4UG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbjtcbiAgfVxuICBcbiAgZ2V0VmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb247XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvZ3JhbShDbGFzcywgcHJvZ3JhbSwgY2FudmFzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gY2FudmFzLmdldEF0dHJpYnV0ZUxvY2F0aW9uKHByb2dyYW0sIHZlcnRleFBvc2l0aW9uQXR0cmlidXRlTmFtZSksXG4gICAgICAgICAgdmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb24gPSBjYW52YXMuZ2V0QXR0cmlidXRlTG9jYXRpb24ocHJvZ3JhbSwgdmVydGV4Tm9ybWFsQXR0cmlidXRlTmFtZSksXG4gICAgICAgICAgYXR0cmlidXRlTG9jYXRpb25zID0gbmV3IENsYXNzKHZlcnRleFBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIHZlcnRleE5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuXG4gICAgcmV0dXJuIGF0dHJpYnV0ZUxvY2F0aW9ucztcbiAgfSAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXR0cmlidXRlTG9jYXRpb25zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBBdHRyaWJ1dGVMb2NhdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9sb2NhdGlvbnMvYXR0cmlidXRlJyksXG4gICAgICB2ZXJ0ZXhTaGFkZXJTb3VyY2UgPSByZXF1aXJlKCcuLi8uLi9zb3VyY2UvY29sb3VyL3ZlcnRleFNoYWRlcicpO1xuXG5jb25zdCB7IHZlcnRleENvbG91ckF0dHJpYnV0ZU5hbWUgfSA9IHZlcnRleFNoYWRlclNvdXJjZTtcblxuY2xhc3MgQ29sb3VyQXR0cmlidXRlTG9jYXRpb25zIGV4dGVuZHMgQXR0cmlidXRlTG9jYXRpb25zIHtcbiAgY29uc3RydWN0b3IodmVydGV4UG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiwgdmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb24sIHZlcnRleENvbG91ckF0dHJpYnV0ZUxvY2F0aW9uKSB7XG4gICAgc3VwZXIodmVydGV4UG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiwgdmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb24pO1xuXG4gICAgdGhpcy52ZXJ0ZXhDb2xvdXJBdHRyaWJ1dGVMb2NhdGlvbiA9IHZlcnRleENvbG91ckF0dHJpYnV0ZUxvY2F0aW9uO1xuICB9XG5cbiAgZ2V0VmVydGV4Q29sb3VyQXR0cmlidXRlTG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudmVydGV4Q29sb3VyQXR0cmlidXRlTG9jYXRpb247XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvZ3JhbShwcm9ncmFtLCBjYW52YXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhDb2xvdXJBdHRyaWJ1dGVMb2NhdGlvbiA9IGNhbnZhcy5nZXRBdHRyaWJ1dGVMb2NhdGlvbihwcm9ncmFtLCB2ZXJ0ZXhDb2xvdXJBdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgICBjb2xvdXJBdHRyaWJ1dGVMb2NhdGlvbnMgPSBBdHRyaWJ1dGVMb2NhdGlvbnMuZnJvbVByb2dyYW0oQ29sb3VyQXR0cmlidXRlTG9jYXRpb25zLCBwcm9ncmFtLCBjYW52YXMsIHZlcnRleENvbG91ckF0dHJpYnV0ZUxvY2F0aW9uKTtcblxuICAgIHJldHVybiBjb2xvdXJBdHRyaWJ1dGVMb2NhdGlvbnM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb2xvdXJBdHRyaWJ1dGVMb2NhdGlvbnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFVuaWZvcm1Mb2NhdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9sb2NhdGlvbnMvdW5pZm9ybScpO1xuXG5jbGFzcyBDb2xvdXJVbmlmb3JtTG9jYXRpb25zIGV4dGVuZHMgVW5pZm9ybUxvY2F0aW9ucyB7XG4gIHN0YXRpYyBmcm9tUHJvZ3JhbShwcm9ncmFtLCBjYW52YXMpIHsgcmV0dXJuIFVuaWZvcm1Mb2NhdGlvbnMuZnJvbVByb2dyYW0oQ29sb3VyVW5pZm9ybUxvY2F0aW9ucywgcHJvZ3JhbSwgY2FudmFzKTsgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbG91clVuaWZvcm1Mb2NhdGlvbnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEF0dHJpYnV0ZUxvY2F0aW9ucyA9IHJlcXVpcmUoJy4uLy4uL2xvY2F0aW9ucy9hdHRyaWJ1dGUnKSxcbiAgICAgIHZlcnRleFNoYWRlclNvdXJjZSA9IHJlcXVpcmUoJy4uLy4uL3NvdXJjZS90ZXh0dXJlL3ZlcnRleFNoYWRlcicpO1xuXG5jb25zdCB7IHRleHR1cmVDb29yZGluYXRlQXR0cmlidXRlTmFtZSB9ID0gdmVydGV4U2hhZGVyU291cmNlO1xuXG5jbGFzcyBUZXh0dXJlQXR0cmlidXRlTG9jYXRpb25zIGV4dGVuZHMgQXR0cmlidXRlTG9jYXRpb25zIHtcbiAgY29uc3RydWN0b3IodmVydGV4UG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiwgdmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb24sIHRleHR1cmVDb29yZGluYXRlQXR0cmlidXRlTG9jYXRpb24pIHtcbiAgICBzdXBlcih2ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uLCB2ZXJ0ZXhOb3JtYWxBdHRyaWJ1dGVMb2NhdGlvbik7XG4gICAgXG4gICAgdGhpcy50ZXh0dXJlQ29vcmRpbmF0ZUF0dHJpYnV0ZUxvY2F0aW9uID0gdGV4dHVyZUNvb3JkaW5hdGVBdHRyaWJ1dGVMb2NhdGlvbjtcbiAgfVxuICBcbiAgZ2V0VGV4dHVyZUNvb3JkaW5hdGVBdHRyaWJ1dGVMb2NhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0dXJlQ29vcmRpbmF0ZUF0dHJpYnV0ZUxvY2F0aW9uO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb2dyYW0ocHJvZ3JhbSwgY2FudmFzKSB7XG4gICAgY29uc3QgdGV4dHVyZUNvb3JkaW5hdGVBdHRyaWJ1dGVMb2NhdGlvbiA9IGNhbnZhcy5nZXRBdHRyaWJ1dGVMb2NhdGlvbihwcm9ncmFtLCB0ZXh0dXJlQ29vcmRpbmF0ZUF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAgIHRleHR1cmVBdHRyaWJ1dGVMb2NhdGlvbnMgPSBBdHRyaWJ1dGVMb2NhdGlvbnMuZnJvbVByb2dyYW0oVGV4dHVyZUF0dHJpYnV0ZUxvY2F0aW9ucywgcHJvZ3JhbSwgY2FudmFzLCB0ZXh0dXJlQ29vcmRpbmF0ZUF0dHJpYnV0ZUxvY2F0aW9uKTtcbiAgICBcbiAgICByZXR1cm4gdGV4dHVyZUF0dHJpYnV0ZUxvY2F0aW9ucztcbiAgfSAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dHVyZUF0dHJpYnV0ZUxvY2F0aW9ucztcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgVW5pZm9ybUxvY2F0aW9ucyA9IHJlcXVpcmUoJy4uLy4uL2xvY2F0aW9ucy91bmlmb3JtJyksXG4gICAgICBmcmFnbWVudFNoYWRlclNvdXJjZSA9IHJlcXVpcmUoJy4uLy4uL3NvdXJjZS90ZXh0dXJlL2ZyYWdtZW50U2hhZGVyJyk7XG5cbmNvbnN0IHsgc2FtcGxlck5hbWUgfSA9IGZyYWdtZW50U2hhZGVyU291cmNlO1xuXG5jbGFzcyBUZXh0dXJlVW5pZm9ybUxvY2F0aW9ucyBleHRlbmRzIFVuaWZvcm1Mb2NhdGlvbnMge1xuICBjb25zdHJ1Y3RvcihvZmZzZXRNYXRyaXhVbmlmb3JtTG9jYXRpb24sIHJvdGF0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uLCBwb3NpdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbiwgcHJvamVjdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbiwgbm9ybWFsTWF0cml4VW5pZm9ybUxvY2F0aW9uLCBzYW1wbGVyVW5pZm9ybUxvY2F0aW9uKSB7XG4gICAgc3VwZXIob2Zmc2V0TWF0cml4VW5pZm9ybUxvY2F0aW9uLCByb3RhdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbiwgcG9zaXRpb25NYXRyaXhVbmlmb3JtTG9jYXRpb24sIHByb2plY3Rpb25NYXRyaXhVbmlmb3JtTG9jYXRpb24sIG5vcm1hbE1hdHJpeFVuaWZvcm1Mb2NhdGlvbik7XG4gICAgXG4gICAgdGhpcy5zYW1wbGVyVW5pZm9ybUxvY2F0aW9uID0gc2FtcGxlclVuaWZvcm1Mb2NhdGlvbjtcbiAgfVxuICBcbiAgZ2V0U2FtcGxlclVuaWZvcm1Mb2NhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zYW1wbGVyVW5pZm9ybUxvY2F0aW9uO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9ncmFtKHByb2dyYW0sIGNhbnZhcykge1xuICAgIGNvbnN0IHNhbXBsZXJVbmlmb3JtTG9jYXRpb24gPSBjYW52YXMuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIHNhbXBsZXJOYW1lKSxcbiAgICAgICAgICB0ZXh0dXJlVW5pZm9ybUxvY2F0aW9ucyA9IFVuaWZvcm1Mb2NhdGlvbnMuZnJvbVByb2dyYW0oVGV4dHVyZVVuaWZvcm1Mb2NhdGlvbnMsIHByb2dyYW0sIGNhbnZhcywgc2FtcGxlclVuaWZvcm1Mb2NhdGlvbik7XG4gICAgXG4gICAgcmV0dXJuIHRleHR1cmVVbmlmb3JtTG9jYXRpb25zO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dHVyZVVuaWZvcm1Mb2NhdGlvbnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGxpZ2h0aW5nU291cmNlID0gcmVxdWlyZSgnLi4vc291cmNlL2xpZ2h0aW5nJyksXG4gICAgICBwb3NpdGlvblNvdXJjZSA9IHJlcXVpcmUoJy4uL3NvdXJjZS9wb3NpdGlvbicpO1xuXG5jb25zdCB7IG5vcm1hbE1hdHJpeE5hbWUgfSA9IGxpZ2h0aW5nU291cmNlLFxuICAgICAgeyBvZmZzZXRNYXRyaXhOYW1lLCByb3RhdGlvbk1hdHJpeE5hbWUsIHBvc2l0aW9uTWF0cml4TmFtZSwgcHJvamVjdGlvbk1hdHJpeE5hbWUgfSA9IHBvc2l0aW9uU291cmNlO1xuXG5jbGFzcyBVbmlmb3JtTG9jYXRpb25zIHtcbiAgY29uc3RydWN0b3Iob2Zmc2V0TWF0cml4VW5pZm9ybUxvY2F0aW9uLCByb3RhdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbiwgcG9zaXRpb25NYXRyaXhVbmlmb3JtTG9jYXRpb24sIHByb2plY3Rpb25NYXRyaXhVbmlmb3JtTG9jYXRpb24sIG5vcm1hbE1hdHJpeFVuaWZvcm1Mb2NhdGlvbikge1xuICAgIHRoaXMub2Zmc2V0TWF0cml4VW5pZm9ybUxvY2F0aW9uID0gb2Zmc2V0TWF0cml4VW5pZm9ybUxvY2F0aW9uO1xuICAgIHRoaXMucm90YXRpb25NYXRyaXhVbmlmb3JtTG9jYXRpb24gPSByb3RhdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbjtcbiAgICB0aGlzLnBvc2l0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uID0gcG9zaXRpb25NYXRyaXhVbmlmb3JtTG9jYXRpb247XG4gICAgdGhpcy5wcm9qZWN0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uID0gcHJvamVjdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbjtcbiAgICB0aGlzLm5vcm1hbE1hdHJpeFVuaWZvcm1Mb2NhdGlvbiA9IG5vcm1hbE1hdHJpeFVuaWZvcm1Mb2NhdGlvbjtcbiAgfVxuXG4gIGdldE9mZnNldE1hdHJpeFVuaWZvcm1Mb2NhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vZmZzZXRNYXRyaXhVbmlmb3JtTG9jYXRpb247ICAgIFxuICB9XG4gIFxuICBnZXRSb3RhdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbjtcbiAgfVxuXG4gIGdldFBvc2l0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uO1xuICB9XG5cbiAgZ2V0UHJvamVjdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uO1xuICB9XG5cbiAgZ2V0Tm9ybWFsTWF0cml4VW5pZm9ybUxvY2F0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLm5vcm1hbE1hdHJpeFVuaWZvcm1Mb2NhdGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvZ3JhbShDbGFzcywgcHJvZ3JhbSwgY2FudmFzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBvZmZzZXRNYXRyaXhVbmlmb3JtTG9jYXRpb24gPSBjYW52YXMuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIG9mZnNldE1hdHJpeE5hbWUpLFxuICAgICAgICAgIHJvdGF0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uID0gY2FudmFzLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCByb3RhdGlvbk1hdHJpeE5hbWUpLFxuICAgICAgICAgIHBvc2l0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uID0gY2FudmFzLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBwb3NpdGlvbk1hdHJpeE5hbWUpLFxuICAgICAgICAgIHByb2plY3Rpb25NYXRyaXhVbmlmb3JtTG9jYXRpb24gPSBjYW52YXMuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIHByb2plY3Rpb25NYXRyaXhOYW1lKSxcbiAgICAgICAgICBub3JtYWxNYXRyaXhVbmlmb3JtTG9jYXRpb24gPSBjYW52YXMuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIG5vcm1hbE1hdHJpeE5hbWUpLFxuICAgICAgICAgIHVuaWZvcm1Mb2NhdGlvbnMgPSBuZXcgQ2xhc3Mob2Zmc2V0TWF0cml4VW5pZm9ybUxvY2F0aW9uLCByb3RhdGlvbk1hdHJpeFVuaWZvcm1Mb2NhdGlvbiwgcG9zaXRpb25NYXRyaXhVbmlmb3JtTG9jYXRpb24sIHByb2plY3Rpb25NYXRyaXhVbmlmb3JtTG9jYXRpb24sIG5vcm1hbE1hdHJpeFVuaWZvcm1Mb2NhdGlvbiwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgICBcbiAgICByZXR1cm4gdW5pZm9ybUxvY2F0aW9uczsgICAgICAgXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVbmlmb3JtTG9jYXRpb25zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBmcmFnbWVudFNoYWRlclNvdXJjZSA9IG5ldyBTdHJpbmcoYFxuICAgICAgICBcbiAgICAgICAgdmFyeWluZyBsb3dwIHZlYzQgdkNvbG91cjtcbiAgICAgICAgICAgICAgXG4gICAgICAgIHZhcnlpbmcgaGlnaHAgdmVjMyB2TGlnaHRpbmc7XG5cbiAgICAgICAgdm9pZCBtYWluKCkge1xuICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQodkNvbG91ci5yZ2IgKiB2TGlnaHRpbmcsIHZDb2xvdXIuYSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICBgKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmFnbWVudFNoYWRlclNvdXJjZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbGlnaHRpbmdTb3VyY2UgPSByZXF1aXJlKCcuLi8uLi9zb3VyY2UvbGlnaHRpbmcnKSxcbiAgICAgIHBvc2l0aW9uU291cmNlID0gcmVxdWlyZSgnLi4vLi4vc291cmNlL3Bvc2l0aW9uJyk7XG5cbmNvbnN0IHZlcnRleENvbG91ckF0dHJpYnV0ZU5hbWUgPSAnYVZlcnRleENvbG91cicsXG4gICAgICB2ZXJ0ZXhTaGFkZXJTb3VyY2UgPSBuZXcgU3RyaW5nKGBcbiAgICBcbiAgICAgICAgYXR0cmlidXRlIHZlYzQgJHt2ZXJ0ZXhDb2xvdXJBdHRyaWJ1dGVOYW1lfTtcblxuICAgICAgICAke2xpZ2h0aW5nU291cmNlfVxuICAgICAgXG4gICAgICAgICR7cG9zaXRpb25Tb3VyY2V9XG4gICAgXG4gICAgICAgIHZhcnlpbmcgaGlnaHAgdmVjMyB2TGlnaHRpbmc7XG4gICAgICAgIFxuICAgICAgICB2YXJ5aW5nIGxvd3AgdmVjNCB2Q29sb3VyO1xuICAgICAgICBcbiAgICAgICAgdm9pZCBtYWluKCkge1xuICAgICAgICAgIHZMaWdodGluZyA9IGNhbGN1bGF0ZUxpZ2h0aW5nKCk7XG5cbiAgICAgICAgICBnbF9Qb3NpdGlvbiA9IGNhbGN1bGF0ZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgICB2Q29sb3VyID0gJHt2ZXJ0ZXhDb2xvdXJBdHRyaWJ1dGVOYW1lfTsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgYCk7XG5cbk9iamVjdC5hc3NpZ24odmVydGV4U2hhZGVyU291cmNlLCB7XG4gIHZlcnRleENvbG91ckF0dHJpYnV0ZU5hbWVcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnRleFNoYWRlclNvdXJjZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgbm9ybWFsTWF0cml4TmFtZSA9ICd1Tm9ybWFsTWF0cml4JyxcbiAgICAgIHZlcnRleE5vcm1hbEF0dHJpYnV0ZU5hbWUgPSAnYVZlcnRleE5vcm1hbCc7XG5cbmNvbnN0IGxpZ2h0aW5nU291cmNlID0gbmV3IFN0cmluZyhgXG4gIFxuICAgICAgICB1bmlmb3JtIG1hdDQgJHtub3JtYWxNYXRyaXhOYW1lfTtcblxuICAgICAgICBhdHRyaWJ1dGUgdmVjMyAke3ZlcnRleE5vcm1hbEF0dHJpYnV0ZU5hbWV9O1xuXG4gICAgICAgIHZlYzMgZGlyZWN0aW9uYWxMaWdodENvbG91ciA9IHZlYzMoMSwgMSwgMSksXG4gICAgICAgICAgICAgZGlyZWN0aW9uYWxWZWN0b3IgPSBub3JtYWxpemUodmVjMygxLjAsIDEuMCwgMS4wKSk7XG4gICAgICAgICAgXG4gICAgICAgIHZlYzMgY2FsY3VsYXRlTGlnaHRpbmcoKSB7XG4gICAgICAgICAgdmVjNCB0cmFuc2Zvcm1lZE5vcm1hbCA9ICR7bm9ybWFsTWF0cml4TmFtZX0gKiB2ZWM0KCR7dmVydGV4Tm9ybWFsQXR0cmlidXRlTmFtZX0sIDEuMCk7ICAgICAgICAgICAgXG5cbiAgICAgICAgICBmbG9hdCBkaXJlY3Rpb25hbCA9IChkb3QodHJhbnNmb3JtZWROb3JtYWwueHl6LCBkaXJlY3Rpb25hbFZlY3RvcikgKyAxLjApIC8gMi4wO1xuICAgICAgICAgIFxuICAgICAgICAgIHZlYzMgbGlnaHRpbmcgPSAoZGlyZWN0aW9uYWxMaWdodENvbG91ciAqIGRpcmVjdGlvbmFsKTtcbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gbGlnaHRpbmc7XG4gICAgICAgIH1cblxuICAgICAgYCk7XG5cbk9iamVjdC5hc3NpZ24obGlnaHRpbmdTb3VyY2UsIHtcbiAgbm9ybWFsTWF0cml4TmFtZSxcbiAgdmVydGV4Tm9ybWFsQXR0cmlidXRlTmFtZVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbGlnaHRpbmdTb3VyY2U7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG9mZnNldE1hdHJpeE5hbWUgPSAndU9mZnNldE1hdHJpeCcsXG4gICAgICByb3RhdGlvbk1hdHJpeE5hbWUgPSAndVJvdGF0aW9uTWF0cml4JyxcbiAgICAgIHBvc2l0aW9uTWF0cml4TmFtZSA9ICd1UG9zaXRpb25NYXRyaXgnLFxuICAgICAgcHJvamVjdGlvbk1hdHJpeE5hbWUgPSAndVBlcnNwZWN0aXZlTWF0cml4JyxcbiAgICAgIHZlcnRleFBvc2l0aW9uQXR0cmlidXRlTmFtZSA9ICdhVmVydGV4UG9zaXRpb24nO1xuXG5jb25zdCBwb3NpdGlvblNvdXJjZSA9IG5ldyBTdHJpbmcoYFxuICBcbiAgICAgICAgdW5pZm9ybSBtYXQ0ICR7b2Zmc2V0TWF0cml4TmFtZX0sXG4gICAgICAgICAgICAgICAgICAgICAke3JvdGF0aW9uTWF0cml4TmFtZX0sXG4gICAgICAgICAgICAgICAgICAgICAke3Bvc2l0aW9uTWF0cml4TmFtZX0sXG4gICAgICAgICAgICAgICAgICAgICAke3Byb2plY3Rpb25NYXRyaXhOYW1lfTtcbiAgICAgICAgXG4gICAgICAgIGF0dHJpYnV0ZSB2ZWM0ICR7dmVydGV4UG9zaXRpb25BdHRyaWJ1dGVOYW1lfTtcblxuICAgICAgICB2ZWM0IGNhbGN1bGF0ZVBvc2l0aW9uKCkge1xuICAgICAgICAgIHZlYzQgcG9zaXRpb24gPSAke3Byb2plY3Rpb25NYXRyaXhOYW1lfSAqICR7cG9zaXRpb25NYXRyaXhOYW1lfSAqICR7cm90YXRpb25NYXRyaXhOYW1lfSAqICR7b2Zmc2V0TWF0cml4TmFtZX0gKiAke3ZlcnRleFBvc2l0aW9uQXR0cmlidXRlTmFtZX07XG4gICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgYCk7XG5cbk9iamVjdC5hc3NpZ24ocG9zaXRpb25Tb3VyY2UsIHtcbiAgb2Zmc2V0TWF0cml4TmFtZSxcbiAgcm90YXRpb25NYXRyaXhOYW1lLFxuICBwb3NpdGlvbk1hdHJpeE5hbWUsXG4gIHByb2plY3Rpb25NYXRyaXhOYW1lLFxuICB2ZXJ0ZXhQb3NpdGlvbkF0dHJpYnV0ZU5hbWVcbn0pO1xuICAgIFxubW9kdWxlLmV4cG9ydHMgPSBwb3NpdGlvblNvdXJjZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc2FtcGxlck5hbWUgPSAndVNhbXBsZXInLFxuICAgICAgZnJhZ21lbnRTaGFkZXJTb3VyY2UgPSBuZXcgU3RyaW5nKGBcbiAgICAgICAgXG4gICAgICAgIHVuaWZvcm0gc2FtcGxlcjJEICR7c2FtcGxlck5hbWV9O1xuXG4gICAgICAgIHZhcnlpbmcgaGlnaHAgdmVjMyB2TGlnaHRpbmc7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgIHZhcnlpbmcgaGlnaHAgdmVjMiB2VGV4dHVyZUNvb3JkaW5hdGU7XG4gICAgICAgIFxuICAgICAgICB2b2lkIG1haW4oKSB7XG4gICAgICAgICAgaGlnaHAgdmVjNCB0ZXhlbENvbG91ciA9IHRleHR1cmUyRCgke3NhbXBsZXJOYW1lfSwgdlRleHR1cmVDb29yZGluYXRlKTtcbiAgICAgICAgICBcbiAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KHRleGVsQ29sb3VyLnJnYiAqIHZMaWdodGluZywgdGV4ZWxDb2xvdXIuYSk7ICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgIGApO1xuXG5PYmplY3QuYXNzaWduKGZyYWdtZW50U2hhZGVyU291cmNlLCB7XG4gIHNhbXBsZXJOYW1lXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmFnbWVudFNoYWRlclNvdXJjZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbGlnaHRpbmdTb3VyY2UgPSByZXF1aXJlKCcuLi8uLi9zb3VyY2UvbGlnaHRpbmcnKSxcbiAgICAgIHBvc2l0aW9uU291cmNlID0gcmVxdWlyZSgnLi4vLi4vc291cmNlL3Bvc2l0aW9uJyk7XG5cbmNvbnN0IHRleHR1cmVDb29yZGluYXRlQXR0cmlidXRlTmFtZSA9ICdhVGV4dHVyZUNvb3JkaW5hdGUnLFxuICAgICAgdmVydGV4U2hhZGVyU291cmNlID0gbmV3IFN0cmluZyhgXG4gICAgICAgIFxuICAgICAgICBhdHRyaWJ1dGUgdmVjMiAke3RleHR1cmVDb29yZGluYXRlQXR0cmlidXRlTmFtZX07XG4gICAgICAgIFxuICAgICAgICAke2xpZ2h0aW5nU291cmNlfVxuICAgICAgXG4gICAgICAgICR7cG9zaXRpb25Tb3VyY2V9XG5cbiAgICAgICAgdmFyeWluZyBoaWdocCB2ZWMzIHZMaWdodGluZztcbiAgICAgICAgXG4gICAgICAgIHZhcnlpbmcgaGlnaHAgdmVjMiB2VGV4dHVyZUNvb3JkaW5hdGU7XG4gICAgICAgIFxuICAgICAgICB2b2lkIG1haW4oKSB7XG4gICAgICAgICAgdkxpZ2h0aW5nID0gY2FsY3VsYXRlTGlnaHRpbmcoKTtcblxuICAgICAgICAgIGdsX1Bvc2l0aW9uID0gY2FsY3VsYXRlUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgdlRleHR1cmVDb29yZGluYXRlID0gJHt0ZXh0dXJlQ29vcmRpbmF0ZUF0dHJpYnV0ZU5hbWV9O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgYCk7XG5cbk9iamVjdC5hc3NpZ24odmVydGV4U2hhZGVyU291cmNlLCB7XG4gIHRleHR1cmVDb29yZGluYXRlQXR0cmlidXRlTmFtZVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gdmVydGV4U2hhZGVyU291cmNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBSZW5kZXJlciA9IHJlcXVpcmUoJy4uL3JlbmRlcmVyJyksXG4gICAgICB2ZXJ0ZXhTaGFkZXJTb3VyY2UgPSByZXF1aXJlKCcuL3NvdXJjZS90ZXh0dXJlL3ZlcnRleFNoYWRlcicpLFxuICAgICAgVGV4dHVyZVJlbmRlcmVyRGF0YSA9IHJlcXVpcmUoJy4uL3JlbmRlcmVyL2RhdGEvdGV4dHVyZScpLFxuICAgICAgZnJhZ21lbnRTaGFkZXJTb3VyY2UgPSByZXF1aXJlKCcuL3NvdXJjZS90ZXh0dXJlL2ZyYWdtZW50U2hhZGVyJyksXG4gICAgICBUZXh0dXJlUmVuZGVyZXJCdWZmZXJzID0gcmVxdWlyZSgnLi4vcmVuZGVyZXIvYnVmZmVycy90ZXh0dXJlJyksXG4gICAgICBUZXh0dXJlVW5pZm9ybUxvY2F0aW9ucyA9IHJlcXVpcmUoJy4vbG9jYXRpb25zL3RleHR1cmUvdW5pZm9ybScpLFxuICAgICAgVGV4dHVyZUF0dHJpYnV0ZUxvY2F0aW9ucyA9IHJlcXVpcmUoJy4vbG9jYXRpb25zL3RleHR1cmUvYXR0cmlidXRlJyk7XG5cbmNvbnN0IHsgY3JlYXRlUHJvZ3JhbSB9ID0gUmVuZGVyZXI7XG5cbmNsYXNzIFRleHR1cmVSZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcblx0Y29uc3RydWN0b3IocHJvZ3JhbSwgcmVuZGVyZXJEYXRhLCByZW5kZXJlckJ1ZmZlcnMsIHVuaWZvcm1Mb2NhdGlvbnMsIGF0dHJpYnV0ZUxvY2F0aW9ucywgaW1hZ2VNYXBKU09OKSB7XG5cdFx0c3VwZXIocHJvZ3JhbSwgcmVuZGVyZXJEYXRhLCByZW5kZXJlckJ1ZmZlcnMsIHVuaWZvcm1Mb2NhdGlvbnMsIGF0dHJpYnV0ZUxvY2F0aW9ucyk7XG5cblx0XHR0aGlzLmltYWdlTWFwSlNPTiA9IGltYWdlTWFwSlNPTjtcblx0fVxuXG5cdGdldEltYWdlTWFwSlNPTigpIHtcblx0XHRyZXR1cm4gdGhpcy5pbWFnZU1hcEpTT047XG5cdH1cblxuICBnZXRUZXh0dXJlQ29vcmRpbmF0ZUF0dHJpYnV0ZUxvY2F0aW9uKCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZUxvY2F0aW9ucyA9IHRoaXMuZ2V0QXR0cmlidXRlTG9jYXRpb25zKCksXG4gICAgICAgICAgdGV4dHVyZUNvb3JkaW5hdGVBdHRyaWJ1dGVMb2NhdGlvbiA9IGF0dHJpYnV0ZUxvY2F0aW9ucy5nZXRUZXh0dXJlQ29vcmRpbmF0ZUF0dHJpYnV0ZUxvY2F0aW9uKCk7XG5cbiAgICByZXR1cm4gdGV4dHVyZUNvb3JkaW5hdGVBdHRyaWJ1dGVMb2NhdGlvbjtcbiAgfVxuXG4gIGFkZFZlcnRleFRleHR1cmVDb29yZGluYXRlcyh2ZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXMpIHsgdGhpcy5yZW5kZXJlckRhdGEuYWRkVmVydGV4VGV4dHVyZUNvb3JkaW5hdGVzKHZlcnRleFRleHR1cmVDb29yZGluYXRlcyk7IH1cblxuICBjcmVhdGVCdWZmZXJzKGNhbnZhcykge1xuICAgIGNvbnN0IHJlbmRlcmVyRGF0YSA9IHRoaXMuZ2V0UmVuZGVyZXJEYXRhKCksXG4gICAgICAgICAgcmVuZGVyZXJCdWZmZXJzID0gdGhpcy5nZXRSZW5kZXJlckJ1ZmZlcnMoKSxcbiAgICAgICAgICB2ZXJ0ZXhQb3NpdGlvbnNEYXRhID0gcmVuZGVyZXJEYXRhLmdldFZlcnRleFBvc2l0aW9uc0RhdGEoKSxcbiAgICAgICAgICB2ZXJ0ZXhOb3JtYWxzRGF0YSA9IHJlbmRlcmVyRGF0YS5nZXRWZXJ0ZXhOb3JtYWxzRGF0YSgpLFxuICAgICAgICAgIHZlcnRleEluZGV4ZXNEYXRhID0gcmVuZGVyZXJEYXRhLmdldFZlcnRleEluZGV4ZXNEYXRhKCksXG4gICAgICAgICAgdGV4dHVyZUNvb3JkaW5hdGVzRGF0YSA9IHJlbmRlcmVyRGF0YS5nZXRWZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNEYXRhKCk7XG5cbiAgICByZW5kZXJlckJ1ZmZlcnMuY3JlYXRlQnVmZmVycyh2ZXJ0ZXhQb3NpdGlvbnNEYXRhLCB2ZXJ0ZXhOb3JtYWxzRGF0YSwgdmVydGV4SW5kZXhlc0RhdGEsIHRleHR1cmVDb29yZGluYXRlc0RhdGEsIGNhbnZhcyk7XG4gIH1cblxuICBiaW5kQnVmZmVycyhjYW52YXMpIHtcbiAgICBjb25zdCByZW5kZXJlckJ1ZmZlcnMgPSB0aGlzLmdldFJlbmRlcmVyQnVmZmVycygpLFxuICAgICAgICAgIHZlcnRleE5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uID0gdGhpcy5nZXRWZXJ0ZXhOb3JtYWxBdHRyaWJ1dGVMb2NhdGlvbigpLFxuICAgICAgICAgIHZlcnRleFBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSB0aGlzLmdldFZlcnRleFBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24oKSxcbiAgICAgICAgICB0ZXh0dXJlQ29vcmRpbmF0ZUF0dHJpYnV0ZUxvY2F0aW9uID0gdGhpcy5nZXRUZXh0dXJlQ29vcmRpbmF0ZUF0dHJpYnV0ZUxvY2F0aW9uKCk7XG5cbiAgICByZW5kZXJlckJ1ZmZlcnMuYmluZEJ1ZmZlcnModmVydGV4Tm9ybWFsQXR0cmlidXRlTG9jYXRpb24sIHZlcnRleFBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIHRleHR1cmVDb29yZGluYXRlQXR0cmlidXRlTG9jYXRpb24sIGNhbnZhcyk7XG4gIH1cblxuICBhY3RpdmF0ZVRleHR1cmUoY2FudmFzKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCksXG4gICAgICAgICAgeyBURVhUVVJFMCB9ID0gY29udGV4dCxcbiAgICAgICAgICB0YXJnZXQgPSBURVhUVVJFMCwgIC8vL1xuICAgICAgICAgIHVuaWZvcm1Mb2NhdGlvbnMgPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbnMoKSxcbiAgICAgICAgICBzYW1wbGVyVW5pZm9ybUxvY2F0aW9uID0gdW5pZm9ybUxvY2F0aW9ucy5nZXRTYW1wbGVyVW5pZm9ybUxvY2F0aW9uKCksXG4gICAgICAgICAgdVNhbXBsZXJVbmlmb3JtTG9jYXRpb25JbnRlZ2VyVmFsdWUgPSAwO1xuXG4gICAgY2FudmFzLmFjdGl2YXRlVGV4dHVyZSh0YXJnZXQpO1xuXG4gICAgY2FudmFzLnNldFVuaWZvcm1Mb2NhdGlvbkludGVnZXJWYWx1ZShzYW1wbGVyVW5pZm9ybUxvY2F0aW9uLCB1U2FtcGxlclVuaWZvcm1Mb2NhdGlvbkludGVnZXJWYWx1ZSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUltYWdlTWFwQW5kSW1hZ2VNYXBKU09OKGltYWdlTWFwID0gbnVsbCwgaW1hZ2VNYXBKU09OID0gbnVsbCwgY2FudmFzKSB7XG4gICAgY29uc3QgcHJvZ3JhbSA9IGNyZWF0ZVByb2dyYW0odmVydGV4U2hhZGVyU291cmNlLCBmcmFnbWVudFNoYWRlclNvdXJjZSwgY2FudmFzKSxcbiAgICAgICAgICB0ZXh0dXJlUmVuZGVyZXJEYXRhID0gVGV4dHVyZVJlbmRlcmVyRGF0YS5mcm9tTm90aGluZygpLFxuICAgICAgICAgIHRleHR1cmVSZW5kZXJlckJ1ZmZlcnMgPSBUZXh0dXJlUmVuZGVyZXJCdWZmZXJzLmZyb21Ob3RoaW5nKCksXG4gICAgICAgICAgcmVuZGVyZXJEYXRhID0gdGV4dHVyZVJlbmRlcmVyRGF0YSwgIC8vL1xuICAgICAgICAgIHJlbmRlcmVyQnVmZmVycyA9IHRleHR1cmVSZW5kZXJlckJ1ZmZlcnMsIC8vL1xuICAgICAgICAgIHVuaWZvcm1Mb2NhdGlvbnMgPSBUZXh0dXJlVW5pZm9ybUxvY2F0aW9ucy5mcm9tUHJvZ3JhbShwcm9ncmFtLCBjYW52YXMpLFxuICAgICAgICAgIGF0dHJpYnV0ZUxvY2F0aW9ucyA9IFRleHR1cmVBdHRyaWJ1dGVMb2NhdGlvbnMuZnJvbVByb2dyYW0ocHJvZ3JhbSwgY2FudmFzKSxcbiAgICAgICAgICB0ZXh0dXJlUmVuZGVyZXIgPSBuZXcgVGV4dHVyZVJlbmRlcmVyKHByb2dyYW0sIHJlbmRlcmVyRGF0YSwgcmVuZGVyZXJCdWZmZXJzLCB1bmlmb3JtTG9jYXRpb25zLCBhdHRyaWJ1dGVMb2NhdGlvbnMsIGltYWdlTWFwSlNPTik7XG5cbiAgICBpZiAoaW1hZ2VNYXAgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGltYWdlID0gaW1hZ2VNYXA7XHQvLy9cblxuICAgICAgY2FudmFzLmNyZWF0ZVRleHR1cmUoaW1hZ2UpO1xuICAgIH1cblxuICAgIHJldHVybiB0ZXh0dXJlUmVuZGVyZXI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0dXJlUmVuZGVyZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUhhbGZBbmdsZVNpbmUoYW5nbGVDb3NpbmUpIHsgcmV0dXJuIE1hdGguc3FydCgoMSAtIGFuZ2xlQ29zaW5lKSAvIDIpOyB9XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUhhbGZBbmdsZUNvc2luZShhbmdsZUNvc2luZSkgeyByZXR1cm4gTWF0aC5zcXJ0KCgxICsgYW5nbGVDb3NpbmUpIC8gMik7IH1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNhbGN1bGF0ZUhhbGZBbmdsZVNpbmUsXG4gIGNhbGN1bGF0ZUhhbGZBbmdsZUNvc2luZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbmNvbnN0IHsgREVGQVVMVF9NQVJHSU5fT0ZfRVJST1IgfSA9IGNvbnN0YW50cztcblxuZnVuY3Rpb24gaXNBcHByb3hpbWF0ZWx5RXF1YWxUb09uZSh2YWx1ZSwgbWFyZ2luT2ZFcnJvciA9IERFRkFVTFRfTUFSR0lOX09GX0VSUk9SKSB7IHJldHVybiBpc0FwcHJveGltYXRlbHlFcXVhbFRvKHZhbHVlLCAxLCBtYXJnaW5PZkVycm9yKTsgfVxuXG5mdW5jdGlvbiBpc0FwcHJveGltYXRlbHlFcXVhbFRvWmVybyh2YWx1ZSwgbWFyZ2luT2ZFcnJvciA9IERFRkFVTFRfTUFSR0lOX09GX0VSUk9SKSB7IHJldHVybiBpc0FwcHJveGltYXRlbHlFcXVhbFRvKHZhbHVlLCAwLCBtYXJnaW5PZkVycm9yKTsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcHByb3hpbWF0ZWx5RXF1YWxUb09uZSxcbiAgaXNBcHByb3hpbWF0ZWx5RXF1YWxUb1plcm9cbn07XG5cbmZ1bmN0aW9uIGlzQXBwcm94aW1hdGVseUVxdWFsVG8odmFsdWVBLCB2YWx1ZUIsIG1hcmdpbk9mRXJyb3IgPSBERUZBVUxUX01BUkdJTl9PRl9FUlJPUikge1xuICBjb25zdCBkaWZmZXJlbmNlID0gdmFsdWVBIC0gdmFsdWVCLFxuICAgICAgICBhYnNvbHV0ZURpZmZlcmVuY2UgPSBNYXRoLmFicyhkaWZmZXJlbmNlKSxcbiAgICAgICAgYXBwcm94aW1hdGVseUVxdWFsID0gKGFic29sdXRlRGlmZmVyZW5jZSA8IG1hcmdpbk9mRXJyb3IpO1xuXG4gIHJldHVybiBhcHByb3hpbWF0ZWx5RXF1YWw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCB7IGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3Nhcnk7XG5cbmZ1bmN0aW9uIHBlcm11dGUoYXJyYXksIHBsYWNlcykge1xuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICAgIGN1dCA9IGxlbmd0aCAtIHBsYWNlcyxcbiAgICAgICAgbGVhZGluZ0VsZW1lbnRzID0gYXJyYXkuc2xpY2UoMCwgY3V0KSxcbiAgICAgICAgdHJhaWxpbmdFbGVtZW50cyA9IGFycmF5LnNsaWNlKGN1dCk7XG5cbiAgYXJyYXkgPSBbLi4udHJhaWxpbmdFbGVtZW50cywgLi4ubGVhZGluZ0VsZW1lbnRzXTtcblxuICByZXR1cm4gYXJyYXk7XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW4oYXJyYXlzKSB7XG4gIHJldHVybiBhcnJheXMucmVkdWNlKChlbGVtZW50cywgYXJyYXkpID0+IGVsZW1lbnRzLmNvbmNhdChhcnJheSksIFtdKTtcbn1cblxuZnVuY3Rpb24gZ3VhcmFudGVlKGFycmF5T3JFbGVtZW50KSB7XG4gIGFycmF5T3JFbGVtZW50ID0gYXJyYXlPckVsZW1lbnQgfHwgW107XG5cbiAgcmV0dXJuIChhcnJheU9yRWxlbWVudCBpbnN0YW5jZW9mIEFycmF5KSA/XG4gICAgICAgICAgIGFycmF5T3JFbGVtZW50IDpcbiAgICAgICAgICAgIFthcnJheU9yRWxlbWVudF07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbihhcnJheVV0aWxpdGllcywge1xuICBwZXJtdXRlLFxuICBmbGF0dGVuLFxuICBndWFyYW50ZWVcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKSxcbiAgICAgIG1hdHJpeE1hdGhzID0gcmVxdWlyZSgnLi4vbWF0aHMvbWF0cml4JyksXG4gICAgICBhcnJheVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9hcnJheScpO1xuXG5jb25zdCB7IGZpcnN0LCBzZWNvbmQsIHRoaXJkIH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgRklFTERfT0ZfVklFVywgWl9ORUFSLCBaX0ZBUiB9ID0gY29uc3RhbnRzLFxuICAgICAgeyBpZGVudGl0eTQsIGludmVydDQsIHJvdGF0ZTQsIHRyYW5zbGF0ZTQsIHRyYW5zcG9zZTQsIHBlcnNwZWN0aXZlNCB9ID0gbWF0cml4TWF0aHM7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZU9mZnNldE1hdHJpeChvZmZzZXQpIHtcbiAgbGV0IG9mZnNldE1hdHJpeCA9IGlkZW50aXR5NCgpO1xuXG4gIG9mZnNldE1hdHJpeCA9IHRyYW5zbGF0ZTQob2Zmc2V0TWF0cml4LCBvZmZzZXQpO1xuXG4gIHJldHVybiBvZmZzZXRNYXRyaXg7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVJvdGF0aW9uTWF0cml4KGFuZ2xlcykge1xuICBjb25zdCBmaXJzdEFuZ2xlID0gZmlyc3QoYW5nbGVzKSxcbiAgICAgICAgc2Vjb25kQW5nbGUgPSBzZWNvbmQoYW5nbGVzKSxcbiAgICAgICAgdGhpcmRBbmdsZSA9IHRoaXJkKGFuZ2xlcyksXG4gICAgICAgIHhBbmdsZSA9IGZpcnN0QW5nbGUsXG4gICAgICAgIHlBbmdsZSA9IHNlY29uZEFuZ2xlLFxuICAgICAgICB6QW5nbGUgPSB0aGlyZEFuZ2xlO1xuXG4gIGxldCByb3RhdGlvbk1hdHJpeCA9IGlkZW50aXR5NCgpO1xuXG4gIHJvdGF0aW9uTWF0cml4ID0gcm90YXRlNChyb3RhdGlvbk1hdHJpeCwgeEFuZ2xlLCBbMSwgMCwgMF0pO1xuICByb3RhdGlvbk1hdHJpeCA9IHJvdGF0ZTQocm90YXRpb25NYXRyaXgsIHlBbmdsZSwgWzAsIDEsIDBdKTtcbiAgcm90YXRpb25NYXRyaXggPSByb3RhdGU0KHJvdGF0aW9uTWF0cml4LCB6QW5nbGUsIFswLCAwLCAxXSk7XG5cbiAgcmV0dXJuIHJvdGF0aW9uTWF0cml4O1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVQb3NpdGlvbk1hdHJpeChkaXN0YW5jZSkge1xuICBjb25zdCB4ID0gMCxcbiAgICAgICAgeSA9IDAsXG4gICAgICAgIHogPSAtZGlzdGFuY2U7XG5cbiAgbGV0IHBvc2l0aW9uTWF0cml4ID0gaWRlbnRpdHk0KCk7XG5cbiAgcG9zaXRpb25NYXRyaXggPSB0cmFuc2xhdGU0KHBvc2l0aW9uTWF0cml4LCBbIHgsIHksIHogXSk7XG5cbiAgcmV0dXJuIHBvc2l0aW9uTWF0cml4O1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVQcm9qZWN0aW9uTWF0cml4KHdpZHRoLCBoZWlnaHQpIHtcbiAgY29uc3QgZmllbGRPZlZpZXcgPSBGSUVMRF9PRl9WSUVXLFxuICAgICAgICBhc3BlY3RSYXRpbyA9IHdpZHRoIC8gaGVpZ2h0LFxuICAgICAgICB6TmVhciA9IFpfTkVBUixcbiAgICAgICAgekZhciA9IFpfRkFSLFxuICAgICAgICBwcm9qZWN0aW9uTWF0cml4ID0gcGVyc3BlY3RpdmU0KGZpZWxkT2ZWaWV3LCBhc3BlY3RSYXRpbywgek5lYXIsIHpGYXIpO1xuXG4gIHJldHVybiBwcm9qZWN0aW9uTWF0cml4O1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVOb3JtYWxNYXRyaXgocm90YXRpb25NYXRyaXgpIHtcbiAgbGV0IG5vcm1hbE1hdHJpeCA9IGludmVydDQocm90YXRpb25NYXRyaXgpO1xuXG4gIG5vcm1hbE1hdHJpeCA9IHRyYW5zcG9zZTQobm9ybWFsTWF0cml4KTtcblxuICByZXR1cm4gbm9ybWFsTWF0cml4O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2FsY3VsYXRlT2Zmc2V0TWF0cml4LFxuICBjYWxjdWxhdGVSb3RhdGlvbk1hdHJpeCxcbiAgY2FsY3VsYXRlUG9zaXRpb25NYXRyaXgsXG4gIGNhbGN1bGF0ZVByb2plY3Rpb25NYXRyaXgsXG4gIGNhbGN1bGF0ZU5vcm1hbE1hdHJpeFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyksXG4gICAgICB2ZWN0b3JNYXRocyA9IHJlcXVpcmUoJy4uL21hdGhzL3ZlY3RvcicpLFxuICAgICAgYXJyYXlVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvYXJyYXknKTtcblxuY29uc3QgeyBWRVJUSUNFU19MRU5HVEggfSA9IGNvbnN0YW50cyxcbiAgICAgIHsgZmlyc3QsIHNlY29uZCwgdGhpcmQgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBzdWJ0cmFjdDMsIGNyb3NzMywgbGVuZ3RoMyB9ID0gdmVjdG9yTWF0aHM7XG5cbmZ1bmN0aW9uIGNsb25lRWRnZXMoZWRnZXMpIHtcbiAgZWRnZXMgPSBlZGdlcy5tYXAoKGVkZ2UpID0+IGVkZ2UuY2xvbmUoKSk7XG5cbiAgcmV0dXJuIGVkZ2VzO1xufVxuXG5mdW5jdGlvbiBjbG9uZU5vcm1hbChub3JtYWwpIHtcbiAgbm9ybWFsID0gbm9ybWFsLmNsb25lKCk7XG4gIFxuICByZXR1cm4gbm9ybWFsO1xufVxuXG5mdW5jdGlvbiBjbG9uZVZlcnRpY2VzKHZlcnRpY2VzKSB7XG4gIHZlcnRpY2VzID0gdmVydGljZXMubWFwKCh2ZXJ0ZXgpID0+IHZlcnRleC5jbG9uZSgpKTtcblxuICByZXR1cm4gdmVydGljZXM7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUVkZ2VzKHZlcnRpY2VzLCBFZGdlKSB7XG4gIGNvbnN0IGVkZ2VzID0gdmVydGljZXMubWFwKCh2ZXJ0ZXgsIGluZGV4KSA9PiB7XG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IGluZGV4LCAvLy9cbiAgICAgICAgICBlbmRJbmRleCA9IChzdGFydEluZGV4ICsgMSkgJSBWRVJUSUNFU19MRU5HVEgsXG4gICAgICAgICAgc3RhcnRWZXJ0ZXggPSB2ZXJ0aWNlc1tzdGFydEluZGV4XSxcbiAgICAgICAgICBlbmRWZXJ0ZXggPSB2ZXJ0aWNlc1tlbmRJbmRleF0sXG4gICAgICAgICAgZWRnZSA9IEVkZ2UuZnJvbVN0YXJ0VmVydGV4QW5kRW5kVmVydGV4KHN0YXJ0VmVydGV4LCBlbmRWZXJ0ZXgpO1xuXG4gICAgcmV0dXJuIGVkZ2U7XG4gIH0pO1xuXG4gIHJldHVybiBlZGdlcztcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlTm9ybWFsKHZlcnRpY2VzLCBOb3JtYWwpIHtcbiAgY29uc3Qgbm9ybWFsID0gTm9ybWFsLmZyb21WZXJ0aWNlcyh2ZXJ0aWNlcyk7XG5cbiAgcmV0dXJuIG5vcm1hbDtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlQXJlYSh2ZXJ0aWNlcykge1xuICBjb25zdCBmaXJzdFZlcnRleCA9IGZpcnN0KHZlcnRpY2VzKSxcbiAgICAgICAgc2Vjb25kVmVydGV4ID0gc2Vjb25kKHZlcnRpY2VzKSxcbiAgICAgICAgdGhpcmRWZXJ0ZXggPSB0aGlyZCh2ZXJ0aWNlcyksXG4gICAgICAgIGZpcnN0VmVydGV4UG9zaXRpb24gPSBmaXJzdFZlcnRleC5nZXRQb3NpdGlvbigpLFxuICAgICAgICBzZWNvbmRWZXJ0ZXhQb3NpdGlvbiA9IHNlY29uZFZlcnRleC5nZXRQb3NpdGlvbigpLFxuICAgICAgICB0aGlyZFZlcnRleFBvc2l0aW9uID0gdGhpcmRWZXJ0ZXguZ2V0UG9zaXRpb24oKSxcbiAgICAgICAgZmlyc3RFeHRlbnQgPSBzdWJ0cmFjdDMoc2Vjb25kVmVydGV4UG9zaXRpb24sIGZpcnN0VmVydGV4UG9zaXRpb24pLFxuICAgICAgICBzZWNvbmRFeHRlbnQgPSBzdWJ0cmFjdDModGhpcmRWZXJ0ZXhQb3NpdGlvbiwgZmlyc3RWZXJ0ZXhQb3NpdGlvbiksXG4gICAgICAgIGFyZWEgPSBsZW5ndGgzKGNyb3NzMyhmaXJzdEV4dGVudCwgc2Vjb25kRXh0ZW50KSkgLyAyO1xuXG4gIHJldHVybiBhcmVhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2xvbmVFZGdlcyxcbiAgY2xvbmVOb3JtYWwsXG4gIGNsb25lVmVydGljZXMsXG4gIGNhbGN1bGF0ZUVkZ2VzLFxuICBjYWxjdWxhdGVOb3JtYWwsXG4gIGNhbGN1bGF0ZUFyZWFcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHZlY3Rvck1hdGhzID0gcmVxdWlyZSgnLi4vbWF0aHMvdmVjdG9yJyksXG4gICAgICBhcnJheVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9hcnJheScpLFxuICAgICAgYXBwcm94aW1hdGVVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvYXBwcm94aW1hdGUnKTtcblxuY29uc3QgeyBhZGQzLCBzdWJ0cmFjdDMsIHNjYWxlMyB9ID0gdmVjdG9yTWF0aHMsXG4gICAgICB7IGZpcnN0LCBzZWNvbmQgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBpc0FwcHJveGltYXRlbHlFcXVhbFRvWmVybyB9ID0gYXBwcm94aW1hdGVVdGlsaXRpZXM7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUludGVyc2VjdGlvbihlZGdlLCBmaXJzdFBvc2l0aW9uQ29tcG9uZW50KSB7XG4gIGxldCBpbnRlcnNlY3Rpb24gPSBudWxsO1xuXG4gIGNvbnN0IGVkZ2VOb25QYXJhbGxlbCA9IGlzRWRnZU5vblBhcmFsbGVsKGVkZ2UpO1xuXG4gIGlmIChlZGdlTm9uUGFyYWxsZWwpIHtcbiAgICBjb25zdCBlZGdlSW50ZXJzZWN0aW9uID0gY2FsY3VsYXRlRWRnZUludGVyc2VjdGlvbihlZGdlLCBmaXJzdFBvc2l0aW9uQ29tcG9uZW50KSxcbiAgICAgICAgICBlZGdlSW50ZXJzZWN0aW9uTm9uVHJpdmlhbCA9ICgoZWRnZUludGVyc2VjdGlvbiA+IDAgKSAmJiAoZWRnZUludGVyc2VjdGlvbiA8IDEpKTtcblxuICAgIGlmIChlZGdlSW50ZXJzZWN0aW9uTm9uVHJpdmlhbCkge1xuICAgICAgaW50ZXJzZWN0aW9uID0gZWRnZUludGVyc2VjdGlvbjsgIC8vL1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpbnRlcnNlY3Rpb247XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZU5vbk51bGxJbnRlcnNlY3Rpb25zKGludGVyc2VjdGlvbnMpIHtcbiAgY29uc3Qgbm9uTnVsbEludGVyc2VjdGlvbnMgPSBpbnRlcnNlY3Rpb25zLnJlZHVjZSgobm9uTnVsbEludGVyc2VjdGlvbnMsIGludGVyc2VjdGlvbikgPT4ge1xuICAgIGlmIChpbnRlcnNlY3Rpb24gIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG5vbk51bGxJbnRlcnNlY3Rpb24gPSBpbnRlcnNlY3Rpb247IC8vL1xuXG4gICAgICBub25OdWxsSW50ZXJzZWN0aW9ucy5wdXNoKG5vbk51bGxJbnRlcnNlY3Rpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBub25OdWxsSW50ZXJzZWN0aW9ucztcbiAgfSwgW10pO1xuXG4gIHJldHVybiBub25OdWxsSW50ZXJzZWN0aW9ucztcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlTnVsbEludGVyc2VjdGlvbkluZGV4KGludGVyc2VjdGlvbnMpIHtcbiAgY29uc3QgbnVsbEludGVyc2VjdGlvbkluZGV4ID0gaW50ZXJzZWN0aW9ucy5yZWR1Y2UoKG51bGxJbnRlcnNlY3Rpb25JbmRleCwgaW50ZXJzZWN0aW9uLCBpbmRleCkgPT4ge1xuICAgIGlmIChudWxsSW50ZXJzZWN0aW9uSW5kZXggPT09IG51bGwpIHtcbiAgICAgIGlmIChpbnRlcnNlY3Rpb24gPT09IG51bGwpIHtcbiAgICAgICAgbnVsbEludGVyc2VjdGlvbkluZGV4ID0gaW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGxJbnRlcnNlY3Rpb25JbmRleDtcbiAgfSwgbnVsbCk7XG5cbiAgcmV0dXJuIG51bGxJbnRlcnNlY3Rpb25JbmRleDtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlTm9uTnVsbEludGVyc2VjdGlvbkluZGV4KGludGVyc2VjdGlvbnMpIHtcbiAgY29uc3QgbnVsbEludGVyc2VjdGlvbkluZGV4ID0gaW50ZXJzZWN0aW9ucy5yZWR1Y2UoKG51bGxJbnRlcnNlY3Rpb25JbmRleCwgaW50ZXJzZWN0aW9uLCBpbmRleCkgPT4ge1xuICAgIGlmIChudWxsSW50ZXJzZWN0aW9uSW5kZXggPT09IG51bGwpIHtcbiAgICAgIGlmIChpbnRlcnNlY3Rpb24gIT09IG51bGwpIHtcbiAgICAgICAgbnVsbEludGVyc2VjdGlvbkluZGV4ID0gaW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGxJbnRlcnNlY3Rpb25JbmRleDtcbiAgfSwgbnVsbCk7XG5cbiAgcmV0dXJuIG51bGxJbnRlcnNlY3Rpb25JbmRleDtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlSW50ZXJtZWRpYXRlVmVydGV4UG9zaXRpb24oc3RhcnRWZXJ0ZXhQb3NpdGlvbiwgZW5kVmVydGV4UG9zaXRpb24sIGludGVyc2VjdGlvbikge1xuICBjb25zdCBleHRlbnQgPSBzdWJ0cmFjdDMoZW5kVmVydGV4UG9zaXRpb24sIHN0YXJ0VmVydGV4UG9zaXRpb24pLFxuICAgICAgICBvZmZzZXQgPSBzY2FsZTMoZXh0ZW50LCBpbnRlcnNlY3Rpb24pLFxuICAgICAgICBpbnRlcm1lZGlhdGVWZXJ0ZXhQb3NpdGlvbiA9IGFkZDMoc3RhcnRWZXJ0ZXhQb3NpdGlvbiwgb2Zmc2V0KTtcblxuICByZXR1cm4gaW50ZXJtZWRpYXRlVmVydGV4UG9zaXRpb247XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNhbGN1bGF0ZUludGVyc2VjdGlvbixcbiAgY2FsY3VsYXRlTm9uTnVsbEludGVyc2VjdGlvbnMsXG4gIGNhbGN1bGF0ZU51bGxJbnRlcnNlY3Rpb25JbmRleCxcbiAgY2FsY3VsYXRlTm9uTnVsbEludGVyc2VjdGlvbkluZGV4LFxuICBjYWxjdWxhdGVJbnRlcm1lZGlhdGVWZXJ0ZXhQb3NpdGlvblxufTtcblxuZnVuY3Rpb24gaXNFZGdlTm9uUGFyYWxsZWwoZWRnZSkge1xuICBjb25zdCBlZGdlRXh0ZW50ID0gZWRnZS5nZXRFeHRlbnQoKSxcbiAgICAgICAgZWRnZUV4dGVudENvbXBvbmVudHMgPSBlZGdlRXh0ZW50LCAvLy9cbiAgICAgICAgZmlyc3RFZGdlRXh0ZW50Q29tcG9uZW50ID0gZmlyc3QoZWRnZUV4dGVudENvbXBvbmVudHMpLFxuICAgICAgICBzZWNvbmRFZGdlRXh0ZW50Q29tcG9uZW50ID0gc2Vjb25kKGVkZ2VFeHRlbnRDb21wb25lbnRzKSxcbiAgICAgICAgZWRnZUFuZ2xlVGFuZ2VudCA9IGZpcnN0RWRnZUV4dGVudENvbXBvbmVudCAvIHNlY29uZEVkZ2VFeHRlbnRDb21wb25lbnQsXG4gICAgICAgIGVkZ2VBbmdsZVRhbmdlbnRBcHByb3hpbWF0ZWx5RXF1YWxUb1plcm8gPSBpc0FwcHJveGltYXRlbHlFcXVhbFRvWmVybyhlZGdlQW5nbGVUYW5nZW50KSxcbiAgICAgICAgZWRnZVBhcmFsbGVsID0gZWRnZUFuZ2xlVGFuZ2VudEFwcHJveGltYXRlbHlFcXVhbFRvWmVybywgLy8vXG4gICAgICAgIGVkZ2VOb25QYXJhbGxlbCA9ICFlZGdlUGFyYWxsZWw7XG5cbiAgcmV0dXJuIGVkZ2VOb25QYXJhbGxlbDtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlRWRnZUludGVyc2VjdGlvbihlZGdlLCBmaXJzdFBvc2l0aW9uQ29tcG9uZW50KSB7XG4gIGNvbnN0IGVkZ2VFeHRlbnQgPSBlZGdlLmdldEV4dGVudCgpLFxuICAgICAgICBlZGdlUG9zaXRpb24gPSBlZGdlLmdldFBvc2l0aW9uKCksXG4gICAgICAgIGVkZ2VFeHRlbnRDb21wb25lbnRzID0gZWRnZUV4dGVudCwgLy8vXG4gICAgICAgIGVkZ2VQb3NpdGlvbkNvbXBvbmVudHMgPSBlZGdlUG9zaXRpb24sIC8vL1xuICAgICAgICBmaXJzdEVkZ2VFeHRlbnRDb21wb25lbnQgPSBmaXJzdChlZGdlRXh0ZW50Q29tcG9uZW50cyksXG4gICAgICAgIGZpcnN0RWRnZVBvc2l0aW9uQ29tcG9uZW50ID0gZmlyc3QoZWRnZVBvc2l0aW9uQ29tcG9uZW50cyksXG4gICAgICAgIGVkZ2VJbnRlcnNlY3Rpb24gPSAoZmlyc3RQb3NpdGlvbkNvbXBvbmVudCAtIGZpcnN0RWRnZVBvc2l0aW9uQ29tcG9uZW50KSAvIGZpcnN0RWRnZUV4dGVudENvbXBvbmVudDtcblxuICByZXR1cm4gZWRnZUludGVyc2VjdGlvbjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdmVjdG9yTWF0aHMgPSByZXF1aXJlKCcuLi9tYXRocy92ZWN0b3InKTtcblxuY29uc3QgeyBhZGQzLCBzY2FsZTMgfSA9IHZlY3Rvck1hdGhzO1xuXG5mdW5jdGlvbiBjYWxjdWxhdGVNaWRQb2ludFBvc2l0aW9uKHZlcnRpY2VzKSB7XG4gIGNvbnN0IG1pZFBvaW50UG9zaXRpb24gPSB2ZXJ0aWNlcy5yZWR1Y2UoKG1pZFBvaW50UG9zaXRpb24sIHZlcnRleCkgPT4ge1xuICAgIGNvbnN0IHZlcnRleFBvc2l0aW9uID0gdmVydGV4LmdldFBvc2l0aW9uKCksXG4gICAgICAgICAgc2NhbGVkVmVydGV4UG9zaXRpb24gPSBzY2FsZTModmVydGV4UG9zaXRpb24sIDEvMyk7XG5cbiAgICBtaWRQb2ludFBvc2l0aW9uID0gYWRkMyhtaWRQb2ludFBvc2l0aW9uLCBzY2FsZWRWZXJ0ZXhQb3NpdGlvbik7XG5cbiAgICByZXR1cm4gbWlkUG9pbnRQb3NpdGlvbjtcbiAgfSwgWyAwLCAwLCAwIF0pO1xuXG4gIHJldHVybiBtaWRQb2ludFBvc2l0aW9uO1xufVxuXG5mdW5jdGlvbiBwcm9qZWN0TWlkUG9pbnRQb3NpdGlvbk9udG9YWVBsYW5lKG1pZFBvaW50UG9zaXRpb24pIHtcbiAgbWlkUG9pbnRQb3NpdGlvbiA9IFsuLi5taWRQb2ludFBvc2l0aW9uLnNsaWNlKDAsIDIpLCAwXTsgIC8vL1xuXG4gIHJldHVybiBtaWRQb2ludFBvc2l0aW9uO1xufVxuXG5mdW5jdGlvbiBpc01pZFBvaW50UG9zaXRpb25Ub09uZVNpZGVPZk1hc2tpbmdFZGdlcyhtaWRQb2ludFBvc2l0aW9uLCBtYXNraW5nRWRnZXMpIHtcbiAgY29uc3QgbWlkUG9pbnRQb3NpdGlvblRvVGhlTGVmdE9mTWFza2luZ0VkZ2VzID0gaXNNaWRQb2ludFBvc2l0aW9uVG9UaGVMZWZ0T2ZNYXNraW5nRWRnZXMobWlkUG9pbnRQb3NpdGlvbiwgbWFza2luZ0VkZ2VzKSxcbiAgICAgICAgbWlkUG9pbnRQb3NpdGlvblRvVGhlUmlnaHRPZk1hc2tpbmdFZGdlcyA9IGlzTWlkUG9pbnRQb3NpdGlvblRvVGhlUmlnaHRPZk1hc2tpbmdFZGdlcyhtaWRQb2ludFBvc2l0aW9uLCBtYXNraW5nRWRnZXMpLFxuICAgICAgICBtaWRQb2ludFBvc2l0aW9uVG9PbmVTaWRlT2ZNYXNraW5nRWRnZXMgPSBtaWRQb2ludFBvc2l0aW9uVG9UaGVMZWZ0T2ZNYXNraW5nRWRnZXMgfHwgbWlkUG9pbnRQb3NpdGlvblRvVGhlUmlnaHRPZk1hc2tpbmdFZGdlczsgLy8vXG5cbiAgcmV0dXJuIG1pZFBvaW50UG9zaXRpb25Ub09uZVNpZGVPZk1hc2tpbmdFZGdlcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2FsY3VsYXRlTWlkUG9pbnRQb3NpdGlvbixcbiAgcHJvamVjdE1pZFBvaW50UG9zaXRpb25PbnRvWFlQbGFuZSxcbiAgaXNNaWRQb2ludFBvc2l0aW9uVG9PbmVTaWRlT2ZNYXNraW5nRWRnZXNcbn07XG5cbmZ1bmN0aW9uIGlzTWlkUG9pbnRQb3NpdGlvblRvVGhlTGVmdE9mTWFza2luZ0VkZ2VzKG1pZFBvaW50UG9zaXRpb24sIG1hc2tpbmdFZGdlcykge1xuICBjb25zdCBtaWRQb2ludFBvc2l0aW9uVG9UaGVMZWZ0T2ZNYXNraW5nRWRnZXMgPSBtYXNraW5nRWRnZXMucmVkdWNlKChtaWRQb2ludFBvc2l0aW9uVG9UaGVMZWZ0T2ZNYXNraW5nRWRnZXMsIG1hc2tpbmdFZGdlKSA9PiB7XG4gICAgaWYgKG1pZFBvaW50UG9zaXRpb25Ub1RoZUxlZnRPZk1hc2tpbmdFZGdlcykge1xuICAgICAgY29uc3QgbWlkUG9pbnRQb3NpdGlvblRvVGhlTGVmdE9mTWFza2luZ0VkZ2UgPSBtYXNraW5nRWRnZS5pc01pZFBvaW50UG9zaXRpb25Ub1RoZUxlZnQobWlkUG9pbnRQb3NpdGlvbik7XG5cbiAgICAgIG1pZFBvaW50UG9zaXRpb25Ub1RoZUxlZnRPZk1hc2tpbmdFZGdlcyA9IG1pZFBvaW50UG9zaXRpb25Ub1RoZUxlZnRPZk1hc2tpbmdFZGdlO1xuICAgIH1cblxuICAgIHJldHVybiBtaWRQb2ludFBvc2l0aW9uVG9UaGVMZWZ0T2ZNYXNraW5nRWRnZXM7XG4gIH0sIHRydWUpO1xuXG4gIHJldHVybiBtaWRQb2ludFBvc2l0aW9uVG9UaGVMZWZ0T2ZNYXNraW5nRWRnZXM7XG59XG5cbmZ1bmN0aW9uIGlzTWlkUG9pbnRQb3NpdGlvblRvVGhlUmlnaHRPZk1hc2tpbmdFZGdlcyhtaWRQb2ludFBvc2l0aW9uLCBtYXNraW5nRWRnZXMpIHtcbiAgY29uc3QgbWlkUG9pbnRQb3NpdGlvblRvVGhlUmlnaHRPZk1hc2tpbmdFZGdlcyA9IG1hc2tpbmdFZGdlcy5yZWR1Y2UoKG1pZFBvaW50UG9zaXRpb25Ub1RoZVJpZ2h0T2ZNYXNraW5nRWRnZXMsIG1hc2tpbmdFZGdlKSA9PiB7XG4gICAgaWYgKG1pZFBvaW50UG9zaXRpb25Ub1RoZVJpZ2h0T2ZNYXNraW5nRWRnZXMpIHtcbiAgICAgIGNvbnN0IG1pZFBvaW50UG9zaXRpb25Ub1RoZVJpZ2h0T2ZNYXNraW5nRWRnZSA9IG1hc2tpbmdFZGdlLmlzTWlkUG9pbnRQb3NpdGlvblRvVGhlUmlnaHQobWlkUG9pbnRQb3NpdGlvbik7XG5cbiAgICAgIG1pZFBvaW50UG9zaXRpb25Ub1RoZVJpZ2h0T2ZNYXNraW5nRWRnZXMgPSBtaWRQb2ludFBvc2l0aW9uVG9UaGVSaWdodE9mTWFza2luZ0VkZ2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1pZFBvaW50UG9zaXRpb25Ub1RoZVJpZ2h0T2ZNYXNraW5nRWRnZXM7XG4gIH0sIHRydWUpO1xuXG4gIHJldHVybiBtaWRQb2ludFBvc2l0aW9uVG9UaGVSaWdodE9mTWFza2luZ0VkZ2VzO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB2ZWN0b3JNYXRocyA9IHJlcXVpcmUoJy4uL21hdGhzL3ZlY3RvcicpLFxuICAgICAgYXJyYXlVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvYXJyYXknKSxcbiAgICAgIGFuZ2xlVXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL2FuZ2xlJyksXG4gICAgICBhcHByb3hpbWF0ZVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9hcHByb3hpbWF0ZScpO1xuXG5jb25zdCB7IGRvdDMsIGNyb3NzMywgbm9ybWFsaXNlMyB9ID0gdmVjdG9yTWF0aHMsXG4gICAgICB7IGlzQXBwcm94aW1hdGVseUVxdWFsVG9PbmUgfSA9IGFwcHJveGltYXRlVXRpbGl0aWVzLFxuICAgICAgeyBmaXJzdCwgc2Vjb25kLCB0aGlyZCwgZm91cnRoIH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgY2FsY3VsYXRlSGFsZkFuZ2xlQ29zaW5lLCBjYWxjdWxhdGVIYWxmQW5nbGVTaW5lIH0gPSBhbmdsZVV0aWxpdGllcztcblxuZnVuY3Rpb24gcm90YXRlSW1hZ2luYXJ5UXVhdGVybmlvbihpbWFnaW5hcnlRdWF0ZXJuaW9uLCByb3RhdGlvblF1YXRlcm5pb24sIGludmVyc2VSb3RhdGlvblF1YXRlcm5pb24pIHsgcmV0dXJuIGhhbWlsdG9uUHJvZHVjdChoYW1pbHRvblByb2R1Y3Qocm90YXRpb25RdWF0ZXJuaW9uLCBpbWFnaW5hcnlRdWF0ZXJuaW9uKSwgaW52ZXJzZVJvdGF0aW9uUXVhdGVybmlvbik7IH1cblxuZnVuY3Rpb24gY2FsY3VsYXRlSW52ZXJzZVJvdGF0aW9uUXVhdGVybmlvbihyb3RhdGlvblF1YXRlcm5pb24pIHtcbiAgY29uc3Qgcm90YXRpb25RdWF0ZXJuaW9uQ29tcG9uZW50cyA9IHJvdGF0aW9uUXVhdGVybmlvbiwgIC8vL1xuICAgICAgICBmaXJzdFJvdGF0aW9uUXVhdGVybmlvbkNvbXBvbmVudCA9IGZpcnN0KHJvdGF0aW9uUXVhdGVybmlvbkNvbXBvbmVudHMpLFxuICAgICAgICBzZWNvbmRSb3RhdGlvblF1YXRlcm5pb25Db21wb25lbnQgPSBzZWNvbmQocm90YXRpb25RdWF0ZXJuaW9uQ29tcG9uZW50cyksXG4gICAgICAgIHRoaXJkUm90YXRpb25RdWF0ZXJuaW9uQ29tcG9uZW50ID0gdGhpcmQocm90YXRpb25RdWF0ZXJuaW9uQ29tcG9uZW50cyksXG4gICAgICAgIGZvdXJ0aFJvdGF0aW9uUXVhdGVybmlvbkNvbXBvbmVudCA9IGZvdXJ0aChyb3RhdGlvblF1YXRlcm5pb25Db21wb25lbnRzKSxcbiAgICAgICAgaW52ZXJzZVJvdGF0aW9uUXVhdGVybmlvbiA9IFtcbiAgICAgICAgICBmaXJzdFJvdGF0aW9uUXVhdGVybmlvbkNvbXBvbmVudCxcbiAgICAgICAgICAtc2Vjb25kUm90YXRpb25RdWF0ZXJuaW9uQ29tcG9uZW50LFxuICAgICAgICAgIC10aGlyZFJvdGF0aW9uUXVhdGVybmlvbkNvbXBvbmVudCxcbiAgICAgICAgICAtZm91cnRoUm90YXRpb25RdWF0ZXJuaW9uQ29tcG9uZW50XG4gICAgICAgIF07XG5cbiAgcmV0dXJuIGludmVyc2VSb3RhdGlvblF1YXRlcm5pb247XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUZvcndhcmRzUm90YXRpb25RdWF0ZXJuaW9uKHJvdGF0aW9uUXVhdGVybmlvbikge1xuICBjb25zdCBmb3J3YXJkc1JvdGF0aW9uUXVhdGVybmlvbiA9IHJvdGF0aW9uUXVhdGVybmlvbjsgIC8vL1xuXG4gIHJldHVybiBmb3J3YXJkc1JvdGF0aW9uUXVhdGVybmlvbjtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlQmFja3dhcmRzUm90YXRpb25RdWF0ZXJuaW9uKHJvdGF0aW9uUXVhdGVybmlvbikge1xuICBjb25zdCBpbnZlcnNlUm90YXRpb25RdWF0ZXJuaW9uID0gY2FsY3VsYXRlSW52ZXJzZVJvdGF0aW9uUXVhdGVybmlvbihyb3RhdGlvblF1YXRlcm5pb24pLFxuICAgICAgICBiYWNrd2FyZHNSb3RhdGlvblF1YXRlcm5pb24gPSBpbnZlcnNlUm90YXRpb25RdWF0ZXJuaW9uOyAgLy8vXG5cbiAgcmV0dXJuIGJhY2t3YXJkc1JvdGF0aW9uUXVhdGVybmlvbjtcblxufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVBcmJpdHJhcnlSb3RhdGlvblF1YXRlcm5pb24obm9ybWFsKSB7XG4gIGNvbnN0IGV4dGVudCA9IG5vcm1hbC5nZXRFeHRlbnQoKSxcbiAgICAgICAgdW5pdE5vcm1hbCA9IGV4dGVudCwgIC8vL1xuICAgICAgICB6QXhpcyA9IFsgMCwgMCwgMSBdLFxuICAgICAgICBkb3RQcm9kdWN0T2ZVbml0Tm9ybWFsQW5kWkF4aXMgPSBkb3QzKHVuaXROb3JtYWwsIHpBeGlzKSxcbiAgICAgICAgY3Jvc3NQcm9kdWN0T2ZVbml0Tm9ybWFsQW5kWkF4aXMgPSBjcm9zczModW5pdE5vcm1hbCwgekF4aXMpLFxuICAgICAgICBhbmdsZU9mUm90YXRpb25Db3NpbmUgPSBkb3RQcm9kdWN0T2ZVbml0Tm9ybWFsQW5kWkF4aXMsIC8vL1xuICAgICAgICBhbmdsZU9mUm90YXRpb25Db3NpbmVBYnNvbHV0ZVZhbHVlID0gTWF0aC5hYnMoYW5nbGVPZlJvdGF0aW9uQ29zaW5lKSxcbiAgICAgICAgYW5nbGVPZlJvdGF0aW9uQ29zaW5lQWJzb2x1dGVWYWx1ZUFwcHJveGltYXRlbHlFcXVhbFRvT25lID0gaXNBcHByb3hpbWF0ZWx5RXF1YWxUb09uZShhbmdsZU9mUm90YXRpb25Db3NpbmVBYnNvbHV0ZVZhbHVlKSxcbiAgICAgICAgYXhpc09mUm90YXRpb24gPSBhbmdsZU9mUm90YXRpb25Db3NpbmVBYnNvbHV0ZVZhbHVlQXBwcm94aW1hdGVseUVxdWFsVG9PbmUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICBbIDEsIDAsIDAgXSA6IC8vL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyb3NzUHJvZHVjdE9mVW5pdE5vcm1hbEFuZFpBeGlzLFxuICAgICAgICB1bml0QXhpc09mUm90YXRpb24gPSBub3JtYWxpc2UzKGF4aXNPZlJvdGF0aW9uKSxcbiAgICAgICAgaGFsZkFuZ2xlT2ZSb3RhdGlvbkNvc2luZSA9IGNhbGN1bGF0ZUhhbGZBbmdsZUNvc2luZShhbmdsZU9mUm90YXRpb25Db3NpbmUpLFxuICAgICAgICBoYWxmQW5nbGVPZlJvdGF0aW9uU2luZSA9IGNhbGN1bGF0ZUhhbGZBbmdsZVNpbmUoYW5nbGVPZlJvdGF0aW9uQ29zaW5lKSxcbiAgICAgICAgdW5pdEF4aXNPZlJvdGF0aW9uQ29tcG9uZW50cyA9IHVuaXRBeGlzT2ZSb3RhdGlvbiwgIC8vL1xuICAgICAgICBmaXJzdEF4aXNPZlJvdGF0aW9uQ29tcG9uZW50ID0gZmlyc3QodW5pdEF4aXNPZlJvdGF0aW9uQ29tcG9uZW50cyksXG4gICAgICAgIHNlY29uZEF4aXNPZlJvdGF0aW9uQ29tcG9uZW50ID0gc2Vjb25kKHVuaXRBeGlzT2ZSb3RhdGlvbkNvbXBvbmVudHMpLFxuICAgICAgICB0aGlyZEF4aXNPZlJvdGF0aW9uQ29tcG9uZW50ID0gdGhpcmQodW5pdEF4aXNPZlJvdGF0aW9uQ29tcG9uZW50cyksXG4gICAgICAgIGFyYml0cmFyeVJvdGF0aW9uUXVhdGVybmlvbiA9IFtcbiAgICAgICAgICBoYWxmQW5nbGVPZlJvdGF0aW9uQ29zaW5lLFxuICAgICAgICAgIGZpcnN0QXhpc09mUm90YXRpb25Db21wb25lbnQgKiBoYWxmQW5nbGVPZlJvdGF0aW9uU2luZSxcbiAgICAgICAgICBzZWNvbmRBeGlzT2ZSb3RhdGlvbkNvbXBvbmVudCAqIGhhbGZBbmdsZU9mUm90YXRpb25TaW5lLFxuICAgICAgICAgIHRoaXJkQXhpc09mUm90YXRpb25Db21wb25lbnQgKiBoYWxmQW5nbGVPZlJvdGF0aW9uU2luZVxuICAgICAgICBdO1xuXG4gIHJldHVybiBhcmJpdHJhcnlSb3RhdGlvblF1YXRlcm5pb247XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVJvdGF0aW9uQWJvdXRaQXhpc1F1YXRlcm5pb24obWFza2luZ0VkZ2UpIHtcbiAgY29uc3QgbWFza2luZ0VkZ2VFeHRlbnQgPSBtYXNraW5nRWRnZS5nZXRFeHRlbnQoKSxcbiAgICAgICAgdW5pdE1hc2tpbmdFZGdlRXh0ZW50ID0gbm9ybWFsaXNlMyhtYXNraW5nRWRnZUV4dGVudCksXG4gICAgICAgIHVuaXRNYXNraW5nRWRnZUV4dGVudENvbXBvbmVudHMgPSB1bml0TWFza2luZ0VkZ2VFeHRlbnQsICAvLy9cbiAgICAgICAgZmlyc3RVbml0TWFza2luZ0VkZ2VFeHRlbnRDb21wb25lbnQgPSBmaXJzdCh1bml0TWFza2luZ0VkZ2VFeHRlbnRDb21wb25lbnRzKSxcbiAgICAgICAgc2Vjb25kVW5pdE1hc2tpbmdFZGdlRXh0ZW50Q29tcG9uZW50ID0gc2Vjb25kKHVuaXRNYXNraW5nRWRnZUV4dGVudENvbXBvbmVudHMpLFxuICAgICAgICBhbmdsZU9mUm90YXRpb25TaW5lID0gZmlyc3RVbml0TWFza2luZ0VkZ2VFeHRlbnRDb21wb25lbnQsICAvLy9cbiAgICAgICAgYW5nbGVPZlJvdGF0aW9uQ29zaW5lID0gc2Vjb25kVW5pdE1hc2tpbmdFZGdlRXh0ZW50Q29tcG9uZW50LCAgLy8vXG4gICAgICAgIGhhbGZBbmdsZU9mUm90YXRpb25Db3NpbmUgPSBjYWxjdWxhdGVIYWxmQW5nbGVDb3NpbmUoYW5nbGVPZlJvdGF0aW9uQ29zaW5lKSxcbiAgICAgICAgaGFsZkFuZ2xlT2ZSb3RhdGlvblNpbmUgPSAoYW5nbGVPZlJvdGF0aW9uU2luZSA+IDAgKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICtjYWxjdWxhdGVIYWxmQW5nbGVTaW5lKGFuZ2xlT2ZSb3RhdGlvbkNvc2luZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1jYWxjdWxhdGVIYWxmQW5nbGVTaW5lKGFuZ2xlT2ZSb3RhdGlvbkNvc2luZSksXG4gICAgICAgIHJvdGF0aW9uQWJvdXRaQXhpc1F1YXRlcm5pb24gPSBbXG4gICAgICAgICAgaGFsZkFuZ2xlT2ZSb3RhdGlvbkNvc2luZSxcbiAgICAgICAgICAwLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgaGFsZkFuZ2xlT2ZSb3RhdGlvblNpbmVcbiAgICAgICAgXTtcblxuICByZXR1cm4gcm90YXRpb25BYm91dFpBeGlzUXVhdGVybmlvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJvdGF0ZUltYWdpbmFyeVF1YXRlcm5pb24sXG4gIGNhbGN1bGF0ZUludmVyc2VSb3RhdGlvblF1YXRlcm5pb24sXG4gIGNhbGN1bGF0ZUZvcndhcmRzUm90YXRpb25RdWF0ZXJuaW9uLFxuICBjYWxjdWxhdGVCYWNrd2FyZHNSb3RhdGlvblF1YXRlcm5pb24sXG4gIGNhbGN1bGF0ZUFyYml0cmFyeVJvdGF0aW9uUXVhdGVybmlvbixcbiAgY2FsY3VsYXRlUm90YXRpb25BYm91dFpBeGlzUXVhdGVybmlvblxufTtcblxuZnVuY3Rpb24gaGFtaWx0b25Qcm9kdWN0KHF1YXRlcm5pb25BLCBxdWF0ZXJuaW9uQikge1xuICBjb25zdCBhMSA9IHF1YXRlcm5pb25BWzBdLFxuICAgICAgICBiMSA9IHF1YXRlcm5pb25BWzFdLFxuICAgICAgICBjMSA9IHF1YXRlcm5pb25BWzJdLFxuICAgICAgICBkMSA9IHF1YXRlcm5pb25BWzNdLFxuICAgICAgICBhMiA9IHF1YXRlcm5pb25CWzBdLFxuICAgICAgICBiMiA9IHF1YXRlcm5pb25CWzFdLFxuICAgICAgICBjMiA9IHF1YXRlcm5pb25CWzJdLFxuICAgICAgICBkMiA9IHF1YXRlcm5pb25CWzNdLFxuICAgICAgICBhID0gYTEgKiBhMiAtIGIxICogYjIgLSBjMSAqIGMyIC0gZDEgKiBkMixcbiAgICAgICAgYiA9IGExICogYjIgKyBiMSAqIGEyICsgYzEgKiBkMiAtIGQxICogYzIsXG4gICAgICAgIGMgPSBhMSAqIGMyIC0gYjEgKiBkMiArIGMxICogYTIgKyBkMSAqIGIyLFxuICAgICAgICBkID0gYTEgKiBkMiArIGIxICogYzIgLSBjMSAqIGIyICsgZDEgKiBhMixcbiAgICAgICAgcXVhdGVybmlvbiA9IFsgYSwgYiwgYywgZCBdO1xuXG4gIHJldHVybiBxdWF0ZXJuaW9uO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBxdWF0ZXJuaW9uVXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL3F1YXRlcm5pb24nKTtcblxuY29uc3QgeyByb3RhdGVJbWFnaW5hcnlRdWF0ZXJuaW9uLCBjYWxjdWxhdGVJbnZlcnNlUm90YXRpb25RdWF0ZXJuaW9uIH0gPSBxdWF0ZXJuaW9uVXRpbGl0aWVzO1xuXG5mdW5jdGlvbiByb3RhdGVQb3NpdGlvbihwb3NpdGlvbiwgcm90YXRpb25RdWF0ZXJuaW9uKSB7XG4gIGNvbnN0IGltYWdpbmFyeVF1YXRlcm5pb24gPSBpbWFnaW5hcnlRdWF0ZXJuaW9uRnJvbVBvc2l0aW9uKHBvc2l0aW9uKSxcbiAgICAgICAgaW52ZXJzZVJvdGF0aW9uUXVhdGVybmlvbiA9IGNhbGN1bGF0ZUludmVyc2VSb3RhdGlvblF1YXRlcm5pb24ocm90YXRpb25RdWF0ZXJuaW9uKSxcbiAgICAgICAgcm90YXRlZEltYWdpbmFyeVF1YXRlcm5pb24gPSByb3RhdGVJbWFnaW5hcnlRdWF0ZXJuaW9uKGltYWdpbmFyeVF1YXRlcm5pb24sIHJvdGF0aW9uUXVhdGVybmlvbiwgaW52ZXJzZVJvdGF0aW9uUXVhdGVybmlvbik7XG5cbiAgcG9zaXRpb24gPSBwb3NpdGlvbkZyb21JbWFnaW5hcnlRdWF0ZXJuaW9uKHJvdGF0ZWRJbWFnaW5hcnlRdWF0ZXJuaW9uKTtcblxuICByZXR1cm4gcG9zaXRpb247XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByb3RhdGVQb3NpdGlvblxufTtcblxuZnVuY3Rpb24gaW1hZ2luYXJ5UXVhdGVybmlvbkZyb21Qb3NpdGlvbihwb3NpdGlvbikgeyByZXR1cm4gWzAsIC4uLnBvc2l0aW9uXTsgfSAgLy8vXG5cbmZ1bmN0aW9uIHBvc2l0aW9uRnJvbUltYWdpbmFyeVF1YXRlcm5pb24oaW1hZ2luYXJ5UXVhdGVybmlvbikgeyByZXR1cm4gaW1hZ2luYXJ5UXVhdGVybmlvbi5zbGljZSgxKTsgfSAgLy8vXG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG1hdHJpeE1hdGhzID0gcmVxdWlyZSgnLi4vbWF0aHMvbWF0cml4JyksXG4gICAgICB2ZWN0b3JNYXRocyA9IHJlcXVpcmUoJy4uL21hdGhzL3ZlY3RvcicpLFxuICAgICAgYXJyYXlVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvYXJyYXknKSxcbiAgICAgIHZlcnRpY2VzVXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL3ZlcnRpY2VzJyksXG4gICAgICBxdWF0ZXJuaW9uVXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL3F1YXRlcm5pb24nKTtcblxuY29uc3QgeyByb3RhdGVWZXJ0aWNlcyB9ID0gdmVydGljZXNVdGlsaXRpZXMsXG4gICAgICB7IGludmVydDIsIGludmVydDMgfSA9IG1hdHJpeE1hdGhzLFxuICAgICAgeyBmaXJzdCwgc2Vjb25kLCB0aGlyZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IGNhbGN1bGF0ZUFyYml0cmFyeVJvdGF0aW9uUXVhdGVybmlvbiB9ID0gcXVhdGVybmlvblV0aWxpdGllcyxcbiAgICAgIHsgYWRkMiwgbXVsdGlwbHkyLCB0cmFuc2Zvcm0yLCB0cmFuc2Zvcm0zIH0gPSB2ZWN0b3JNYXRocztcblxuZnVuY3Rpb24gY2xvbmVUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSh0ZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSkge1xuICB0ZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSA9IHRleHR1cmVDb29yZGluYXRlc1R1cGxlLm1hcCgodGV4dHVyZUNvb3JkaW5hdGVzKSA9PiB0ZXh0dXJlQ29vcmRpbmF0ZXMuc2xpY2UoKSk7ICAvLy9cblxuICByZXR1cm4gdGV4dHVyZUNvb3JkaW5hdGVzVHVwbGU7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVZlcnRleFRleHR1cmVDb29yZGluYXRlc1R1cGxlKHRleHR1cmVDb29yZGluYXRlc1R1cGxlLCBsZWZ0LCBib3R0b20sIHdpZHRoLCBoZWlnaHQpIHtcbiAgY29uc3QgdmVydGV4VGV4dHVyZUNvb3JkaW5hdGVzVHVwbGUgPSB0ZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZS5tYXAoKHRleHR1cmVDb29yZGluYXRlcykgPT4gYWRkMihtdWx0aXBseTIodGV4dHVyZUNvb3JkaW5hdGVzLCBbIHdpZHRoLCBoZWlnaHQgXSApLCBbIGxlZnQsIGJvdHRvbSBdKSk7IC8vL1xuXG4gIHJldHVybiB2ZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZTtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlQWRqdXN0ZWRUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSh2ZXJ0aWNlcywgbm9ybWFsLCBwYXJlbnRWZXJ0aWNlcywgdGV4dHVyZUNvb3JkaW5hdGVzVHVwbGUpIHtcbiAgY29uc3QgYXJiaXRyYXJ5Um90YXRpb25RdWF0ZXJuaW9uID0gY2FsY3VsYXRlQXJiaXRyYXJ5Um90YXRpb25RdWF0ZXJuaW9uKG5vcm1hbCksXG4gICAgICAgIHJvdGF0aW9uUXVhdGVybmlvbiA9IGFyYml0cmFyeVJvdGF0aW9uUXVhdGVybmlvbjsgLy8vXG5cbiAgY29uc3QgdGVtcFZlcnRpY2VzID0gcm90YXRlVmVydGljZXModmVydGljZXMsIHJvdGF0aW9uUXVhdGVybmlvbik7XG5cbiAgcGFyZW50VmVydGljZXMgPSByb3RhdGVWZXJ0aWNlcyhwYXJlbnRWZXJ0aWNlcywgcm90YXRpb25RdWF0ZXJuaW9uKTtcblxuICB2ZXJ0aWNlcyA9IHRlbXBWZXJ0aWNlczsgIC8vL1xuXG4gIGNvbnN0IGZpcnN0VmVydGV4ID0gZmlyc3QodmVydGljZXMpLFxuICAgICAgICBzZWNvbmRWZXJ0ZXggPSBzZWNvbmQodmVydGljZXMpLFxuICAgICAgICB0aGlyZFZlcnRleCA9IHRoaXJkKHZlcnRpY2VzKSxcbiAgICAgICAgZmlyc3RQYXJlbnRWZXJ0ZXggPSBmaXJzdChwYXJlbnRWZXJ0aWNlcyksXG4gICAgICAgIHNlY29uZFBhcmVudFZlcnRleCA9IHNlY29uZChwYXJlbnRWZXJ0aWNlcyksXG4gICAgICAgIHRoaXJkUGFyZW50VmVydGV4ID0gdGhpcmQocGFyZW50VmVydGljZXMpLFxuICAgICAgICBmaXJzdFRleHR1cmVDb29yZGluYXRlcyA9IGZpcnN0KHRleHR1cmVDb29yZGluYXRlc1R1cGxlKSxcbiAgICAgICAgc2Vjb25kVGV4dHVyZUNvb3JkaW5hdGVzID0gc2Vjb25kKHRleHR1cmVDb29yZGluYXRlc1R1cGxlKSxcbiAgICAgICAgdGhpcmRUZXh0dXJlQ29vcmRpbmF0ZXMgPSB0aGlyZCh0ZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSksXG4gICAgICAgIGZpcnN0VmVydGV4UG9zaXRpb24gPSBmaXJzdFZlcnRleC5nZXRQb3NpdGlvbigpLFxuICAgICAgICBzZWNvbmRWZXJ0ZXhQb3NpdGlvbiA9IHNlY29uZFZlcnRleC5nZXRQb3NpdGlvbigpLFxuICAgICAgICB0aGlyZFZlcnRleFBvc2l0aW9uID0gdGhpcmRWZXJ0ZXguZ2V0UG9zaXRpb24oKSxcbiAgICAgICAgZmlyc3RQYXJlbnRWZXJ0ZXhQb3NpdGlvbiA9IGZpcnN0UGFyZW50VmVydGV4LmdldFBvc2l0aW9uKCksXG4gICAgICAgIHNlY29uZFBhcmVudFZlcnRleFBvc2l0aW9uID0gc2Vjb25kUGFyZW50VmVydGV4LmdldFBvc2l0aW9uKCksXG4gICAgICAgIHRoaXJkUGFyZW50VmVydGV4UG9zaXRpb24gPSB0aGlyZFBhcmVudFZlcnRleC5nZXRQb3NpdGlvbigpLFxuICAgICAgICBSMXggPSBmaXJzdFZlcnRleFBvc2l0aW9uWzBdLCAgLy8vXG4gICAgICAgIFIxeSA9IGZpcnN0VmVydGV4UG9zaXRpb25bMV0sICAvLy9cbiAgICAgICAgUjJ4ID0gc2Vjb25kVmVydGV4UG9zaXRpb25bMF0sIC8vL1xuICAgICAgICBSMnkgPSBzZWNvbmRWZXJ0ZXhQb3NpdGlvblsxXSwgLy8vXG4gICAgICAgIFIzeCA9IHRoaXJkVmVydGV4UG9zaXRpb25bMF0sICAvLy9cbiAgICAgICAgUjN5ID0gdGhpcmRWZXJ0ZXhQb3NpdGlvblsxXSwgIC8vL1xuICAgICAgICBQMXggPSBmaXJzdFBhcmVudFZlcnRleFBvc2l0aW9uWzBdLCAvLy9cbiAgICAgICAgUDJ4ID0gc2Vjb25kUGFyZW50VmVydGV4UG9zaXRpb25bMF0sIC8vL1xuICAgICAgICBQM3ggPSB0aGlyZFBhcmVudFZlcnRleFBvc2l0aW9uWzBdLCAvLy9cbiAgICAgICAgUDF5ID0gZmlyc3RQYXJlbnRWZXJ0ZXhQb3NpdGlvblsxXSwgLy8vXG4gICAgICAgIFAyeSA9IHNlY29uZFBhcmVudFZlcnRleFBvc2l0aW9uWzFdLCAvLy9cbiAgICAgICAgUDN5ID0gdGhpcmRQYXJlbnRWZXJ0ZXhQb3NpdGlvblsxXSwgLy8vXG4gICAgICAgIFAxdSA9IGZpcnN0VGV4dHVyZUNvb3JkaW5hdGVzWzBdLCAvLy9cbiAgICAgICAgUDF2ID0gZmlyc3RUZXh0dXJlQ29vcmRpbmF0ZXNbMV0sIC8vL1xuICAgICAgICBQMnUgPSBzZWNvbmRUZXh0dXJlQ29vcmRpbmF0ZXNbMF0sIC8vL1xuICAgICAgICBQMnYgPSBzZWNvbmRUZXh0dXJlQ29vcmRpbmF0ZXNbMV0sIC8vL1xuICAgICAgICBQM3UgPSB0aGlyZFRleHR1cmVDb29yZGluYXRlc1swXSwgLy8vXG4gICAgICAgIFAzdiA9IHRoaXJkVGV4dHVyZUNvb3JkaW5hdGVzWzFdLCAvLy9cbiAgICAgICAgdGV4dHVyZUNvb3JkaW5hdGVzTWF0cml4ID0gaW52ZXJ0MyhbIDEsIDEsIDEsIFAxdSwgUDJ1LCBQM3UsIFAxdiwgUDJ2LCBQM3YgXSksXG4gICAgICAgIGZpcnN0VHJhbnNmb3JtZWRQYXJlbnRWZXJ0aWNlc0NvbXBvbmVudCA9IHRyYW5zZm9ybTMoWyBQMXgsIFAyeCwgUDN4IF0sIHRleHR1cmVDb29yZGluYXRlc01hdHJpeCksXG4gICAgICAgIHNlY29uZFRyYW5zZm9ybWVkUGFyZW50VmVydGljZXNDb21wb25lbnQgPSB0cmFuc2Zvcm0zKFsgUDF5LCBQMnksIFAzeSBdLCB0ZXh0dXJlQ29vcmRpbmF0ZXNNYXRyaXgpLFxuICAgICAgICBPeCA9IGZpcnN0VHJhbnNmb3JtZWRQYXJlbnRWZXJ0aWNlc0NvbXBvbmVudFswXSwgIC8vL1xuICAgICAgICBVeCA9IGZpcnN0VHJhbnNmb3JtZWRQYXJlbnRWZXJ0aWNlc0NvbXBvbmVudFsxXSwgIC8vL1xuICAgICAgICBWeCA9IGZpcnN0VHJhbnNmb3JtZWRQYXJlbnRWZXJ0aWNlc0NvbXBvbmVudFsyXSwgIC8vL1xuICAgICAgICBPeSA9IHNlY29uZFRyYW5zZm9ybWVkUGFyZW50VmVydGljZXNDb21wb25lbnRbMF0sICAvLy9cbiAgICAgICAgVXkgPSBzZWNvbmRUcmFuc2Zvcm1lZFBhcmVudFZlcnRpY2VzQ29tcG9uZW50WzFdLCAgLy8vXG4gICAgICAgIFZ5ID0gc2Vjb25kVHJhbnNmb3JtZWRQYXJlbnRWZXJ0aWNlc0NvbXBvbmVudFsyXSwgIC8vL1xuICAgICAgICB0cmFuc2Zvcm1lZFBhcmVudFZlcnRpY2VzTWF0cml4ID0gaW52ZXJ0MihbIFV4LCBVeSwgVngsIFZ5IF0pLFxuICAgICAgICBmaXJzdEFkanVzdGVkVGV4dHVyZUNvb3JkaW5hdGVzQ29tcG9uZW50ID0gdHJhbnNmb3JtMihbIFIxeCAtIE94LCBSMXkgLSBPeSBdLCB0cmFuc2Zvcm1lZFBhcmVudFZlcnRpY2VzTWF0cml4KSxcbiAgICAgICAgc2Vjb25kQWRqdXN0ZWRUZXh0dXJlQ29vcmRpbmF0ZXNDb21wb25lbnQgPSB0cmFuc2Zvcm0yKFsgUjJ4IC0gT3gsIFIyeSAtIE95IF0sIHRyYW5zZm9ybWVkUGFyZW50VmVydGljZXNNYXRyaXgpLFxuICAgICAgICB0aGlyZEFkanVzdGVkVGV4dHVyZUNvb3JkaW5hdGVzQ29tcG9uZW50ID0gdHJhbnNmb3JtMihbIFIzeCAtIE94LCBSM3kgLSBPeSBdLCB0cmFuc2Zvcm1lZFBhcmVudFZlcnRpY2VzTWF0cml4KSxcbiAgICAgICAgYWRqdXN0ZWRUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSA9IFtcbiAgICAgICAgICBmaXJzdEFkanVzdGVkVGV4dHVyZUNvb3JkaW5hdGVzQ29tcG9uZW50LFxuICAgICAgICAgIHNlY29uZEFkanVzdGVkVGV4dHVyZUNvb3JkaW5hdGVzQ29tcG9uZW50LFxuICAgICAgICAgIHRoaXJkQWRqdXN0ZWRUZXh0dXJlQ29vcmRpbmF0ZXNDb21wb25lbnQsXG4gICAgICAgIF07XG5cbiAgcmV0dXJuIGFkanVzdGVkVGV4dHVyZUNvb3JkaW5hdGVzVHVwbGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjbG9uZVRleHR1cmVDb29yZGluYXRlc1R1cGxlLFxuICBjYWxjdWxhdGVWZXJ0ZXhUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZSxcbiAgY2FsY3VsYXRlQWRqdXN0ZWRUZXh0dXJlQ29vcmRpbmF0ZXNUdXBsZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyksXG4gICAgICB2ZWN0b3JNYXRocyA9IHJlcXVpcmUoJy4uL21hdGhzL3ZlY3RvcicpLFxuICAgICAgbWF0cml4TWF0aHMgPSByZXF1aXJlKCcuLi9tYXRocy9tYXRyaXgnKTtcblxuY29uc3QgeyB0cmFuc2Zvcm00IH0gPSB2ZWN0b3JNYXRocyxcbiAgICAgIHsgREVHUkVFU19UT19SQURJQU5TIH0gPSBjb25zdGFudHMsXG4gICAgICB7IGlkZW50aXR5NCwgc2NhbGU0LCByb3RhdGU0LCB0cmFuc2xhdGU0IH0gPSBtYXRyaXhNYXRocztcblxuY29uc3QgeEF4aXMgPSBbIDEsIDAsIDAgXSxcbiAgICAgIHlBeGlzID0gWyAwLCAxLCAwIF0sXG4gICAgICB6QXhpcyA9IFsgMCwgMCwgMSBdLFxuICAgICAgZGVmYXVsdFNpemUgPSBbIDEsIDEsIDEgXSxcbiAgICAgIGRlZmF1bHRQb3NpdGlvbiA9IFsgMCwgMCwgMCBdLFxuICAgICAgZGVmYXVsdFJvdGF0aW9ucyA9IFsgMCwgMCwgMCBdO1xuXG5mdW5jdGlvbiBjb21wb3NlVHJhbnNmb3JtKHNpemUsIHBvc2l0aW9uLCByb3RhdGlvbnMpIHtcbiAgY29uc3Qgc2NhbGUgPSBjb21wb3NlU2NhbGUoc2l6ZSksXG4gICAgICAgIHJvdGF0ZSA9IGNvbXBvc2VSb3RhdGUocm90YXRpb25zKSxcbiAgICAgICAgdHJhbnNsYXRlID0gY29tcG9zZVRyYW5zbGF0ZShwb3NpdGlvbik7XG5cbiAgcmV0dXJuICh2ZWN0b3IpID0+IHRyYW5zbGF0ZShyb3RhdGUoc2NhbGUodmVjdG9yKSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBjb21wb3NlVHJhbnNmb3JtXG59O1xuXG5mdW5jdGlvbiBjb21wb3NlKG1hdHJpeCkge1xuICByZXR1cm4gKHZlY3RvcikgPT4gdHJhbnNmb3JtNChbLi4udmVjdG9yLCAxXSwgbWF0cml4KS5zbGljZSgwLCAzKTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZVNjYWxlKHNpemUgPSBkZWZhdWx0U2l6ZSkge1xuICBsZXQgbWF0cml4ID0gaWRlbnRpdHk0KCk7XG5cbiAgbWF0cml4ID0gc2NhbGU0KG1hdHJpeCwgc2l6ZSk7XG5cbiAgcmV0dXJuIGNvbXBvc2UobWF0cml4KTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZVJvdGF0ZShyb3RhdGlvbnMgPSBkZWZhdWx0Um90YXRpb25zKSB7XG4gIGxldCBtYXRyaXggPSBpZGVudGl0eTQoKTtcblxuICBjb25zdCB4QW5nbGUgPSByb3RhdGlvbnNbIDAgXSAqIERFR1JFRVNfVE9fUkFESUFOUywgLy8vXG4gICAgICAgIHlBbmdsZSA9IHJvdGF0aW9uc1sgMSBdICogREVHUkVFU19UT19SQURJQU5TLCAvLy9cbiAgICAgICAgekFuZ2xlID0gcm90YXRpb25zWyAyIF0gKiBERUdSRUVTX1RPX1JBRElBTlM7IC8vL1xuXG4gIG1hdHJpeCA9IHJvdGF0ZTQobWF0cml4LCB4QW5nbGUsIHhBeGlzKTtcbiAgbWF0cml4ID0gcm90YXRlNChtYXRyaXgsIHlBbmdsZSwgeUF4aXMpO1xuICBtYXRyaXggPSByb3RhdGU0KG1hdHJpeCwgekFuZ2xlLCB6QXhpcyk7XG5cbiAgcmV0dXJuIGNvbXBvc2UobWF0cml4KTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZVRyYW5zbGF0ZShwb3NpdGlvbiA9IGRlZmF1bHRQb3NpdGlvbikge1xuICBsZXQgbWF0cml4ID0gaWRlbnRpdHk0KCk7XG5cbiAgbWF0cml4ID0gdHJhbnNsYXRlNChtYXRyaXgsIHBvc2l0aW9uKTtcblxuICByZXR1cm4gY29tcG9zZShtYXRyaXgpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiByb3RhdGVWZXJ0aWNlcyh2ZXJ0aWNlcywgcm90YXRpb25RdWF0ZXJuaW9uKSB7XG4gIGNvbnN0IHJvdGF0ZWRWZXJ0aWNlcyA9IHZlcnRpY2VzLm1hcCgodmVydGV4KSA9PiB7XG4gICAgY29uc3Qgcm90YXRlZFZlcnRleCA9IHZlcnRleC5jbG9uZSgpOyAgLy8vXG5cbiAgICByb3RhdGVkVmVydGV4LnJvdGF0ZShyb3RhdGlvblF1YXRlcm5pb24pO1xuXG4gICAgcmV0dXJuIHJvdGF0ZWRWZXJ0ZXg7XG4gIH0pO1xuXG4gIHJldHVybiByb3RhdGVkVmVydGljZXM7XG59XG5cbmZ1bmN0aW9uIHZlcnRpY2VzRnJvbUNvb3JkaW5hdGVUdXBsZXNBbmRJbmRleFR1cGxlKGNvb3JkaW5hdGVUdXBsZXMsIGluZGV4VHVwbGUsIFZlcnRleCkgeyAgLy8vXG4gIGNvbnN0IGluZGV4ZXMgPSBpbmRleFR1cGxlLCAvLy9cbiAgICAgICAgdmVydGljZXMgPSBpbmRleGVzLm1hcCgoaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlVHVwbGUgPSBjb29yZGluYXRlVHVwbGVzW2luZGV4XSxcbiAgICAgICAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbUNvb3JkaW5hdGVUdXBsZShjb29yZGluYXRlVHVwbGUpO1xuXG4gICAgICAgICAgcmV0dXJuIHZlcnRleDtcbiAgICAgICAgfSk7XG5cbiAgcmV0dXJuIHZlcnRpY2VzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcm90YXRlVmVydGljZXMsXG4gIHZlcnRpY2VzRnJvbUNvb3JkaW5hdGVUdXBsZXNBbmRJbmRleFR1cGxlXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJy4vcmVhY3QnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdywgJ1JlYWN0Jywge1xuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBSZWFjdDtcbiAgfVxufSk7XG4iLCIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXRoVXRpbGl0aWVzOiByZXF1aXJlKCcuL2xpYi91dGlsaXRpZXMvcGF0aCcpLFxuICBhcnJheVV0aWxpdGllczogcmVxdWlyZSgnLi9saWIvdXRpbGl0aWVzL2FycmF5JyksXG4gIHRlbXBsYXRlVXRpbGl0aWVzOiByZXF1aXJlKCcuL2xpYi91dGlsaXRpZXMvdGVtcGxhdGUnKSxcbiAgZmlsZVN5c3RlbVV0aWxpdGllczogcmVxdWlyZSgnLi9saWIvdXRpbGl0aWVzL2ZpbGVTeXN0ZW0nKSxcbiAgYXN5bmNocm9ub3VzVXRpbGl0aWVzOiByZXF1aXJlKCcuL2xpYi91dGlsaXRpZXMvYXN5bmNocm9ub3VzJyksXG4gIG1pc2NlbGxhbmVvdXNVdGlsaXRpZXM6IHJlcXVpcmUoJy4vbGliL3V0aWxpdGllcy9taXNjZWxsYW5lb3VzJylcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGZpcnN0KGFycmF5KSB7IHJldHVybiBhcnJheVswXTsgfVxuXG5mdW5jdGlvbiBzZWNvbmQoYXJyYXkpIHsgcmV0dXJuIGFycmF5WzFdOyB9XG5cbmZ1bmN0aW9uIHRoaXJkKGFycmF5KSB7IHJldHVybiBhcnJheVsyXTsgfVxuXG5mdW5jdGlvbiBmb3VydGgoYXJyYXkpIHsgcmV0dXJuIGFycmF5WzNdOyB9XG5cbmZ1bmN0aW9uIGZpZnRoKGFycmF5KSB7IHJldHVybiBhcnJheVs0XTsgfVxuXG5mdW5jdGlvbiBmaWZ0aExhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDVdOyB9XG5cbmZ1bmN0aW9uIGZvdXJ0aExhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDRdOyB9XG5cbmZ1bmN0aW9uIHRoaXJkTGFzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gM107IH1cblxuZnVuY3Rpb24gc2Vjb25kTGFzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMl07IH1cblxuZnVuY3Rpb24gbGFzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07IH1cblxuZnVuY3Rpb24gdGFpbChhcnJheSkgeyByZXR1cm4gYXJyYXkuc2xpY2UoMSk7IH1cblxuZnVuY3Rpb24gcHVzaChhcnJheTEsIGFycmF5MikgeyBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShhcnJheTEsIGFycmF5Mik7IH1cblxuZnVuY3Rpb24gdW5zaGlmdChhcnJheTEsIGFycmF5MikgeyBBcnJheS5wcm90b3R5cGUudW5zaGlmdC5hcHBseShhcnJheTEsIGFycmF5Mik7IH1cblxuZnVuY3Rpb24gY29uY2F0KGFycmF5MSwgYXJyYXkyKSB7XG4gIGlmICghKGFycmF5MiBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgIGFycmF5MiA9IFthcnJheTJdO1xuICB9XG5cbiAgY29uc3Qgc3RhcnQgPSAwLFxuICAgICAgICBkZWxldGVDb3VudCA9IDA7XG5cbiAgc3BsaWNlKGFycmF5MSwgc3RhcnQsIGRlbGV0ZUNvdW50LCBhcnJheTIpO1xufVxuXG5mdW5jdGlvbiBjbGVhcihhcnJheSkge1xuICBjb25zdCBzdGFydCA9IDA7XG4gIFxuICByZXR1cm4gYXJyYXkuc3BsaWNlKHN0YXJ0KTtcbn1cblxuZnVuY3Rpb24gY29weShhcnJheTEsIGFycmF5Mikge1xuICBjb25zdCBzdGFydCA9IDAsXG4gICAgICAgIGRlbGV0ZUNvdW50ID0gYXJyYXkyLmxlbmd0aDsgIC8vL1xuICBcbiAgc3BsaWNlKGFycmF5MSwgc3RhcnQsIGRlbGV0ZUNvdW50LCBhcnJheTIpO1xufVxuXG5mdW5jdGlvbiBtZXJnZShhcnJheTEsIGFycmF5Mikge1xuICBjb25zdCBzdGFydCA9IGFycmF5Mi5sZW5ndGgsICAvLy9cbiAgICAgICAgZGVsZXRlQ291bnQgPSAwO1xuXG4gIHNwbGljZShhcnJheTEsIHN0YXJ0LCBkZWxldGVDb3VudCwgYXJyYXkyKTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlKGFycmF5MSwgc3RhcnQsIGRlbGV0ZUNvdW50ID0gSW5maW5pdHksIGFycmF5MiA9IFtdKSB7XG4gIGNvbnN0IGFyZ3MgPSBbc3RhcnQsIGRlbGV0ZUNvdW50LCAuLi5hcnJheTJdLFxuICAgICAgICBkZWxldGVkSXRlbXNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkoYXJyYXkxLCBhcmdzKTtcblxuICByZXR1cm4gZGVsZXRlZEl0ZW1zQXJyYXk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2UoYXJyYXksIGVsZW1lbnQsIHRlc3QpIHtcbiAgbGV0IHN0YXJ0ID0gLTE7XG4gIFxuICBjb25zdCBmb3VuZCA9IGFycmF5LnNvbWUoZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmIChwYXNzZWQpIHtcbiAgICAgIHN0YXJ0ID0gaW5kZXg7ICAvLy9cbiAgICAgIFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgXG4gIGlmIChmb3VuZCkge1xuICAgIGNvbnN0IGRlbGV0ZUNvdW50ID0gMTtcblxuICAgIGFycmF5LnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQsIGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGZvdW5kO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXIoYXJyYXksIHRlc3QpIHtcbiAgY29uc3QgZmlsdGVyZWRFbGVtZW50cyA9IFtdO1xuICBcbiAgYmFja3dhcmRzRm9yRWFjaChhcnJheSwgZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmICghcGFzc2VkKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDEsXG4gICAgICAgICAgICBkZWxldGVkRWxlbWVudHMgPSBhcnJheS5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KSxcbiAgICAgICAgICAgIGZpcnN0RGVsZXRlZEVsZW1lbnQgPSBmaXJzdChkZWxldGVkRWxlbWVudHMpO1xuICAgICAgXG4gICAgICBmaWx0ZXJlZEVsZW1lbnRzLnVuc2hpZnQoZmlyc3REZWxldGVkRWxlbWVudCk7ICAvLy9cbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIGZpbHRlcmVkRWxlbWVudHM7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIHRlc3QpIHtcbiAgY29uc3QgZWxlbWVudHMgPSBbXTtcblxuICBmb3J3YXJkc0ZvckVhY2goYXJyYXksIGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KSB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocGFzc2VkKSB7XG4gICAgICBlbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGVsZW1lbnRzO1xufVxuXG5mdW5jdGlvbiBwcnVuZShhcnJheSwgdGVzdCkge1xuICBsZXQgcHJ1bmVkRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmIChwYXNzZWQpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMSxcbiAgICAgICAgICAgIGRlbGV0ZWRFbGVtZW50cyA9IGFycmF5LnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpLFxuICAgICAgICAgICAgZmlyc3REZWxldGVkRWxlbWVudCA9IGZpcnN0KGRlbGV0ZWRFbGVtZW50cyk7XG4gICAgICBcbiAgICAgIHBydW5lZEVsZW1lbnQgPSBmaXJzdERlbGV0ZWRFbGVtZW50OyAgLy8vXG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gcHJ1bmVkRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gcGF0Y2goYXJyYXksIGVsZW1lbnQsIHRlc3QpIHtcbiAgY29uc3QgZm91bmQgPSBhcnJheS5zb21lKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KSB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocGFzc2VkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG5cbiAgaWYgKGZvdW5kKSB7XG4gICAgYXJyYXkucHVzaChlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBmb3VuZDtcbn1cblxuZnVuY3Rpb24gYXVnbWVudChhcnJheTEsIGFycmF5MiwgdGVzdCkge1xuICBhcnJheTIuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKHBhc3NlZCkge1xuICAgICAgYXJyYXkxLnB1c2goZWxlbWVudCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gc2VwYXJhdGUoYXJyYXksIGFycmF5MSwgYXJyYXkyLCB0ZXN0KSB7XG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIHBhc3NlZCA/XG4gICAgICBhcnJheTEucHVzaChlbGVtZW50KSA6XG4gICAgICAgIGFycmF5Mi5wdXNoKGVsZW1lbnQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZm9yd2FyZHNTb21lKGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXlMZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKGVsZW1lbnQsIGluZGV4KTtcbiAgICBcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGJhY2t3YXJkc1NvbWUoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gYXJyYXlMZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGZvcndhcmRzRXZlcnkoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheUxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpbmRleF0sXG4gICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2soZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gYmFja3dhcmRzRXZlcnkoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gYXJyYXlMZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBmb3J3YXJkc0ZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheUxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpbmRleF07XG5cbiAgICBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYmFja3dhcmRzRm9yRWFjaChhcnJheSwgY2FsbGJhY2spIHtcbiAgY29uc3QgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaW5kZXggPSBhcnJheUxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdO1xuXG4gICAgY2FsbGJhY2soZWxlbWVudCwgaW5kZXgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBmaXJzdDogZmlyc3QsXG4gIHNlY29uZDogc2Vjb25kLFxuICB0aGlyZDogdGhpcmQsXG4gIGZvdXJ0aDogZm91cnRoLFxuICBmaWZ0aDogZmlmdGgsXG4gIGZpZnRoTGFzdDogZmlmdGhMYXN0LFxuICBmb3VydGhMYXN0OiBmb3VydGhMYXN0LFxuICB0aGlyZExhc3Q6IHRoaXJkTGFzdCxcbiAgc2Vjb25kTGFzdDogc2Vjb25kTGFzdCxcbiAgbGFzdDogbGFzdCxcbiAgdGFpbDogdGFpbCxcbiAgcHVzaDogcHVzaCxcbiAgdW5zaGlmdDogdW5zaGlmdCxcbiAgY29uY2F0OiBjb25jYXQsXG4gIGNsZWFyOiBjbGVhcixcbiAgY29weTogY29weSxcbiAgbWVyZ2U6IG1lcmdlLFxuICBzcGxpY2U6IHNwbGljZSxcbiAgcmVwbGFjZTogcmVwbGFjZSxcbiAgZmlsdGVyOiBmaWx0ZXIsXG4gIGZpbmQ6IGZpbmQsXG4gIHBydW5lOiBwcnVuZSxcbiAgcGF0Y2g6IHBhdGNoLFxuICBhdWdtZW50OiBhdWdtZW50LFxuICBzZXBhcmF0ZTogc2VwYXJhdGUsXG4gIGZvcndhcmRzU29tZTogZm9yd2FyZHNTb21lLFxuICBiYWNrd2FyZHNTb21lOiBiYWNrd2FyZHNTb21lLFxuICBmb3J3YXJkc0V2ZXJ5OiBmb3J3YXJkc0V2ZXJ5LFxuICBiYWNrd2FyZHNFdmVyeTogYmFja3dhcmRzRXZlcnksXG4gIGZvcndhcmRzRm9yRWFjaDogZm9yd2FyZHNGb3JFYWNoLFxuICBiYWNrd2FyZHNGb3JFYWNoOiBiYWNrd2FyZHNGb3JFYWNoXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gd2hpbHN0KGNhbGxiYWNrLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgbGV0IGNvdW50ID0gLTE7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudCsrO1xyXG5cclxuICAgIGNvbnN0IGluZGV4ID0gY291bnQsICAvLy9cclxuICAgICAgICAgIHRlcm1pbmF0ZSA9IGNhbGxiYWNrKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5leHQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9yRWFjaChhcnJheSwgY2FsbGJhY2ssIGRvbmUsIGNvbnRleHQpIHtcclxuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGg7ICAvLy9cclxuXHJcbiAgbGV0IGNvdW50ID0gLTE7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudCsrO1xyXG5cclxuICAgIGNvbnN0IHRlcm1pbmF0ZSA9IChjb3VudCA9PT0gbGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gY291bnQsICAvLy9cclxuICAgICAgICAgICAgZWxlbWVudCA9IGFycmF5W2luZGV4XTtcclxuXHJcbiAgICAgIGNhbGxiYWNrKGVsZW1lbnQsIG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5leHQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VxdWVuY2UoY2FsbGJhY2tzLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgY29uc3QgbGVuZ3RoID0gY2FsbGJhY2tzLmxlbmd0aDsgIC8vL1xyXG5cclxuICBsZXQgY291bnQgPSAtMTtcclxuXHJcbiAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIGNvdW50Kys7XHJcblxyXG4gICAgY29uc3QgdGVybWluYXRlID0gKGNvdW50ID09PSBsZW5ndGgpO1xyXG5cclxuICAgIGlmICh0ZXJtaW5hdGUpIHtcclxuICAgICAgZG9uZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaW5kZXggPSBjb3VudCwgIC8vL1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrc1tpbmRleF07XHJcblxyXG4gICAgICBjYWxsYmFjayhuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV2ZW50dWFsbHkoY2FsbGJhY2tzLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgY29uc3QgbGVuZ3RoID0gY2FsbGJhY2tzLmxlbmd0aDsgIC8vL1xyXG5cclxuICBsZXQgY291bnQgPSAwO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IGxlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihjYWxsYmFjaywgaW5kZXgpIHtcclxuICAgIGNhbGxiYWNrKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVwZWF0ZWRseShjYWxsYmFjaywgbGVuZ3RoLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgbGV0IGNvdW50ID0gMDtcclxuXHJcbiAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIGNvdW50Kys7XHJcblxyXG4gICAgY29uc3QgdGVybWluYXRlID0gKGNvdW50ID09PSBsZW5ndGgpO1xyXG5cclxuICAgIGlmICh0ZXJtaW5hdGUpIHtcclxuICAgICAgZG9uZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgY2FsbGJhY2sobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9yd2FyZHNGb3JFYWNoKGFycmF5LCBjYWxsYmFjaywgZG9uZSwgY29udGV4dCkge1xyXG4gIGNvbnN0IGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgIC8vL1xyXG5cclxuICBsZXQgY291bnQgPSAtMTtcclxuXHJcbiAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIGNvdW50Kys7XHJcblxyXG4gICAgY29uc3QgdGVybWluYXRlID0gKGNvdW50ID09PSBsZW5ndGgpO1xyXG5cclxuICAgIGlmICh0ZXJtaW5hdGUpIHtcclxuICAgICAgZG9uZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaW5kZXggPSBjb3VudCwgIC8vL1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gYXJyYXlbaW5kZXhdO1xyXG5cclxuICAgICAgY2FsbGJhY2soZWxlbWVudCwgbmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBiYWNrd2FyZHNGb3JFYWNoKGFycmF5LCBjYWxsYmFjaywgZG9uZSwgY29udGV4dCkge1xyXG4gIGNvbnN0IGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgIC8vL1xyXG5cclxuICBsZXQgY291bnQgPSBsZW5ndGg7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudC0tO1xyXG5cclxuICAgIGNvbnN0IHRlcm1pbmF0ZSA9IChjb3VudCA9PT0gLTEpO1xyXG5cclxuICAgIGlmICh0ZXJtaW5hdGUpIHtcclxuICAgICAgZG9uZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaW5kZXggPSBjb3VudCwgIC8vL1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gYXJyYXlbaW5kZXhdO1xyXG5cclxuICAgICAgY2FsbGJhY2soZWxlbWVudCwgbmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dCgpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICB3aGlsc3Q6IHdoaWxzdCxcclxuICBmb3JFYWNoOiBmb3JFYWNoLFxyXG4gIHNlcXVlbmNlOiBzZXF1ZW5jZSxcclxuICBldmVudHVhbGx5OiBldmVudHVhbGx5LFxyXG4gIHJlcGVhdGVkbHk6IHJlcGVhdGVkbHksXHJcbiAgZm9yd2FyZHNGb3JFYWNoOiBmb3J3YXJkc0ZvckVhY2gsXHJcbiAgYmFja3dhcmRzRm9yRWFjaDogYmFja3dhcmRzRm9yRWFjaFxyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuZnVuY3Rpb24gZG9lc0VudHJ5RXhpc3QoYWJzb2x1dGVQYXRoKSB7XG4gIGNvbnN0IGVudHJ5RXhpc3RzID0gZnMuZXhpc3RzU3luYyhhYnNvbHV0ZVBhdGgpO1xuXG4gIHJldHVybiBlbnRyeUV4aXN0cztcbn1cblxuZnVuY3Rpb24gZG9lc0ZpbGVFeGlzdChhYnNvbHV0ZUZpbGVQYXRoKSB7XG4gIGxldCBmaWxlRXhpc3RzID0gZmFsc2U7XG4gIFxuICBjb25zdCBhYnNvbHV0ZVBhdGggPSBhYnNvbHV0ZUZpbGVQYXRoLCAvLy9cbiAgICAgICAgZW50cnlFeGlzdHMgPSBkb2VzRW50cnlFeGlzdChhYnNvbHV0ZVBhdGgpO1xuICBcbiAgaWYgKGVudHJ5RXhpc3RzKSB7XG4gICAgY29uc3QgZW50cnlGaWxlID0gaXNFbnRyeUZpbGUoYWJzb2x1dGVQYXRoKTtcbiAgICBcbiAgICBpZiAoZW50cnlGaWxlKSB7XG4gICAgICBmaWxlRXhpc3RzID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBmaWxlRXhpc3RzO1xufVxuXG5mdW5jdGlvbiBkb2VzRGlyZWN0b3J5RXhpc3QoYWJzb2x1dGVEaXJlY3RvcnlQYXRoKSB7XG4gIGxldCBkaXJlY3RvcnlFeGlzdHMgPSBmYWxzZTtcblxuICBjb25zdCBhYnNvbHV0ZVBhdGggPSBhYnNvbHV0ZURpcmVjdG9yeVBhdGgsIC8vL1xuICAgICAgICBlbnRyeUV4aXN0cyA9IGRvZXNFbnRyeUV4aXN0KGFic29sdXRlUGF0aCk7XG5cbiAgaWYgKGVudHJ5RXhpc3RzKSB7XG4gICAgY29uc3QgZW50cnlEaXJlY3RvcnkgPSBpc0VudHJ5RGlyZWN0b3J5KGFic29sdXRlUGF0aCk7XG5cbiAgICBpZiAoZW50cnlEaXJlY3RvcnkpIHtcbiAgICAgIGRpcmVjdG9yeUV4aXN0cyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRpcmVjdG9yeUV4aXN0cztcbn1cblxuZnVuY3Rpb24gaXNFbnRyeUZpbGUoYWJzb2x1dGVQYXRoKSB7XG4gIGNvbnN0IHN0YXQgPSBmcy5zdGF0U3luYyhhYnNvbHV0ZVBhdGgpLFxuICAgICAgZW50cnlEaXJlY3RvcnkgPSBzdGF0LmlzRGlyZWN0b3J5KCksXG4gICAgICBlbnRyeUZpbGUgPSAhZW50cnlEaXJlY3Rvcnk7XG5cbiAgcmV0dXJuIGVudHJ5RmlsZTtcbn1cblxuZnVuY3Rpb24gaXNFbnRyeURpcmVjdG9yeShhYnNvbHV0ZVBhdGgpIHtcbiAgY29uc3Qgc3RhdCA9IGZzLnN0YXRTeW5jKGFic29sdXRlUGF0aCksXG4gICAgICAgIGVudHJ5RGlyZWN0b3J5ID0gc3RhdC5pc0RpcmVjdG9yeSgpO1xuXG4gIHJldHVybiBlbnRyeURpcmVjdG9yeTtcbn1cblxuZnVuY3Rpb24gaXNEaXJlY3RvcnlFbXB0eShhYnNvbHV0ZURpcmVjdG9yeVBhdGgpIHtcbiAgY29uc3Qgc3ViRW50cnlOYW1lcyA9IHJlYWREaXJlY3RvcnkoYWJzb2x1dGVEaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgc3ViRW50cnlOYW1lc0xlbmd0aCA9IHN1YkVudHJ5TmFtZXMubGVuZ3RoLFxuICAgICAgICBkaXJlY3RvcnlFbXB0eSA9IChzdWJFbnRyeU5hbWVzTGVuZ3RoID09PSAwKTtcblxuICByZXR1cm4gZGlyZWN0b3J5RW1wdHk7XG59XG5cbmZ1bmN0aW9uIHJlYWREaXJlY3RvcnkoYWJzb2x1dGVEaXJlY3RvcnlQYXRoKSB7XG4gIGNvbnN0IHN1YkVudHJ5TmFtZXMgPSBmcy5yZWFkZGlyU3luYyhhYnNvbHV0ZURpcmVjdG9yeVBhdGgpO1xuXG4gIHJldHVybiBzdWJFbnRyeU5hbWVzO1xufVxuXG5mdW5jdGlvbiByZWFkRmlsZShhYnNvbHV0ZUZpbGVQYXRoLCBlbmNvZGluZyA9ICd1dGY4Jykge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgIGVuY29kaW5nOiBlbmNvZGluZ1xuICAgICAgICB9LFxuICAgICAgICBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKGFic29sdXRlRmlsZVBhdGgsIG9wdGlvbnMpO1xuXG4gIHJldHVybiBjb250ZW50O1xufVxuXG5mdW5jdGlvbiB3cml0ZUZpbGUoYWJzb2x1dGVGaWxlUGF0aCwgY29udGVudCkge1xuICBmcy53cml0ZUZpbGVTeW5jKGFic29sdXRlRmlsZVBhdGgsIGNvbnRlbnQpO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRUb0ZpbGUoYWJzb2x1dGVGaWxlUGF0aCwgY29udGVudCkge1xuICBmcy5hcHBlbmRGaWxlU3luYyhhYnNvbHV0ZUZpbGVQYXRoLCBjb250ZW50KTtcbn1cblxuZnVuY3Rpb24gcmVuYW1lRmlsZShvbGRBYnNvbHV0ZUZpbGVQYXRoLCBuZXdBYnNvbHV0ZUZpbGVQYXRoKSB7XG4gIGZzLnJlbmFtZVN5bmMob2xkQWJzb2x1dGVGaWxlUGF0aCwgbmV3QWJzb2x1dGVGaWxlUGF0aCk7XG59XG5cbmZ1bmN0aW9uIGdldFN0YXRzKGFic29sdXRlRmlsZVBhdGgpIHtcbiAgcmV0dXJuIGZzLnN0YXRTeW5jKGFic29sdXRlRmlsZVBhdGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZG9lc0VudHJ5RXhpc3Q6IGRvZXNFbnRyeUV4aXN0LFxuICBkb2VzRmlsZUV4aXN0OiBkb2VzRmlsZUV4aXN0LFxuICBkb2VzRGlyZWN0b3J5RXhpc3Q6IGRvZXNEaXJlY3RvcnlFeGlzdCxcbiAgaXNFbnRyeUZpbGU6IGlzRW50cnlGaWxlLFxuICBpc0VudHJ5RGlyZWN0b3J5OiBpc0VudHJ5RGlyZWN0b3J5LFxuICBpc0RpcmVjdG9yeUVtcHR5OiBpc0RpcmVjdG9yeUVtcHR5LFxuICByZWFkRGlyZWN0b3J5OiByZWFkRGlyZWN0b3J5LFxuICByZWFkRmlsZTogcmVhZEZpbGUsXG4gIHdyaXRlRmlsZTogd3JpdGVGaWxlLFxuICBhcHBlbmRUb0ZpbGU6IGFwcGVuZFRvRmlsZSxcbiAgcmVuYW1lRmlsZTogcmVuYW1lRmlsZSxcbiAgZ2V0U3RhdHM6IGdldFN0YXRzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCByYyA9IHJlcXVpcmUoJy4vbWlzY2VsbGFuZW91cy9yYycpLFxuICAgICAgbG9nID0gcmVxdWlyZSgnLi9taXNjZWxsYW5lb3VzL2xvZycpLFxuICAgICAgYWpheCA9IHJlcXVpcmUoJy4vbWlzY2VsbGFuZW91cy9hamF4JyksXG4gICAgICBvbkVUWCA9IHJlcXVpcmUoJy4vbWlzY2VsbGFuZW91cy9vbkVUWCcpLFxuICAgICAgcHJvbXB0ID0gcmVxdWlyZSgnLi9taXNjZWxsYW5lb3VzL3Byb21wdCcpO1xuXG5jb25zdCB7IGdldCwgcG9zdCB9ID0gYWpheDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxvZzogbG9nLFxuICByYzogcmMsXG4gIGdldDogZ2V0LFxuICBwb3N0OiBwb3N0LFxuICBvbkVUWDogb25FVFgsXG4gIHByb21wdDogcHJvbXB0XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBHRVRfTUVUSE9EID0gJ0dFVCcsXG4gICAgICBQT1NUX01FVEhPRCA9ICdQT1NUJztcblxuZnVuY3Rpb24gZ2V0KGhvc3QsIHVyaSwgcGFyYW1ldGVycywgY2FsbGJhY2spIHtcbiAgaWYgKGNhbGxiYWNrID09PSB1bmRlZmluZWQpIHtcbiAgICBjYWxsYmFjayA9IHBhcmFtZXRlcnM7IC8vL1xuICAgIHBhcmFtZXRlcnMgPSB7fTtcbiAgfVxuXG4gIGNvbnN0IG1ldGhvZCA9IEdFVF9NRVRIT0QsXG4gICAgICAgIGJvZHkgPSB1bmRlZmluZWQ7XG5cbiAgcmVxdWVzdChob3N0LCB1cmksIHBhcmFtZXRlcnMsIG1ldGhvZCwgYm9keSwgY2FsbGJhY2spO1xufVxuXG5mdW5jdGlvbiBwb3N0KGhvc3QsIHVyaSwganNvbiwgcGFyYW1ldGVycywgY2FsbGJhY2spIHtcbiAgaWYgKGNhbGxiYWNrID09PSB1bmRlZmluZWQpIHtcbiAgICBjYWxsYmFjayA9IHBhcmFtZXRlcnM7IC8vL1xuICAgIHBhcmFtZXRlcnMgPSB7fTtcbiAgfVxuXG4gIGNvbnN0IG1ldGhvZCA9IFBPU1RfTUVUSE9ELFxuICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkoanNvbik7XG5cbiAgcmVxdWVzdChob3N0LCB1cmksIHBhcmFtZXRlcnMsIG1ldGhvZCwgYm9keSwgY2FsbGJhY2spO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0OiBnZXQsXG4gIHBvc3Q6IHBvc3Rcbn07XG5cbmZ1bmN0aW9uIHJlcXVlc3QoaG9zdCwgdXJpLCBwYXJhbWV0ZXJzLCBtZXRob2QsIGJvZHksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHVybCA9IHVybEZyb21Ib3N0VVJJQW5kUGFyYW1ldGVycyhob3N0LCB1cmksIHBhcmFtZXRlcnMpLFxuICAgICAgICB4bWxIdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIHhtbEh0dHBSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHsgcmVhZHlTdGF0ZSwgc3RhdHVzLCByZXNwb25zZVRleHQgfSA9IHhtbEh0dHBSZXF1ZXN0O1xuXG4gICAgaWYgKHJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgaWYgKHN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgY29uc3QganNvblN0cmluZyA9IHJlc3BvbnNlVGV4dCwgLy8vXG4gICAgICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKGpzb25TdHJpbmcpO1xuXG4gICAgICAgIGNhbGxiYWNrKGpzb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHhtbEh0dHBSZXF1ZXN0Lm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXG4gIHhtbEh0dHBSZXF1ZXN0LnNlbmQoYm9keSk7XG59XG5cbmZ1bmN0aW9uIHVybEZyb21Ib3N0VVJJQW5kUGFyYW1ldGVycyhob3N0LCB1cmksIHBhcmFtZXRlcnMpIHtcbiAgY29uc3QgcXVlcnlTdHJpbmcgPSBxdWVyeVN0cmluZ0Zyb21QYXJhbWV0ZXJzKHBhcmFtZXRlcnMpLFxuICAgICAgICB1cmwgPSAocXVlcnlTdHJpbmcgPT09ICcnKSA/XG4gICAgICAgICAgICAgICAgYCR7aG9zdH0vJHt1cml9YCA6XG4gICAgICAgICAgICAgICAgICBgJHtob3N0fS8ke3VyaX0/JHtxdWVyeVN0cmluZ31gO1xuXG4gIHJldHVybiB1cmw7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5U3RyaW5nRnJvbVBhcmFtZXRlcnMocGFyYW1ldGVycykge1xuICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKHBhcmFtZXRlcnMpLFxuICAgICAgICBuYW1lc0xlbmd0aCA9IG5hbWVzLmxlbmd0aCxcbiAgICAgICAgbGFzdEluZGV4ID0gbmFtZXNMZW5ndGggLSAxLFxuICAgICAgICBxdWVyeVN0cmluZyA9IG5hbWVzLnJlZHVjZShmdW5jdGlvbihxdWVyeVN0cmluZywgbmFtZSwgaW5kZXgpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcmFtZXRlcnNbbmFtZV0sXG4gICAgICAgICAgICAgICAgZW5jb2RlZE5hbWUgPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSksXG4gICAgICAgICAgICAgICAgZW5jb2RlZFZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSxcbiAgICAgICAgICAgICAgICBhbXBlcnNhbmRPck5vdGhpbmcgPSAoaW5kZXggIT09IGxhc3RJbmRleCkgPyAnJicgOiAnJztcbiAgXG4gICAgICAgICAgcXVlcnlTdHJpbmcgKz0gYCR7ZW5jb2RlZE5hbWV9PSR7ZW5jb2RlZFZhbHVlfSR7YW1wZXJzYW5kT3JOb3RoaW5nfWA7XG4gIFxuICAgICAgICAgIHJldHVybiBxdWVyeVN0cmluZztcbiAgICAgICAgfSwgJycpO1xuXG4gIHJldHVybiBxdWVyeVN0cmluZztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuY29uc3QgcGF0aFV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9wYXRoJyksXG4gICAgICBhcnJheVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9hcnJheScpLFxuICAgICAgZmlsZVN5c3RlbVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9maWxlU3lzdGVtJyk7XG5cbmNvbnN0IHsgc2Vjb25kIH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgY29uY2F0ZW5hdGVQYXRocyB9ID0gcGF0aFV0aWxpdGllcyxcbiAgICAgIHsgZG9lc0ZpbGVFeGlzdCwgcmVhZEZpbGUsIGFwcGVuZFRvRmlsZSwgcmVuYW1lRmlsZSwgZ2V0U3RhdHMgfSA9IGZpbGVTeXN0ZW1VdGlsaXRpZXM7XG5cbmNvbnN0IFRSQUNFID0gJ1RSQUNFJyxcbiAgICAgIERFQlVHID0gJ0RFQlVHJyxcbiAgICAgIElORk8gPSAnSU5GTycsXG4gICAgICBXQVJOSU5HID0gJ1dBUk5JTkcnLFxuICAgICAgRVJST1IgPSAnRVJST1InLFxuICAgICAgRkFUQUwgPSAnRkFUQUwnO1xuXG5sZXQgbG9nTGV2ZWwgPSBXQVJOSU5HLFxuICAgIGxvZ0ZpbGVCYXNlTmFtZSA9ICdkZWZhdWx0JyxcbiAgICBsb2dEaXJlY3RvcnlQYXRoID0gbnVsbDtcblxuZnVuY3Rpb24gbG9nKG1lc3NhZ2UsIGxldmVsID0gJycpIHtcbiAgbGV0IHBlcnRpbmVudFN0YWNrTWVzc2FnZUluZGV4ID0gMjtcblxuICBjb25zdCBsZXZlbHMgPSBbXG4gICAgVFJBQ0UsXG4gICAgREVCVUcsXG4gICAgSU5GTyxcbiAgICBXQVJOSU5HLFxuICAgIEVSUk9SLFxuICAgIEZBVEFMXG4gIF07XG5cbiAgaWYgKGxldmVsKSB7IC8vL1xuICAgIGNvbnN0IGxldmVsSW5kZXggPSBsZXZlbHMuaW5kZXhPZihsZXZlbCksXG4gICAgICAgICAgbG9nTGV2ZWxJbmRleCA9IGxldmVscy5pbmRleE9mKGxvZ0xldmVsKTtcblxuICAgIGlmIChsZXZlbEluZGV4IDwgbG9nTGV2ZWxJbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHBlcnRpbmVudFN0YWNrTWVzc2FnZUluZGV4ICs9IDE7XG5cbiAgICBsZXZlbCA9IGAke2xldmVsfSBgOyAgLy8vXG4gIH1cblxuICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcigpLFxuICAgICAgICB7IHN0YWNrIH0gPSBlcnJvcixcbiAgICAgICAgc3RhY2tNZXNzYWdlcyA9IHN0YWNrLnNwbGl0KC9cXHJcXG58XFxuLyksXG4gICAgICAgIHBlcnRpbmVudFN0YWNrTWVzc2FnZSA9IHN0YWNrTWVzc2FnZXNbcGVydGluZW50U3RhY2tNZXNzYWdlSW5kZXhdLFxuICAgICAgICBjdXJyZW50RGF0ZUFuZFRpbWVTdHJpbmcgPSBnZXRDdXJyZW50RGF0ZUFuZFRpbWVTdHJpbmcoKSxcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlUGF0aEZyb21TdGFja01lc3NhZ2UocGVydGluZW50U3RhY2tNZXNzYWdlKSxcbiAgICAgICAgbGluZU51bWJlciA9IGxpbmVOdW1iZXJGcm9tU3RhY2tNZXNzYWdlKHBlcnRpbmVudFN0YWNrTWVzc2FnZSksXG4gICAgICAgIGxvZ01lc3NhZ2UgPSBgJHtsZXZlbH0ke2N1cnJlbnREYXRlQW5kVGltZVN0cmluZ30gJHtmaWxlUGF0aH0oJHtsaW5lTnVtYmVyfSkgJHttZXNzYWdlfWA7XG5cbiAgY29uc29sZS5sb2cobG9nTWVzc2FnZSk7XG5cbiAgaWYgKGxvZ0RpcmVjdG9yeVBhdGggIT09IG51bGwpIHtcbiAgICByb2xsT3ZlckxvZ0ZpbGUoKTtcblxuICAgIGNvbnN0IGxvZ0ZpbGVQYXRoID0gZ2V0TG9nRmlsZVBhdGgoKSxcbiAgICAgICAgICBsb2dGaWxlQ29udGVudCA9IGAke2xvZ01lc3NhZ2V9XFxuYDtcblxuICAgIGFwcGVuZFRvRmlsZShsb2dGaWxlUGF0aCwgbG9nRmlsZUNvbnRlbnQpO1xuICB9XG5cbiAgcmV0dXJuIGxvZ01lc3NhZ2U7XG59XG5cbmZ1bmN0aW9uIHRyYWNlKG1lc3NhZ2UpIHsgcmV0dXJuIGxvZyhtZXNzYWdlLCBUUkFDRSk7IH1cblxuZnVuY3Rpb24gZGVidWcobWVzc2FnZSkgeyByZXR1cm4gbG9nKG1lc3NhZ2UsIERFQlVHKTsgfVxuXG5mdW5jdGlvbiBpbmZvKG1lc3NhZ2UpIHsgcmV0dXJuIGxvZyhtZXNzYWdlLCBJTkZPKTsgfVxuXG5mdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHsgcmV0dXJuIGxvZyhtZXNzYWdlLCBXQVJOSU5HKTsgfVxuXG5mdW5jdGlvbiBlcnJvcihtZXNzYWdlKSB7IHJldHVybiBsb2cobWVzc2FnZSwgRVJST1IpOyB9XG5cbmZ1bmN0aW9uIGZhdGFsKG1lc3NhZ2UpIHsgcmV0dXJuIGxvZyhtZXNzYWdlLCBGQVRBTCk7IH1cblxuZnVuY3Rpb24gc2V0TG9nTGV2ZWwobGV2ZWwpIHsgbG9nTGV2ZWwgPSBsZXZlbDsgfVxuXG5mdW5jdGlvbiBzZXRMb2dGaWxlQmFzZU5hbWUoZmlsZUJhc2VOYW1lKSB7IGxvZ0ZpbGVCYXNlTmFtZSA9IGZpbGVCYXNlTmFtZTsgfVxuXG5mdW5jdGlvbiBzZXRMb2dEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpIHsgbG9nRGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGg7IH1cblxuZnVuY3Rpb24gZ2V0TG9nRmlsZUNvbnRlbnQoKSB7XG4gIGNvbnN0IGxvZ0ZpbGVQYXRoID0gZ2V0TG9nRmlsZVBhdGgoKSxcbiAgICAgICAgbG9nRmlsZUNvbnRlbnQgPSByZWFkRmlsZShsb2dGaWxlUGF0aCk7XG5cbiAgcmV0dXJuIGxvZ0ZpbGVDb250ZW50O1xufVxuXG5PYmplY3QuYXNzaWduKGxvZywge1xuICBUUkFDRTogVFJBQ0UsXG4gIERFQlVHOiBERUJVRyxcbiAgSU5GTzogSU5GTyxcbiAgV0FSTklORzogV0FSTklORyxcbiAgRVJST1I6IEVSUk9SLFxuICBGQVRBTDogRkFUQUwsXG4gIHRyYWNlOiB0cmFjZSxcbiAgZGVidWc6IGRlYnVnLFxuICBpbmZvOiBpbmZvLFxuICB3YXJuaW5nOiB3YXJuaW5nLFxuICBlcnJvcjogZXJyb3IsXG4gIGZhdGFsOiBmYXRhbCxcbiAgc2V0TG9nTGV2ZWw6IHNldExvZ0xldmVsLFxuICBzZXRMb2dGaWxlQmFzZU5hbWU6IHNldExvZ0ZpbGVCYXNlTmFtZSxcbiAgc2V0TG9nRGlyZWN0b3J5UGF0aDogc2V0TG9nRGlyZWN0b3J5UGF0aCxcbiAgZ2V0TG9nRmlsZUNvbnRlbnQ6IGdldExvZ0ZpbGVDb250ZW50XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb2c7XG5cbmZ1bmN0aW9uIGdldExvZ0ZpbGVQYXRoKCkge1xuICBjb25zdCBsb2dGaWxlTmFtZSA9IGAke2xvZ0ZpbGVCYXNlTmFtZX0ubG9nYCxcbiAgICAgICAgbG9nRmlsZVBhdGggPSBjb25jYXRlbmF0ZVBhdGhzKGxvZ0RpcmVjdG9yeVBhdGgsIGxvZ0ZpbGVOYW1lKTtcblxuICByZXR1cm4gbG9nRmlsZVBhdGg7XG59XG5cbmZ1bmN0aW9uIGdldFJvbGxlZE92ZXJMb2dGaWxlUGF0aCgpIHtcbiAgY29uc3QgY3VycmVudERhdGVTdHJpbmcgPSBnZXRDdXJyZW50RGF0ZVN0cmluZygpLFxuICAgICAgICByb2xsZWRPdmVyTG9nRmlsZU5hbWUgPSBgJHtsb2dGaWxlQmFzZU5hbWV9LiR7Y3VycmVudERhdGVTdHJpbmd9LmxvZ2AsXG4gICAgICAgIHJvbGxlZE92ZXJMb2dGaWxlUGF0aCA9IGNvbmNhdGVuYXRlUGF0aHMobG9nRGlyZWN0b3J5UGF0aCwgcm9sbGVkT3ZlckxvZ0ZpbGVOYW1lKTtcblxuICByZXR1cm4gcm9sbGVkT3ZlckxvZ0ZpbGVQYXRoO1xufVxuXG5mdW5jdGlvbiBnZXRMb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZSgpIHtcbiAgY29uc3QgbG9nRmlsZVBhdGggPSBnZXRMb2dGaWxlUGF0aCgpLFxuICAgICAgICBsb2dGaWxlU3RhdHMgPSBnZXRTdGF0cyhsb2dGaWxlUGF0aCksXG4gICAgICAgIHsgbXRpbWUgfSA9IGxvZ0ZpbGVTdGF0cyxcbiAgICAgICAgbG9nRmlsZUxhc3RNb2RpZmllZERhdGUgPSBuZXcgRGF0ZShtdGltZSk7ICAvLy9cblxuICByZXR1cm4gbG9nRmlsZUxhc3RNb2RpZmllZERhdGU7XG59XG5cbmZ1bmN0aW9uIHJvbGxPdmVyTG9nRmlsZSgpIHtcbiAgY29uc3QgbG9nRmlsZVBhdGggPSBnZXRMb2dGaWxlUGF0aCgpLFxuICAgICAgICBsb2dGaWxlRXhpc3RzID0gZG9lc0ZpbGVFeGlzdChsb2dGaWxlUGF0aCk7XG5cbiAgaWYgKCFsb2dGaWxlRXhpc3RzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgbG9nRmlsZUxhc3RNb2RpZmllZERhdGUgPSBnZXRMb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZSgpLFxuICAgICAgICBsb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZUN1cnJlbnREYXRlID0gaXNEYXRlQ3VycmVudERhdGUobG9nRmlsZUxhc3RNb2RpZmllZERhdGUpO1xuXG4gIGlmICghbG9nRmlsZUxhc3RNb2RpZmllZERhdGVDdXJyZW50RGF0ZSkge1xuICAgIGNvbnN0IHJvbGxlZE92ZXJMb2dGaWxlUGF0aCA9IGdldFJvbGxlZE92ZXJMb2dGaWxlUGF0aCgpO1xuXG4gICAgcmVuYW1lRmlsZShsb2dGaWxlUGF0aCwgcm9sbGVkT3ZlckxvZ0ZpbGVQYXRoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0RhdGVDdXJyZW50RGF0ZShkYXRlKSB7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKSxcbiAgICAgICAgZGF0ZVN0cmluZyA9IGRhdGUudG9EYXRlU3RyaW5nKCksXG4gICAgICAgIGN1cnJlbnREYXRlU3RyaW5nID0gY3VycmVudERhdGUudG9EYXRlU3RyaW5nKCksXG4gICAgICAgIGRhdGVDdXJyZW50RGF0ZSA9IChkYXRlU3RyaW5nID09PSBjdXJyZW50RGF0ZVN0cmluZyk7XG5cbiAgcmV0dXJuIGRhdGVDdXJyZW50RGF0ZTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudERhdGVTdHJpbmcoKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXkgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXREYXRlKCksIDIpLCAgLy8vXG4gICAgICAgIG1vbnRoID0gcGFkU3RhcnRXaXRoWmVyb2VzKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpLCAvLy9cbiAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgY3VycmVudERhdGVBbmRUaW1lU3RyaW5nID0gYCR7ZGF5fS0ke21vbnRofS0ke3llYXJ9YDtcblxuICByZXR1cm4gY3VycmVudERhdGVBbmRUaW1lU3RyaW5nO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50RGF0ZUFuZFRpbWVTdHJpbmcoKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXkgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXREYXRlKCksIDIpLCAgLy8vXG4gICAgICAgIG1vbnRoID0gcGFkU3RhcnRXaXRoWmVyb2VzKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpLCAvLy9cbiAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgaG91cnMgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXRIb3VycygpLCAyKSxcbiAgICAgICAgbWludXRlcyA9IHBhZFN0YXJ0V2l0aFplcm9lcyhkYXRlLmdldE1pbnV0ZXMoKSwgMiksXG4gICAgICAgIHNlY29uZHMgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXRTZWNvbmRzKCksIDIpLFxuICAgICAgICBtaWxsaXNlY29uZHMgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSwgMyksXG4gICAgICAgIGN1cnJlbnREYXRlQW5kVGltZVN0cmluZyA9IGAke2RheX0tJHttb250aH0tJHt5ZWFyfSAke2hvdXJzfToke21pbnV0ZXN9OiR7c2Vjb25kc30uJHttaWxsaXNlY29uZHN9YDtcblxuICByZXR1cm4gY3VycmVudERhdGVBbmRUaW1lU3RyaW5nO1xufVxuXG5mdW5jdGlvbiBmaWxlUGF0aEZyb21TdGFja01lc3NhZ2Uoc3RhY2tNZXNzYWdlKSB7XG4gIGNvbnN0IG1hdGNoZXMgPSBzdGFja01lc3NhZ2UubWF0Y2goLyhcXC8uKylcXDpcXGQrXFw6XFxkKy8pLFxuICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKSxcbiAgICAgICAgYWJzb2x1dGVGaWxlUGF0aCA9IHNlY29uZE1hdGNoLCAgLy8vXG4gICAgICAgIGN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aCA9IHBhdGgucmVzb2x2ZSgnLicpLCAgLy8vXG4gICAgICAgIGN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aExlbmd0aCA9IGN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aC5sZW5ndGgsXG4gICAgICAgIHN0YXJ0ID0gY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoTGVuZ3RoICsgMSwgIC8vL1xuICAgICAgICBmaWxlUGF0aCA9IGFic29sdXRlRmlsZVBhdGguc3Vic3RyKHN0YXJ0KTtcblxuICByZXR1cm4gZmlsZVBhdGg7XG59XG5cbmZ1bmN0aW9uIGxpbmVOdW1iZXJGcm9tU3RhY2tNZXNzYWdlKHN0YWNrTWVzc2FnZSkge1xuICBjb25zdCBtYXRjaGVzID0gc3RhY2tNZXNzYWdlLm1hdGNoKC9cXDooXFxkKykvKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyksXG4gICAgICAgIGxpbmVOdW1iZXIgPSBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGxpbmVOdW1iZXI7XG59XG5cbmZ1bmN0aW9uIHBhZFN0YXJ0V2l0aFplcm9lcyhzdHJpbmcsIHRhcmdldExlbmd0aCkge1xuICBjb25zdCBwYWRTdHJpbmcgPSAnMCcsXG4gICAgICAgIHBhZGRlZFN0cmluZyA9IHBhZFN0YXJ0KHN0cmluZywgdGFyZ2V0TGVuZ3RoLCBwYWRTdHJpbmcpO1xuXG4gIHJldHVybiBwYWRkZWRTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHBhZFN0YXJ0KHN0cmluZywgdGFyZ2V0TGVuZ3RoLCBwYWRTdHJpbmcpIHtcbiAgbGV0IHBhZGRpbmcgPSAnJztcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGFyZ2V0TGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgcGFkZGluZyArPSBwYWRTdHJpbmc7XG4gIH1cblxuICBjb25zdCBwYWRkZWRTdHJpbmcgPSBgJHtwYWRkaW5nfSR7c3RyaW5nfWAuc3Vic3RyKC10YXJnZXRMZW5ndGgpO1xuXG4gIHJldHVybiBwYWRkZWRTdHJpbmc7XG59XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRVRYX0NIQVJBQ1RFUiA9ICdcXHUwMDAzJztcblxuZnVuY3Rpb24gb25FVFgoaGFuZGxlcikge1xuICBjb25zdCB7IHN0ZGluIH0gPSBwcm9jZXNzLFxuICAgICAgICB7IHNldFJhd01vZGUgfSA9IHN0ZGluO1xuXG4gIGlmIChzZXRSYXdNb2RlKSB7XG4gICAgY29uc3QgcmF3TW9kZSA9IHRydWUsXG4gICAgICAgICAgZW5jb2RpbmcgPSAndXRmOCc7XG5cbiAgICBzdGRpbi5zZXRSYXdNb2RlKHJhd01vZGUpO1xuICAgIHN0ZGluLnNldEVuY29kaW5nKGVuY29kaW5nKTtcblxuICAgIHN0ZGluLnJlc3VtZSgpO1xuXG4gICAgc3RkaW4uYWRkTGlzdGVuZXIoJ2RhdGEnLCBkYXRhSGFuZGxlcik7XG5cbiAgICByZXR1cm4gb2ZmRXh0O1xuICB9XG5cbiAgZnVuY3Rpb24gb2ZmRXh0KCkge1xuICAgIHN0ZGluLnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgZGF0YUhhbmRsZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGF0YUhhbmRsZXIoY2hhcmFjdGVyKSB7XG4gICAgaWYgKGNoYXJhY3RlciA9PT0gRVRYX0NIQVJBQ1RFUikge1xuICAgICAgaGFuZGxlcigpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9uRVRYO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBvbkVUWCA9IHJlcXVpcmUoJy4vb25FVFgnKSxcbiAgICAgIGFzeW5jaHJvbm91c1V0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9hc3luY2hyb25vdXMnKTtcblxuY29uc3QgeyBzdGRpbiwgc3Rkb3V0IH0gPSBwcm9jZXNzLFxuICAgICAgeyB3aGlsc3QgfSA9IGFzeW5jaHJvbm91c1V0aWxpdGllcyxcbiAgICAgIHsgZXhpdCB9ID0gcHJvY2VzcztcblxuY29uc3QgQkFDS1NQQUNFX0NIQVJBQ1RFUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMTI3KSxcbiAgICAgIExJTkVfRkVFRF9DSEFSQUNURVIgPSAnXFxuJyxcbiAgICAgIENBUlJJQUdFX1JFVFVSTl9DSEFSQUNURVIgPSAnXFxyJztcblxuZnVuY3Rpb24gcHJvbXB0KG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHZhbHVlID0gbnVsbCxcbiAgICAgICAgeyBhdHRlbXB0cyA9IDMgfSA9IG9wdGlvbnMsXG4gICAgICAgIGNvbnRleHQgPSB7XG4gICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgIGF0dGVtcHRzOiBhdHRlbXB0cyxcbiAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgIH07XG5cbiAgd2hpbHN0KGF0dGVtcHQsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IGNvbnRleHQ7XG4gICAgXG4gICAgY2FsbGJhY2sodmFsdWUpO1xuICB9LCBjb250ZXh0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcm9tcHQ7XG5cbmZ1bmN0aW9uIGF0dGVtcHQobmV4dCwgZG9uZSwgY29udGV4dCkge1xuICBsZXQgeyBhdHRlbXB0cyB9ID0gY29udGV4dDtcblxuICBjb25zdCB0ZXJtaW5hdGUgPSAoYXR0ZW1wdHMtLSA9PT0gMCk7XG4gIFxuICBpZiAodGVybWluYXRlKSB7XG4gICAgZG9uZSgpO1xuICAgIFxuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHsgb3B0aW9ucyB9ID0gY29udGV4dCxcbiAgICAgICAgeyBkZXNjcmlwdGlvbixcbiAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgdmFsaWRhdGlvblBhdHRlcm4sXG4gICAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uLFxuICAgICAgICAgIGVuY29kaW5nID0gJ3V0ZjgnLFxuICAgICAgICAgIGhpZGRlbiA9IGZhbHNlIH0gPSBvcHRpb25zO1xuXG4gIGhpZGRlbiA/IFxuICAgIGhpZGRlbklucHV0KGRlc2NyaXB0aW9uLCBlbmNvZGluZywgY2FsbGJhY2spIDpcbiAgICAgIHZpc2libGVJbnB1dChkZXNjcmlwdGlvbiwgZW5jb2RpbmcsIGNhbGxiYWNrKTtcblxuICBmdW5jdGlvbiBjYWxsYmFjayh2YWx1ZSkge1xuICAgIGNvbnN0IHZhbGlkID0gdmFsaWRhdGlvbkZ1bmN0aW9uID8gIC8vL1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb24odmFsdWUpIDpcbiAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uUGF0dGVybi50ZXN0KHZhbHVlKTtcblxuICAgIGlmICh2YWxpZCkge1xuICAgICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKTtcblxuICAgICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICAgIGF0dGVtcHRzOiBhdHRlbXB0c1xuICAgICAgfSk7XG5cbiAgICAgIG5leHQoKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdmlzaWJsZUlucHV0KGRlc2NyaXB0aW9uLCBlbmNvZGluZywgY2FsbGJhY2spIHtcbiAgY29uc3QgcmF3TW9kZSA9IGZhbHNlO1xuXG4gIHN0ZG91dC53cml0ZShkZXNjcmlwdGlvbik7XG5cbiAgc3RkaW4uc2V0RW5jb2RpbmcoZW5jb2RpbmcpO1xuXG4gIHN0ZGluLnNldFJhd01vZGUocmF3TW9kZSk7XG5cbiAgc3RkaW4ucmVzdW1lKCk7XG5cbiAgbGV0IHZhbHVlO1xuXG4gIGNvbnN0IGxpc3RlbmVyID0gZnVuY3Rpb24oY2h1bmspIHtcbiAgICB2YWx1ZSA9IGNodW5rLnRyaW0oKTtcblxuICAgIHN0ZGluLnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgbGlzdGVuZXIpO1xuXG4gICAgc3RkaW4ucGF1c2UoKTtcblxuICAgIGNhbGxiYWNrKHZhbHVlKTtcbiAgfTtcblxuICBzdGRpbi5vbignZGF0YScsIGxpc3RlbmVyKTtcbn1cblxuZnVuY3Rpb24gaGlkZGVuSW5wdXQoZGVzY3JpcHRpb24sIGVuY29kaW5nLCBjYWxsYmFjaykge1xuICBjb25zdCByYXdNb2RlID0gdHJ1ZSxcbiAgICAgICAgb2ZmRVRYID0gb25FVFgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ15DJyk7XG5cbiAgICAgICAgICBleGl0KCk7XG4gICAgICAgIH0pO1xuXG4gIHN0ZG91dC53cml0ZShkZXNjcmlwdGlvbik7XG5cbiAgc3RkaW4uc2V0RW5jb2RpbmcoZW5jb2RpbmcpO1xuXG4gIHN0ZGluLnNldFJhd01vZGUocmF3TW9kZSk7XG5cbiAgc3RkaW4ucmVzdW1lKCk7XG5cbiAgbGV0IHZhbHVlID0gJyc7XG5cbiAgY29uc3QgbGlzdGVuZXIgPSBmdW5jdGlvbihjaHVuaykge1xuICAgIGNvbnN0IGNoYXJhY3RlciA9IGNodW5rLnRvU3RyaW5nKGVuY29kaW5nKTtcblxuICAgIHN3aXRjaCAoY2hhcmFjdGVyKSB7XG4gICAgICBjYXNlIExJTkVfRkVFRF9DSEFSQUNURVIgOlxuICAgICAgY2FzZSBDQVJSSUFHRV9SRVRVUk5fQ0hBUkFDVEVSIDpcbiAgICAgICAgc3Rkb3V0LndyaXRlKExJTkVfRkVFRF9DSEFSQUNURVIpO1xuXG4gICAgICAgIHN0ZGluLnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgbGlzdGVuZXIpO1xuXG4gICAgICAgIHN0ZGluLnBhdXNlKCk7XG5cbiAgICAgICAgb2ZmRVRYKCk7XG5cbiAgICAgICAgY2FsbGJhY2sodmFsdWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBCQUNLU1BBQ0VfQ0hBUkFDVEVSIDpcbiAgICAgICAgdmFsdWUgPSB0cnVuY2F0ZSh2YWx1ZSk7XG5cbiAgICAgICAgc3Rkb3V0LmNsZWFyTGluZSgpO1xuXG4gICAgICAgIHN0ZG91dC5jdXJzb3JUbygwKTtcblxuICAgICAgICBzdGRvdXQud3JpdGUoZGVzY3JpcHRpb24pO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFsdWUgKz0gY2hhcmFjdGVyO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG5cbiAgc3RkaW4ub24oJ2RhdGEnLCBsaXN0ZW5lcik7XG59XG5cbmZ1bmN0aW9uIHRydW5jYXRlKHZhbHVlKSB7IHJldHVybiB2YWx1ZS5zbGljZSgwLCB2YWx1ZS5sZW5ndGggLSAxKTsgfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5jb25zdCBhcnJheVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9hcnJheScpLFxuICAgICAgZmlsZVN5c3RlbVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxpdGllcy9maWxlU3lzdGVtJyk7XG5cbmNvbnN0IHsgZmlyc3QsIHNlY29uZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IHJlYWRGaWxlLCB3cml0ZUZpbGUgfSA9IGZpbGVTeXN0ZW1VdGlsaXRpZXM7XG5cbmxldCByY0Jhc2VFeHRlbnNpb24gPSAnJztcblxuZnVuY3Rpb24gcmMoZW52aXJvbm1lbnROYW1lT3JBcmd2ID0gbnVsbCkge1xuICBsZXQgZW52aXJvbm1lbnQsXG4gICAgICBlbnZpcm9ubWVudE5hbWU7XG5cbiAgaWYgKGVudmlyb25tZW50TmFtZU9yQXJndiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgY29uc3QgYXJndiA9IGVudmlyb25tZW50TmFtZU9yQXJndjtcblxuICAgIGVudmlyb25tZW50TmFtZSA9IGVudmlyb25tZW50TmFtZUZyb21Bcmd2KGFyZ3YpO1xuICB9IGVsc2Uge1xuICAgIGVudmlyb25tZW50TmFtZSA9IGVudmlyb25tZW50TmFtZU9yQXJndjtcbiAgfVxuXG4gIGNvbnN0IGpzb24gPSByZWFkUkNGaWxlKCksXG4gICAgICAgIHsgZW52aXJvbm1lbnRzIH0gPSBqc29uO1xuXG4gIGlmIChlbnZpcm9ubWVudE5hbWUgPT09IG51bGwpIHtcbiAgICBjb25zdCBmaXJzdEVudmlyb25tZW50ID0gZmlyc3QoZW52aXJvbm1lbnRzKTtcblxuICAgIGVudmlyb25tZW50ID0gZmlyc3RFbnZpcm9ubWVudDsgLy8vXG4gIH0gZWxzZSB7XG4gICAgZW52aXJvbm1lbnQgPSBlbnZpcm9ubWVudHMuZmluZChmdW5jdGlvbihlbnZpcm9ubWVudCkge1xuICAgICAgY29uc3QgeyBuYW1lIH0gPSBlbnZpcm9ubWVudCxcbiAgICAgICAgICAgIGZvdW5kID0gKG5hbWUgPT09IGVudmlyb25tZW50TmFtZSk7XG5cbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZSBlbnZpcm9ubWVudC5uYW1lO1xuXG4gIE9iamVjdC5hc3NpZ24ocmMsIGVudmlyb25tZW50KTtcblxuICByZXR1cm4gZW52aXJvbm1lbnQ7XG59XG5cbmZ1bmN0aW9uIHJlYWRSQ0ZpbGUoKSB7XG4gIGNvbnN0IGZpbGVQYXRoID0gYC4vLiR7cmNCYXNlRXh0ZW5zaW9ufXJjYCxcbiAgICAgICAgYWJzb2x1dGVGaWxlUGF0aCA9IHBhdGgucmVzb2x2ZShmaWxlUGF0aCksXG4gICAgICAgIGZpbGVDb250ZW50ID0gcmVhZEZpbGUoYWJzb2x1dGVGaWxlUGF0aCksXG4gICAgICAgIGpzb24gPSBKU09OLnBhcnNlKGZpbGVDb250ZW50KTtcblxuICByZXR1cm4ganNvbjsgICAgICBcbn1cblxuZnVuY3Rpb24gd3JpdGVSQ0ZpbGUoanNvbikge1xuICBjb25zdCBmaWxlUGF0aCA9IGAuLy4ke3JjQmFzZUV4dGVuc2lvbn1yY2AsXG4gICAgICAgIGFic29sdXRlRmlsZVBhdGggPSBwYXRoLnJlc29sdmUoZmlsZVBhdGgpLFxuICAgICAgICBmaWxlQ29udGVudCA9IEpTT04uc3RyaW5naWZ5KGpzb24sIG51bGwsIGBcXHRgKTtcblxuICB3cml0ZUZpbGUoYWJzb2x1dGVGaWxlUGF0aCwgZmlsZUNvbnRlbnQpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVSQ0ZpbGUoYWRkZWRQcm9wcGVydGllcywgLi4uZGVsZXRlZFByb3BlcnR5TmFtZXMpIHtcbiAgbGV0IGpzb24gPSByZWFkUkNGaWxlKCk7XG5cbiAgaWYgKGFkZGVkUHJvcHBlcnRpZXMpIHtcbiAgICBPYmplY3QuYXNzaWduKGpzb24sIGFkZGVkUHJvcHBlcnRpZXMpO1xuICB9XG5cbiAgZGVsZXRlZFByb3BlcnR5TmFtZXMuZm9yRWFjaChmdW5jdGlvbihkZWxldGVkUHJvcGVydHlOYW1lKSB7XG4gICAgZGVsZXRlIGpzb25bZGVsZXRlZFByb3BlcnR5TmFtZV07XG4gIH0pO1xuXG4gIHdyaXRlUkNGaWxlKGpzb24pOyAgICAgIFxufVxuXG5mdW5jdGlvbiBzZXRSQ0Jhc2VFeHRlbnNpb24oYmFzZUV4dGVuc2lvbikgeyByY0Jhc2VFeHRlbnNpb24gPSBiYXNlRXh0ZW5zaW9uOyB9XG5cbk9iamVjdC5hc3NpZ24ocmMsIHtcbiAgcmVhZFJDRmlsZTogcmVhZFJDRmlsZSxcbiAgd3JpdGVSQ0ZpbGU6IHdyaXRlUkNGaWxlLFxuICB1cGRhdGVSQ0ZpbGU6IHVwZGF0ZVJDRmlsZSxcbiAgc2V0UkNCYXNlRXh0ZW5zaW9uOiBzZXRSQ0Jhc2VFeHRlbnNpb25cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJjO1xuXG5mdW5jdGlvbiBlbnZpcm9ubWVudE5hbWVGcm9tQXJndihhcmd2KSB7XG4gIGxldCBlbnZpcm9ubWVudE5hbWUgPSBudWxsO1xuXG4gIGFyZ3YuZmluZChmdW5jdGlvbihhcmd1bWVudCkgeyAgLy8vXG4gICAgY29uc3QgbWF0Y2hlcyA9IGFyZ3VtZW50Lm1hdGNoKC9cXC1cXC1lbnZpcm9ubWVudD0oLispLyksXG4gICAgICAgICAgZm91bmQgPSAobWF0Y2hlcyAhPT0gbnVsbCk7XG5cbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgICBlbnZpcm9ubWVudE5hbWUgPSBzZWNvbmRNYXRjaDtcbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH0pO1xuXG4gIHJldHVybiBlbnZpcm9ubWVudE5hbWU7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFycmF5ID0gcmVxdWlyZSgnLi9hcnJheScpO1xuXG5jb25zdCB7IGZpcnN0LCBzZWNvbmQsIGxhc3QgfSA9IGFycmF5O1xuXG5mdW5jdGlvbiBpc1BhdGhSZWxhdGl2ZVBhdGgocGF0aCkge1xuICBjb25zdCBwb3NpdGlvbiA9IHBhdGguc2VhcmNoKC9eXFwuezEsMn1cXC8vKSxcbiAgICAgICAgcGF0aFJlbGF0aXZlUGF0aCA9IChwb3NpdGlvbiAhPT0gLTEpO1xuXG4gIHJldHVybiBwYXRoUmVsYXRpdmVQYXRoO1xufVxuXG5mdW5jdGlvbiBpc1BhdGhBYnNvbHV0ZVBhdGgocGF0aCkge1xuICBjb25zdCBwYXRoUmVsYXRpdmVQYXRoID0gaXNQYXRoUmVsYXRpdmVQYXRoKHBhdGgpLFxuICAgICAgICBwYXRoQWJzb2x1dGVQYXRoID0gIXBhdGhSZWxhdGl2ZVBhdGg7IC8vL1xuXG4gIHJldHVybiBwYXRoQWJzb2x1dGVQYXRoO1xufVxuXG5mdW5jdGlvbiBpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKSB7XG4gIGNvbnN0IHBvc2l0aW9uID0gcGF0aC5zZWFyY2goL15bXlxcL10rXFwvPyQvKSxcbiAgICAgICAgcGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gKHBvc2l0aW9uICE9PSAtMSk7XG5cbiAgcmV0dXJuIHBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZTtcbn1cblxuZnVuY3Rpb24gaXNUb3Btb3N0RGlyZWN0b3J5TmFtZUNvbnRhaW5lZEluUGF0aCh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgcGF0aCkge1xuICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLnJlcGxhY2UoL1xcLyQvLCAnJyk7IC8vL1xuXG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoYF4ke3RvcG1vc3REaXJlY3RvcnlOYW1lfSg/OlxcXFwvLispPyRgKSxcbiAgICAgICAgcG9zaXRpb24gPSBwYXRoLnNlYXJjaChyZWdFeHApLFxuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZUNvbnRhaW5lZEluRmlsZVBhdGggPSAocG9zaXRpb24gIT09IC0xKTtcblxuICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVDb250YWluZWRJbkZpbGVQYXRoO1xufVxuXG5mdW5jdGlvbiBjb21iaW5lUGF0aHMoZGlyZWN0b3J5UGF0aCwgcmVsYXRpdmVQYXRoKSB7XG4gIGxldCBhYnNvbHV0ZVBhdGggPSBudWxsO1xuXG4gIGNvbnN0IGRpcmVjdG9yeVBhdGhTdWJFbnRyeU5hbWVzID0gZGlyZWN0b3J5UGF0aC5zcGxpdCgnLycpLFxuICAgICAgICByZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lcyA9IHJlbGF0aXZlUGF0aC5zcGxpdCgnLycpO1xuXG4gIGxldCBmaXJzdFJlbGF0aXZlRmlsZVBhdGhTdWJFbnRyeU5hbWUgPSBmaXJzdChyZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lcyksXG4gICAgICBsYXN0RGlyZWN0b3J5UGF0aFN1YkVudHJ5TmFtZTtcblxuICBpZiAoZmlyc3RSZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lID09PSAnLicpIHtcbiAgICByZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lcy5zaGlmdCgpO1xuICB9XG5cbiAgZmlyc3RSZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lID0gZmlyc3QocmVsYXRpdmVGaWxlUGF0aFN1YkVudHJ5TmFtZXMpO1xuICBsYXN0RGlyZWN0b3J5UGF0aFN1YkVudHJ5TmFtZSA9IGxhc3QoZGlyZWN0b3J5UGF0aFN1YkVudHJ5TmFtZXMpO1xuXG4gIHdoaWxlICgoZmlyc3RSZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lID09PSAnLi4nKSAmJiAobGFzdERpcmVjdG9yeVBhdGhTdWJFbnRyeU5hbWUgIT09IHVuZGVmaW5lZCkpIHtcbiAgICByZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lcy5zaGlmdCgpO1xuICAgIGRpcmVjdG9yeVBhdGhTdWJFbnRyeU5hbWVzLnBvcCgpO1xuXG4gICAgZmlyc3RSZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lID0gZmlyc3QocmVsYXRpdmVGaWxlUGF0aFN1YkVudHJ5TmFtZXMpO1xuICAgIGxhc3REaXJlY3RvcnlQYXRoU3ViRW50cnlOYW1lID0gbGFzdChkaXJlY3RvcnlQYXRoU3ViRW50cnlOYW1lcyk7XG4gIH1cblxuICBpZiAobGFzdERpcmVjdG9yeVBhdGhTdWJFbnRyeU5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGFic29sdXRlRmlsZVBhdGhTdWJFbnRyeU5hbWVzID0gW10uY29uY2F0KGRpcmVjdG9yeVBhdGhTdWJFbnRyeU5hbWVzKS5jb25jYXQocmVsYXRpdmVGaWxlUGF0aFN1YkVudHJ5TmFtZXMpO1xuXG4gICAgYWJzb2x1dGVQYXRoID0gYWJzb2x1dGVGaWxlUGF0aFN1YkVudHJ5TmFtZXMuam9pbignLycpO1xuICB9XG5cbiAgcmV0dXJuIGFic29sdXRlUGF0aDtcbn1cblxuZnVuY3Rpb24gY29uY2F0ZW5hdGVQYXRocyhwYXRoMSwgcGF0aDIpIHtcbiAgcGF0aDEgPSBwYXRoMS5yZXBsYWNlKC9cXC8kLywgJycpOyAgLy8vXG5cbiAgY29uc3QgY29tYmluZWRQYXRoID0gYCR7cGF0aDF9LyR7cGF0aDJ9YDtcblxuICByZXR1cm4gY29tYmluZWRQYXRoO1xufVxuXG5mdW5jdGlvbiBib3R0b21tb3N0TmFtZUZyb21QYXRoKHBhdGgpIHtcbiAgbGV0IGJvdHRvbW1vc3ROYW1lID0gbnVsbDtcblxuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXi4rXFwvKFteXFwvXStcXC8/KSQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgYm90dG9tbW9zdE5hbWUgPSBzZWNvbmRNYXRjaDsgIC8vL1xuICB9XG5cbiAgcmV0dXJuIGJvdHRvbW1vc3ROYW1lO1xufVxuXG5mdW5jdGlvbiB0b3Btb3N0RGlyZWN0b3J5UGF0aEZyb21QYXRoKHBhdGgpIHtcbiAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL14oLispXFwvW15cXC9dK1xcLz8kLyksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpLFxuICAgICAgICBkaXJlY3RvcnlQYXRoID0gc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiBkaXJlY3RvcnlQYXRoO1xufVxuXG5mdW5jdGlvbiB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKHBhdGgpIHtcbiAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gbnVsbDtcblxuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXihbXlxcL10rKVxcLy4rJC8pO1xuXG4gIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHNlY29uZE1hdGNoOyAgLy8vXG4gIH1cblxuICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG59XG5cbmZ1bmN0aW9uIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aChwYXRoKSB7XG4gIGxldCBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gbnVsbDtcblxuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvKF4uKylcXC9bXlxcL10rXFwvPyQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHNlY29uZE1hdGNoOyAvLy9cbiAgfVxuXG4gIHJldHVybiBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lO1xufVxuXG5mdW5jdGlvbiBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCkge1xuICBsZXQgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IG51bGw7XG5cbiAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL15bXlxcL10rXFwvKC4rKSQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHNlY29uZE1hdGNoO1xuICB9XG5cbiAgcmV0dXJuIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc1BhdGhSZWxhdGl2ZVBhdGg6IGlzUGF0aFJlbGF0aXZlUGF0aCxcbiAgaXNQYXRoQWJzb2x1dGVQYXRoOiBpc1BhdGhBYnNvbHV0ZVBhdGgsXG4gIGlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lOiBpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSxcbiAgaXNUb3Btb3N0RGlyZWN0b3J5TmFtZUNvbnRhaW5lZEluUGF0aDogaXNUb3Btb3N0RGlyZWN0b3J5TmFtZUNvbnRhaW5lZEluUGF0aCxcbiAgY29tYmluZVBhdGhzOiBjb21iaW5lUGF0aHMsXG4gIGNvbmNhdGVuYXRlUGF0aHM6IGNvbmNhdGVuYXRlUGF0aHMsXG4gIGJvdHRvbW1vc3ROYW1lRnJvbVBhdGg6IGJvdHRvbW1vc3ROYW1lRnJvbVBhdGgsXG4gIHRvcG1vc3REaXJlY3RvcnlQYXRoRnJvbVBhdGg6IHRvcG1vc3REaXJlY3RvcnlQYXRoRnJvbVBhdGgsXG4gIHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGg6IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgsXG4gIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aDogcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoLFxuICBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGg6IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZmlsZVN5c3RlbVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9maWxlU3lzdGVtJyk7XG5cbmNvbnN0IHsgcmVhZEZpbGUgfSA9IGZpbGVTeXN0ZW1VdGlsaXRpZXM7XG5cbmZ1bmN0aW9uIHBhcnNlRmlsZShmaWxlUGF0aCwgYXJncykge1xuICBjb25zdCBjb250ZW50ID0gcmVhZEZpbGUoZmlsZVBhdGgpLFxuICAgICAgICBwYXJzZWRDb250ZW50ID0gcGFyc2VDb250ZW50KGNvbnRlbnQsIGFyZ3MpO1xuXG4gIHJldHVybiBwYXJzZWRDb250ZW50O1xufVxuXG5mdW5jdGlvbiBwYXJzZUNvbnRlbnQoY29udGVudCwgYXJncykge1xuICBjb25zdCBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoJ1xcbicpLFxuICAgICAgICBwYXJzZWRMaW5lcyA9IHBhcnNlTGluZXMobGluZXMsIGFyZ3MpLFxuICAgICAgICBwYXJzZWRDb250ZW50ID0gcGFyc2VkTGluZXMuam9pbignXFxuJyk7XG5cbiAgcmV0dXJuIHBhcnNlZENvbnRlbnQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTGluZShsaW5lLCBhcmdzKSB7XG4gIGNvbnN0IHBhcnNlZExpbmUgPSBsaW5lLnJlcGxhY2UoL1xcJFxceyguKz8pXFx9L2csIGZ1bmN0aW9uKG1hdGNoLCB0b2tlbikge1xuICAgIGNvbnN0IHBhcnNlZFRva2VuID0gcGFyc2VUb2tlbih0b2tlbiwgYXJncyk7XG5cbiAgICByZXR1cm4gcGFyc2VkVG9rZW47XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWRMaW5lO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2VGaWxlOiBwYXJzZUZpbGUsXG4gIHBhcnNlQ29udGVudDogcGFyc2VDb250ZW50LFxuICBwYXJzZUxpbmU6IHBhcnNlTGluZVxufTtcblxuZnVuY3Rpb24gcGFyc2VMaW5lcyhsaW5lcywgYXJncykge1xuICBjb25zdCBwYXJzZWRMaW5lcyA9IGxpbmVzLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgY29uc3QgcGFyc2VkTGluZSA9IHBhcnNlTGluZShsaW5lLCBhcmdzKTtcblxuICAgIHJldHVybiBwYXJzZWRMaW5lO1xuICB9KTtcblxuICByZXR1cm4gcGFyc2VkTGluZXM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW4odG9rZW4sIGFyZ3MpIHtcbiAgbGV0IHBhcnNlZFRva2VuID0gJyc7XG5cbiAgaWYgKGFyZ3MuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgcGFyc2VkVG9rZW4gPSBhcmdzW3Rva2VuXTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZWRUb2tlbjtcbn1cbiIsIi8vIC5kaXJuYW1lLCAuYmFzZW5hbWUsIGFuZCAuZXh0bmFtZSBtZXRob2RzIGFyZSBleHRyYWN0ZWQgZnJvbSBOb2RlLmpzIHY4LjExLjEsXG4vLyBiYWNrcG9ydGVkIGFuZCB0cmFuc3BsaXRlZCB3aXRoIEJhYmVsLCB3aXRoIGJhY2t3YXJkcy1jb21wYXQgZml4ZXNcblxuLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIHJlc29sdmVzIC4gYW5kIC4uIGVsZW1lbnRzIGluIGEgcGF0aCBhcnJheSB3aXRoIGRpcmVjdG9yeSBuYW1lcyB0aGVyZVxuLy8gbXVzdCBiZSBubyBzbGFzaGVzLCBlbXB0eSBlbGVtZW50cywgb3IgZGV2aWNlIG5hbWVzIChjOlxcKSBpbiB0aGUgYXJyYXlcbi8vIChzbyBhbHNvIG5vIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMgLSBpdCBkb2VzIG5vdCBkaXN0aW5ndWlzaFxuLy8gcmVsYXRpdmUgYW5kIGFic29sdXRlIHBhdGhzKVxuZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkocGFydHMsIGFsbG93QWJvdmVSb290KSB7XG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciBsYXN0ID0gcGFydHNbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKGFsbG93QWJvdmVSb290KSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBwYXJ0cy51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuLy8gcGF0aC5yZXNvbHZlKFtmcm9tIC4uLl0sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZXNvbHZlID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXNvbHZlZFBhdGggPSAnJyxcbiAgICAgIHJlc29sdmVkQWJzb2x1dGUgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gLTEgJiYgIXJlc29sdmVkQWJzb2x1dGU7IGktLSkge1xuICAgIHZhciBwYXRoID0gKGkgPj0gMCkgPyBhcmd1bWVudHNbaV0gOiBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgLy8gU2tpcCBlbXB0eSBhbmQgaW52YWxpZCBlbnRyaWVzXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGgucmVzb2x2ZSBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9IGVsc2UgaWYgKCFwYXRoKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXNvbHZlZFBhdGggPSBwYXRoICsgJy8nICsgcmVzb2x2ZWRQYXRoO1xuICAgIHJlc29sdmVkQWJzb2x1dGUgPSBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xuICB9XG5cbiAgLy8gQXQgdGhpcyBwb2ludCB0aGUgcGF0aCBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gYSBmdWxsIGFic29sdXRlIHBhdGgsIGJ1dFxuICAvLyBoYW5kbGUgcmVsYXRpdmUgcGF0aHMgdG8gYmUgc2FmZSAobWlnaHQgaGFwcGVuIHdoZW4gcHJvY2Vzcy5jd2QoKSBmYWlscylcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcmVzb2x2ZWRQYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHJlc29sdmVkUGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFyZXNvbHZlZEFic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgcmV0dXJuICgocmVzb2x2ZWRBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHJlc29sdmVkUGF0aCkgfHwgJy4nO1xufTtcblxuLy8gcGF0aC5ub3JtYWxpemUocGF0aClcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMubm9ybWFsaXplID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgaXNBYnNvbHV0ZSA9IGV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKSxcbiAgICAgIHRyYWlsaW5nU2xhc2ggPSBzdWJzdHIocGF0aCwgLTEpID09PSAnLyc7XG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFpc0Fic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgaWYgKCFwYXRoICYmICFpc0Fic29sdXRlKSB7XG4gICAgcGF0aCA9ICcuJztcbiAgfVxuICBpZiAocGF0aCAmJiB0cmFpbGluZ1NsYXNoKSB7XG4gICAgcGF0aCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gKGlzQWJzb2x1dGUgPyAnLycgOiAnJykgKyBwYXRoO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24ocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuam9pbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcGF0aHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICByZXR1cm4gZXhwb3J0cy5ub3JtYWxpemUoZmlsdGVyKHBhdGhzLCBmdW5jdGlvbihwLCBpbmRleCkge1xuICAgIGlmICh0eXBlb2YgcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLmpvaW4gbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfVxuICAgIHJldHVybiBwO1xuICB9KS5qb2luKCcvJykpO1xufTtcblxuXG4vLyBwYXRoLnJlbGF0aXZlKGZyb20sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZWxhdGl2ZSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG4gIGZyb20gPSBleHBvcnRzLnJlc29sdmUoZnJvbSkuc3Vic3RyKDEpO1xuICB0byA9IGV4cG9ydHMucmVzb2x2ZSh0bykuc3Vic3RyKDEpO1xuXG4gIGZ1bmN0aW9uIHRyaW0oYXJyKSB7XG4gICAgdmFyIHN0YXJ0ID0gMDtcbiAgICBmb3IgKDsgc3RhcnQgPCBhcnIubGVuZ3RoOyBzdGFydCsrKSB7XG4gICAgICBpZiAoYXJyW3N0YXJ0XSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbmQgPSBhcnIubGVuZ3RoIC0gMTtcbiAgICBmb3IgKDsgZW5kID49IDA7IGVuZC0tKSB7XG4gICAgICBpZiAoYXJyW2VuZF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBbXTtcbiAgICByZXR1cm4gYXJyLnNsaWNlKHN0YXJ0LCBlbmQgLSBzdGFydCArIDEpO1xuICB9XG5cbiAgdmFyIGZyb21QYXJ0cyA9IHRyaW0oZnJvbS5zcGxpdCgnLycpKTtcbiAgdmFyIHRvUGFydHMgPSB0cmltKHRvLnNwbGl0KCcvJykpO1xuXG4gIHZhciBsZW5ndGggPSBNYXRoLm1pbihmcm9tUGFydHMubGVuZ3RoLCB0b1BhcnRzLmxlbmd0aCk7XG4gIHZhciBzYW1lUGFydHNMZW5ndGggPSBsZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZnJvbVBhcnRzW2ldICE9PSB0b1BhcnRzW2ldKSB7XG4gICAgICBzYW1lUGFydHNMZW5ndGggPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdmFyIG91dHB1dFBhcnRzID0gW107XG4gIGZvciAodmFyIGkgPSBzYW1lUGFydHNMZW5ndGg7IGkgPCBmcm9tUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBvdXRwdXRQYXJ0cy5wdXNoKCcuLicpO1xuICB9XG5cbiAgb3V0cHV0UGFydHMgPSBvdXRwdXRQYXJ0cy5jb25jYXQodG9QYXJ0cy5zbGljZShzYW1lUGFydHNMZW5ndGgpKTtcblxuICByZXR1cm4gb3V0cHV0UGFydHMuam9pbignLycpO1xufTtcblxuZXhwb3J0cy5zZXAgPSAnLyc7XG5leHBvcnRzLmRlbGltaXRlciA9ICc6JztcblxuZXhwb3J0cy5kaXJuYW1lID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykgcGF0aCA9IHBhdGggKyAnJztcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSByZXR1cm4gJy4nO1xuICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdCgwKTtcbiAgdmFyIGhhc1Jvb3QgPSBjb2RlID09PSA0NyAvKi8qLztcbiAgdmFyIGVuZCA9IC0xO1xuICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgZm9yICh2YXIgaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAxOyAtLWkpIHtcbiAgICBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgIGVuZCA9IGk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvclxuICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaWYgKGVuZCA9PT0gLTEpIHJldHVybiBoYXNSb290ID8gJy8nIDogJy4nO1xuICBpZiAoaGFzUm9vdCAmJiBlbmQgPT09IDEpIHtcbiAgICAvLyByZXR1cm4gJy8vJztcbiAgICAvLyBCYWNrd2FyZHMtY29tcGF0IGZpeDpcbiAgICByZXR1cm4gJy8nO1xuICB9XG4gIHJldHVybiBwYXRoLnNsaWNlKDAsIGVuZCk7XG59O1xuXG5mdW5jdGlvbiBiYXNlbmFtZShwYXRoKSB7XG4gIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHBhdGggPSBwYXRoICsgJyc7XG5cbiAgdmFyIHN0YXJ0ID0gMDtcbiAgdmFyIGVuZCA9IC0xO1xuICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgdmFyIGk7XG5cbiAgZm9yIChpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgIGlmIChwYXRoLmNoYXJDb2RlQXQoaSkgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBwYXRoIHNlcGFyYXRvciB0aGF0IHdhcyBub3QgcGFydCBvZiBhIHNldCBvZiBwYXRoXG4gICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xuICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgIHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZW5kID09PSAtMSkge1xuICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3IsIG1hcmsgdGhpcyBhcyB0aGUgZW5kIG9mIG91clxuICAgICAgLy8gcGF0aCBjb21wb25lbnRcbiAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgZW5kID0gaSArIDE7XG4gICAgfVxuICB9XG5cbiAgaWYgKGVuZCA9PT0gLTEpIHJldHVybiAnJztcbiAgcmV0dXJuIHBhdGguc2xpY2Uoc3RhcnQsIGVuZCk7XG59XG5cbi8vIFVzZXMgYSBtaXhlZCBhcHByb2FjaCBmb3IgYmFja3dhcmRzLWNvbXBhdGliaWxpdHksIGFzIGV4dCBiZWhhdmlvciBjaGFuZ2VkXG4vLyBpbiBuZXcgTm9kZS5qcyB2ZXJzaW9ucywgc28gb25seSBiYXNlbmFtZSgpIGFib3ZlIGlzIGJhY2twb3J0ZWQgaGVyZVxuZXhwb3J0cy5iYXNlbmFtZSA9IGZ1bmN0aW9uIChwYXRoLCBleHQpIHtcbiAgdmFyIGYgPSBiYXNlbmFtZShwYXRoKTtcbiAgaWYgKGV4dCAmJiBmLnN1YnN0cigtMSAqIGV4dC5sZW5ndGgpID09PSBleHQpIHtcbiAgICBmID0gZi5zdWJzdHIoMCwgZi5sZW5ndGggLSBleHQubGVuZ3RoKTtcbiAgfVxuICByZXR1cm4gZjtcbn07XG5cbmV4cG9ydHMuZXh0bmFtZSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHBhdGggPSBwYXRoICsgJyc7XG4gIHZhciBzdGFydERvdCA9IC0xO1xuICB2YXIgc3RhcnRQYXJ0ID0gMDtcbiAgdmFyIGVuZCA9IC0xO1xuICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgLy8gVHJhY2sgdGhlIHN0YXRlIG9mIGNoYXJhY3RlcnMgKGlmIGFueSkgd2Ugc2VlIGJlZm9yZSBvdXIgZmlyc3QgZG90IGFuZFxuICAvLyBhZnRlciBhbnkgcGF0aCBzZXBhcmF0b3Igd2UgZmluZFxuICB2YXIgcHJlRG90U3RhdGUgPSAwO1xuICBmb3IgKHZhciBpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgcGF0aCBzZXBhcmF0b3IgdGhhdCB3YXMgbm90IHBhcnQgb2YgYSBzZXQgb2YgcGF0aFxuICAgICAgICAvLyBzZXBhcmF0b3JzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZywgc3RvcCBub3dcbiAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICBzdGFydFBhcnQgPSBpICsgMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICBpZiAoZW5kID09PSAtMSkge1xuICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3IsIG1hcmsgdGhpcyBhcyB0aGUgZW5kIG9mIG91clxuICAgICAgLy8gZXh0ZW5zaW9uXG4gICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgIGVuZCA9IGkgKyAxO1xuICAgIH1cbiAgICBpZiAoY29kZSA9PT0gNDYgLyouKi8pIHtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBvdXIgZmlyc3QgZG90LCBtYXJrIGl0IGFzIHRoZSBzdGFydCBvZiBvdXIgZXh0ZW5zaW9uXG4gICAgICAgIGlmIChzdGFydERvdCA9PT0gLTEpXG4gICAgICAgICAgc3RhcnREb3QgPSBpO1xuICAgICAgICBlbHNlIGlmIChwcmVEb3RTdGF0ZSAhPT0gMSlcbiAgICAgICAgICBwcmVEb3RTdGF0ZSA9IDE7XG4gICAgfSBlbHNlIGlmIChzdGFydERvdCAhPT0gLTEpIHtcbiAgICAgIC8vIFdlIHNhdyBhIG5vbi1kb3QgYW5kIG5vbi1wYXRoIHNlcGFyYXRvciBiZWZvcmUgb3VyIGRvdCwgc28gd2Ugc2hvdWxkXG4gICAgICAvLyBoYXZlIGEgZ29vZCBjaGFuY2UgYXQgaGF2aW5nIGEgbm9uLWVtcHR5IGV4dGVuc2lvblxuICAgICAgcHJlRG90U3RhdGUgPSAtMTtcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhcnREb3QgPT09IC0xIHx8IGVuZCA9PT0gLTEgfHxcbiAgICAgIC8vIFdlIHNhdyBhIG5vbi1kb3QgY2hhcmFjdGVyIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgZG90XG4gICAgICBwcmVEb3RTdGF0ZSA9PT0gMCB8fFxuICAgICAgLy8gVGhlIChyaWdodC1tb3N0KSB0cmltbWVkIHBhdGggY29tcG9uZW50IGlzIGV4YWN0bHkgJy4uJ1xuICAgICAgcHJlRG90U3RhdGUgPT09IDEgJiYgc3RhcnREb3QgPT09IGVuZCAtIDEgJiYgc3RhcnREb3QgPT09IHN0YXJ0UGFydCArIDEpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgcmV0dXJuIHBhdGguc2xpY2Uoc3RhcnREb3QsIGVuZCk7XG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIgKHhzLCBmKSB7XG4gICAgaWYgKHhzLmZpbHRlcikgcmV0dXJuIHhzLmZpbHRlcihmKTtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZih4c1tpXSwgaSwgeHMpKSByZXMucHVzaCh4c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbi8vIFN0cmluZy5wcm90b3R5cGUuc3Vic3RyIC0gbmVnYXRpdmUgaW5kZXggZG9uJ3Qgd29yayBpbiBJRThcbnZhciBzdWJzdHIgPSAnYWInLnN1YnN0cigtMSkgPT09ICdiJ1xuICAgID8gZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikgeyByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKSB9XG4gICAgOiBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7XG4gICAgICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gc3RyLmxlbmd0aCArIHN0YXJ0O1xuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKTtcbiAgICB9XG47XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIl19
