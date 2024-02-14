//importing modules
const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const {Op} = require("sequelize");
// Assigning users to the variable User
const User = db.users;
const Reservation=db.reservations
//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
    try {
        const { nom,prenom,numero_telephone,mot_de_passe } = req.body;
        console.log(req.body);
        var active=1;
        const data = {
            nom,
            prenom,
            numero_telephone,
            active:active,
            mot_de_passe: await bcrypt.hash(mot_de_passe, 10),
        };
        console.log(data);
        //saving the user
        const user = await User.create(data);
        //if user details is captured
        //generate token with the user's id and the secretKey in the env file
        // set cookie with the token generated
        if (user) {
            let token = jwt.sign({ id: user.id_utilisateur }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });
            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
            //send users details
            return res.status(201).send(user);
        } else {
            return res.status(409).send("Une erreur s'est produite veuillez reesayer!");
        }
    } catch (error) {
    console.log(error);
    }
};
const findOne= async(req,res)=>{
  try {
    const {id} = req.params;
    const user = await User.findOne({where: { id_utilisateur: id}});
    
    res.send(user);
  } catch (error) {
    res.status(500).send({
        message: error.message || "Some error occurred while retrieving gares."
    });
  }
}
//login authentication
const login = async (req, res) => {
 try {
const { identifiant, password } = req.body;
     console.log(req.body);
    //find a user by their email
    const user = await User.findOne({
        where: {
          numero_telephone:parseInt(identifiant),
        } ,include:[{model:Reservation,as:'reservations'}]
    });
   //if user email is found, compare password with bcrypt
   if (user) {
     const isSame = await bcrypt.compare(password, user.mot_de_passe);
     //if password is the same
      //generate token with the user's id and the secretKey in the env file

     if (isSame) {
       let token = jwt.sign({ id: user.id_utilisateur }, process.env.secretKey, {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
       });

       //if password matches wit the one in the database
       //go ahead and generate a cookie for the user
       res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
       console.log("user", JSON.stringify(user, null, 2));
       console.log(token);
       //send user data
       return res.status(201).send({userData:user,jwt_token:token});
     } else {
       return res.status(401).send("Authentication failed");
     }
   } else {
     return res.status(401).send("Authentication failed");
   }
 } catch (error) {
   console.log(error);
 }
};
module.exports = {
 signup,
 login,
 findOne
};