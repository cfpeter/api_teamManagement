const sql = require('mssql');
const config = require('config'); 



// console.log(config.has("dbConfig"));

// const dbConfig = config.get('dbConfig');

// database config... should be coming from config file.
const dbConfig = {
    server: "localhost\\mssqlserver",
    database: "teamM",
    user: "sa",
    password: "sqlsapass",
    port: "1433"
}

