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
    private router: Router, private route: ActivatedRoute) { }

  id: number = 0;
  PolicyDetails: Policy[] = [];

  ngOnInit(): void {
    //receiving  the palocy ID from policiesList component
    this.route.queryParams.subscribe((params) => {
      this.id = +params['ID'];
    });

    //getting policy details from policyservice
    this.policyService.GetPolicyDetail(this.id).subscribe(res => {
      if (res != null) {
        this.PolicyDetails = res;
      }
      else {
        alert('Policy Does not exist ');
      }
    });
  }

  //logic for disabling the payment button if nextPremiumdue is >30
  isPaymentDisabled(nextPremiumdue: Date): boolean {
    const differenceInMs = new Date(nextPremiumdue).getTime() - Date.now();
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
    return differenceInDays > 30;
  }

  //sending policy id to the PaymentPage component
  OnClickPaymentButton(id: number) {
    this.router.navigate(['/paymentpage'], {
      queryParams: { ID: id }
    });
  }

  //navigating to PoliciesList component
  GoToPolicyList() {
    this.router.navigate(['/policieslist'])
  }
}
