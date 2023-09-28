import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import * as UserServices from "../services/users.service.js";
import * as CartServices from "../services/carts.service.js";

const LocalStrategy = local.Strategy;

const InitPassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        try {
          const userExists = await UserServices.getUserByEmail(email);
          if (userExists.code == 200) return done(null, false);
          if (userExists.code == 204) {
            const { name, lastname, age } = req.body;
            const cart = await CartServices.addCart();

            const newUser = {
              name,
              lastname,
              email,
              password,
              age,
              role: email == "adminCoder@coder.com" ? "admin" : "user",
              cart: cart._id,
            };

            const user = await UserServices.addUser(newUser);

            return done(null, user.user[0]);
          }
        } catch (error) {
          return done("Error al obtener usuario" + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        try {
          const user = await UserServices.valUser(email, password);
          if (!user) return done("Usuario no existe" + error);
          return done(null, user);
        } catch (error) {}
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.2d596fddc5240812",
        clientSecret: "6b5c1aeddd0a826f4f96976eee54f8381d6e8517",
        callbackURL: "http://localhost:8080/api/auth/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = await UserServices.getUserByEmail(profile._json.email);
        if (user.code == 200) return done(null, user.user);
        if (user.code == 204) {
          const cart = await CartServices.addCart();
          const newUser = {
            name: profile._json.name.split(" ")[0],
            lastname: profile._json.name.split(" ")[1],
            email: profile._json.email,
            password: "",
            age: "",
            role:
              profile._json.email == "adminCoder@coder.com" ? "admin" : "user",
            cart: cart.cart._id,
          };

          const createUser = await UserServices.addUser(newUser);
          return done(null, createUser.user[0]);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser(async (_id, done) => {
    const user = await UserServices.getUserById(_id);
    done(null, user);
  });
};

export default InitPassport;
