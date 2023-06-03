const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoDB = require('./db/mongo.js');

require('./routes/index.js')(app);

app.use(cors());
app.use(bodyParser.json());
app.listen(3000, () => {
    console.log('Server running on port 3000');

    // Stating mongo  
    mongoDB();
});