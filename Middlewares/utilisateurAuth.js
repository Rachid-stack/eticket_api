//importing modules
const express = require("express");
const db = require("../Models");
//Assigning db.users to User variable
 const User = db.users;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveUser = async (req, res, next) => {
    console.log(req.body);
    //search the database to see if user exist
    try {
        const telephone =await User.findOne({
            where:{
                numero_telephone:req.body.numero_telephone,
            },
        });
        //if username exist in the database respond with a status of 409
        if (telephone) {
        return res.json(409).send("Un utilisateur est deja enregistré avec cet numero ou cet email!");
        }
    next();
    } catch (error) {
    console.log(error);
    }
};
//exporting module
 module.exports = {
 saveUser,
};