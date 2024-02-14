module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservations', {
        id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        is_tiers: {type: DataTypes.BOOLEAN},
        id_user: {type: DataTypes.INTEGER},
        id_depart:{type:DataTypes.INTEGER},
        date_depart:{type:DataTypes.STRING},
        type_billet:{type:DataTypes.STRING},
        statut_paiement:{type:DataTypes.STRING},
        statut_reservation:{type:DataTypes.STRING},
        del: {type: DataTypes.INTEGER,defaultValue: 0}
        });
    return Reservation
 }