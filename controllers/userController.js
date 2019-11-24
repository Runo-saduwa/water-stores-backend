const User = require('../models/User');
const UserAddress = require('../models/UserAddress');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
  signUp: async (req, res) => {
      const user = await User.findOne({email: req.body.email});

      if(user){
          return res.status(500).json({
              message: 'Email Already Exists'
          })
      } else {
          hash = await bcrypt.hash(req.body.password, 8);

          const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            createdAt: new Date().toISOString()
          })

          try {
              await user.save();
              res.json({
                  message: 'User Registration successful'
              })
          } catch(e) {
              res.status(500).json({
                  error: e
              })
          }
      }




  },
  logIn: async (req, res) => {
      const user = await User.findOne({email: req.body.email});
      if(!user){
          return res.status(500).json({
              message: 'Something went wrong'
          })
      }

      const password = await bcrypt.compare(req.body.password, user.password);
     console.log(password)
      if(!password) {
         return res.json({
             message:'Email or password incorrect'
         })
      }

      const payload = {
        userId: user._id,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + 60 * 60
    };
    const token = await jwt.sign(payload, 'mysecret');
    res.json({
        message: { user: {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        },
        token
    }
    });
  },
   newAddress: async (req, res) => {
        const userAddress = await UserAddress.findOne({user: req.body.userId});
        if(userAddress) {

            const updatedUserAddress = await UserAddress.findOneAndUpdate({user: req.body.userId}, {
                $push: {
                    "address": req.body.address
                }
            }, {
                new: true
            })
    
            return res.json({
                message: updatedUserAddress
            })
      
        } 

          const newUserAddress = new UserAddress({
            // _id: new mongoose.Types.ObjectId(),
            user: req.body.userId,
            address: req.body.address
          })


            await newUserAddress.save();
             res.json({message: newUserAddress});
    },

    getSingleAddress: async (req, res) => {
        UserAddress.findOne({"user": req.params.userId})
        .select('_id user address')
        .exec()
        .then(user => {
            res.status(200).json({
                message: user
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
    }


}