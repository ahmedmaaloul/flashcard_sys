import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import userRoutes from './routes/userRoutes';
import flashcardRoutes from './routes/flashcardRoutes';
import cors from 'cors';
const app: Application = express();
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



const swaggerSpec = swaggerJsdoc(options);
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/flashcards', flashcardRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
