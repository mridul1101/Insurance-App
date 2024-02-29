import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn(): boolean {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken; // Returns true if the access token exists, otherwise false
  }

  logout(){
    localStorage.removeItem('access_token');
    
  }
}
