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
exports.markFlashcardAsKnown = exports.getFlashcardsByCategory = exports.getAllUserFlashcards = exports.updateFlashcard = exports.deleteFlashcard = exports.createFlashcard = void 0;
const flashcard_1 = require("../models/flashcard");
const createFlashcard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId; // The user ID extracted from the token
    const { question, answer, category } = req.body;
    try {
        const flashcard = yield flashcard_1.Flashcard.create({
            question,
            answer,
            category,
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
        const { userId } = req.body; // Or get from JWT token if implemented
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
//# sourceMappingURL=flashcardController.js.map