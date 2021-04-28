// all routes for articles go here
const express = require('express')
const Article = require('./../models/article')
const Comment = require('./../models/comment')
const router = express.Router()

// watch it: the '/' corresponds to root of /articles un url
// this was set in server.js
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
})

router.get('/:slug', async (req, res) => {
    // tell mongoose to find article by slug (modification 45:35 in video)
    const article = await Article.findOne( { slug: req.params.slug })
        
    // if error fetching doc, redirect to homepage
    if (article == null ) { 
        console.log('error en find article when saving')
        res.redirect('/')
    } else { 
        const comments = await Comment.find({ parentId: article.id }).sort({
            createdAt: 'desc' })
        res.render('articles/show', { article: article,
        comments: comments } )
    }
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            article = await article.save()    // returns our ID for our article
            res.redirect(`/articles/${article.slug}`)
        } catch (err) {
            //console.log(err)
            res.render(`articles/${path}`, { article })
        }
    }
}

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


module.exports = router