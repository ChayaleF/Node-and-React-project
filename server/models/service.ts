import { Model, DataTypes } from 'sequelize';
import sequelize from '../dataAccess/dataAccess';

class Service extends Model {
    public id!: number;
    public serviceName!: string;
    public serviceDescription!: string;
    public serviceCost!: number;
    public serviceDuration!: number;

}

Service.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    serviceName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serviceDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serviceCost: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    serviceDuration: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        sequelize,
        tableName: 'services',
    });

export { Service }
