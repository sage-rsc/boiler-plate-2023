/**
 * Slantapp code and properties {www.slantapp.io}
 */
import Async from './../core/core.async.js'
import Mailer from './../services/services.mail.js'
import {ErrorClass, Utils} from "../core/index.js";
import {ModelUser} from "../models/index.js";

export const ControllerLogin = Async(async (req, res, next) => {
    //do logic here
    await new Mailer(req.body.email).body("this is a test body from node boiler").who("from slantapp devs").subject("From User Sub").send()
    console.log("Email sent !!!")
    next()
})

export const Login = Async(async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await ModelUser.Authenticate(email, password);
        res.json(Utils.PrintRest("API Running - Ok", !!user, user))
    } catch (e) {
        throw new ErrorClass(e.message, 401)
    }
})

export const Register = Async(async (req, res) => {
    try {
        const user = await ModelUser.Register(req.body);
        const otp = Math.random();
        // await new Mailer(req.body.email).body("Welcome to NPF - Guard").who("from slantapp devs").subject("From User Sub").btnText(otp).btnUrl('#').send()
        res.json(Utils.PrintRest("API Running - Ok", true, user))
    } catch (e) {
        throw new ErrorClass(e.message, 500)
    }
})

