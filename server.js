// setup
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost:27017/blog',
    { useNewUrlParser: true,
    useUnifiedTopology: true })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))  // we tell our app to get body for post requests

// routes

// the json articles object will be available for the index.js
// page, we send data this way
app.get('/', async (req, res) => {
    
    const articles = await Article.find().sort({
        createdAt: 'desc' })

    res.render('articles/index', { articles: articles })
})





app.use('/articles', articleRouter)  // in our articles routes prepends the ./articles to the url


app.listen(5000)
