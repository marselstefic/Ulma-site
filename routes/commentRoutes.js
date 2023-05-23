var express = require('express');
// Vključimo multer za file upload
var multer = require('multer');
var upload = multer({dest: 'public/images/'});

var router = express.Router();
var commentController = require('../controllers/commentController.js');

function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        return next();
    } else{
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

router.get('/', commentController.list);
router.get('/publish', requiresLogin, commentController.publish);
router.get('/:id', commentController.show);

router.post('/', requiresLogin, upload.single('image'), commentController.create);

router.put('/select', commentController.update);

router.delete('/delete/:id', requiresLogin, commentController.remove);

module.exports = router;
