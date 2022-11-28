const mysql = require('mysql');

const connector = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'libraryjtech',
    port: '3306'
});

connector.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  

exports.connector = connector;