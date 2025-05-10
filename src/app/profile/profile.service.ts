import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/users'; // Base URL for user data

  constructor(private http: HttpClient) {
    console.log('ProfileService initialized with API URL:', this.apiUrl);
  }

  // Fetch a specific user profile by ID
  getUserProfile(userId: number): Observable<any> {
    console.log(`Fetching user profile for ID: ${userId} from ${this.apiUrl}/${userId}`);
    
    return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
      map(user => {
        console.log('User data received:', user);
        // Perform transformations on the user object
        // Media gallery mapping removed
        return {
          ...user,
          birthDate: user?.birthDate ? new Date(user.birthDate) : null,
          profilePicture: user?.profilePicture || 'assets/default-avatar.png',
          // No media gallery mapping needed anymore
        };
      }),
      catchError(error => {
        console.error('Error fetching user profile:', error);
        
        let errorMsg = 'An error occurred while fetching the profile';
        if (error.status === 404) {
          errorMsg = `User with ID ${userId} not found. Please check if your JSON server is running and contains this user ID.`;
        } else if (error.status === 0) {
          errorMsg = 'Could not connect to the JSON server. Please ensure json-server is running with the command: npx json-server --watch src/json-server-local/db.json';
        }
        
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  // Update a user profile
  updateUserProfile(userId: number, profileData: any): Observable<any> {
    // Ensure date is formatted correctly if needed before sending
    const dataToSend = { ...profileData };
    if (dataToSend.birthDate instanceof Date) {
      dataToSend.birthDate = dataToSend.birthDate.toISOString(); // Format date for JSON
    }
    return this.http.patch<any>(`${this.apiUrl}/${userId}`, dataToSend).pipe(
      catchError(error => {
        console.error('Error updating profile:', error);
        return throwError(() => new Error('Failed to update profile. Please check if json-server is running and has write permissions.'));
      })
    );
  }
}
