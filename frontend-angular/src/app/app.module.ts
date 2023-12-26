import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { CreateFlashcardComponent } from './create-flashcard/create-flashcard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { UpdateFlashcardComponent } from './update-flashcard/update-flashcard.component';
import { FlashcardsViewComponent } from './flashcards-view/flashcards-view.component';
import { AgGridModule } from 'ag-grid-angular';
import { FlashcardDetailComponent } from './flashcard-detail/flashcard-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    CreateFlashcardComponent,
    UpdateFlashcardComponent,
    FlashcardsViewComponent,
    FlashcardDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    AppRoutingModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
