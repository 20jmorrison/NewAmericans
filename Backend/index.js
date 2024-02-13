const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'datauser1',
  host: '50.187.63.219',
  database: 'datarepo',
  password: '6038809999',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database', err);
    return;
  }
  console.log('Connected to the database!');
  
  // You can perform database queries here
});

// Close the database connection when the application exits
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
