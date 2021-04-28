// all routes for articles go here
const express = require('express')
const Comment = require('./../models/comment')
const router = express.Router()


router.post('/', async (req, res, next) => {
    req.comment = new Comment()
    next()
}, saveCommentAndRedirect('new'))


function saveCommentAndRedirect(path) {
    return async (req, res) => {
        let comment = req.comment
        comment.comment = req.body.comment
        comment.parentId = req.body.parentId
        try {
            comment = await comment.save()    // returns our ID for our comment
            console.log('saving')
            res.redirect(`/articles/${comment.parentId}`)
        } catch (err) {
            console.log(err)
            res.redirect('/')
        }
    }
}



module.exports = router