export interface Flashcard {
    cardId?: string; // Not needed for creation, but may be useful for other operations
    question: string;
    answer: string;
    category: string;
    knownStatus?: boolean; // This can be optional if set by default on the backend
    userId?: string; // Typically set by the backend, not by the front-end form
}
