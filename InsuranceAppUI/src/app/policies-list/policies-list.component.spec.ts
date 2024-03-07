import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PoliciesListComponent } from './policies-list.component';
import { PolicyService } from '../Services/policy.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PolicyList } from '../Model/model';

describe('PoliciesListComponent', () => {
  let component: PoliciesListComponent;
  let fixture: ComponentFixture<PoliciesListComponent>;
  let policyServiceSpy: jasmine.SpyObj<PolicyService>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    const policyServiceSpyObj = jasmine.createSpyObj('PolicyService', ['GetAllUserPolicies']);
    TestBed.configureTestingModule({
      declarations: [PoliciesListComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: PolicyService, useValue: policyServiceSpyObj },
        MatSnackBar
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesListComponent);
    component = fixture.componentInstance;
    policyServiceSpy = TestBed.inject(PolicyService) as jasmine.SpyObj<PolicyService>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call GetAllUserPolicies and set PolicyList', waitForAsync(() => {
    const mockPolicyList: PolicyList[] = [{ policyId: 1, policyName: 'Test Policy', premiumAmount: 100, lastPremiumPaid: new Date() }];
    policyServiceSpy.GetAllUserPolicies.and.returnValue(of(mockPolicyList));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(policyServiceSpy.GetAllUserPolicies).toHaveBeenCalled();
      // expect(component.PolicyList).toEqual(mockPolicyList);
    });
  }));

  // it('should handle empty policy list response', waitForAsync(() => {
  //   const mockEmptyPolicyList: PolicyList[] = [];
  //   policyServiceSpy.GetAllUserPolicies.and.returnValue(of(mockEmptyPolicyList));

  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     expect(policyServiceSpy.GetAllUserPolicies).toHaveBeenCalled();
  //     expect(component.PolicyList.length).toBe(0);
  //   });
  // }));

  // it('should handle error from GetAllUserPolicies', waitForAsync(() => {
  //   const errorMessage = 'Error fetching policies';
  //   policyServiceSpy.GetAllUserPolicies.and.returnValue(throwError(errorMessage));

  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     expect(policyServiceSpy.GetAllUserPolicies).toHaveBeenCalled();
  //   });
  // }));

  // it('should navigate to policiesdetails with PolicyId as query param', () => {
  //   const policyId = 1;
  //   const navigateSpy = spyOn(router, 'navigate');

  //   component.passPolicyDetailId(policyId);

  //   expect(navigateSpy).toHaveBeenCalledWith(['/policiesdetails'], { queryParams: { ID: policyId } });
  // });

  // it('should not navigate when PolicyId is negative', () => {
  //   const policyId = -1;
  //   const navigateSpy = spyOn(router, 'navigate');

  //   component.passPolicyDetailId(policyId);

  //   expect(navigateSpy).not.toHaveBeenCalled();
  // });

  // it('should call ngOnInit and getAllPolicies', () => {
  //   const getAllPoliciesSpy = spyOn(component, 'getAllPolicies');

  //   component.ngOnInit();

  //   expect(getAllPoliciesSpy).toHaveBeenCalled();
  // });
});
