const mysql = require('mysql');

connection = mysql.createConnection({
  host: '192.168.1.142',
  user: 'Patricia',
  password: 'Indira_83',
  database: 'testapimysql'
});

let userModel = {};

userModel.getUsers = (callback) => {
  if (connection) {
    connection.query(
      'SELECT * FROM users ORDER BY id',
      (err, rows) => {
        if (err) {
          throw err;
        } else {
          callback(null, rows);
        }
      }
    )
  }
};

userModel.insertUser = ( userData, callback) => {
  if (connection) {
    connection.query(
      'INSERT INTO users SET ?', userData,
      (err, result) => {
        if (err) {
          throw err;
        } else {
          callback(null, {'insertId': result.insertId});
        }
      }
    )
  }
};

module.exports = userModel;

userModel.updateUser = (userData, callback) => {
  if (connection) {
    console.log(userData);
    const sql = `
      UPDATE users SET
      username = ${connection.escape(userData.username)},
      password = ${connection.escape(userData.password)},
      email = ${connection.escape(userData.email)}
      WHERE id = ${connection.escape(userData.id)}
      `
  connection.query(sql,(err, result) => {
    if (err) {
      throw err;
    } else {
      callback(null, {
        "msg": "success"
      });
    }
  })
  }
};

userModel.deleteUser = (id, callback) => {
  if (connection) {
    console.log(id);
    const sql = `
      SELECT * FROM users WHERE id = ${connection.escape(id)}
      `
  connection.query(sql, (err, row) => {
    console.log(row.length);
    if (row.length !== 0) {
      let sql = `
        DELETE FROM users WHERE id = ${connection.escape(id)}
        `;
        connection.query(sql, (err, result) => {
          if (err) {
            throw err;
          } else {
            callback(null, {
              "msg": "User Deleted"
            })
          }
        })
    } else {
      callback(null, {
        "msg": "User do not exists"
      })
    }
  });
  }
};
