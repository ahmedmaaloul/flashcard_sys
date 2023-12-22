import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

export class Flashcard extends Model {
    public cardId!: string;
    public question!: string;
    public answer!: string;
    public category!: string;
    public knownStatus!: boolean;
    public userId!:string;
}

Flashcard.init({
    cardId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    question: {
        type: new DataTypes.STRING(256),
        allowNull: false,
    },
    answer: {
        type: new DataTypes.STRING(256),
        allowNull: false,
    },
    category: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    knownStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    tableName: 'Flashcard',
    sequelize,
});
