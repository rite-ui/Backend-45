import jwt from 'jsonwebtoken';

export const authenticationToken = (req, res, next) => {
    const token = req.headers('authorization').split(' ')
    if(!token) return res.status(401).json({message:"Access denied . No token provided"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            error:error.message
        })
    }
}