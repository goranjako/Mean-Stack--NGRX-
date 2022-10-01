"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setRoutes;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("./controllers/auth.controller"));

var _contact = _interopRequireDefault(require("./controllers/contact.controller"));

var _auth2 = _interopRequireDefault(require("./util/auth"));

const {
  validateRegistrationBody,
  validateLoginBody,
  validateContactBody,
  validate
} = require('./util/validation');

function setRoutes(app) {
  const router = _express.default.Router(); //authRoute


  router.post("/register", validateRegistrationBody(), validate, _auth.default.register);
  router.post("/login", validateLoginBody(), validate, _auth.default.login); //contactRoute

  router.route('/contact').post(_auth2.default.verifyToken, validateContactBody(), validate, _contact.default.create);
  router.route('/contact').get(_auth2.default.verifyToken, _contact.default.getAll);
  router.route('/contact/:id').get(_auth2.default.verifyToken, _contact.default.get);
  router.route('/contact/:id').put(_auth2.default.verifyToken, validateContactBody(), validate, _contact.default.put);
  router.route('/contact/:id').delete(_auth2.default.verifyToken, _contact.default.delete);
  app.use('/', router);
}