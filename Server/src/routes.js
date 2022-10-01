import express from 'express';
const {validateRegistrationBody,validateLoginBody,validateContactBody, validate} = require('./util/validation');
import authController from './controllers/auth.controller';
import ContactController from './controllers/contact.controller';
import authManager from './util/auth';
export default function setRoutes(app) {

const router = express.Router();


 //authRoute
 router.post("/register",validateRegistrationBody(), validate,authController.register);
 router.post("/login", validateLoginBody(), validate, authController.login);
//contactRoute
router.route('/contact').post(authManager.verifyToken,validateContactBody(),validate,ContactController.create);
router.route('/contact').get(authManager.verifyToken,ContactController.getAll);
router.route('/contact/:id').get(authManager.verifyToken,ContactController.get);
router.route('/contact/:id').put(authManager.verifyToken,validateContactBody(),validate,ContactController.put);
router.route('/contact/:id').delete(authManager.verifyToken,ContactController.delete);
app.use('/', router);
}