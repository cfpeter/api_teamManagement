"use strict";

const utils = require( "../utils" );

const register = async ( { sql, getConnection } ) => {
    // read in all the .sql files for this folder
    const sqlQueries = await utils.loadSqlQueries( "auth" );
    
    const getCon = async () =>{
        return await getConnection();
    }

    const getLogin = async userId => {
        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();

        // configure sql query parameters
        request.input( "userId", sql.VarChar( 50 ), userId );

        // return the executed query
        return request.query( sqlQueries.getPerson );
    };

    const addLogin = async ( { 
        customerID,
        userName,
        passCode,
        salt, 
        createrBy
     } ) => {

        const cnx = await getConnection();
        const request = await cnx.request();
        request.input( "customerID", sql.VarChar( 150 ), customerID );
        request.input( "userName", sql.VarChar( 150 ), userName );
        request.input( "passCode", sql.VarChar( 255 ), passCode );
        request.input( "salt"   , sql.VarChar( 255 ), salt );
        request.input( "createrBy", sql.VarChar( 150 ), createrBy );
        request.input( "updatedBy", sql.VarChar( 150 ), createrBy );
        return request.query( sqlQueries.addLogin );
    };

    const updateLogin = async ( { 
        userName,
        passCode,
        salt,
        createrBy
     } ) => {

        const cnx = await getConnection();
        const request = await cnx.request();
        request.input( "userName", sql.VarChar( 150 ), userName );
        request.input( "passCode", sql.VarChar( 255 ), passCode );
        request.input( "salt"   , sql.VarChar( 255 ), salt );
        request.input( "createrBy", sql.VarChar( 150 ), createrBy );
        request.input( "updatedBy", sql.VarChar( 150 ), createrBy );
        return request.query( sqlQueries.updateLogin ); // create the sql file updateLogin.sql
    };

    const deleteEvent = async ( { id, userId } ) => {
        const cnx = await getConnection();
        const request = await cnx.request();
        request.input( "id", sql.Int, id );
        request.input( "userId", sql.VarChar( 50 ), userId );
        return request.query( sqlQueries.deleteEvent );
    };

    const addUserRegister = async ( { firstName, lastName, email, userName, passCode, salt, createdBy } ) => {

        const cnx = await getConnection();
        const request = await cnx.request();
        request.input( "firstName"  , sql.VarChar( 100 ), firstName );
        request.input( "lastName"   , sql.VarChar( 100 ), lastName );
        request.input( "email"      , sql.VarChar( 150 ), email ); 
        request.input( "userName"   , sql.VarChar( 150 ), userName ); 
        request.input( "passCode"   , sql.VarChar( 150 ), passCode ); 
        request.input( "salt"       , sql.VarChar( 150 ), salt ); 
        request.input( "createdBy"  , sql.VarChar( 150 ), createdBy );
        request.input( "updatedBy"  , sql.VarChar( 150 ), createdBy );
        
        return request.query( sqlQueries.uspAddUserRegister );

    };

    return {
        addLogin,
        deleteEvent,
        getLogin,
        updateLogin,
        getCon,
        addUserRegister
    };
};

module.exports = { register };