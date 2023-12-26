import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        const headers = new HttpHeaders({
            'authorization': `Bearer ${this.getToken()}`
        });

        return this.http.post<Flashcard>(this.apiUrl, flashcardData, { headers });
    }

    getTotalFlashcardsCount() {
        const headers = new HttpHeaders({
            'authorization': `Bearer ${this.getToken()}`
        });
        const retour = this.http.get<number>(`${this.apiUrl}/count`,{ headers });
        console.log(retour)
        return retour;

    }

    getKnownFlashcardsCount() {
        const headers = new HttpHeaders({
            'authorization': `Bearer ${this.getToken()}`
        });
        return this.http.get<number>(`${this.apiUrl}/known/count`,{ headers });
    }

    // Method to retrieve the token
    private getToken(): string {
        // Implement token retrieval logic
        // Usually, the token is stored in local storage or a cookie
        return localStorage.getItem('token') || '';
    }
}
