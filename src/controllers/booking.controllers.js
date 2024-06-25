import connection from "../config/config.db.js"

class TurfListing {
static CreateTurf = async (req,res)=>{
    console.log("userrr id not ftching", req)
    const{turfName,turfLocation,turfNumber,turfEmail,}= req.body
const userID = req.userId    


    if(turfName && turfLocation &&turfNumber &&turfEmail){
        try {
            const query = 'INSERT INTO createTurf (turfName, turfLocation, turfNumber,turfEmail,userId) VALUES (?, ?, ?,?,? )';
            await connection.query(query, [
                turfName,
                turfLocation,
                turfNumber,
                turfEmail,
                userID
              ]);
            res.status(200).send(
                {
                    status:"Succes",
                    message :"Your Turf have Register Succefully"
                }

            )
        } catch (error) {
            res.status(500).send(
                {
                    status:"Fail",
                    message :"Internal Issue",
                    error:error

                }
            ) 
        }
       
    }
    else{
        res.status(400).send(
            {
                status:"Fail",
                message :"All feild required"
            }
        ) 
    }
}
static listOfTurf = async (req, res) => {
    const userId = req.userId;
    try {
        const query = 'SELECT * FROM createTurf WHERE userId = ?';
        connection.query(query, [userId], async (error, results) => {
            if (error) {
                res.status(500).json({
                    status: 'Fail',
                    message: 'Internal Issue',
                    error: error.message
                });
            } else {
                res.status(200).json({
                    status: 'Success',
                    message: 'List of Turfs',
                    list: results
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'Fail',
            message: 'Internal Issue',
            error: error.message
        });
    }
}
}
export default TurfListing