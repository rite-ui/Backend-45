export const  authMiddleware = (req, res)=>{
    if(req.session && req.session.user){
        return next();
    }
    res.status(404).json({message:"unautorized"})
};