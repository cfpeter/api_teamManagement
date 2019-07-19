const sql = require('mssql');
const express = require('express');
const router = express.Router();
const { validate } = require('../models/person')


// database config... should be coming from config file.
const dbConfig = {
    server: "localhost\\mssqlserver",
    database: "teamM",
    user: "sa",
    password: "sqlsapass",
    port: "1433"
}

router.get('/', async (req, res) => {
    // try {
    //     console.log("sql connecting......")
    //     let pool = await sql.connect(dbConfig)
    //     await pool.request().query(
    //         'select * from [Customer].[Person]' , function(err, record){
    //             if(err){
    //                 console.log(err)
    //             }else{
    //                 console.log(record.recordset)
    //             }
    //         }) 
        
    //     } catch (err) {
    //         console.log(err);
    //     }
});


router.post('/', async (req, res) => {
    // const { error } = validate(req.body); 
    // console.log(error)
    // if (error) return res.status(400).send(error.details[0].message);
  
    // let pool = await sql.connect(dbConfig)
    // let result2 = await pool.request()
    //         .input('input_parameter', sql.VarChar, "bedoooooooo")
    //         .output('output_parameter', sql.VarChar(50))
    //         .execute('Test')
        
    //     console.dir(result2)

  });

async function getAllPerson () {
//   try {
//   console.log("sql connecting......")
//   let pool = await sql.connect(dbConfig)
//   await pool.request().query(
//       'select * from [Customer].[Person]' , function(err, record){
//           if(err){
//               console.log(err)
//           }else{
//               console.log(record.recordset)
//           }
//       }) 

//   } catch (err) {
//       console.log(err);
//   }
}
 

module.exports = router