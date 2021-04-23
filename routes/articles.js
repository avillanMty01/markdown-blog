// all routes for articles go here
const express = require('express')
const router = express.Router()

// watch it: the '/' corresponds to root of /articles un url
// this was set in server.js
router.get('/new', (req, res) => {
    res.render('articles/new')
})

router.post('/', (req, res) => {
    
})

module.exports = router