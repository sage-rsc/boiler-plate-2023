/**
 * Slantapp code and properties {www.slantapp.io}
 */
import ModelTrack from './model.track.js';
import ModelUser from './model.user.js';

ModelUser.hasMany(ModelTrack, {as: 'Polyline', foreignKey: 'uid', onDelete: 'cascade', constraints: false});
ModelTrack.belongsTo(ModelUser, {as: "User", foreignKey: 'uid', onDelete: 'cascade', constraints: false})

export {
    ModelTrack,
    ModelUser
}
