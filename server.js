// setup
const express = require('express')
const app = express()


// routes
app.get('/', (req, res) => {
    res.send('entering express http server')
})








app.listen(5000)
