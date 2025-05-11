import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <button 
      pButton 
      class="p-button-primary" 
      icon="pi pi-sign-in" 
      label="Log In" 
      (click)="login()">
    </button>
  `
})
export class LoginComponent {
  auth = inject(AuthService);

  login(): void {
    this.auth.loginWithRedirect();
  }
}
