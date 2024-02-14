//user model
module.exports = (sequelize, DataTypes) => {
    const ReservedSiege = sequelize.define('ReservedSiege', {
        id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        id_reservation: {type: DataTypes.INTEGER},
        no_siege: {type: DataTypes.STRING},
        libelle_siege: {type: DataTypes.STRING},
        del: {type: DataTypes.INTEGER,defaultValue: 0}
    });
    return ReservedSiege
}