export const GETLogout = (req, res) => {
  req.session.destroy((er) => {
    res.send("Se ha cerrado la sesión correctamente");
  });
};

export const GETCurrent = (req, res) => {
  const user = req.user;
  if (!user) return res.send("No existe usuario loggeado");
  res.send({ user: user });
};