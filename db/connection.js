// db connection

const mysql = require(`mysql2`);

const credential = {
  host: `localhost`,
  user: `root`,
  password: `root`,
  database: `blog_db`,
};
const connection = mysql.createConnection(credential);

connection.connect((err) => {
  if (err) throw err;
  //console.log(err.sqlMessage);
});

module.exports = connection;
