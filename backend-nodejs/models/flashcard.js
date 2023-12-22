"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flashcard = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
class Flashcard extends sequelize_1.Model {
}
exports.Flashcard = Flashcard;
Flashcard.init({
    cardId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    question: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false,
    },
    answer: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: false,
    },
    category: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    knownStatus: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
}, {
    tableName: 'Flashcard',
    sequelize: database_1.sequelize,
});
//# sourceMappingURL=flashcard.js.map