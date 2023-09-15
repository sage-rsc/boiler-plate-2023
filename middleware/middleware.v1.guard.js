/**
 * Slantapp code and properties {www.slantapp.io}
 */
import Async from './../core/core.async.js'
import {ModelUser} from "../models/index.js";
import {ErrorClass, Utils} from "../core/index.js";

export const MiddlewareApiGuard = Async(async (req, res, next) => {
    //do logic here
    try {
        const xToken = req.headers['guard-token']
        const isValid = await ModelUser.findOne({where: {token: xToken}})
        if (isValid) {
            req.user = isValid
            next()
        } else {
            return res.status(401).json(Utils.PrintRest("Unauthorized access", false, []))
        }
    } catch (e) {
        throw new ErrorClass(e.message, 400)
    }
})
