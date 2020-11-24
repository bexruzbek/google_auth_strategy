const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const colors = require('colors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');

//Load variables
dotenv.config();

//Passport config
require('./config/passport')(passport);

//Connecting to database
connectDB();

//App initialization
const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
};

// Handlebars
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');

// Sessions
app.use(
  session({
    secret: 'some secret code',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
  console.log(`Server running on port: ${PORT}`.green.inverse);
});