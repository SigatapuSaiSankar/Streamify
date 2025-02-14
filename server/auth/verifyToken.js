import jwt from "jsonwebtoken";

export const authorization = async (req, res, next) =>{
    const authToken = req.headers.authorization;

    if(!authToken || !authToken.startsWith("Bearer ")){
        return res.status(401).json({message:"Please Login First",success:false});
    }

    try {
        const token = authToken.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
        if(decoded.role !== "admin"){
            return res.status(401).json({message:"Only admin is allowed",success:false});
        }
        next();
    } catch (error) {
        return res.status(500).json({message:`server error ${error.message}`,success:false});
    }
}