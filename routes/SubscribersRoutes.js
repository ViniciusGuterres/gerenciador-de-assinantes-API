const bodyParser = require('body-parser');

// Controllers
const saveSubscriberController = require('../controllers/saveSubscriber.js').saveSubscriber;
const deleteSubscriberController = require('../controllers/deleteSubscriber.js').deleteSubscriber;
const getUsersController = require('../controllers/getSubscribers.js').getSubscribers;
const updateSubscriberController = require('../controllers/updateSubscriber.js').updateSubscriber;

module.exports = (app) => {
    app.post('/postSubscriber', bodyParser.json(), saveSubscriberController);
    app.delete('/deleteSubscriber/:id', deleteSubscriberController);
    app.get('/getSubscribers/:id?', bodyParser.json(),getUsersController);
    app.put('/putSubscriber/:id', bodyParser.json(), updateSubscriberController);
}