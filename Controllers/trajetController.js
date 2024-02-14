const db = require("../Models");
const {Op} = require("sequelize");
// Assigning users to the variable Use
// Assigning users to the variable User
const Depart = db.departs;
const Trajet=db.trajets;
const Comp=db.compagnies;
// Retrieve all Tutorials from the database.
const findAll = (req, res) => {
    Trajet.findAll({include: [{model:Depart, as:'departs'}]  }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};


// Contrôleur pour la récupération des trajets, des départs et des compagnies en fonction de l'ID de départ et de l'ID d'arrivée
const getTrajetsByDepartArrive = async (req, res) => {
    const { depart, destination,compagnie } = req.body;
    const currentDate = new Date();
    try {
        // Recherche des trajets correspondant à l'ID de départ et à l'ID d'arrivée
        const trajets = await Trajet.findOne({ where: { depart_id:depart, arrive_id:destination } });
        if (trajets.length === 0) {
            res.status(404).json({ message: "Aucun trajet trouvé pour ces ID de départ et d'arrivée." });
            return;
        }
        console.log(trajets)
        // Recherche des départs correspondant aux trajets trouvés
        const departs = await Depart.findAll({ where: { trajet_id: trajets.id,compagnie_id:compagnie,/*heure_depart: {
            [Op.gte]: currentDate // Exclut les départs déjà passés
        }*/ } });
        console.log(departs)
        // Récupération des ID des compagnies correspondant aux départs trouvés
        const compagnieIds = await departs.map(depart => depart.compagnie_id);

        // Recherche des compagnies correspondant aux ID récupérés
        const compagnies = await Comp.findAll({ where: { id: compagnieIds } });

        res.status(200).json({ trajets, departs, compagnies });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la récupération des trajets, des départs et des compagnies." });
    }
};
// Find a single Tutorial with an id
const findOne = (req, res) => {
  
};
module.exports={
  findAll,
  findOne,
  getTrajetsByDepartArrive
};