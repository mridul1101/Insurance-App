
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { LoginSignUpService } from '../login-sign-up.service';

const secretKey = 'abc123'; // Replace with your actual secret key
const iv = CryptoJS.lib.WordArray.random(32); // Initialization Vector

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent {
  
  SignUpForm: FormGroup;
  

  constructor(private fb: FormBuilder, private loginSignUpService: LoginSignUpService) {
    this.SignUpForm = this.fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      pwd: ['', [Validators.required, Validators.minLength(8)]],
      cnfpwd: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

    // ... other controls
   

  SignUpSubmitted() {
    
    const encryptedfullname = CryptoJS.AES.encrypt(this.fullname?.value, secretKey, { iv }).toString();
    const encryptedEmail = CryptoJS.AES.encrypt(this.email?.value, secretKey, { iv }).toString();
    const encryptedrole = CryptoJS.AES.encrypt(this.role?.value, secretKey, { iv }).toString();
    const encryptedmobile = CryptoJS.AES.encrypt(this.mobile?.value, secretKey, { iv }).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(this.pwd?.value, secretKey, { iv }).toString();
    
    
    if (this.SignUpForm.valid) {
        this.loginSignUpService.SignUpUser([
          encryptedfullname,
          encryptedEmail,
          encryptedrole,
          encryptedmobile,
          encryptedPassword

        ]).subscribe(res => {
          if (res == 'Failure') {
            // this.isUserValid = false;
            alert('kindly check our policies');
          } else {
            // this.isUserValid = true;
            alert("signUp successfully")
          }
        });
    }
    else{
      alert("check your credentials please")
    }
  }

  get fullname() {
    return this.SignUpForm.get('fullname');
  }

  get email() {
    return this.SignUpForm.get('email');
  }

  get role() {
    return this.SignUpForm.get('role');
  }

  get mobile() {
    return this.SignUpForm.get('mobile');
  }

  get pwd() {
    return this.SignUpForm.get('pwd');
  }

  get cnfpwd() {
    return this.SignUpForm.get('cnfpwd');
  }

  private passwordMatchValidator(form: FormGroup) {
    const pwd = form.get('pwd')?.value;
    const cnfpwd = form.get('cnfpwd')?.value;
    return pwd === cnfpwd ? null : { passwordMismatch: true };
  }
}
