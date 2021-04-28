const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Article'
    }
})


module.exports = mongoose.model('Comment', commentSchema)