"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flashcardController = __importStar(require("../controllers/flashcardController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Flashcard:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *         - category
 *         - userId
 *       properties:
 *         cardId:
 *           type: string
 *           format: uuid
 *         question:
 *           type: string
 *         answer:
 *           type: string
 *         category:
 *           type: string
 *         knownStatus:
 *           type: boolean
 *         userId:
 *           type: string
 *           format: uuid
 *       example:
 *         question: "What is the capital of France?"
 *         answer: "Paris"
 *         category: "Geography"
 *         knownStatus: false
 *         userId: "123e4567-e89b-12d3-a456-426614174000"
 *
 * /api/flashcards:
 *   post:
 *     tags:
 *       - Flashcards
 *     summary: Create a new flashcard
 *     description: Creates a new flashcard for the user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flashcard'
 *     responses:
 *       201:
 *         description: Flashcard created successfully
 *       400:
 *         description: Bad request
 *   get:
 *     tags:
 *       - Flashcards
 *     summary: Get all user flashcards
 *     description: Retrieves all flashcards for a specific user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of flashcards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flashcard'
 *
 * /api/flashcards/{cardId}:
 *   delete:
 *     tags:
 *       - Flashcards
 *     summary: Delete a flashcard
 *     description: Deletes a specific flashcard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The flashcard ID
 *     responses:
 *       200:
 *         description: Flashcard deleted successfully
 *       404:
 *         description: Flashcard not found
 *   put:
 *     tags:
 *       - Flashcards
 *     summary: Update a flashcard
 *     description: Updates a specific flashcard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The flashcard ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flashcard'
 *     responses:
 *       200:
 *         description: Flashcard updated successfully
 *       404:
 *         description: Flashcard not found
 *
 * /api/flashcards/category/{category}:
 *   get:
 *     tags:
 *       - Flashcards
 *     summary: Get flashcards by category
 *     description: Retrieves flashcards belonging to a specific category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The flashcard category
 *     responses:
 *       200:
 *         description: A list of flashcards in the specified category
 *
 * /api/flashcards/{cardId}/knownStatus:
 *   patch:
 *     tags:
 *       - Flashcards
 *     summary: Mark a flashcard as known
 *     description: Marks a specific flashcard's known status as true
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The flashcard ID
 *     responses:
 *       200:
 *         description: Flashcard marked as known
 *       404:
 *         description: Flashcard not found
 */
/**
 * @openapi
 * /api/flashcards/{cardId}:
 *   get:
 *     tags:
 *       - Flashcards
 *     summary: Get a single flashcard
 *     description: Retrieves a specific flashcard by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The flashcard ID
 *     responses:
 *       200:
 *         description: A single flashcard
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flashcard'
 *       404:
 *         description: Flashcard not found
 *       500:
 *         description: Internal server error
 */
/**
 * @openapi
 * /api/flashcards/count:
 *   get:
 *     tags:
 *       - Flashcards
 *     summary: Get total flashcards count
 *     description: Retrieves the total count of flashcards
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total flashcards count
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *       500:
 *         description: Internal server error
 *
 * /api/flashcards/known/count:
 *   get:
 *     tags:
 *       - Flashcards
 *     summary: Get known flashcards count
 *     description: Retrieves the count of flashcards marked as known
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Known flashcards count
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *       500:
 *         description: Internal server error
 */
/**
 * @openapi
 * /api/flashcards/{cardId}/knownStatus:
 *   patch:
 *     tags:
 *       - Flashcards
 *     summary: Toggle the known status of a flashcard
 *     description: Marks a flashcard as known or unknown
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the flashcard
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               knownStatus:
 *                 type: boolean
 *                 description: New known status of the flashcard
 *     responses:
 *       200:
 *         description: Known status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flashcard'
 *       404:
 *         description: Flashcard not found
 *       500:
 *         description: Internal server error
 *
 * /api/flashcards/count:
 *   get:
 *     tags:
 *       - Flashcards
 *     summary: Get total flashcards count
 *     description: Retrieves the total count of flashcards
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total flashcards count
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *       500:
 *         description: Internal server error
 *
 * /api/flashcards/known/count:
 *   get:
 *     tags:
 *       - Flashcards
 *     summary: Get known flashcards count
 *     description: Retrieves the count of flashcards marked as known
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Known flashcards count
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware_1.default, flashcardController.createFlashcard);
router.get('/count', authMiddleware_1.default, flashcardController.getTotalFlashcardsCount);
router.get('/known/count', authMiddleware_1.default, flashcardController.getKnownFlashcardsCount);
router.get('/', authMiddleware_1.default, flashcardController.getAllUserFlashcards);
router.get('/category/:category', authMiddleware_1.default, flashcardController.getFlashcardsByCategory);
router.get('/:cardId', authMiddleware_1.default, flashcardController.getFlashcardById);
router.delete('/:cardId', authMiddleware_1.default, flashcardController.deleteFlashcard);
router.patch('/:cardId/knownStatus', authMiddleware_1.default, flashcardController.toggleKnownStatus);
exports.default = router;
//# sourceMappingURL=flashcardRoutes.js.map