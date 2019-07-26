"use strict";

const utils = require( "../utils" );

const register = async ( { sql, getConnection } ) => {
    // read in all the .sql files for this folder
    const sqlQueries = await utils.loadSqlQueries( "person" );

    const getPerson = async userId => {
        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();

        // configure sql query parameters
        request.input( "userId", sql.VarChar( 50 ), userId );

        // return the executed query
        return request.query( sqlQueries.getPerson );
    };

    const addPerson = async ( { 
        firstName,
        lastName,
        dob,
        gender,
        email,
        cellPhone,
        otherPhone,
        createrBy
     } ) => {
         
        const cnx = await getConnection();
        const request = await cnx.request();
        
        request.input( "firstName", sql.VarChar( 50 ), firstName );
        request.input( "lastName", sql.NVarChar( 50 ), lastName );
        request.input( "DOB", sql.VarChar( 50 ), dob );
        request.input( "gender", sql.VarChar( 50 ), gender );
        request.input( "email", sql.VarChar( 50 ), email );
        request.input( "cellPhone", sql.VarChar( 50 ), cellPhone );
        request.input( "otherPhone", sql.VarChar( 50 ), otherPhone );
        request.input( "createrBy", sql.VarChar( 50 ), createrBy );
        request.input( "updatedBy", sql.VarChar( 50 ), createrBy );
        return request.query( sqlQueries.addPerson ); 
    };

    const updateEvent = async ( { id, userId, title, description, startDate, startTime, endDate, endTime } ) => {
        const cnx = await getConnection();
        const request = await cnx.request();
        request.input( "id", sql.Int, id );
        request.input( "userId", sql.VarChar( 50 ), userId );
        request.input( "title", sql.NVarChar( 200 ), title );
        request.input( "description", sql.NVarChar( 1000 ), description );
        request.input( "startDate", sql.Date, startDate );
        request.input( "startTime", sql.Time, startTime );
        request.input( "endDate", sql.Date, endDate );
        request.input( "endTime", sql.Time, endTime );
        return request.query( sqlQueries.updateEvent );
    };

    const deleteEvent = async ( { id, userId } ) => {
        const cnx = await getConnection();
        const request = await cnx.request();
        request.input( "id", sql.Int, id );
        request.input( "userId", sql.VarChar( 50 ), userId );
        return request.query( sqlQueries.deleteEvent );
    };

    return {
        addPerson,
        deleteEvent,
        getPerson,
        updateEvent
    };
};

module.exports = { register };