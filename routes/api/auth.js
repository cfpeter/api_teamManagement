"use strict";
  
const Joi = require('@hapi/joi'); 
const bcrypt = require('bcrypt');
const sql = require('mssql'); 

const handleError = function (request, h, err) {

    if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
        const invalidItem = err.details[0];
        return h.response(`Data Validation Error. Schema violation. <${invalidItem.path}> \nDetails: ${JSON.stringify(err.details)}`)
            .code(400)
            .takeover();
    }

    return h.response(err)
        .takeover()
};


module.exports.register = async server => {
   server.route([ 
       {
       method: "get",
       path: "/api/auth/login",
       config: {
           handler: async request => {
               try {
                   // get the sql client registered as a plugin
                   const db = request.server.plugins.sql.client;

                   // TODO: Get the current authenticate user's ID
                   const userId = "user1234";

                   // execute the query
                   const res = await db.person.getPerson();

                   // return the recordset object
                   return res.recordset;
               } catch ( err ) {
                   console.log( err );
               }
           }
       }
   },
   {
    method: "post",
    path: "/api/auth/register",
    handler: async request => {
        try { 
            // get the sql client registered as a plugin
            const db = request.server.plugins.sql.client;  

            //hash and salt the password
            const salt = await bcrypt.genSalt(10)
            const hashSaltPass = await bcrypt.hash(request.payload.formData.password , salt);
             
            const data = {
                firstName: request.payload.formData.firstName,
                lastName: request.payload.formData.lastName, 
                email: request.payload.formData.email,   
                userName: request.payload.formData.userName,
                passCode: hashSaltPass,
                salt: salt,
                createdBy: `${request.payload.formData.firstName} ${request.payload.formData.lastName}`
            }
            
            const result = await db.auth.addUserRegister(data) ;
            console.log('this is res1 ' , result);
            return result; 

        } catch ( err ) {
            console.log( err );
        }
    } 
    // ,
    // options: {
    //     validate: {
    //         payload: {
    //             email: Joi.string().min(6).required(),
    //             firstName: Joi.string().min(6).required(),
    //             lastName: Joi.string().min(6).required(),
    //             password: Joi.string().min(6).required()
    //         },
    //         failAction:   handleError
    //     }
    // }
}

] );
};