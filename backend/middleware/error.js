module.exports.generatedErrors = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.statusCode(statusCode).json({
        message: err.message || "Internal Server Error",
        errName: err.name,
        stack: err.stack
    })
}