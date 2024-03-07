  export interface Policy {
    policyId: number;
    policyName: string;
    premiumAmount: number;
    lastPremiumPaid: Date;
    nextPremiumdue: Date;
    policyDescription: string;
    policyType: string;
  }

  export interface PolicyList {
    policyId: number;
    policyName: string;
    premiumAmount: number;
    lastPremiumPaid: Date;
  }

  export interface User {
    ID: number;
    FullName: string;
    Email: string;
    Mobile: string;
    password: string;
}
