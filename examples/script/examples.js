(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.examples = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mat4 = require('gl-mat4'); ///

var domUtilities = require('./utilities/dom'),
    textureMixin = require('./mixin/texture'),
    bufferMixin = require('./mixin/buffer'),
    shaderMixin = require('./mixin/shader'),
    colourMixin = require('./mixin/colour'),
    matrixMixin = require('./mixin/matrix'),
    depthMixin = require('./mixin/depth');

var domElementFromSelector = domUtilities.domElementFromSelector;


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

    this.CLAMP_TO_EDGE_PARAM = this.context.CLAMP_TO_EDGE; ///
    this.LINEAR_PARAM = this.context.LINEAR; ///
    this.RGBA_FORMAT = this.context.RGBA; ///
    this.DEPTH_TEST_CAP = this.context.DEPTH_TEST; ///
    this.LEQUAL_FUNCTION = this.context.LEQUAL; ///
    this.STATIC_DRAW_USAGE = this.context.STATIC_DRAW; ///
    this.LINK_STATUS_PNAME = this.context.LINK_STATUS; ///
    this.COMPILE_STATUS_PNAME = this.context.COMPILE_STATUS; ///
    this.TEXTURE_WRAP_S_PNAME = this.context.TEXTURE_WRAP_S; ///
    this.TEXTURE_WRAP_T_PNAME = this.context.TEXTURE_WRAP_T; ///
    this.TEXTURE_MIN_FILTER_PNAME = this.context.TEXTURE_MIN_FILTER; ///
    this.TRIANGLE_STRIP_MODE = this.context.TRIANGLE_STRIP; ///
    this.TRIANGLES_MODE = this.context.TRIANGLES; ///
    this.FLOAT_TYPE = this.context.FLOAT; ///
    this.UNSIGNED_BYTE_TYPE = this.context.UNSIGNED_BYTE; ///
    this.VERTEX_SHADER_TYPE = this.context.VERTEX_SHADER; ///
    this.UNSIGNED_SHORT_TYPE = this.context.UNSIGNED_SHORT; ///
    this.FRAGMENT_SHADER_TYPE = this.context.FRAGMENT_SHADER; ///
    this.COLOR_BUFFER_BIT_MASK = this.context.COLOR_BUFFER_BIT; ///
    this.DEPTH_BUFFER_BIT_MASK = this.context.DEPTH_BUFFER_BIT; ///
    this.TEXTURE0_TARGET = this.context.TEXTURE0; ///
    this.TEXTURE_2D_TARGET = this.context.TEXTURE_2D; ///
    this.ARRAY_BUFFER_TARGET = this.context.ARRAY_BUFFER; ///
    this.ELEMENT_ARRAY_BUFFER_TARGET = this.context.ELEMENT_ARRAY_BUFFER; ///
  }

  _createClass(Canvas, [{
    key: 'getContext',
    value: function getContext() {
      return this.context;
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
    key: 'setUniformLocationIntegerValue',
    value: function setUniformLocationIntegerValue(uniformLocation, integerValue) {
      this.context.uniform1i(uniformLocation, integerValue);
    }
  }, {
    key: 'useProgram',
    value: function useProgram(program) {
      this.context.useProgram(program);
    }
  }, {
    key: 'render',
    value: function render(rotation, position, perspective, shaderProgram) {
      var rotationMatrix = rotation.getMatrix(),
          positionMatrix = position.getMatrix(),
          perspectiveMatrix = perspective.getMatrix(),
          rotationMatrixUniformLocation = this.getUniformLocation(shaderProgram, 'uRotationMatrix'),
          positionMatrixUniformLocation = this.getUniformLocation(shaderProgram, 'uPositionMatrix'),
          perspectiveMatrixUniformLocation = this.getUniformLocation(shaderProgram, 'uPerspectiveMatrix');

      this.clearDepth();
      this.clearColour();
      this.clearDepthBuffer();
      this.clearColourBuffer();

      this.applyMatrix(rotationMatrixUniformLocation, rotationMatrix);
      this.applyMatrix(positionMatrixUniformLocation, positionMatrix);
      this.applyMatrix(perspectiveMatrixUniformLocation, perspectiveMatrix);
    }
  }, {
    key: 'drawElements',
    value: function drawElements(count) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOffset;

      var mode = this.TRIANGLES_MODE,
          type = this.UNSIGNED_SHORT_TYPE;

      this.context.drawElements(mode, count, type, offset);
    }
  }]);

  return Canvas;
}();

Object.assign(Canvas.prototype, textureMixin);
Object.assign(Canvas.prototype, bufferMixin);
Object.assign(Canvas.prototype, shaderMixin);
Object.assign(Canvas.prototype, colourMixin);
Object.assign(Canvas.prototype, matrixMixin);
Object.assign(Canvas.prototype, depthMixin);

module.exports = Canvas;

},{"./mixin/buffer":8,"./mixin/colour":9,"./mixin/depth":10,"./mixin/matrix":11,"./mixin/shader":12,"./mixin/texture":13,"./utilities/dom":17,"gl-mat4":27}],2:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CanvasElement = function CanvasElement() {
  _classCallCheck(this, CanvasElement);
};

module.exports = CanvasElement;

},{}],3:[function(require,module,exports){
'use strict';

module.exports = {
  webGLDemo: require('./examples/webGLDemo'),
  intermediate: require('./examples/intermediate'),
  containerHouse: require('./examples/containerHouse'),
  schoonerCecilie: require('./examples/schoonerCecilie')
};

},{"./examples/containerHouse":4,"./examples/intermediate":5,"./examples/schoonerCecilie":6,"./examples/webGLDemo":7}],4:[function(require,module,exports){
'use strict';

var Canvas = require('../canvas'),
    ModelView = require('../position'),
    Perspective = require('../perspective');

var containerHouse = function containerHouse() {
      var canvas = new Canvas(),
          shaderProgram = canvas.createShaderProgram(),
          positions = [+1.0, +1.0, -1.0, +1.0, +1.0, -1.0, -1.0, -1.0],
          positionsBuffer = canvas.createBuffer(positions),
          clientWidth = canvas.getClientWidth(),
          clientHeight = canvas.getClientHeight(),
          modelView = new ModelView(),
          perspective = new Perspective(clientWidth, clientHeight),
          vertexPositionLocation = canvas.getProgramAttributeLocation(shaderProgram, 'aVertexPosition'),
          projectionMatrixLocation = canvas.getProgramUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrixLocation = canvas.getProgramUniformLocation(shaderProgram, 'uModelViewMatrix');

      canvas.clearDepth();
      canvas.clearColour();
      canvas.clearDepthBuffer();
      canvas.clearColourBuffer();

      canvas.enableDepthTesting();
      canvas.enableDepthFunction();

      canvas.useProgram(shaderProgram);
      canvas.usePerspective(projectionMatrixLocation, perspective); ///
      canvas.useModelView(modelViewMatrixLocation, modelView);

      canvas.useBuffer(vertexPositionLocation, positionsBuffer); ///

      var offset = 0,
          vertexCount = 4;

      canvas.render(offset, vertexCount);
};

module.exports = containerHouse;

},{"../canvas":1,"../perspective":14,"../position":15}],5:[function(require,module,exports){
'use strict';

var Canvas = require('../canvas'),
    Rotation = require('../rotation'),
    Position = require('../position'),
    Perspective = require('../perspective');

var intermediate = function intermediate() {
  var canvas = new Canvas(),
      context = canvas.getContext();

  if (!context) {
    return;
  }

  var vertexShaderSource = '\n  \n          attribute vec4 aVertexPosition;\n          attribute vec4 aVertexColour;\n          attribute vec2 aTextureCoordinate;\n          \n          uniform mat4 uRotationMatrix;\n          uniform mat4 uPositionMatrix;\n          uniform mat4 uPerspectiveMatrix;\n          \n          varying lowp vec4 vColour;\n          varying highp vec2 vTextureCoordinate;\n      \n          void main() {\n            gl_Position = uPerspectiveMatrix * uPositionMatrix * uRotationMatrix * aVertexPosition;\n            vColour = aVertexColour;\n            vTextureCoordinate = aTextureCoordinate;\n          }\n          \n        ',
      fragmentShaderSource = '\n        \n          varying lowp vec4 vColour;\n          varying highp vec2 vTextureCoordinate;\n          \n          uniform sampler2D uSampler;\n\n          void main() {\n            // gl_FragColor = vColour;\n            gl_FragColor = texture2D(uSampler, vTextureCoordinate);\n          }\n          \n        ',
      shaderProgram = canvas.createShaderProgram(vertexShaderSource, fragmentShaderSource),
      clientWidth = canvas.getClientWidth(),
      clientHeight = canvas.getClientHeight(),
      position = new Position(),
      perspective = new Perspective(clientWidth, clientHeight);

  createAndBindVertexPositionBuffer(canvas, shaderProgram);

  // createAndBindVertexColourBuffer(canvas, shaderProgram);

  createAndBindTextureCoordinateBuffer(canvas, shaderProgram);

  var count = createVertexIndexElementBuffer(canvas);

  canvas.useProgram(shaderProgram);

  canvas.enableDepthTesting();
  canvas.enableDepthFunction();

  var initialTime = null;

  var image = new Image();

  image.onload = function () {
    var target = canvas.TEXTURE0_TARGET,
        uSamplerUniformLocationIntegerValue = 0,
        uSamplerUniformLocation = canvas.getUniformLocation(shaderProgram, 'uSampler');

    canvas.createTexture(image);

    canvas.activateTexture(target);

    canvas.setUniformLocationIntegerValue(uSamplerUniformLocation, uSamplerUniformLocationIntegerValue);

    requestAnimationFrame(render);
  };

  image.src = 'texture/bricks.jpg';

  function render(time) {
    if (initialTime === null) {
      initialTime = time;
    }

    var elapsedTime = time - initialTime,
        xAngle = elapsedTime / 1000,
        yAngle = elapsedTime / 1000,
        rotation = new Rotation(xAngle, yAngle);

    canvas.render(rotation, position, perspective, shaderProgram);

    canvas.drawElements(count);

    requestAnimationFrame(render);
  }
};

module.exports = intermediate;

function createAndBindVertexPositionBuffer(canvas, shaderProgram) {
  var vertexPositionData = [-1.0, -1.0, +1.0, +1.0, -1.0, +1.0, +1.0, +1.0, +1.0, -1.0, +1.0, +1.0, -1.0, -1.0, -1.0, -1.0, +1.0, -1.0, +1.0, +1.0, -1.0, +1.0, -1.0, -1.0, -1.0, +1.0, -1.0, -1.0, +1.0, +1.0, +1.0, +1.0, +1.0, +1.0, +1.0, -1.0, -1.0, -1.0, -1.0, +1.0, -1.0, -1.0, +1.0, -1.0, +1.0, -1.0, -1.0, +1.0, +1.0, -1.0, -1.0, +1.0, +1.0, -1.0, +1.0, +1.0, +1.0, +1.0, -1.0, +1.0, -1.0, -1.0, -1.0, -1.0, -1.0, +1.0, -1.0, +1.0, +1.0, -1.0, +1.0, -1.0],
      vertexPositionBuffer = canvas.createBuffer(vertexPositionData),
      vertexPositionAttributeLocation = canvas.getAttributeLocation(shaderProgram, 'aVertexPosition'),
      vertexPositionComponents = 3;

  canvas.bindBuffer(vertexPositionBuffer, vertexPositionAttributeLocation, vertexPositionComponents);

  var vertexPositionDataLength = vertexPositionData.length,
      count = vertexPositionDataLength / vertexPositionComponents;

  return count;
}

function createAndBindVertexColourBuffer(canvas, shaderProgram) {
  var vertexColourData = [1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0],
      vertexColourBuffer = canvas.createBuffer(vertexColourData),
      vertexColourAttributeLocation = canvas.getAttributeLocation(shaderProgram, 'aVertexColour'),
      vertexColourComponents = 4;

  canvas.bindBuffer(vertexColourBuffer, vertexColourAttributeLocation, vertexColourComponents);
}

function createAndBindTextureCoordinateBuffer(canvas, shaderProgram) {
  var textureCoordinateData = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0],
      textureCoordinateBuffer = canvas.createBuffer(textureCoordinateData),
      textureCoordinateAttributeLocation = canvas.getAttributeLocation(shaderProgram, 'aTextureCoordinate'),
      textureCoordinateComponents = 2;

  canvas.bindBuffer(textureCoordinateBuffer, textureCoordinateAttributeLocation, textureCoordinateComponents);
}

function createVertexIndexElementBuffer(canvas) {
  var vertexIndexData = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23],
      vertexIndexElementBuffer = canvas.createElementBuffer(vertexIndexData),
      vertexIndexDataLength = vertexIndexData.length,
      count = vertexIndexDataLength; ///

  canvas.bindElementBuffer(vertexIndexElementBuffer);

  return count;
}

},{"../canvas":1,"../perspective":14,"../position":15,"../rotation":16}],6:[function(require,module,exports){
'use strict';

var Canvas = require('../canvas'),
    CanvasElement = require('../canvasElement');

var schoonerCecilie = function schoonerCecilie() {};

module.exports = schoonerCecilie;

},{"../canvas":1,"../canvasElement":2}],7:[function(require,module,exports){
'use strict';

var mat4 = require('gl-mat4');

var webGLDemo = function webGLDemo() {
  var canvas = document.querySelector('canvas');
  var gl = canvas.getContext('webgl');

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  var vsSource = '\n    attribute vec4 aVertexPosition;\n\n    uniform mat4 uModelViewMatrix;\n    uniform mat4 uProjectionMatrix;\n\n    void main() {\n      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;\n    }\n  ';

  var fsSource = '\n    void main() {\n      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n    }\n  ';

  var shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  var programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition')
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
    }
  };

  var buffers = initBuffers(gl);

  drawScene(gl, programInfo, buffers);
};

module.exports = webGLDemo;

function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  var fieldOfView = 45 * Math.PI / 180; // in radians
  var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  var zNear = 0.1;
  var zFar = 100.0;
  var projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  var modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix, // destination matrix
  modelViewMatrix, // matrix to translate
  [-0.0, 0.0, -6.0]); // amount to translate

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  {
    var numComponents = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

  {
    var _offset = 0;
    var vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, _offset, vertexCount);
  }
}

function initShaderProgram(gl, vsSource, fsSource) {
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

function loadShader(gl, type, source) {
  var shader = gl.createShader(type);

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function initBuffers(gl) {

  var positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return {
    position: positionBuffer
  };
}

},{"gl-mat4":27}],8:[function(require,module,exports){
'use strict';

function createBuffer(data) {
  var target = this.ARRAY_BUFFER_TARGET,
      buffer = this.context.createBuffer(),
      float32Array = new Float32Array(data),
      usage = this.STATIC_DRAW_USAGE;

  this.context.bindBuffer(target, buffer);

  this.context.bufferData(target, float32Array, usage);

  return buffer;
}

function bindBuffer(buffer, attributeLocation, components) {
  var target = this.ARRAY_BUFFER_TARGET,
      type = this.FLOAT_TYPE,
      normalize = false,
      stride = 0,
      offset = 0;

  this.context.bindBuffer(target, buffer);

  this.context.vertexAttribPointer(attributeLocation, components, type, normalize, stride, offset);

  this.context.enableVertexAttribArray(attributeLocation);
}

function createElementBuffer(data) {
  var target = this.ELEMENT_ARRAY_BUFFER_TARGET,
      elementBuffer = this.context.createBuffer(),
      uint16Array = new Uint16Array(data),
      usage = this.STATIC_DRAW_USAGE;

  this.context.bindBuffer(target, elementBuffer);

  this.context.bufferData(target, uint16Array, usage);

  return elementBuffer;
}

function bindElementBuffer(elementBuffer) {
  var target = this.ELEMENT_ARRAY_BUFFER_TARGET;

  this.context.bindBuffer(target, elementBuffer);
}

var bufferMixin = {
  createBuffer: createBuffer,
  bindBuffer: bindBuffer,
  createElementBuffer: createElementBuffer,
  bindElementBuffer: bindElementBuffer
};

module.exports = bufferMixin;

},{}],9:[function(require,module,exports){
'use strict';

var defaultRed = 0.0,
    defaultBlue = 0.0,
    defaultGreen = 0.0,
    defaultAlpha = 1.0;

function clearColour() {
  var red = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultRed;
  var green = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultGreen;
  var blue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultBlue;
  var alpha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultAlpha;
  this.context.clearColor(red, green, blue, alpha);
}

function clearColourBuffer() {
  var mask = this.COLOR_BUFFER_BIT_MASK;

  this.context.clear(mask);
}

var colourMixin = {
  clearColour: clearColour,
  clearColourBuffer: clearColourBuffer
};

module.exports = colourMixin;

},{}],10:[function(require,module,exports){
'use strict';

var defaultDepth = 1.0;

function clearDepth() {
  var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultDepth;
  this.context.clearDepth(depth);
}

function clearDepthBuffer() {
  var mask = this.DEPTH_BUFFER_BIT_MASK;

  this.context.clear(mask);
}

function enableDepthTesting() {
  var cap = this.DEPTH_TEST_CAP;

  this.context.enable(cap);
}

function enableDepthFunction() {
  var func = this.LEQUAL_FUNCTION;

  this.context.depthFunc(func);
}

var depthMixin = {
  clearDepth: clearDepth,
  clearDepthBuffer: clearDepthBuffer,
  enableDepthTesting: enableDepthTesting,
  enableDepthFunction: enableDepthFunction
};

module.exports = depthMixin;

},{}],11:[function(require,module,exports){
'use strict';

function applyMatrix(uniformLocation, matrix) {
  var transpose = false; ///

  this.context.uniformMatrix4fv(uniformLocation, transpose, matrix);
}

var bufferMixin = {
  applyMatrix: applyMatrix
};

module.exports = bufferMixin;

},{}],12:[function(require,module,exports){
'use strict';

function createShader(type, shaderSource) {
  var shader = this.context.createShader(type),
      pname = this.COMPILE_STATUS_PNAME;

  this.context.shaderSource(shader, shaderSource);

  this.context.compileShader(shader);

  var compileStatus = this.context.getShaderParameter(shader, pname);

  if (!compileStatus) {
    throw new Error('Unable to create the shader.');
  }

  return shader;
}

function createVertexShader(vertexShaderSource) {
  var type = this.VERTEX_SHADER_TYPE,
      vertexShader = this.createShader(type, vertexShaderSource);

  return vertexShader;
}

function createFragmentShader(fragmentShaderSource) {
  var type = this.FRAGMENT_SHADER_TYPE,
      vertexShader = this.createShader(type, fragmentShaderSource);

  return vertexShader;
}

function createShaderProgram(vertexShaderSource, fragmentShaderSource) {
  var shaderProgram = this.context.createProgram(),
      vertexShader = this.createVertexShader(vertexShaderSource),
      fragmentShader = this.createFragmentShader(fragmentShaderSource),
      pname = this.LINK_STATUS_PNAME;

  this.context.attachShader(shaderProgram, vertexShader);
  this.context.attachShader(shaderProgram, fragmentShader);

  this.context.linkProgram(shaderProgram);

  var linkStatus = this.context.getProgramParameter(shaderProgram, pname);

  if (!linkStatus) {
    var message = this.context.getProgramInfoLog(shaderProgram); ///

    throw new Error('Unable to create the shader program, \'' + message + '\'.');
  }

  return shaderProgram;
}

var shaderMixin = {
  createShader: createShader,
  createVertexShader: createVertexShader,
  createFragmentShader: createFragmentShader,
  createShaderProgram: createShaderProgram
};

module.exports = shaderMixin;

},{}],13:[function(require,module,exports){
'use strict';

function createTexture(image) {
  var texture = this.context.createTexture(),
      target = this.TEXTURE_2D_TARGET,
      level = 0,
      internalFormat = this.RGBA_FORMAT,
      format = this.RGBA_FORMAT,
      type = this.UNSIGNED_BYTE_TYPE;

  this.context.bindTexture(target, texture);

  this.context.texImage2D(target, level, internalFormat, format, type, image);

  this.context.texParameteri(target, this.TEXTURE_WRAP_S_PNAME, this.CLAMP_TO_EDGE_PARAM);
  this.context.texParameteri(target, this.TEXTURE_WRAP_T_PNAME, this.CLAMP_TO_EDGE_PARAM);
  this.context.texParameteri(target, this.TEXTURE_MIN_FILTER_PNAME, this.LINEAR_PARAM);
}

function activateTexture(target) {
  this.context.activeTexture(target);
}

var textureMixin = {
  createTexture: createTexture,
  activateTexture: activateTexture
};

module.exports = textureMixin;

},{}],14:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mat4 = require('gl-mat4'); ///

var defaultFieldOfView = 45 * Math.PI / 180,
    defaultZNear = 0.1,
    defaultZFar = 100.0;

var Perspective = function () {
  function Perspective(clientWidth, clientHeight) {
    var fieldOfView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultFieldOfView;
    var zNear = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultZNear;
    var zFar = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultZFar;

    _classCallCheck(this, Perspective);

    var aspectRatio = clientWidth / clientHeight;

    this.matrix = mat4.create();

    mat4.perspective(this.matrix, fieldOfView, aspectRatio, zNear, zFar);
  }

  _createClass(Perspective, [{
    key: 'getMatrix',
    value: function getMatrix() {
      return this.matrix;
    }
  }]);

  return Perspective;
}();

module.exports = Perspective;

},{"gl-mat4":27}],15:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mat4 = require('gl-mat4'); ///

var defaultXOffset = +0.0,
    defaultYOffset = +0.0,
    defaultZOffset = -6.0;

var Position = function () {
  function Position() {
    var xOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultXOffset;
    var yOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultYOffset;
    var zOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultZOffset;

    _classCallCheck(this, Position);

    this.matrix = mat4.create();

    var offsetVector = [xOffset, yOffset, zOffset];

    mat4.translate(this.matrix, this.matrix, offsetVector);
  }

  _createClass(Position, [{
    key: 'getMatrix',
    value: function getMatrix() {
      return this.matrix;
    }
  }]);

  return Position;
}();

module.exports = Position;

},{"gl-mat4":27}],16:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mat4 = require('gl-mat4'); ///

var defaultXAngle = 0.0,
    defaultYAngle = 0.0,
    defaultZAngle = 6.0;

var Rotation = function () {
  function Rotation() {
    var xAngle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultXAngle;
    var yAngle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultYAngle;
    var zAngle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultZAngle;

    _classCallCheck(this, Rotation);

    this.matrix = mat4.create();

    var xAxisVectorArray = [1, 0, 0],
        yAxisVectorArray = [0, 1, 0],
        zAxisVectorArray = [0, 0, 1];

    mat4.rotate(this.matrix, this.matrix, xAngle, xAxisVectorArray);
    mat4.rotate(this.matrix, this.matrix, yAngle, yAxisVectorArray);
    mat4.rotate(this.matrix, this.matrix, zAngle, zAxisVectorArray);
  }

  _createClass(Rotation, [{
    key: 'getMatrix',
    value: function getMatrix() {
      return this.matrix;
    }
  }]);

  return Rotation;
}();

module.exports = Rotation;

},{"gl-mat4":27}],17:[function(require,module,exports){
'use strict';

function domElementFromSelector(selector) {
  var domElement = typeof selector === 'string' ? document.querySelectorAll(selector)[0] : ///
  selector; ///

  return domElement;
}

module.exports = {
  domElementFromSelector: domElementFromSelector
};

},{}],18:[function(require,module,exports){
module.exports = adjoint;

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function adjoint(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};
},{}],19:[function(require,module,exports){
module.exports = clone;

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
function clone(a) {
    var out = new Float32Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
},{}],20:[function(require,module,exports){
module.exports = copy;

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
},{}],21:[function(require,module,exports){
module.exports = create;

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
    var out = new Float32Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};
},{}],22:[function(require,module,exports){
module.exports = determinant;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

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
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};
},{}],23:[function(require,module,exports){
module.exports = fromQuat;

/**
 * Creates a matrix from a quaternion rotation.
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @returns {mat4} out
 */
function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};
},{}],24:[function(require,module,exports){
module.exports = fromRotationTranslation;

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromRotationTranslation(out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};
},{}],25:[function(require,module,exports){
module.exports = frustum;

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};
},{}],26:[function(require,module,exports){
module.exports = identity;

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};
},{}],27:[function(require,module,exports){
module.exports = {
  create: require('./create')
  , clone: require('./clone')
  , copy: require('./copy')
  , identity: require('./identity')
  , transpose: require('./transpose')
  , invert: require('./invert')
  , adjoint: require('./adjoint')
  , determinant: require('./determinant')
  , multiply: require('./multiply')
  , translate: require('./translate')
  , scale: require('./scale')
  , rotate: require('./rotate')
  , rotateX: require('./rotateX')
  , rotateY: require('./rotateY')
  , rotateZ: require('./rotateZ')
  , fromRotationTranslation: require('./fromRotationTranslation')
  , fromQuat: require('./fromQuat')
  , frustum: require('./frustum')
  , perspective: require('./perspective')
  , perspectiveFromFieldOfView: require('./perspectiveFromFieldOfView')
  , ortho: require('./ortho')
  , lookAt: require('./lookAt')
  , str: require('./str')
}
},{"./adjoint":18,"./clone":19,"./copy":20,"./create":21,"./determinant":22,"./fromQuat":23,"./fromRotationTranslation":24,"./frustum":25,"./identity":26,"./invert":28,"./lookAt":29,"./multiply":30,"./ortho":31,"./perspective":32,"./perspectiveFromFieldOfView":33,"./rotate":34,"./rotateX":35,"./rotateY":36,"./rotateZ":37,"./scale":38,"./str":39,"./translate":40,"./transpose":41}],28:[function(require,module,exports){
module.exports = invert;

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

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

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};
},{}],29:[function(require,module,exports){
var identity = require('./identity');

module.exports = lookAt;

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < 0.000001 &&
        Math.abs(eyey - centery) < 0.000001 &&
        Math.abs(eyez - centerz) < 0.000001) {
        return identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};
},{"./identity":26}],30:[function(require,module,exports){
module.exports = multiply;

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};
},{}],31:[function(require,module,exports){
module.exports = ortho;

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};
},{}],32:[function(require,module,exports){
module.exports = perspective;

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};
},{}],33:[function(require,module,exports){
module.exports = perspectiveFromFieldOfView;

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
}


},{}],34:[function(require,module,exports){
module.exports = rotate;

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < 0.000001) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};
},{}],35:[function(require,module,exports){
module.exports = rotateX;

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateX(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};
},{}],36:[function(require,module,exports){
module.exports = rotateY;

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateY(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};
},{}],37:[function(require,module,exports){
module.exports = rotateZ;

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateZ(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};
},{}],38:[function(require,module,exports){
module.exports = scale;

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
},{}],39:[function(require,module,exports){
module.exports = str;

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};
},{}],40:[function(require,module,exports){
module.exports = translate;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};
},{}],41:[function(require,module,exports){
module.exports = transpose;

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};
},{}]},{},[3])(3)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvY2FudmFzLmpzIiwiZXM2L2NhbnZhc0VsZW1lbnQuanMiLCJlczYvZXhhbXBsZXMuanMiLCJlczYvZXhhbXBsZXMvY29udGFpbmVySG91c2UuanMiLCJlczYvZXhhbXBsZXMvaW50ZXJtZWRpYXRlLmpzIiwiZXM2L2V4YW1wbGVzL3NjaG9vbmVyQ2VjaWxpZS5qcyIsImVzNi9leGFtcGxlcy93ZWJHTERlbW8uanMiLCJlczYvbWl4aW4vYnVmZmVyLmpzIiwiZXM2L21peGluL2NvbG91ci5qcyIsImVzNi9taXhpbi9kZXB0aC5qcyIsImVzNi9taXhpbi9tYXRyaXguanMiLCJlczYvbWl4aW4vc2hhZGVyLmpzIiwiZXM2L21peGluL3RleHR1cmUuanMiLCJlczYvcGVyc3BlY3RpdmUuanMiLCJlczYvcG9zaXRpb24uanMiLCJlczYvcm90YXRpb24uanMiLCJlczYvdXRpbGl0aWVzL2RvbS5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L2Fkam9pbnQuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9jbG9uZS5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L2NvcHkuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9kZXRlcm1pbmFudC5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L2Zyb21RdWF0LmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24uanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9mcnVzdHVtLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvaWRlbnRpdHkuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L2ludmVydC5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L2xvb2tBdC5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L211bHRpcGx5LmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvb3J0aG8uanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9wZXJzcGVjdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L3BlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3LmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvcm90YXRlLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvcm90YXRlWC5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L3JvdGF0ZVkuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9yb3RhdGVaLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvc2NhbGUuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9zdHIuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC90cmFuc2xhdGUuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC90cmFuc3Bvc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7O0FBRUEsSUFBTSxPQUFPLFFBQVEsU0FBUixDQUFiLEMsQ0FBa0M7O0FBRWxDLElBQU0sZUFBZSxRQUFRLGlCQUFSLENBQXJCO0FBQUEsSUFDTSxlQUFlLFFBQVEsaUJBQVIsQ0FEckI7QUFBQSxJQUVNLGNBQWMsUUFBUSxnQkFBUixDQUZwQjtBQUFBLElBR00sY0FBYyxRQUFRLGdCQUFSLENBSHBCO0FBQUEsSUFJTSxjQUFjLFFBQVEsZ0JBQVIsQ0FKcEI7QUFBQSxJQUtNLGNBQWMsUUFBUSxnQkFBUixDQUxwQjtBQUFBLElBTU0sYUFBYSxRQUFRLGVBQVIsQ0FObkI7O0lBUVEsc0IsR0FBMkIsWSxDQUEzQixzQjs7O0FBRVIsSUFBTSxnQkFBZ0IsQ0FBdEI7O0lBRU0sTTtBQUNKLG9CQUFpQztBQUFBLFFBQXJCLFFBQXFCLHVFQUFWLFFBQVU7O0FBQUE7O0FBQy9CLFFBQU0sYUFBYSx1QkFBdUIsUUFBdkIsQ0FBbkI7QUFBQSxRQUNNLFVBQVUsV0FBVyxVQUFYLENBQXNCLE9BQXRCLENBRGhCOztBQUdBLFFB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O0FBRUQsT0FBTyxPQUFQLEdBQWlCO0FBQ2YsMEJBQXdCO0FBRFQsQ0FBakI7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBtYXQ0ID0gcmVxdWlyZSgnZ2wtbWF0NCcpOyAgLy8vXG5cbmNvbnN0IGRvbVV0aWxpdGllcyA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzL2RvbScpLFxuICAgICAgdGV4dHVyZU1peGluID0gcmVxdWlyZSgnLi9taXhpbi90ZXh0dXJlJyksXG4gICAgICBidWZmZXJNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vYnVmZmVyJyksXG4gICAgICBzaGFkZXJNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vc2hhZGVyJyksXG4gICAgICBjb2xvdXJNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vY29sb3VyJyksXG4gICAgICBtYXRyaXhNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vbWF0cml4JyksXG4gICAgICBkZXB0aE1peGluID0gcmVxdWlyZSgnLi9taXhpbi9kZXB0aCcpO1xuXG5jb25zdCB7IGRvbUVsZW1lbnRGcm9tU2VsZWN0b3IgfSA9IGRvbVV0aWxpdGllcztcblxuY29uc3QgZGVmYXVsdE9mZnNldCA9IDA7XG5cbmNsYXNzIENhbnZhcyB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yID0gJ2NhbnZhcycpIHtcbiAgICBjb25zdCBkb21FbGVtZW50ID0gZG9tRWxlbWVudEZyb21TZWxlY3RvcihzZWxlY3RvciksXG4gICAgICAgICAgY29udGV4dCA9IGRvbUVsZW1lbnQuZ2V0Q29udGV4dCgnd2ViZ2wnKTtcblxuICAgIGlmICghY29udGV4dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gaW5pdGlhbGlzZSB0aGUgY29udGV4dC5gKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuXG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcblxuICAgIHRoaXMuQ0xBTVBfVE9fRURHRV9QQVJBTSA9IHRoaXMuY29udGV4dC5DTEFNUF9UT19FREdFOyAgLy8vXG4gICAgdGhpcy5MSU5FQVJfUEFSQU0gPSB0aGlzLmNvbnRleHQuTElORUFSOyAgLy8vXG4gICAgdGhpcy5SR0JBX0ZPUk1BVCA9IHRoaXMuY29udGV4dC5SR0JBOyAgLy8vXG4gICAgdGhpcy5ERVBUSF9URVNUX0NBUCA9IHRoaXMuY29udGV4dC5ERVBUSF9URVNUOyAgLy8vXG4gICAgdGhpcy5MRVFVQUxfRlVOQ1RJT04gPSB0aGlzLmNvbnRleHQuTEVRVUFMOyAvLy9cbiAgICB0aGlzLlNUQVRJQ19EUkFXX1VTQUdFID0gdGhpcy5jb250ZXh0LlNUQVRJQ19EUkFXOyAvLy9cbiAgICB0aGlzLkxJTktfU1RBVFVTX1BOQU1FID0gdGhpcy5jb250ZXh0LkxJTktfU1RBVFVTOyAgLy8vXG4gICAgdGhpcy5DT01QSUxFX1NUQVRVU19QTkFNRSA9IHRoaXMuY29udGV4dC5DT01QSUxFX1NUQVRVUzsgIC8vL1xuICAgIHRoaXMuVEVYVFVSRV9XUkFQX1NfUE5BTUUgPSB0aGlzLmNvbnRleHQuVEVYVFVSRV9XUkFQX1M7ICAvLy9cbiAgICB0aGlzLlRFWFRVUkVfV1JBUF9UX1BOQU1FID0gdGhpcy5jb250ZXh0LlRFWFRVUkVfV1JBUF9UOyAgLy8vXG4gICAgdGhpcy5URVhUVVJFX01JTl9GSUxURVJfUE5BTUUgPSB0aGlzLmNvbnRleHQuVEVYVFVSRV9NSU5fRklMVEVSOyAgLy8vXG4gICAgdGhpcy5UUklBTkdMRV9TVFJJUF9NT0RFID0gdGhpcy5jb250ZXh0LlRSSUFOR0xFX1NUUklQOyAgLy8vXG4gICAgdGhpcy5UUklBTkdMRVNfTU9ERSA9IHRoaXMuY29udGV4dC5UUklBTkdMRVM7ICAvLy9cbiAgICB0aGlzLkZMT0FUX1RZUEUgPSB0aGlzLmNvbnRleHQuRkxPQVQ7ICAvLy9cbiAgICB0aGlzLlVOU0lHTkVEX0JZVEVfVFlQRSA9IHRoaXMuY29udGV4dC5VTlNJR05FRF9CWVRFOyAvLy9cbiAgICB0aGlzLlZFUlRFWF9TSEFERVJfVFlQRSA9IHRoaXMuY29udGV4dC5WRVJURVhfU0hBREVSOyAvLy9cbiAgICB0aGlzLlVOU0lHTkVEX1NIT1JUX1RZUEUgPSB0aGlzLmNvbnRleHQuVU5TSUdORURfU0hPUlQ7ICAvLy9cbiAgICB0aGlzLkZSQUdNRU5UX1NIQURFUl9UWVBFID0gdGhpcy5jb250ZXh0LkZSQUdNRU5UX1NIQURFUjsgLy8vXG4gICAgdGhpcy5DT0xPUl9CVUZGRVJfQklUX01BU0sgPSB0aGlzLmNvbnRleHQuQ09MT1JfQlVGRkVSX0JJVDsgLy8vXG4gICAgdGhpcy5ERVBUSF9CVUZGRVJfQklUX01BU0sgPSB0aGlzLmNvbnRleHQuREVQVEhfQlVGRkVSX0JJVDsgLy8vXG4gICAgdGhpcy5URVhUVVJFMF9UQVJHRVQgPSB0aGlzLmNvbnRleHQuVEVYVFVSRTA7IC8vL1xuICAgIHRoaXMuVEVYVFVSRV8yRF9UQVJHRVQgPSB0aGlzLmNvbnRleHQuVEVYVFVSRV8yRDsgLy8vXG4gICAgdGhpcy5BUlJBWV9CVUZGRVJfVEFSR0VUID0gdGhpcy5jb250ZXh0LkFSUkFZX0JVRkZFUjsgIC8vL1xuICAgIHRoaXMuRUxFTUVOVF9BUlJBWV9CVUZGRVJfVEFSR0VUID0gdGhpcy5jb250ZXh0LkVMRU1FTlRfQVJSQVlfQlVGRkVSOyAgLy8vXG4gIH1cblxuICBnZXRDb250ZXh0KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gIH1cblxuICBnZXRDbGllbnRXaWR0aCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5jbGllbnRXaWR0aDsgfVxuXG4gIGdldENsaWVudEhlaWdodCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5jbGllbnRIZWlnaHQ7IH1cblxuICBnZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSkgeyByZXR1cm4gdGhpcy5jb250ZXh0LmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBuYW1lKTsgfVxuXG4gIGdldEF0dHJpYnV0ZUxvY2F0aW9uKHByb2dyYW0sIG5hbWUpIHsgcmV0dXJuIHRoaXMuY29udGV4dC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBuYW1lKTsgfVxuICBcbiAgc2V0VW5pZm9ybUxvY2F0aW9uSW50ZWdlclZhbHVlKHVuaWZvcm1Mb2NhdGlvbiwgaW50ZWdlclZhbHVlKSB7IHRoaXMuY29udGV4dC51bmlmb3JtMWkodW5pZm9ybUxvY2F0aW9uLCBpbnRlZ2VyVmFsdWUpOyB9XG5cbiAgdXNlUHJvZ3JhbShwcm9ncmFtKSB7IHRoaXMuY29udGV4dC51c2VQcm9ncmFtKHByb2dyYW0pOyB9XG4gIFxuICByZW5kZXIocm90YXRpb24sIHBvc2l0aW9uLCBwZXJzcGVjdGl2ZSwgc2hhZGVyUHJvZ3JhbSkge1xuICAgIGNvbnN0IHJvdGF0aW9uTWF0cml4ID0gcm90YXRpb24uZ2V0TWF0cml4KCksXG4gICAgICAgICAgcG9zaXRpb25NYXRyaXggPSBwb3NpdGlvbi5nZXRNYXRyaXgoKSxcbiAgICAgICAgICBwZXJzcGVjdGl2ZU1hdHJpeCA9IHBlcnNwZWN0aXZlLmdldE1hdHJpeCgpLFxuICAgICAgICAgIHJvdGF0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VSb3RhdGlvbk1hdHJpeCcpLFxuICAgICAgICAgIHBvc2l0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VQb3NpdGlvbk1hdHJpeCcpLFxuICAgICAgICAgIHBlcnNwZWN0aXZlTWF0cml4VW5pZm9ybUxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VQZXJzcGVjdGl2ZU1hdHJpeCcpO1xuXG4gICAgdGhpcy5jbGVhckRlcHRoKCk7XG4gICAgdGhpcy5jbGVhckNvbG91cigpO1xuICAgIHRoaXMuY2xlYXJEZXB0aEJ1ZmZlcigpO1xuICAgIHRoaXMuY2xlYXJDb2xvdXJCdWZmZXIoKTtcblxuICAgIHRoaXMuYXBwbHlNYXRyaXgocm90YXRpb25NYXRyaXhVbmlmb3JtTG9jYXRpb24sIHJvdGF0aW9uTWF0cml4KTtcbiAgICB0aGlzLmFwcGx5TWF0cml4KHBvc2l0aW9uTWF0cml4VW5pZm9ybUxvY2F0aW9uLCBwb3NpdGlvbk1hdHJpeCk7XG4gICAgdGhpcy5hcHBseU1hdHJpeChwZXJzcGVjdGl2ZU1hdHJpeFVuaWZvcm1Mb2NhdGlvbiwgcGVyc3BlY3RpdmVNYXRyaXgpO1xuICB9XG5cbiAgZHJhd0VsZW1lbnRzKGNvdW50LCBvZmZzZXQgPSBkZWZhdWx0T2Zmc2V0KSB7XG4gICAgY29uc3QgbW9kZSA9IHRoaXMuVFJJQU5HTEVTX01PREUsXG4gICAgICAgICAgdHlwZSA9IHRoaXMuVU5TSUdORURfU0hPUlRfVFlQRTtcblxuICAgIHRoaXMuY29udGV4dC5kcmF3RWxlbWVudHMobW9kZSwgY291bnQsIHR5cGUsIG9mZnNldClcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKENhbnZhcy5wcm90b3R5cGUsIHRleHR1cmVNaXhpbik7XG5PYmplY3QuYXNzaWduKENhbnZhcy5wcm90b3R5cGUsIGJ1ZmZlck1peGluKTtcbk9iamVjdC5hc3NpZ24oQ2FudmFzLnByb3RvdHlwZSwgc2hhZGVyTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihDYW52YXMucHJvdG90eXBlLCBjb2xvdXJNaXhpbik7XG5PYmplY3QuYXNzaWduKENhbnZhcy5wcm90b3R5cGUsIG1hdHJpeE1peGluKTtcbk9iamVjdC5hc3NpZ24oQ2FudmFzLnByb3RvdHlwZSwgZGVwdGhNaXhpbik7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FudmFzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBDYW52YXNFbGVtZW50IHtcbiAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FudmFzRWxlbWVudDtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHdlYkdMRGVtbzogcmVxdWlyZSgnLi9leGFtcGxlcy93ZWJHTERlbW8nKSxcbiAgaW50ZXJtZWRpYXRlOiByZXF1aXJlKCcuL2V4YW1wbGVzL2ludGVybWVkaWF0ZScpLFxuICBjb250YWluZXJIb3VzZTogcmVxdWlyZSgnLi9leGFtcGxlcy9jb250YWluZXJIb3VzZScpLFxuICBzY2hvb25lckNlY2lsaWU6IHJlcXVpcmUoJy4vZXhhbXBsZXMvc2Nob29uZXJDZWNpbGllJylcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IENhbnZhcyA9IHJlcXVpcmUoJy4uL2NhbnZhcycpLFxuICAgICAgTW9kZWxWaWV3ID0gcmVxdWlyZSgnLi4vcG9zaXRpb24nKSxcbiAgICAgIFBlcnNwZWN0aXZlID0gcmVxdWlyZSgnLi4vcGVyc3BlY3RpdmUnKTtcblxuY29uc3QgY29udGFpbmVySG91c2UgPSAoKSA9PiB7XG4gIGNvbnN0IGNhbnZhcyA9IG5ldyBDYW52YXMoKSxcbiAgICAgICAgc2hhZGVyUHJvZ3JhbSA9IGNhbnZhcy5jcmVhdGVTaGFkZXJQcm9ncmFtKCksXG4gICAgICAgIHBvc2l0aW9ucyA9IFtcbiAgICAgICAgICArMS4wLCArMS4wLFxuICAgICAgICAgIC0xLjAsICsxLjAsXG4gICAgICAgICAgKzEuMCwgLTEuMCxcbiAgICAgICAgICAtMS4wLCAtMS4wXG4gICAgICAgIF0sXG4gICAgICAgIHBvc2l0aW9uc0J1ZmZlciA9IGNhbnZhcy5jcmVhdGVCdWZmZXIocG9zaXRpb25zKSxcbiAgICAgICAgY2xpZW50V2lkdGggPSBjYW52YXMuZ2V0Q2xpZW50V2lkdGgoKSxcbiAgICAgICAgY2xpZW50SGVpZ2h0ID0gY2FudmFzLmdldENsaWVudEhlaWdodCgpLFxuICAgICAgICBtb2RlbFZpZXcgPSBuZXcgTW9kZWxWaWV3KCksXG4gICAgICAgIHBlcnNwZWN0aXZlID0gbmV3IFBlcnNwZWN0aXZlKGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQpLFxuICAgICAgICB2ZXJ0ZXhQb3NpdGlvbkxvY2F0aW9uID0gY2FudmFzLmdldFByb2dyYW1BdHRyaWJ1dGVMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAnYVZlcnRleFBvc2l0aW9uJyksXG4gICAgICAgIHByb2plY3Rpb25NYXRyaXhMb2NhdGlvbiA9IGNhbnZhcy5nZXRQcm9ncmFtVW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1UHJvamVjdGlvbk1hdHJpeCcpLFxuICAgICAgICBtb2RlbFZpZXdNYXRyaXhMb2NhdGlvbiA9IGNhbnZhcy5nZXRQcm9ncmFtVW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1TW9kZWxWaWV3TWF0cml4Jyk7XG5cbiAgY2FudmFzLmNsZWFyRGVwdGgoKTtcbiAgY2FudmFzLmNsZWFyQ29sb3VyKCk7XG4gIGNhbnZhcy5jbGVhckRlcHRoQnVmZmVyKCk7XG4gIGNhbnZhcy5jbGVhckNvbG91ckJ1ZmZlcigpO1xuXG4gIGNhbnZhcy5lbmFibGVEZXB0aFRlc3RpbmcoKTtcbiAgY2FudmFzLmVuYWJsZURlcHRoRnVuY3Rpb24oKTtcblxuICBjYW52YXMudXNlUHJvZ3JhbShzaGFkZXJQcm9ncmFtKTtcbiAgY2FudmFzLnVzZVBlcnNwZWN0aXZlKHByb2plY3Rpb25NYXRyaXhMb2NhdGlvbiwgcGVyc3BlY3RpdmUpOyAvLy9cbiAgY2FudmFzLnVzZU1vZGVsVmlldyhtb2RlbFZpZXdNYXRyaXhMb2NhdGlvbiwgbW9kZWxWaWV3KTtcbiAgXG4gIGNhbnZhcy51c2VCdWZmZXIodmVydGV4UG9zaXRpb25Mb2NhdGlvbiwgcG9zaXRpb25zQnVmZmVyKTsgLy8vXG5cbiAgY29uc3Qgb2Zmc2V0ID0gMCxcbiAgICAgICAgdmVydGV4Q291bnQgPSA0O1xuXG4gIGNhbnZhcy5yZW5kZXIob2Zmc2V0LCB2ZXJ0ZXhDb3VudCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRhaW5lckhvdXNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDYW52YXMgPSByZXF1aXJlKCcuLi9jYW52YXMnKSxcbiAgICAgIFJvdGF0aW9uID0gcmVxdWlyZSgnLi4vcm90YXRpb24nKSxcbiAgICAgIFBvc2l0aW9uID0gcmVxdWlyZSgnLi4vcG9zaXRpb24nKSxcbiAgICAgIFBlcnNwZWN0aXZlID0gcmVxdWlyZSgnLi4vcGVyc3BlY3RpdmUnKTtcblxuY29uc3QgaW50ZXJtZWRpYXRlID0gKCkgPT4ge1xuICBjb25zdCBjYW52YXMgPSBuZXcgQ2FudmFzKCksXG4gICAgICAgIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgpO1xuXG4gIGlmICghY29udGV4dCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHZlcnRleFNoYWRlclNvdXJjZSA9IGBcbiAgXG4gICAgICAgICAgYXR0cmlidXRlIHZlYzQgYVZlcnRleFBvc2l0aW9uO1xuICAgICAgICAgIGF0dHJpYnV0ZSB2ZWM0IGFWZXJ0ZXhDb2xvdXI7XG4gICAgICAgICAgYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZGluYXRlO1xuICAgICAgICAgIFxuICAgICAgICAgIHVuaWZvcm0gbWF0NCB1Um90YXRpb25NYXRyaXg7XG4gICAgICAgICAgdW5pZm9ybSBtYXQ0IHVQb3NpdGlvbk1hdHJpeDtcbiAgICAgICAgICB1bmlmb3JtIG1hdDQgdVBlcnNwZWN0aXZlTWF0cml4O1xuICAgICAgICAgIFxuICAgICAgICAgIHZhcnlpbmcgbG93cCB2ZWM0IHZDb2xvdXI7XG4gICAgICAgICAgdmFyeWluZyBoaWdocCB2ZWMyIHZUZXh0dXJlQ29vcmRpbmF0ZTtcbiAgICAgIFxuICAgICAgICAgIHZvaWQgbWFpbigpIHtcbiAgICAgICAgICAgIGdsX1Bvc2l0aW9uID0gdVBlcnNwZWN0aXZlTWF0cml4ICogdVBvc2l0aW9uTWF0cml4ICogdVJvdGF0aW9uTWF0cml4ICogYVZlcnRleFBvc2l0aW9uO1xuICAgICAgICAgICAgdkNvbG91ciA9IGFWZXJ0ZXhDb2xvdXI7XG4gICAgICAgICAgICB2VGV4dHVyZUNvb3JkaW5hdGUgPSBhVGV4dHVyZUNvb3JkaW5hdGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICBgLFxuICAgICAgICBmcmFnbWVudFNoYWRlclNvdXJjZSA9IGBcbiAgICAgICAgXG4gICAgICAgICAgdmFyeWluZyBsb3dwIHZlYzQgdkNvbG91cjtcbiAgICAgICAgICB2YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleHR1cmVDb29yZGluYXRlO1xuICAgICAgICAgIFxuICAgICAgICAgIHVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1xuXG4gICAgICAgICAgdm9pZCBtYWluKCkge1xuICAgICAgICAgICAgLy8gZ2xfRnJhZ0NvbG9yID0gdkNvbG91cjtcbiAgICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZGluYXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgIGAsXG4gICAgICAgIHNoYWRlclByb2dyYW0gPSBjYW52YXMuY3JlYXRlU2hhZGVyUHJvZ3JhbSh2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKSxcbiAgICAgICAgY2xpZW50V2lkdGggPSBjYW52YXMuZ2V0Q2xpZW50V2lkdGgoKSxcbiAgICAgICAgY2xpZW50SGVpZ2h0ID0gY2FudmFzLmdldENsaWVudEhlaWdodCgpLFxuICAgICAgICBwb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpLFxuICAgICAgICBwZXJzcGVjdGl2ZSA9IG5ldyBQZXJzcGVjdGl2ZShjbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0KTtcblxuICBjcmVhdGVBbmRCaW5kVmVydGV4UG9zaXRpb25CdWZmZXIoY2FudmFzLCBzaGFkZXJQcm9ncmFtKTtcblxuICAvLyBjcmVhdGVBbmRCaW5kVmVydGV4Q29sb3VyQnVmZmVyKGNhbnZhcywgc2hhZGVyUHJvZ3JhbSk7XG5cbiAgY3JlYXRlQW5kQmluZFRleHR1cmVDb29yZGluYXRlQnVmZmVyKGNhbnZhcywgc2hhZGVyUHJvZ3JhbSk7XG5cbiAgY29uc3QgY291bnQgPSBjcmVhdGVWZXJ0ZXhJbmRleEVsZW1lbnRCdWZmZXIoY2FudmFzKTtcblxuICBjYW52YXMudXNlUHJvZ3JhbShzaGFkZXJQcm9ncmFtKTtcblxuICBjYW52YXMuZW5hYmxlRGVwdGhUZXN0aW5nKCk7XG4gIGNhbnZhcy5lbmFibGVEZXB0aEZ1bmN0aW9uKCk7XG5cbiAgbGV0IGluaXRpYWxUaW1lID0gbnVsbDtcblxuICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG4gIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGNhbnZhcy5URVhUVVJFMF9UQVJHRVQsXG4gICAgICAgICAgdVNhbXBsZXJVbmlmb3JtTG9jYXRpb25JbnRlZ2VyVmFsdWUgPSAwLFxuICAgICAgICAgIHVTYW1wbGVyVW5pZm9ybUxvY2F0aW9uID0gY2FudmFzLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAndVNhbXBsZXInKTtcblxuICAgIGNhbnZhcy5jcmVhdGVUZXh0dXJlKGltYWdlKTtcblxuICAgIGNhbnZhcy5hY3RpdmF0ZVRleHR1cmUodGFyZ2V0KTtcblxuICAgIGNhbnZhcy5zZXRVbmlmb3JtTG9jYXRpb25JbnRlZ2VyVmFsdWUodVNhbXBsZXJVbmlmb3JtTG9jYXRpb24sIHVTYW1wbGVyVW5pZm9ybUxvY2F0aW9uSW50ZWdlclZhbHVlKTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICB9O1xuXG4gIGltYWdlLnNyYyA9ICd0ZXh0dXJlL2JyaWNrcy5qcGcnO1xuXG4gIGZ1bmN0aW9uIHJlbmRlcih0aW1lKSB7XG4gICAgaWYgKGluaXRpYWxUaW1lID09PSBudWxsKSB7XG4gICAgICBpbml0aWFsVGltZSA9IHRpbWU7XG4gICAgfVxuXG4gICAgY29uc3QgZWxhcHNlZFRpbWUgPSB0aW1lIC0gaW5pdGlhbFRpbWUsXG4gICAgICAgICAgeEFuZ2xlID0gZWxhcHNlZFRpbWUgLyAxMDAwLFxuICAgICAgICAgIHlBbmdsZSA9IGVsYXBzZWRUaW1lIC8gMTAwMCxcbiAgICAgICAgICByb3RhdGlvbiA9IG5ldyBSb3RhdGlvbih4QW5nbGUsIHlBbmdsZSk7XG5cbiAgICBjYW52YXMucmVuZGVyKHJvdGF0aW9uLCBwb3NpdGlvbiwgcGVyc3BlY3RpdmUsIHNoYWRlclByb2dyYW0pO1xuXG4gICAgY2FudmFzLmRyYXdFbGVtZW50cyhjb3VudCk7XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnRlcm1lZGlhdGU7XG5cbmZ1bmN0aW9uIGNyZWF0ZUFuZEJpbmRWZXJ0ZXhQb3NpdGlvbkJ1ZmZlcihjYW52YXMsIHNoYWRlclByb2dyYW0pIHtcbiAgY29uc3QgdmVydGV4UG9zaXRpb25EYXRhID0gW1xuICAgICAgICAgIC0xLjAsIC0xLjAsICsxLjAsXG4gICAgICAgICAgKzEuMCwgLTEuMCwgKzEuMCxcbiAgICAgICAgICArMS4wLCArMS4wLCArMS4wLFxuICAgICAgICAgIC0xLjAsICsxLjAsICsxLjAsXG5cbiAgICAgICAgICAtMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgICAgIC0xLjAsICsxLjAsIC0xLjAsXG4gICAgICAgICAgKzEuMCwgKzEuMCwgLTEuMCxcbiAgICAgICAgICArMS4wLCAtMS4wLCAtMS4wLFxuXG4gICAgICAgICAgLTEuMCwgKzEuMCwgLTEuMCxcbiAgICAgICAgICAtMS4wLCArMS4wLCArMS4wLFxuICAgICAgICAgICsxLjAsICsxLjAsICsxLjAsXG4gICAgICAgICAgKzEuMCwgKzEuMCwgLTEuMCxcblxuICAgICAgICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4gICAgICAgICAgKzEuMCwgLTEuMCwgLTEuMCxcbiAgICAgICAgICArMS4wLCAtMS4wLCArMS4wLFxuICAgICAgICAgIC0xLjAsIC0xLjAsICsxLjAsXG5cbiAgICAgICAgICArMS4wLCAtMS4wLCAtMS4wLFxuICAgICAgICAgICsxLjAsICsxLjAsIC0xLjAsXG4gICAgICAgICAgKzEuMCwgKzEuMCwgKzEuMCxcbiAgICAgICAgICArMS4wLCAtMS4wLCArMS4wLFxuXG4gICAgICAgICAgLTEuMCwgLTEuMCwgLTEuMCxcbiAgICAgICAgICAtMS4wLCAtMS4wLCArMS4wLFxuICAgICAgICAgIC0xLjAsICsxLjAsICsxLjAsXG4gICAgICAgICAgLTEuMCwgKzEuMCwgLTEuMFxuICAgICAgICBdLFxuICAgICAgICB2ZXJ0ZXhQb3NpdGlvbkJ1ZmZlciA9IGNhbnZhcy5jcmVhdGVCdWZmZXIodmVydGV4UG9zaXRpb25EYXRhKSxcbiAgICAgICAgdmVydGV4UG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiA9IGNhbnZhcy5nZXRBdHRyaWJ1dGVMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAnYVZlcnRleFBvc2l0aW9uJyksXG4gICAgICAgIHZlcnRleFBvc2l0aW9uQ29tcG9uZW50cyA9IDM7XG5cbiAgY2FudmFzLmJpbmRCdWZmZXIodmVydGV4UG9zaXRpb25CdWZmZXIsIHZlcnRleFBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIHZlcnRleFBvc2l0aW9uQ29tcG9uZW50cyk7XG5cbiAgY29uc3QgdmVydGV4UG9zaXRpb25EYXRhTGVuZ3RoID0gdmVydGV4UG9zaXRpb25EYXRhLmxlbmd0aCxcbiAgICAgICAgY291bnQgPSB2ZXJ0ZXhQb3NpdGlvbkRhdGFMZW5ndGggLyB2ZXJ0ZXhQb3NpdGlvbkNvbXBvbmVudHM7XG5cbiAgcmV0dXJuIGNvdW50O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBbmRCaW5kVmVydGV4Q29sb3VyQnVmZmVyKGNhbnZhcywgc2hhZGVyUHJvZ3JhbSkge1xuICBjb25zdCB2ZXJ0ZXhDb2xvdXJEYXRhID0gW1xuICAgICAgICAgIDEuMCwgIDAuMCwgIDAuMCwgIDEuMCxcbiAgICAgICAgICAxLjAsICAwLjAsICAwLjAsICAxLjAsXG4gICAgICAgICAgMS4wLCAgMC4wLCAgMC4wLCAgMS4wLFxuICAgICAgICAgIDEuMCwgIDAuMCwgIDAuMCwgIDEuMCxcblxuICAgICAgICAgIDAuMCwgIDEuMCwgIDEuMCwgIDEuMCxcbiAgICAgICAgICAwLjAsICAxLjAsICAxLjAsICAxLjAsXG4gICAgICAgICAgMC4wLCAgMS4wLCAgMS4wLCAgMS4wLFxuICAgICAgICAgIDAuMCwgIDEuMCwgIDEuMCwgIDEuMCxcblxuICAgICAgICAgIDAuMCwgIDEuMCwgIDAuMCwgIDEuMCxcbiAgICAgICAgICAwLjAsICAxLjAsICAwLjAsICAxLjAsXG4gICAgICAgICAgMC4wLCAgMS4wLCAgMC4wLCAgMS4wLFxuICAgICAgICAgIDAuMCwgIDEuMCwgIDAuMCwgIDEuMCxcblxuICAgICAgICAgIDEuMCwgIDAuMCwgIDEuMCwgIDEuMCxcbiAgICAgICAgICAxLjAsICAwLjAsICAxLjAsICAxLjAsXG4gICAgICAgICAgMS4wLCAgMC4wLCAgMS4wLCAgMS4wLFxuICAgICAgICAgIDEuMCwgIDAuMCwgIDEuMCwgIDEuMCxcblxuICAgICAgICAgIDAuMCwgIDAuMCwgIDEuMCwgIDEuMCxcbiAgICAgICAgICAwLjAsICAwLjAsICAxLjAsICAxLjAsXG4gICAgICAgICAgMC4wLCAgMC4wLCAgMS4wLCAgMS4wLFxuICAgICAgICAgIDAuMCwgIDAuMCwgIDEuMCwgIDEuMCxcblxuICAgICAgICAgIDEuMCwgIDEuMCwgIDAuMCwgIDEuMCxcbiAgICAgICAgICAxLjAsICAxLjAsICAwLjAsICAxLjAsXG4gICAgICAgICAgMS4wLCAgMS4wLCAgMC4wLCAgMS4wLFxuICAgICAgICAgIDEuMCwgIDEuMCwgIDAuMCwgIDEuMFxuICAgICAgICBdLFxuICAgICAgICB2ZXJ0ZXhDb2xvdXJCdWZmZXIgPSBjYW52YXMuY3JlYXRlQnVmZmVyKHZlcnRleENvbG91ckRhdGEpLFxuICAgICAgICB2ZXJ0ZXhDb2xvdXJBdHRyaWJ1dGVMb2NhdGlvbiA9IGNhbnZhcy5nZXRBdHRyaWJ1dGVMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAnYVZlcnRleENvbG91cicpLFxuICAgICAgICB2ZXJ0ZXhDb2xvdXJDb21wb25lbnRzID0gNDtcblxuICBjYW52YXMuYmluZEJ1ZmZlcih2ZXJ0ZXhDb2xvdXJCdWZmZXIsIHZlcnRleENvbG91ckF0dHJpYnV0ZUxvY2F0aW9uLCB2ZXJ0ZXhDb2xvdXJDb21wb25lbnRzKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQW5kQmluZFRleHR1cmVDb29yZGluYXRlQnVmZmVyKGNhbnZhcywgc2hhZGVyUHJvZ3JhbSkge1xuICBjb25zdCB0ZXh0dXJlQ29vcmRpbmF0ZURhdGEgPSBbXG4gICAgICAgICAgMC4wLCAgMC4wLFxuICAgICAgICAgIDEuMCwgIDAuMCxcbiAgICAgICAgICAxLjAsICAxLjAsXG4gICAgICAgICAgMC4wLCAgMS4wLFxuXG4gICAgICAgICAgMC4wLCAgMC4wLFxuICAgICAgICAgIDEuMCwgIDAuMCxcbiAgICAgICAgICAxLjAsICAxLjAsXG4gICAgICAgICAgMC4wLCAgMS4wLFxuXG4gICAgICAgICAgMC4wLCAgMC4wLFxuICAgICAgICAgIDEuMCwgIDAuMCxcbiAgICAgICAgICAxLjAsICAxLjAsXG4gICAgICAgICAgMC4wLCAgMS4wLFxuXG4gICAgICAgICAgMC4wLCAgMC4wLFxuICAgICAgICAgIDEuMCwgIDAuMCxcbiAgICAgICAgICAxLjAsICAxLjAsXG4gICAgICAgICAgMC4wLCAgMS4wLFxuXG4gICAgICAgICAgMC4wLCAgMC4wLFxuICAgICAgICAgIDEuMCwgIDAuMCxcbiAgICAgICAgICAxLjAsICAxLjAsXG4gICAgICAgICAgMC4wLCAgMS4wLFxuXG4gICAgICAgICAgMC4wLCAgMC4wLFxuICAgICAgICAgIDEuMCwgIDAuMCxcbiAgICAgICAgICAxLjAsICAxLjAsXG4gICAgICAgICAgMC4wLCAgMS4wXG4gICAgICAgIF0sXG4gICAgICAgIHRleHR1cmVDb29yZGluYXRlQnVmZmVyID0gY2FudmFzLmNyZWF0ZUJ1ZmZlcih0ZXh0dXJlQ29vcmRpbmF0ZURhdGEpLFxuICAgICAgICB0ZXh0dXJlQ29vcmRpbmF0ZUF0dHJpYnV0ZUxvY2F0aW9uID0gY2FudmFzLmdldEF0dHJpYnV0ZUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICdhVGV4dHVyZUNvb3JkaW5hdGUnKSxcbiAgICAgICAgdGV4dHVyZUNvb3JkaW5hdGVDb21wb25lbnRzID0gMjtcblxuICBjYW52YXMuYmluZEJ1ZmZlcih0ZXh0dXJlQ29vcmRpbmF0ZUJ1ZmZlciwgdGV4dHVyZUNvb3JkaW5hdGVBdHRyaWJ1dGVMb2NhdGlvbiwgdGV4dHVyZUNvb3JkaW5hdGVDb21wb25lbnRzKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVmVydGV4SW5kZXhFbGVtZW50QnVmZmVyKGNhbnZhcykge1xuICBjb25zdCB2ZXJ0ZXhJbmRleERhdGEgPSBbXG4gICAgICAgICAgIDAsICAxLCAgMixcbiAgICAgICAgICAgMCwgIDIsICAzLFxuXG4gICAgICAgICAgIDQsICA1LCAgNixcbiAgICAgICAgICAgNCwgIDYsICA3LFxuXG4gICAgICAgICAgIDgsICA5LCAxMCxcbiAgICAgICAgICAgOCwgMTAsIDExLFxuXG4gICAgICAgICAgMTIsIDEzLCAxNCxcbiAgICAgICAgICAxMiwgMTQsIDE1LFxuXG4gICAgICAgICAgMTYsIDE3LCAxOCxcbiAgICAgICAgICAxNiwgMTgsIDE5LFxuXG4gICAgICAgICAgMjAsIDIxLCAyMixcbiAgICAgICAgICAyMCwgMjIsIDIzXG4gICAgICAgIF0sXG4gICAgICAgIHZlcnRleEluZGV4RWxlbWVudEJ1ZmZlciA9IGNhbnZhcy5jcmVhdGVFbGVtZW50QnVmZmVyKHZlcnRleEluZGV4RGF0YSksXG4gICAgICAgIHZlcnRleEluZGV4RGF0YUxlbmd0aCA9IHZlcnRleEluZGV4RGF0YS5sZW5ndGgsXG4gICAgICAgIGNvdW50ID0gdmVydGV4SW5kZXhEYXRhTGVuZ3RoOyAgLy8vXG5cbiAgY2FudmFzLmJpbmRFbGVtZW50QnVmZmVyKHZlcnRleEluZGV4RWxlbWVudEJ1ZmZlcik7XG5cbiAgcmV0dXJuIGNvdW50O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDYW52YXMgPSByZXF1aXJlKCcuLi9jYW52YXMnKSxcbiAgICAgIENhbnZhc0VsZW1lbnQgPSByZXF1aXJlKCcuLi9jYW52YXNFbGVtZW50Jyk7XG5cbmNvbnN0IHNjaG9vbmVyQ2VjaWxpZSA9ICgpID0+IHtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzY2hvb25lckNlY2lsaWU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG1hdDQgPSByZXF1aXJlKCdnbC1tYXQ0Jyk7XG5cbmNvbnN0IHdlYkdMRGVtbyA9ICgpID0+IHtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XG4gIGNvbnN0IGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJyk7XG5cbiAgaWYgKCFnbCkge1xuICAgIGFsZXJ0KCdVbmFibGUgdG8gaW5pdGlhbGl6ZSBXZWJHTC4gWW91ciBicm93c2VyIG9yIG1hY2hpbmUgbWF5IG5vdCBzdXBwb3J0IGl0LicpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHZzU291cmNlID0gYFxuICAgIGF0dHJpYnV0ZSB2ZWM0IGFWZXJ0ZXhQb3NpdGlvbjtcblxuICAgIHVuaWZvcm0gbWF0NCB1TW9kZWxWaWV3TWF0cml4O1xuICAgIHVuaWZvcm0gbWF0NCB1UHJvamVjdGlvbk1hdHJpeDtcblxuICAgIHZvaWQgbWFpbigpIHtcbiAgICAgIGdsX1Bvc2l0aW9uID0gdVByb2plY3Rpb25NYXRyaXggKiB1TW9kZWxWaWV3TWF0cml4ICogYVZlcnRleFBvc2l0aW9uO1xuICAgIH1cbiAgYDtcblxuICBjb25zdCBmc1NvdXJjZSA9IGBcbiAgICB2b2lkIG1haW4oKSB7XG4gICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KDEuMCwgMS4wLCAxLjAsIDEuMCk7XG4gICAgfVxuICBgO1xuXG4gIGNvbnN0IHNoYWRlclByb2dyYW0gPSBpbml0U2hhZGVyUHJvZ3JhbShnbCwgdnNTb3VyY2UsIGZzU291cmNlKTtcblxuICBjb25zdCBwcm9ncmFtSW5mbyA9IHtcbiAgICBwcm9ncmFtOiBzaGFkZXJQcm9ncmFtLFxuICAgIGF0dHJpYkxvY2F0aW9uczoge1xuICAgICAgdmVydGV4UG9zaXRpb246IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sICdhVmVydGV4UG9zaXRpb24nKSxcbiAgICB9LFxuICAgIHVuaWZvcm1Mb2NhdGlvbnM6IHtcbiAgICAgIHByb2plY3Rpb25NYXRyaXg6IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAndVByb2plY3Rpb25NYXRyaXgnKSxcbiAgICAgIG1vZGVsVmlld01hdHJpeDogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1TW9kZWxWaWV3TWF0cml4JyksXG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBidWZmZXJzID0gaW5pdEJ1ZmZlcnMoZ2wpO1xuXG4gIGRyYXdTY2VuZShnbCwgcHJvZ3JhbUluZm8sIGJ1ZmZlcnMpO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHdlYkdMRGVtbztcblxuZnVuY3Rpb24gZHJhd1NjZW5lKGdsLCBwcm9ncmFtSW5mbywgYnVmZmVycykge1xuICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMCk7ICAvLyBDbGVhciB0byBibGFjaywgZnVsbHkgb3BhcXVlXG4gIGdsLmNsZWFyRGVwdGgoMS4wKTsgICAgICAgICAgICAgICAgIC8vIENsZWFyIGV2ZXJ5dGhpbmdcbiAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpOyAgICAgICAgICAgLy8gRW5hYmxlIGRlcHRoIHRlc3RpbmdcbiAgZ2wuZGVwdGhGdW5jKGdsLkxFUVVBTCk7ICAgICAgICAgICAgLy8gTmVhciB0aGluZ3Mgb2JzY3VyZSBmYXIgdGhpbmdzXG5cbiAgLy8gQ2xlYXIgdGhlIGNhbnZhcyBiZWZvcmUgd2Ugc3RhcnQgZHJhd2luZyBvbiBpdC5cblxuICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG5cbiAgLy8gQ3JlYXRlIGEgcGVyc3BlY3RpdmUgbWF0cml4LCBhIHNwZWNpYWwgbWF0cml4IHRoYXQgaXNcbiAgLy8gdXNlZCB0byBzaW11bGF0ZSB0aGUgZGlzdG9ydGlvbiBvZiBwZXJzcGVjdGl2ZSBpbiBhIGNhbWVyYS5cbiAgLy8gT3VyIGZpZWxkIG9mIHZpZXcgaXMgNDUgZGVncmVlcywgd2l0aCBhIHdpZHRoL2hlaWdodFxuICAvLyByYXRpbyB0aGF0IG1hdGNoZXMgdGhlIGRpc3BsYXkgc2l6ZSBvZiB0aGUgY2FudmFzXG4gIC8vIGFuZCB3ZSBvbmx5IHdhbnQgdG8gc2VlIG9iamVjdHMgYmV0d2VlbiAwLjEgdW5pdHNcbiAgLy8gYW5kIDEwMCB1bml0cyBhd2F5IGZyb20gdGhlIGNhbWVyYS5cblxuICBjb25zdCBmaWVsZE9mVmlldyA9IDQ1ICogTWF0aC5QSSAvIDE4MDsgICAvLyBpbiByYWRpYW5zXG4gIGNvbnN0IGFzcGVjdCA9IGdsLmNhbnZhcy5jbGllbnRXaWR0aCAvIGdsLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gIGNvbnN0IHpOZWFyID0gMC4xO1xuICBjb25zdCB6RmFyID0gMTAwLjA7XG4gIGNvbnN0IHByb2plY3Rpb25NYXRyaXggPSBtYXQ0LmNyZWF0ZSgpO1xuXG4gIC8vIG5vdGU6IGdsbWF0cml4LmpzIGFsd2F5cyBoYXMgdGhlIGZpcnN0IGFyZ3VtZW50XG4gIC8vIGFzIHRoZSBkZXN0aW5hdGlvbiB0byByZWNlaXZlIHRoZSByZXN1bHQuXG4gIG1hdDQucGVyc3BlY3RpdmUocHJvamVjdGlvbk1hdHJpeCxcbiAgICAgIGZpZWxkT2ZWaWV3LFxuICAgICAgYXNwZWN0LFxuICAgICAgek5lYXIsXG4gICAgICB6RmFyKTtcblxuICAvLyBTZXQgdGhlIGRyYXdpbmcgcG9zaXRpb24gdG8gdGhlIFwiaWRlbnRpdHlcIiBwb2ludCwgd2hpY2ggaXNcbiAgLy8gdGhlIGNlbnRlciBvZiB0aGUgc2NlbmUuXG4gIGNvbnN0IG1vZGVsVmlld01hdHJpeCA9IG1hdDQuY3JlYXRlKCk7XG5cbiAgLy8gTm93IG1vdmUgdGhlIGRyYXdpbmcgcG9zaXRpb24gYSBiaXQgdG8gd2hlcmUgd2Ugd2FudCB0b1xuICAvLyBzdGFydCBkcmF3aW5nIHRoZSBzcXVhcmUuXG5cbiAgbWF0NC50cmFuc2xhdGUobW9kZWxWaWV3TWF0cml4LCAgICAgLy8gZGVzdGluYXRpb24gbWF0cml4XG4gICAgICBtb2RlbFZpZXdNYXRyaXgsICAgICAvLyBtYXRyaXggdG8gdHJhbnNsYXRlXG4gICAgICBbLTAuMCwgMC4wLCAtNi4wXSk7ICAvLyBhbW91bnQgdG8gdHJhbnNsYXRlXG5cbiAgLy8gVGVsbCBXZWJHTCBob3cgdG8gcHVsbCBvdXQgdGhlIHBvc2l0aW9ucyBmcm9tIHRoZSBwb3NpdGlvblxuICAvLyBidWZmZXIgaW50byB0aGUgdmVydGV4UG9zaXRpb24gYXR0cmlidXRlLlxuICB7XG4gICAgY29uc3QgbnVtQ29tcG9uZW50cyA9IDI7XG4gICAgY29uc3QgdHlwZSA9IGdsLkZMT0FUO1xuICAgIGNvbnN0IG5vcm1hbGl6ZSA9IGZhbHNlO1xuICAgIGNvbnN0IHN0cmlkZSA9IDA7XG4gICAgY29uc3Qgb2Zmc2V0ID0gMDtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVycy5wb3NpdGlvbik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICAgICAgcHJvZ3JhbUluZm8uYXR0cmliTG9jYXRpb25zLnZlcnRleFBvc2l0aW9uLFxuICAgICAgICBudW1Db21wb25lbnRzLFxuICAgICAgICB0eXBlLFxuICAgICAgICBub3JtYWxpemUsXG4gICAgICAgIHN0cmlkZSxcbiAgICAgICAgb2Zmc2V0KTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShcbiAgICAgICAgcHJvZ3JhbUluZm8uYXR0cmliTG9jYXRpb25zLnZlcnRleFBvc2l0aW9uKTtcbiAgfVxuXG4gIC8vIFRlbGwgV2ViR0wgdG8gdXNlIG91ciBwcm9ncmFtIHdoZW4gZHJhd2luZ1xuXG4gIGdsLnVzZVByb2dyYW0ocHJvZ3JhbUluZm8ucHJvZ3JhbSk7XG5cbiAgLy8gU2V0IHRoZSBzaGFkZXIgdW5pZm9ybXNcblxuICBnbC51bmlmb3JtTWF0cml4NGZ2KFxuICAgICAgcHJvZ3JhbUluZm8udW5pZm9ybUxvY2F0aW9ucy5wcm9qZWN0aW9uTWF0cml4LFxuICAgICAgZmFsc2UsXG4gICAgICBwcm9qZWN0aW9uTWF0cml4KTtcbiAgZ2wudW5pZm9ybU1hdHJpeDRmdihcbiAgICAgIHByb2dyYW1JbmZvLnVuaWZvcm1Mb2NhdGlvbnMubW9kZWxWaWV3TWF0cml4LFxuICAgICAgZmFsc2UsXG4gICAgICBtb2RlbFZpZXdNYXRyaXgpO1xuXG4gIHtcbiAgICBjb25zdCBvZmZzZXQgPSAwO1xuICAgIGNvbnN0IHZlcnRleENvdW50ID0gNDtcbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCBvZmZzZXQsIHZlcnRleENvdW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0U2hhZGVyUHJvZ3JhbShnbCwgdnNTb3VyY2UsIGZzU291cmNlKSB7XG4gIGNvbnN0IHZlcnRleFNoYWRlciA9IGxvYWRTaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIHZzU291cmNlKTtcbiAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBsb2FkU2hhZGVyKGdsLCBnbC5GUkFHTUVOVF9TSEFERVIsIGZzU291cmNlKTtcblxuICBjb25zdCBzaGFkZXJQcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICBnbC5hdHRhY2hTaGFkZXIoc2hhZGVyUHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgZ2wubGlua1Byb2dyYW0oc2hhZGVyUHJvZ3JhbSk7XG5cbiAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHNoYWRlclByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xuICAgIGFsZXJ0KCdVbmFibGUgdG8gaW5pdGlhbGl6ZSB0aGUgc2hhZGVyIHByb2dyYW06ICcgKyBnbC5nZXRQcm9ncmFtSW5mb0xvZyhzaGFkZXJQcm9ncmFtKSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gc2hhZGVyUHJvZ3JhbTtcbn1cblxuZnVuY3Rpb24gbG9hZFNoYWRlcihnbCwgdHlwZSwgc291cmNlKSB7XG4gIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcblxuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xuXG4gIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcblxuICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgIGFsZXJ0KCdBbiBlcnJvciBvY2N1cnJlZCBjb21waWxpbmcgdGhlIHNoYWRlcnM6ICcgKyBnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xuICAgIGdsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHNoYWRlcjtcbn1cblxuZnVuY3Rpb24gaW5pdEJ1ZmZlcnMoZ2wpIHtcblxuICBjb25zdCBwb3NpdGlvbkJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBwb3NpdGlvbkJ1ZmZlcik7XG5cbiAgY29uc3QgcG9zaXRpb25zID0gW1xuICAgIDEuMCwgIDEuMCxcbiAgICAtMS4wLCAgMS4wLFxuICAgIDEuMCwgLTEuMCxcbiAgICAtMS4wLCAtMS4wLFxuICBdO1xuXG4gIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbnMpLFxuICAgICAgZ2wuU1RBVElDX0RSQVcpO1xuXG4gIHJldHVybiB7XG4gICAgcG9zaXRpb246IHBvc2l0aW9uQnVmZmVyLFxuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIoZGF0YSkge1xuICBjb25zdCB0YXJnZXQgPSB0aGlzLkFSUkFZX0JVRkZFUl9UQVJHRVQsXG4gICAgICAgIGJ1ZmZlciA9IHRoaXMuY29udGV4dC5jcmVhdGVCdWZmZXIoKSxcbiAgICAgICAgZmxvYXQzMkFycmF5ID0gbmV3IEZsb2F0MzJBcnJheShkYXRhKSxcbiAgICAgICAgdXNhZ2UgPSB0aGlzLlNUQVRJQ19EUkFXX1VTQUdFO1xuXG4gIHRoaXMuY29udGV4dC5iaW5kQnVmZmVyKHRhcmdldCwgYnVmZmVyKTtcblxuICB0aGlzLmNvbnRleHQuYnVmZmVyRGF0YSh0YXJnZXQsIGZsb2F0MzJBcnJheSwgdXNhZ2UpO1xuXG4gIHJldHVybiBidWZmZXI7XG59XG5cbmZ1bmN0aW9uIGJpbmRCdWZmZXIoYnVmZmVyLCBhdHRyaWJ1dGVMb2NhdGlvbiwgY29tcG9uZW50cykge1xuICBjb25zdCB0YXJnZXQgPSB0aGlzLkFSUkFZX0JVRkZFUl9UQVJHRVQsXG4gICAgICAgIHR5cGUgPSB0aGlzLkZMT0FUX1RZUEUsXG4gICAgICAgIG5vcm1hbGl6ZSA9IGZhbHNlLFxuICAgICAgICBzdHJpZGUgPSAwLFxuICAgICAgICBvZmZzZXQgPSAwO1xuXG4gIHRoaXMuY29udGV4dC5iaW5kQnVmZmVyKHRhcmdldCwgYnVmZmVyKTtcblxuICB0aGlzLmNvbnRleHQudmVydGV4QXR0cmliUG9pbnRlcihhdHRyaWJ1dGVMb2NhdGlvbiwgY29tcG9uZW50cywgdHlwZSwgbm9ybWFsaXplLCBzdHJpZGUsIG9mZnNldCk7XG5cbiAgdGhpcy5jb250ZXh0LmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHJpYnV0ZUxvY2F0aW9uKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudEJ1ZmZlcihkYXRhKSB7XG4gIGNvbnN0IHRhcmdldCA9IHRoaXMuRUxFTUVOVF9BUlJBWV9CVUZGRVJfVEFSR0VULFxuICAgICAgICBlbGVtZW50QnVmZmVyID0gdGhpcy5jb250ZXh0LmNyZWF0ZUJ1ZmZlcigpLFxuICAgICAgICB1aW50MTZBcnJheSA9IG5ldyBVaW50MTZBcnJheShkYXRhKSxcbiAgICAgICAgdXNhZ2UgPSB0aGlzLlNUQVRJQ19EUkFXX1VTQUdFO1xuXG4gIHRoaXMuY29udGV4dC5iaW5kQnVmZmVyKHRhcmdldCwgZWxlbWVudEJ1ZmZlcik7XG5cbiAgdGhpcy5jb250ZXh0LmJ1ZmZlckRhdGEodGFyZ2V0LCB1aW50MTZBcnJheSwgdXNhZ2UpO1xuXG4gIHJldHVybiBlbGVtZW50QnVmZmVyO1xufVxuXG5mdW5jdGlvbiBiaW5kRWxlbWVudEJ1ZmZlcihlbGVtZW50QnVmZmVyKSB7XG4gIGNvbnN0IHRhcmdldCA9IHRoaXMuRUxFTUVOVF9BUlJBWV9CVUZGRVJfVEFSR0VUO1xuXG4gIHRoaXMuY29udGV4dC5iaW5kQnVmZmVyKHRhcmdldCwgZWxlbWVudEJ1ZmZlcik7XG59XG5cbmNvbnN0IGJ1ZmZlck1peGluID0ge1xuICBjcmVhdGVCdWZmZXI6IGNyZWF0ZUJ1ZmZlcixcbiAgYmluZEJ1ZmZlcjogYmluZEJ1ZmZlcixcbiAgY3JlYXRlRWxlbWVudEJ1ZmZlcjogY3JlYXRlRWxlbWVudEJ1ZmZlcixcbiAgYmluZEVsZW1lbnRCdWZmZXI6IGJpbmRFbGVtZW50QnVmZmVyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1ZmZlck1peGluO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBkZWZhdWx0UmVkID0gMC4wLFxuICAgICAgZGVmYXVsdEJsdWUgPSAwLjAsXG4gICAgICBkZWZhdWx0R3JlZW4gPSAwLjAsXG4gICAgICBkZWZhdWx0QWxwaGEgPSAxLjA7XG5cbmZ1bmN0aW9uIGNsZWFyQ29sb3VyKHJlZCA9IGRlZmF1bHRSZWQsIGdyZWVuID0gZGVmYXVsdEdyZWVuLCBibHVlID0gZGVmYXVsdEJsdWUsIGFscGhhID0gZGVmYXVsdEFscGhhKSB7IHRoaXMuY29udGV4dC5jbGVhckNvbG9yKHJlZCwgZ3JlZW4sIGJsdWUsIGFscGhhKTsgfVxuXG5mdW5jdGlvbiBjbGVhckNvbG91ckJ1ZmZlcigpIHtcbiAgY29uc3QgbWFzayA9IHRoaXMuQ09MT1JfQlVGRkVSX0JJVF9NQVNLO1xuXG4gIHRoaXMuY29udGV4dC5jbGVhcihtYXNrKTtcbn1cblxuY29uc3QgY29sb3VyTWl4aW4gPSB7XG4gIGNsZWFyQ29sb3VyOiBjbGVhckNvbG91cixcbiAgY2xlYXJDb2xvdXJCdWZmZXI6IGNsZWFyQ29sb3VyQnVmZmVyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbG91ck1peGluO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBkZWZhdWx0RGVwdGggPSAxLjA7XG5cbmZ1bmN0aW9uIGNsZWFyRGVwdGgoZGVwdGggPSBkZWZhdWx0RGVwdGgpIHsgdGhpcy5jb250ZXh0LmNsZWFyRGVwdGgoZGVwdGgpOyB9XG5cbmZ1bmN0aW9uIGNsZWFyRGVwdGhCdWZmZXIoKSB7XG4gIGNvbnN0IG1hc2sgPSB0aGlzLkRFUFRIX0JVRkZFUl9CSVRfTUFTSztcblxuICB0aGlzLmNvbnRleHQuY2xlYXIobWFzayk7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZURlcHRoVGVzdGluZygpIHtcbiAgY29uc3QgY2FwID0gdGhpcy5ERVBUSF9URVNUX0NBUDtcblxuICB0aGlzLmNvbnRleHQuZW5hYmxlKGNhcCk7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZURlcHRoRnVuY3Rpb24oKSB7XG4gIGNvbnN0IGZ1bmMgPSB0aGlzLkxFUVVBTF9GVU5DVElPTjtcbiAgXG4gIHRoaXMuY29udGV4dC5kZXB0aEZ1bmMoZnVuYyk7IFxufVxuXG5jb25zdCBkZXB0aE1peGluID0ge1xuICBjbGVhckRlcHRoOiBjbGVhckRlcHRoLFxuICBjbGVhckRlcHRoQnVmZmVyOiBjbGVhckRlcHRoQnVmZmVyLFxuICBlbmFibGVEZXB0aFRlc3Rpbmc6IGVuYWJsZURlcHRoVGVzdGluZyxcbiAgZW5hYmxlRGVwdGhGdW5jdGlvbjogZW5hYmxlRGVwdGhGdW5jdGlvblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZXB0aE1peGluO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBhcHBseU1hdHJpeCh1bmlmb3JtTG9jYXRpb24sIG1hdHJpeCkge1xuICBjb25zdCB0cmFuc3Bvc2UgPSBmYWxzZTsgIC8vL1xuXG4gIHRoaXMuY29udGV4dC51bmlmb3JtTWF0cml4NGZ2KHVuaWZvcm1Mb2NhdGlvbiwgdHJhbnNwb3NlLCBtYXRyaXgpO1xufVxuXG5jb25zdCBidWZmZXJNaXhpbiA9IHtcbiAgYXBwbHlNYXRyaXg6IGFwcGx5TWF0cml4XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1ZmZlck1peGluO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBjcmVhdGVTaGFkZXIodHlwZSwgc2hhZGVyU291cmNlKSB7XG4gIGNvbnN0IHNoYWRlciA9IHRoaXMuY29udGV4dC5jcmVhdGVTaGFkZXIodHlwZSksXG4gICAgICAgIHBuYW1lID0gdGhpcy5DT01QSUxFX1NUQVRVU19QTkFNRTtcblxuICB0aGlzLmNvbnRleHQuc2hhZGVyU291cmNlKHNoYWRlciwgc2hhZGVyU291cmNlKTtcblxuICB0aGlzLmNvbnRleHQuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG4gIGNvbnN0IGNvbXBpbGVTdGF0dXMgPSB0aGlzLmNvbnRleHQuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgcG5hbWUpO1xuXG4gIGlmICghY29tcGlsZVN0YXR1cykge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGNyZWF0ZSB0aGUgc2hhZGVyLmApO1xuICB9XG5cbiAgcmV0dXJuIHNoYWRlcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVmVydGV4U2hhZGVyKHZlcnRleFNoYWRlclNvdXJjZSkge1xuICBjb25zdCB0eXBlID0gdGhpcy5WRVJURVhfU0hBREVSX1RZUEUsXG4gICAgICAgIHZlcnRleFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKHR5cGUsIHZlcnRleFNoYWRlclNvdXJjZSk7XG5cbiAgcmV0dXJuIHZlcnRleFNoYWRlcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnRTaGFkZXIoZnJhZ21lbnRTaGFkZXJTb3VyY2UpIHtcbiAgY29uc3QgdHlwZSA9IHRoaXMuRlJBR01FTlRfU0hBREVSX1RZUEUsXG4gICAgICAgIHZlcnRleFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKHR5cGUsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcblxuICByZXR1cm4gdmVydGV4U2hhZGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTaGFkZXJQcm9ncmFtKHZlcnRleFNoYWRlclNvdXJjZSwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpIHtcbiAgY29uc3Qgc2hhZGVyUHJvZ3JhbSA9IHRoaXMuY29udGV4dC5jcmVhdGVQcm9ncmFtKCksXG4gICAgICAgIHZlcnRleFNoYWRlciA9IHRoaXMuY3JlYXRlVmVydGV4U2hhZGVyKHZlcnRleFNoYWRlclNvdXJjZSksXG4gICAgICAgIGZyYWdtZW50U2hhZGVyID0gdGhpcy5jcmVhdGVGcmFnbWVudFNoYWRlcihmcmFnbWVudFNoYWRlclNvdXJjZSksXG4gICAgICAgIHBuYW1lID0gdGhpcy5MSU5LX1NUQVRVU19QTkFNRTtcblxuICB0aGlzLmNvbnRleHQuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gIHRoaXMuY29udGV4dC5hdHRhY2hTaGFkZXIoc2hhZGVyUHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuXG4gIHRoaXMuY29udGV4dC5saW5rUHJvZ3JhbShzaGFkZXJQcm9ncmFtKTtcblxuICBjb25zdCBsaW5rU3RhdHVzID0gdGhpcy5jb250ZXh0LmdldFByb2dyYW1QYXJhbWV0ZXIoc2hhZGVyUHJvZ3JhbSwgcG5hbWUpO1xuXG4gIGlmICghbGlua1N0YXR1cykge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLmNvbnRleHQuZ2V0UHJvZ3JhbUluZm9Mb2coc2hhZGVyUHJvZ3JhbSk7ICAvLy9cblxuICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGNyZWF0ZSB0aGUgc2hhZGVyIHByb2dyYW0sICcke21lc3NhZ2V9Jy5gKTtcbiAgfVxuXG4gIHJldHVybiBzaGFkZXJQcm9ncmFtO1xufVxuXG5jb25zdCBzaGFkZXJNaXhpbiA9IHtcbiAgY3JlYXRlU2hhZGVyOiBjcmVhdGVTaGFkZXIsXG4gIGNyZWF0ZVZlcnRleFNoYWRlcjogY3JlYXRlVmVydGV4U2hhZGVyLFxuICBjcmVhdGVGcmFnbWVudFNoYWRlcjogY3JlYXRlRnJhZ21lbnRTaGFkZXIsXG4gIGNyZWF0ZVNoYWRlclByb2dyYW06IGNyZWF0ZVNoYWRlclByb2dyYW1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2hhZGVyTWl4aW47XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGNyZWF0ZVRleHR1cmUoaW1hZ2UpIHtcbiAgY29uc3QgdGV4dHVyZSA9IHRoaXMuY29udGV4dC5jcmVhdGVUZXh0dXJlKCksXG4gICAgICAgIHRhcmdldCA9IHRoaXMuVEVYVFVSRV8yRF9UQVJHRVQsXG4gICAgICAgIGxldmVsID0gMCxcbiAgICAgICAgaW50ZXJuYWxGb3JtYXQgPSB0aGlzLlJHQkFfRk9STUFULFxuICAgICAgICBmb3JtYXQgPSB0aGlzLlJHQkFfRk9STUFULFxuICAgICAgICB0eXBlID0gdGhpcy5VTlNJR05FRF9CWVRFX1RZUEU7XG5cbiAgdGhpcy5jb250ZXh0LmJpbmRUZXh0dXJlKHRhcmdldCwgdGV4dHVyZSk7XG5cbiAgdGhpcy5jb250ZXh0LnRleEltYWdlMkQodGFyZ2V0LCBsZXZlbCwgaW50ZXJuYWxGb3JtYXQsIGZvcm1hdCwgdHlwZSwgaW1hZ2UpO1xuXG4gIHRoaXMuY29udGV4dC50ZXhQYXJhbWV0ZXJpKHRhcmdldCwgdGhpcy5URVhUVVJFX1dSQVBfU19QTkFNRSwgdGhpcy5DTEFNUF9UT19FREdFX1BBUkFNKTtcbiAgdGhpcy5jb250ZXh0LnRleFBhcmFtZXRlcmkodGFyZ2V0LCB0aGlzLlRFWFRVUkVfV1JBUF9UX1BOQU1FLCB0aGlzLkNMQU1QX1RPX0VER0VfUEFSQU0pO1xuICB0aGlzLmNvbnRleHQudGV4UGFyYW1ldGVyaSh0YXJnZXQsIHRoaXMuVEVYVFVSRV9NSU5fRklMVEVSX1BOQU1FLCB0aGlzLkxJTkVBUl9QQVJBTSk7XG59XG5cbmZ1bmN0aW9uIGFjdGl2YXRlVGV4dHVyZSh0YXJnZXQpIHsgdGhpcy5jb250ZXh0LmFjdGl2ZVRleHR1cmUodGFyZ2V0KTsgfVxuXG5jb25zdCB0ZXh0dXJlTWl4aW4gPSB7XG4gIGNyZWF0ZVRleHR1cmU6IGNyZWF0ZVRleHR1cmUsXG4gIGFjdGl2YXRlVGV4dHVyZTogYWN0aXZhdGVUZXh0dXJlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRleHR1cmVNaXhpbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbWF0NCA9IHJlcXVpcmUoJ2dsLW1hdDQnKTsgIC8vL1xuXG5jb25zdCBkZWZhdWx0RmllbGRPZlZpZXcgPSA0NSAqIE1hdGguUEkgLyAxODAsXG4gICAgICBkZWZhdWx0Wk5lYXIgPSAwLjEsXG4gICAgICBkZWZhdWx0WkZhciA9IDEwMC4wO1xuXG5jbGFzcyBQZXJzcGVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQsIGZpZWxkT2ZWaWV3ID0gZGVmYXVsdEZpZWxkT2ZWaWV3LCB6TmVhciA9IGRlZmF1bHRaTmVhciwgekZhciA9IGRlZmF1bHRaRmFyKSB7XG4gICAgY29uc3QgYXNwZWN0UmF0aW8gPSBjbGllbnRXaWR0aCAvIGNsaWVudEhlaWdodDtcblxuICAgIHRoaXMubWF0cml4ID0gbWF0NC5jcmVhdGUoKTtcblxuICAgIG1hdDQucGVyc3BlY3RpdmUodGhpcy5tYXRyaXgsIGZpZWxkT2ZWaWV3LCBhc3BlY3RSYXRpbywgek5lYXIsIHpGYXIpO1xuICB9XG4gIFxuICBnZXRNYXRyaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0cml4O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGVyc3BlY3RpdmU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG1hdDQgPSByZXF1aXJlKCdnbC1tYXQ0Jyk7ICAvLy9cblxuY29uc3QgZGVmYXVsdFhPZmZzZXQgPSArMC4wLFxuICAgICAgZGVmYXVsdFlPZmZzZXQgPSArMC4wLFxuICAgICAgZGVmYXVsdFpPZmZzZXQgPSAtNi4wO1xuXG5jbGFzcyBQb3NpdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHhPZmZzZXQgPSBkZWZhdWx0WE9mZnNldCwgeU9mZnNldCA9IGRlZmF1bHRZT2Zmc2V0LCB6T2Zmc2V0ID0gZGVmYXVsdFpPZmZzZXQpIHtcbiAgICB0aGlzLm1hdHJpeCA9IG1hdDQuY3JlYXRlKCk7XG5cbiAgICBjb25zdCBvZmZzZXRWZWN0b3IgPSBbXG4gICAgICB4T2Zmc2V0LFxuICAgICAgeU9mZnNldCxcbiAgICAgIHpPZmZzZXRcbiAgICBdO1xuXG4gICAgbWF0NC50cmFuc2xhdGUodGhpcy5tYXRyaXgsIHRoaXMubWF0cml4LCBvZmZzZXRWZWN0b3IpO1xuICB9XG4gIFxuICBnZXRNYXRyaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0cml4O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zaXRpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG1hdDQgPSByZXF1aXJlKCdnbC1tYXQ0Jyk7ICAvLy9cblxuY29uc3QgZGVmYXVsdFhBbmdsZSA9IDAuMCxcbiAgICAgIGRlZmF1bHRZQW5nbGUgPSAwLjAsXG4gICAgICBkZWZhdWx0WkFuZ2xlID0gNi4wO1xuXG5jbGFzcyBSb3RhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHhBbmdsZSA9IGRlZmF1bHRYQW5nbGUsIHlBbmdsZSA9IGRlZmF1bHRZQW5nbGUsIHpBbmdsZSA9IGRlZmF1bHRaQW5nbGUpIHtcbiAgICB0aGlzLm1hdHJpeCA9IG1hdDQuY3JlYXRlKCk7XG5cbiAgICBjb25zdCB4QXhpc1ZlY3RvckFycmF5ID0gWzEsIDAsIDBdLFxuICAgICAgICAgIHlBeGlzVmVjdG9yQXJyYXkgPSBbMCwgMSwgMF0sXG4gICAgICAgICAgekF4aXNWZWN0b3JBcnJheSA9IFswLCAwLCAxXTtcblxuICAgIG1hdDQucm90YXRlKHRoaXMubWF0cml4LCB0aGlzLm1hdHJpeCwgeEFuZ2xlLCB4QXhpc1ZlY3RvckFycmF5KTtcbiAgICBtYXQ0LnJvdGF0ZSh0aGlzLm1hdHJpeCwgdGhpcy5tYXRyaXgsIHlBbmdsZSwgeUF4aXNWZWN0b3JBcnJheSk7XG4gICAgbWF0NC5yb3RhdGUodGhpcy5tYXRyaXgsIHRoaXMubWF0cml4LCB6QW5nbGUsIHpBeGlzVmVjdG9yQXJyYXkpO1xuICB9XG4gIFxuICBnZXRNYXRyaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0cml4O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm90YXRpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGRvbUVsZW1lbnRGcm9tU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgY29uc3QgZG9tRWxlbWVudCA9ICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSA/XG4gICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpWzBdIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOyAgLy8vXG5cbiAgcmV0dXJuIGRvbUVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBkb21FbGVtZW50RnJvbVNlbGVjdG9yOiBkb21FbGVtZW50RnJvbVNlbGVjdG9yXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBhZGpvaW50O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gYWRqb2ludChvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XTtcblxuICAgIG91dFswXSAgPSAgKGExMSAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIxICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgKyBhMzEgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSk7XG4gICAgb3V0WzFdICA9IC0oYTAxICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpKTtcbiAgICBvdXRbMl0gID0gIChhMDEgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSAtIGExMSAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgIG91dFszXSAgPSAtKGEwMSAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTExICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjEgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzRdICA9IC0oYTEwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSArIGEzMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpKTtcbiAgICBvdXRbNV0gID0gIChhMDAgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMCAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikpO1xuICAgIG91dFs2XSAgPSAtKGEwMCAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpIC0gYTEwICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzddICA9ICAoYTAwICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikgLSBhMTAgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSArIGEyMCAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgICBvdXRbOF0gID0gIChhMTAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpICsgYTMwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkpO1xuICAgIG91dFs5XSAgPSAtKGEwMCAqIChhMjEgKiBhMzMgLSBhMjMgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSk7XG4gICAgb3V0WzEwXSA9ICAoYTAwICogKGExMSAqIGEzMyAtIGExMyAqIGEzMSkgLSBhMTAgKiAoYTAxICogYTMzIC0gYTAzICogYTMxKSArIGEzMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpKTtcbiAgICBvdXRbMTFdID0gLShhMDAgKiAoYTExICogYTIzIC0gYTEzICogYTIxKSAtIGExMCAqIChhMDEgKiBhMjMgLSBhMDMgKiBhMjEpICsgYTIwICogKGEwMSAqIGExMyAtIGEwMyAqIGExMSkpO1xuICAgIG91dFsxMl0gPSAtKGExMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgKyBhMzAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSk7XG4gICAgb3V0WzEzXSA9ICAoYTAwICogKGEyMSAqIGEzMiAtIGEyMiAqIGEzMSkgLSBhMjAgKiAoYTAxICogYTMyIC0gYTAyICogYTMxKSArIGEzMCAqIChhMDEgKiBhMjIgLSBhMDIgKiBhMjEpKTtcbiAgICBvdXRbMTRdID0gLShhMDAgKiAoYTExICogYTMyIC0gYTEyICogYTMxKSAtIGExMCAqIChhMDEgKiBhMzIgLSBhMDIgKiBhMzEpICsgYTMwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSkpO1xuICAgIG91dFsxNV0gPSAgKGEwMCAqIChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpIC0gYTEwICogKGEwMSAqIGEyMiAtIGEwMiAqIGEyMSkgKyBhMjAgKiAoYTAxICogYTEyIC0gYTAyICogYTExKSk7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBjbG9uZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgbWF0cml4IHRvIGNsb25lXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5mdW5jdGlvbiBjbG9uZShhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIG91dFs5XSA9IGFbOV07XG4gICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBjb3B5O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBtYXQ0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgb3V0WzldID0gYVs5XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDRcbiAqXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5mdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAxO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDE7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBkZXRlcm1pbmFudDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xuZnVuY3Rpb24gZGV0ZXJtaW5hbnQoYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG4gICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdLFxuXG4gICAgICAgIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMCxcbiAgICAgICAgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwLFxuICAgICAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsXG4gICAgICAgIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMSxcbiAgICAgICAgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExLFxuICAgICAgICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG4gICAgICAgIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMCxcbiAgICAgICAgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwLFxuICAgICAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsXG4gICAgICAgIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMSxcbiAgICAgICAgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxLFxuICAgICAgICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgcmV0dXJuIGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmcm9tUXVhdDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBmcm9tUXVhdChvdXQsIHEpIHtcbiAgICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICAgIHgyID0geCArIHgsXG4gICAgICAgIHkyID0geSArIHksXG4gICAgICAgIHoyID0geiArIHosXG5cbiAgICAgICAgeHggPSB4ICogeDIsXG4gICAgICAgIHl4ID0geSAqIHgyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgenggPSB6ICogeDIsXG4gICAgICAgIHp5ID0geiAqIHkyLFxuICAgICAgICB6eiA9IHogKiB6MixcbiAgICAgICAgd3ggPSB3ICogeDIsXG4gICAgICAgIHd5ID0gdyAqIHkyLFxuICAgICAgICB3eiA9IHcgKiB6MjtcblxuICAgIG91dFswXSA9IDEgLSB5eSAtIHp6O1xuICAgIG91dFsxXSA9IHl4ICsgd3o7XG4gICAgb3V0WzJdID0genggLSB3eTtcbiAgICBvdXRbM10gPSAwO1xuXG4gICAgb3V0WzRdID0geXggLSB3ejtcbiAgICBvdXRbNV0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbNl0gPSB6eSArIHd4O1xuICAgIG91dFs3XSA9IDA7XG5cbiAgICBvdXRbOF0gPSB6eCArIHd5O1xuICAgIG91dFs5XSA9IHp5IC0gd3g7XG4gICAgb3V0WzEwXSA9IDEgLSB4eCAtIHl5O1xuICAgIG91dFsxMV0gPSAwO1xuXG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24gYW5kIHZlY3RvciB0cmFuc2xhdGlvblxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcbiAqICAgICB2YXIgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xuICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3ZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uKG91dCwgcSwgdikge1xuICAgIC8vIFF1YXRlcm5pb24gbWF0aFxuICAgIHZhciB4ID0gcVswXSwgeSA9IHFbMV0sIHogPSBxWzJdLCB3ID0gcVszXSxcbiAgICAgICAgeDIgPSB4ICsgeCxcbiAgICAgICAgeTIgPSB5ICsgeSxcbiAgICAgICAgejIgPSB6ICsgeixcblxuICAgICAgICB4eCA9IHggKiB4MixcbiAgICAgICAgeHkgPSB4ICogeTIsXG4gICAgICAgIHh6ID0geCAqIHoyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgeXogPSB5ICogejIsXG4gICAgICAgIHp6ID0geiAqIHoyLFxuICAgICAgICB3eCA9IHcgKiB4MixcbiAgICAgICAgd3kgPSB3ICogeTIsXG4gICAgICAgIHd6ID0gdyAqIHoyO1xuXG4gICAgb3V0WzBdID0gMSAtICh5eSArIHp6KTtcbiAgICBvdXRbMV0gPSB4eSArIHd6O1xuICAgIG91dFsyXSA9IHh6IC0gd3k7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSB4eSAtIHd6O1xuICAgIG91dFs1XSA9IDEgLSAoeHggKyB6eik7XG4gICAgb3V0WzZdID0geXogKyB3eDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IHh6ICsgd3k7XG4gICAgb3V0WzldID0geXogLSB3eDtcbiAgICBvdXRbMTBdID0gMSAtICh4eCArIHl5KTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gdlswXTtcbiAgICBvdXRbMTNdID0gdlsxXTtcbiAgICBvdXRbMTRdID0gdlsyXTtcbiAgICBvdXRbMTVdID0gMTtcbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZydXN0dW07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgZnJ1c3R1bSBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtOdW1iZXJ9IGxlZnQgTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IHJpZ2h0IFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gYm90dG9tIEJvdHRvbSBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IHRvcCBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGZydXN0dW0ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICAgIHZhciBybCA9IDEgLyAocmlnaHQgLSBsZWZ0KSxcbiAgICAgICAgdGIgPSAxIC8gKHRvcCAtIGJvdHRvbSksXG4gICAgICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSAobmVhciAqIDIpICogcmw7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAobmVhciAqIDIpICogdGI7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IChyaWdodCArIGxlZnQpICogcmw7XG4gICAgb3V0WzldID0gKHRvcCArIGJvdHRvbSkgKiB0YjtcbiAgICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzExXSA9IC0xO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAoZmFyICogbmVhciAqIDIpICogbmY7XG4gICAgb3V0WzE1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcblxuLyoqXG4gKiBTZXQgYSBtYXQ0IHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBpZGVudGl0eShvdXQpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMTtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAxO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6IHJlcXVpcmUoJy4vY3JlYXRlJylcbiAgLCBjbG9uZTogcmVxdWlyZSgnLi9jbG9uZScpXG4gICwgY29weTogcmVxdWlyZSgnLi9jb3B5JylcbiAgLCBpZGVudGl0eTogcmVxdWlyZSgnLi9pZGVudGl0eScpXG4gICwgdHJhbnNwb3NlOiByZXF1aXJlKCcuL3RyYW5zcG9zZScpXG4gICwgaW52ZXJ0OiByZXF1aXJlKCcuL2ludmVydCcpXG4gICwgYWRqb2ludDogcmVxdWlyZSgnLi9hZGpvaW50JylcbiAgLCBkZXRlcm1pbmFudDogcmVxdWlyZSgnLi9kZXRlcm1pbmFudCcpXG4gICwgbXVsdGlwbHk6IHJlcXVpcmUoJy4vbXVsdGlwbHknKVxuICAsIHRyYW5zbGF0ZTogcmVxdWlyZSgnLi90cmFuc2xhdGUnKVxuICAsIHNjYWxlOiByZXF1aXJlKCcuL3NjYWxlJylcbiAgLCByb3RhdGU6IHJlcXVpcmUoJy4vcm90YXRlJylcbiAgLCByb3RhdGVYOiByZXF1aXJlKCcuL3JvdGF0ZVgnKVxuICAsIHJvdGF0ZVk6IHJlcXVpcmUoJy4vcm90YXRlWScpXG4gICwgcm90YXRlWjogcmVxdWlyZSgnLi9yb3RhdGVaJylcbiAgLCBmcm9tUm90YXRpb25UcmFuc2xhdGlvbjogcmVxdWlyZSgnLi9mcm9tUm90YXRpb25UcmFuc2xhdGlvbicpXG4gICwgZnJvbVF1YXQ6IHJlcXVpcmUoJy4vZnJvbVF1YXQnKVxuICAsIGZydXN0dW06IHJlcXVpcmUoJy4vZnJ1c3R1bScpXG4gICwgcGVyc3BlY3RpdmU6IHJlcXVpcmUoJy4vcGVyc3BlY3RpdmUnKVxuICAsIHBlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3OiByZXF1aXJlKCcuL3BlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3JylcbiAgLCBvcnRobzogcmVxdWlyZSgnLi9vcnRobycpXG4gICwgbG9va0F0OiByZXF1aXJlKCcuL2xvb2tBdCcpXG4gICwgc3RyOiByZXF1aXJlKCcuL3N0cicpXG59IiwibW9kdWxlLmV4cG9ydHMgPSBpbnZlcnQ7XG5cbi8qKlxuICogSW52ZXJ0cyBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGludmVydChvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XSxcblxuICAgICAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsXG4gICAgICAgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICAgICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLFxuICAgICAgICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSxcbiAgICAgICAgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLFxuICAgICAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsXG4gICAgICAgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICAgICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLFxuICAgICAgICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSxcbiAgICAgICAgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyLFxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gICAgaWYgKCFkZXQpIHsgXG4gICAgICAgIHJldHVybiBudWxsOyBcbiAgICB9XG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgb3V0WzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzFdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XG4gICAgb3V0WzNdID0gKGEyMiAqIGIwNCAtIGEyMSAqIGIwNSAtIGEyMyAqIGIwMykgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzVdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzZdID0gKGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSkgKiBkZXQ7XG4gICAgb3V0WzddID0gKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQ7XG4gICAgb3V0WzhdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzldID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzEwXSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuICAgIG91dFsxMV0gPSAoYTIxICogYjAyIC0gYTIwICogYjA0IC0gYTIzICogYjAwKSAqIGRldDtcbiAgICBvdXRbMTJdID0gKGExMSAqIGIwNyAtIGExMCAqIGIwOSAtIGExMiAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzEzXSA9IChhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYpICogZGV0O1xuICAgIG91dFsxNF0gPSAoYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwKSAqIGRldDtcbiAgICBvdXRbMTVdID0gKGEyMCAqIGIwMyAtIGEyMSAqIGIwMSArIGEyMiAqIGIwMCkgKiBkZXQ7XG5cbiAgICByZXR1cm4gb3V0O1xufTsiLCJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbG9va0F0O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGxvb2stYXQgbWF0cml4IHdpdGggdGhlIGdpdmVuIGV5ZSBwb3NpdGlvbiwgZm9jYWwgcG9pbnQsIGFuZCB1cCBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHt2ZWMzfSBleWUgUG9zaXRpb24gb2YgdGhlIHZpZXdlclxuICogQHBhcmFtIHt2ZWMzfSBjZW50ZXIgUG9pbnQgdGhlIHZpZXdlciBpcyBsb29raW5nIGF0XG4gKiBAcGFyYW0ge3ZlYzN9IHVwIHZlYzMgcG9pbnRpbmcgdXBcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gbG9va0F0KG91dCwgZXllLCBjZW50ZXIsIHVwKSB7XG4gICAgdmFyIHgwLCB4MSwgeDIsIHkwLCB5MSwgeTIsIHowLCB6MSwgejIsIGxlbixcbiAgICAgICAgZXlleCA9IGV5ZVswXSxcbiAgICAgICAgZXlleSA9IGV5ZVsxXSxcbiAgICAgICAgZXlleiA9IGV5ZVsyXSxcbiAgICAgICAgdXB4ID0gdXBbMF0sXG4gICAgICAgIHVweSA9IHVwWzFdLFxuICAgICAgICB1cHogPSB1cFsyXSxcbiAgICAgICAgY2VudGVyeCA9IGNlbnRlclswXSxcbiAgICAgICAgY2VudGVyeSA9IGNlbnRlclsxXSxcbiAgICAgICAgY2VudGVyeiA9IGNlbnRlclsyXTtcblxuICAgIGlmIChNYXRoLmFicyhleWV4IC0gY2VudGVyeCkgPCAwLjAwMDAwMSAmJlxuICAgICAgICBNYXRoLmFicyhleWV5IC0gY2VudGVyeSkgPCAwLjAwMDAwMSAmJlxuICAgICAgICBNYXRoLmFicyhleWV6IC0gY2VudGVyeikgPCAwLjAwMDAwMSkge1xuICAgICAgICByZXR1cm4gaWRlbnRpdHkob3V0KTtcbiAgICB9XG5cbiAgICB6MCA9IGV5ZXggLSBjZW50ZXJ4O1xuICAgIHoxID0gZXlleSAtIGNlbnRlcnk7XG4gICAgejIgPSBleWV6IC0gY2VudGVyejtcblxuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQoejAgKiB6MCArIHoxICogejEgKyB6MiAqIHoyKTtcbiAgICB6MCAqPSBsZW47XG4gICAgejEgKj0gbGVuO1xuICAgIHoyICo9IGxlbjtcblxuICAgIHgwID0gdXB5ICogejIgLSB1cHogKiB6MTtcbiAgICB4MSA9IHVweiAqIHowIC0gdXB4ICogejI7XG4gICAgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xuICAgIGxlbiA9IE1hdGguc3FydCh4MCAqIHgwICsgeDEgKiB4MSArIHgyICogeDIpO1xuICAgIGlmICghbGVuKSB7XG4gICAgICAgIHgwID0gMDtcbiAgICAgICAgeDEgPSAwO1xuICAgICAgICB4MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeDAgKj0gbGVuO1xuICAgICAgICB4MSAqPSBsZW47XG4gICAgICAgIHgyICo9IGxlbjtcbiAgICB9XG5cbiAgICB5MCA9IHoxICogeDIgLSB6MiAqIHgxO1xuICAgIHkxID0gejIgKiB4MCAtIHowICogeDI7XG4gICAgeTIgPSB6MCAqIHgxIC0gejEgKiB4MDtcblxuICAgIGxlbiA9IE1hdGguc3FydCh5MCAqIHkwICsgeTEgKiB5MSArIHkyICogeTIpO1xuICAgIGlmICghbGVuKSB7XG4gICAgICAgIHkwID0gMDtcbiAgICAgICAgeTEgPSAwO1xuICAgICAgICB5MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeTAgKj0gbGVuO1xuICAgICAgICB5MSAqPSBsZW47XG4gICAgICAgIHkyICo9IGxlbjtcbiAgICB9XG5cbiAgICBvdXRbMF0gPSB4MDtcbiAgICBvdXRbMV0gPSB5MDtcbiAgICBvdXRbMl0gPSB6MDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHgxO1xuICAgIG91dFs1XSA9IHkxO1xuICAgIG91dFs2XSA9IHoxO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0geDI7XG4gICAgb3V0WzldID0geTI7XG4gICAgb3V0WzEwXSA9IHoyO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAtKHgwICogZXlleCArIHgxICogZXlleSArIHgyICogZXlleik7XG4gICAgb3V0WzEzXSA9IC0oeTAgKiBleWV4ICsgeTEgKiBleWV5ICsgeTIgKiBleWV6KTtcbiAgICBvdXRbMTRdID0gLSh6MCAqIGV5ZXggKyB6MSAqIGV5ZXkgKyB6MiAqIGV5ZXopO1xuICAgIG91dFsxNV0gPSAxO1xuXG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBseTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBtYXQ0J3NcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge21hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG4gICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdO1xuXG4gICAgLy8gQ2FjaGUgb25seSB0aGUgY3VycmVudCBsaW5lIG9mIHRoZSBzZWNvbmQgbWF0cml4XG4gICAgdmFyIGIwICA9IGJbMF0sIGIxID0gYlsxXSwgYjIgPSBiWzJdLCBiMyA9IGJbM107ICBcbiAgICBvdXRbMF0gPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0WzFdID0gYjAqYTAxICsgYjEqYTExICsgYjIqYTIxICsgYjMqYTMxO1xuICAgIG91dFsyXSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbM10gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG5cbiAgICBiMCA9IGJbNF07IGIxID0gYls1XTsgYjIgPSBiWzZdOyBiMyA9IGJbN107XG4gICAgb3V0WzRdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFs1XSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbNl0gPSBiMCphMDIgKyBiMSphMTIgKyBiMiphMjIgKyBiMyphMzI7XG4gICAgb3V0WzddID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgYjAgPSBiWzhdOyBiMSA9IGJbOV07IGIyID0gYlsxMF07IGIzID0gYlsxMV07XG4gICAgb3V0WzhdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFs5XSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMTBdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFsxMV0gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG5cbiAgICBiMCA9IGJbMTJdOyBiMSA9IGJbMTNdOyBiMiA9IGJbMTRdOyBiMyA9IGJbMTVdO1xuICAgIG91dFsxMl0gPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0WzEzXSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMTRdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFsxNV0gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBvcnRobztcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBvcnRob2dvbmFsIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBvcnRobyhvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIGxyID0gMSAvIChsZWZ0IC0gcmlnaHQpLFxuICAgICAgICBidCA9IDEgLyAoYm90dG9tIC0gdG9wKSxcbiAgICAgICAgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFswXSA9IC0yICogbHI7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAtMiAqIGJ0O1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDIgKiBuZjtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gKGxlZnQgKyByaWdodCkgKiBscjtcbiAgICBvdXRbMTNdID0gKHRvcCArIGJvdHRvbSkgKiBidDtcbiAgICBvdXRbMTRdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBwZXJzcGVjdGl2ZTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gZm92eSBWZXJ0aWNhbCBmaWVsZCBvZiB2aWV3IGluIHJhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBhc3BlY3QgQXNwZWN0IHJhdGlvLiB0eXBpY2FsbHkgdmlld3BvcnQgd2lkdGgvaGVpZ2h0XG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBwZXJzcGVjdGl2ZShvdXQsIGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIGYgPSAxLjAgLyBNYXRoLnRhbihmb3Z5IC8gMiksXG4gICAgICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSBmIC8gYXNwZWN0O1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gZjtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTFdID0gLTE7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9ICgyICogZmFyICogbmVhcikgKiBuZjtcbiAgICBvdXRbMTVdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHBlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGZpZWxkIG9mIHZpZXcuXG4gKiBUaGlzIGlzIHByaW1hcmlseSB1c2VmdWwgZm9yIGdlbmVyYXRpbmcgcHJvamVjdGlvbiBtYXRyaWNlcyB0byBiZSB1c2VkXG4gKiB3aXRoIHRoZSBzdGlsbCBleHBlcmllbWVudGFsIFdlYlZSIEFQSS5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gZm92IE9iamVjdCBjb250YWluaW5nIHRoZSBmb2xsb3dpbmcgdmFsdWVzOiB1cERlZ3JlZXMsIGRvd25EZWdyZWVzLCBsZWZ0RGVncmVlcywgcmlnaHREZWdyZWVzXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBwZXJzcGVjdGl2ZUZyb21GaWVsZE9mVmlldyhvdXQsIGZvdiwgbmVhciwgZmFyKSB7XG4gICAgdmFyIHVwVGFuID0gTWF0aC50YW4oZm92LnVwRGVncmVlcyAqIE1hdGguUEkvMTgwLjApLFxuICAgICAgICBkb3duVGFuID0gTWF0aC50YW4oZm92LmRvd25EZWdyZWVzICogTWF0aC5QSS8xODAuMCksXG4gICAgICAgIGxlZnRUYW4gPSBNYXRoLnRhbihmb3YubGVmdERlZ3JlZXMgKiBNYXRoLlBJLzE4MC4wKSxcbiAgICAgICAgcmlnaHRUYW4gPSBNYXRoLnRhbihmb3YucmlnaHREZWdyZWVzICogTWF0aC5QSS8xODAuMCksXG4gICAgICAgIHhTY2FsZSA9IDIuMCAvIChsZWZ0VGFuICsgcmlnaHRUYW4pLFxuICAgICAgICB5U2NhbGUgPSAyLjAgLyAodXBUYW4gKyBkb3duVGFuKTtcblxuICAgIG91dFswXSA9IHhTY2FsZTtcbiAgICBvdXRbMV0gPSAwLjA7XG4gICAgb3V0WzJdID0gMC4wO1xuICAgIG91dFszXSA9IDAuMDtcbiAgICBvdXRbNF0gPSAwLjA7XG4gICAgb3V0WzVdID0geVNjYWxlO1xuICAgIG91dFs2XSA9IDAuMDtcbiAgICBvdXRbN10gPSAwLjA7XG4gICAgb3V0WzhdID0gLSgobGVmdFRhbiAtIHJpZ2h0VGFuKSAqIHhTY2FsZSAqIDAuNSk7XG4gICAgb3V0WzldID0gKCh1cFRhbiAtIGRvd25UYW4pICogeVNjYWxlICogMC41KTtcbiAgICBvdXRbMTBdID0gZmFyIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFsxMV0gPSAtMS4wO1xuICAgIG91dFsxMl0gPSAwLjA7XG4gICAgb3V0WzEzXSA9IDAuMDtcbiAgICBvdXRbMTRdID0gKGZhciAqIG5lYXIpIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFsxNV0gPSAwLjA7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuIiwibW9kdWxlLmV4cG9ydHMgPSByb3RhdGU7XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDQgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEBwYXJhbSB7dmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHJvdGF0ZShvdXQsIGEsIHJhZCwgYXhpcykge1xuICAgIHZhciB4ID0gYXhpc1swXSwgeSA9IGF4aXNbMV0sIHogPSBheGlzWzJdLFxuICAgICAgICBsZW4gPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KSxcbiAgICAgICAgcywgYywgdCxcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXG4gICAgICAgIGEyMCwgYTIxLCBhMjIsIGEyMyxcbiAgICAgICAgYjAwLCBiMDEsIGIwMixcbiAgICAgICAgYjEwLCBiMTEsIGIxMixcbiAgICAgICAgYjIwLCBiMjEsIGIyMjtcblxuICAgIGlmIChNYXRoLmFicyhsZW4pIDwgMC4wMDAwMDEpIHsgcmV0dXJuIG51bGw7IH1cbiAgICBcbiAgICBsZW4gPSAxIC8gbGVuO1xuICAgIHggKj0gbGVuO1xuICAgIHkgKj0gbGVuO1xuICAgIHogKj0gbGVuO1xuXG4gICAgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgdCA9IDEgLSBjO1xuXG4gICAgYTAwID0gYVswXTsgYTAxID0gYVsxXTsgYTAyID0gYVsyXTsgYTAzID0gYVszXTtcbiAgICBhMTAgPSBhWzRdOyBhMTEgPSBhWzVdOyBhMTIgPSBhWzZdOyBhMTMgPSBhWzddO1xuICAgIGEyMCA9IGFbOF07IGEyMSA9IGFbOV07IGEyMiA9IGFbMTBdOyBhMjMgPSBhWzExXTtcblxuICAgIC8vIENvbnN0cnVjdCB0aGUgZWxlbWVudHMgb2YgdGhlIHJvdGF0aW9uIG1hdHJpeFxuICAgIGIwMCA9IHggKiB4ICogdCArIGM7IGIwMSA9IHkgKiB4ICogdCArIHogKiBzOyBiMDIgPSB6ICogeCAqIHQgLSB5ICogcztcbiAgICBiMTAgPSB4ICogeSAqIHQgLSB6ICogczsgYjExID0geSAqIHkgKiB0ICsgYzsgYjEyID0geiAqIHkgKiB0ICsgeCAqIHM7XG4gICAgYjIwID0geCAqIHogKiB0ICsgeSAqIHM7IGIyMSA9IHkgKiB6ICogdCAtIHggKiBzOyBiMjIgPSB6ICogeiAqIHQgKyBjO1xuXG4gICAgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICBvdXRbMF0gPSBhMDAgKiBiMDAgKyBhMTAgKiBiMDEgKyBhMjAgKiBiMDI7XG4gICAgb3V0WzFdID0gYTAxICogYjAwICsgYTExICogYjAxICsgYTIxICogYjAyO1xuICAgIG91dFsyXSA9IGEwMiAqIGIwMCArIGExMiAqIGIwMSArIGEyMiAqIGIwMjtcbiAgICBvdXRbM10gPSBhMDMgKiBiMDAgKyBhMTMgKiBiMDEgKyBhMjMgKiBiMDI7XG4gICAgb3V0WzRdID0gYTAwICogYjEwICsgYTEwICogYjExICsgYTIwICogYjEyO1xuICAgIG91dFs1XSA9IGEwMSAqIGIxMCArIGExMSAqIGIxMSArIGEyMSAqIGIxMjtcbiAgICBvdXRbNl0gPSBhMDIgKiBiMTAgKyBhMTIgKiBiMTEgKyBhMjIgKiBiMTI7XG4gICAgb3V0WzddID0gYTAzICogYjEwICsgYTEzICogYjExICsgYTIzICogYjEyO1xuICAgIG91dFs4XSA9IGEwMCAqIGIyMCArIGExMCAqIGIyMSArIGEyMCAqIGIyMjtcbiAgICBvdXRbOV0gPSBhMDEgKiBiMjAgKyBhMTEgKiBiMjEgKyBhMjEgKiBiMjI7XG4gICAgb3V0WzEwXSA9IGEwMiAqIGIyMCArIGExMiAqIGIyMSArIGEyMiAqIGIyMjtcbiAgICBvdXRbMTFdID0gYTAzICogYjIwICsgYTEzICogYjIxICsgYTIzICogYjIyO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcm90YXRlWDtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFggYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHJvdGF0ZVgob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpLFxuICAgICAgICBhMTAgPSBhWzRdLFxuICAgICAgICBhMTEgPSBhWzVdLFxuICAgICAgICBhMTIgPSBhWzZdLFxuICAgICAgICBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLFxuICAgICAgICBhMjEgPSBhWzldLFxuICAgICAgICBhMjIgPSBhWzEwXSxcbiAgICAgICAgYTIzID0gYVsxMV07XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgICAgb3V0WzBdICA9IGFbMF07XG4gICAgICAgIG91dFsxXSAgPSBhWzFdO1xuICAgICAgICBvdXRbMl0gID0gYVsyXTtcbiAgICAgICAgb3V0WzNdICA9IGFbM107XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzRdID0gYTEwICogYyArIGEyMCAqIHM7XG4gICAgb3V0WzVdID0gYTExICogYyArIGEyMSAqIHM7XG4gICAgb3V0WzZdID0gYTEyICogYyArIGEyMiAqIHM7XG4gICAgb3V0WzddID0gYTEzICogYyArIGEyMyAqIHM7XG4gICAgb3V0WzhdID0gYTIwICogYyAtIGExMCAqIHM7XG4gICAgb3V0WzldID0gYTIxICogYyAtIGExMSAqIHM7XG4gICAgb3V0WzEwXSA9IGEyMiAqIGMgLSBhMTIgKiBzO1xuICAgIG91dFsxMV0gPSBhMjMgKiBjIC0gYTEzICogcztcbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJvdGF0ZVk7XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBZIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiByb3RhdGVZKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKSxcbiAgICAgICAgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXSxcbiAgICAgICAgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgICAgIG91dFs0XSAgPSBhWzRdO1xuICAgICAgICBvdXRbNV0gID0gYVs1XTtcbiAgICAgICAgb3V0WzZdICA9IGFbNl07XG4gICAgICAgIG91dFs3XSAgPSBhWzddO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IGEwMCAqIGMgLSBhMjAgKiBzO1xuICAgIG91dFsxXSA9IGEwMSAqIGMgLSBhMjEgKiBzO1xuICAgIG91dFsyXSA9IGEwMiAqIGMgLSBhMjIgKiBzO1xuICAgIG91dFszXSA9IGEwMyAqIGMgLSBhMjMgKiBzO1xuICAgIG91dFs4XSA9IGEwMCAqIHMgKyBhMjAgKiBjO1xuICAgIG91dFs5XSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xuICAgIG91dFsxMF0gPSBhMDIgKiBzICsgYTIyICogYztcbiAgICBvdXRbMTFdID0gYTAzICogcyArIGEyMyAqIGM7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByb3RhdGVaO1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWiBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gcm90YXRlWihvdXQsIGEsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCksXG4gICAgICAgIGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sXG4gICAgICAgIGExMSA9IGFbNV0sXG4gICAgICAgIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN107XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgICAgIG91dFs4XSAgPSBhWzhdO1xuICAgICAgICBvdXRbOV0gID0gYVs5XTtcbiAgICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdID0gYTAwICogYyArIGExMCAqIHM7XG4gICAgb3V0WzFdID0gYTAxICogYyArIGExMSAqIHM7XG4gICAgb3V0WzJdID0gYTAyICogYyArIGExMiAqIHM7XG4gICAgb3V0WzNdID0gYTAzICogYyArIGExMyAqIHM7XG4gICAgb3V0WzRdID0gYTEwICogYyAtIGEwMCAqIHM7XG4gICAgb3V0WzVdID0gYTExICogYyAtIGEwMSAqIHM7XG4gICAgb3V0WzZdID0gYTEyICogYyAtIGEwMiAqIHM7XG4gICAgb3V0WzddID0gYTEzICogYyAtIGEwMyAqIHM7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBzY2FsZTtcblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAqIEBwYXJhbSB7dmVjM30gdiB0aGUgdmVjMyB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKiovXG5mdW5jdGlvbiBzY2FsZShvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdLCB6ID0gdlsyXTtcblxuICAgIG91dFswXSA9IGFbMF0gKiB4O1xuICAgIG91dFsxXSA9IGFbMV0gKiB4O1xuICAgIG91dFsyXSA9IGFbMl0gKiB4O1xuICAgIG91dFszXSA9IGFbM10gKiB4O1xuICAgIG91dFs0XSA9IGFbNF0gKiB5O1xuICAgIG91dFs1XSA9IGFbNV0gKiB5O1xuICAgIG91dFs2XSA9IGFbNl0gKiB5O1xuICAgIG91dFs3XSA9IGFbN10gKiB5O1xuICAgIG91dFs4XSA9IGFbOF0gKiB6O1xuICAgIG91dFs5XSA9IGFbOV0gKiB6O1xuICAgIG91dFsxMF0gPSBhWzEwXSAqIHo7XG4gICAgb3V0WzExXSA9IGFbMTFdICogejtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBzdHI7XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG1hdCBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5mdW5jdGlvbiBzdHIoYSkge1xuICAgIHJldHVybiAnbWF0NCgnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgYVszXSArICcsICcgK1xuICAgICAgICAgICAgICAgICAgICBhWzRdICsgJywgJyArIGFbNV0gKyAnLCAnICsgYVs2XSArICcsICcgKyBhWzddICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgIGFbOF0gKyAnLCAnICsgYVs5XSArICcsICcgKyBhWzEwXSArICcsICcgKyBhWzExXSArICcsICcgKyBcbiAgICAgICAgICAgICAgICAgICAgYVsxMl0gKyAnLCAnICsgYVsxM10gKyAnLCAnICsgYVsxNF0gKyAnLCAnICsgYVsxNV0gKyAnKSc7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gdHJhbnNsYXRlO1xuXG4vKipcbiAqIFRyYW5zbGF0ZSBhIG1hdDQgYnkgdGhlIGdpdmVuIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcbiAqIEBwYXJhbSB7dmVjM30gdiB2ZWN0b3IgdG8gdHJhbnNsYXRlIGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHRyYW5zbGF0ZShvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdLCB6ID0gdlsyXSxcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXG4gICAgICAgIGEyMCwgYTIxLCBhMjIsIGEyMztcblxuICAgIGlmIChhID09PSBvdXQpIHtcbiAgICAgICAgb3V0WzEyXSA9IGFbMF0gKiB4ICsgYVs0XSAqIHkgKyBhWzhdICogeiArIGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxXSAqIHggKyBhWzVdICogeSArIGFbOV0gKiB6ICsgYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzJdICogeCArIGFbNl0gKiB5ICsgYVsxMF0gKiB6ICsgYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzNdICogeCArIGFbN10gKiB5ICsgYVsxMV0gKiB6ICsgYVsxNV07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYTAwID0gYVswXTsgYTAxID0gYVsxXTsgYTAyID0gYVsyXTsgYTAzID0gYVszXTtcbiAgICAgICAgYTEwID0gYVs0XTsgYTExID0gYVs1XTsgYTEyID0gYVs2XTsgYTEzID0gYVs3XTtcbiAgICAgICAgYTIwID0gYVs4XTsgYTIxID0gYVs5XTsgYTIyID0gYVsxMF07IGEyMyA9IGFbMTFdO1xuXG4gICAgICAgIG91dFswXSA9IGEwMDsgb3V0WzFdID0gYTAxOyBvdXRbMl0gPSBhMDI7IG91dFszXSA9IGEwMztcbiAgICAgICAgb3V0WzRdID0gYTEwOyBvdXRbNV0gPSBhMTE7IG91dFs2XSA9IGExMjsgb3V0WzddID0gYTEzO1xuICAgICAgICBvdXRbOF0gPSBhMjA7IG91dFs5XSA9IGEyMTsgb3V0WzEwXSA9IGEyMjsgb3V0WzExXSA9IGEyMztcblxuICAgICAgICBvdXRbMTJdID0gYTAwICogeCArIGExMCAqIHkgKyBhMjAgKiB6ICsgYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhMDEgKiB4ICsgYTExICogeSArIGEyMSAqIHogKyBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGEwMiAqIHggKyBhMTIgKiB5ICsgYTIyICogeiArIGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYTAzICogeCArIGExMyAqIHkgKyBhMjMgKiB6ICsgYVsxNV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB0cmFuc3Bvc2U7XG5cbi8qKlxuICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiB0cmFuc3Bvc2Uob3V0LCBhKSB7XG4gICAgLy8gSWYgd2UgYXJlIHRyYW5zcG9zaW5nIG91cnNlbHZlcyB3ZSBjYW4gc2tpcCBhIGZldyBzdGVwcyBidXQgaGF2ZSB0byBjYWNoZSBzb21lIHZhbHVlc1xuICAgIGlmIChvdXQgPT09IGEpIHtcbiAgICAgICAgdmFyIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgICAgICBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICAgICAgYTIzID0gYVsxMV07XG5cbiAgICAgICAgb3V0WzFdID0gYVs0XTtcbiAgICAgICAgb3V0WzJdID0gYVs4XTtcbiAgICAgICAgb3V0WzNdID0gYVsxMl07XG4gICAgICAgIG91dFs0XSA9IGEwMTtcbiAgICAgICAgb3V0WzZdID0gYVs5XTtcbiAgICAgICAgb3V0WzddID0gYVsxM107XG4gICAgICAgIG91dFs4XSA9IGEwMjtcbiAgICAgICAgb3V0WzldID0gYTEyO1xuICAgICAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgICAgIG91dFsxMl0gPSBhMDM7XG4gICAgICAgIG91dFsxM10gPSBhMTM7XG4gICAgICAgIG91dFsxNF0gPSBhMjM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3V0WzBdID0gYVswXTtcbiAgICAgICAgb3V0WzFdID0gYVs0XTtcbiAgICAgICAgb3V0WzJdID0gYVs4XTtcbiAgICAgICAgb3V0WzNdID0gYVsxMl07XG4gICAgICAgIG91dFs0XSA9IGFbMV07XG4gICAgICAgIG91dFs1XSA9IGFbNV07XG4gICAgICAgIG91dFs2XSA9IGFbOV07XG4gICAgICAgIG91dFs3XSA9IGFbMTNdO1xuICAgICAgICBvdXRbOF0gPSBhWzJdO1xuICAgICAgICBvdXRbOV0gPSBhWzZdO1xuICAgICAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgICAgIG91dFsxMV0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzEyXSA9IGFbM107XG4gICAgICAgIG91dFsxM10gPSBhWzddO1xuICAgICAgICBvdXRbMTRdID0gYVsxMV07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG91dDtcbn07Il19
