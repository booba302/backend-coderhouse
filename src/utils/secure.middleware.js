export const logged = (req, res, next) => {
  if (req.user) return res.redirect("/products");
  next();
};

export const notLogged = (req, res, next) => {
  if (!req.user) return res.redirect("/login");
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user.user.role != "admin")
    return res.status(403).send({
      error: true,
      msg: "No posee permisos de administrador para realizar la acción",
    });
  next();
};

export const isUser = (req, res, next) => {
  if (req.user.user.role != "user")
    return res.status(403).send({
      error: true,
      msg: "No posee permisos de usuario para realizar la acción",
    });
  next();
};
