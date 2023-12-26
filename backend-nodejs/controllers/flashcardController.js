"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKnownFlashcardsCount = exports.toggleKnownStatus = exports.getTotalFlashcardsCount = exports.getFlashcardById = exports.markFlashcardAsKnown = exports.getFlashcardsByCategory = exports.getAllUserFlashcards = exports.updateFlashcard = exports.deleteFlashcard = exports.createFlashcard = void 0;
const flashcard_1 = require("../models/flashcard");
const uuid_1 = require("uuid");
const createFlashcard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId; // The user ID extracted from the token
    console.log(userId);
    console.log(req);
    const { question, answer, category } = req.body;
    const knownStatus = false;
    try {
        const cardId = (0, uuid_1.v4)();
        const flashcard = yield flashcard_1.Flashcard.create({
            cardId,
            question,
            answer,
            category,
            knownStatus,
            userId
        });
        res.status(201).json(flashcard);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createFlashcard = createFlashcard;
const deleteFlashcard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardId } = req.params;
        yield flashcard_1.Flashcard.destroy({ where: { cardId } });
        res.status(200).send('Flashcard deleted');
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteFlashcard = deleteFlashcard;
const updateFlashcard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardId } = req.params;
        const updated = yield flashcard_1.Flashcard.update(req.body, { where: { cardId } });
        if (updated[0] > 0) {
            res.status(200).send('Flashcard updated');
        }
        else {
            res.status(404).send('Flashcard not found');
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateFlashcard = updateFlashcard;
const getAllUserFlashcards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = req.userId;
        const flashcards = yield flashcard_1.Flashcard.findAll({ where: { userId } });
        res.json(flashcards);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllUserFlashcards = getAllUserFlashcards;
const getFlashcardsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const flashcards = yield flashcard_1.Flashcard.findAll({ where: { category } });
        res.json(flashcards);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getFlashcardsByCategory = getFlashcardsByCategory;
const markFlashcardAsKnown = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardId } = req.params;
        const updated = yield flashcard_1.Flashcard.update({ knownStatus: true }, { where: { cardId } });
        if (updated[0] > 0) {
            res.status(200).send('Flashcard marked as known');
        }
        else {
            res.status(404).send('Flashcard not found');
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.markFlashcardAsKnown = markFlashcardAsKnown;
const getFlashcardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cardId } = req.params;
    try {
        const flashcard = yield flashcard_1.Flashcard.findOne({ where: { cardId } });
        if (!flashcard) {
            res.status(404).send('Flashcard not found');
            return;
        }
        res.json(flashcard);
    }
    catch (error) {
        res.status(500).send('Error retrieving flashcard');
    }
});
exports.getFlashcardById = getFlashcardById;
const getTotalFlashcardsCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Correct usage of the count method
        const count = yield flashcard_1.Flashcard.count(); // This counts all flashcards
        res.json(count); // Send the count as an object
    }
    catch (error) {
        res.status(500).send('Error getting total flashcards count');
    }
});
exports.getTotalFlashcardsCount = getTotalFlashcardsCount;
const toggleKnownStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cardId } = req.params;
    const { knownStatus } = req.body;
    try {
        // Find the flashcard by ID
        const flashcard = yield flashcard_1.Flashcard.findByPk(cardId);
        if (!flashcard) {
            return res.status(404).send('Flashcard not found');
        }
        // Update the known status
        flashcard.knownStatus = knownStatus;
        yield flashcard.save();
        res.status(200).json(flashcard);
    }
    catch (error) {
        res.status(500).send('Error updating flashcard status');
    }
});
exports.toggleKnownStatus = toggleKnownStatus;
const getKnownFlashcardsCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield flashcard_1.Flashcard.count({ where: { knownStatus: true } });
        res.json(count);
    }
    catch (error) {
        res.status(500).send('Error getting known flashcards count');
    }
});
exports.getKnownFlashcardsCount = getKnownFlashcardsCount;
//# sourceMappingURL=flashcardController.js.map