const express = require('express');
const  cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser=require("body-parser");
const fileUpload = require('express-fileupload');
const route = require('./routes/routes.js')

const app = express();

mongoose.set("strictQuery", true);
app.use(bodyParser.json());
app.use(express.json());
app.use(fileUpload()); 
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
dotenv.config();
// Connect to MongoDB database
mongoose.connect(process.env.MONGO,
 { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error(err));

app.use(cors());
// Define routes

app.use('/v1/api/', route);




app.listen(process.env.PORT, () => {
    console.log(`Connect to Backend`);
  });

