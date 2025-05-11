import { Component, Inject, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <button 
      pButton 
      class="p-button-danger" 
      icon="pi pi-sign-out" 
      label="Log Out" 
      (click)="logout()">
    </button>
  `
})
export class LogoutButtonComponent {
  auth = inject(AuthService);
  @Inject(DOCUMENT) document: Document = inject(DOCUMENT);

  logout(): void {
    this.auth.logout({ 
      logoutParams: {
        returnTo: this.document.location.origin
      }
    });
  }
}