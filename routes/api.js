const express = require('express');
const router = express.Router();
const axios = require('axios');
var http = require('http')

var admin = require("firebase-admin");
var serviceAccount = require("../KEY.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-is216-9e085-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const db = admin.firestore();


router.get('/get-listing', (req, res) => {
    const addFoodRef = db.collection('Food');
    addFoodRef.get()
      .then((snapshot) => {
        const formattedListings = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              cardImage: data.cardImage,
              cardTitle: data.cardTitle,
              cardSubTitle: data.cardSubTitle,
              details: data.details,
              pickUpTime: data.pickUpTime,
              distance: data.distance
            };
          });
        
          res.json(formattedListings);
      })
      .catch((error) => {
        res.status(404).send('Resource not found');
      });
});


router.post('/add-food-listings', (req, res) => {
    const PostData = req.body;
    // {
    //     cardImage: 'https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg',
    //     cardTitle: 'Potato Chip',
    //     cardSubTitle: 'John Doe',
    //     details: 'Expiring in 2 days, collect asap. Message me for more details!',
    //     pickUpTime: '18:00',
    //     distance: '3km',
    // }
    const addFoodRef = db.collection('Food');
    addFoodRef.add(PostData)
      .then((snapshot) => {        
          res.json("Success");
      })
      .catch((error) => {
        res.status(404).send('Resource not found');
      });
});

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


// router.get('/get-listing', (req, res) => {
//     const foodListings = [
//         {
//             id: 1,
//             cardImage: 'https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg',
//             cardTitle: 'Potato Chip',
//             cardSubTitle: 'John Doe',
//             details: 'Expiring in 2 days, collect asap. Message me for more details!',
//             pickUpTime: '18:00',
//             distance: '3km',
//         },
//         {
//             id: 2,
//             cardImage: 'https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg',
//             cardTitle: 'Canned Food',
//             cardSubTitle: 'Peter Doe',
//             details: 'Expiring in 14 days, collect asap. Message me for more details!',
//             pickUpTime: '20:00',
//             distance: '1km',
//         },
//         {
//             id: 3,
//             cardImage: 'https://i.kym-cdn.com/entries/icons/original/000/036/007/underthewatercover.jpg',
//             cardTitle: 'Sourdough',
//             cardSubTitle: 'David Doebrea',
//             details: 'Expiring in 1 day, collect asap. Message me for more details!',
//             pickUpTime: '21:00',
//             distance: '2km',
//         },
//     ];
//     res.json(foodListings)
// });

// const users = require('../src/routes');

// module.exports = (app) => {
//   app.use('/users', users);
//   app.use('*', (req, res) => {
//     res.send('Not found!!!');
//   });
// };

module.exports = router;