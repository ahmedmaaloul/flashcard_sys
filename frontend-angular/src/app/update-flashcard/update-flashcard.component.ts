import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashcardService } from '../services/flashcard.service';
import { Flashcard } from '../models/flashcard.model';

@Component({
  selector: 'app-update-flashcard',
  templateUrl: './update-flashcard.component.html',
  styleUrls: ['./update-flashcard.component.css']
})
export class UpdateFlashcardComponent implements OnInit {
  flashcardForm: FormGroup;
  currentCardId: string;

  constructor(
      private flashcardService: FlashcardService,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router
  ) {
    this.flashcardForm = this.formBuilder.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      category: ['', Validators.required]
    });
    this.currentCardId = '';
  }
  ngOnInit() {
    this.currentCardId = this.route.snapshot.paramMap.get('cardId')!;
    this.loadFlashcardData();
  }
  loadFlashcardData() {
    this.flashcardService.getFlashcardById(this.currentCardId).subscribe(
        (flashcard: Flashcard) => {
          // Populate the form with the retrieved flashcard data
          this.flashcardForm.setValue({
            question: flashcard.question,
            answer: flashcard.answer,
            category: flashcard.category
          });
        },
        error => {
          console.error('Error fetching flashcard data:', error);
          // Handle error (e.g., flashcard not found or display an error message)
        }
    );
  }
  onSubmit() {
    if (this.flashcardForm.valid) {
      this.flashcardService.updateFlashcard(this.currentCardId, this.flashcardForm.value).subscribe(
          response => {
            console.log('Flashcard updated successfully.', response);
            // Navigate to another view, perhaps the flashcard list or details
            this.router.navigate(['/flashcards']);
          },
          error => {
            console.error('Error occurred while updating flashcard:', error);
            // Handle the error
          }
      );
    }
  }
}
