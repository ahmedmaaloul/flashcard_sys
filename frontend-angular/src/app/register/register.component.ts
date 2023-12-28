// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  //the method to handle the registration process
  register() {
    this.authService.register(this.username, this.password).subscribe(
      data => {
        this.authService.setToken(data.token);
        this.router.navigate(['/home']);
      },
      // Error callback
      error => console.error(error)
    );
  }
}
