import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginSignUpService {
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  baseurl = 'https://localhost:7256/api/';
  jwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  setToken(token: string) {
    localStorage.setItem("access_token", token);
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;

    const data = userInfo ? {
      userId: parseInt(userInfo.userId),
      fullname: userInfo.fullname,
      email: userInfo.email,
      role: userInfo.role,
      mobile: userInfo.mobile,
      pwd: userInfo.pwd,

    } : null;

    this.currentUser.next(data);

  }


  loginUser(users: Array<any>) {
    return this.http.post(
      this.baseurl + "User/LoginUser",
      {
      fullname: users[0],
      email: users[1],
      role: users[2],
      mobile: users[3],
      pwd: users[4],
        
      },
      {
        responseType: 'text',
      }
    );
  }

  SignUpUser(users: Array<any>) {
    return this.http.post(
      this.baseurl + "User/CreateUser",
      {
        name: users[0],
        password: users[1],
        
      },
      {
        responseType: 'text',
      }
    );
  }


}
