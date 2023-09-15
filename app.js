import createError from 'http-errors';
import express from 'express';
import session from 'express-session';
import fetch from "node-fetch";
import path from 'path';
import {fileURLToPath} from 'url'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {ErrorClass, ErrorInterceptor} from './core/index.js';
import indexRouter from './routes/index.js';
import v1Routes from './routes/route.v1.js';
import 'dotenv/config';

let app = express();

//******* logger *********//
const originalConsoleLog = console.log; // Store the original console.log function
global.console.log = function (...args) {
    if (process.env.CONSOLE_LOG === 'true') {
        originalConsoleLog(...args); // Use the original console.log function
    }
};
//******* logger *********//

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

//Fetch
global.fetch =  fetch

//filepath
const __filepath = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filepath)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//api prefix
const API_PREFIX = "/api";
//start routing
app.use('/', indexRouter);
app.use(API_PREFIX + '/v1', v1Routes)
//after all route, show 404
app.use('*', (req, res) => {
    throw new ErrorClass("Resource not found", 404);
})
//console.log(process.env.FD);
//error handler and interceptor
app.use(ErrorInterceptor);

//make application restart it engine after crashes
process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    //res.status(err.status || 500);
    //res.render('error');
    throw new ErrorClass("Route not found at system level", 404)
});
export default app;
