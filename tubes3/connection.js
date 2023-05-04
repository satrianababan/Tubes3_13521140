const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ZyuohEagle02',
    database: 'cobastima'
}).promise();

module.exports = db