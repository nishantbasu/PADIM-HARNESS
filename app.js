require('express-async-errors');

const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();

const padimRoute = require('./routes/padim');


const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use( helmet({ contentSecurityPolicy: false }) );
app.use(cors());


app.use(express.static('./public'));

//routes

app.use('/api/v1/padim', padimRoute);

//error handling
app.use(notFound);
app.use(errorHandlerMiddleware);

//app start
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        });
    } catch (error) {
        console.log(error);
    }
}

start();