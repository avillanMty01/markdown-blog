// all routes for articles go here
const express = require('express')
const router = express.Router()

// watch it: the '/' corresponds to root of /articles un url
// this was set in server.js
router.get('/', (req, res) => {
    res.send('in articles')
})
 
module.exports = router