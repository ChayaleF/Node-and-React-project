import  sequelize  from '../dataAccess/dataAccess';
import { DataTypes } from 'sequelize';
  
 const Users = sequelize.define('Users', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userToken: {
        type: DataTypes.STRING,
        allowNull: false
      }
    
});
export {Users}