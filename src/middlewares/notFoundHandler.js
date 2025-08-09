export const notFondHendler = (req,res,next) =>{
    res.status(404).json({
        massage:'Route not found'
    });
};


