import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginSignUpService } from './login-sign-up.service';
import { BehaviorSubject } from 'rxjs';

describe('LoginSignUpService', () => {
  let service: LoginSignUpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginSignUpService]
    });
    service = TestBed.inject(LoginSignUpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should encrypt password', () => {
    const password = 'password';
    const encrypted = service.encryptPassword(password);
    expect(encrypted).toBeTruthy();
  });

  it('should login user', () => {
    const userData = {
      email: 'test@example.com',
      password: 'password',
      iv: 'iv_value'
    };
    const mockResponse = 'Success';

    service.loginUser([userData.email, userData.password, userData.iv]).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://localhost:44345/api/User/LoginUser');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should sign up user', () => {
    const userData = {
      fullname: 'Test User',
      email: 'test@example.com',
      mobile: '1234567890',
      password: 'password'
    };
    const mockResponse = 'Success';

    service.SignUpUser([userData.fullname, userData.email, userData.mobile, userData.password]).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://localhost:44345/api/User/CreateUser');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
