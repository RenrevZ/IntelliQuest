const UserModel = require('../model/Users')
const user = new UserModel()

const storeUser = async (req,res) => {
    try {
        const dataToInsert = {
            "name": req.body.name,
            "age": req.body.age,
            "hobbies": req.body.hobbies
        }
        
        await user.insertOne(dataToInsert)

        res.setHeader('Content-Type', 'application/json')
           .status(200)
           .json({message: 'successfully Inserted'});

      } catch (err) {
          console.error('Error fetching data from MongoDB:', err);
          res.status(500)
            .json({ error: `Internal server error: ${err}` });
      }
}

const getAllUser = async (req,res) => {
    const users = await user.getAllUser()

    res.setHeader('Content-Type', 'application/json')
           .status(200)
           .send(users);
}

module.exports = {storeUser,getAllUser}