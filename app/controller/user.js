const User = require('../model/User')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
//this function is respansible for generating the token from the user index
const generateAccessToken = (payload) => {
    return jwt.sign({ payload }, "mysecretkey", { expiresIn: '1d' });
};
module.exports = {
    //this login fucntion will check id the user data is corret
    // and if so if will generate new token and send is to the client 
    // else  if will alert that the data is incorrect
    login: async (req, res, next) => {
        try {
            const {
                email,
                password
            } = req.body;

            const result = await User.findOne({ email: email });
            if (result) {

                const userpassword = await bcrypt.compare(password, result.password);
                if (userpassword) {
                    //generating the token
                    const token = generateAccessToken({ id: result._id });
                    //sending the token to the client
                    res.status(200).json(
                        {
                            user: result,
                            token: token,
                        }

                    );

                } else {
                    res.status(200).json({
                        message: "wrong password"
                    })
                }

            } else {
                res.status(200).json({
                    credential: false,
                    message: "login credentials are false !"
                });
            }
        } catch (error) {
            res.status(500).json(error);

        }

    },
    insert: async (req, res, next) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 8);
            const newUser = new User(req.body);
            newUser.password = hashedPassword;
            const user = await newUser.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json(error);

        }


    },
}