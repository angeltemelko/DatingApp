import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  users: any;

  constructor(
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.setCurrenUser();
  }

  public setCurrenUser(){
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setUser(user);
  }
}
