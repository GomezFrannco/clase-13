import { Router } from "express";
import { checkAuth } from '../middlewares/auth.middlewares.js'
import * as auth from "../controllers/auth.controllers.js";
import passport from "../utils/passport.utils.js";

const router = Router();

router.get("/", (_req, res) => {
  res.redirect("/login");
});
router.get('/main', checkAuth, auth.getMain)
router.route("/login")
  .get(auth.getLogin)
  .post(
    passport.authenticate("login", { failureRedirect: "/failLogin" }),
    auth.postLogin
  );
router.route("/signup")
  .get(auth.getSignup)
  .post(
    passport.authenticate("signup", { failureRedirect: "/failSignup" }),
    auth.postSignup
  );
router.get("/logout", auth.logout);

router.get("/failLogin", auth.failLogin);
router.get("/failSignup", auth.failSignup);
export default router;
