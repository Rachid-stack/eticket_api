//user model
module.exports = (sequelize, DataTypes) => {
    const Trajet = sequelize.define('Trajets', {
        id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        depart_id: {type: DataTypes.INTEGER},
        arrive_id: {type: DataTypes.INTEGER},
        duree_trajet: {type: DataTypes.INTEGER},
        del: {type: DataTypes.INTEGER,defaultValue: 0}
    });
    return Trajet
}