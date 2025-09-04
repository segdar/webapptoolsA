import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private router: Router) {}

  onSubmit() {
    if (this.email && this.password) {
      // Here you can call your API for login
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      this.router.navigate(['/company']);
      alert('Login successful!');

    } else {
      alert('Please fill in all fields.');
    }
  }
}
