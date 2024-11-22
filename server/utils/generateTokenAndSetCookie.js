import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId, isAdmin:false }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });  
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 3 * 24 * 60 * 60 * 1000, 
        });
        return token;
}

            
