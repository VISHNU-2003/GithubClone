// user-profile.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private http: HttpClient) { }

  getUserProfile(username: string): Observable<any> {
    const url = `https://api.github.com/users/${username}`;
    return this.http.get<any>(url);
  }
}
