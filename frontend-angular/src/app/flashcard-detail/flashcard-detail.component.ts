import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from '../services/flashcard.service';
import { Flashcard } from '../models/flashcard.model';

@Component({
  selector: 'app-flashcard-detail',
  templateUrl: './flashcard-detail.component.html',
  styleUrls: ['./flashcard-detail.component.css']
})
export class FlashcardDetailComponent implements OnInit {
  flashcard: Flashcard | null = null;

  constructor(
      private route: ActivatedRoute,
      private flashcardService: FlashcardService
  ) {}

  ngOnInit() {
    const cardId = this.route.snapshot.paramMap.get('cardId');
    if (cardId) {
      this.flashcardService.getFlashcardById(cardId).subscribe(
          (data: Flashcard) => this.flashcard = data,
          error => console.error('Error fetching flashcard:', error)
      );
    }
  }
  toggleKnownStatus() {
    if (this.flashcard && this.flashcard.cardId) {
      this.flashcardService.toggleKnownStatus(this.flashcard.cardId, !this.flashcard.knownStatus)
          .subscribe(
              () => {
                this.flashcard!.knownStatus = !this.flashcard!.knownStatus; // Update local state
                // Optionally, refresh the flashcard details or show a success message
              },
              error => console.error('Error updating known status:', error)
          );
    }
  }
}
