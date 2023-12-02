// not Found error
const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Error Handler 
const errorHandler = (err, req, res, next) => {
    const status_code = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(status_code);
    res.json({
        message: err?.message,
        stack: err?.stack
    });
};

// export notFound, errorHandler 
module.exports = { notFound, errorHandler };