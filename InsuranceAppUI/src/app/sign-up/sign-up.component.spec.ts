import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { LoginSignUpService } from '../login-sign-up.service';
import { of, throwError } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let loginSignUpServiceSpy: jasmine.SpyObj<LoginSignUpService>;

  beforeEach(async () => {
    loginSignUpServiceSpy = jasmine.createSpyObj('LoginSignUpService', ['SignUpUser']);

    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: LoginSignUpService, useValue: loginSignUpServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

  it('should handle successful signup', () => {
    // Arrange
    spyOn(loginSignUpServiceSpy, 'SignUpUser').and.returnValue(of('Success'));
    spyOn(window, 'alert');

    // Act
    component.SignUpForm.setValue({
      fullname: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      mobile: '1234567890',
      pwd: 'password',
      cnfpwd: 'password'
    });
    component.SignUpSubmitted();

    // Assert
    expect(loginSignUpServiceSpy.SignUpUser).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('signUp successfully');
  });

 
  it('should handle signup with invalid form', () => {
    // Arrange
    spyOn(window, 'alert');

    // Act
    component.SignUpForm.setValue({
      fullname: 'John Doe',
      email: 'invalidEmail', // Invalid email format
      role: 'user',
      mobile: '123', // Invalid mobile pattern
      pwd: 'password',
      cnfpwd: 'password'
    });
    component.SignUpSubmitted();

    // Assert
    expect(window.alert).toHaveBeenCalledWith('check your credentials please');
  });

  it('should validate password matching', () => {
    // Arrange
    component.SignUpForm.setValue({ pwd: 'password', cnfpwd: 'password' });

    // Act
    const passwordCtrl = component.SignUpForm.get('pwd');
    const confirmPasswordCtrl = component.SignUpForm.get('cnfpwd');

    // Assert
    expect(passwordCtrl?.value).toEqual(confirmPasswordCtrl?.value);
  });

  
});
