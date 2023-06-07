const mysql = require("mysql");
const myConnection = require("express-myconnection");

const dbOptions = {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "demrassoul_db",
};

const connection = myConnection(mysql, dbOptions, "pool");

module.exports = connection;