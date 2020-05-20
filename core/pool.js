const util = require("util");
const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'sake',
    database: 'test_sql'
});
pool.getConnection((err, connection)=>{
    if(err)
        console.error(" somting wrong");
    if(connection)
        connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;