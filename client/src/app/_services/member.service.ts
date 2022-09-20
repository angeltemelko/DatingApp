import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MemberDto } from '../_models/memberDto';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getMember(username: string): Observable<MemberDto> {
    return this._http.get<MemberDto>(this.baseUrl + `users/${username}`)
  }

  getMembers(): Observable<MemberDto[]> {
    return this._http.get<MemberDto[]>(this.baseUrl + 'users')
  }
}
