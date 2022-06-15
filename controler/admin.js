const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Admin = require('../model/admin')
var Members = require('../model/members')

const login = (async(req, res) => {
    const admin = await Admin.findOne({name: req.body.name})
    if (!admin) {
        return res.status(400).json({error: "Name is wrong"})
    } 

    const validPassword = await bcrypt.compare(req.body.password, admin.password)
    if (!validPassword) {
        return res.status(401).json({error: "Password is wrong"})
    }
    const token = jwt.sign(
        {
            name: admin.name,
            id: admin._id, 
        },
        process.env.TOKEN_SECRET_ADMIN,
        {
            expiresIn: "24h"
        }
    )
    res.cookie("authCookie", token, {maxAge: 900000, htpOnly:true}).json(
        {error: null,
        id: admin.id,
        data: {
            token
        }}
    )
});

const signup = (async(req, res) => {
    const nameExist = await Admin.findOne({name: req.body.name})
    if (nameExist) return res.status(400).json({error: "Name already exist"})

    const codeExist = await Admin.findOne({code: req.body.code})
    if (codeExist) return res.status(400).json({error: "Code already exist"})

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const admin = new Admin({
        name: req.body.name,
        password: hashPassword
    })
    try{
        const saveadmin = await admin.save();
        res.send(saveadmin)
    }
    catch (err) {
        res.status(400).send(err)
    }
});

const memberList = (req, res) => {
    Members.find({}, {"password": 0})
    .then((members) => {
        res.status(200)
        res.setHeader('Content-Type','application/json')
        res.json(members)
    })
    .catch((err) => {
        console.log(err);
        res.send(err).status(500)
    })
}

module.exports = {
    login,
    memberList,
    signup
}