const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnection');
const port = process.env.PORT || 5000;
require('dotenv').config()

// Connecting to DB
dbConnect();

// Middleware
app.use(cors());
app.use(express.json())

// Routes
app.use('/products', require('./routes/api/products'));
app.use('/users', require('./routes/api/users'))



app.get('/', (req, res) => {
    res.send('Hello World, Server Running')
})


// Mongoose Connection and listening to the Port
mongoose.connection.once('open', () => {
    console.log('Connected to Mongodb');
    app.listen(port, () => console.log(`Server running on Port ${port}`))

})

