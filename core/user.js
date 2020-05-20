const pool = require("./pool");
const bcrypt = require("bcrypt");

function User(){};

User.prototype = {
    // find use data by id or user name
    find: function(user = null, callback)
    {
        if(user){
            var field = Number.isInteger(user) ? 'id' : 'username';
        }
        let sql = `SELECT * FROM users WHERE ${field}=?`;

        pool.query(sql, user, function(err, result){
            if(err) throw err;
            callback(result);
        });
    },
    create : function(body, callback)
    {
        let pwd = body.password;
        body.password = bcrypt.hashSync(pwd,10);
        var bind = [];
        for(prop in body){
            bind.push(prop);
        }
        let sql = `INSERT INTO users(username, email, password) VALUES (?, ?, ?)`;
        pool.query(sql, bind, function(err, lastID){
            if(err) throw err;
            callback(lastId);
        });
    },
    login: function(username, password, callback)
    {
        this.find(username, function(user){
            if(user){
                if(bcrypt.compareSync(password, user.password)){
                    callback(user);
                    return;
                }
            }
            callback(null);
        });
    }
}

module.exports = User;