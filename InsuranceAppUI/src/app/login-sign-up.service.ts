import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class LoginSignUpService {
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  baseurl = 'https://localhost:44345/api/';
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
     
      mobile: userInfo.mobile,
      pwd: userInfo.pwd,

    } : null;

    this.currentUser.next(data);

  }
  encryptPassword(password: string): string {
    const key = 'mridul1234567890'; // Replace with your encryption key
    //const iv = CryptoJS.lib.WordArray.random(16); // Generate random initialization vector
    const encrypted = CryptoJS.AES.encrypt(password, key,{
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7 
    } ).toString(); 
   
    return encrypted;
  }

  loginUser(users: Array<any>) {
    return this.http.post(
      this.baseurl + "User/LoginUser",
      {
      email:users[0],
      
      password:users[1],
      
        
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
       fullname:users[0],
       email:users[1],
       mobile:users[2],
       password:users[3],
       
      
      },
      {
        responseType: 'text',
      }
    );
  }


}
