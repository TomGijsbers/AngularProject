import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG imports - organized alphabetically
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextarea } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

// Import the service
import { ProfileService } from './profile.service';

// Type definitions
interface Country {
  name: string;
  code: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // PrimeNG components - organized alphabetically
    AvatarModule,
    BadgeModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FileUploadModule,
    InputSwitchModule,
    InputTextarea,
    InputTextModule,
    ToastModule,
  ],
  providers: [MessageService, ProfileService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  // User profile data
  userProfile: any = null;

  // Form data
  countries: Country[] = [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'Germany', code: 'DE' },
    { name: 'France', code: 'FR' },
    { name: 'Spain', code: 'ES' },
    { name: 'Australia', code: 'AU' },
    { name: 'Japan', code: 'JP' }
  ];

  visibilityOptions = [
    { label: 'Public', value: 'public' },
    { label: 'Friends Only', value: 'friends' },
    { label: 'Private', value: 'private' }
  ];

  // Edit Profile Dialog
  showEditDialog = false;
  editedProfile: any = {};

  loading = true;
  error: string | null = null;

  constructor(
    private messageService: MessageService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    const currentUserId = 1; // Simulate getting the current user's ID
    this.profileService.getUserProfile(currentUserId).subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.error = 'Failed to load profile data. Please ensure the backend server is running.';
        this.loading = false;
      }
    });
  }

  // Dialog management
  openEditDialog() {
    this.editedProfile = JSON.parse(JSON.stringify(this.userProfile));
    if (this.userProfile.country) {
        this.editedProfile.country = this.countries.find(c => c.code === this.userProfile.country.code) || null;
    }
    this.showEditDialog = true;
  }

  saveProfileChanges() {
    this.loading = true;
    this.profileService.updateUserProfile(this.userProfile.id, this.editedProfile).subscribe({
      next: (updatedProfile) => {
        this.userProfile = {
            ...this.userProfile,
            ...this.editedProfile,
            country: this.editedProfile.country
        };
        this.showEditDialog = false;
        this.showSuccessToast('Profile updated successfully');
        this.loading = false;
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        this.showEditDialog = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update profile', life: 3000 });
        this.loading = false;
      }
    });
  }

  // Form submission
  onSubmit() {
    this.saveProfileChanges();
  }

  // Helper method to show success toast
  private showSuccessToast(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000
    });
  }
}