const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth',userRoutes)

mongoose.connect('mongodb://localhost/notes-db-app',{
    family: 4,
}).then(() => {
        console.log("DB Connection Successful");
    }).catch((err) => {
        console.log("ERROR while connecting====================== ", err);
    });
    

const server = app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT);
});