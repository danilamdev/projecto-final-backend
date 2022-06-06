import { Strategy } from "passport-local"
import passport from "passport"
import bcrypt from "bcrypt"
import userModel from "../models/usuarios.js"

passport.use("register", new Strategy({ passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const userFound = await userModel.findOne({username: username});
                if (userFound) {
                    console.log("usuario ya existe");
                    return done(null, false);
                }

                const {nombre, apellido, mail} = req.body
                const passwordHash = await bcrypt.hash(password, 10)
                
                const newUser = {
                  username,
                  nombre,
                  apellido,
                  mail,
                  passwordHash
                }
              
                 const usuario = await userModel.create(newUser)

                 return done(null, usuario)
            } catch (error) {
                console.log('Error ', error);
            }
        }
    )
);

passport.use("login", new Strategy(async (username, password, done) => {
        try {
            const userFound = await userModel.findOne({username: username });

            const passCorrect = userFound === null 
                ? false
                : await bcrypt.compare(password, userFound.passwordHash)
  
            if(!(passCorrect && userFound)) return done(null, false)

            return done(null, userFound)

        } catch (error) {
            console.log('passport', error);
            return done(null, error);
        }
    })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id, done);
});

export default passport;