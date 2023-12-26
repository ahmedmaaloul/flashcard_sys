import { Request, Response } from 'express';
import { Flashcard } from '../models/flashcard';
import { v4 as uuidv4 } from 'uuid';
export const createFlashcard = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId; // The user ID extracted from the token
    console.log(userId)
    console.log(req)
    const { question, answer, category } = req.body;
    const  knownStatus= false;
    try {
        const cardId = uuidv4();
        const flashcard = await Flashcard.create({
            cardId,
            question,
            answer,
            category,
            knownStatus,
            userId
        });
        res.status(201).json(flashcard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteFlashcard = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;
        await Flashcard.destroy({ where: { cardId } });
        res.status(200).send('Flashcard deleted');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateFlashcard = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;
        const updated = await Flashcard.update(req.body, { where: { cardId } });
        if (updated[0] > 0) {
            res.status(200).send('Flashcard updated');
        } else {
            res.status(404).send('Flashcard not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllUserFlashcards = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body; // Or get from JWT token if implemented
        const flashcards = await Flashcard.findAll({ where: { userId } });
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFlashcardsByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.params;
        const flashcards = await Flashcard.findAll({ where: { category } });
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const markFlashcardAsKnown = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;
        const updated = await Flashcard.update({ knownStatus: true }, { where: { cardId } });
        if (updated[0] > 0) {
            res.status(200).send('Flashcard marked as known');
        } else {
            res.status(404).send('Flashcard not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getFlashcardById = async (req, res) => {
    const { cardId } = req.params;

    try {
        const flashcard = await Flashcard.findOne({ where: { cardId } });
        if (!flashcard) {
            res.status(404).send('Flashcard not found');
            return;
        }
        res.json(flashcard);
    } catch (error) {
        res.status(500).send('Error retrieving flashcard');
    }
};
export const getTotalFlashcardsCount = async (req, res) => {
    try {
        // Correct usage of the count method
        const count = await Flashcard.count(); // This counts all flashcards
        res.json(count); // Send the count as an object
    } catch (error) {
        res.status(500).send('Error getting total flashcards count');
    }
};

export const getKnownFlashcardsCount = async (req, res) => {
    try {
        const count = await Flashcard.count({ where: { knownStatus: true } });
        res.json(count);
    } catch (error) {
        res.status(500).send('Error getting known flashcards count');
    }
};