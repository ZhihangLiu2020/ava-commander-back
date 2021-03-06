// db.js 
var mysql = require('mysql');
 
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ava_commander'
});
 
function query(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            connection.query(sql, function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
                connection.release();
            });
        });
    })
 
}
 
exports.query = query;