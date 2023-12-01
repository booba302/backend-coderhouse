export const logged = (req, res, next) => {
  if (req.user) return res.redirect("/products");
  next();
};

export const notLogged = (req, res, next) => {
  if (!req.user) return res.redirect("/login");
  next();
};

export const isUser = (req, res, next) => {
  const { role } = req.user
  if (role === "user")
    return res.status(403).send({
      error: true,
      msg: "Only Admin or Premium users allowed",
    });
  next();
};

export const isAdmin = (req, res, next) => {
  const { role } = req.user
  if (role === "admin")
    return res.status(403).send({
      error: true,
      msg: "Only Users or Premium users allowed",
    });
  next();
};

