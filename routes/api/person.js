"use strict";
  
const Joi = require('@hapi/joi'); 
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
   server.route([ {
       method: "GET",
       path: "/api/person",
       config: {
           handler: async request => {
               try {
                   // get the sql client registered as a plugin
                   const db = request.server.plugins.sql.client;

                   // TODO: Get the current authenticate user's ID
                   const userId = "user1234";

                   // execute the query
                   const res = await db.person.getPerson( userId );

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
    path: "/api/person",
    handler: async request => {
        try { 
            // get the sql client registered as a plugin
            const db = request.server.plugins.sql.client;

            // // TODO: Get the current authenticate user's ID
            // const userId = "user1234";

            //get data from payload 
            const data = {
                firstName: request.payload.firstName,
                lastName: request.payload.lastName,
                dob: request.payload.DOB,
                gender: request.payload.gender,
                email: request.payload.email,
                cellPhone: request.payload.cellPhone,
                otherPhone: request.payload.otherPhone,
                createrBy: `${request.payload.firstName} ${request.payload.lastName}`,
                updatedBy: `${request.payload.firstName} ${request.payload.lastName}`,
            }

            // // execute the query
            const res = await db.person.addPerson(data);

            // // return the recordset object
            return res.recordset[ 0 ]; 
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