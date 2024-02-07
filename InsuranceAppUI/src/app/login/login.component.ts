import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { LoginSignUpService } from '../login-sign-up.service';

const secretKey = 'abc123'; // Replace with your actual secret key
const iv = CryptoJS.lib.WordArray.random(32); // Initialization Vector

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
      const encryptedEmail = CryptoJS.AES.encrypt(this.email?.value, secretKey, { iv }).toString();
      const encryptedPassword = CryptoJS.AES.encrypt(this.pwd?.value, secretKey, { iv }).toString();

      this.loginSignUpService.loginUser([
        encryptedEmail,
        encryptedPassword
      ]).subscribe(
        (res) => {
          if (res == null) {
            alert('Email or password is incorrect');
          } else {
            this.loginSignUpService.setToken(res);
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
