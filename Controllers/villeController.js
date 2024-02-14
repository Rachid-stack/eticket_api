const db = require("../Models");
const {Op} = require("sequelize");
// Assigning users to the variable Use
// Assigning users to the variable User
const Ville = db.villes;
const Gare=db.gares;
// Retrieve all Tutorials from the database.
const findAll = (req, res) => {
    const libelle = req.query.libelle;
    var condition = libelle ? { libelle: { [Op.like]: `%${libelle}%` } } : null;
    console.log(condition)
    Ville.findAll({ where: condition,include: [{model:Gare, as:'gares'}] }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

  
// Find a single Tutorial with an id
const findOne = (req, res) => {
  
};
module.exports= {
  findAll,
  findOne,
};