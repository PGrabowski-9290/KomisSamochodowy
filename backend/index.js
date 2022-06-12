require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 5050;


app.use(credentials);
app.use(cors(corsOptions));
//TODO filtracją ofert
//TODO Rezerwacja ofert

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cookieParser());

app.use('/register', require('./route/register'));
app.use('/auth', require('./route/auth'));
app.use('/dict', require('./route/api/dict'));
app.use('/offers', require('./route/api/offers'));

app.use('/reservation', verifyJWT, require('./route/api/reservation'));

app.all('*', (req,res) => { 
  res.status(404).json({message: "404 Not Found"});
})


app.listen(PORT, () => { console.log(`Server runing on port: ${PORT}`) })