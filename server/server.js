const express = require('express');
const path = require('path');
const db = require('mongoose');
const fs = require('fs');


//express route handler name
const app = express();

const PORT = 3000;



db.connect('mongodb+srv://peter:crudapp@cluster0.uedjbsz.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'test',
})
  .then(() => {
    console.log('connected to database')
  })
  .catch((err) => {
    console.log('error connecting to database: ',err)
  })

//express content type handler
const controller = require('./controller');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
  return res.status(200).sendFile(path.join(__dirname,'../client/index.html'));
})

app.get('/login', (req,res) => {
  return res.status(200).sendFile(path.join(__dirname,'../client/login.html'));
})

app.get('/signup', (req,res) => {
  return res.status(200).sendFile(path.join(__dirname,'../client/signup.html'));
})

app.post('/login', controller.signIn, (req, res) => {
  return res.status(200).json(res.locals.user);
})

app.post('/signup', controller.register, (req, res) => {
  return res.status(200).json(res.locals.userInfo);
})

app.use('/',express.static(path.join(__dirname, '../client')));

//GLOBAL ERROR HANDLER
app.use('*', (req, res) => {
  return res.sendStatus(404);
});

//SERVER SIDE ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'express error handler caught unknown error',
    status: 400,
    message: { error:'error occurred' }
  }
  const errorObj = Object.assign(defaultErr, err)
  return res.status(errorObj.status).json(errorObj.message)
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})