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

app.get( '/StudentData',(req, res) => {
    const query = 'SELECT * FROM Students';
    connection.query(query, (error, studentData, fields) =>{
      if(error){
        console.error('Error Fetching Student Data', error)
        res.status(500).json({error:'Internal Server Error'})
      }
      console.log('Fetched student data:', studentData);
      res.json(studentData)
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
