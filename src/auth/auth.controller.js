const { signUp } = require('./user.repository')

const router = require('express').Router()

router.get('/signup', async (req, res) => {
    const response = await signUp(req.body)
    res.send(JSON.stringify(response, 4))
})

module.exports = router
