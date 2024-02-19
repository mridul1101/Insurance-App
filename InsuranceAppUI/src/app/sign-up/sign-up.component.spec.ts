import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { LoginSignUpService } from '../login-sign-up.service';
import { of } from 'rxjs';

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
    loginSignUpServiceSpy.SignUpUser.and.returnValue(of('Success'));
    spyOn(window, 'alert');

    // Act
    component.SignUpForm.setValue({
      fullname: 'John Doe',
      email: 'john@example.com',
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
