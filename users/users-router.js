const express = require("express")
const router = express.Router()
const restricted = require("../auth/restrcited-middleware.js")
const Users = require("./users-model.js")

const { isValid } = require("./isValid-middleware.js")

router.use(restricted);

router.get('/', (req,res) => {
    Users.find()
    .then(users => {
        res.status(200)
        .json({ users, jtw: req.jtw })
    })
    .catch(err => res.send(err));
})



module.exports = router;