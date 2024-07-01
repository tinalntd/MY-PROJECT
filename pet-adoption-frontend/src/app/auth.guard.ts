import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    return this.userService.userChanged$.pipe(
      map(user => {
        if (user) {
          return true;  // Allow access if the user is signed in
        } else {
          this.router.navigate(['/sign-in']);  // Redirect to sign-in page if not signed in
          return false;
        }
      })
    );
  }
}
