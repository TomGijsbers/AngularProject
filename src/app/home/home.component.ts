import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component'; // Import the LoginComponent


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent // Add LoginComponent to imports
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Assuming a CSS file, adjust if not present
})
export class HomeComponent {
  constructor() {}
}
