const jwt = require("jsonwebtoken");

// this is the middleware fucntion that will sheck if the user is already logged in
// and will return the verified token
module.exports = {
    isLoggedIn: async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            if (token == null) return res.status(401).json({ message: "not authorized" });

            jwt.verify(token, "mysecretkey", (err, user) => {
                console.log(err)

                if (err) return res.status(403).json({ message: "forbidden access is denied" });

                req.user = user;
                next()
            })
        } catch (error) {
            res.status(500).json(error);

        }

    }
}

