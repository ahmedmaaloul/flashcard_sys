// src/app/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

// Component decorator to define metadata for the component
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
    username: string | null = null;
  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.getUsername().subscribe(
        response => {
          this.username = response.username;
        },
        error => {
          console.error('Error fetching username:', error);
          // Handle error, maybe set username to null or show a message
        }
    );
  }
  logout() {   // the method to handle the logout process

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
