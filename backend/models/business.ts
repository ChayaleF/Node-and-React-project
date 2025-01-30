import { Model, DataTypes } from 'sequelize';
import sequelize from '../dataAccess/dataAccess';
import { User } from './user';

class Business extends Model {
  public id!: number;
  public businessName!: string;
  public businessDescription!: string;
  public businessEmail!: string;
  public businessPhone!: string;
}

Business.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull:false
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'business',
  }
);


export { Business };
