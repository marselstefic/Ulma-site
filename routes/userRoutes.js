var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');
var multer = require('multer');

var upload = multer({dest: 'public/uploads/'}); // this folder will store the images

router.get('/', userController.list);
router.get('/register', userController.showRegister);
router.get('/login', userController.showLogin);
router.get('/profile', userController.profile);
router.get('/logout', userController.logout);
// v userRoutes.js ali kjer koli obravnavate poti uporabnika
router.get('/:id', userController.showProfile);
router.post('/:id/rate', userController.rateUser);



router.post('/', upload.single('profileImage'), userController.create); // add the multer middleware
router.post('/login', userController.login);
router.post('/profile', upload.single('profileImage'), userController.uploadImage);


router.put('/:id', upload.single('profileImage'), userController.update); // add the multer middleware

router.delete('/:id', userController.remove);

module.exports = router;
