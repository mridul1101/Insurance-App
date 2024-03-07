import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { LoginSignUpService } from '../Services/login-sign-up.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginSignUpServiceSpy: jasmine.SpyObj<LoginSignUpService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    // Create a spy object for the LoginSignUpService
    loginSignUpServiceSpy = jasmine.createSpyObj('LoginSignUpService', ['encryptPassword', 'loginUser', 'setToken']);

    // Create a spy object for the MatSnackBar
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule], // Import BrowserAnimationsModule
      providers: [
        FormBuilder,
        { provide: LoginSignUpService, useValue: loginSignUpServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents(); // Compile the component

    // Create an instance of the component and its associated fixture
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the component', () => {
    // Assert that the component instance is created successfully
    expect(component).toBeTruthy();
  });


  it('should handle login submission with valid credentials', () => {
    // Arrange
    const email = 'test@example.com';
    const password = 'password';
    const encryptedPassword = 'encryptedPassword';
    const token = 'token';
    loginSignUpServiceSpy.encryptPassword.and.returnValue(encryptedPassword);
    loginSignUpServiceSpy.loginUser.and.returnValue(of(token));

    // Act: Patch the form values and trigger login submission
    component.loginForm.patchValue({ email, pwd: password });
    component.loginSubmitted();

    expect(loginSignUpServiceSpy.encryptPassword).toHaveBeenCalledWith(password);
    expect(loginSignUpServiceSpy.loginUser).toHaveBeenCalledWith([email, encryptedPassword]);
    expect(loginSignUpServiceSpy.setToken).toHaveBeenCalledWith(token);
  });

  it('should have email and pwd controls with required validators', () => {
    expect(component.email?.errors?.['required']).toBeTruthy();
    expect(component.pwd?.errors?.['required']).toBeTruthy();
  });

  it('should display snack bar message for incorrect email or password', () => {
    // Arrange
    component.loginForm.patchValue({ email: 'test@example.com', pwd: 'password' });
    loginSignUpServiceSpy.loginUser.and.returnValue(of('Fail'));

    
    component.loginSubmitted();

    
    expect(snackBarSpy.open).toHaveBeenCalledWith('Email or password is incorrect', 'Close', { duration: 3000 });
  });

  it('should handle invalid form submission', () => {

    component.loginSubmitted();

    // Assert: Verify that MatSnackBar's open method was called with correct parameters
    expect(snackBarSpy.open).toHaveBeenCalledWith('Check your credentials please', 'Close', { duration: 3000 });
  });
});
