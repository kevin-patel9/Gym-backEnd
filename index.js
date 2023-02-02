const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/user');
const auth = require('./routes/auth');
const scan = require('./routes/scan');
const cors = require('cors');

app.use(cors());

mongoose.set("strictQuery", false);

mongoose.connect('mongodb://0.0.0.0:27017/project')
        .then(() => console.log("connect to database"))
        .catch(() => console.log("cannot connect"));

app.use(express.json());


app.use('/user', user);
app.use('/auth', auth);
app.use('/scan', scan);
app.use(function(err, req, res, next){

    res.status(500).send("Something Failed");
});

const port = process.env.PORT || 9000        

app.listen(port, console.log(`Listen on ${port}`));
