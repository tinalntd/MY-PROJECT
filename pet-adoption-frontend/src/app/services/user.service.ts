import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userChanged = new BehaviorSubject<User | null>(null);  

  userChanged$ = this._userChanged.asObservable();  

  constructor() {
    this.loadUser();
  }

  private loadUser() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      this._userChanged.next(user);
    }
  }

  signIn(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this._userChanged.next(user);
  }

  signOut() {
    localStorage.removeItem('user');
    this._userChanged.next(null);
  }
}
