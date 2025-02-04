require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = require('./server/routes/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB_URI
    }),
    cookie:{maxAge:new Date(Date.now()+(3600000))}
}))
app.use(express.static('public'));
app.use(expressLayout);

app.set('layout', './layout/main');
app.set('view engine', 'ejs');

app.use('/',require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));


app.listen(PORT,()=>{
    console.log(`Baba hallgatózik a ${PORT}-on`);
});