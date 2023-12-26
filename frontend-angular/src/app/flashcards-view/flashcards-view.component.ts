import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../services/flashcard.service';
import { Router } from '@angular/router';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Flashcard } from '../models/flashcard.model';


@Component({
  selector: 'app-flashcards-view',
  templateUrl: './flashcards-view.component.html',
  styleUrls: ['./flashcards-view.component.css']
})
export class FlashcardsViewComponent implements OnInit {
  columnDefs: ColDef[];
  rowData: any;

  constructor(private flashcardService: FlashcardService, private router: Router) {
    this.columnDefs = [
      { field: 'question', flex: 1 }, // Add flex property here
      { field: 'answer', width: 100 }, // You may assign fixed width to other columns
      { field: 'category', width: 120 },
      { field: 'knownStatus', width: 120 },
      {
        field: 'actions',
        width: 160, // Assign a fixed width for the actions column
        cellRenderer: (params: ICellRendererParams) => this.actionCellRenderer(params)
      }
    ];
  }

  ngOnInit() {
    this.loadFlashcards();
  }

  loadFlashcards() {
    this.flashcardService.getAllFlashcards().subscribe(
        data => this.rowData = data,
        error => console.error('Error fetching flashcards:', error)
    );
  }

  actionCellRenderer(params:any) {
    const updateButton = document.createElement('button');
    updateButton.innerHTML = '<i class="fas fa-edit"></i>'; // Stylo icon for update
    updateButton.onclick = () => this.updateFlashcard(params.data.cardId);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Bin icon for delete
    deleteButton.onclick = () => this.deleteFlashcard(params.data.cardId);

    const toggleStatusButton = document.createElement('button');
    toggleStatusButton.innerHTML = params.data.knownStatus ? '<i class="fas fa-times-circle"></i>' : '<i class="fas fa-check-circle"></i>'; // Icon for toggle status
    toggleStatusButton.onclick = () => this.toggleKnownStatus(params.data.cardId, !params.data.knownStatus);

    const viewButton = document.createElement('button');
    viewButton.innerHTML = '<i class="fas fa-eye"></i>'; // Eye icon for view
    viewButton.onclick = () => this.viewFlashcard(params.data.cardId);

    const actionsSpan = document.createElement('span');
    actionsSpan.appendChild(viewButton);
    actionsSpan.appendChild(updateButton);
    actionsSpan.appendChild(deleteButton);
    actionsSpan.appendChild(toggleStatusButton);
    return actionsSpan;
  }

  viewFlashcard(cardId: string) {
    this.router.navigate(['/flashcards', cardId]);
  }

  updateFlashcard(cardId: string) {
    this.router.navigate(['/update-flashcard', cardId]);
  }

  deleteFlashcard(cardId: string) {
    if (confirm('Are you sure you want to delete this flashcard?')) {
      this.flashcardService.deleteFlashcard(cardId).subscribe(
          () => {
            this.rowData = this.rowData.filter((flashcard: Flashcard) => flashcard.cardId !== cardId);
            alert('Flashcard deleted successfully.');
          },
          error => {
            console.error('Error occurred while deleting flashcard:', error);
            alert('Failed to delete flashcard.');
          }
      );
    }
  }


  toggleKnownStatus(cardId: string, status: boolean) {
    this.flashcardService.toggleKnownStatus(cardId, status).subscribe(
        () => {
          // Update rowData with the modified flashcard
          this.rowData = this.rowData.map((fc: Flashcard) => {
            if (fc.cardId === cardId) {
              return { ...fc, knownStatus: status };
            }
            return fc;
          });
          alert(`Flashcard marked as ${status ? 'known' : 'unknown'}.`);
        },
        error => {
          console.error('Error occurred while updating flashcard status:', error);
          alert('Failed to update flashcard status.');
        }
    );
  }



}
