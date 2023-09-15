/**
 * Slantapp code and properties {www.slantapp.io}
 */
import express from 'express';
import {Login, Register} from "../../controllers/controller.v1.auth.js";
//libraries


let router = express.Router();

/* GET users listing. */

router.post('/login', Login)
router.post('/register', Register)

export default router
