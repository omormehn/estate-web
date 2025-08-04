import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId, isAdmin:false }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });  
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: "Strict",
          maxAge: 3600000,
        });
        return token;
}

            
