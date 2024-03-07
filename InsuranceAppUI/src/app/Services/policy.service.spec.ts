import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PolicyService } from './policy.service';
import { Policy, PolicyList } from '../Model/model';

describe('PolicyService', () => {
  let service: PolicyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PolicyService]
    });

    service = TestBed.inject(PolicyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve policy details', fakeAsync(() => {
    const policyId = 1;
    const mockPolicy: Policy[] = [{
      policyId: policyId,
      policyName: 'Test Policy',
      premiumAmount: 100,
      lastPremiumPaid: new Date(),
      nextPremiumdue: new Date(),
      policyDescription: 'Test Description',
      policyType: 'Test Type'
    }];

    service.GetPolicyDetail(policyId).subscribe(policy => {
      expect(policy).toEqual(mockPolicy);
    });

    const req = httpMock.expectOne(`https://localhost:44345/api/Policy/PolicyDetails/${policyId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPolicy);

    tick();
  }));

//   it('should handle error when retrieving policy details', fakeAsync(() => {
//     const policyId = 1;
//     const errorMessage = 'Error occurred while fetching policy details.';

//     service.GetPolicyDetail(policyId).subscribe({
//       error: err => {
//         expect(err).toBeTruthy();
//         expect(err.error).toBe(errorMessage);
//       }
//     });

//     const req = httpMock.expectOne(`https://localhost:44345/api/Policy/PolicyDetails/${policyId}`);
//     expect(req.request.method).toBe('GET');
//     req.error(new ErrorEvent('Policy Details Error'), { status: 404, statusText: 'Not Found' });

//     tick();
//   }));

  it('should retrieve all user policies', fakeAsync(() => {
    const userId = 1;
    const mockPolicies: PolicyList[] = [{
      policyId: 1,
      policyName: 'Policy 1',
      premiumAmount: 100,
      lastPremiumPaid: new Date()
    }, {
      policyId: 2,
      policyName: 'Policy 2',
      premiumAmount: 200,
      lastPremiumPaid: new Date()
    }];

    service.GetAllUserPolicies(userId).subscribe(policies => {
      expect(policies).toEqual(mockPolicies);
    });

    const req = httpMock.expectOne(`https://localhost:44345/api/Policy/UserPolicies/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPolicies);

    tick();
  }));

//   it('should handle error when retrieving user policies', fakeAsync(() => {
//     const userId = 1;
//     const errorMessage = 'Error occurred while fetching user policies.';

//     service.GetAllUserPolicies(userId).subscribe({
//       error: err => {
//         expect(err).toBeTruthy();
//         expect(err.error).toBe(errorMessage);
//       }
//     });

//     const req = httpMock.expectOne(`https://localhost:44345/api/Policy/UserPolicies/${userId}`);
//     expect(req.request.method).toBe('GET');
//     req.error(new ErrorEvent('User Policies Error'), { status: 500, statusText: 'Internal Server Error' });

//     tick();
//   }));
});
