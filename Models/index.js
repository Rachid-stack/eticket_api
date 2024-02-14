//importing modules
const {Sequelize, DataTypes} = require('sequelize')

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5433
//database name is discover
const sequelize = new Sequelize('mobile_ticket_db', 'postgres', 'admin2020', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
});
//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected successfully`)
}).catch((err) => {
    console.log(err)
})
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
//connecting to model
db.users = require('./utilisateurModel')(sequelize, DataTypes)
db.reservations=require('./reservationModel')(sequelize,DataTypes)
db.users.hasMany(db.reservations, { as:'reservations',foreignKey: 'id_user' });

db.reservedSiege=require('./reservedSiegeModel')(sequelize,DataTypes)
db.villes=require('./villesModel')(sequelize,DataTypes)
db.compagnies=require('./compagnieModel')(sequelize,DataTypes)
db.gares=require('./gareModel')(sequelize,DataTypes)
db.trajets=require('./trajetModel')(sequelize,DataTypes)
db.departs=require('./departModel')(sequelize,DataTypes)
db.trajets.hasMany(db.departs,{as:'departs',foreignKey:'trajet_id'});
db.departs.belongsTo(db.trajets,{foreignKey:'trajet_id', as:'trajet'});
db.villes.hasMany(db.gares, { as: "gares" ,foreignKey:'ville_id'});
db.gares.belongsTo(db.villes, { foreignKey: 'ville_id', as: 'ville' });
db.compagnies.hasMany(db.gares, { as: 'gares',foreignKey:'compagnie_id' });
db.compagnies.hasMany(db.departs,{as:'departs',foreignKey:'compagnie_id'});
db.departs.belongsTo(db.compagnies,{as:'compagnie',foreignKey:'compagnie_id'});
db.gares.belongsTo(db.compagnies, { foreignKey: 'compagnie_id', as: 'compagnie' });
db.departs.hasMany(db.reservations, {as:'reservations', foreignKey: 'id_depart' });
db.reservations.belongsTo(db.users, {foreignKey: 'id_user',as:'utilisateur' });
db.reservations.belongsTo(db.departs, { foreignKey: 'id_depart' , as: 'depart'});

//exporting the module
module.exports = db