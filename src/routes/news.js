const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

newsRouter.get('',async(req, res) => {

    try {
        const newsAPI = await axios.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=e78cbedfa84e44aab48397ea59b24baf')
        res.render('news',{articles : newsAPI.data.articles})

    } catch (err) {
        if(err.response){
            res.render('news',{articles : null})
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.header)
        }
        else if(err.requiest){
            res.render('news',{articles : null})
            console.log(err.requiest)
        }
        else{
            res.render('news',{articles : null})
            console.log('Error',err.message)
        }
    }
})

newsRouter.get('/:id',async(req, res) => {
    let articleID = req.params.id
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=e78cbedfa84e44aab48397ea59b24baf/${articleID}`)
        res.render('newsSingle',{article : newsAPI.data.articles})

    } catch (err) {
        if(err.response){
            res.render('news',{article : null})
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.header)
        }
        else if(err.requiest){
            res.render('news',{article : null})
            console.log(err.requiest)
        }
        else{
            res.render('news',{article : null})
            console.log('Error',err.message)
        }
    }
})

newsRouter.post('', async(req, res) => {
    let search = req.body.search
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=e78cbedfa84e44aab48397ea59b24baf/${search}`)
        res.render('newsSearch', { articles : newsAPI.data.articles })
    } catch (err) {
        if(err.response) {
            res.render('newsSearch', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSearch', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles : null })
            console.error('Error', err.message)
        }
    } 
})

module.exports = newsRouter