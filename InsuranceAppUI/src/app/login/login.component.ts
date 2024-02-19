import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginSignUpService } from '../login-sign-up.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginSignUpService: LoginSignUpService) {
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
          if (res == null) {
            alert('Email or password is incorrect');
          } else {
            this.loginSignUpService.setToken(res);
            alert('login successfully');
          }
        }
      );
    } 
    else{
      alert("check your credentials please")
    }
  }
 


  get email() {
    return this.loginForm.get('email');
  }

  get pwd() {
    return this.loginForm.get('pwd');
  }
}
