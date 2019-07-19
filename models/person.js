const Joi = require('Joi');

function validatePerson(person) {
    const schema = {
      firstName : Joi.string().min(5).max(50).required(),
      lastName  : Joi.string().min(5).max(50).required(),
      dob       : Joi.number().integer().min(1900).required(),
      email     : Joi.string().email({ minDomainSegments: 2 }),
      gender    : Joi.string().min(5).max(10).required(), 
      cellphone : Joi.string().min(5).max(13).required(),
      otherphone: Joi.string().min(5).max(13).required()
    };
  
    return Joi.validate(customer, schema);
  }

  module.exports.validate = validatePerson;