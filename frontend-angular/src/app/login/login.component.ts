// src/app/login/login.component.ts
import { Component } from '@angular/core';
// Import authentication service
import { AuthService } from '../auth.service'; 
// Import Angular Router for navigation
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  // Properties to store username and password entered by the user
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      data => {
        this.authService.setToken(data.token);
        this.router.navigate(['/home']);
      },
      // Error callback
      error => console.error(error)
    );
  }
}
