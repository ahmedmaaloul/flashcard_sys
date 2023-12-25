import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flashcard } from '../models/flashcard.model';
import { environment } from '../../environment';

@Injectable({
    providedIn: 'root'
})
export class FlashcardService {
    private apiUrl = environment.apiUrl + '/flashcards';

    constructor(private http: HttpClient) {}

    createFlashcard(flashcardData: Flashcard) {
        return this.http.post<Flashcard>(this.apiUrl, flashcardData);
    }

}
