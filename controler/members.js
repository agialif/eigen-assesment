const Members = require('../model/members')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signup = (async(req, res) => {
    const nameExist = await Members.findOne({name: req.body.name})
    if (nameExist) return res.status(400).json({error: "Name already exist"})

    const codeExist = await Members.findOne({code: req.body.code})
    if (codeExist) return res.status(400).json({error: "Code already exist"})

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const member = new Members({
        code: req.body.code,
        name: req.body.name,
        password: hashPassword
    })
    try{
        const savemember = await member.save();
        res.send(savemember)
    }
    catch (err) {
        res.status(400).send(err)
    }
});

const login = (async(req, res) => {
    const member = await Members.findOne({name: req.body.name})
    if (!member) {
        return res.status(400).json({error: "Name is wrong"})
    } 

    const validPassword = await bcrypt.compare(req.body.password, member.password)
    if (!validPassword) {
        return res.status(401).json({error: "Password is wrong"})
    }
    const token = jwt.sign(
        {
            name: member.name,
            id: member._id, 
        },
        process.env.TOKEN_SECRET_MEMBER,
        {
            expiresIn: "24h"
        }
    )
    res.cookie("authCookie", token, {maxAge: 900000, htpOnly:true}).json(
        {error: null,
        id: member.id,
        data: {
            token
        }}
    )
});



module.exports = {
    signup,
    login
}

