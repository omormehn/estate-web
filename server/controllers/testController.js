import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res) => {
    const token = req.cookies.token

    if(!token) return res.status(401).json({message: "Not Authenticated"})

    jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
        if(error) return res.status(401).json({message: "Token is invalid"});
      
    });

    res.status(200).json({message: "You are Authenticated"})
}

export const isAdmin = async (req, res) => {
   console.log(req.userId);  

     res.status(200).json({ message: "You are Authenticated" });
};