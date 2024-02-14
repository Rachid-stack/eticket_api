//importing modules
const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const moment = require('moment');

const {Op, where} = require("sequelize");
// Assigning users to the variable User
const Reservation = db.reservations;
const Depart=db.departs;
const Utilisateur=db.Utilisateur;
const ReservedSiege=db.reservedSiege;
const Siege=db.reservedSiege;
//signing a user up
//hashing users password before its saved to the database with bcrypt
const createReservation = async (req, res) => {
    try {
    
        const { is_tiers,id_user,id_depart,date_depart,type_billet,numero_siege,li_siege,statut_paiement,statut_reservation} = req.body;
        const user_res=await Reservation.findOne({where:{id_user:id_user,id_depart:id_depart,date_depart:date_depart}});
        console.log(user_res);
        if(user_res){
            if(user_res){
                for(let i=1;i<numero_siege.length;i++){
                    var no_siege=numero_siege[i];
                    var libelle_siege=li_siege[i];
                    var id_reservation=user_res.id
                    console.log(no_siege,libelle_siege,id_reservation)
                    const data_={
                        id_reservation,no_siege,libelle_siege
                    }
                    await ReservedSiege.create(data_);
                }
                return res.status(201).send(user_res);
            }else{
                return res.status(409).send("Une erreur s'est produite veuillez reesayer!");
            }
        }else{
            const data = {is_tiers,id_user,id_depart,date_depart,type_billet,statut_paiement,statut_reservation};
            //saving the user
            const reservation = await Reservation.create(data);
            //if user details is captured
            //generate token with the user's id and the secretKey in the env file
            // set cookie with the token generated
            if (reservation) {
                for(let i=1;i<numero_siege.length;i++){
                    var no_siege=numero_siege[i];
                    console.log(li_siege[i])
                    var libelle_siege=li_siege[i];
                    var id_reservation=reservation.id
                    console.log(no_siege,libelle_siege,id_reservation)
                    const data_={
                        id_reservation,no_siege,libelle_siege
                    }
                    await ReservedSiege.create(data_);
                }
                return res.status(201).send(reservation);
            } else {
                return res.status(409).send("Une erreur s'est produite veuillez reesayer!");
            }
        }
      
    } catch (error) {
       console.log(error);
    }
};
//login authentication
const findAll = async (req, res) => {
    Reservation.findAll({include: [{model:Utilisateur, as:'utilisateur'}]  }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};
const findReservationSiege = async(req,res)=>{
    // Format a date
     const currentDate = moment().format('YYYY-MM-DD');
    console.log(currentDate)
    try {
        const {id_dep,date_dep} = req.params;
        const reservation = await Reservation.findAll({where: { id_depart: id_dep,date_depart:date_dep}});
        console.log(reservation.length);
        var sieges=[];
        if(reservation.length>0){
            for(let i=0;i<reservation.length;i++){
                const sieg=await Siege.findAll({where:{id_reservation:reservation[i].id}});
                sieges.push(sieg);
            }
        }
        console.log(sieges)
        res.send(sieges);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving gares."
        });
    }
}
const findOne = async(req,res)=>{
    try {
        const {id_res} = req.params;
        const reservation = await Reservation.findOne({where: { id: id_res}});
        const sieges=await Siege.findAll({where:{id_reservation:reservation.id}});
        res.send({reservation,sieges});
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving gares."
        });
    }
}
module.exports = {
 createReservation,
 findAll,
 findOne,
 findReservationSiege
};