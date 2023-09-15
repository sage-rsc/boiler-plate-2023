import sequelize from './../database/index.js';
import {DataTypes, Model} from 'sequelize';

const tableName = "track";

// const queryInterface = sequelize.getQueryInterface();
function isJson(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (error) {
        return false;
    }
}

class ModelTrack extends Model {
}

ModelTrack.init({
    tid: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    uid: {type: DataTypes.INTEGER},
    map: {
        type: DataTypes.JSON,
        defaultValue: [],
        get() {
            const rawValue = this.getDataValue('map');
            const parsedArray = isJson(rawValue) ? JSON.parse(rawValue) : rawValue;
            if (Array.isArray(parsedArray)) {
                return parsedArray
            } else {
                return [];
            }
        },
        set(value) {
            const arrayValue = Array.isArray(value) ? value : [];
            this.setDataValue('map', arrayValue);
        }
    },
    day: {type: DataTypes.STRING, defaultValue: new Date().getDay()},
    month: {type: DataTypes.STRING, defaultValue: new Date().getMonth()},
    year: {type: DataTypes.STRING, defaultValue: new Date().getFullYear()},
    status: {type: DataTypes.INTEGER, defaultValue: 0}
}, {sequelize, tableName, paranoid: true});

/**
 * Run belonging and relationship before sync()
 */
// queryInterface.addColumn(tableName, 'balance', {
//     type: DataTypes.FLOAT,
//     defaultValue: 0.00
// });
sequelize.sync();
export default ModelTrack;