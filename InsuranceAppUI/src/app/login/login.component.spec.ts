import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginSignUpService } from '../login-sign-up.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginSignUpServiceSpy: jasmine.SpyObj<LoginSignUpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoginSignUpService', ['loginUser', 'setToken']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: FormBuilder, useValue: new FormBuilder() },
        { provide: LoginSignUpService, useValue: spy },
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginSignUpServiceSpy = TestBed.inject(LoginSignUpService) as jasmine.SpyObj<LoginSignUpService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty email and password', () => {
    // Assert
    expect(component.loginForm.value.email).toBe('');
    expect(component.loginForm.value.pwd).toBe('');
  });

  it('should handle successful login', () => {
    // Arrange
    loginSignUpServiceSpy.loginUser.and.returnValue(of('token'));
    spyOn(window, 'alert');

    // Act
    component.loginForm.setValue({
      email: 'john@example.com',
      pwd: 'password'
    });
    component.loginSubmitted();

    // Assert
    expect(loginSignUpServiceSpy.loginUser).toHaveBeenCalledWith(['john@example.com', 'encryptedPassword', jasmine.any(String)]);
    expect(loginSignUpServiceSpy.setToken).toHaveBeenCalledWith('token');
    expect(window.alert).toHaveBeenCalledWith('login successfully');
  });

  it('should handle login with invalid credentials', () => {
    // Arrange
    spyOn(window, 'alert');

    // Act
    component.loginForm.setValue({
      email: 'john@example.com',
      pwd: 'password'
    });
    component.loginSubmitted();

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Email or password is incorrect');
  });

  it('should handle login with invalid form', () => {
    // Arrange
    spyOn(window, 'alert');

    // Act
    component.loginForm.setValue({
      email: 'invalidEmail', // Invalid email format
      pwd: 'password'
    });
    component.loginSubmitted();

    // Assert
    expect(window.alert).toHaveBeenCalledWith('check your credentials please');
  });
  
});
