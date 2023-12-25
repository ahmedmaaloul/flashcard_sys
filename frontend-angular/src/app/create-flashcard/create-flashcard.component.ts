import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashcardService } from '../services/flashcard.service';

@Component({
  selector: 'app-create-flashcard',
  templateUrl: './create-flashcard.component.html',
  styleUrls: ['./create-flashcard.component.css']
})
export class CreateFlashcardComponent {
  flashcardForm: FormGroup;

  constructor(private flashcardService: FlashcardService, private formBuilder: FormBuilder) {
    this.flashcardForm = this.formBuilder.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      category: ['', Validators.required]
      // knownStatus and userId are typically set by the backend
    });
  }

  onSubmit() {
    if (this.flashcardForm.valid) {
      this.flashcardService.createFlashcard(this.flashcardForm.value).subscribe(
          response => {
            console.log('Flashcard created successfully.', response);
            // Handle post-creation logic (e.g., navigation or success message)
          },
          error => {
            console.error('Error occurred while creating flashcard:', error);
            // Handle error (e.g., showing an error message)
          }
      );
    }
  }
}
