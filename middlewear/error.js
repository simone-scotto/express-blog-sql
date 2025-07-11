// SERVER ERROR HANDLER
function errorsHandler(err, req, res, next) {
  res.status(500);
  res.json({
    error: err.message,
  });
  console.log(res.json());
}

//PATH NOT FIND
function notFound(req, res, next) {
  res.status(404);
  res.json({
    error: "Not Found",
    message: "Pagina non trovata",
  });
}

module.exports = {
  errorsHandler,
  notFound,
};
