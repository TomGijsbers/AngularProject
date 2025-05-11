import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
import { RoleService } from '../services/roleservice.service';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, LoginComponent, LogoutButtonComponent],
  template: `
    <div class="flex justify-content-between align-items-center">
      <p-menubar [model]="items" class="surface-0 w-full"></p-menubar>
      <div class="flex">
        <app-login *ngIf="!(isAuthenticated$ | async)"></app-login>
        <app-logout-button *ngIf="isAuthenticated$ | async"></app-logout-button>
      </div>
    </div>
  `
})
export class NavComponent implements OnInit {
  items: MenuItem[] = [];
  private roles = inject(RoleService);
  private auth = inject(AuthService);
  isAuthenticated$ = this.auth.isAuthenticated$;

  ngOnInit(): void {
    this.roles.roles$.subscribe(r => (this.items = this.buildMenu(r)));
    
    // Fix redirect logic to use Angular Router instead of direct window.location change
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        // We'll let the role service handle redirects in a more Angular-friendly way
        // The automatic redirects will be handled by guards or the role service
      }
    });
  }

  private buildMenu(r: string[]): MenuItem[] {
    const isUser = r.includes('User');
    const isTeamLeader = r.includes('TeamLeader') || r.includes('eventAdmin');
    const isAdmin = r.includes('eventAdmin');

    // Start with basic menu items everyone sees
    const menu: MenuItem[] = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Events', icon: 'pi pi-calendar', routerLink: '/events' }
    ];

    // Add profile link if user is logged in
    if (isUser || isTeamLeader || isAdmin) {
      menu.push({ label: 'Profiel', icon: 'pi pi-user', routerLink: '/profile' });
    }

    // Event management items for TeamLeader & Admin
    if (isTeamLeader) {
      const eventsMenuItem = menu.find(item => item.label === 'Events');
      if (eventsMenuItem) {
        eventsMenuItem.items = [
          { label: 'Mijn events', icon: 'pi pi-user-edit', routerLink: '/events/mine' },
          { label: 'Nieuw event', icon: 'pi pi-plus-circle', routerLink: '/events/new' }
        ];
      }
    }

    // Admin section
    if (isAdmin) {
      menu.push({
        label: 'Admin',
        icon: 'pi pi-cog',
        items: [
          { label: 'Gebruikers', icon: 'pi pi-users', routerLink: '/admin/users' },
          { label: 'Events', icon: 'pi pi-calendar', routerLink: '/admin/events' }
        ]
      });
    }

    return menu;
  }
}