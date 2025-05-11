import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '@auth0/auth0-angular';
import { RoleService } from '../services/roleservice.service'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  auth = inject(AuthService);
  roles = inject(RoleService);
  userRoles: string[] = [];

  ngOnInit() {
    // Get user roles when authenticated
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.roles.roles$.subscribe(roles => {
          this.userRoles = roles;
        });
      }
    });
  }
}
