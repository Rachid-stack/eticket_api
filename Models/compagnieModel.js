//user model
module.exports = (sequelize, DataTypes) => {
    const Compagnie = sequelize.define('Compagnies', {
        id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        code: {type: DataTypes.STRING},
        libelle: {type: DataTypes.STRING},
        del: {type: DataTypes.INTEGER,defaultValue: 0}
        });
       
    return Compagnie
 }