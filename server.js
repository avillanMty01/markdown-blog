if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path:'.env'});
}

// setup
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect(process.env.DATABASE_URL,
    { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('alf: Mongoose conn 2 blog: ok'))


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))  // we tell our app to get body for post requests
app.use(methodOverride('_method'))

// routes

// the json articles object will be available for the index.js
// page, we send data this way
app.get('/', async (req, res) => {
    
    const articles = await Article.find().sort({
        createdAt: 'desc' })

    res.render('articles/index', { articles: articles })
})





app.use('/articles', articleRouter)  // in our articles routes prepends the ./articles to the url


app.listen(process.env.PORT || 3000)
