import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `<button (click)="testRequest()">Test API</button>`
})
export class TestComponent {
  constructor(private http: HttpClient) {}

  testRequest() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b21AZXhhbXBsZS5jb20iLCJpYXQiOjE3NDY3ODE1ODcsImV4cCI6MTc0Njc4NTE4N30.Z5zmQqT7eLhvmV33zoFV8MwQHB0iIEygoZ66ycJQLCY';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    
    this.http.get('http://localhost:8080/locations', { headers }).subscribe(
      res  => console.log('✅', res),
      err  => console.error('❌', err)
    );
  }
}
