import { Injectable } from '@angular/core';
import { Policy, PolicyList } from '../Model/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  baseurl = 'https://localhost:44345/api/';
  constructor(private http: HttpClient) { }

  //getting policy details from backend
  GetPolicyDetail(PolicyId:number){
    console.log("service")
    return this.http.get<Policy[]>( 
    this.baseurl + `Policy/PolicyDetails/${PolicyId}`, 
  );
  }

  //method to get list of all the policies from backend
  GetAllUserPolicies(UserId:number){
    console.log(" serv GetAllUserPolicies")
    return this.http.get<PolicyList[]>( 
      this.baseurl + `Policy/UserPolicies/${UserId}`, 
    );
  }
}
