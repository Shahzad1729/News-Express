require('dotenv').config();
const express = require('express');
const https = require('https');
const newsRouter = express.Router();

newsRouter.get('', async (req, res) => {
    try {
        const userAgent = req.get('user-agent');
        const options = {
            host: 'newsapi.org',
            path: '/v2/top-headlines?category=technology&category=technology&language=en&apiKey='+process.env.API_KEY,
            headers: {
                'User-Agent': userAgent
            }
        };

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const newsAPI = https.get(options, (response) => {
            console.log(response.statusCode);
            let data='';
            //Ensures that you wait for the complete JSON response before attempting to parse it
            // Getting response
            response.on('data', (chunk) => {
                data += chunk;
            });
            // When response is ended
            response.on('end', () => {
                try {
                    const newsData = JSON.parse(data);
                    res.render('news',{articles:newsData.articles});
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    res.status(500).send('Error fetching news data');
                }
            });
        });
    } catch (error) {
        if(error.response)
        {
            console.log(error.response.data);
            console.log(error.response.status);
            res.render('news',{articles:null});
        }
        else if(error.request)
        {
            console.log(error.request);
            res.render('news',{articles:null});
        }
        else{
            console.log('Error',error.message);
            res.render('news',{articles:null});
        }
    }
});


newsRouter.post('', async (req, res) => {
    const search=req.body.search;
    try {
        const userAgent = req.get('user-agent');
        const options = {
            host: 'newsapi.org',
            path: "/v2/everything?q="+search+"&apiKey="+process.env.API_KEY,
            headers: {
                'User-Agent': userAgent
            }
        };

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const newsAPI = https.get(options, (response) => {
            console.log(response.statusCode);
            let data='';
            //Ensures that you wait for the complete JSON response before attempting to parse it
            // Getting response
            response.on('data', (chunk) => {
                data += chunk;
            });
            // When response is ended
            response.on('end', () => {
                try {
                    const newsData = JSON.parse(data);
                    res.render('newsSearch',{articles:newsData.articles});
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    res.status(500).send('Error fetching news data');
                }
            });
        });
    } catch (error) {
        if(error.response)
        {
            console.log(error.response.data);
            console.log(error.response.status);
            res.render('newsSearch',{articles:null});
        }
        else if(error.request)
        {
            console.log(error.request);
            res.render('newsSearch',{articles:null});
        }
        else{
            console.log('Error',error.message);
            res.render('newsSearch',{articles:null});
        }
    }
});

module.exports = newsRouter;