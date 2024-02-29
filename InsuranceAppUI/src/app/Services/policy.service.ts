import { Injectable } from '@angular/core';
import { Policy } from '../Model/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  baseurl = 'https://localhost:44345/api/';
  constructor(private http: HttpClient) { }

  GetPolicyDetail(PolicyId:number){
    return this.http.get<Policy[]>( 
    this.baseurl + `Policy/PolicyDetails/${PolicyId}`, 
  );
  }

  GetAllUserPolicies(UserId:number){
    return this.http.get<Policy[]>( 
      this.baseurl + `Policy/UserPolicies/${UserId}`, 
    );
  }
}
