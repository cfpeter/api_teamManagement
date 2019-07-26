"use strict";

const events = require( "./events" );
const person = require( "./person" );
const customer = require( "./customer" );
const auth = require( "./auth" );

module.exports.register = async server => {
   await events.register( server );
   await person.register( server );
   await customer.register( server );
   await auth.register( server );
};