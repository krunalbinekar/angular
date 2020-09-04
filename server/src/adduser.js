const Promise = require("bluebird");
const mysql = require("mysql");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const database = require("./config_db");

//register process
const insertData = async (input) => {
    const Connection = mysql.createConnection(database);

    await Connection.connectAsync();
    const query = "INSERT INTO user(username, email, password,  mobile ) VALUES(?,?,?,?)";

    await Connection.queryAsync(query, [
        input.username,
        input.email,
        input.password,
        input.mobile
    ]);

    await Connection.endAsync();

};



//login process
let loginUser = async (input) => {
    const connection = mysql.createConnection(database);
    await connection.connectAsync();
  
    let sql = "SELECT * FROM USER WHERE EMAIL=? AND PASSWORD=?";
    const results = await connection.queryAsync(sql, [
      input.email,
      input.password,
    ]);
  
    await connection.endAsync();
  
    if (results.length === 0) {
      throw new Error("Invalid Credentials");
    }
  };

module.exports = { insertData,loginUser };



