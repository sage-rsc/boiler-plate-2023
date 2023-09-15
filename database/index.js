import 'dotenv/config';

/**
 * Slantapp code and properties {www.slantapp.io}
 */
const MODE = process.env.PROJECT_MODE === "prod";
/**
 * @type {string} default server uri
 */
const DATABASE_HOST = MODE ? process.env.DB_HOST : process.env.DEBUG_DB_HOST;
const DATABASE_LANG = "mysql";
/**
 * @type {string} database common name
 */
const DATABASE_NAME = MODE ? process.env.DB_NAME : process.env.DEBUG_DB_NAME;
/**
 * @type {string} database common username
 */
const DATABASE_USER = MODE ? process.env.DB_USER : process.env.DEBUG_DB_USER;
/**
 * @type {string} database common password
 */
const DATABASE_PASS = MODE ? process.env.DB_PASS : process.env.DEBUG_DB_PASS;
/**
 * @type {number} database common port
 */
const DATABASE_PORT = MODE ? process.env.DB_PORT : process.env.DEBUG_DB_PORT;

/**
 * Call for initialization
 */
import {Sequelize} from 'sequelize';

/**
 *
 * @type {BelongsTo<Model, Model> | Model<any, any> | Sequelize | Transaction}
 */
const dbConn = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASS, {
    host: DATABASE_HOST,
    dialect: DATABASE_LANG,
    port: DATABASE_PORT,
    logging: (e) => {
        //write to log file here...
        // console.log(e);
    },
});
export default  dbConn;