import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) =>
{
    try
    {
        const { token } = req.headers;
        
        // authorizing for admin
        if(!token)
        {
            return res.status(400).json({message: "Not Authorized"});
        }

        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
        {
            return res.status(400).json({message: "Not Authorized"});
        }
        next();
    }
    catch(error)
    {
        console.log(error);
        res.status(404).json({message: "Admin Not Found"});
    }
}

export default adminAuth;