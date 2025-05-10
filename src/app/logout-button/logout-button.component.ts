import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../environments/environment'; // Adjust the path as necessary

@Component({
  selector: 'lib-logout-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css'],
})
export class LogoutButtonComponent {
  constructor(private auth: AuthService) {}
  
  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: environment.redirectUri, // this is where we redirect to when the user is logged out
      },
    });
  }
}
