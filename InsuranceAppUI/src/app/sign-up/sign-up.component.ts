import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginSignUpService } from '../login-sign-up.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
   repeatpass:string='none'

  constructor(private fb: FormBuilder, private loginSignUpService: LoginSignUpService, private snackBar: MatSnackBar,private router: Router) { }

  SignUpForm = new FormGroup({
    fullname: new FormControl('', [Validators.required, 
    Validators.maxLength(50),
     Validators.pattern(/^[a-zA-Z\s]*$/),    // Only letters and spaces allowed
     Validators.pattern(/^[a-zA-Z]*\s?[a-zA-Z]*$/),
     Validators.pattern(/^[^!@#$%^&*(),.?":{}|<>]*$/)]),  // No special characters allowed 
    email: new FormControl('', [Validators.required, Validators.email]),
    
    mobile: new FormControl('', [Validators.required, Validators.minLength(10)
      ,Validators.maxLength(10), Validators.pattern(/^\d+$/)]),

    pwd: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
    cnfpwd: new FormControl('', [Validators.required,]),
    
  },);
  

  
  SignUpSubmitted() {
if (this.pwd?.value==this.cnfpwd?.value){
    const fullnameValue = this.SignUpForm.get('fullname')?.value ?? '';
    const emailValue = this.SignUpForm.get('email')?.value ?? '';
    
    const mobileValue = this.SignUpForm.get('mobile')?.value ?? '';
    const pwdValue = this.SignUpForm.get('pwd')?.value ?? '';

  
  
    //const encryptPass=this.loginSignUpService.encryptPassword(pwdValue);

    if (this.SignUpForm.valid) {
      console.log(this.SignUpForm);
      this.loginSignUpService.SignUpUser([
        fullnameValue,
        emailValue,
        mobileValue,
        pwdValue

      ]).subscribe(res => {
        if (res == 'FAILURE') {
          
          this.snackBar.open('The User already exist! Please Login', 'Close', {
            duration: 3000
          });
        } else {
          
          this.snackBar.open('SignUp Successfull', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/login']);
          this.SignUpForm.reset();
        }
      });
    }
    else {
      this.snackBar.open('Check your credential please', 'Close', {
        duration: 3000
      });
    }
  }
  else {  this.snackBar.open('Confirm Password is not same as Password', 'Close', {
    duration: 3000
  });}
  }  
  get fullname() {
    return this.SignUpForm.get('fullname');
  }

  get email() {
    return this.SignUpForm.get('email');
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
