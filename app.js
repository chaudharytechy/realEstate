
const express = require('express')
const app = express()
const port = 3000
const connectDB = require('./db/connect_db')
const router=require('./routes/web')
const fileUpload=require('express-fileupload')

var session = require('express-session')
var flash = require('connect-flash');
// import { Country, State, City }  from 'country-state-city';



// steup ejs
app.set('view engine','ejs')
// public file use
app.use(express.static('public'))

const cookieParser=require('cookie-parser')
app.use(cookieParser())

// mongodb
connectDB()
// body parser
app.use(express.urlencoded({ extended: false }))
//  file uploader
app.use(fileUpload({useTempFiles: true}));

// message display
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
  
}));

app.use(flash());

//   router link 
app.use('/',router)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})