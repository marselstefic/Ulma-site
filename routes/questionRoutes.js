var express = require('express');
// Vključimo multer za file upload
var multer = require('multer');
var upload = multer({dest: 'public/images/'});

var router = express.Router();
var questionController = require('../controllers/questionController.js');
const QuestionModel = require("../models/questionModel");

function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        return next();
    } else{
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}



router.get('/', questionController.list);
router.get('/', questionController.myList);
router.get('/publish', requiresLogin, questionController.publish);
router.get('/:id', questionController.show);
router.get('/myq/:id', requiresLogin, questionController.myList);

router.post('/', requiresLogin, upload.single('image'), questionController.create);

router.put('/:id', questionController.update);

router.delete('/delete/:id', requiresLogin, questionController.remove);

module.exports = router;
