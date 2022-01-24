require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const router = require('./api/routes/student-route');

require('./api/data/dbcon');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
    origin:'*',
    credentials: false
}));

//log requests
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use('/api', router);

const server = app.listen(process.env.PORT, () => {
    console.log(process.env.MSG_SERVER_START, server.address().port);    
});