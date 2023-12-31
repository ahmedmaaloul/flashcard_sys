import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import {CreateFlashcardComponent} from "./create-flashcard/create-flashcard.component";
import {UpdateFlashcardComponent} from "./update-flashcard/update-flashcard.component";
import {FlashcardsViewComponent} from "./flashcards-view/flashcards-view.component";
import {FlashcardDetailComponent} from "./flashcard-detail/flashcard-detail.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-flashcard', component: CreateFlashcardComponent },
  { path: 'update-flashcard/:cardId', component: UpdateFlashcardComponent},
  { path:'manage-flashcards',component:FlashcardsViewComponent},
  { path: 'flashcards/:cardId', component: FlashcardDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
