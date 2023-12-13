import passport from "passport";
import { Router } from "express";
import { notLogged } from "../utils/secure.middleware.js";

const authRouter = Router();

authRouter
  .get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] }),
    (req, res) => {}
  )
  .get(
    "/callback",
    passport.authenticate("github", {
      successRedirect: "/products",
      failureRedirect: "/login",
    }),
    (req, res) => {}
  )
  .post(
    "/login",
    passport.authenticate("login", {
      successRedirect: "/products",
      failureRedirect: "/login",
    }),
    async (req, res) => {}
  )
  .post(
    "/register",
    passport.authenticate("register", {
      failureRedirect: "/register",
    }),
    async (req, res) => {
      const user = req.user;
      res.send(user);
    }
  )
  .get("/logout", notLogged, async (req, res) => {
    req.session.destroy((er) => {
      res.status(200).send({
        msg: "logout succesful",
      });
    });
  });

export default authRouter;
