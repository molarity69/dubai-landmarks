import { ToastService } from './toast.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private toastService: ToastService) {
    this.checkUserLoggedIn();
  }

  async login(username: string, password: string): Promise<void> {
    try {
      await Parse.User.logIn(username, password);
      this.isAuthenticated.next(true);
    } catch (error) {
      this.toastService.show('Error while logging in user', { classname: 'bg-danger text-primary' });
      console.error('Error while logging in user', error);
      throw error; // Throw error to be handled by the component
    }
  }

  logout(): void {
    Parse.User.logOut();
    this.isAuthenticated.next(false);
  }

  checkUserLoggedIn(): void {
    const user = Parse.User.current();
    this.isAuthenticated.next(!!user);
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}
