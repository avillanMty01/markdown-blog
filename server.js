// setup
const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()

app.set('view engine', 'ejs')
app.use('/articles', articleRouter)  // in our articles routes prepends the ./articles to the url

// routes

// the json articles object will be available for the index.js
// page, we send data this way
app.get('/', (req, res) => {
    const articles = [{
        title: 'My first entry',
        createdAt: new Date(),
        description: 'Lorem ipsum sdfasdfsaf df d'},
        {   title: 'My second entry',
            createdAt: new Date(),
            description: 'Lorem ipsum ipsum loren ... sdfasdfsaf!!! df d.'}]
    res.render('articles/index', { articles: articles })
})








app.listen(5000)
