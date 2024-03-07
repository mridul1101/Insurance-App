import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  //checking is user login
  isLoggedIn(): boolean {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken;
  }
  
  //checking is user logout
  logout() {
    localStorage.removeItem('access_token');
  }
}
