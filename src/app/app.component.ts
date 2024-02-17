import { Component, OnInit } from '@angular/core';
import { ApiService, Repo } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  username: string = '';
  repos: Repo[] = [];
  loading: boolean = false;
  searchPerformed: boolean = false;
  perPage: number = 10;
  page: number = 1;
  totalPages: number = 0;
  pagesArray: number[] = [];
  currentPage: number = 1;
  userProfile: any = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  getRepos() {
    this.searchPerformed = true;
    this.loading = true;
    this.apiService.getRepos(this.username, this.perPage, this.page).subscribe(
      (response: any) => {
        this.repos = response.items;
        this.totalPages = Math.ceil(response.total_count / this.perPage);
        this.pagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
        
        // Fetch user profile information
        this.apiService.getUserProfile(this.username).subscribe(
          (profileResponse: any) => {
            this.userProfile = profileResponse;
            this.loading = false;
          },
          (profileError) => {
            console.error('Error fetching user profile:', profileError);
            this.loading = false;
          }
        );
      },
      (error) => {
        this.repos = [];
        this.loading = false;
        console.error('Error fetching repositories:', error);
      }
    );
  }

  goToPage(page: number) {
    this.page = page;
    this.currentPage = page;
    this.getRepos();
  }
}
