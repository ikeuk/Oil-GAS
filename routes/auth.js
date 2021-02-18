const express = require('express')

const router = express.Router()

// @route GET/LOGOUT
router.get('/logout', (req, res) => { 
    req.logout()
    res.redirect('/')
})


module.exports = router