// all routes for articles go here
const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

// watch it: the '/' corresponds to root of /articles un url
// this was set in server.js
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/:id', async (req, res) => {
    // tell mongoose to find article
    const article = await Article.findById(req.params.id)
    // if error fetching doc, redirect to homepage
    if (article == null ) res.redirect('/')
    res.render('articles/show', { article: article } )

})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        article = await article.save()    // returns our ID for our article
        res.redirect(`/articles/${article.id}`)
    } catch (err) {
        console.log(err)
        res.render('articles/new', { article })
    }
})

module.exports = router