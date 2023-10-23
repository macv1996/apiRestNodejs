function logErrors(err,req,res,next) {
    console.log('1');
    console.log(err.message);
    next(err)
}

function boomErrorHandler(err,req,res,next) {
    console.log('2');
    if (err.isBoom) {
        const output= err.output
        res.status(output.statusCode).json({message:output.payload})
    }else{
        next(err)
    }
    
}

function errorHandler (err,req,res,next) {
    console.log('3');
    res.status(500).json({
        message:err.message,
        stack:err.stack
    })
}

module.exports = {logErrors,errorHandler,boomErrorHandler}