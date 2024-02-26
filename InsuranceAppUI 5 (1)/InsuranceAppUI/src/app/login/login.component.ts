import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginSignUpService } from '../login-sign-up.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginSignUpService: LoginSignUpService,    private snackBar: MatSnackBar,private router: Router
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required]]
    });
  }

  loginSubmitted() {
    if (this.loginForm.valid) {
     
      const emailValue = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('pwd')?.value ?? '';
      const encryptPass=this.loginSignUpService.encryptPassword(password);
      
      this.loginSignUpService.loginUser([
        emailValue,encryptPass
      ]).subscribe(
        (res) => {
          if (res == "Fail" || res == "null") {
            this.snackBar.open('Email or password is incorrect', 'Close', {
              duration: 3000
            });
          } else {
            this.loginSignUpService.setToken(res);
            this.snackBar.open('Login successfully', 'Close', {
              duration: 3000
            });
            
            this.router.navigate(['/policieslist']);

            this.loginForm.reset();
          }
        }
      );
    } 
    else{
      this.snackBar.open('Check your credentials please', 'Close', {
        duration: 3000
      });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get pwd() {
    return this.loginForm.get('pwd');
  }
}
