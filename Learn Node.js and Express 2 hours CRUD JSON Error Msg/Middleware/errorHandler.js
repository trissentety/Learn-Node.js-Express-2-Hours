const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500; //Pass status of 400 if no error code then status code is 500
    res.json({ message: err.message, stackTrace: err.stack });
};

module.exports = errorHandler;
