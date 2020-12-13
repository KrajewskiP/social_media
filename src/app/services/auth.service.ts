import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<any>;

  constructor() { }

  redirectUrl: string;

  login(username: string, password: string): Observable<boolean> {
    console.log('loggin in');
    return of(true).pipe(
      delay(1000),
      tap(val => { 
        this.currentUser = new Observable<string>((observer) => {
          observer.next(username);
        }) 
        localStorage.setItem('currentUser', JSON.stringify(username));
       })
    );
  }

  get getCurrentUser() {
    return localStorage.getItem('currentUser');
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser')
  }

  isLogged(): boolean {
    console.log('checking user')
    console.log(localStorage.getItem('currentUser'))
    return !!localStorage.getItem('currentUser');
  }
}
