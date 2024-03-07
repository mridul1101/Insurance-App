// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ActivatedRoute, Router } from '@angular/router';
// import { of } from 'rxjs';
// import { PolicyService } from '../Services/policy.service';
// import { PolicyDetailsComponent } from './policy-details.component';

// describe('PolicyDetailsComponent', () => {
//   let component: PolicyDetailsComponent;
//   let fixture: ComponentFixture<PolicyDetailsComponent>;
//   let policyServiceSpy: jasmine.SpyObj<PolicyService>;
//   let routerSpy: jasmine.SpyObj<Router>;
//   let activatedRoute: ActivatedRoute;

//   beforeEach(async () => {
//     policyServiceSpy = jasmine.createSpyObj('PolicyService', ['GetPolicyDetail']);
//     routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     await TestBed.configureTestingModule({
//       declarations: [PolicyDetailsComponent],
//       providers: [
//         { provide: PolicyService, useValue: policyServiceSpy },
//         { provide: Router, useValue: routerSpy },
//         { provide: ActivatedRoute, useValue: {
//             snapshot: { queryParams: of({ ID: 123 }) }
//           }
//         }
//       ]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PolicyDetailsComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call GetPolicyDetail on init', () => {
//     const mockPolicyDetails = [{ policyId: 1, policyName: 'Test Policy', premiumAmount: 100, lastPremiumPaid: new Date(), nextPremiumdue: new Date(), policyDescription: 'Test Description', policyType: 'Test Type' }];
//     policyServiceSpy.GetPolicyDetail.and.returnValue(of(mockPolicyDetails));

//     fixture.detectChanges();

//     expect(policyServiceSpy.GetPolicyDetail).toHaveBeenCalledOnceWith(123);
//     expect(component.PolicyDetails).toEqual(mockPolicyDetails);
//   });
  
//   it('should enable payment if next premium is due within 30 days', () => {
//     const today = new Date();
//     const nextPremiumDue = new Date(today.getTime() + (25 * 24 * 60 * 60 * 1000)); // Next premium due in 25 days

//     expect(component.isPaymentDisabled(nextPremiumDue)).toBe(false);
//   });

//   it('should disable payment if next premium is due after 30 days', () => {
//     const today = new Date();
//     const nextPremiumDue = new Date(today.getTime() + (35 * 24 * 60 * 60 * 1000)); // Next premium due in 35 days

//     expect(component.isPaymentDisabled(nextPremiumDue)).toBe(true);
//   });
// });
