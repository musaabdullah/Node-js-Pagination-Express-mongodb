const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs');
const postRouter = require('./routers/posts');
const port = process.env.PORT | 3000;
app.use(cors('dev'));
app.use('/public',express.static(path.join(__dirname,'public'))); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/hell", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((res) => { console.log('connected successfuly'); })
    .catch((err) => { console.log('an error has occard'); });
app.use(postRouter);

app.listen(port, () => {
    console.log(port);
})