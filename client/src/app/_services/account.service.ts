import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  public curentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.curentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'account/login', model).pipe(
      map((response: any) =>{
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

  register(model: any) {
    return this.http.post<User>(this.baseUrl + '', model).pipe(
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

