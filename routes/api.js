const express = require('express');
const router = express.Router();
const axios = require('axios');

// const admin = require('firebase-admin');
// const serviceAccount = require('path/to/serviceAccountKey.json'); // Download this from Firebase Console
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://your-project-id.firebaseio.com'
// });

// const db = admin.database();

// Define your API routes
router.post('/search-recipe', (req, res) => {
    const requestData = req.body;
    // Process the data
    const checkField = "ingredient"
    if (checkField in requestData){
        const kitchenItems = requestData[checkField].join(',')
        const queryParams = {
        needsimage: 1,
        app: 1,
        kitchen: kitchenItems,
        focus: '',
        exclude: '',
        kw: '',
        catname: '',
        start: 0,
        fave: false,
        lang: 'en',
        cv: 2
      };
    axios.post('https://d1.supercook.com/dyn/results', "", {
        params: queryParams
      })
    .then(response => {
        // console.log('Response:', response.data);
        res.json(response.data)
    })
    .catch(error => {
        console.error('Error:', error);
        res.json(error)
    });
    }else{
        res.status(404).send('Resource not found');
    }
    // console.log('Received data:', requestData);
});


router.post('/get-recipe', (req, res) => {
    const requestData = req.body;
    const checkField = "rid"
    if (checkField in requestData){
        console.log(requestData[checkField])
        let queryParams = {
            'rid': requestData[checkField],
            'lang': 'en',
            // 'ingredients': 'egg%2Csugar%2Cbutter'
        };
        axios.post('https://d1.supercook.com/dyn/details', "", {
            params: queryParams
          })
        .then(response => {
            console.log('Response:', response.data);
            res.json(response.data)
        })
        .catch(error => {
            console.error('Error:', error);
            res.json(error)
        });
    }else{
        res.status(404).send('Resource not found');
    }
});


router.get('/get-listing', (req, res) => {
    const foodListings = [
        {
            id: 1,
            cardImage: 'https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg',
            cardTitle: 'Potato Chip',
            cardSubTitle: 'John Doe',
            details: 'Expiring in 2 days, collect asap. Message me for more details!',
            pickUpTime: '18:00',
            distance: '3km',
        },
        {
            id: 2,
            cardImage: 'https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg',
            cardTitle: 'Canned Food',
            cardSubTitle: 'Peter Doe',
            details: 'Expiring in 14 days, collect asap. Message me for more details!',
            pickUpTime: '20:00',
            distance: '1km',
        },
        {
            id: 3,
            cardImage: 'https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg',
            cardTitle: 'Sourdough',
            cardSubTitle: 'David Doebrea',
            details: 'Expiring in 1 day, collect asap. Message me for more details!',
            pickUpTime: '21:00',
            distance: '2km',
        },
    ];
    res.json(foodListings)
});

module.exports = router;