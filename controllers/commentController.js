var CommentModel = require('../models/commentModel.js');

module.exports = {

    /**
     * commentController.list()
     */
    //metoda list za prikaz seznama vseh komentarjev
    list: function (req, res) {
        CommentModel.find()
            .populate('postedBy')
            .exec(function (err, comments) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting comment.',
                        error: err
                    });
                }
                var data = [];
                data.comments = comments;
                return res.render('comment/list', data);
            });
    },

    /**
     * commentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        var date = req.params.date;

        CommentModel.findOne({_id: id}, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment.',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            return res.json(comment);
        });
    },

    /**
     * commentController.create()
     */
    create: function (req, res) {
        var comment = new CommentModel({
            content : req.body.content,
            postedBy : req.session.userId,
            parentPost : req.body.id,
            selected : false,
            ocena: req.body.ocena,
            date : new Date()
        });

        comment.save(function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating comment',
                    error: err
                });
            }

            //return res.status(201).json(photo);
            return res.redirect('/comments');
        });
    },

    /**
     * commentController.update()
     */

    update: function (req, res) {
        var id = req.body.id;

        CommentModel.findOneAndUpdate(
            {_id: id},
            { $set: { selected: true } },
            { new: true, upsert: false },
            function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }
            return res.json(comment);
        });
    },

    /**
     * commentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        CommentModel.findByIdAndRemove(id, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the comment.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    publish: function(req, res){
        return res.render('comment/publish');
    }
};
