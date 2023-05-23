var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var questionSchema = new Schema({
    'title' : String,
    'description' : String,
    'postedBy' : {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    'tags' : String,
    'date' : Date
});

module.exports = mongoose.model('question', questionSchema);
