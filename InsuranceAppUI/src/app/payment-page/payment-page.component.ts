import { Component } from '@angular/core';
import { PolicyService } from '../Services/policy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {
  constructor(private policyService: PolicyService,
    private router: Router, private route: ActivatedRoute) { }

  id: number = 0;

  ngOnInit(): void {
    //receiving ID value from paymentDetail component
    this.route.queryParams.subscribe((params) => {
      this.id = +params['ID'];
    });
  }

  //navigate to policieslist component
  GoToPolicyList(){
    this.router.navigate(['/policieslist'])
  }

  //navigate to policiesdetails component
  GoToPolicyDetail(){
    this.router.navigate(['/policiesdetails'], {
      queryParams: { ID: this.id }
    });
  }
  
}
