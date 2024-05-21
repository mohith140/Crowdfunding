const express = require('express')
const userModel = require('../../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require("cors")

const router = express.Router()

router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))

router.use(cookieParser())
router.use(express.json())

const varifyUser = (req, res, next) => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
        return res.status(404).json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.status(500).json("Error with token")
            } else {
                if (decoded.role === "admin") {
                    return res.status(200)
                    next()
                } else {
                    return res.json("not admin")
                }
            }
        })
    }
}

router.get('/dashboard', varifyUser, (req, res) => {
    res.json("Success")
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    await userModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, role: user.role },
                            "jwt-secret-key", { expiresIn: '1d' })

                        res.cookie('token', token)
                        return res.status(200).json({ Status: "Success", role: user.role, token })
                    } else {
                        return res.status(500).json("The password is incorrect")
                    }
                })
            } else {
                return res.status(404).json("No record existed")
            }
        })
})

router.post('/signup', (req, res) => {
    const { username, email, password, role, mobileNumber } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            userModel.create({ username, email, password: hash, role, mobileNumber })
                .then(user => res.json(true))
                .catch(err => res.json(err))
        }).catch(err => res.json(err))
})

module.exports = router

