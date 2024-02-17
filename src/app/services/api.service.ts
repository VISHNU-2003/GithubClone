import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

export interface Repo {
  name: string;
  description: string;
  topics: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getRepos(username: string, perPage: number, page: number): Observable<any> {
    const url = `https://api.github.com/search/repositories?q=user:${username}&per_page=${perPage}&page=${page}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error fetching repositories:', error);
        return of([]);
      }),
      shareReplay() // Cache the response
    );
  }

  getUserProfile(username: string): Observable<any> {
    const url = `https://api.github.com/users/${username}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error fetching user profile:', error);
        return of({});
      }),
      shareReplay() // Cache the response
    );
  }
}
