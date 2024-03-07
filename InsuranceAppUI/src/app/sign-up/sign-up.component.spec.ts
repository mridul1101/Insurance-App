import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginSignUpService } from '../Services/login-sign-up.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let loginSignUpServiceSpy: jasmine.SpyObj<LoginSignUpService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    loginSignUpServiceSpy = jasmine.createSpyObj('LoginSignUpService', ['SignUpUser']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: LoginSignUpService, useValue: loginSignUpServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call SignUpUser method of service when form is valid', () => {
    // Arrange
    const testData = {
      fullname: 'John Doe',
      email: 'john@example.com',
      mobile: '1234567890',
      pwd: 'Password123!',
      cnfpwd: 'Password123!'
    };
    component.SignUpForm.setValue(testData);
    loginSignUpServiceSpy.SignUpUser.and.returnValue(of('Success'));

    // Act
    component.SignUpSubmitted();

    // Assert
    expect(loginSignUpServiceSpy.SignUpUser).toHaveBeenCalledWith([
      testData.fullname,
      testData.email,
      testData.mobile,
      testData.pwd
    ]);
  });



  it('should validate password matching', () => {
    // Arrange
    const password = 'password';
    component.SignUpForm.controls['pwd'].setValue(password);
    component.SignUpForm.controls['cnfpwd'].setValue(password);

    // Act
    const passwordCtrl = component.SignUpForm.get('pwd');
    const confirmPasswordCtrl = component.SignUpForm.get('cnfpwd');

    // Assert
    expect(passwordCtrl?.value).toEqual(confirmPasswordCtrl?.value);
  });

});
