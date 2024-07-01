import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './services/user.service';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isHomePage = true;
  isSignedIn = false;
  firstName: string | null = null;
  lastName: string | null = null;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/';
      }
    });

    // Subscribe to the user status
    this.userService.userChanged$.subscribe(user => {
      this.isSignedIn = !!user;
      if (user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
      } else {
        this.firstName = null;
        this.lastName = null;
      }
    });
  }

  signOut() {
    this.userService.signOut();  // Call the signOut method from the UserService
    this.router.navigate(['/sign-in']);  // Redirect to the Sign-In page
  }
}
