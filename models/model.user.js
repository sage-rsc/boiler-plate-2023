import sequelize from './../database/index.js';
import {DataTypes, Model} from 'sequelize';
import sha1 from 'sha1'
import Joi from 'joi'
import {ErrorClass} from "../core/index.js";

const tableName = "users";

// const queryInterface = sequelize.getQueryInterface();
function isJson(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (error) {
        return false;
    }
}

class ModelUser extends Model {
}

ModelUser.init({
    uid: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING, unique: true},
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    imgUrl: {type: DataTypes.STRING},
    password: {
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue('password', sha1(value))
        }
    },
    otp: {
        type: DataTypes.STRING, set(value) {
            this.setDataValue('otp', sha1(value))
        }
    },
    apiKey: {type: DataTypes.STRING},
    token: {type: DataTypes.STRING},
    pushToken: {type: DataTypes.STRING},
    verified: {type: DataTypes.BOOLEAN, defaultValue: false},
    status: {type: DataTypes.INTEGER, defaultValue: 0},
    fullName: {
        type: DataTypes.VIRTUAL, get() {
            return this.lastName + " " + this.firstName;
        }, set() {
            throw new Error('Do not try to set this field')
        }
    }
}, {sequelize, tableName, paranoid: true});

ModelUser.Authenticate = async (email, password) => {
    const schema = Joi.object({
        email: Joi.string().email({minDomainSegments: 2}).required(),
        password: Joi.string().min(6).max(12).required()
    }).unknown(true)

    await schema.validateAsync({email, password})

    const pass = sha1(password)
    console.log(pass)

    const user = await ModelUser.findOne({where: {email, password: pass}})
    if (!user) throw new ErrorClass('Invalid credentials')

    const apiKey = sha1(new Date() + email)
    const token = sha1(new Date() + email)
    return await user.update({apiKey, token})
}

ModelUser.Register = async (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        imgUrl: Joi.string().optional(),
        email: Joi.string().email({minDomainSegments: 2}).required(),
        password: Joi.string().min(6).max(12).required()
    }).unknown(true)

    await schema.validateAsync(data)
    const [user, created] = await ModelUser.findOrCreate({where: {email: data.email}, defaults: data})
    if (!created) throw new ErrorClass('Email already exists')
    const apiKey = sha1(new Date() + data.email)
    const token = sha1(new Date() + data.email)
    return await user.update({apiKey, token})
}

ModelUser.OAuth = async (data) => {
    const schema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        imgUrl: Joi.string().optional(),
        email: Joi.string().email({minDomainSegments: 2}).required(),
        password: Joi.string().min(6).required()
    }).unknown(true)

    const value = await schema.validateAsync(data)
    value.apiKey = sha1(new Date() + value.email)
    value.token = sha1(new Date() + value.email)
    let [user, created] = await ModelUser.findOrCreate({where: {email: data.email}, defaults: value})
    const apiKey = value.apiKey
    const token = value.token
    if (!created) user = await user.update({apiKey, token})
    return {user, created}
}

/**
 * Run belonging and relationship before sync()
 */

sequelize.sync();
export default ModelUser;