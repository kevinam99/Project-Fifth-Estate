const router = require('express').Router()

const { extractPosts, getDbPosts } = require('./posts.services')

router.get('/group', async(req,res)=>{
    const response = await extractPosts(req.body.groupId)
    res.send(JSON.stringify(response,4,null))
})

router.get('/db', async(req,res)=>{
    const response = await getDbPosts()
    res.send(JSON.stringify(response,4,null))
})

module.exports = router