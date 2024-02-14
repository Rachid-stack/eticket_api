//user model
module.exports = (sequelize, DataTypes) => {
    const Gare = sequelize.define('Gares', {
        id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        code: {type: DataTypes.STRING},
        libelle: {type: DataTypes.STRING},
        compagnie_id:{type:DataTypes.INTEGER},
        ville_id:{type:DataTypes.INTEGER},
        del: {type: DataTypes.INTEGER,defaultValue: 0}
        });
    return Gare
 }