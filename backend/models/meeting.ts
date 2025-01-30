import { Model, DataTypes, INTEGER } from 'sequelize';
import sequelize from '../dataAccess/dataAccess';
import { User } from './user';
import { Service } from './service';
class Meeting extends Model {
  public id!: number;
  public meetingDate!: Date;
  public userId!: number;
  public serviceId!:number;
};
Meeting.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  meetingDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,

  }
},

  {
    sequelize,
    tableName: 'meetings',
  });

Meeting.belongsTo(User, { foreignKey: 'userId' });
Meeting.belongsTo(Service, { foreignKey: 'serviceId' });
export { Meeting };


