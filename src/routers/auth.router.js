import passport from "passport";
import { Router } from "express";

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
      console.log(user);
      res.send(user);
    }
  );

export default authRouter;
