const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express()
const connectDB = require('./config/database.config');

dotenv.config();
app.use(cors());

app.use(express.json());

connectDB();

app.use('/api', require('./routes'))

const PORT = process.env.PORT || 5000



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})