import connection from "../config/config.db.js"
import jwt from "jsonwebtoken";
class UserController {

  static Register = async (req, res) => {
    const { userName, userEmail, userPhone, userPassword } = req.body
    if (userName && userEmail && userPhone && userPassword) {
      const existingUserQuery = 'SELECT COUNT(*) AS userCount FROM user WHERE userEmail = ? OR userPhone = ?';
      const data = await connection.query(existingUserQuery, [userEmail, userPhone], async (error, results) => {

        if (error) {
          throw error;
        }

        const userCount = results[0].userCount;

        if (userCount > 0) {
          res.status(409).send({
            status: "Conflict",
            message: "User already exists with the provided user Email or user number."
          });
          return;
        }
        try {
          const query = 'INSERT INTO user (userName, userEmail, userPhone,userPassword) VALUES (?, ?, ?,? )';


          await connection.query(query, [
            userName,
            userEmail,
            userPhone,
            userPassword
          ]);
          res.status(200).send({
            status: "Success",
            Message: "your Regitraion is succesfully",
          })
        } catch (error) {
          res.status(400).send({
            status: "Fail",
            message: "Internal Issue "
          })
        }
      })

    } else {
      res.status(400).send(
        {
          status: "Fail",
          message: "All feild required"
        }
      )
    }



  }
  static async Login(req, res) {
    const { userEmail, userPassword } = req.body;


    const userQuery = 'SELECT COUNT(*) AS userCount FROM user WHERE userEmail = ?'
    try {
      const userIdQuery = 'SELECT userId FROM user WHERE userEmail = ?'
      connection.query(userIdQuery, [userEmail], async (err, results) => {
        if (err) throw err;
        const userId = results[0].userId;
        console.log(results)

        try {
          const userResult = await connection.query(userQuery, [userEmail],

            async (error, results) => {

              if (error)
                throw error
              const userCount = results[0].userCount;
              const JWT_SECRET_KEY = "kjkjskdjkjkahhiousda";
              const token = jwt.sign({ userId: userId }, JWT_SECRET_KEY, {
                expiresIn: "5d",
              });
              if (userCount > 0) {

                return res.status(200).send({
                  status: 'Success',
                  message: 'Login successful',
                  token
                });
              } else {
                res.status(500).send({
                  status: 'Fail',
                  message: 'This user Not Exit',
                });
              }
            }


          );









        } catch (error) {
          console.error(error);
          return res.status(500).send({
            status: 'Error',
            message: 'Internal server error',
          });
        }

      });


    } catch (error) {
      res.send({
        message: "internal isssue",
        error: error
      })
    }


  }



}
export default UserController