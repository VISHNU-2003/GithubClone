import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Add this line

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileService} from './user-profile.service';
@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule  // Add this line
  ],
  providers: [UserProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
