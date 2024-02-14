//user model
module.exports = (sequelize, DataTypes) => {
    const Depart = sequelize.define('Departs', {
        id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        trajet_id: {type: DataTypes.INTEGER},
        compagnie_id: {type: DataTypes.INTEGER},
        duree_voyage: {type: DataTypes.INTEGER},
        heure_depart: {type: DataTypes.TIME},
        nbre_place: {type: DataTypes.INTEGER},
        prix_billet: {type: DataTypes.INTEGER},
        del: {type: DataTypes.INTEGER,defaultValue: 0}
    });
    return Depart
}