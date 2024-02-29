import { Component } from '@angular/core';
import { Policy, User } from '../Model/model';
import { PolicyService } from '../Services/policy.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-policies-list',
  templateUrl: './policies-list.component.html',
  styleUrl: './policies-list.component.css'
})
export class PoliciesListComponent {
  constructor(private policyService: PolicyService, private snackBar: MatSnackBar,
    private router: Router, private route: ActivatedRoute) {
  }
  
 ngOnInit(): void {
  this.getAllPolicies()
 }
  storedUser: User[] = [];
  PolicyList: Policy[] = [];

  policy: Policy = {
    policyId: 0,
    policyName: '',
    premiumAmount: 0,
    lastPremiumPaid: new Date(),
    nextPremiumdue: new Date(),
    policyDescription: '',
    policyType: ''
  };
  
  getAllPolicies() {
    function getUserIdFromToken(accessToken: string): string | null {
      const tokenParts = accessToken.split('.');
      if (tokenParts.length !== 3) {
          console.error('Invalid JWT format');
          return null;
      }
      const payload = JSON.parse(atob(tokenParts[1]));

      const userId = payload.id;
      return userId;
  }
  
  const storedUserData = localStorage.getItem('access_token');
  if (storedUserData != null) {
      const userId = getUserIdFromToken(storedUserData);
      console.log('User ID:', userId);
      if(userId !=null){
      const intUserId = +userId ;
      this.policyService.GetAllUserPolicies(intUserId).subscribe(
        res => {
          this.PolicyList = res;
          console.log(res);
        }
      );
    }
     
  } else {
      console.log('No data found in local storage');
  }
  }

  passPolicyDetailId(PolicyId: number){
    this.router.navigate(['/policiesdetails'],{
    queryParams:{
    ID:PolicyId,
  },
    });
    }
   
  
}


