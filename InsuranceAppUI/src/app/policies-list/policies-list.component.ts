import { Component } from '@angular/core';
import { PolicyList, User } from '../Model/model';
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
    private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAllPolicies()
  }

  storedUser: User[] = [];
  PolicyList: PolicyList[] = [];

  //method to get list of all the policies from PolicyService
  getAllPolicies() {
    function getUserIdFromToken(accessToken: string): string | null {
      const tokenParts = accessToken.split('.');
      if (tokenParts.length !== 3) {
        return null;
      }
      const payload = JSON.parse(atob(tokenParts[1]));
      const userId = payload.id;
      return userId;
    }
    const storedUserData = localStorage.getItem('access_token');
    if (storedUserData != null) {
      const userId = getUserIdFromToken(storedUserData);
      if (userId != null) {
        const intUserId = +userId;
        this.policyService.GetAllUserPolicies(intUserId).subscribe(
          res => {
            this.PolicyList = res;
          }
        );
      }
    }
  }

  //sending PolicyId to policiesdetails component
  passPolicyDetailId(PolicyId: number) {
    this.router.navigate(['/policiesdetails'], {
      queryParams: {
        ID: PolicyId,
      },
    });
  }
}