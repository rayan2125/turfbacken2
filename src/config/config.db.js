import mysql from "mysql"
import {config} from "dotenv"
config()
const {DATABASE_HOST,DATABASE_USER,DATABASE_PASSWOR,DATABASE}= process.env
const connection = 

mysql.createConnection({
  host: "sakshamsystems.com",
  user:"truff_dbuser",
  password:"60c&0ha2O",
  database:"saksham_truff"
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);

 
 
});

export default connection
