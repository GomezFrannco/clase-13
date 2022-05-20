import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { userModel } from "../models/user.models.js";

passport.use(
  "signup",
  new Strategy(
    { passReqToCallback: true },
    async (req, userName, password, done) => {
      try {
        const existing = await userModel.findOne({ userName });
        if (existing) {
          console.log("usuario existente");
          return done(null, false);
        } else {
          const newUser = {
            userName,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
          };
          const user = await userModel.create(newUser);
          return done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.use(
  "login",
  new Strategy(async (userName, password, done) => {
    try {
      const user = await userModel.findOne({ userName });
      if (!user) {
        done(null, false);
      } else {
        const val = bcrypt.compareSync(password, user.password);
        if (val) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    } catch (err) {
      console.log(error);
      done(err);
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
