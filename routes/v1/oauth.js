/**
 * Slantapp code and properties {www.slantapp.io}
 */
import express from 'express';
//libraries
import {
    FacebookCallback, FacebookGetUser,
    FacebookLogin,
    GoogleCallback,
    GoogleGetUser,
    GoogleLogin
} from "../../controllers/controller.v1.oauth2.js";

let router = express.Router();

/* GET users listing. */

//Google OAuth
router.get('/google/login', GoogleLogin)

router.get('/google/callback', GoogleCallback)

router.get('/google/user', GoogleGetUser)

//Facebook OAuth
router.get('/facebook/login', FacebookLogin)

router.get('/facebook/callback', FacebookCallback)

router.get('/facebook/user', FacebookGetUser)

export default router
