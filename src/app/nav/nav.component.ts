// src/app/nav/nav.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
import { RoleService } from '../services/roleservice.service';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule],
  template: `
    <p-menubar [model]="items" class="surface-0 w-full"></p-menubar>
  `
})
export class NavComponent implements OnInit {
  items: MenuItem[] = [];
  private roles = inject(RoleService);
  private auth = inject(AuthService);

  ngOnInit(): void {
    this.roles.roles$.subscribe(r => (this.items = this.buildMenu(r)));
  }

  private buildMenu(r: string[]): MenuItem[] {
    const menu: MenuItem[] = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' }
    ];

    if (r.includes('TEAMLEADER') || r.includes('eventAdmin')) {
      menu.push({ label: 'Events', icon: 'pi pi-calendar', routerLink: '/event' });
    }
    if (r.includes('eventAdmin')) {
      menu.push({ label: 'Users', icon: 'pi pi-users', routerLink: '/test' });
    }


    return menu;
  }
}