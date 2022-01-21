const Joi = require('joi');

const authSchema = Joi.object({
    firstName: Joi.string().required()
        .error( err => { err[0].message= `"First name" is not allowed to be empty!`; return err; } 
    ),
    lastName: Joi.string().required()
        .error( err => { err[0].message= `"Last name" is not allowed to be empty!`; return err; } 
    ),
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')).required()
        .error( err => { err[0].message= "The password does not meet the requirements!"; return err; } 
    ),
    confirmPassword: Joi.ref('password'),
})

module.exports = {
    authSchema
}