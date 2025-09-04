import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth.service';

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
  constructor(private router: Router,private _auth:AuthService) {}

  onSubmit() {
    if (this.email && this.password) {
      // Here you can call your API for login
      this._auth.getVerification({Username:this.email.trim(),Password:this.password.trim()}).subscribe({
        next: (data) => {
          this.router.navigate(['/company']);
        }, 
        error: (error)=> {
          console.log("error",error);
           alert('Usuario or constraseña invalida');
        }
      })
      

    } else {
      alert('Usuario or constraseña invalida');
    }
  }
}
