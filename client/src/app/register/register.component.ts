import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister: EventEmitter<boolean> = new EventEmitter()
  model: any = {};

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  register(): void {
    this.accountService.register(this.model).subscribe(
      response => {
        this.cancel();
      }, error => {
        //this.toastr.error(error.error);
      }
    );
  }

  cancel(): void{
    this.cancelRegister.emit(false);
  }
}
