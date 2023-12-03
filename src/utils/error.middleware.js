export default (error, req, res, next) => {
  const status = error.status || 500;
  const from = error.from || "fatal";
  const message = error.message || "error handler";
  return res.status(status).json({ status, message, from });
};
