const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error');

const colors = require('colors')
//load env 
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();
//route files
const bootcamps = require('./routes/bootcamps')



const app = express();

//Body parser
app.use(express.json());

//dev logging middleware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}
//MOunt routers
app.use('/api/v1/bootcamps',bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT, console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline));

  //handle unhandled promise rejections
  process.on('unhandledRejection',(err,promise) =>{
    console.log(`Error; ${err.message}`);
    //close server & exit process
    server.close(() => process.exit(1));
  })