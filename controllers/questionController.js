var QuestionModel = require('../models/questionModel.js');
var CommentModel = require('../models/commentModel.js');
var UserModel = require('../models/userModel.js');

/**
 * questionController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * questionController.list()
     */
    list: function (req, res) {
        QuestionModel.find()
            .populate('postedBy')
            .sort({date: -1})
            .exec(function (err, questions) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting question.',
                        error: err
                    });
                }
                var data = [];
                data.questions = questions;
                return res.render('question/list', data);
            });
    },

    myList: function (req, res) {
        var id = req.params.id;  // identifikator uporabnika

        QuestionModel.find({postedBy: id})
            .populate('postedBy')
            .sort({date: -1})
            .exec(function (err, questions) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting question.',
                        error: err
                    });
                }
                var data = [];
                data.questions = questions;
                return res.render('question/list', data);
            });
    },

    /**
     * questionController.show()
     */
    show: async function (req, res) {
        var id = req.params.id;

        try {
            const question = await QuestionModel.findOne({_id: id})
                .populate('postedBy', 'username');
            if (!question) {
                return res.status(404).json({
                    message: 'No such question'
                });
            }

            const comments = await CommentModel.find({parentPost: id}).populate('postedBy', 'username').sort({date: 1}).lean().exec();

            comments.reverse(); //da se najnovejsi komentarji prikazu na vrhu
            var commentsList = [];
            if (question.postedBy._id.equals(req.session.userId)) {
                for (var i = 0; i < comments.length; i++) {
                    if (comments[i].selected == true) {
                        commentsList.unshift(comments[i]);
                    } else {
                        commentsList.push(comments[i]);
                    }
                }
            } else {
                for (var i = 0; i < comments.length; i++) {
                    if (comments[i].postedBy._id.equals(req.session.userId)) {
                        if (comments[i].selected == true) {
                            commentsList.unshift(comments[i]);
                        } else {
                            commentsList.push(comments[i]);
                        }
                    }
                }
            }
            const username = req.session.userId ? (await UserModel.findById(req.session.userId)).username : null;

            const data = {
                post: question.toObject(),
                comment: commentsList,
                session: username || "prazno"
            };

            return res.render('question/comment', {data: data});

        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting question or comments.',
                error: err
            });
        }
    },

    /**
     * questionController.create()
     */
    create: function (req, res) {
        if (!req.body.title) {
            return res.status(400).json({
                message: 'Title is required'
            });
        }
        var question = new QuestionModel({
            title: req.body.title,
            description: req.body.description,
            postedBy: req.session.userId,
            tags: req.body.tags,
            date: new Date()
        });

        question.save(function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating question',
                    error: err
                });
            }

            //return res.status(201).json(photo);
            return res.redirect('/questions');
        });
    },

    /**
     * questionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        QuestionModel.findOne({_id: id}, function (err, question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting question',
                    error: err
                });
            }

            if (!question) {
                return res.status(404).json({
                    message: 'No such question'
                });
            }

            question.title = req.body.title ? req.body.title : question.title;
            question.description = req.body.description ? req.body.description : question.description;
            question.postedBy = req.body.postedBy ? req.body.postedBy : question.postedBy;
            question.tags = req.body.tags ? req.body.tags : question.tags;
            question.date = req.body.date ? req.body.date : question.date;

            question.save(function (err, question) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating question.',
                        error: err
                    });
                }

                return res.json(question);
            });
        });
    },

    /**
     * questionController.remove()
     */

    remove: function (req, res) {
        var id = req.params.id;
        QuestionModel.findByIdAndRemove(id, function (err, question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the question.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },



    publish: function (req, res) {
        return res.render('question/publish');
    }
};
