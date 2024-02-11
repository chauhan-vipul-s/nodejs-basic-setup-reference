const { constants } = require("./constant");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
 
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        statusCode,
        status: false,
        title: "Validation Failed",
        message: err.message,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        statusCode,
        status: false,
        title: "Unauthorize access",
        message: err.message,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        statusCode,
        status: false,
        title: "Not Found",
        message: err.message,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        statusCode,
        status: false,
        title: "Forbidden Error",
        message: err.message,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        statusCode,
        status: false,
        title: "Server Error",
        message: err.message,
      });
      break;
    default:
      res.json({
        statusCode,
        status: false,
        title: "Unkown Error",
        message: err.message,
      });
      break;
  }
};

module.exports = errorHandler;
