"use strict";

const events = require( "./events" );
const person = require( "./person" );
const customer = require( "./customer" );

module.exports.register = async server => {
   await events.register( server );
   await person.register( server );
   await customer.register( server );
};