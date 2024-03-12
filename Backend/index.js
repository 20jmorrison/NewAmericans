const express = require('express');
const cors = require('cors')
const mysql = require('mysql');

const app = express()

app.use(cors())
const connection = mysql.createConnection({
  user: 'datauser1',
  host: '50.187.63.220',
  database: 'datarepo',
  password: '6038809999',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database', err);
    return;
  }
  console.log('Connected to the database!');
  
});


//Function For Fetching Student Names to Be used throughout the application
app.get( 'http://50.187.63.220:3000/StudentData',(req, res) => {
    const query = 'SELECT * FROM Students';
    connection.query(query, (error, studentData, fields) =>{
      if(error){
        console.error('Error Fetching Student Data: ', error)
        res.status(500).json({error:'Internal Server Error'})
      }
      console.log('Fetched student data:', studentData);
      res.json(studentData);
    });
})



//Function for Fetching Category Data to be used throughout the application
app.get('/CategoryData', (req,res)=>{
  const query = 'SELECT * FROM Categories';
  connection.query(query, (error, categoryData, fields) =>{
    if(error){
      console.error('Error Fetching Category Data: ', error)
      res.status(500).json({error: 'Interal Server Error'})
    }
    console.log('Fetched Category Data: ', categoryData);
    res.json(categoryData);
  });
});


//Fetching Admin Data 
app.get('/AdminData', (req,res)=>{
  const query = 'SELECT * FROM Admin';
  connection.query(query,(error, adminData, fields)=>{
    if(error){
      console.error('Error Fetching Admin Data: ', error)
      res.status(500).json({error: 'Interal Server Error'})
    }
    console.log('Fetched Category Data: ', adminData);
    res.json(adminData);
  });
});



process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection', err);
      return;
    }
    console.log('Database connection closed');
    process.exit(0);
  });
});
