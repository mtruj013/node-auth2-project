const express = require("express");
const router = express.Router();

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");

router.post('/register', (req, res) => {

    if (isValid(req.body)) {
        const newUser = req.body;

        const rounds = process.env.BCRYPT_ROUNDS || 8;

        //hashes the pw
        const hashPw = bcryptjs.hashSync(newUser.password, rounds)

        newUser.password = hashPw;

        //saves user data
        Users.add(newUser)
            .then(user => {
                res.status(201)
                    .json({ data: user });
            })
            .catch(err => {
                console.log(err)
                res.status(500)
                    .json({ message: "Unable to register user" })
            })
    } else {
        res.status(400)
            .json({ message: "Please provide a usernmae and password" })
    }
})


router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (isValid(req.body)) {
        Users.findBy({ username: username })
            //destrcuture user below
            .then(([user]) => {
                if (user && bcryptjs.compareSync(password, user.password)) {

                    const token = createToken(user);

                    res.status(200)
                        .json({ message: "Logged in successfully", token })
                } else {
                    res.status(401)
                        .json({ message: "Incorrect login info" })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500)
                    .json({ message: "Error logging in user" })
            })
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
        });
    }
})


function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
}


function createToken(user) {

    const payload = {
        sub: user.id,
        username: user.username
    }

    const secret = process.env.JWT_SECRET || "issasecret";

    const options = {
        expiresIn: "1d"
    }

    return jwt.sign(payload, secret, options);
}

module.exports = router;