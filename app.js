require('./config/db');
const path = require('path')
var flash = require('connect-flash');
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const exphbs = require('express-handlebars')
const session = require('express-session')
dotenv.config({ path: './config/config.env' })
const MongoStore = require('connect-mongo')(session) 


const app = express()
//Body Parsar
app.use(express.urlencoded( { extended: false} ))
app.use(express.json())


require('./config/passport')(passport)
//logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//Handlebars
app.engine('.hbs', exphbs({ 
  defaultLayout: 'main', 
  extname: '.hbs'}));
app.set('view engine', '.hbs');


//Express session middle ware
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
	 store: new MongoStore({mongooseConnection: mongoose.connection})
}))
app.use(flash());
//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Static folder
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
const PORT = process.env.PORT || 5000

app.listen(
    PORT,  
    console.log(`Server ruunning in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)