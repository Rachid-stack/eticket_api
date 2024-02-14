const db = require("../Models");
const {Op} = require("sequelize");
// Assigning users to the variable Use
// Assigning users to the variable User
const Gare = db.gares;
const Comp=db.compagnies;
const Ville=db.villes;
// Retrieve all Tutorials from the database.
const findAll = async (req, res) => {
    try {
      const libelle = req.query.libelle;
      const condition = libelle ? { libelle: { [Op.like]: `%${libelle}%` } } : null;
  
      const gares = await Gare.findAll({ where: condition, include: [{model:Comp,as :'compagnie'},{model:Ville,as:'ville'}] });
      res.send(gares);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving gares."
      });
    }
  };
  
//find all by city and compagny
const findAllByCityAndCompany = async (req, res) => {
    try {
      
      const { villeId, compId } = req.params;
      console.log(villeId,compId);
      const gares = await Gare.findAll({
        where: { ville_id: villeId, compagnie_id: compId },
        include: [{model:Comp, as:'compagnie'},{model:Ville,as:'ville'}],
      });
  
      res.send(gares);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving gares."
      });
    }
};
  

// Find a single Tutorial with an id
const findOne = (req, res) => {
  
};
module.exports={
  findAll,
  findOne,
  findAllByCityAndCompany
};