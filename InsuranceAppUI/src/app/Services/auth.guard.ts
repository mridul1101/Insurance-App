import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginSignUpService } from './login-sign-up.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthzGuard implements CanActivate {
  constructor(private loginSignUpService: LoginSignUpService) {}

  // allowing components to access if user is login
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginSignUpService.isLoggedin();
  }
}
