"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const flashcardRoutes_1 = __importDefault(require("./routes/flashcardRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
// Swagger configuration
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Flashcard System API',
            version: '1.0.0',
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Local server' },
        ],
    },
    apis: ['./routes/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.use((0, cors_1.default)());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/user', userRoutes_1.default);
app.use('/api/flashcards', flashcardRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=app.js.map