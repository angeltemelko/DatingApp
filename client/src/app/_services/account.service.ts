import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  public curentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.curentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: User): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) =>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.curentUserSource.next(user)
        }
      })
    );
  }

  setUser(user: User | null): void {
    this.curentUserSource.next(user)
  }

  register(model: { username: string, password: string }) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if(user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.curentUserSource.next(user);
        }
      })
    )
  }

  logout(): void {
    localStorage.removeItem('user')
    this.curentUserSource.next(null);
  }
}

