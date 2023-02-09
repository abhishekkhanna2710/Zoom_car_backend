const express = require("express");
const router = new express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require("../models/userSchema")


router.get("/", (req, res) => {
    res.send("Hi Backend project reloading 2.0.....");
})

router.post("/register", async (req, res) => {
    // console.log(req.body)
    // res.json({ message: req.body })

    const { name, email, password, cpassword } = req.body;

    if (!name || !email || !password || !cpassword) {
        return res.status(422).json({ error: "Plz filled credentials properly" })
    }

    try {

        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(422).json({ error: "Email already Exists" })
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password is not matching" })

        } else {
            const user = new User({ name, email, password, cpassword })
            await user.save();
            return res.status(201).json({ message: "User Registered Sucessfully" })

        }


    } catch (error) {
        console.log(error)
    }



    // try {

    //     const userdata = new User(req.body)
    //     const createUser = await userdata.save();


    //     res.status(201).send(createUser)
    // } catch (error) {
    //     res.status(400).send(error)
    // }

})


// **********Login Route**************

router.post("/signin", async (req, res) => {
    // console.log(req.body)
    // res.json({message: "awesome"})

    try {
        let token;
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the Details" })
        }

        const userLogin = await User.findOne({ email: email });

        console.log(userLogin)

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)


            token = await userLogin.generateAuthToken();
            console.log(token)

            if (!isMatch) {
                res.status(400).res.json({ message: "Invalid Credentials" });

            } else {
                res.json({ message: "User Signin Successfully" });
            }
        }
        else {
            res.status(400).res.json({ message: "Invalid Credentials" });

        }



    } catch (error) {
        console.log(error)
    }
})



module.exports = router;


