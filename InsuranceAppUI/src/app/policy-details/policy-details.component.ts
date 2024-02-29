import { Component } from '@angular/core';
import { PolicyService } from '../Services/policy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Policy } from '../Model/model';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrl: './policy-details.component.css'
})
export class PolicyDetailsComponent {
  constructor(private policyService: PolicyService,
    private router: Router, private route: ActivatedRoute) {}

  id: number = 0;
  PolicyDetails: Policy[] = [];

  
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = +params['ID'];
      console.log(this.id)
    });

    this.policyService.GetPolicyDetail(this.id).subscribe(res => {
      if (res != null) {
        this.PolicyDetails = res ;
        console.log(this.PolicyDetails);
        console.log(typeof this.PolicyDetails);

      } 
      else {
        alert('Policy Does not exist ');
      }
    });
  }
  isPaymentDisabled(nextPremiumdue: Date): boolean {
    // Calculate the difference in milliseconds between the current date and the next premium due date
    const differenceInMs = new Date(nextPremiumdue).getTime() - Date.now();

    // Calculate the difference in days
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    // Return true if the difference is greater than 30 days, indicating the button should be disabled
    return differenceInDays > 30;
}

}
