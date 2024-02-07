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

  it('should set token when login is successful', () => {
    const mockResponse = 'MockToken';
    loginSignUpServiceSpy.loginUser.and.returnValue(of(mockResponse));

    component.loginForm.setValue({
      email: 'test@example.com',
      pwd: 'password123',
    });

    component.loginSubmitted();

    expect(loginSignUpServiceSpy.loginUser).toHaveBeenCalledOnceWith([
      // Add your encrypted email and password mock values here
    ]);
    expect(loginSignUpServiceSpy.setToken).toHaveBeenCalledWith(mockResponse);
  });

  it('should show alert when login fails', () => {
    loginSignUpServiceSpy.loginUser.and.returnValue(of('Failure'));
    spyOn(window, 'alert');

    component.loginForm.setValue({
      email: 'test@example.com',
      pwd: 'wrongpassword',
    });

    component.loginSubmitted();

    expect(loginSignUpServiceSpy.loginUser).toHaveBeenCalledOnceWith([
      // Add your encrypted email and password mock values here
    ]);
    expect(window.alert).toHaveBeenCalledWith('Email or password is incorrect');
  });

  it('should show alert for invalid form', () => {
    spyOn(window, 'alert');
    
    component.loginSubmitted();

    expect(window.alert).toHaveBeenCalledWith('check your credentials please');
  });
});
