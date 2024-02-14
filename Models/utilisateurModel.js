//user model
module.exports = (sequelize, DataTypes) => {
    const Utilisateur = sequelize.define('Utilisateurs', {
        id_utilisateur: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        nom: {type: DataTypes.STRING},
        prenom: {type: DataTypes.STRING},
        mot_de_passe: {type: DataTypes.STRING,},
        numero_telephone: {type: DataTypes.INTEGER,unique: true},
        active: {type: DataTypes.INTEGER,defaultValue: 1}
        },{timestamps: true}, )
    return Utilisateur
 }