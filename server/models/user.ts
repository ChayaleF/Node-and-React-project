import { Model, DataTypes } from 'sequelize';
import sequelize from '../dataAccess/dataAccess';


class User extends Model {
  public id!: number;
  public userName!: string;
  public userPassword!: string;
  public userToken!: string;
  public userEmail!: string;

}

User.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userEmail: {
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

}, {
  sequelize,
  tableName: 'users',
});
export { User }


