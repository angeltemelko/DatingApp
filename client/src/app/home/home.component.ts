import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  public getUsers(): void{
    this.http.get("https://localhost:5001/api/Users").subscribe(response => {
      this.users = response
      console.log(this.users);
    }, error =>{
      console.log(error)
    });
  }

  registerToogle(): void {
    this.registerMode = !this.registerMode;
  }

  cancelRegister(event: boolean) {
    this.registerMode = event;
  }
}
