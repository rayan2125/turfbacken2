import jwt from "jsonwebtoken";
import connection from "../config/config.db.js"; // Your MySQL connection file

const checkUserAuth = async (req, res, next) => {

  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      token = authorization.split(" ")[1];
      const JWT_SECRET_KEY = "kjkjskdjkjkahhiousda";
      const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
      const userID = decodedToken.userId;
     

     
      const query = "SELECT * FROM user WHERE userId = ?";
      const userRows = await connection.query(query, [userID],
        async (error, results)=>{
          if(error) throw error

          if (results.length > 0) {
            req.userId = userID;
          next();
        } else {
          res.status(401).json({ status: "failed", message: "Unauthorized User" });
        }
        }
        );
        
     
    } catch (error) {
      res.status(401).json({ status: "failed", message: "Unauthorized Userss" });
    }
  } else {
    res
      .status(401)
      .json({ status: "failed", message: "Unauthorized User, No Token" });
  }
};

export default checkUserAuth;
