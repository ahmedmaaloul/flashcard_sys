import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

export class User extends Model {
    public userId!: string;
    public username!: string;
    public password!: string;
}

User.init({
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    modelName: 'User',
    sequelize,
});
