import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FlashcardService } from '../services/flashcard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;   // we declare Highcharts as a type to enable its usage in the component
  chartOptions!: Highcharts.Options;   // and property to store Highcharts chart options
  totalFlashcards: number = 0;
  knownFlashcards: number = 0;

  constructor(private flashcardService: FlashcardService) {}   // constructor to inject FlashcardService dependency

  ngOnInit() {
    this.loadFlashcardData();
  }

  loadFlashcardData() {
    this.flashcardService.getTotalFlashcardsCount().subscribe(total => {
      this.totalFlashcards = total;
      this.flashcardService.getKnownFlashcardsCount().subscribe(known => {
        this.knownFlashcards = known;
        this.setupPieChart();
      });
    });
  }

  setupPieChart() {
    const unknownFlashcards = this.totalFlashcards - this.knownFlashcards;
    this.chartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Flashcard Known Status'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f} %)'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Flashcards',
        data: [
          { name: 'Known', y: this.knownFlashcards },
          { name: 'Unknown', y: unknownFlashcards }
        ]
      }]
    };
  }
}
