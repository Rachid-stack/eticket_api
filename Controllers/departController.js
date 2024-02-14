const db = require("../Models");
const {Op} = require("sequelize");
// Assigning users to the variable Use
// Assigning users to the variable User
const Comp = db.compagnies;
const Depart=db.departs;
const Trajet=db.trajets;
// Retrieve all Tutorials from the database.
const findAll = (req, res) => {
    
    Depart.findAll({include: [{model:Comp, as:'compagnie'},{model:Trajet,as:'trajet'}]  }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

// Find a single Tutorial with an id
const findOne = async (req, res) => {
    try {
        const {id_} = req.params;
        const depart = await Depart.findAll({
          where: { id: id_},
          include: [{model:Comp, as:'compagnie'},{model:Trajet,as:'trajet'}],
        });
    
        res.send(depart);
      } catch (error) {
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving gares."
        });
      }
};
module.exports={
  findAll,
  findOne
};